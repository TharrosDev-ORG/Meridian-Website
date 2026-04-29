# The Meridian Society — Ultra-Detailed Technical Specification

This document is the definitive, high-fidelity system of record for the **Meridian Website**—the society's entire identity and the foundational base for everything it does. It serves as an **"Agent-Ready" encyclopedia** of the society's core architecture, security, and data systems.

---

## 🏗️ 1. Architecture: Responsive Single-View Pattern

The site implements a unified, mobile-first component tree. We avoid separate mobile/desktop routes, instead relying on CSS media queries and the `PageStyles` pattern to adapt the UI.

### 1.1 Source-to-Route Mapping
| Public URL | Route Directory | Source File Path | CSS Logic |
| :--- | :--- | :--- | :--- |
| `/` | `app/(site)/` | `page.tsx` | `pageCss.ts` |
| `/calendar` | `app/(site)/calendar/` | `page.tsx` | `pageCss.ts` |
| `/events` | `app/(site)/events/` | `page.tsx` | Shared Modules + `pageCss.ts` |
| `/membership` | `app/(site)/membership/` | `page.tsx` | `pageCss.ts` |
| `/social` | `app/(site)/social/` | `page.tsx` | Shared Modules + `pageCss.ts` |
| `/team` | `app/(site)/team/` | `page.tsx` | Standard CSS |
| `/speak` | `app/(site)/speak/` | `page.tsx` | `pageCss.ts` |
| `/contact` | `app/(site)/contact/` | `page.tsx` | Standard CSS |
| `/privacy` | `app/(site)/privacy/` | `page.tsx` | Standard CSS |
| `/terms` | `app/(site)/terms/` | `page.tsx` | Standard CSS |
| `/register` | `app/register/` | `page.tsx` | Extends `membershipCss` |
| `/apply` | `app/apply/` | `page.tsx` | Shared `globals.css` |

### 1.2 Desktop UI Optimization (v1.4)
The site implements a strict **Mobile Isolation Strategy** for high-resolution displays (>1101px):
- **Spacing**: Increased vertical rhythm using `--section-spacing-dt: 120px`.
- **Typography**: Responsive `hero-title` scaling using `clamp` (up to 220px on ultra-wide).
- **Performance Hardening**: High-traffic animated elements utilise `will-change: transform, opacity` to ensure hardware acceleration and 60FPS fluidity on desktop.

---

## 🛡️ 2. The Registration Pipeline (Hardened)

The registration flow (`/register`) is the most mission-critical and hardened part of the site.

### 2.1 Security Pipeline Flow
Every `registerMember` call passes through all layers in order:

1. **Honeypot** (`fax_number`): If the hidden field is populated, return generic failure. Code: `HP`.
2. **IP Rate Limit**: 5-minute window per `x-forwarded-for` IP, tracked in an in-memory `Map`. Rate is set before slow work to prevent race conditions.
3. **User-Agent Validation**: Blocks curl, bot, spider, crawler, python, wget, postman, and missing UAs. Code: `UA`.
4. **Security Delay**: 300–800 ms random sleep on every path (prevents timing-based enumeration).
5. **Zod Validation**: Strict schema — see §2.2.
6. **Duplicate Email Check**: Case-insensitive lookup via service role. Returns `alreadyRegistered: true` with existing data on match (seamless re-login, not an error).
7. **Insert**: High-privilege `INSERT INTO members` via `createServiceClient()`.

### 2.2 Zod Schema (`registrationSchema`)
```
fullName        string, 2–120 chars
email           string, valid email, max 254, normalised to lowercase
role            enum: Student | Alumni | Professor / Faculty | Professional | Other
roleOther       optional string, max 120
institution     enum: Carleton University | University of Ottawa | Algonquin College | Other
institutionOther optional string, max 160
interests       array of strings, 1–20 items, each ≤ 80 chars
heardFrom       enum: Friend or Peer | Professor | Social Media | Campus Event | Current Member
volunteerInterest enum: Yes | Maybe | Not at this time
acceptedTerms   boolean (must be true)
fax_number      optional string, max 200 (honeypot — never stored)
```

### 2.3 Member Identity & The Sovereign Registry

#### Member Number Format
Numbers follow the pattern **`M{YY}-{NNNN}`**:
- `YY` — two-digit registration year (e.g. `26` for 2026)
- `NNNN` — four-digit zero-padded sequence, starting at `1001`
- Example sequence: `M26-1001`, `M26-1002`, `M26-1003` …

