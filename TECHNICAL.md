# The Meridian Society — Technical Specification

Definitive system of record for the **Meridian Website**. Pair with [`CLAUDE.md`](CLAUDE.md) (guardrails + repo map) and [`AGENTS.md`](AGENTS.md) (aesthetic + strategic rules).

---

## 🏗️ 1. Architecture

The site implements a unified, mobile-first component tree. Separate mobile/desktop routes are avoided; CSS media queries and the `PageStyles` pattern adapt the UI.

### 1.1 Source-to-Route Mapping

| Public URL | Route Directory | Source File | CSS |
| :--- | :--- | :--- | :--- |
| `/` | `app/(site)/` | `page.tsx` + `HomeClientSide.tsx` + `IndexInteractive.tsx` | `pageCss.ts` |
| `/events` | `app/(site)/events/` | `page.tsx` + `EventsTabs.tsx` | `pageCss.ts` |
| `/membership` | `app/(site)/membership/` | `page.tsx` | `pageCss.ts` |
| `/contact` | `app/(site)/contact/` | `page.tsx` | inline `pageCss` |
| `/privacy` | `app/(site)/privacy/` | `page.tsx` | `_info/infoPageCss.ts` |
| `/terms` | `app/(site)/terms/` | `page.tsx` | `_info/infoPageCss.ts` |
| `/register` | `app/register/` | `page.tsx` | extends `membership/pageCss.ts` |
| `/apply` | `app/apply/` | `page.tsx` | `pageCss.ts` |

**Permanently redirected** (via `next.config.ts`): `/team` → `/#team`, `/social` → `/events#social`, `/speak` → `/apply`, `/calendar` → `/events`, plus `.html` variants of legacy URLs.

### 1.2 Layouts and Boundaries

- **Root layout** (`app/layout.tsx`): loads Cormorant Garamond + Barlow Condensed via `next/font`, exposes `--serif` and `--sans` CSS variables, mounts `Providers`, `ScrollProgress`, Vercel Analytics + Speed Insights, and three site-wide JSON-LD scripts (Organization, WebSite, SiteNavigationElement — three items: Events, Membership, Apply to Speak). Injects:
  - **Preconnect hints** for the Supabase project and `va.vercel-scripts.com`.
  - Inline **early-reveal shim**: adds `.on` to all near-top `.rv` elements at `DOMContentLoaded` before React hydrates, eliminating an opacity-0 flash on cold loads.
- **Group layout** (`app/(site)/layout.tsx`): wraps children in `<TransitionWrapper>` and renders `NavBar`, `Footer`, `MobileMenu`, `MobileDock`, `BackToTop`. Routes outside this group (`/register`, `/apply`) must self-wrap `TransitionWrapper`.
- **Boundaries**: `app/global-error.tsx`, `app/error.tsx`, `app/not-found.tsx`, `app/(site)/loading.tsx`.

### 1.3 Desktop UI Optimization

Strict **Mobile Isolation Strategy** — desktop enhancements strictly inside `@media (min-width: 1101px)`:
- **Spacing**: increased vertical rhythm via `--section-spacing-dt: 120px`.
- **Typography**: responsive `hero-title` scaling using `clamp`.
- **Performance**: animated elements use `will-change: transform, opacity` for hardware acceleration.
- **Touch fast-path**: `Providers.tsx` detects `(pointer: coarse)` and skips the IntersectionObserver, immediately marking every `.rv` element as `.on`. Mouse-tilt, parallax, and 3D card-tilt effects in `IndexInteractive.tsx` short-circuit on touch.

---

## 🛡️ 2. Registration Pipeline

The registration flow (`/register`) is the most mission-critical path on the site.

### 2.1 Security Pipeline Flow

Every `registerMember` call passes through all layers in order. Shared primitives live in `utils/serverActionSecurity.ts` and are reused by `submitSpeakerApplication`.

