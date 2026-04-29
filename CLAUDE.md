# Meridian Website — AI Agent Guide

This document is the entry point for any AI coding assistant working on this repo. It captures the invariants, guardrails, and mental model you need before touching code. Keep edits minimal and honor the project's existing aesthetic.

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
- **Framework**: Next.js **16.2** (App Router, static by default, Turbopack builds).
- **UI**: React **19.2**, Server Components primary; `"use client"` only where necessary (forms, subscriptions, scroll hooks).
- **Styling**: Tailwind CSS **v4** is sparingly used for its `@theme {}` block in `globals.css`. The primary styling engine consists of hand-written CSS in **`app/globals.css`** (featuring a shared `.module-` layer for performance) and page-specific `pageCss.ts` strings. Treat `globals.css` as the source of truth for structural components.
- **Database / Realtime**: Supabase (Postgres + Realtime channels). Trigger-maintained `site_stats.member_count`.
- **Live telemetry**: Edge API `/api/stats/count` (no-store headers) fetched by the Footer on mount.
- **Validation**: `zod` v4 (registration + speaker application schemas).
- **Deployment**: Vercel, auto-deploys on push to `main`.

### Next.js 16 rename: middleware → proxy
In Next.js 16, root `middleware.ts` is renamed to **`proxy.ts`**. Ours lives at `/proxy.ts` and re-uses `utils/supabase/middleware.ts` to refresh Supabase sessions on every request. Do **not** create a root `middleware.ts` — Next will error with "Both middleware file and proxy file are detected."

---

## 🗂️ Repository Layout
```
app/
  layout.tsx                    Root layout (fonts, ScrollProgress, globals.css)
  (site)/                       Layout group — wraps children in TransitionWrapper,
    layout.tsx                    renders NavBar, Footer, MobileMenu, BackToTop
    page.tsx                    /        (home)
    events/, social/, team/, membership/, speak/, calendar/
    contact/                    /contact
    privacy/, terms/            /privacy, /terms
  register/page.tsx             /register  — OUTSIDE the (site) group;
                                  wraps its own <TransitionWrapper> manually
  apply/page.tsx                /apply     — OUTSIDE the (site) group;
                                  speaker application; wraps its own
                                  <TransitionWrapper> manually
  actions/
    register.ts                 Server action: honeypot + IP rate limit + Zod +
                                  service-role insert into `members`
    speak.ts                    Server action: speaker application pipeline
                                  (same pattern; 10-min rate limit window)
    getMemberCount.ts           Server action: site_stats.member_count (+ fallback)
  api/stats/count/route.ts      Edge runtime; no-store fetch used by Footer bootstrap

components/
  NavBar.tsx, MobileMenu.tsx    Header + mobile drawer
  Footer.tsx                    Live-member counter + Realtime subscription
  TransitionWrapper.tsx         Keyed wrapper for page entry animations
  Magnetic.tsx                  Mouse-follow "pull" effect for CTAs
  RegistrationForm.tsx          Full member registration form + success state
  SpeakerForm.tsx               Speaker application form
  sections/                     Shared UI modules (SocialInstagramSection.tsx,
                                  RegisterSection.tsx)

utils/supabase/
  client.ts                     Browser client (anon)
  server.ts                     Server-side reads (anon)
  middleware.ts                 Session refresh (used by proxy.ts)
  service.ts                    SERVICE ROLE — privileged writes (bypass RLS)
utils/
  copy.ts                       Shared copy/text string constants
  jsonld.ts                     JSON-LD structured data helpers
  metadata-shared.ts            Shared OpenGraph / metadata utilities
  social.ts                     Social link constants (INSTAGRAM_URL, etc.)
  og-helper.tsx                 OG image generation helpers

proxy.ts                        Next.js 16 edge proxy (root level)
app/globals.css                 **The Single Source of Truth for Styles.**
```

---

## 🛡️ Critical Guardrails (Anti-Patterns)

