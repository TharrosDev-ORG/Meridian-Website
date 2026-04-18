# Meridian Website — AI Agent Guide

This document is the entry point for any AI coding assistant working on this repo. It captures the invariants, guardrails, and mental model you need before touching code. Keep edits minimal and honor the project's existing aesthetic.

---

## 🏛️ Project Identity
**The Meridian Society**: an independent student-led speaker forum in Ottawa.
**Aesthetic**: "Deep Ink" — premium, editorial, quiet.

- **Background**: `--cream` (#F4EDE3)
- **Primary Text**: `--ink` (#18150F)
- **Accent**: `--gold` (#B8932A)
- **Typography**: serif (Cormorant Garamond via `--serif`) for titles; condensed sans (Barlow Condensed via `--sans`) for metadata/UI.

---

## ⚡ Tech Stack
- **Framework**: Next.js **16.2** (App Router, static by default, Turbopack builds).
- **UI**: React **19.2**, Server Components primary; `"use client"` only where necessary (forms, subscriptions, scroll hooks).
- **Styling**: Tailwind CSS **v4** is installed but **not used in components** — all styling lives in a single `app/globals.css`. Treat globals.css as the stylesheet of record.
- **Database / Realtime**: Supabase (Postgres + Realtime channels). Trigger-maintained `site_stats.member_count`.
- **Live telemetry**: Edge API `/api/stats/count` with 60s revalidation + `stale-while-revalidate=300`.
- **Validation**: `zod` (registration schema).
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
    events/, social/, team/, membership/, speak/
  register/page.tsx             /register  — OUTSIDE the (site) group;
                                  wraps its own <TransitionWrapper> manually
  actions/
    register.ts                 Server action: honeypot + rate limit + Zod +
                                  service-role insert into `members`
    getMemberCount.ts           Server action: site_stats.member_count (+ fallback)
  api/stats/count/route.ts      Edge runtime; cached read used by Footer bootstrap

components/
  NavBar.tsx, MobileMenu.tsx    Header + mobile drawer (`.site-nav` class, see guardrail 6)
  Footer.tsx                    Live-member counter + Supabase realtime subscription
  TransitionWrapper.tsx         Keyed wrapper that re-triggers `pageSweep` on nav
  Magnetic.tsx                  Mouse-follow "pull" effect for premium CTAs
  RegistrationForm.tsx          Form that calls the `registerMember` server action
  FaqAccordion.tsx, BackButton.tsx, BackToTop.tsx, ScrollProgress.tsx,
  PageStyles.tsx, Marquee.tsx, sections/RegisterSection.tsx

utils/supabase/
  client.ts                     Browser (anon key)
  server.ts                     Server component client w/ cookies
  middleware.ts                 Helper used by proxy.ts
  service.ts                    SERVICE ROLE — server-only; bypasses RLS

proxy.ts                        Next.js 16 edge proxy (session refresh)
supabase/migrations/            Schema + triggers (source of truth for DB)
app/globals.css                 **All CSS lives here.** See "CSS Architecture" below.
```

---

## 🛡️ Critical Guardrails (Anti-Patterns)

1. **Never use `overflow: visible`** on elements with `.rv-stagger`. It breaks the clipping mask that gates the reveal animation.
2. **Never use pure white (#FFF) or pure black (#000)**. Use `--cream` (#F4EDE3) and `--ink` (#18150F). Opacity variants (`--ink-75`, `--cream-mid`, etc.) are defined in `:root`.
3. **Escaped apostrophes**: write `&apos;` inside JSX text. `eslint-plugin-react` rule `react/no-unescaped-entities` will fail the build otherwise.
4. **No anonymous DB writes.** RLS on `members` is locked down. All enrollment must go through the `registerMember` server action (which uses `utils/supabase/service.ts` — service role key, server-only). Never import `service.ts` from a `"use client"` file.
5. **Static-first content policy**: `/events` and `/social` are permanent informational program guides. Dynamic announcements happen on Instagram only. **Do not add dated upcoming events to the codebase.**
6. **Prefer class selectors over type selectors for structural components.** The header nav uses `.site-nav` (not bare `nav {}`) precisely because a bare type selector once hijacked every `<nav>` on the page — including the footer Index column, which got teleported into a fixed top bar. Follow the same pattern if you add other structural components (modals, drawers, etc.).
7. **`setState` inside `useEffect` must be deferred.** The ESLint rule `react-hooks/set-state-in-effect` treats a synchronous `setState` call in an effect body as an error. Use `setTimeout(() => setX(...), 0)` or set it inside an event handler / subscription callback. See `components/FaqAccordion.tsx` and `components/Footer.tsx` for the canonical pattern.
8. **Routes outside `(site)` must self-wrap `TransitionWrapper`.** `/register` is the only current example. If you add another route outside the group (or a new top-level group), wrap its page content in `<TransitionWrapper>` so the `.page-sweep` entry animation still fires.

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
`/register` → `<RegistrationForm>` → `registerMember` server action (`app/actions/register.ts`) → `createServiceClient()` → `INSERT INTO members`. Honeypot field + in-memory per-instance rate limit run before the insert. Success is signaled via localStorage/cookie flag so the form can show its success state on reload.

### Live member counter
`Footer.tsx` on mount fetches `/api/stats/count` (edge, cached) for the initial number, then subscribes to Supabase Realtime channel `footer_stats_updates` listening for `UPDATE`s on `site_stats` where `id = meridian_global_stats`. A Postgres trigger on `members` increments `site_stats.member_count`, which propagates to all connected footers in real time.

---

## 🎨 CSS Architecture
**Single file**: `app/globals.css`. Tailwind v4 is installed but intentionally not used in component files — the site is styled by hand in the same stylesheet for consistency.

**Section map** (search for `/* ── X ── */` headers):
- RESET · AESTHETICS · SCROLLBAR · **DESIGN TOKENS** · BASE · FOCUS VISIBLE · BACK-TO-TOP · KEYFRAMES · MARQUEE · REDUCED MOTION · MOBILE BASE · **NAV BAR** · HAMBURGER · **MOBILE DRAWER** · MOBILE RESPONSIVE · PAGE TRANSITIONS · STAGGERED REVEALS · SUCCESS STATE UTILS · SHARED PAGE UTILS · **FOOTER** · SHARED RESPONSIVE OVERRIDES · Responsive Footer · REGISTER SECTION.

Design tokens live in `:root` around lines 30–72: `--cream*`, `--ink*` (opacity variants), `--gold*`, `--serif`, `--sans`, plus `--grain` (SVG noise). Reach for these rather than hard-coding colors.

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