1. **Honeypot** (`fax_number`): hidden field populated → return generic failure with the same timing as success (prevents enumeration). Code: `HP`.
2. **User-Agent + IP Rate Limit** (`runSecurityChecks`):
   - Blocks suspicious UAs: missing UA or matching `/bot|spider|crawler|curl|python|wget|postman/i`. Code: `UA`.
   - 5-minute per-IP rate limit (10-minute for `/apply`), tracked in an in-memory `Map`. Timestamp recorded **before** slow work to prevent concurrent-request races.
3. **Security Delay**: 300–800 ms random sleep on every path (prevents timing-based enumeration).
4. **Zod validation**: strict schema — see §2.2.
5. **Duplicate email check**: case-insensitive lookup via service role. Returns `success: true, alreadyRegistered: true` with `member_number`, `created_at`, `full_name` so the UI routes returning members to the success state (not an error).
6. **Insert**: `INSERT INTO members` via `createServiceClient()`. The `assign_member_number` Postgres trigger stamps `member_number` on insert.

> In-memory rate limits are per-serverless-instance. On Vercel the same IP can reach different instances, so this is defence-in-depth alongside honeypot and UA checks. Promoting to a database-backed limiter is a known follow-up.

### 2.2 Zod Schema (`registrationSchema`)

```
fullName          string, 2–120 chars
email             string, valid email, max 254, normalised to lowercase
role              enum: Student | Alumni | Professor / Faculty | Professional | Other
roleOther         optional string, max 120
institution       enum: Carleton University | University of Ottawa | Algonquin College | Other
institutionOther  optional string, max 160
interests         array of strings, 1–20 items, each ≤ 80 chars
heardFrom         enum: Friend or Peer | Professor | Social Media | Campus Event | Current Member
volunteerInterest enum: Yes | Maybe | Not at this time
acceptedTerms     boolean (must be true)
fax_number        optional string, max 200 (honeypot — never stored)
```

### 2.3 Member Identity & The Sovereign Registry

#### Member Number Format
Pattern: **`M{YY}-{NNNN}`**
- `YY` — two-digit registration year (e.g. `26` for 2026)
- `NNNN` — four-digit zero-padded sequence, starting at `1001`
- Example: `M26-1001`, `M26-1002`, `M26-1003` …

Assigned automatically by the Postgres trigger `assign_member_number()` on every `INSERT INTO members`. A second trigger, `lock_member_number()`, fires on `UPDATE` and raises an exception if `member_number` is changed — making assignments **permanently immutable** at the DB level.

#### Polymorphic Lookup
`checkMemberStatus(identifier)` accepts either an email (lower-cased internally) or a member number (upper-cased internally). Used for:
- New registrations (email lookup before showing the full form).
- Returning members (email → success screen without re-registering).
- Recovery flows (member number → retrieve name/date for card download).

#### Background Sync
`RegistrationForm` triggers `checkMemberStatus` on mount if `registrationDate` or `memberName` is absent from localStorage, ensuring the member card always has accurate data across devices.

#### Canvas Card Generation
Society ID Card generated client-side via Canvas 2D:
- **Dimensions**: 1200×1200 px (square portrait).
- **Layers**: cream background → paper-noise texture → ink outer border (3 px) → gold gradient inner frame → decorative gold corner marks → Society Seal (top center) → member name → member number (160 px serif) → member-since date → "INDEPENDENT STUDENT ORGANIZATION · OTTAWA · EST. 2025" signature line.
- **Font loading**: `document.fonts.load()` awaited for all required weights before drawing.
- **No QR code.** The card is a clean visual credential; venue scanning was removed during the May 2026 cleanup.
- **Output**: PNG blob → object URL → `<a download>` click → `URL.revokeObjectURL` after 100 ms.

#### Data Persistence
Registration state is synchronised across:
- `localStorage` — five keys: `registrationComplete`, `memberNumber`, `memberName`, `registrationDate`, `memberEmail`.
- A 1-year `SameSite=Lax` cookie — allows server-side gating for potential future SSR use.

### 2.4 Registration Success Screen

