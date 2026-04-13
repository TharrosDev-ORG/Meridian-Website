# The Meridian Society — Website

Public website for [The Meridian Society](https://meridiansociety.ca), a student-run speaker forum in Ottawa.

---

## Stack

- **Next.js 14** — App Router with TypeScript
- **React** — Server Components by default, Client Components where interactivity is needed
- **CSS** — Legacy inline styles preserved via `PageStyles` component + shared `globals.css`
- **Google Fonts** — Cormorant Garamond (serif) + Barlow Condensed (sans-serif), loaded via `next/font`
- **Hosting** — Vercel (auto-deploys on push to `main`, Framework Preset: Next.js)

---

## Local Development

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`.

To verify a production build:

```bash
npm run build
npm start
```

---

## Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage |
| `/events` | `app/events/page.tsx` | Events listing |
| `/social` | `app/social/page.tsx` | Social events |
| `/speak` | `app/speak/page.tsx` | Speaker applications |
| `/membership` | `app/membership/page.tsx` | Membership info, FAQ, and registration |
| `/team` | `app/team/page.tsx` | Team profiles |
| Custom 404 | `app/not-found.tsx` | Error page |

---

## Key Files

```
app/
  layout.tsx           — Root layout: metadata, fonts, nav, footer, providers
  globals.css          — Shared base + nav CSS (merged from legacy base.css + nav.css)
  page.tsx             — Homepage
  pageCss.ts           — Homepage inline styles (extracted from legacy index.html)
  IndexInteractive.tsx — Client component: hero tilt, parallax effects
  [route]/
    page.tsx           — Page component
    pageCss.ts         — Page-specific inline styles

components/
  NavBar.tsx           — Navigation bar (client component, exports REGISTER_URL)
  Footer.tsx           — Site footer
  MobileMenu.tsx       — Mobile drawer menu
  Providers.tsx        — Global context: scroll state, arc button, scroll reveal
  PageStyles.tsx       — Injects per-page CSS via <style> tag (server-rendered, no FOUC)
  MemberCount.tsx      — Live member counter (fetches from Google Apps Script)
  FaqAccordion.tsx     — Interactive FAQ accordion with click + hover-to-open

data/
  events.ts            — Speaker event data (typed interfaces)
  social.ts            — Social event data (typed interfaces)

public/
  assets/              — Images, favicons, OG image
```

---

## Registration Link

The registration Google Form URL is defined once in `components/NavBar.tsx` as `REGISTER_URL`. All pages import this constant directly — update it in one place.

```ts
// components/NavBar.tsx
export const REGISTER_URL = "https://docs.google.com/forms/d/1qThcXHxzfuW4uNVkZbHGhHwlDsy8x-YGtpHpOLnqTl4/viewform";
```

---

## Speaker Application Link

The "Apply to Speak" Google Form URL is hardcoded in `app/speak/page.tsx`. Update all three instances (hero CTA, bottom CTA, noscript fallback) when the form changes.

---

## Adding a Speaker Event

Edit `data/events.ts`. The events page renders the object with `isCurrent: true`.

```ts
{
  id: "event-id",
  status: "Registration Open",
  title: "Event <em>Title</em>",
  desc: "Description text.",
  tags: ["Speaker Event", "Ottawa"],
  ctaText: "Register",
  when: "Fall 2026",
  where: "Ottawa, Canada",
  format: "Speaker & Open Conversation",
  speaker: "To Be Announced",
  entry: "Registered Members",
  isCurrent: true
}
```

---

## Adding a Social Event

Edit `data/social.ts`. Events are sorted into **Upcoming** and **Past** based on the `date` field.

```ts
{
  id: "event-slug",
  title: "Bar Night",
  desc: "Short description.",
  date: "2026-09-15",
  time: "9:00 PM",
  where: "Venue Name, Ottawa",
  type: "public",
  tags: ["Bar Night", "Ottawa"],
  cost: "Free",
  capacity: "Limited",
  ctaText: "RSVP",
  ctaHref: "https://..."
}
```

---

## Adding a Team Member

Edit `app/team/page.tsx`. Copy an existing `<article className="member-card">` block and update the fields.

**Photo requirements:**
- Format: WebP, cropped to ID-card proportions (96×120px display)
- Target size: under 10 KB
- Save to: `public/assets/images/team/<firstname>.webp`

---

## Deployment

Push to `main` — Vercel auto-deploys. Framework Preset must be set to **Next.js** in Vercel project settings.

---

## Favicons

Favicons are configured in `app/layout.tsx` under `metadata.icons`. The actual files live in `public/assets/favicons/`. The default Next.js `app/favicon.ico` has been removed to prevent it from overriding custom favicons.
