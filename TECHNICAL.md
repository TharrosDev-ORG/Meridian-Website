# The Meridian Society — Ultra-Detailed Technical Specification

This document is the definitive, high-fidelity system of record for the **Meridian Website**—the society's entire identity and the foundational base for everything it does. It serves as an **"Agent-Ready" encyclopedia** of the society's core architecture, security, and data systems.

> Pair this with [`CLAUDE.md`](CLAUDE.md) (agent guardrails + repo map) and [`AGENTS.md`](AGENTS.md) (organizational and aesthetic rules).

---

## 🏗️ 1. Architecture: Responsive Single-View Pattern

The site implements a unified, mobile-first component tree. We avoid separate mobile/desktop routes, instead relying on CSS media queries and the `PageStyles` pattern to adapt the UI.

### 1.1 Source-to-Route Mapping
| Public URL | Route Directory | Source File Path | CSS Logic |
| :--- | :--- | :--- | :--- |
| `/` | `app/(site)/` | `page.tsx` (+ `HomeClientSide.tsx`, `IndexInteractive.tsx`) | `pageCss.ts` |
| `/calendar` | `app/(site)/calendar/` | `page.tsx` (+ `CalendarClient.tsx`) | `pageCss.ts` |
| `/events` | `app/(site)/events/` | `page.tsx` | Shared Modules + `pageCss.ts` |
| `/membership` | `app/(site)/membership/` | `page.tsx` | `pageCss.ts` |
| `/social` | `app/(site)/social/` | `page.tsx` | Shared Modules + `pageCss.ts` |
| `/team` | `app/(site)/team/` | `page.tsx` | `pageCss.ts` |
| `/speak` | `app/(site)/speak/` | `page.tsx` | `pageCss.ts` |
| `/contact` | `app/(site)/contact/` | `page.tsx` | `contactPageCss.ts` |
| `/privacy` | `app/(site)/privacy/` | `page.tsx` | `privacyPageCss.ts` + shared `_info/infoPageCss.ts` |
| `/terms` | `app/(site)/terms/` | `page.tsx` | `termsPageCss.ts` + shared `_info/infoPageCss.ts` |
| `/register` | `app/register/` | `page.tsx` | Extends `membershipCss` (shared registry styles) |
| `/apply` | `app/apply/` | `page.tsx` | Shared `globals.css` |

### 1.2 Layouts and Boundaries
- **Root layout** (`app/layout.tsx`): loads Cormorant Garamond + Barlow Condensed via `next/font`, exposes `--serif` and `--sans` variables, mounts `Providers`, `ScrollProgress`, Vercel Analytics + Speed Insights, and three site-wide JSON-LD scripts (Organization, WebSite, SiteNavigationElement). It also injects:
  - **Preconnect hints** for the Supabase project and `va.vercel-scripts.com`.
  - A small inline **early-reveal shim** that adds the `.on` class to all near-top `.rv` elements at `DOMContentLoaded`, before React hydrates — eliminating an opacity-0 flash on cold loads.
- **Group layout** (`app/(site)/layout.tsx`): wraps children in `<TransitionWrapper>` and renders `NavBar`, `Footer`, `MobileMenu`, `MobileDock`, `BackToTop`. Routes outside the group (`/register`, `/apply`) must self-wrap `TransitionWrapper`.
- **Boundaries**: `app/global-error.tsx`, `app/error.tsx`, `app/not-found.tsx`, `app/(site)/loading.tsx`.

### 1.3 Desktop UI Optimization (v1.4)
The site implements a strict **Mobile Isolation Strategy** for high-resolution displays (≥1101px):
- **Spacing**: increased vertical rhythm via `--section-spacing-dt: 120px`.
- **Typography**: responsive `hero-title` scaling using `clamp` (up to ~220px on ultra-wide).
- **Performance hardening**: high-traffic animated elements use `will-change: transform, opacity` for hardware acceleration.
- **Touch fast-path**: `Providers.tsx` detects `(pointer: coarse)` and skips the IntersectionObserver entirely, immediately marking every `.rv` element as `.on`. Mouse-tilt, parallax, and 3D card-tilt effects in `IndexInteractive.tsx` short-circuit on touch.

---

## 🛡️ 2. The Registration Pipeline (Hardened)

The registration flow (`/register`) is the most mission-critical and hardened part of the site.

### 2.1 Security Pipeline Flow
Every `registerMember` call passes through all layers in order. The shared primitives live in `utils/serverActionSecurity.ts` (`securityDelay`, `redactEmail`, `runSecurityChecks`) and are reused by `submitSpeakerApplication`.