| Element | Detail |
|---------|--------|
| Welcome heading | "Welcome, *{firstName}.*" — italic gold on `--ink` |
| Member number | `ScrambleTicker`: ~500 ms scramble, 30 ms steps, random `[0-9A-Z]` chars progressively revealing final value |
| Copy button | `navigator.clipboard` + `execCommand` fallback; `copyTimeoutRef` prevents race resets |
| Registration date | "Member Since" label + e.g. `April 27, 2026` |
| Card preview | HTML/CSS card with ink border, gold inner frame, corner accents, member name/number/date |
| Download button | Triggers canvas generation; states: "Download Member Card" → "Download Started" → "Download Finished" |
| Return Home | `router.push("/")` |

### 2.5 Speaker Application (`/apply`)
`<SpeakerForm>` posts to `submitSpeakerApplication` (`app/actions/speak.ts`). Uses the same honeypot → UA → rate-limit (10-minute window) → security-delay → Zod pipeline. On success inserts into `speaker_applications` via the service client. RLS: public INSERT only; admin SELECT/UPDATE via separate policy.

---

## ⚡ 3. Telemetry & Live Member Counting

The live member counter uses a multi-layered architecture for near-zero latency. It lives on the **homepage only**, not in the footer.

### 3.1 Data Flow

1. **Bootstrap**: `MemberCounter.tsx` fetches `/api/stats/count` on mount (Edge runtime, `Cache-Control: no-store`).
2. **Realtime**: a Supabase Realtime channel (`member-stats-global`) subscribes to `UPDATE` events on `site_stats`.
3. **Trigger**: a DB trigger on `members` increments/decrements `site_stats.member_count` on every `INSERT`/`DELETE`.
4. **Edge fallback**: the Edge route falls back to a direct `count: exact, head: true` query on `members` if the `site_stats` lookup fails.

### 3.2 Footer Policy
`Footer.tsx` is a server component with **no realtime subscription**. The counter was moved to the homepage to avoid opening a Supabase WebSocket on every page view. Do not regress this.

---

## 🗂️ 4. Events Page

`/events` is **fully static**. No dynamic event fetching, no calendar, no ISR. Real-time announcements happen on Instagram.

### 4.1 EventsTabs Client Component
`app/(site)/events/EventsTabs.tsx` is a small client island that:
- Manages an `activeTab` state (`'forum' | 'social'`), initialized from `window.location.hash` on mount.
- Supports hash deep-links: `/events#forum` and `/events#social` activate the respective tab and `scrollIntoView` on `#programs` (the panels themselves are not valid scroll targets when hidden).
- Listens for `hashchange` events for in-session tab switching.
- Uses `role="tablist"` / `role="tab"` / `role="tabpanel"` ARIA semantics.
- Defers `setActiveTab` via `setTimeout(..., 0)` per the project guardrail (no `setState` directly in `useEffect`).

### 4.2 Panel Structure
- **Forum panel**: lede paragraph → three pillars (Expert Discourse / Intellectual Exchange / Open Floor) → 6-cell format strip (Title / Speaker / Keynote / Panel / Q&A / Social).
- **Social panel**: lede paragraph → four gathering pillars (Seasonal Mixers / Themed Evenings / Cultural Events / Networking Dinners).
- Both panels include an eyebrow label with a gold left-rail accent and a bottom `<SocialInstagramSection />`.

---

## ✨ 5. Animation Engine & Reveal Lifecycle

### 5.1 Intersection Observer (`.rv`)
- **Properties**: `threshold: 0.01`, `rootMargin: "0px 0px 100px 0px"`.
- **Logic**: elements with `.rv` gain `.on` when they enter the viewport.
- **Stagger Delays**: `data-d="1"–"5"` attributes (80 ms increments).
- **Page Transitions**: `TransitionWrapper` applies the `pageSweep` keyframe (opacity 0→1, blur 8px→0, translateY 10px→0).
- **Touch fast-path**: on `(pointer: coarse)` the observer is skipped and all `.rv` elements are marked `.on` immediately.
- **Dynamic content**: `window.__observeReveal()` re-scans the DOM for unrevealed `.rv` nodes after async client-side renders.