Numbers are assigned automatically by the Postgres trigger `assign_member_number()` on every `INSERT INTO members`. A second trigger, `lock_member_number()`, fires on `UPDATE` and raises an exception if `member_number` is changed — making assignments **permanently immutable** at the DB level.

#### Polymorphic Lookup
`checkMemberStatus(identifier)` accepts either an email address (case-insensitive) or a member number directly. This supports:
- New registrations (email lookup before showing the full form)
- Returning members (email → success screen without re-registering)
- Recovery flows (member number → retrieve name/date for card download)

#### Background Sync
`RegistrationForm` triggers a background `checkMemberStatus` call on mount if `registrationDate` or `memberName` is absent from localStorage. This ensures the member card always has accurate data even for members who registered on a different device.

#### Canvas Card Generation
The Society ID Card is generated client-side via Canvas 2D:
- **Dimensions**: 1200×1800 px (2:3 Portrait ratio)
- **Layers**: cream background → paper noise texture → ink outer border (3 px) → gold gradient inner frame → decorative gold corner marks → typography (Cormorant Garamond + Barlow Condensed) → Society Seal (top center) → member number at 160 px serif → Huge QR Code (bottom center) → "M" watermark (italic, ~3% opacity) → registration date footer
- **Font loading**: `document.fonts.load()` awaited for all four weights before drawing; result cached in `fontsLoaded` state
- **Output**: PNG blob → object URL → `<a download>` click → `URL.revokeObjectURL` after 100 ms

#### Data Persistence
Registration state is synchronised across:
- `localStorage` — five keys (see CLAUDE.md §Data Flows)
- A 1-year `SameSite=Lax` cookie — allows the server to gate on registration status for potential future SSR use

### 2.4 Registration Success State (UI)
The success screen renders after `isAlreadyRegistered && memberNumber`:

| Element | Detail |
|---------|--------|
| Welcome heading | "Welcome, *{firstName}.*" — italic gold on `--ink` |
| Member number | `ScrambleTicker`: 2 s animation, 40 ms steps, random `[0-9A-Z]` chars |
| Copy button | `navigator.clipboard` + `execCommand` fallback; `copyTimeoutRef` prevents race resets; only flashes "Copied" on actual success |
| Registration date | "Member Since" label + `April 27, 2026` format |
| Card preview | HTML/CSS 8:5 card with ink border, gold inner frame, corner accents, member name/number/date — visible before download |
| Download button | Triggers canvas generation; states: "Download Member Card" → "Download Started" → "Download Finished" |
| Return Home | `router.push("/")` |

---

## ⚡ 3. Telemetry & Live Member Counting

The live member counter in the footer uses a multi-layered architecture for near-zero latency.

### 3.1 Data Flow Architecture
1. **Bootstrap**: `Footer.tsx` fetches `/api/stats/count` on mount (Edge runtime, `no-store` cache).
2. **Realtime**: A Supabase Realtime channel (`footer_stats_updates`) subscribes to `UPDATE` events on `site_stats` where `id = 'meridian_global_stats'`.
3. **Trigger**: The DB trigger `handle_member_count_change()` increments/decrements `site_stats.member_count` on every `INSERT`/`DELETE` on `members`.
4. **Local increment**: `RegistrationForm` increments `displayCount` by 1 on successful registration (animated, optimistic) without waiting for Realtime to confirm.

---

## ✨ 4. Animation Engine & Reveal Lifecycle

The site utilises a strict "Observer-Reveal" pattern managed through `Providers.tsx`.

### 4.1 Intersection Observer (`.rv`)
- **Properties**: `threshold: 0.01`, `rootMargin: "0px 0px 100px 0px"`.
- **Logic**: Elements with `.rv` gain `.on` when entering the viewport.
- **Stagger Delays**: Managed via `data-d` attributes (80 ms increments).
- **Page Transitions**: Content is wrapped in `TransitionWrapper` which applies the `pageSweep` keyframe (opacity: 0→1, blur: 8px→0, translateY: 10px→0).

