# The Meridian Society — Ultra-Detailed Technical Specification

This document is the definitive, high-fidelity system of record for the **Meridian Website**—the society's entire identity and the foundational base for everything it does. It serves as an **"Agent-Ready" encyclopedia** of the society's core architecture, security, and data systems.

---

## 🏗️ 1. Architecture: Responsive Single-View Pattern

The site implements a unified, mobile-first component tree. We avoid separate mobile/desktop routes, instead relying on CSS media queries and the `PageStyles` pattern to adapt the UI.

### 1.1 Source-to-Route Mapping
| Public URL | Route Directory | Source File Path | CSS Logic |
| :--- | :--- | :--- | :--- |
| `/` | `app/(site)/` | `page.tsx` | `pageCss.ts` |
| `/events` | `app/(site)/events/` | `page.tsx` | Shared Modules + `pageCss.ts` |
| `/membership`| `app/(site)/membership/` | `page.tsx` | `pageCss.ts` |
| `/social` | `app/(site)/social/` | `page.tsx` | Shared Modules + `pageCss.ts` |
| `/team` | `app/(site)/team/` | `page.tsx` | (Standard CSS) |
| `/register` | `app/register/` | `page.tsx` | (Shared `globals.css`) |

### 1.2 Desktop UI Optimization (v1.4)
The site implements a strict **Mobile Isolation Strategy** for high-resolution displays (>1101px):
- **Spacing**: Increased vertical rhythm using `--section-spacing-dt: 120px`.
- **Typography**: Responsive `hero-title` scaling using `clamp` (up to 220px on ultra-wide).
- **Performance Hardening**: High-traffic animated elements utilize `will-change: transform, opacity` to ensure hardware acceleration and 60FPS fluidity on desktop.

---

## 🛡️ 2. The Registration Pipeline (Hardened)

The registration flow (`/register`) is the most mission-critical and hardened part of the site.

### 2.1 Security Pipeline Flow
1. **Honeypot**: Captures bots filling the hidden `fax_number` field. Returns instant failure.
2. **Rate Limiting**: IP-based window (5 minutes) managed in `app/actions/register.ts`.
3. **Zod Validation**: Strict schema enforcement for all fields (fullName, email, institution, etc.).
4. **Service Role Bypass**: The server action utilizes `createServiceClient` to bypass Row Level Security (RLS) for two critical checks:
    - **Duplicate Check**: Case-insensitive email lookup before insertion.
    - **Insertion**: High-privilege insert into the `members` table (Anonymous inserts are disabled via RLS).

---

## ⚡ 3. Telemetry & Live Member Counting

The live member counter in the footer uses a multi-layered architecture for near-zero latency.

### 3.1 Data Flow Architecture
1. **Bootstrap**: The `Footer.tsx` fetches `/api/stats/count` on mount (Edge route, cached).
2. **Realtime**: Upon mount, a Supabase Realtime channel (`footer_stats_updates`) is established to listen for `UPDATE` events on `site_stats`.
3. **Trigger**: DB trigger `handle_member_count_change()` maintains the count on the `members` table.
4. **Caching**: Edge route uses SWR headers (`s-maxage=60, stale-while-revalidate=300`) to ensure instant loads.

---

## ✨ 4. Animation Engine & Reveal Lifecycle

The site utilizes a strict "Observer-Reveal" pattern managed through `Providers.tsx`.

### 4.1 Intersection Observer (`.rv`)
- **Properties**: `threshold: 0.01`, `rootMargin: "0px 0px 100px 0px"`.
- **Logic**: Elements with the `.rv` class gain the `.on` class when entering the viewport.
- **Stagger Delays**: Managed via `data-d` attributes (80ms increments).
- **Page Transitions**: Content is wrapped in `TransitionWrapper` which applies the `pageSweep` keyframe (opacity: 0->1, blur: 8px->0, translateY: 10px->0).

### 4.2 Magnetic UI Logic (`Magnetic.tsx`)
- Uses mouse events to calculate pull strength relative to the element center.
- **Performance**: High-frequency mouse moves update **CSS variables** (`--mag-x`, `--mag-y`) rather than React state, ensuring 60FPS fluid motion.
- **Auto-Disable**: Component detects `(pointer: coarse)` and disables the effect for touch devices to save battery.
- **Wordmark Integration**: The primary site wordmark in the `NavBar` utilizes the Magnetic effect on desktop for enhanced interactive discovery.

### 4.3 Social Record Pattern (`SocialInstagramSection.tsx`)
- **Purpose**: A unified Call-to-Action module used across all informational subpages.
- **Design**: Centered, high-contrast "Official Notice" aesthetic with the magnetic "Follow" interaction.
- **Logic**: Imports `INSTAGRAM_URL` from common social utils to ensure link persistence.

---

## 🔒 5. Permanent Information Policy

**Static-First Intent**: The `/events` and `/social` pages are documented as **event history guides**. 
- No dynamic event fetching is implemented.
- JSON-LD Event schemas pointing to future dates are strictly prohibited to maintain static integrity.
- All real-time updates are redirected to the Society's Instagram.

---
*Maintained to ensure 100% Agent Performance.*