### 5.2 Magnetic UI (`Magnetic.tsx`)
- Mouse events calculate pull strength relative to the element centre.
- Updates **CSS variables** (`--mag-x`, `--mag-y`) — not React state — for 60FPS fluid motion.
- Auto-disables on `(pointer: coarse)`.

### 5.3 IndexInteractive
`app/(site)/IndexInteractive.tsx` runs imperative animations on the homepage only (mouse-tilt on hero title, scroll parallax on giant "M" ghosts, global `data-tilt` card tilt). Bails on touch and respects `prefers-reduced-motion`.

### 5.4 SocialInstagramSection
Unified CTA module used across multiple subpages. Imports `INSTAGRAM_URL` from `utils/social.ts`. Centred, high-contrast "Official Notice" aesthetic with the magnetic "Follow" interaction.

---

## 🧱 6. Mobile Chrome

- **`MobileMenu.tsx`** — full-screen slide-out drawer. Nav links: About (`/#about`) · Team (`/#team`) · Events · Membership · Apply to Speak.
- **`MobileDock.tsx`** — bottom-anchored dock: **Home / Events / Register / Menu**. Register tile is the prominent CTA. Both components share `menuOpen` state via `useSiteContext()` from `Providers.tsx`.
- Both are mounted by the `(site)` group layout and display-gated by media queries in `globals.css`.

---

## 🗄️ 7. SQL Architecture

### 7.1 Master Files (`supabase/`)

| File | Purpose |
|------|---------|
| `01_Sovereign_Member_Registry.sql` | Core identity: `members` table, citext email, ENUM types, member number support |
| `02_Meridian_EventOS_Engine.sql` | Event orchestration: `events`, `event_registrations`, RSVP triggers, `secure_register_for_event` RPC — **dormant from the public site's perspective** |
| `03_Security_Vault_and_Audit_Logs.sql` | System settings vault, master-signature verification, audit logging |

### 7.2 Migrations (`supabase/migrations/`)

| File | Purpose |
|------|---------|
| `20260415000000_foundation_registry_and_stats.sql` | `members` + `site_stats`, member-count trigger, basic RLS |
| `20260415000001_sovereign_rls_lockdown.sql` | Hardens trigger/function search paths; tightens RLS |
| `20260415000002_vault_access_control.sql` | Blocks anonymous inserts; `site_stats` read-only for anon |
| `20260416113000_advanced_member_schema_ext.sql` | Four ENUM types; `join_date_readable` generated column |
| `20260417000000_archival_audit_logging_sys.sql` | Removes back-doors; `verify_master_signature` / `set_master_signature` |
| `20260417120000_strict_privilege_revocation.sql` | `REVOKE EXECUTE` from PUBLIC; grants only to `service_role` + `postgres` |
| `20260427152500_add_member_numbers.sql` | `member_number_seq`; `generate_member_number()`; `assign_member_number` + `lock_member_number` triggers |
| `20260427154500_sovereign_hardening.sql` | Final search-path hardening; `speaker_applications` RLS |

### 7.3 Public App Database Surface

| Table / RPC | Status | Usage |
|-------------|--------|-------|
| `members` | ✅ Active | `register.ts` insert + dup check; `check_member_status` RPC |
| `site_stats` | ✅ Active | `/api/stats/count` Edge route; `MemberCounter` Realtime |
| `speaker_applications` | ✅ Active | `speak.ts` insert + dup check |
| `check_member_status` | ✅ Active | Polymorphic email/member-number lookup |
| `events`, `event_registrations` | ⚠️ Dormant | Were used by the deleted `/calendar` route; retained for potential external admin tooling |
| `secure_register_for_event`, `secure_create_event` | ⚠️ Dormant | Event RSVP RPCs; not called from the public site |
| All `archival_*`, `system_*`, `porter_*`, `speaker_portal_*` tables | 🔒 Admin | Not touched by the public site |