### 4.2 Magnetic UI Logic (`Magnetic.tsx`)
- Mouse events calculate pull strength relative to the element centre.
- **Performance**: High-frequency mouse moves update **CSS variables** (`--mag-x`, `--mag-y`) rather than React state, ensuring 60FPS fluid motion.
- **Auto-Disable**: Detects `(pointer: coarse)` and disables the effect on touch devices.
- **Wordmark Integration**: The NavBar wordmark uses the Magnetic effect on desktop.

### 4.3 Social Record Pattern (`SocialInstagramSection.tsx`)
- **Purpose**: A unified CTA module used across all informational subpages.
- **Design**: Centred, high-contrast "Official Notice" aesthetic with the magnetic "Follow" interaction.
- **Logic**: Imports `INSTAGRAM_URL` from `utils/social.ts` to ensure link persistence.

---

## 🔒 5. Permanent Information Policy

**Static-First Intent**: The `/events` and `/social` pages are documented **event history guides**.
- `/calendar` serves as the dynamic portal for all upcoming forums and gatherings.
- No dynamic event fetching is implemented for historical pages (`/events`, `/social`).
- JSON-LD Event schemas pointing to future dates are strictly prohibited on historical pages to maintain static integrity.
- All real-time updates are redirected to the Society's Instagram.

---

### 6.1 master_sql/ (Sequential Foundation)

| File | Purpose |
|------|---------|
| `01_Sovereign_Member_Registry.sql` | Core identity and member registry |
| `02_Meridian_EventOS_Engine.sql` | Event orchestration and dynamic calendar |
| `03_Security_Vault_and_System_Governance.sql` | Security vault and system configuration |

### 6.2 migrations/ (applied in order)

| File | Purpose |
|------|---------|
| `20260415000000_foundation_registry_and_stats.sql` | Creates `members` (email PK) and `site_stats` tables; `on_member_change` trigger for count; basic RLS |
| `20260415000001_sovereign_rls_lockdown.sql` | Hardens trigger/function search paths; tightens RLS; drops legacy artefacts |
| `20260415000002_vault_access_control.sql` | Blocks direct anonymous API inserts; `site_stats` read-only for anon |
| `20260416113000_advanced_member_schema_ext.sql` | Adds four ENUM types (`member_role`, `institution_name`, `referral_source`, `volunteer_level`); converts text columns; adds generated column `join_date_readable` (MM/DD/YYYY) |
| `20260417000000_archival_audit_logging_sys.sql` | Removes remaining anonymous back-doors; defines `verify_master_signature` / `set_master_signature` functions |
| `20260417120000_strict_privilege_revocation.sql` | `REVOKE EXECUTE` on all functions from `PUBLIC`; grants only to `service_role` and `postgres` |
| `20260427152500_add_member_numbers.sql` | Adds `member_number_seq` (starts 1001); `member_number TEXT UNIQUE`; `generate_member_number()` → `M{YY}-{NNNN}`; `assign_member_number` + `lock_member_number` triggers; backfills existing rows |
| `20260427154500_sovereign_hardening.sql` | Final search-path hardening on all functions; EXECUTE lockdown for anon/authenticated; speaker tables RLS fixes |

### 6.2 `members` Table (final state)

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | `gen_random_uuid()`, UNIQUE |
| `email` | TEXT | **PRIMARY KEY**, normalised to lowercase |
| `full_name` | TEXT | NOT NULL |
| `role` | `member_role` ENUM | Student / Alumni / Professor / Professional / Other |
| `role_other` | TEXT | Optional |
| `institution` | `institution_name` ENUM | Carleton / UofO / Algonquin / Other |
| `institution_other` | TEXT | Optional |
| `interests` | TEXT[] | Array, default `{}` |
| `heard_from` | `referral_source` ENUM | |
| `volunteer_interest` | `volunteer_level` ENUM | |
| `accepted_terms` | BOOLEAN | Consent flag |
| `member_number` | TEXT | UNIQUE; auto-assigned `M{YY}-{NNNN}`; **immutable** |
| `join_date_readable` | TEXT GENERATED | `MM/DD/YYYY` (stored, from `created_at`) |
| `created_at` | TIMESTAMPTZ | `now()` default |

### 6.3 `site_stats` Table

| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT | PRIMARY KEY: `'meridian_global_stats'` |
| `member_count` | INTEGER | Maintained by trigger |
| `last_updated` | TIMESTAMPTZ | Updated by trigger |

---

*Maintained to ensure 100% Agent Performance.*
