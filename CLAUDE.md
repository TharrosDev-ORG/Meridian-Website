# Meridian Website

Next.js 14 (App Router) website for The Meridian Society — a student-run speaker forum for Ottawa students.

Live site: `meridiansociety.ca`
GitHub remote: `https://github.com/meridiansociety/Meridian-Website.git`

---

## Stack

- **Next.js 14** with TypeScript, App Router
- **React** — Server Components by default; Client Components (`"use client"`) for interactivity
- **CSS** — shared `globals.css` (legacy base + nav) + per-page styles injected via `PageStyles` component
- Deployed on **Vercel** (Framework Preset: Next.js); auto-deploys on push to `main`
- **Google Fonts**: Cormorant Garamond (serif), Barlow Condensed (sans-serif) — loaded via `next/font/google` with `display: "swap"`

---

## File Structure

```
app/
  layout.tsx              # Root layout — metadata, viewport, fonts, NavBar, Footer, MobileMenu, Providers
  globals.css             # Shared CSS — merged legacy base.css + nav.css
  page.tsx                # Homepage — hero, about, who, events teaser, speaking, register
  pageCss.ts              # Homepage inline styles (full cream/ink palette, all sections)
  IndexInteractive.tsx    # Client component — hero mouse-tilt, ghost parallax
  not-found.tsx           # Custom 404 page
  not-foundCss.ts         # 404 page styles
  events/
    page.tsx              # Events listing — renders from data/events.ts
    pageCss.ts            # Events page styles
  social/
    page.tsx              # Social events — upcoming/past split by date
    pageCss.ts            # Social page styles
  speak/
    page.tsx              # Speaker application — value props, format table, apply CTA
    pageCss.ts            # Speak page styles
  membership/
    page.tsx              # Membership — benefits, FAQ accordion, register CTA
    pageCss.ts            # Membership page styles
  team/
    page.tsx              # Team profiles — Magnus Abdelnour, Colin Sherwood
    pageCss.ts            # Team page styles

components/
  NavBar.tsx              # Navigation bar (client) — exports REGISTER_URL constant
  Footer.tsx              # Site footer (server)
  MobileMenu.tsx          # Mobile drawer menu (client)
  Providers.tsx           # Global context provider (client) — scroll state, arc button, scroll reveal
  PageStyles.tsx          # Per-page CSS injection via <style> tag (client, server-rendered output)
  MemberCount.tsx         # Live member counter (client) — fetches from Google Apps Script
  FaqAccordion.tsx        # FAQ accordion (client) — click toggle + hover-to-open on desktop

data/
  events.ts               # Speaker event data with TypeScript interfaces
  social.ts               # Social event data with SocialEvent interface

public/
  assets/
    images/
      og-image.png         # Open Graph image (1200×630)
      team/
        magnus.webp        # Team photo (~3 KB)
        colin.webp         # Team photo (~2.6 KB)
    favicons/              # Full favicon set (SVG, PNG 48/32/16, ICO, Apple touch)
  site.webmanifest         # PWA manifest
  robots.txt               # SEO + AI crawler directives
  sitemap.xml              # XML sitemap
```

---

## Design Tokens

The site uses a **cream/ink palette** defined in each page's `pageCss.ts` file. The homepage `pageCss.ts` is the source of truth.

```css
--cream:       #F4EDE3        /* page background */
--cream-mid:   #EBE2D4        /* secondary surface */
--cream-deep:  #DDD0BC        /* section backgrounds (events, team, footer) */
--ink:         #18150F        /* primary text */
--ink-90 to --ink-08          /* opacity variants for text, borders, separators */
--gold:        #B8932A        /* primary accent */
--gold-lt:     #D4AF50        /* lighter gold accent */
--serif:       'Cormorant Garamond', Georgia, serif
--sans:        'Barlow Condensed', 'Arial Narrow', Arial, sans-serif
```

---

## Typography Scale

| Role | Family | Size |
|------|--------|------|
| Primary body paragraphs | --serif | 19–20px |
| Section titles | --serif | clamp(36px, 3.5vw, 56px) |
| Event title | --serif | clamp(26px, 3vw, 42px) |
| Buttons | --sans | 11.5px |
| Section labels, eyebrows | --sans | 10.5px |
| Footer nav/connect links | --serif | 17px |

**Rules:** Never add `--sans` text below 10px. Never add `--serif` body text below 17px (prefer 19px).

---

## Component Architecture