### 7.4 `members` Table (final state)

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | `gen_random_uuid()`, primary key |
| `email` | citext | UNIQUE NOT NULL, normalised lowercase |
| `full_name` | TEXT | NOT NULL |
| `role` | `member_role` ENUM | Student / Alumni / Professor / Professional / Other |
| `role_other` | TEXT | Optional |
| `institution` | `institution_name` ENUM | Carleton / UofO / Algonquin / Other |
| `institution_other` | TEXT | Optional |
| `interests` | TEXT[] | Array, default `{}` |
| `heard_from` | `referral_source` ENUM | |
| `volunteer_interest` | `volunteer_level` ENUM | |
| `accepted_terms` | BOOLEAN | NOT NULL DEFAULT false |
| `member_number` | TEXT | UNIQUE; auto-assigned `M{YY}-{NNNN}`; **immutable** |
| `is_verified` | BOOLEAN | DEFAULT false |
| `join_date_readable` | TEXT | Generated `MM/DD/YYYY` from `created_at` |
| `created_at` | TIMESTAMPTZ | `now()` default |

### 7.5 `site_stats` Table

| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT | PRIMARY KEY: `'meridian_global_stats'` |
| `member_count` | INTEGER | Maintained by trigger |
| `last_updated` | TIMESTAMPTZ | Updated by trigger |

### 7.6 `speaker_applications` Table
Insert via `submitSpeakerApplication`. RLS: public INSERT only; admin SELECT/UPDATE.

---

## 🔐 8. HTTP Headers & CSP

Configured in `next.config.ts`, applied to every route:

- **Content-Security-Policy**: `default-src 'self'`; `script-src` adds Vercel scripts + `'unsafe-inline'` (required for the early-reveal shim and JSON-LD); `style-src` allows inline; `img-src` allows `blob:` and `data:` (canvas card download, OG); `connect-src` whitelists Vercel + Supabase project (HTTPS + WSS); `frame-ancestors 'none'`; `form-action 'self' docs.google.com`.
- **Strict-Transport-Security**: `max-age=31536000; includeSubDomains; preload`.
- **X-Frame-Options**: `DENY`.
- **Referrer-Policy**: `strict-origin-when-cross-origin`.
- **Permissions-Policy**: `camera=(), microphone=(), geolocation=(), interest-cohort=()`.
- **X-Content-Type-Options**: `nosniff`.
- **X-XSS-Protection**: `1; mode=block`.

`next.config.ts` also defines a redirects table for legacy clean-route consolidation (see §1.1).

---

## 🧰 9. Shared Utilities

| File | Purpose |
|------|---------|
| `utils/serverActionSecurity.ts` | `securityDelay()`, `redactEmail()`, `runSecurityChecks()` — shared by `register.ts` and `speak.ts` |
| `utils/jsonld.ts` | Org / WebSite / SiteNavigation / Breadcrumb / Person / FAQ schema generators |
| `utils/metadata-shared.ts` | `getMetadata({ title, description, urlPath, keywords })` — produces per-page Metadata with OpenGraph + Twitter cards |
| `utils/og-helper.tsx` | OG image rendering helpers for per-route `opengraph-image.tsx` files |
| `utils/copy.ts` | Shared copy constants |
| `utils/social.ts` | `INSTAGRAM_URL`, `INSTAGRAM_HANDLE`, `CONTACT_EMAIL`, `CONTACT_MAILTO` |
| `constants/membership.ts` | `FAQ_ITEMS` — drives `<FaqAccordion>` and the FAQ JSON-LD schema |
| `utils/supabase/client.ts` | Browser singleton (anon key; Proxy-guarded for SSR) |
| `utils/supabase/service.ts` | SERVICE ROLE — privileged writes (bypasses RLS); server-only |
| `utils/supabase/middleware.ts` | Session refresh; used by `proxy.ts` |

---

## 🧪 10. Verification Workflow

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev (Turbopack) |
| `npm run build` | Production build (fails on type errors) |
| `npm run lint` | ESLint (`eslint-config-next` + TS-ESLint) |
| `npx tsc --noEmit` | Standalone typecheck |

Build/lint passing ≠ feature working. Always exercise UI flows in a browser (especially `/register`, mobile chrome) before claiming a task is done. If you cannot test in a browser, say so explicitly.

---

*Maintained to ensure 100% Agent Performance. Update in the same PR as any invariant change.*