1. **Never use `overflow: visible`** on elements with `.rv-stagger`. It breaks the clipping mask that gates the reveal animation.
2. **Never use pure white (#FFF) or pure black (#000)**. Use `--cream` (#F4EDE3) and `--ink` (#18150F). Opacity variants (`--ink-75`, `--cream-mid`, etc.) are defined in `:root`.
3. **Escaped apostrophes**: write `&apos;` inside JSX text. `eslint-plugin-react` rule `react/no-unescaped-entities` will fail the build otherwise.
4. **No anonymous DB writes.** RLS on `members` is fully locked down. All enrollment must go through the `registerMember` server action (which uses `utils/supabase/service.ts` — service role key, server-only). Never import `service.ts` from a `"use client"` file.
5. **Static-first content policy**: `/events` and `/social` are permanent informational event history guides. `/calendar` is the dynamic portal for upcoming events. Dynamic announcements also happen on Instagram. **Do not add dated upcoming events to the /events or /social pages.**
6. **Prefer class selectors over type selectors for structural components.** The header nav uses `.site-nav` (not bare `nav {}`) precisely because a bare type selector once hijacked every `<nav>` on the page — including the footer Index column, which got teleported into a fixed top bar. Follow the same pattern if you add other structural components (modals, drawers, etc.).
7. **Mobile Isolation Strategy**: Desktop-specific optimizations (hovers, spacing, scaling) must be strictly encapsulated in `@media (min-width: 1101px)` to protect mobile stability.
8. **`setState` inside `useEffect` must be deferred.** The ESLint rule `react-hooks/set-state-in-effect` treats a synchronous `setState` call in an effect body as an error. Use `setTimeout(() => setX(...), 0)` or set it inside an event handler / subscription callback. See `components/FaqAccordion.tsx` and `components/Footer.tsx` for the canonical pattern.
9. **Routes outside `(site)` must self-wrap `TransitionWrapper`.** `/register` and `/apply` are the current examples. If you add another route outside the group, wrap its page content in `<TransitionWrapper>` so the `.page-sweep` entry animation fires.
10. **Member numbers are immutable.** A Postgres trigger blocks any `UPDATE` to `member_number`. Never attempt to reassign one in code — the DB will reject it silently and the column will remain unchanged.

---

## ✨ Premium UI Patterns
- **Scroll reveals**: add `className="rv"` to an element and optionally `data-d="1"` through `data-d="5"` to stagger entry by 80ms steps. Parent reveal groups can use `.reveal` or IntersectionObserver `.on` to trigger children.
- **Magnetic buttons**: wrap a CTA in `<Magnetic strength={0.2}>` for the cursor-pull effect. Used on the primary register CTA and hero actions.
- **Page transitions**: `TransitionWrapper` is keyed on `usePathname()` so it re-mounts on every route change, firing the `pageSweep` keyframe in globals.css. Already in place for `(site)` pages via the group layout.
- **Inline per-page CSS**: `<PageStyles css={...} />` injects a `<style>` block for page-local rules. Use it sparingly and only for genuinely page-scoped concerns (e.g. `app/register/page.tsx` imports and extends `membershipCss`).
- **Magnetic + Back-to-top**: `BackToTop.tsx` renders an arc progress button; `ScrollProgress.tsx` renders the top gold progress bar.

---

## 🧪 Supabase Architecture
Four clients, each with a narrow purpose. All validate their env vars at creation time.

| File | Key | Used from | Purpose |
|------|-----|-----------|---------|
| `utils/supabase/client.ts` | anon | `"use client"` components | Browser client (e.g. Footer realtime subscription) |
| `utils/supabase/server.ts` | anon | Server Components | Server-side reads with cookie propagation |
| `utils/supabase/middleware.ts` | anon | `proxy.ts` | Refreshes auth session per request |
| `utils/supabase/service.ts` | **service role** | Server Actions / API routes **only** | Bypasses RLS — privileged writes |

**Env vars**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public), and `SUPABASE_SERVICE_ROLE_KEY` (server-only, never prefix with `NEXT_PUBLIC_`).

---

## 🔁 Data Flows

### Registration
`/register` → `<RegistrationForm>` → `registerMember` server action (`app/actions/register.ts`) → `createServiceClient()` → `INSERT INTO members`.

