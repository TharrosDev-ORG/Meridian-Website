# The Meridian Society — Website

Public website for [The Meridian Society](https://meridiansociety.ca), an independent, student-run speaker forum and community based in Ottawa.

---

## Technical Stack

- **Framework**: [Next.js 16.2](https://nextjs.org/) (App Router) with TypeScript
- **State & Auth**: [Supabase SSR](https://supabase.com/docs/guides/auth/server-side-rendering) (`@supabase/ssr`)
- **Database**: PostgreSQL via Supabase (Migrations-first workflow)
- **Styling**: Vanilla CSS with a custom design system (Tokens in `globals.css`)
- **Validation**: [Zod](https://zod.dev/) for server action type safety
- **hosting**: [Vercel](https://vercel.com/) with Speed Insights and Analytics

---

## Architecture & Data Flow

### 1. Supabase Integration
The project uses a consolidated Supabase pattern located in `utils/supabase/`:
- **Server Client**: For use in Server Components and Layouts.
- **Browser Client**: For real-time subscriptions (e.g., live member counter).
- **Admin Client**: Secure service-role client for Server Actions (to bypass RLS for registration).
- **Middleware**: Manages Supabase session refreshing globally.

### 2. Member Registration
Legacy Google Forms have been replaced with a custom, high-performance [RegistrationForm](file:///components/RegistrationForm.tsx). It uses **Next.js Server Actions** (`app/actions/register.ts`) and includes:
- IP-based rate limiting.
- Zod schema validation.
- Honeypot bot protection.
- Live database insertion to the `members` table.

### 3. Real-time Member Counter
The [MemberCount](file:///components/MemberCount.tsx) component utilizes Supabase Realtime to listen for `POSTGRES_CHANGES` on the `site_stats` table, ensuring the UI updates instantly when a new member registers.

---

## Directory Structure

```text
app/
  (site)/              — Primary page routes (Home, Events, Team, etc.)
  actions/             — Server Actions (Registration, Member Counts)
  layout.tsx           — Root layout: metadata, fonts, providers, global styles
  globals.css          — Central design tokens and shared base styles
  middleware.ts        — Global Supabase session management

components/
  RegistrationForm.tsx — Custom glassmorphic registration interface
  MemberCount.tsx      — Real-time statistics display via Supabase
  BackToTop.tsx        — Standardized global 'Return to Top' arc button
  NavBar.tsx / Footer.tsx — Site-wide navigation components
  PageStyles.tsx       — Component for injecting page-specific CSS strings

supabase/
  migrations/          — Versioned SQL migrations for schema management

utils/supabase/        — Standardized Supabase utility clients (Browser, Server, Admin)

data/                  — Static content for events and social pages
```

---

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file with the following keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Run Dev Server**:
   ```bash
   npm run dev
   ```

---

## Database Management

Schema changes must be applied via migrations in `supabase/migrations/`. 
To create a new migration manually:
```sql
-- supabase/migrations/<timestamp>_description.sql
CREATE TABLE ...
```

---

## Content Updates

- **Events**: Modify `data/events.ts`. Set `isCurrent: true` for the primary featured event.
- **Socials**: Modify `data/social.ts`. Events are automatically sorted by date.
- **Team**: Edit the profiles directly in `app/(site)/team/page.tsx`.

---

## Favicons

Favicons are managed in `app/layout.tsx` via the metadata API. Source files are located in `public/assets/favicons/`.

---

## Deployment

Pushes to `main` trigger an automatic deployment on **Vercel**. 
> [!IMPORTANT]
> Ensure all Supabase environment variables (including the Service Role key) are configured in the Vercel Project Settings.