### Server Components (default)
- `app/layout.tsx` — root layout
- `app/*/page.tsx` — all page components
- `components/Footer.tsx` — static footer

### Client Components (`"use client"`)
- `components/NavBar.tsx` — scroll detection, active link, mobile menu toggle
- `components/MobileMenu.tsx` — drawer with pull-to-dismiss gesture
- `components/Providers.tsx` — global scroll handler (RAF-batched), arc button, scroll reveal observer
- `components/PageStyles.tsx` — renders `<style>` tag with per-page CSS, triggers scroll reveal
- `components/MemberCount.tsx` — fetches live count from Google Apps Script endpoint
- `components/FaqAccordion.tsx` — FAQ with click toggle + desktop hover-to-open
- `app/IndexInteractive.tsx` — homepage hero tilt + ghost parallax

### PageStyles Pattern
Per-page CSS is stored in `pageCss.ts` files as template literal exports. The `PageStyles` component renders a `<style>` tag directly in the React tree (not via `useEffect` DOM injection), eliminating FOUC on page transitions.

```tsx
// In any page component:
import PageStyles from '@/components/PageStyles';
import { membershipCss } from './pageCss';

export default function Page() {
  return (
    <>
      <PageStyles css={membershipCss} />
      <main>{/* page content */}</main>
    </>
  );
}
```

---

## Key URLs

### Registration Form
Defined once in `components/NavBar.tsx`:
```ts
export const REGISTER_URL = "https://docs.google.com/forms/d/1qThcXHxzfuW4uNVkZbHGhHwlDsy8x-YGtpHpOLnqTl4/viewform";
```
All pages import this constant. Update it in one place.

### Speaker Application Form
Hardcoded in `app/speak/page.tsx` (three instances: hero CTA, bottom CTA, noscript fallback):
```
https://docs.google.com/forms/d/e/1FAIpQLScP7jkZ_M1EXIYnxu7ERnCBRpDDmBNPpT3BWruAoyGnPtN6IA/viewform?usp=dialog
```

### Member Count API
Google Apps Script endpoint in `components/MemberCount.tsx`:
```
https://script.google.com/macros/s/AKfycbx12Z8U8xQUYUHYLZkgVBlzGvhvx2uqSd1WBJNBBQcP0vlbrGzxJFfqi8QWnQVHyiKS/exec
```
Returns `{ count: number }`. Used on homepage (`/`) and membership page (`/membership`).

---

## Data Files

### `data/events.ts`
Speaker events array. Set `isCurrent: true` on the active event. HTML allowed in `title`, `desc`, `where`, `format`, `entry` fields.

### `data/social.ts`
Social events array with `SocialEvent` interface. Events are auto-sorted into Upcoming/Past by `date` field (YYYY-MM-DD format).

---

## Adding Content

### New Speaker Event
Edit `data/events.ts`. Only one event should have `isCurrent: true`.

### New Social Event
Edit `data/social.ts`. The page auto-sorts by date.

### New Team Member
Edit `app/team/page.tsx`. Copy an existing `<article className="member-card">` block. Add photo to `public/assets/images/team/` (WebP, <10 KB, 96×120px display).

---

## Deployment

Push to `main` → Vercel auto-deploys. Ensure Framework Preset is **Next.js** in Vercel project settings.

---

## What to Avoid

- **Do not add `app/favicon.ico`** — it overrides the custom favicon set in `layout.tsx` metadata. Favicons are in `public/assets/favicons/`.
- **Do not use `useEffect` for style injection** — use the `PageStyles` component pattern (renders `<style>` inline) to avoid FOUC.
- **Do not hardcode the registration URL** — import `REGISTER_URL` from `components/NavBar.tsx`.
- **Do not use `<nav>` for footer navigation** — `globals.css` has a `nav {}` type selector for the sticky navbar. Footer links use `<div role="navigation">`.
- **Do not animate `border-left-width`** — use `::before` with `scaleY` + `transform-origin` instead.
- **Do not use `padding` for slide effects** — use `transform: translateX()` (compositor-only, no layout reflow).
- **JS scroll transforms need `prefers-reduced-motion` guards** — CSS `prefers-reduced-motion` zeroes transitions, but JS `element.style.transform` assignments are not covered. Check `window.matchMedia` and skip if true.

---

## Copy Style Rules

- **No em-dashes in visible body text** — use periods to break clauses
- **Do not name specific universities in audience-facing descriptions** — use "Registered Meridian members" or "Ottawa students"