Security pipeline runs in order: **honeypot** (`fax_number` field) → **IP rate limit** (5-min window, in-memory) → **User-Agent validation** (blocks bots/scripts) → **300–800 ms security delay** → **Zod schema** → **duplicate email check** → insert.

On success the action returns `{ success, memberNumber, createdAt, fullName }`. The client stores these in four `localStorage` keys plus a 1-year cookie, clears the form draft, and renders the success state.

### Registration Success State
Condition: `isAlreadyRegistered && memberNumber`. The success screen (`RegistrationForm.tsx`) renders:

- **Welcome heading** — personalised with `firstName` (split from `memberName` state)
- **Member number** — `ScrambleTicker` component: 2 s scramble animation (40 ms steps, random chars progressively revealing the final value)
- **Copy-to-clipboard** — button next to the number; uses `navigator.clipboard` with `document.execCommand` fallback; tracks pending timeout in `copyTimeoutRef` so rapid clicks don't cause early resets; only shows "Copied" if the copy actually succeeded; cleared on unmount
- **Registration date** — "Member Since" row, formatted as `April 27, 2026`; sourced from `registrationDate` state (populated from localStorage on mount or background-synced from DB if missing)
- **Card preview** — HTML/CSS miniature of the downloadable card (title, name, number, date) rendered above the download button
- **Download Member Card** — Canvas 2D: 1200×1800 px PNG with cream background, paper noise texture, ink outer border, gold gradient inner border, gold corner marks, Cormorant Garamond typography (number at 160 px), society seal (top center), huge QR code (bottom center), "M" watermark, registration date footer
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

`checkMemberStatus` performs a **polymorphic lookup**: accepts either an email address (case-insensitive) or a member number directly, so both new and returning members can be identified through a single server action.

### Live member counter
`Footer.tsx` on mount fetches `/api/stats/count` (edge, no-store) for the initial number, then subscribes to Supabase Realtime channel `footer_stats_updates` listening for `UPDATE`s on `site_stats` where `id = 'meridian_global_stats'`. A Postgres trigger on `members` increments `site_stats.member_count`, which propagates to all connected footers in real time.

### Speaker Application
`/apply` → `<SpeakerForm>` → `submitSpeakerApplication` server action (`app/actions/speak.ts`) → service role insert into speaker applications table. Same honeypot + rate limit (10-min window) + Zod pattern as member registration.

---

## 🎨 CSS Architecture
**Single file**: `app/globals.css`. Tailwind v4 is installed but intentionally not used in component files — the site is styled by hand in the same stylesheet for consistency.

**Section map** (search for `/* ── X ── */` headers):
- RESET · AESTHETICS · SCROLLBAR · **DESIGN TOKENS** · BASE · FOCUS VISIBLE · BACK-TO-TOP · KEYFRAMES · MARQUEE · REDUCED MOTION · MOBILE BASE · **NAV BAR** · HAMBURGER · **MOBILE DRAWER** · MOBILE RESPONSIVE · PAGE TRANSITIONS · STAGGERED REVEALS · SUCCESS STATE UTILS · SHARED PAGE UTILS · **SHARED MODULES (v1.3)** · **DESKTOP OPTIMIZATIONS (v1.4)** · **FOOTER** · SHARED RESPONSIVE OVERRIDES · Responsive Footer · REGISTER SECTION.

Design tokens live in `:root` around lines 30–72: `--cream*`, `--ink*` (opacity variants), `--gold*`, `--serif`, `--sans`, plus `--grain` (SVG noise). Reach for these rather than hard-coding colors.

**Success state CSS** lives in two places: structural rules (`.success-overhaul`, `.success-ig-link`, `.success-next-steps`, `.step-card`) in `globals.css`; registry box, copy button, card preview, and mobile overrides in `app/(site)/membership/pageCss.ts` (shared by both `/membership` and `/register`).

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
- **Database Schema**: [supabase/migrations/](supabase/migrations/)

---
*Keep this document honest: when an invariant changes or a new footgun is discovered, update this file in the same PR.*
