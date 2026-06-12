# Meridian Website — AI Agent Guide

Entry point for any AI assistant working on this repo. Captures the invariants, guardrails, and mental model you need before touching code. Keep edits minimal and honor the project's existing aesthetic.

## Stream Timeout Prevention
1. Do each numbered task ONE AT A TIME. Complete one task fully, confirm it worked, then move to the next.
2. Never write a file longer than ~150 lines in a single tool call. Use multiple append/edit passes.
3. Start a fresh session if the conversation gets long (20+ tool calls). The error gets worse as the session grows.
4. Keep individual grep/search outputs short. Use flags like `--include` and `-l` (list files only).
5. If you do hit the timeout, retry the same step in a shorter form. Don't repeat the entire task from scratch.

---

## 🏛️ Project Identity
**The Meridian Society** — student-run speaker forum + social community based in Ottawa. This website is the society's core identity and foundational base.

**Aesthetic**: Premium, professional, high-contrast, dual-surface (2026-06 redesign).
- **Surfaces**: cream "reading" chapters (`--cream` #F4EDE3) alternate with deep-ink "forum" chapters (`--ink` #18150F). Sections opt into dark via `data-theme="dark"`, which remaps the generic vars (`--bg`, `--fg*`, `--line*`) so shared component CSS adapts automatically.
- **Accent**: `--gold` (#B8932A) / `--gold-lt` on dark. Cream-on-ink opacity ladder: `--cream-90` … `--cream-08`; raised dark surfaces `--ink-2`/`--ink-3`.
- **Typography**: serif (Cormorant Garamond via `--serif`) for titles; condensed sans (Barlow Condensed via `--sans`) for metadata/UI.
- **Motion stack**: GSAP + ScrollTrigger + Lenis (desktop fine-pointer only, via `components/motion/MotionProvider.tsx`); Three.js gold particle field in the homepage hero (`components/three/`). See the invariants in §Premium UI Patterns.

---

## ⚡ Tech Stack
- **Framework**: Next.js **16.2.3** (App Router, static-first, Turbopack dev/build).
- **UI**: React **19.2.4**, Server Components by default; `"use client"` only where necessary (forms, realtime subscriptions, scroll/observer hooks, mouse-driven UI, the events tab switcher).
- **Styling**: Tailwind CSS **v4** is installed only for the `@theme {}` block in `globals.css`. Real styling is hand-written CSS in **`app/globals.css`** plus per-page `pageCss.ts` strings injected via `<PageStyles>`.
- **Database / Realtime**: Supabase (Postgres + Realtime). Trigger-maintained `site_stats.member_count`. The public app touches only `members`, `site_stats`, and `speaker_applications` — see §Database Surface below.
- **Live telemetry**: Edge route `/api/stats/count` (no-store) bootstraps the homepage member count; `MemberCounter` then subscribes to Supabase Realtime channel `member-stats-global` for live `UPDATE`s on `site_stats`.
- **Validation**: `zod` v4 — registration schema (`app/actions/register.ts`) and speaker schema (`app/actions/speak.ts`).
- **Headers / CSP**: Hardened CSP, HSTS (preload), `X-Frame-Options: DENY`, `Permissions-Policy`, `Referrer-Policy` configured in `next.config.ts`. `connect-src` whitelists Vercel + the Supabase project (HTTPS + WSS). `next.config.ts` also serves legacy `.html` → clean-route + consolidated-route redirects.
- **Analytics**: `@vercel/analytics` and `@vercel/speed-insights` mounted in the root layout.
- **Deployment**: Vercel; auto-deploys on push to `main`.

### Next.js 16 rename: middleware → proxy
In Next.js 16, root `middleware.ts` is renamed to **`proxy.ts`**. Ours lives at `/proxy.ts` and re-uses `utils/supabase/middleware.ts`. The public app has no auth flows; the middleware short-circuits when no `sb-*-auth-token` cookie is present, so it's effectively zero-cost on every public request. Do **not** create a root `middleware.ts` — Next will error with "Both middleware file and proxy file are detected."

---

## 🗂️ Repository Layout

```
app/
  layout.tsx                    Root layout: fonts, preconnect hints, early-reveal
                                  shim, Providers, ScrollProgress, Analytics,
                                  Speed Insights, site-wide JSON-LD.
  globals.css                   THE single source of truth for structural CSS.
  (site)/                       Layout group — TransitionWrapper + NavBar +
    layout.tsx                    Footer + MobileMenu + MobileDock + BackToTop.
    page.tsx                    /                (home — server component)
    HomeClientSide.tsx          Client-only dynamic exports.
    IndexInteractive.tsx        GSAP homepage choreography (hero timeline,
                                  scrubbed parallax, quickTo tilts).
    pageCss.ts                  Homepage-scoped CSS string.
    events/                     Tabbed Forum / Social page.
      page.tsx, pageCss.ts        Server hero + tabbed section.
      EventsTabs.tsx              Client island — tab switch with hash deep-links
                                  (#forum, #social).
    membership/, contact/,      Each route folder pairs page.tsx + pageCss.ts +
    privacy/, terms/              opengraph-image.tsx (where applicable).
    _info/infoPageCss.ts        Shared CSS for /privacy and /terms.
  register/page.tsx             /register — OUTSIDE (site). Pulls form CSS from
                                  app/(site)/membership/pageCss.ts.
  apply/                        /apply — OUTSIDE (site). Speaker form.
    page.tsx, pageCss.ts
  actions/
    register.ts                 Server action: shared security pipeline +
                                  service-role INSERT. Exports checkMemberStatus.
    speak.ts                    Speaker pipeline; INSERT into speaker_applications.
  api/stats/count/route.ts      Edge runtime, no-store; bootstrap fetch for the
                                  homepage MemberCounter.
  sitemap.ts, robots.ts         Static SEO surfaces.

components/
  NavBar.tsx                    Desktop nav: About · Team · Events · Membership
                                  + Register CTA. /#about and /#team anchors.
  MobileMenu.tsx                Slide-out drawer; mirrors NavBar plus Apply.
  MobileDock.tsx                Bottom mobile dock: Home / Events / Register /
                                  Menu.
  Footer.tsx                    Server component. Society + Engage + Connect +
                                  Info. NO live counter.
  TransitionWrapper, ScrollProgress, BackToTop, BackButton, Magnetic, Marquee.
  MemberCounter.tsx             Homepage live counter — Edge bootstrap +
                                  Realtime channel member-stats-global.
  RegistrationForm.tsx          Member registration form + ScrambleTicker +
                                  copy-to-clipboard + canvas card download.
  SpeakerForm.tsx               Speaker application form.
  FaqAccordion.tsx              Driven by FAQ_ITEMS (constants/membership.ts).
  PageStyles.tsx                Injects per-page <style> blocks.
  Providers.tsx                 SiteContext (menuOpen) only.
  motion/MotionProvider.tsx     GSAP/ScrollTrigger + Lenis wiring, scroll
                                  reveals, nav on-dark detection (root layout).
  three/HeroVisual.tsx          Hero atmospheric layer: static fallback +
  three/HeroParticles.tsx         lazy WebGL gold particle field.
  ScrollToTopOnMount.tsx        Resets scroll on /events arrival unless hash.
  sections/RegisterSection.tsx          Final-CTA register block.
  sections/SocialInstagramSection.tsx   Shared Instagram CTA module.

utils/
  copy.ts, social.ts, jsonld.ts, metadata-shared.ts, og-helper.tsx
  serverActionSecurity.ts       securityDelay / redactEmail / runSecurityChecks.
  supabase/
    client.ts                   Browser client (anon, Proxy-guarded for SSR).
    middleware.ts               Session refresh (used by proxy.ts).
    service.ts                  SERVICE ROLE — privileged writes (bypass RLS).

constants/membership.ts         FAQ_ITEMS source.
proxy.ts                        Next.js 16 edge proxy.
next.config.ts                  CSP + security headers + redirects.
supabase/                       Master SQL files (01-03) + migrations/.
public/assets/                  Images, favicons, OG image.
```

---

## 🛡️ Critical Guardrails (Anti-Patterns)

1. **Never use `overflow: visible`** on elements with `.rv-stagger`. Breaks the clipping mask.
2. **Never use pure white (#FFF) or pure black (#000)**. Use `--cream` and `--ink` with opacity variants.
3. **Escaped apostrophes**: write `&apos;` inside JSX text. `react/no-unescaped-entities` will fail the build otherwise.
4. **No anonymous DB writes.** RLS on `members` and `speaker_applications` is locked. Member enrollment goes through `registerMember` only; speaker applications through `submitSpeakerApplication`. Both use `service.ts` (service role, server-only). Never import `service.ts` from a `"use client"` file.
5. **Static-first content policy.** `/events` is a static, tabbed informational page (Speaker Forum + Social Gatherings). Dynamic announcements happen on Instagram. **Do not reintroduce a dynamic event calendar** — the previous `/calendar` route was deliberately removed.
6. **Prefer class selectors over type selectors for structural components.** The header nav uses `.site-nav` (not bare `nav {}`) because a bare type selector once hijacked every `<nav>` on the page.
7. **Mobile Isolation Strategy**: desktop-specific optimizations strictly inside `@media (min-width: 1101px)` to protect mobile (iOS input-zoom fixes, safe-area insets, MobileDock).
8. **`setState` inside `useEffect` must be deferred.** ESLint rule `react-hooks/set-state-in-effect`. Use `setTimeout(..., 0)` or fire from an event handler / subscription callback. See `FaqAccordion`, `MemberCounter`, `EventsTabs`.
9. **Routes outside `(site)` must self-wrap `TransitionWrapper`.** Currently `/register` and `/apply`.
10. **Member numbers are immutable.** A Postgres trigger blocks `UPDATE`s. Never attempt reassignment.
11. **Mounted Guard for client realtime / browser APIs.** The Supabase browser client throws on SSR access. Components that use it (`MemberCounter`) gate Supabase calls and `window`/`document` access behind a `mounted` flag set in `useEffect`.
12. **Don't restore the live counter to the Footer.** The footer is a server component with no realtime. The live counter lives on the homepage.
13. **No QR code on the member card.** Canvas is 1200×1200 px and ends with a centered signature line. `qrcode` is not a dependency.

---

## ✨ Premium UI Patterns

- **Scroll reveals (GSAP)**: `className="rv"` markers are batched by `MotionProvider` via `ScrollTrigger.batch` on desktop fine-pointer; touch/reduced-motion get `.on` instantly. **Reveals must never gate visibility**: `.rv` is visible by default; GSAP applies from-states at runtime only. Early-reveal shim in `app/layout.tsx` still marks above-fold elements `.on` at `DOMContentLoaded`. `window.__observeReveal` re-scans dynamically added content.
- **Lenis smooth scroll is desktop-only** (`(min-width:1101px) and (pointer:fine) and (prefers-reduced-motion: no-preference)` — the `DESKTOP_MOTION` query exported by MotionProvider). Touch keeps native scroll. Same-page hash anchors route through `lenis.scrollTo` with a −68px nav offset.
- **Nav surface detection**: `.site-nav--on-dark` is toggled while a `[data-theme="dark"]` section sits under the fixed nav (ScrollTrigger on desktop, rAF scroll-check fallback elsewhere).
- **Three.js hero**: `HeroVisual` always renders a static fallback (gold glow + ghost "M"); `HeroParticles` lazy-loads only on eligible desktops, pauses off-screen, and **must be fully disposed on unmount** (geometry, material, `renderer.dispose()`, `forceContextLoss()`).
- **Homepage choreography** lives in `app/(site)/IndexInteractive.tsx` (hero intro timeline, scrubbed parallax, `gsap.quickTo` tilts). No pinned sections, no scroll-jacking.
- **Magnetic buttons**: `<Magnetic strength={0.2}>` writes `--mag-x` / `--mag-y` CSS vars; auto-disables on `(pointer: coarse)`.
- **Page transitions**: `TransitionWrapper` keyed on `usePathname()` fires the `pageSweep` keyframe on every route change.
- **Inline per-page CSS**: `<PageStyles css={...} />` for page-scoped rules only.
- **Mobile chrome**: `MobileMenu` and `MobileDock` both consume `useSiteContext().menuOpen`.

---

## 🗄️ Supabase Project

- **Project ID**: `dsyiuztquzkcikehkigv`
- **Region**: us-west-2

For schema work, use the **Supabase MCP** tools (prefixed `mcp__4f8fced6-…`). Do not guess values.

### Database Surface — public app vs. dormant
This codebase uses a deliberately narrow slice of the Supabase project:

| Table | Frontend usage |
|-------|----------------|
| `members` | ✅ `register.ts` (insert + dup check), `check_member_status` RPC, `/api/stats/count` fallback |
| `site_stats` | ✅ `/api/stats/count` (Edge), `MemberCounter` (Realtime) |
| `speaker_applications` | ✅ `speak.ts` (insert + dup check) |
| `events`, `event_registrations` | ⚠️ Dormant from this repo's perspective. Were used by the deleted `/calendar` route. Left in place because an external admin surface may still use them — drop only by explicit instruction. |
| `archival_audit_logs`, `system_settings`, `system_config`, `archival_settings`, `security_intercepts`, `porter_*`, `speaker_portal_*`, `speaker_activity_log`, `speaker_notes` | Admin/system tables; not touched by the public site. |

Only `check_member_status` is called directly. All `secure_*` event RPCs are dormant from this repo.

**Env vars**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public), `SUPABASE_SERVICE_ROLE_KEY` (server-only, never `NEXT_PUBLIC_`).

### Generated types
Database types are not committed. Regenerate on demand:
```
npx supabase gen types typescript --project-id dsyiuztquzkcikehkigv > utils/supabase/database.types.ts
```

---

## 🔁 Data Flows

### Registration
`/register` → `<RegistrationForm>` → `registerMember` → `createServiceClient()` → `INSERT INTO members`.

Pipeline (factored into `utils/serverActionSecurity.ts`):
**honeypot** (`fax_number`) → **bot UA check** + **IP rate limit** (5-min window) → **300–800 ms security delay** → **Zod schema** → **duplicate email check** → insert.

On success returns `{ success, memberNumber, createdAt, fullName }`. Duplicate emails return `success: true, alreadyRegistered: true` with the existing record so the UI routes returning members to the success state. Client stores results in five `localStorage` keys plus a 1-year cookie.

### Member Number
Assigned by `member_number_seq` (starts 1001) via the `assign_member_number` trigger on INSERT. Format **`M{YY}-{NNNN}`** (e.g. `M26-1001`). A `lock_member_number` trigger makes assignments permanent.

`checkMemberStatus(identifier)` accepts email (case-insensitive) or member number (upper-cased). `RegistrationForm` calls this on mount if localStorage is missing fields, to back-fill from the DB.

### Member Card (canvas)
1200×1200 px PNG. Cream background, paper-noise texture, ink + gold gradient borders, gold corner marks, seal, name, member number (160 px serif), member-since date, and "Independent Student Organization · Ottawa · Est. 2025" signature line. **No QR code.**

### Live member counter
`<MemberCounter>` in the homepage About section. Fetches `/api/stats/count` (Edge, no-store), then subscribes to Realtime channel `member-stats-global` for `UPDATE`s on `site_stats`. A trigger on `members` keeps `site_stats.member_count` current.

### Speaker Application
`/apply` → `<SpeakerForm>` → `submitSpeakerApplication` → service role insert into `speaker_applications`. Same security pipeline (10-min rate limit). RLS: public INSERT only.

### Events page (tabbed)
`/events` is fully static. `<EventsTabs>` is a small client component that toggles between **Speaker Forum** and **Social Gatherings** panels and supports `/events#forum` and `/events#social` deep-links (the handler smooth-scrolls to `#programs` since the hidden panels aren't valid scroll targets).

---

## 🎨 CSS Architecture
Single file: `app/globals.css`. Per-page extras live in `pageCss.ts` strings via `<PageStyles>`. Design tokens (`--cream*`, `--ink*`, `--gold*`, `--serif`, `--sans`, `--grain`) live in `:root`. Success-state structural rules are in `globals.css`; the registry box / copy button / card preview live in `app/(site)/membership/pageCss.ts` (shared by `/membership` and `/register`). Info pages share `app/(site)/_info/infoPageCss.ts`.

---

## 📋 Workflow Commands
- `npm run dev` — local dev (Turbopack).
- `npm run build` — production build (fails on type errors).
- `npm run lint` — ESLint.
- `npx tsc --noEmit` — standalone typecheck.

Build/lint passing ≠ feature working. Always exercise UI flows in a browser. If you can't, say so explicitly.

---

## 🗺️ Source of Truth
- **Administrative Manual**: [README.md](README.md)
- **System Encyclopedia**: [TECHNICAL.md](TECHNICAL.md)
- **Database Schema**: [supabase/migrations/](supabase/migrations/) + master files in [supabase/](supabase/)
- **Agent-specific guidance**: [AGENTS.md](AGENTS.md)

*Keep this document honest: when an invariant changes or a footgun is discovered, update this file in the same PR.*
