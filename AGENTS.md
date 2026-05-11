# Meridian Website — AGENTS.md

Instructions and context for AI agents working on the Meridian Society flagship website.

---

## 🏛️ Organizational Context

The **Meridian Website** is the core of The Meridian Society — the society's entire identity and foundational base for all its operations. All designs must adhere to the high-contrast, cream-and-ink aesthetic.

---

## 🚦 Strategic Rules

1. **Strict Typing**: Maintain TypeScript integrity. Avoid `any` for registration, member, or Supabase response objects. Validate Supabase RPC payloads at the call site — `utils/rpcSchemas.ts` no longer exists; validate inline or add a new schema file if needed.

2. **No Dynamic Overrides**: Do not modify `globals.css` design tokens without explicit authorization. Tailwind v4 is present only for the `@theme {}` block — structural CSS lives in `globals.css` and per-page `pageCss.ts` strings.

3. **Pathing & Network Proxy**:
   - All session refresh logic lives in `proxy.ts` (Next.js 16 rename of `middleware.ts`). Do **not** create a root `middleware.ts` — Next.js 16 will error with "Both middleware file and proxy file are detected."
   - The public site has no auth flows; the proxy short-circuits when no `sb-*-auth-token` cookie is present.

4. **Supabase Client Rules**:
   - Browser client: use the singleton in `utils/supabase/client.ts` (anon key, Proxy-guarded for SSR).
   - Service-role writes must stay in server actions / route handlers; **never import `utils/supabase/service.ts` from a `'use client'` file**.
   - `utils/supabase/server.ts` no longer exists — it was removed with the `/calendar` route. Use `service.ts` for privileged server writes.

5. **Mounted Guard**: All `'use client'` components that access browser-only APIs (`MemberCounter`, `RegistrationForm`, `SpeakerForm`, `EventsTabs`) must gate those calls behind a `mounted` boolean set in `useEffect`. The Supabase browser client throws on SSR access.

6. **CSS Module Policy**: Centralized layout patterns (Heroes, Intro Grids, Cards) use shared `.module-*` classes in `app/globals.css`. Do not duplicate structural CSS in `pageCss.ts`.

7. **Mobile Isolation Strategy**: All desktop-only enhancements (increased spacing, hover states, desktop-specific typography) must be strictly inside `@media (min-width: 1101px)`. This protects iOS input-zoom fixes, safe-area insets, and MobileDock placement.

8. **Shared Security Primitives**: All public-write server actions must run through `utils/serverActionSecurity.ts` (`runSecurityChecks` + `securityDelay` + `redactEmail`). Never re-implement the honeypot / UA / rate-limit pipeline ad-hoc.

9. **setState Deferral**: `setState` inside `useEffect` must use `setTimeout(..., 0)` or be fired from an event handler / subscription callback. ESLint enforces `react-hooks/set-state-in-effect`. See `FaqAccordion`, `MemberCounter`, `EventsTabs`.

10. **Static Events Policy**: `/events` is a static, tabbed informational page (Speaker Forum + Social Gatherings). **Do not reintroduce a dynamic event calendar** — the `/calendar` route was deliberately removed. Real-time announcements belong on Instagram.

---

## 🛠️ Feature-Specific Logic

### Real-Time Member Count
- Hybrid approach: initial fetch via `/api/stats/count` (Edge runtime, `no-store`) followed by a Supabase Realtime subscription on channel `member-stats-global` listening for `UPDATE`s on `site_stats`.
- Renders in the **homepage About section** via `<MemberCounter>`, NOT in the footer.
- The footer is a server component with no realtime. Do not move the counter there.

### Registration Flow
- **Honeypot** (`fax_number`) → **bot UA rejection** + **IP rate limit** (5-min for `/register`, 10-min for `/apply`) → **security delay** → **Zod validation** → **duplicate check** → **INSERT**.
- **Polymorphic Lookup**: `checkMemberStatus(identifier)` accepts email (lower-cased) or member number (upper-cased).
- **Background Sync**: missing localStorage fields (join date / full name) are back-filled transparently on mount.
- **Canvas ID Card** (1200×1200 px square):
  - Layers: cream bg → noise texture → ink border → gold inner frame → corner marks → seal → name → member number (160 px serif) → member-since date → signature line.
  - Font loading: awaited via `document.fonts.load()` before drawing.
  - **No QR code.** The card is a clean visual credential.
  - Output: PNG blob → `<a download>` → `URL.revokeObjectURL`.

### Events Page (`/events`)
- `EventsTabs.tsx` is a client island that manages `activeTab` (`'forum' | 'social'`).
- Initializes from `window.location.hash` on mount; listens for `hashchange` for in-session switching.
- Hash deep-links (`/events#forum`, `/events#social`) activate the tab and `scrollIntoView` on `#programs`.
- Uses ARIA `role="tablist"` / `role="tab"` / `role="tabpanel"`.

### Speaker Application (`/apply`)
- `<SpeakerForm>` → `submitSpeakerApplication` → service role INSERT into `speaker_applications`.
- Same security pipeline as registration (10-minute rate limit).

### Success Screen
- **Single-Viewport Constraint**: `.success-overhaul` must fit within `90vh` on desktop.
- All exit paths use Next.js `useRouter` for fluid SPA navigation.

---

## 🎨 Aesthetic Rules

- **Typography**: always `--serif` (Cormorant Garamond) for primary headings; always `--sans` (Barlow Condensed) for labels and metadata.
- **Color**: background `--cream` (#F4EDE3); text `--ink` (#18150F); accent `--gold` (#B8932A). Never use pure `#FFF` or `#000`.
- **Borders**: subtle — `1px solid var(--ink-15)` or similar opacity variants.
- **Hover states**: use `var(--gold)`.
- **Apostrophes in JSX**: write `&apos;` — the `react/no-unescaped-entities` lint rule will fail the build.

---

## 🗄️ Database Surface (Public App)

| Table / RPC | Status |
|-------------|--------|
| `members` | ✅ Active — register + dup check |
| `site_stats` | ✅ Active — live counter |
| `speaker_applications` | ✅ Active — speaker pipeline |
| `check_member_status` | ✅ Active — polymorphic lookup |
| `events`, `event_registrations` | ⚠️ Dormant — retained for external admin tooling; do not drop without explicit instruction |
| `secure_register_for_event`, `secure_create_event` | ⚠️ Dormant — not called from the public site |
| Admin/system tables | 🔒 Not touched by the public site |

All sensitive functions are `SECURITY DEFINER` with explicit `SET search_path`. `EXECUTE` is revoked from `PUBLIC`, `anon`, and `authenticated`; granted only to `service_role` + `postgres`.

---

## 📋 Navigation (Current State)

| Surface | Links |
|---------|-------|
| NavBar (desktop) | About (`/#about`) · Team (`/#team`) · Events · Membership + Register CTA |
| MobileMenu | About · Team · Events · Membership · Apply to Speak |
| MobileDock | Home · Events · Register · Menu |
| Footer | Society (Home / Team / Membership) · Engage (Events / Apply to Speak) · Connect (Instagram) · Info (Contact / Privacy / Terms) |