1. **Honeypot** (`fax_number`): if the hidden field is populated, return generic failure (with the same security delay as the success path so timing doesn't reveal the trigger). Code: `HP`.
2. **User-Agent + IP Rate Limit** (`runSecurityChecks`):
   - Blocks suspicious UAs: missing UA or matching `/bot|spider|crawler|curl|python|wget|postman/i`. Code: `UA`.
   - 5-minute per-IP rate limit (10-minute for `/apply`), tracked in an in-memory `Map`. The timestamp is recorded **before** slow work to prevent races between concurrent requests.
3. **Security Delay**: 300–800 ms random sleep on every path (prevents timing-based enumeration of honeypot vs. real users).
4. **Zod validation**: strict schema — see §2.2.
5. **Duplicate email check**: case-insensitive lookup via service role. Returns `success: true, alreadyRegistered: true` with the existing `member_number`, `created_at`, `full_name` so the UI can route returning members straight to the success screen (not an error path).
6. **Insert**: high-privilege `INSERT INTO members` via `createServiceClient()`. The Postgres `assign_member_number` trigger stamps `member_number` on insert.

> **Note**: in-memory rate limits are per-serverless-instance. On Vercel the same IP can hit different instances, so this is defence-in-depth alongside the honeypot and UA checks rather than a hard global lock. Promoting to a database-backed limiter is a known follow-up.

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
Numbers follow the pattern **`M{YY}-{NNNN}`**:
- `YY` — two-digit registration year (e.g. `26` for 2026)
- `NNNN` — four-digit zero-padded sequence, starting at `1001`
- Example sequence: `M26-1001`, `M26-1002`, `M26-1003` …

Numbers are assigned automatically by the Postgres trigger `assign_member_number()` on every `INSERT INTO members`. A second trigger, `lock_member_number()`, fires on `UPDATE` and raises an exception if `member_number` is changed — making assignments **permanently immutable** at the DB level.

#### Polymorphic Lookup
`checkMemberStatus(identifier)` accepts either an email (lower-cased internally) or a member number (upper-cased internally) and dispatches to the right column. This supports:
- New registrations (email lookup before showing the full form).
- Returning members (email → success screen without re-registering).
- Recovery flows (member number → retrieve name/date for card download).

#### Background Sync
`RegistrationForm` triggers a background `checkMemberStatus` call on mount if `registrationDate` or `memberName` is absent from localStorage. This ensures the member card always has accurate data even for members who registered on a different device.

#### Canvas Card Generation
The Society ID Card is generated client-side via Canvas 2D:
- **Dimensions**: 1200×1800 px (2:3 portrait ratio).
- **Layers**: cream background → paper-noise texture → ink outer border (3 px) → gold gradient inner frame → decorative gold corner marks → typography (Cormorant Garamond + Barlow Condensed) → Society Seal (top center) → member number at 160 px serif → QR code (bottom center) → "M" watermark (italic, ~3% opacity) → registration date footer.
- **Font loading**: `document.fonts.load()` awaited for all required weights before drawing; result cached in `fontsLoaded` state.
- **QR encoding**: persistent `member_number` (`M26-XXXX`) at Level H error correction for PorterOS compatibility.
- **Output**: PNG blob → object URL → `<a download>` click → `URL.revokeObjectURL` after 100 ms.

#### Data Persistence
Registration state is synchronised across:
- `localStorage` — five keys (see [CLAUDE.md](CLAUDE.md) §Data Flows).
- A 1-year `SameSite=Lax` cookie — allows the server to gate on registration status for potential future SSR use.

### 2.4 Registration Success State (UI)
The success screen renders after `isAlreadyRegistered && memberNumber`:

| Element | Detail |
|---------|--------|
| Welcome heading | "Welcome, *{firstName}.*" — italic gold on `--ink` |
| Member number | `ScrambleTicker`: ~500 ms scramble, 30 ms steps, random `[0-9A-Z]` chars progressively revealing the final value |
| Copy button | `navigator.clipboard` + `execCommand` fallback; `copyTimeoutRef` prevents race resets; only flashes "Copied" on actual success |
| Registration date | "Member Since" label + e.g. `April 27, 2026` format |
| Card preview | HTML/CSS card with ink border, gold inner frame, corner accents, member name/number/date — visible before download |
| Download button | Triggers canvas generation; states: "Download Member Card" → "Download Started" → "Download Finished" |
| Return Home | `router.push("/")` |

### 2.5 Speaker Application (`/apply`)
`<SpeakerForm>` posts to `submitSpeakerApplication` (`app/actions/speak.ts`). It uses the same honeypot → UA → rate-limit (10-minute window) → security-delay → Zod pipeline. On success it inserts into `speaker_applications` via the service client. RLS on the table allows public INSERT but no public SELECT/UPDATE; a separate admin policy reads the application queue.

---

## ⚡ 3. Telemetry & Live Member Counting

The live member counter uses a multi-layered architecture for near-zero latency. **It lives on the homepage**, not in the footer.

### 3.1 Data Flow Architecture
1. **Bootstrap**: `MemberCounter.tsx` (used in `app/(site)/page.tsx` About section) fetches `/api/stats/count` on mount (Edge runtime, `Cache-Control: no-store`).
2. **Realtime**: a Supabase Realtime channel (`member-stats-global`) subscribes to `UPDATE` events on `site_stats`.
3. **Trigger**: a DB trigger on `members` increments/decrements `site_stats.member_count` on every `INSERT`/`DELETE`.
4. **Edge fallback**: the Edge route falls back to a direct `count: exact, head: true` query on `members` if the `site_stats` lookup fails.
5. **Server fallback**: `app/actions/getMemberCount.ts` exposes the same fallback path as a server action for any future SSR need.

### 3.2 Footer Note
`Footer.tsx` is intentionally a server component with **no realtime subscription** — the counter was deliberately moved to the homepage to avoid opening a Supabase WebSocket on every page view. Do not regress this.

---

## ✨ 4. Animation Engine & Reveal Lifecycle

The site uses a strict "Observer-Reveal" pattern managed through `Providers.tsx`.

### 4.1 Intersection Observer (`.rv`)
- **Properties**: `threshold: 0.01`, `rootMargin: "0px 0px 100px 0px"`.
- **Logic**: elements with `.rv` gain `.on` when they enter the viewport.
- **Stagger Delays**: managed via `data-d="1..5"` attributes (80 ms increments).
- **Page Transitions**: content is wrapped in `TransitionWrapper`, which applies the `pageSweep` keyframe (opacity 0→1, blur 8px→0, translateY 10px→0).
- **Touch fast-path**: on `(pointer: coarse)` devices the observer is skipped and every `.rv` element is marked `.on` immediately.
- **Dynamic content**: `window.__observeReveal()` (registered by `Providers`) re-scans the DOM for unrevealed `.rv` nodes after async client-side renders (used by `MemberCounter`, `CalendarClient`).

### 4.2 Magnetic UI Logic (`Magnetic.tsx`)
- Mouse events calculate pull strength relative to the element centre.
- **Performance**: high-frequency mouse moves update **CSS variables** (`--mag-x`, `--mag-y`) rather than React state, ensuring 60FPS fluid motion.
- **Auto-Disable**: detects `(pointer: coarse)` and disables the effect on touch devices.
- **Wordmark Integration**: the NavBar wordmark uses the Magnetic effect on desktop.

### 4.3 IndexInteractive
`app/(site)/IndexInteractive.tsx` runs imperative animations on the homepage only (mouse-tilt on the hero title, scroll parallax on the giant "M" ghosts, global 3D `data-tilt` card tilt). It bails on touch devices and respects `prefers-reduced-motion`.

### 4.4 Social Record Pattern (`SocialInstagramSection.tsx`)
- **Purpose**: a unified CTA module used across multiple subpages.
- **Design**: centred, high-contrast "Official Notice" aesthetic with the magnetic "Follow" interaction.
- **Logic**: imports `INSTAGRAM_URL` from `utils/social.ts` to ensure link persistence.

---

## 🧱 5. Mobile Chrome

- `MobileMenu.tsx` — full-screen slide-out drawer.
- `MobileDock.tsx` — bottom-anchored dock with **Home / Calendar / Register / Menu**. The Register tile is styled as the prominent CTA. The dock toggles `menuOpen` state shared with the drawer through `useSiteContext()` from `Providers.tsx`.
- Both components are mounted by the `(site)` group layout. They are display-gated by media queries inside `globals.css` so they vanish on desktop.

---

## 🔒 6. Permanent Information Policy

**Static-First Intent**: the `/events` and `/social` pages are documented **event history guides**.
- `/calendar` serves as the dynamic portal for all upcoming forums and gatherings (ISR, `revalidate = 60`).
- No dynamic event fetching is implemented for historical pages (`/events`, `/social`).
- JSON-LD Event schemas pointing to future dates are strictly prohibited on historical pages to maintain static integrity.
- All real-time announcements are redirected to the Society's Instagram.

---

## 📅 7. Calendar & Event RSVPs

`/calendar` is rendered with ISR (`revalidate = 60`). The server component fetches:
- Upcoming `events` (status `active`, `date >= now()`, asc).
- The most recent 3 past `events` (status `active`, `date < now()`, desc).

It then renders `<CalendarClient>` which:
- Auto-expands the lead event (`initialEvents[0]`).
- Lets users open `<PublicRegistration>` to RSVP. The widget collects a member number and calls the `secure_register_for_event` RPC. Responses are validated at the boundary by `PublicRegisterResultSchema` (`utils/rpcSchemas.ts`).
- Generates a downloadable `.ics` via `utils/ics.ts` for any event card.

---

## 🛰 8. PorterOS Synchronization
- **ID Strategy**: member IDs are persistent access keys. EventOS verifies scanned `member_number` payloads against the `members` registry.
- **Verification Logic**: 1) Scanned `M26-XXXX` → 2) Registry check → 3) Ticket cross-reference (event ID) → 4) Attendance log entry.

