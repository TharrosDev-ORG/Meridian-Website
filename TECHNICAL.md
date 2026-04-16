# The Meridian Society — Technical Specification

This document is the definitive technical source of truth and "Master Specification" for The Meridian Society website. It defines the architecture, security pipelines, animation systems, and mental models required to maintain and expand the codebase.

---

## 🏗️ 1. Core Architecture: Responsive Single-View Pattern

The site uses a unified, mobile-first responsive architecture. Instead of splitting views into separate components, we maintain a single component tree per page that adapts via CSS media queries.

### 1.1 Page Structure & Layout
- **Route Logic**: Pages are organized within the `app/(site)/` directory (e.g., `app/(site)/membership/page.tsx`). 
- **The Wrapper**: `app/(site)/layout.tsx` provides the common structure, including the `NavBar`, `Footer`, and `MobileMenu`.
- **Root Page**: The root `page.tsx` for each route contains the `Metadata` export and the main UI logic. We prioritize semantic HTML and accessibility across all views.

### 1.2 View Standardization
- All core sections use the `.wrap` class for horizontal centering and consistent padding (max-width: 1280px).
- Mobile optimization is handled via media queries in `globals.css` and the page-specific `pageCss.ts` injected via the `PageStyles` component.

---

## ✨ 2. The Animation & Reveal System

The site implements a premium animation suite that requires strict coordination across components.

### 2.1 Reveal Elements (`.rv`)
Elements with the `.rv` class start at `opacity: 0` and `translateY(20px)`.
- **Observer**: `Providers.tsx` initializes a global `IntersectionObserver`. When a `.rv` element enters the viewport, the `.on` class is added.
- **Staggers**: Use `data-d="1"` through `data-d="5"` for explicit delays (80ms increments).
- **Text Reveal**: Use `.rv-stagger` on a container and `.rv-stagger-item` on children (usually `<span>` tags) for a "rising mask" effect.

### 2.2 Interactive Components
For more complex interactions (parallax, magnetic effects, 3D tilts), we use dedicated client components like `IndexInteractive.tsx` or `Magnetic.tsx`.
- **Manual Reveal**: When elements are added dynamically, call `window.__observeReveal()` to ensure the `IntersectionObserver` picks them up. This is exposed globally in `Providers.tsx`.

### 2.3 Page Transitions
The `TransitionWrapper.tsx` uses a `key={pathname}` pattern. This forces a full component re-mount on navigation, triggering the `pageSweep` CSS animation in `globals.css`.

---

## 🛡️ 3. The Registration Pipeline (Security & Validation)

The registration flow (`/register`) is the most mission-critical and hardened part of the site.

### 3.1 Multi-Layered Validation
1. **Honeypot**: A hidden `fax_number` field. If filled, the server action (`register.ts`) fails instantly.
2. **Client-Side Guard**: `RegistrationForm.tsx` checks `localStorage` and `document.cookie` for a `meridiansociety_registered_v1` key to prevent duplicate submissions in the same browser.
3. **Rate Limiting**: An in-memory IP-based rate limit (1 submission per 5 minutes) is enforced in the server action.
4. **Security Delay**: A randomized delay of 300ms–800ms is applied to all submissions to prevent timing attacks.
5. **Backend Duplicate Check**: The server action uses a Supabase Service client to perform a case-insensitive email lookup before any insertion.

### 3.2 Submission Lifecycle
We use React 19's `useTransition` to manage the submission state. This allows for a "Pending" UI while the server action processes, followed by a permanent Success State that persists via cookies.

---

## 🗄️ 4. Database & Real-time Engine

### 4.1 Schema Overview
- **`members`**: Stores the primary member directory. Emails are unique and normalized to lowercase.
- **`site_stats`**: A single-row table (`id: 'meridian_global_stats'`) that caches the total member count.

### 4.2 The Live Counter Trigger
We use a Postgres trigger (`handle_member_count_change`) on the `members` table.
- **Automated**: Any insertion or deletion on `members` automatically increments or decrements the `site_stats.member_count`. 
- **Real-time Restriction**: Display of the live member count is restricted exclusively to the `Footer.tsx` component. The previously separate `MemberCount.tsx` component has been removed to reduce redundant logic and visual clutter across the site.
- **Pulse Indicator**: The live count in the footer features a real-time pulsing status indicator integrated directly into the "Live Member Count" sub-header.

---

## 🎨 5. Styling & Visual Standards

### 5.1 The CSS Architecture
- **Global CSS (`globals.css`)**: Contains all core tokens (`:root`), typography, shared utility classes (`.btn-primary`, `.sec-label`, `.wrap`), and the hardened mobile reset rules.
- **Page-Specific CSS (`pageCss.ts`)**: Injected via the `PageStyles` component. This prevents "Flash of Unstyled Content" (FOUC) and also handles re-syncing the `IntersectionObserver` for the current page content.

### 5.2 Design Tokens & Rules
- **Typography**: 
    - `--serif`: Cormorant Garamond (Body/Titles).
    - `--sans`: Barlow Condensed (Eyebrows/UI).
    - **Rule**: Minimum `--serif` body size is 17px (preferred 19px). Minimum `--sans` eyebrow is 10.5px.
- **Colors**: Never use pure black (#000). Use `--ink` (#18150F).
- **Horizontal Protection**: `html` and `body` are strictly set to `overflow-x: hidden`. Never use `width: 100vw`; always use `width: 100%`.

---

## 📈 6. SEO & Dynamic Assets

### 6.1 Metadata Export
Every `page.tsx` must export a unique `Metadata` object. 
- **OG Images**: We use dynamic HTML-to-Image generation via `opengraph-image.tsx` using `next/og`. This ensures link previews always display the premium "A Room For Discourse" branding.
- **Sitemap/Robots**: Both are generated dynamically (`sitemap.ts`, `robots.ts`) to ensure perfect indexing while blocking non-essential AI crawlers.

---

## ⚙️ 7. Tech Stack & Infrastructure

- **Framework**: Next.js 16.2 (App Router)
- **UI**: React 19.2 (Server Components)
- **Styling**: Tailwind CSS v4 + Per-page CSS injection
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (Auto-deploys on push to `main`)

---

## 🛠️ 8. Developer Workflows

### Adding a New Page
1.  **Definitions**: Add the route to `NavBar.tsx` (constants and links) and `app/sitemap.ts`.
2.  **Page Setup**: Create `app/(site)/{page}/page.tsx` and a corresponding `pageCss.ts` if specific styling is required.
3.  **Metadata**: Define a unique title, description, and canonical URL in the root `page.tsx`.
4.  **UI Logic**: Implement the page using standardized sections (`.page-hero`, `.wrap`, etc.) and `.rv` classes for animations.

### Maintenance
- **UI-First**: Page content is managed directly within the component files for maximum control over layout and performance.
- **Supabase**: Always use `utils/supabase/service.ts` for database-level changes in server actions to bypass RLS safely.
