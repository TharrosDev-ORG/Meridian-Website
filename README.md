# The Meridian Society — Website

Public website for [The Meridian Society](https://meridiansociety.ca), an independent, student-run speaker forum based in Ottawa.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router), TypeScript |
| UI | React 19 — Server Components by default |
| Styling | Tailwind CSS v4 + per-page inline `pageCss.ts` |
| Database | Supabase (Postgres + Realtime) |
| Validation | Zod v4 |
| Fonts | Cormorant Garamond + Barlow Condensed via `next/font/google` |
| Deploy | Vercel — auto-deploys on push to `main` |

---

## Local Development

**1. Install dependencies**
```bash
npm install
```

**2. Set up environment variables**

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**3. Run dev server**
```bash
npm run dev
```

---

## Architecture

### Routing

All public pages live under `app/(site)/`. The site shell (`NavBar`, `Footer`, `MobileMenu`, `BackToTop`) is in `app/(site)/layout.tsx`. Each page is a server component with a sibling `pageCss.ts` for its scoped styles.

### Styling

`app/globals.css` is the single shared stylesheet — design tokens, reset, nav, footer, all animations, and utility classes. Per-page styles live in `pageCss.ts` template literals injected via the `PageStyles` component (prevents FOUC on client navigation).

### Supabase

Four client variants in `utils/supabase/`:

| File | Use |
|------|-----|
| `client.ts` | Browser / client components |
| `server.ts` | Server components |
| `admin.ts` | Server actions (bypasses RLS) |
| `middleware.ts` | Session refresh in middleware |

Never import `admin.ts` from client components — it uses the service role key.

### Member Registration

`RegistrationForm` (client) → `registerMember()` server action → Supabase insert. Server action includes: honeypot check, IP rate limiting (1/5 min), Zod validation, case-insensitive duplicate check. Success state persisted to localStorage + cookie so the form isn't re-shown.

### Real-time Member Count

`Footer` and `MemberCount` components initial-fetch via `getMemberCount()` server action, then subscribe to `postgres_changes` on `site_stats` via Supabase Realtime. A DB trigger auto-increments `site_stats.member_count` on every insert into `members`.

---

## Directory Structure

```
app/
  layout.tsx              # Root layout — metadata, fonts, JSON-LD, analytics
  globals.css             # All shared CSS
  robots.ts               # Dynamic robots.txt (blocks AI crawlers)
  sitemap.ts              # Dynamic sitemap.xml
  (site)/                 # Public pages: home, events, social, speak, membership, team
  register/               # Registration form page
  actions/                # Server actions: register.ts, getMemberCount.ts

components/               # NavBar, Footer, MobileMenu, Providers, BackToTop,
                          # PageStyles, MemberCount, RegistrationForm,
                          # FaqAccordion, Magnetic, TransitionWrapper

data/
  events.ts               # Speaker events array
  social.ts               # Social events array + SocialEvent interface

utils/supabase/           # Browser / server / admin / middleware clients

supabase/migrations/      # Versioned SQL schema migrations

public/assets/
  favicons/               # Full favicon set (SVG, PNG, ICO, apple-touch)
  images/team/            # Team photos (WebP)
  og-image.png            # OG image (1200×630)
```

---

## Content Updates

**Speaker events** — edit `data/events.ts`. One event with `isCurrent: true` at a time.

**Social events** — append to `SOCIAL_EVENTS` in `data/social.ts`. Page auto-sorts into upcoming/past by `date` (YYYY-MM-DD).

**Team** — edit `app/(site)/team/page.tsx`. Add photos to `public/assets/images/team/` (WebP, <10KB).

**Nav links** — update `NavBar.tsx` `navLinks` array and `MobileMenu.tsx` simultaneously.

**Registration/speak URLs** — both exported from `components/NavBar.tsx` as `REGISTER_URL` and `SPEAK_URL`. Update in one place.

---

## Database

Schema managed via migrations in `supabase/migrations/`. Two tables:

- **`members`** — registration records (email PK, name, role, institution, interests, etc.)
- **`site_stats`** — single row `id='meridian_global_stats'` with `member_count` integer, auto-maintained by trigger

RLS: anonymous insert to `members`; public read of `site_stats`. All other ops require authenticated role.

---

## Deployment

Push to `main` → Vercel auto-deploys. No manual build step.

Vercel env vars required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

Favicons are in `public/assets/favicons/` — do not add `app/favicon.ico` (overrides the metadata-managed set).