---

## 🗄 9. SQL Architecture

### 9.1 Master files (`supabase/`, sequential foundation)

| File | Purpose |
|------|---------|
| `01_Sovereign_Member_Registry.sql` | Core identity and member registry (extensions, ENUMs, `members` table, citext email, member number support) |
| `02_Meridian_EventOS_Engine.sql` | Event orchestration: `events`, `event_registrations`, `secure_create_event`, `secure_register_for_event`, RSVP count trigger |
| `03_Security_Vault_and_Audit_Logs.sql` | System settings vault, master signature verification, audit logging |

### 9.2 Migrations (`supabase/migrations/`, applied in order)

| File | Purpose |
|------|---------|
| `20260415000000_foundation_registry_and_stats.sql` | Creates `members` and `site_stats`; member-count trigger; basic RLS |
| `20260415000001_sovereign_rls_lockdown.sql` | Hardens trigger/function search paths; tightens RLS; drops legacy artefacts |
| `20260415000002_vault_access_control.sql` | Blocks direct anonymous API inserts; `site_stats` read-only for anon |
| `20260416113000_advanced_member_schema_ext.sql` | Adds four ENUM types (`member_role`, `institution_name`, `referral_source`, `volunteer_level`); converts text columns; adds generated column `join_date_readable` (MM/DD/YYYY) |
| `20260417000000_archival_audit_logging_sys.sql` | Removes remaining anonymous back-doors; defines `verify_master_signature` / `set_master_signature` |
| `20260417120000_strict_privilege_revocation.sql` | `REVOKE EXECUTE` on all functions from `PUBLIC`; grants only to `service_role` and `postgres` |
| `20260427152500_add_member_numbers.sql` | Adds `member_number_seq` (starts 1001); `member_number TEXT UNIQUE`; `generate_member_number()` → `M{YY}-{NNNN}`; `assign_member_number` + `lock_member_number` triggers; backfills existing rows |
| `20260427154500_sovereign_hardening.sql` | Final search-path hardening on all functions; EXECUTE lockdown for anon/authenticated; `speaker_applications` RLS (public INSERT, no public SELECT/UPDATE); RSVP-count trigger search_path |

