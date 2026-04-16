# Meridian Website — CLAUDE.md

Next.js 16 (App Router) website for The Meridian Society.
Live: `meridiansociety.ca` | Repo: `meridiansociety/Meridian-Website`

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2, App Router, TypeScript |
| UI | React 19.2, Server Components by default |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) + inline `pageCss.ts` per-page styles |
| Database | Supabase (PostgreSQL + Realtime) |
| Validation | Zod v4 |
| Fonts | Cormorant Garamond (`--serif`), Barlow Condensed (`--sans`) via `next/font/google` |
| Analytics | Vercel Analytics + Speed Insights |
| Deploy | Vercel — auto-deploys on push to `main` |

---

## File Structure

```
app/
  layout.tsx              # Root layout — metadata, fonts, JSON-LD org schema, Analytics, Providers
  globals.css             # ALL shared CSS — reset, tokens, nav, footer, animations, utilities
  robots.ts               # Dynamic robots.txt (blocks AI crawlers)
  sitemap.ts              # Dynamic sitemap.xml
  (site)/
    layout.tsx            # Site shell — NavBar, TransitionWrapper, Footer, MobileMenu, BackToTop
    page.tsx              # Homepage — hero, marquee, about, who, events teaser, speaking, register
    pageCss.ts            # Homepage inline styles
    IndexInteractive.tsx  # Client — hero ghost tilt parallax
    events/
      page.tsx            # Speaker events list from data/events.ts
      pageCss.ts
    social/
      page.tsx            # Social events — auto-sorted into upcoming/past by date
      pageCss.ts
    speak/
      page.tsx            # Speaker application page
      pageCss.ts
    membership/
      page.tsx            # Membership benefits + FAQ + register CTA
      pageCss.ts
    team/
      page.tsx            # Team profiles (Magnus Abdelnour, Colin Sherwood)
      pageCss.ts
    not-found.tsx         # Custom 404
    not-foundCss.ts
  register/
    page.tsx              # Registration form page (uses RegistrationForm component)
  actions/
    register.ts           # Server action — Zod validation, rate limiting, Supabase insert
    getMemberCount.ts     # Server action — reads site_stats table (with fallback to COUNT)

components/
  NavBar.tsx              # Fixed nav bar — exports REGISTER_URL + SPEAK_URL constants
  Footer.tsx              # Footer — "use client" — real-time Supabase member count subscription
  MobileMenu.tsx          # Mobile drawer — swipe-to-close, focus trap, ESC key, scroll lock
  Providers.tsx           # SiteContext (menuOpen) + IntersectionObserver for .rv reveals
  BackToTop.tsx           # Scroll-progress arc button (passive scroll listener)
  PageStyles.tsx          # Injects per-page <style> tag + calls window.__observeReveal
  RegistrationForm.tsx    # Client form — useTransition, localStorage/cookie state, honeypot
  FaqAccordion.tsx        # FAQ — click toggle + hover-to-open on desktop
  Magnetic.tsx            # CSS-var magnetic hover effect (disabled on touch/coarse pointer)
  TransitionWrapper.tsx   # Page sweep animation via key={pathname}
  sections/
    RegisterSection.tsx   # Common "Become a Member" footer-adjacent section

utils/supabase/
  client.ts               # Browser client (createBrowserClient)
  server.ts               # Server component client (createServerClient + cookies)
  middleware.ts           # Middleware client (for auth session refresh)
  service.ts               # Service client (SERVICE_ROLE_KEY — server-only, bypasses RLS)

supabase/migrations/
  20260415000000_initial_schema.sql   # members + site_stats tables, trigger, RLS policies
  20260415000001_security_hardening.sql
  20260415000002_restrict_to_admin.sql
  20260416113000_refined_members.sql  # ENUMs + Generated join dates (Latest)

public/
  assets/
    favicons/             # Full favicon set — SVG, PNG 48/32/16, ICO, apple-touch
    images/team/          # Team photos (WebP, ~3KB, 96×120px display)
    og-image.png          # OG image (1200×630)
  (no robots.txt or sitemap.xml — handled by app/robots.ts + app/sitemap.ts)
```

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL          # Supabase project URL (public, client-safe)
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Supabase anon key (public, client-safe)
SUPABASE_SERVICE_ROLE_KEY         # Service role key — server-only, NEVER expose to client
```

All three must be set in Vercel project settings for production.

---

## Design Tokens

Defined in `globals.css` `:root`. Never redefine these in `pageCss.ts` files — reference them.

```css
--cream:       #F4EDE3   /* page background */
--cream-mid:   #EBE2D4   /* secondary surface */
--cream-deep:  #DDD0BC   /* section backgrounds */
--ink:         #18150F   /* primary text */
--ink-90 / --ink-75 / --ink-55 / --ink-30 / --ink-15 / --ink-08  /* opacity variants */
--gold:        #B8932A   /* primary accent */
--gold-lt:     #D4AF50   /* lighter gold */
--grain: ...             /* inline SVG noise texture */
--serif: 'Cormorant Garamond', Georgia, serif
--sans:  'Barlow Condensed', 'Arial Narrow', Arial, sans-serif
```

---

## Typography Scale

| Role | Family | Size |
|------|--------|------|
| Hero display | `--serif` | `clamp(64px, 12vw, 160px)` |
| Section titles | `--serif` | `clamp(36px, 3.5vw, 56px)` |
| Body paragraphs | `--serif` | 19–20px |
| Footer nav / connect links | `--serif` | 17px |
| Section eyebrow labels | `--sans` | 10.5px |
| Buttons | `--sans` | 11–11.5px |

**Rules:** Never add `--sans` below 10px. Never add `--serif` body below 17px (prefer 19px). Always err larger.

---

## Component Architecture

### Server Components (no `"use client"`)
- `app/layout.tsx` — root layout
- `app/(site)/layout.tsx` — site shell
- `app/(site)/*/page.tsx` — all page components
- `app/(site)/not-found.tsx`

### Client Components (`"use client"`)
- `NavBar.tsx` — scroll detection (`scrolled` state), `usePathname` for active link, hamburger toggle
- `Footer.tsx` — real-time Supabase subscription for member count (also initial fetch via server action)
- `MobileMenu.tsx` — drawer with swipe/ESC/focus-trap/body-scroll-lock
- `Providers.tsx` — `SiteContext` + global IntersectionObserver for `.rv` reveals + `window.__observeReveal`
- `BackToTop.tsx` — passive scroll listener, SVG arc progress ring
- `PageStyles.tsx` — renders `<style>` tag + calls `window.__observeReveal` on mount
- `RegistrationForm.tsx` — registration form with `useTransition` + localStorage/cookie duplicate guard
- `FaqAccordion.tsx` — accordion with click toggle + desktop hover-to-open
- `Magnetic.tsx` — magnetic hover via CSS custom properties, skipped on `pointer: coarse`
- `TransitionWrapper.tsx` — page sweep animation via `key={pathname}` re-mount
- `app/(site)/IndexInteractive.tsx` — homepage hero ghost parallax + tilt

---

## CSS Systems in globals.css

`globals.css` is the single shared stylesheet loaded by every page. Do not split it.

**Scroll reveal system:**
- `.rv` + `.rv.on` — fade-in + slide-up (opacity 0→1, translateY 20→0). IntersectionObserver in `Providers.tsx` adds `.on` on intersect; element then unobserved.
- `.rv-stagger` / `.rv-stagger-item` — staggered text reveals (translateY 100%→0). Parent `.rv.rv-stagger` has opacity/transform disabled to prevent double-pop.
- `data-d="N"` attribute (1–5) — explicit transition-delay on `.rv` elements: 0.08s, 0.16s, 0.24s, 0.32s, 0.40s.

**Page transitions:**
- `.page-transition-wrapper` — CSS `pageSweep` keyframe (opacity + translateY + blur). Triggered by `TransitionWrapper` key={pathname} re-mount.

**Shared utilities:**
- `.wrap` — `max-width: 1440px; margin: 0 auto; padding: 0 64px;`
- `.sec-label` — uppercase eyebrow label with trailing `::after` rule
- `.btn-primary` — ink fill button with gold slide-in on hover (via `::before` translateX)
- `.btn-ghost-link` — serif italic arrow link with gap animation
- `.hero-pre / .hero-title / .hero-sub / .hero-hr / .hero-eyebrow` — shared hero typography
- `.arc-btn` — back-to-top button (do not override locally)
- `.progress` — reading progress bar (fixed top, 1px)
- `.marquee-wrap / .marquee-track / .m-item` — scrolling text marquee
- `.member-count-shimmer` — animated skeleton for loading state

**Footer system:**
- `.footer-grid`, `.footer-ghost`, `.footer-stat-val`, `.footer-status`, `.status-pulse` — all defined in globals.css

---

## PageStyles Pattern

Per-page CSS lives in `pageCss.ts` as a template literal. Injected via `PageStyles` — renders a `<style>` tag inline in the React tree (not `useEffect`) to prevent FOUC on client navigation. Also calls `window.__observeReveal` so newly rendered `.rv` elements get observed.

```tsx
// In any page.tsx:
import PageStyles from '@/components/PageStyles';
import { eventsCss } from './pageCss';

export default function EventsPage() {
  return (
    <>
      <PageStyles css={eventsCss} />
      <main>{/* ... */}</main>
    </>
  );
}
```

---

## Key Constants (Never Hardcode)

Both exported from `components/NavBar.tsx`:

```ts
export const REGISTER_URL = "/register";
export const SPEAK_URL = "https://docs.google.com/forms/d/e/1FAIpQLScP7jkZ_M1EXIYnxu7ERnCBRpDDmBNPpT3BWruAoyGnPtN6IA/viewform?usp=dialog";
```

Import these wherever needed. Update in one place.

---

## Supabase Architecture

### Tables
- **`members`** — `email` (PK), `full_name`, `role`, `role_other`, `institution`, `institution_other`, `interests` (TEXT[]), `heard_from`, `volunteer_interest`, `created_at`
- **`site_stats`** — `id` (PK: `'meridian_global_stats'`), `member_count` (INTEGER), `last_updated`

### Trigger
`handle_member_count_change()` — fires `AFTER INSERT OR DELETE` on `members`. Auto-increments/decrements `site_stats.member_count`. No manual count updates needed.

### RLS Policies
- `members`: anonymous INSERT allowed (with field validation); all other operations require authenticated role
- `site_stats`: public SELECT; UPDATE requires authenticated

### Supabase Client Usage

| Context | File | Function |
|---------|------|----------|
| Client component | `utils/supabase/client.ts` | `createClient()` |
| Server component | `utils/supabase/server.ts` | `createClient(cookieStore)` |
| Server action (Service Role) | `utils/supabase/service.ts` | `createServiceClient()` |
| Middleware | `utils/supabase/middleware.ts` | `createClient(request)` |

**Never** import `service.ts` from client components — it exposes the service role key.

---

## Registration Flow

1. `RegistrationForm` (client, `/register`) collects form data
2. `clientAction` → calls `registerMember(data)` server action
3. Server action pipeline:
   - Honeypot check (`fax_number` field) — instant fail if filled
   - IP-based rate limit — 1 per 5 min per IP (in-memory, per serverless instance)
   - Security delay — 300–800ms random (timing attack prevention)
   - Zod schema validation
   - Duplicate email check via service client (case-insensitive)
   - Insert into `members` table — trigger fires to increment `site_stats`
4. On success: `localStorage.setItem('meridian_registered_v1', 'true')` + 1-year cookie
5. Form replaced with success state; duplicate prevention persists across sessions

---

## Member Count Flow

- **Initial load:** Footer calls `getMemberCount()` server action → reads `site_stats.member_count`
- **Fallback:** If `site_stats` read fails → `COUNT(*)` on `members` table
- **Real-time:** Footer subscribes to `postgres_changes` on `site_stats` via Supabase Realtime; updates instantly when DB trigger fires
- **Loading state:** `.member-count-shimmer` animated skeleton while fetching

---

## Scroll Reveal System

**`.rv` elements** — observed by `Providers.tsx` IntersectionObserver (`threshold: 0.01`, `rootMargin: '0px 0px 100px 0px'`). `.on` added on intersect; element unobserved after first fire.

**After page navigation** — `PageStyles.tsx` calls `window.__observeReveal()` (set by `Providers.tsx`) with 50ms delay, re-querying `.rv:not(.on)` elements.

**Stagger delays** — `data-d="N"` attribute (1–5): 0.08s / 0.16s / 0.24s / 0.32s / 0.40s.

**`.rv-stagger`** wrapper + **`.rv-stagger-item`** children — items slide from `translateY(100%)` with nth-child staggered delays (defined in globals.css through 8 items). Parent `.rv.rv-stagger` overrides to `opacity:1, transform:none` to prevent the container from double-animating.

---

## Security (next.config.ts)

CSP applied to all routes via `async headers()`. Key domains:
- `connect-src`: Supabase URL + WSS (Realtime), Vercel analytics/insights
- `form-action`: self + `docs.google.com`
- `script-src`: self, unsafe-inline, unsafe-eval, Vercel VA

Additional headers: `nosniff`, `X-Frame-Options: DENY`, `HSTS`, `Referrer-Policy`, `Permissions-Policy`, `X-XSS-Protection`.

**Legacy URL redirects** (permanent 301):
- `/index.html` → `/`
- `/events.html` → `/events`
- `/team.html`, `/Team.html` → `/team`
- `/membership.html` → `/membership`
- `/social.html` → `/social`
- `/speak.html` → `/speak`

---

## For deep technical specs, see TECHNICAL.md

---

## Adding Content

### New Team Member
Edit `app/(site)/team/page.tsx`. Copy existing `<article className="member-card">` and JSON-LD block. Add photo to `public/assets/images/team/` (WebP).

### New Page
1. Create `app/(site)/newpage/page.tsx` (server component)
2. Create `app/(site)/newpage/pageCss.ts`
3. Add `<PageStyles css={...} />` at page top
4. Add link to `NavBar.tsx` navLinks array and `MobileMenu.tsx` nav
5. Add route to `app/sitemap.ts`

---

## SEO

- **Metadata** — global in `app/layout.tsx`; override per page via `export const metadata`
- **JSON-LD** — Organization schema in `app/layout.tsx` (single location — no sync across files)
- **robots.ts** — blocks GPTBot, ClaudeBot, CCBot, Google-Extended; disallows `/*.html`
- **sitemap.ts** — all public routes with priority/changeFrequency
- **Google Search Console** — verified via `metadata.verification.google` in `app/layout.tsx`
- **OG/Twitter** — `public/assets/og-image.png` (1200×630)

---

## What to Avoid

- **Do not add `app/favicon.ico`** — overrides the custom favicon set. Favicons live in `public/assets/favicons/`.
- **Do not use `useEffect` for style injection** — use `PageStyles` pattern to prevent FOUC.
- **Do not hardcode `/register` or the speaker form URL** — import `REGISTER_URL` / `SPEAK_URL` from `components/NavBar.tsx`.
- **Do not import `utils/supabase/service.ts` from client components** — service role key must stay server-side.
- **Do not override `.arc-btn` styles locally** — edit `globals.css` only.
- **Do not use `<nav>` for footer navigation** — `globals.css` `nav {}` type selector targets the sticky navbar. The mobile drawer's `<nav className="mob-links">` explicitly resets these properties inline. Footer uses `<div role="navigation">`.
- **Do not animate `border-left-width`** — non-interpolatable; use `::before` + `scaleY` + `transform-origin`.
- **Do not use `padding` for hover slide effects** — triggers layout reflow; use `transform: translateX()`.
- **JS scroll transforms need reduced-motion guards** — CSS `prefers-reduced-motion` zeroes CSS transitions but not JS `element.style.transform`. Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and skip if true.
- **Do not redefine design tokens in pageCss.ts** — tokens are in `globals.css :root`; just reference them.

---

## Copy Style Rules

- **No em-dashes in visible body text** — use periods or commas to break clauses
- **Do not name specific universities in audience-facing descriptions** — use "Registered Meridian members" or "Ottawa students"
- Preferred framing: "curious students" / "Ottawa students" / "Meridian members"

---

## Deployment

Push to `main` → Vercel auto-deploys. Framework preset: **Next.js**. No manual build step.

Required Vercel env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
