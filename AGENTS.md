# The Meridian Society — Developer & AI Agent Manual

This document is the definitive technical source of truth and "Master Specification" for The Meridian Society website. It defines the architecture, security pipelines, animation systems, and mental models required to maintain and expand the codebase.

---

## 🏗️ 1. Core Architecture: The "View Splitter" Pattern

To deliver a premium experience on both mobile and desktop without "squished" layouts or horizontal leaks, the site uses a **Dual-Experience Architecture**.

### 1.1 Device Detection & Hydration
- **Logic**: We use a `useIsMobile(breakpoint?: number)` hook powered by React 19's `useSyncExternalStore`. This ensures a safe subscription to window media queries that is both server-side safe and highly performant.
- **The Splitter**: `ViewSplitter.tsx` is the gatekeeper. It delays rendering until the client-side mount (`hasMounted` state) to prevent hydration mismatches between the server (which defaults to Desktop) and the client.

### 1.2 Implementation Rules
When modifying a core page (Home, Events, Team):
- **Desktop View**: Lives in `Desktop{PageName}.tsx`. It uses the original "full-width" design logic.
- **Mobile View**: Lives in `Mobile{PageName}.tsx`. It implements a vertical-first, single-column design optimized for touch and readability.
- **Root Page**: The `app/(site)/{page}/page.tsx` should only contain `metadata` and the `ViewSplitter` integration. **NEVER** put UI logic in the root `page.tsx`.

---

## ✨ 2. The Animation & Reveal System

The site implements a premium animation suite that requires strict coordination across components.

### 2.1 Reveal Elements (`.rv`)
Elements with the `.rv` class start at `opacity: 0` and `translateY(20px)`.
- **Observer**: `Providers.tsx` initializes a global `IntersectionObserver`. When a `.rv` element enters the viewport, the `.on` class is added.
- **Staggers**: Use `data-d="1"` through `data-d="5"` for explicit delays (80ms increments).
- **Text Reveal**: Use `.rv-stagger` on a container and `.rv-stagger-item` on children (usually `<span>` tags) for a "rising mask" effect.

### 2.2 The RevealTrigger Component
Because `ViewSplitter` renders content dynamically after the initial page load, the global observer may miss newly mounted elements.
- **Mandatory**: You **MUST** include `<RevealTrigger />` in the root of both `Mobile-` and `Desktop-` page components. This utility re-syncs the observer to the current DOM.

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
5. **Admin Duplicate Check**: The server action uses a Supabase Admin client to perform a case-insensitive email lookup before any insertion.

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
- **Real-time**: The `Footer.tsx` and `MemberCount.tsx` components subscribe to `postgres_changes` on the `site_stats` table to update the UI instantly without a page refresh.

---

## 🎨 5. Styling & Visual Standards

### 5.1 The CSS Architecture
- **Global CSS (`globals.css`)**: Contains all core tokens (`:root`), typography, shared utility classes (`.btn-primary`, `.sec-label`, `.wrap`), and the hardened mobile reset rules.
- **Page-Specific CSS (`pageCss.ts`)**: Injected via the `PageStyles` component. This prevents "Flash of Unstyled Content" (FOUC) during client-side navigation.

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

## 🛠️ 7. Agentic Workflows: How to Expand

### Adding a New Page
1.  **Definitions**: Add the route to `NavBar.tsx` (constants and links) and `app/sitemap.ts`.
2.  **Split Setup**: Create `Desktop{Page}.tsx` and `Mobile{Page}.tsx`.
3.  **Reveal Trigger**: Ensure both split components include `<RevealTrigger />`.
4.  **Metadata**: Define a unique title and description in the root `page.tsx`.

### Maintenance
- **Data-First**: Most content (Events, Socials) lives in `data/`. Update the arrays there to push content changes without touching UI code.
- **Supabase**: Always use `utils/supabase/admin.ts` for database-level changes in server actions to bypass RLS safely.

---
*End of Specification. Follow these rules to maintain the Meridian Society's premium status.*