### 9.3 `members` Table (final state)

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | `gen_random_uuid()`, primary key in master file |
| `email` | citext | UNIQUE NOT NULL, normalised to lowercase |
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

### 9.4 `site_stats` Table

| Column | Type | Notes |
|--------|------|-------|
| `id` | TEXT | PRIMARY KEY: `'meridian_global_stats'` |
| `member_count` | INTEGER | Maintained by trigger |
| `last_updated` | TIMESTAMPTZ | Updated by trigger |

### 9.5 `events` Table

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | `gen_random_uuid()` PK |
| `name` | TEXT | NOT NULL |
| `date` | TIMESTAMPTZ | NOT NULL |
| `location` | TEXT | NOT NULL |
| `capacity` | INTEGER | NOT NULL |
| `description` | TEXT | Optional |
| `status` | TEXT | `'active' | 'archived' | 'cancelled'` |
| `is_members_only` | BOOLEAN | Gate flag for the public registration widget |
| `rsvp_count` | INTEGER | Maintained by trigger from `event_registrations` |
| `created_at` | TIMESTAMPTZ | `now()` default |

### 9.6 `event_registrations` Table

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | PK |
| `event_id` | UUID | FK → `events.id` |
| `member_id` | UUID | Optional FK → `members.id` |
| `member_name` | TEXT | NOT NULL |
| `email` | citext | NOT NULL |
| `attended` | BOOLEAN | DEFAULT false |
| `qr_code_token` | TEXT | UNIQUE; random 16-byte hex |
| `created_at` | TIMESTAMPTZ | |

