# Meridian Website — AI Agent Guide

This document is the entry point for any AI coding assistant working on this repo. It captures the invariants, guardrails, and mental model you need before touching code. Keep edits minimal and honor the project's existing aesthetic.

## Stream Timeout Prevention

1. Do each numbered task ONE AT A TIME. Complete one task fully,
   confirm it worked, then move to the next.
2. Never write a file longer than ~150 lines in a single tool call.
   If a file will be longer, write it in multiple append/edit passes.
3. Start a fresh session if the conversation gets long (20+ tool calls).
   The error gets worse as the session grows.
4. Keep individual grep/search outputs short. Use flags like
   `--include` and `-l` (list files only) to limit output size.
5. If you do hit the timeout, retry the same step in a shorter form.
   Don't repeat the entire task from scratch.

---

## 🏛️ Project Identity
**The Meridian Society**: The website is the society's core identity and foundational base.
**Aesthetic**: Premium, professional, high-contrast.

- **Background**: `--cream` (#F4EDE3)
- **Primary Text**: `--ink` (#18150F)
- **Accent**: `--gold` (#B8932A)
- **Typography**: serif (Cormorant Garamond via `--serif`) for titles; condensed sans (Barlow Condensed via `--sans`) for metadata/UI.

---

## ⚡ Tech Stack
- **Framework**: Next.js **16.2.3** (App Router, static-first, Turbopack dev/build).
- **UI**: React **19.2.4**, Server Components by default; `"use client"` only where necessary (forms, realtime subscriptions, scroll/observer hooks, mouse-driven UI).
- **Styling**: Tailwind CSS **v4** is installed primarily for the `@theme {}` block in `globals.css`. The real styling engine is hand-written CSS in **`app/globals.css`** (with a shared `.module-` layer) plus per-page `pageCss.ts` strings injected via `<PageStyles>`. Treat `globals.css` as the source of truth for structural components.
- **Database / Realtime**: Supabase (Postgres + Realtime). Trigger-maintained `site_stats.member_count`. Event RSVPs flow through `SECURITY DEFINER` RPCs (`secure_register_for_event`) — not direct table writes.
- **Live telemetry**: Edge route `/api/stats/count` (no-store) provides the bootstrap count; the homepage `MemberCounter` then subscribes to Supabase Realtime channel `member-stats-global` for live `UPDATE`s on `site_stats`.
- **Validation**: `zod` v4 — registration schema (`app/actions/register.ts`), speaker schema (`app/actions/speak.ts`), and runtime-validated RPC response shapes (`utils/rpcSchemas.ts`).
- **Headers / CSP**: Hardened CSP, HSTS (preload), `X-Frame-Options: DENY`, `Permissions-Policy`, `Referrer-Policy`, etc. configured in `next.config.ts`. `connect-src` whitelists Vercel + the Supabase project (HTTPS + WSS for Realtime). `next.config.ts` also serves the legacy `.html` → clean-route redirects.
- **Analytics**: `@vercel/analytics` and `@vercel/speed-insights` mounted in the root layout.
- **Deployment**: Vercel; auto-deploys on push to `main`.

### Next.js 16 rename: middleware → proxy
In Next.js 16, root `middleware.ts` is renamed to **`proxy.ts`**. Ours lives at `/proxy.ts` and re-uses `utils/supabase/middleware.ts` to refresh Supabase sessions on every request. Do **not** create a root `middleware.ts` — Next will error with "Both middleware file and proxy file are detected."

---

## 🗂️ Repository Layout
```
app/
  layout.tsx                    Root layout: fonts (Cormorant + Barlow Condensed),
                                  preconnect hints, DOMContentLoaded early-reveal
                                  shim, Providers, ScrollProgress, Vercel
                                  Analytics + Speed Insights, site-wide JSON-LD
  globals.css                   THE single source of truth for structural CSS
  (site)/                       Layout group — wraps children in TransitionWrapper,
    layout.tsx                    renders NavBar, Footer, MobileMenu, MobileDock,
                                  BackToTop
    page.tsx                    /                (home — server component)
    HomeClientSide.tsx          Client-only dynamic exports used by the homepage
                                  (MemberCounter, Marquee, IndexInteractive)
    IndexInteractive.tsx        Imperative homepage animation logic (mouse tilt,
                                  scroll parallax, 3D card tilt) — desktop only
    pageCss.ts                  Homepage-scoped CSS string
    opengraph-image.tsx         Dynamic OG image for /
    not-found.tsx, loading.tsx  Group-level boundaries
    _info/infoPageCss.ts        Shared CSS for informational pages (privacy/terms)
    events/, social/, team/,    Each route folder pairs page.tsx + pageCss.ts +
    speak/, calendar/,            opengraph-image.tsx (where applicable)
    membership/, contact/,
    privacy/, terms/
    calendar/CalendarClient.tsx Interactive calendar (RSVP gate, accordion,
                                  ICS download, member-only filter)
  register/page.tsx             /register  — OUTSIDE the (site) group;
                                  wraps its own <TransitionWrapper> manually
  apply/page.tsx                /apply     — OUTSIDE the (site) group;
                                  speaker application; wraps its own
                                  <TransitionWrapper> manually
  actions/
    register.ts                 Server action: honeypot + IP rate limit + bot UA
                                  + security delay + Zod + service-role insert
                                  into `members`. Also exports
                                  checkMemberStatus(identifier) (email | M-num).
    speak.ts                    Server action: speaker application pipeline
                                  (same security pattern; 10-min rate-limit window)
    getMemberCount.ts           Server action: site_stats.member_count (+ fallback)
  api/stats/count/route.ts      Edge runtime, no-store; bootstrap fetch for the
                                  homepage MemberCounter
  sitemap.ts, robots.ts         Static SEO surfaces

components/
  NavBar.tsx, MobileMenu.tsx    Header + slide-out mobile drawer (uses Providers
                                  context for menuOpen)
  MobileDock.tsx                Bottom-anchored mobile dock (Home / Calendar /
                                  Register / Menu) — also uses Providers context
  Footer.tsx                    Server component; brand block + nav columns
                                  (NO live counter — that lives on the homepage)
  TransitionWrapper.tsx         Keyed wrapper for page entry animations
  ScrollProgress.tsx            Top gold reading-progress bar
  BackToTop.tsx                 Arc-progress floating button
  BackButton.tsx                Tiny "← Go Back" router.back() button
  Magnetic.tsx                  Mouse-follow "pull" effect via CSS vars (60FPS,
                                  auto-disabled on (pointer: coarse))
  MemberCounter.tsx             Homepage live counter — Edge bootstrap +
                                  Realtime channel `member-stats-global`
  Marquee.tsx                   Marquee strip used on home + calendar
  RegistrationForm.tsx          Member registration form + ScrambleTicker +
                                  copy-to-clipboard + canvas card download
  SpeakerForm.tsx               Speaker application form
  FaqAccordion.tsx              Accordion driven by FAQ_ITEMS (constants/membership)
  PageStyles.tsx                Injects per-page <style> blocks
  Providers.tsx                 SiteContext (menuOpen) + IntersectionObserver
                                  reveal manager (skipped on touch devices)
  shared/PublicRegistration.tsx RPC-based event RSVP widget (member-number gate)
  sections/RegisterSection.tsx       Final-CTA register block (used on home + membership)
  sections/SocialInstagramSection.tsx Shared "follow on Instagram" CTA module

utils/
  copy.ts                       Shared copy constants (e.g. INAUGURAL_EVENT_LABEL)
  social.ts                     INSTAGRAM_URL / INSTAGRAM_HANDLE / CONTACT_EMAIL
                                  / CONTACT_MAILTO
  jsonld.ts                     JSON-LD helpers (Org, WebSite, Breadcrumb, Event,
                                  Person, FAQ, SiteNavigation)
  metadata-shared.ts            Shared OpenGraph / metadata builder
  og-helper.tsx                 OG image generation helpers
  ics.ts                        Generates downloadable .ics files for /calendar
  rpcSchemas.ts                 Zod runtime schemas for Supabase RPC responses
  serverActionSecurity.ts       Shared security primitives: securityDelay(),
                                  redactEmail(), runSecurityChecks() — used by
                                  register.ts and speak.ts
  supabase/
    client.ts                   Browser client (anon, Proxy-guarded for SSR)
    server.ts                   Server-side reads (anon) with cookie propagation
    middleware.ts               Session refresh (used by proxy.ts)
    service.ts                  SERVICE ROLE — privileged writes (bypass RLS)

constants/membership.ts         FAQ_ITEMS source (FaqAccordion + JSON-LD)
proxy.ts                        Next.js 16 edge proxy (root level)
next.config.ts                  CSP + security headers + legacy .html redirects
supabase/                       Master SQL files (01-03) + migrations/
docs/                           Audit reports + ad-hoc planning artefacts
public/assets/                  Images (team portraits), favicons, OG image
```

---

## 🛡️ Critical Guardrails (Anti-Patterns)

1. **Never use `overflow: visible`** on elements with `.rv-stagger`. It breaks the clipping mask that gates the reveal animation.
2. **Never use pure white (#FFF) or pure black (#000)**. Use `--cream` (#F4EDE3) and `--ink` (#18150F). Opacity variants (`--ink-75`, `--cream-mid`, etc.) are defined in `:root`.
3. **Escaped apostrophes**: write `&apos;` inside JSX text. `eslint-plugin-react` rule `react/no-unescaped-entities` will fail the build otherwise.
4. **No anonymous DB writes.** RLS on `members` is fully locked down. All enrollment must go through the `registerMember` server action (which uses `utils/supabase/service.ts` — service role key, server-only). Never import `service.ts` from a `"use client"` file. Event RSVPs must go through the `secure_register_for_event` RPC (called from `PublicRegistration.tsx`); do not insert into `event_registrations` directly.
5. **Static-first content policy**: `/events` and `/social` are permanent informational event history guides. `/calendar` is the dynamic portal for upcoming events (ISR, revalidate=60s). Dynamic announcements also happen on Instagram. **Do not add dated upcoming events to the /events or /social pages.**
6. **Prefer class selectors over type selectors for structural components.** The header nav uses `.site-nav` (not bare `nav {}`) precisely because a bare type selector once hijacked every `<nav>` on the page — including the footer Index column, which got teleported into a fixed top bar. Follow the same pattern if you add other structural components (modals, drawers, etc.).
7. **Mobile Isolation Strategy**: Desktop-specific optimizations (hovers, spacing, scaling) must be strictly encapsulated in `@media (min-width: 1101px)` to protect mobile stability (iOS input-zoom fixes, safe-area insets, MobileDock layout).
8. **`setState` inside `useEffect` must be deferred.** The ESLint rule `react-hooks/set-state-in-effect` treats a synchronous `setState` call in an effect body as an error. Use `setTimeout(() => setX(...), 0)` or set it inside an event handler / subscription callback. See `components/FaqAccordion.tsx` and `components/MemberCounter.tsx` for the canonical pattern.
9. **Routes outside `(site)` must self-wrap `TransitionWrapper`.** `/register` and `/apply` are the current examples. If you add another route outside the group, wrap its page content in `<TransitionWrapper>` so the `.page-sweep` entry animation fires.
10. **Member numbers are immutable.** A Postgres trigger blocks any `UPDATE` to `member_number`. Never attempt to reassign one in code — the DB will reject it and the column will remain unchanged.
11. **Mounted Guard for client realtime / browser APIs.** The Supabase browser client is wrapped in a Proxy that throws on SSR access. Components that use it (`MemberCounter`, `CalendarClient`, `PublicRegistration`) must follow the Mounted Guard pattern: gate Supabase calls and any `window`/`document` access behind a `mounted` flag set in `useEffect`.
12. **Don't restore the live counter to the Footer.** The footer is intentionally a server component with no realtime. The live counter lives in the homepage About section via `MemberCounter`. Re-introducing realtime to the footer would re-add a Supabase WebSocket on every page view across the site.

---

## ✨ Premium UI Patterns
- **Scroll reveals**: add `className="rv"` to an element and optionally `data-d="1"`–`data-d="5"` to stagger entry by 80ms steps. The early-reveal shim in `app/layout.tsx` adds `.on` to above-the-fold `.rv` elements at `DOMContentLoaded`, before React hydrates, eliminating opacity-0 flashes. Touch devices skip the IntersectionObserver entirely (see `Providers.tsx`) and reveal everything immediately.
- **Magnetic buttons**: wrap a CTA in `<Magnetic strength={0.2}>` for the cursor-pull effect. Internally it writes `--mag-x`/`--mag-y` CSS variables to avoid React re-renders. Auto-disables on `(pointer: coarse)`.
- **Page transitions**: `TransitionWrapper` is keyed on `usePathname()` so it re-mounts on every route change, firing the `pageSweep` keyframe (opacity 0→1, blur 8px→0, translateY 10px→0). Already in place for `(site)` pages via the group layout.
- **Inline per-page CSS**: `<PageStyles css={...} />` injects a `<style>` block for page-local rules. Use it sparingly and only for genuinely page-scoped concerns (e.g. `app/register/page.tsx` imports and extends `membershipCss`).
- **Mobile chrome**: `MobileMenu` (full-screen drawer) and `MobileDock` (bottom dock) both consume `useSiteContext().menuOpen` from `Providers.tsx`. The dock toggles the menu and shares its open state.

---

## 🗄️ Supabase Project
- **Project ID**: `dsyiuztquzkcikehkigv`
- **Project Name**: meridian society Member Database
- **Region**: us-west-2
- **Status**: ACTIVE_HEALTHY

For any database work (schema changes, migrations, queries, table inspection), use the **Supabase MCP** tools (prefixed `mcp__4f8fced6-40b5-482d-bc7f-0d5ae7671829__`) with project ID `dsyiuztquzkcikehkigv`. Do not guess or hardcode values — always query the MCP directly.

---

## 🧪 Supabase Architecture
Four clients, each with a narrow purpose. All validate their env vars at creation time.

| File | Key | Used from | Purpose |
|------|-----|-----------|---------|
| `utils/supabase/client.ts` | anon | `"use client"` components | Browser client (homepage `MemberCounter`, `CalendarClient`, `PublicRegistration`); SSR-guarded by a Proxy |
| `utils/supabase/server.ts` | anon | Server Components | Server-side reads with cookie propagation (e.g. `/calendar` event fetch) |
| `utils/supabase/middleware.ts` | anon | `proxy.ts` | Refreshes auth session per request |
| `utils/supabase/service.ts` | **service role** | Server Actions / API routes **only** | Bypasses RLS — privileged writes |

**Env vars**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public), and `SUPABASE_SERVICE_ROLE_KEY` (server-only, never prefix with `NEXT_PUBLIC_`).

---

## 🔁 Data Flows

### Registration
`/register` → `<RegistrationForm>` → `registerMember` server action (`app/actions/register.ts`) → `createServiceClient()` → `INSERT INTO members`.

The shared security pipeline (factored into `utils/serverActionSecurity.ts`) runs in order:
**honeypot** (`fax_number` field) → **bot User-Agent check** + **IP rate limit** (5-min window per instance) → **300–800 ms security delay** → **Zod schema** → **duplicate email check** → insert.

On success the action returns `{ success, memberNumber, createdAt, fullName }`. Duplicate emails return `success: true, alreadyRegistered: true` with the existing record so the UI can transparently route returning members to the success state. The client stores results in five `localStorage` keys plus a 1-year cookie, clears the form draft, and renders the success state.

### Registration Success State
Condition: `isAlreadyRegistered && memberNumber`. The success screen (`RegistrationForm.tsx`) renders:

- **Welcome heading** — personalised with `firstName` (split from `memberName` state)
- **Member number** — `ScrambleTicker` component: ~500 ms scramble (30 ms steps, random `[0-9A-Z]` chars progressively revealing the final value)
- **Copy-to-clipboard** — button next to the number; uses `navigator.clipboard` with `document.execCommand` fallback; tracks pending timeout in `copyTimeoutRef` so rapid clicks don't cause early resets; only shows "Copied" if the copy actually succeeded; cleared on unmount
- **Registration date** — "Member Since" row, formatted as e.g. `April 27, 2026`; sourced from `registrationDate` state (populated from localStorage on mount or background-synced from DB if missing)
- **Card preview** — HTML/CSS miniature of the downloadable card (title, name, number, date) rendered above the download button
- **Download Member Card** — Canvas 2D: 1200×1800 px PNG with cream background, paper-noise texture, ink outer border, gold gradient inner border, gold corner marks, Cormorant Garamond typography (number at 160 px), society seal (top center), QR code (bottom center), "M" watermark, registration date footer
- **Return to Home** button (`router.push("/")`)

**localStorage keys**:

| Key | Value |
|-----|-------|
| `meridian_registered_v1` | `"true"` |
| `meridian_member_number_v1` | e.g. `"M26-1001"` |
| `meridian_join_date_v1` | ISO timestamp |
| `meridian_member_name_v1` | Full name string |
| `meridian_registration_draft_v1` | JSON form draft (cleared on success) |

### Member Number System
Numbers are assigned by a Postgres sequence (`member_number_seq`, starts at 1001) via the `assign_member_number` trigger on `INSERT`. Format: **`M{YY}-{NNNN}`** — two-digit year + four-digit zero-padded sequence (e.g. `M26-1001`). A second trigger (`lock_member_number`) blocks any `UPDATE` to `member_number`, making assignments permanent.

`checkMemberStatus(identifier)` performs a **polymorphic lookup**: accepts either an email address (case-insensitive, lower-cased) or a member number directly (upper-cased), so both new and returning members can be identified through a single server action. `RegistrationForm` calls this on mount when localStorage is missing the join date or full name, to back-fill from the DB transparently.

### Live member counter
The counter is rendered by `<MemberCounter>` inside the homepage About section (`app/(site)/page.tsx`). On mount it fetches `/api/stats/count` (Edge runtime, no-store) for the bootstrap value, then subscribes to Supabase Realtime channel `member-stats-global`, listening for `UPDATE`s on `site_stats`. A Postgres trigger on `members` keeps `site_stats.member_count` current. The Footer is a server component with no realtime — do not move the counter back there.

### Speaker Application
`/apply` → `<SpeakerForm>` → `submitSpeakerApplication` server action (`app/actions/speak.ts`) → service role insert into `speaker_applications`. Same honeypot + bot UA + IP rate limit (10-min window) + security delay + Zod pipeline as member registration. RLS allows public INSERT but no public SELECT/UPDATE — a separate admin policy reads the table.

### Calendar & Event RSVPs
`/calendar` is rendered with ISR (`revalidate = 60`). The server component fetches upcoming + recent past events (status=`active`) via the anon server client and passes them into `CalendarClient`. RSVPing is gated by member-number entry inside `<PublicRegistration>`, which calls the `secure_register_for_event` RPC (SECURITY DEFINER) and validates the response with `PublicRegisterResultSchema` from `utils/rpcSchemas.ts`. Successful RSVPs return a `{ id, token, member_name }` payload; the token doubles as a check-in QR. ICS downloads are produced client-side by `utils/ics.ts`.

---

## 🎨 CSS Architecture
**Single file**: `app/globals.css`. Tailwind v4 is installed but intentionally not used in component files — the site is styled by hand in the same stylesheet for consistency.

**Section map** (search for `/* ── X ── */` headers):
- RESET · AESTHETICS · SCROLLBAR · **DESIGN TOKENS** · BASE · FOCUS VISIBLE · BACK-TO-TOP · KEYFRAMES · MARQUEE · REDUCED MOTION · MOBILE BASE · **NAV BAR** · HAMBURGER · **MOBILE DRAWER** · **MOBILE DOCK** · MOBILE RESPONSIVE · PAGE TRANSITIONS · STAGGERED REVEALS · SUCCESS STATE UTILS · SHARED PAGE UTILS · **SHARED MODULES (v1.3)** · **DESKTOP OPTIMIZATIONS (v1.4)** · **FOOTER** · SHARED RESPONSIVE OVERRIDES · Responsive Footer · REGISTER SECTION.

Design tokens live in `:root` near the top of the file: `--cream*`, `--ink*` (opacity variants), `--gold*`, `--serif`, `--sans`, plus `--grain` (SVG noise). Reach for these rather than hard-coding colors.

**Success state CSS** lives in two places: structural rules (`.success-overhaul`, `.success-ig-link`, `.success-next-steps`, `.step-card`) in `globals.css`; registry box, copy button, card preview, and mobile overrides in `app/(site)/membership/pageCss.ts` (shared by both `/membership` and `/register`).

**Informational pages** (`/privacy`, `/terms`, etc.) share `app/(site)/_info/infoPageCss.ts`.

---

## 📋 Workflow Commands
- `npm run dev` — start local dev server (Turbopack).
- `npm run build` — production build; fails on type errors.
- `npm run lint` — ESLint (Next + TS-ESLint). Must be clean.
- `npx tsc --noEmit` — standalone typecheck.

When touching UI: don't claim success on build alone. Type checks verify code, not feature correctness. If you can't open a browser in your environment, say so explicitly in the final report.

---

## 🗺️ Source of Truth
- **Administrative Manual**: [README.md](README.md)
- **System Encyclopedia**: [TECHNICAL.md](TECHNICAL.md)
- **Database Schema**: [supabase/migrations/](supabase/migrations/) and master files in [supabase/](supabase/)
- **Agent-specific guidance**: [AGENTS.md](AGENTS.md)

---
*Keep this document honest: when an invariant changes or a new footgun is discovered, update this file in the same PR.*