### 9.7 `speaker_applications` Table
Created/managed via the speaker pipeline; insert via `submitSpeakerApplication`. RLS: public INSERT only; admin SELECT/UPDATE.

### 9.8 RPC Surface
| Function | Purpose |
|----------|---------|
| `secure_create_event` | Admin-only event creation, gated by `archival_settings.porter_secret` |
| `secure_register_for_event` | Member-number-gated event RSVP; returns `{ success, message, data: { id, token, member_name } }` |
| `assign_member_number` / `lock_member_number` | Member number triggers |
| `verify_master_signature` / `set_master_signature` | System-vault auth |
| `update_event_rsvp_count` | Trigger function on `event_registrations` |

All sensitive functions are `SECURITY DEFINER` with explicit `SET search_path` and have `EXECUTE` revoked from `PUBLIC` / `anon` / `authenticated` (granted only to `service_role` + `postgres`).

---

## 🔐 10. HTTP Headers & CSP

Configured in `next.config.ts` and applied to every route:

- **Content-Security-Policy**: `default-src 'self'`; `script-src` adds Vercel scripts + `'unsafe-inline'` (required for the early-reveal shim and JSON-LD); `style-src` allows inline (Next + page CSS); `img-src` allows `blob:` and `data:` (canvas card download, OG); `connect-src` whitelists Vercel + the Supabase project (HTTPS + WSS); `frame-ancestors 'none'`; `form-action 'self' docs.google.com`.
- **Strict-Transport-Security**: `max-age=31536000; includeSubDomains; preload`.
- **X-Frame-Options**: `DENY`.
- **Referrer-Policy**: `strict-origin-when-cross-origin`.
- **Permissions-Policy**: `camera=(), microphone=(), geolocation=(), interest-cohort=()`.
- **X-Content-Type-Options**: `nosniff`.
- **X-XSS-Protection**: `1; mode=block`.

`next.config.ts` also defines a small redirects table for legacy `.html` URLs (`/index.html`, `/team.html`, `/membership.html`, etc.) → their clean Next routes.

---

## 🧰 11. Shared Utilities

| File | Purpose |
|------|---------|
| `utils/serverActionSecurity.ts` | `securityDelay()`, `redactEmail()`, `runSecurityChecks()` — shared by `register.ts` and `speak.ts` |
| `utils/rpcSchemas.ts` | Zod runtime schemas for Supabase RPC responses (`PublicRegisterResultSchema`, `CreateEventResultSchema`, etc.) |
| `utils/ics.ts` | `generateICS()` / `downloadICS()` for calendar event downloads |
| `utils/jsonld.ts` | Org / WebSite / SiteNavigation / Breadcrumb / Event / Person / FAQ schema generators |
| `utils/metadata-shared.ts` | `getMetadata({ title, description, urlPath, keywords })` — produces the per-page Metadata object including OpenGraph and Twitter cards |
| `utils/og-helper.tsx` | OG image rendering helpers used by per-route `opengraph-image.tsx` files |
| `utils/copy.ts` | Shared copy constants (e.g. `INAUGURAL_EVENT_LABEL`) |
| `utils/social.ts` | `INSTAGRAM_URL`, `INSTAGRAM_HANDLE`, `CONTACT_EMAIL`, `CONTACT_MAILTO` |
| `constants/membership.ts` | `FAQ_ITEMS` source for `<FaqAccordion>` and the FAQ JSON-LD schema |

---

## 🧪 12. Verification Workflow

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev (Turbopack) |
| `npm run build` | Production build (fails on type errors) |
| `npm run lint` | ESLint (`eslint-config-next` + TS-ESLint) |
| `npx tsc --noEmit` | Standalone typecheck |

Build/lint pass ≠ feature works. Always exercise UI flows in a browser (especially `/register`, `/calendar`, mobile chrome) before claiming a task is done.

---

*Maintained to ensure 100% Agent Performance.*
