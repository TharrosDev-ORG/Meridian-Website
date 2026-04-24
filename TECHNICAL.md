# The Meridian Society — Ultra-Detailed Technical Specification

This document is the definitive, high-fidelity system of record for the **Meridian Website**—the society's entire identity and the foundational base for everything it does. It serves as an **"Agent-Ready" encyclopedia** of the society's core architecture, security, and data systems.

---

## 🏗️ 1. Architecture: Responsive Single-View Pattern

The site implements a unified, mobile-first component tree. We avoid separate mobile/desktop routes, instead relying on CSS media queries and the `PageStyles` pattern to adapt the UI.

### 1.1 Source-to-Route Mapping
| Public URL | Route Directory | Source File Path | CSS Logic |
| :--- | :--- | :--- | :--- |
| `/` | `app/(site)/` | `page.tsx` | `pageCss.ts` (+ v1.5 desktop block) |
| `/events` | `app/(site)/events/` | `page.tsx` | Shared Modules + `pageCss.ts` (+ v1.5 desktop block) |
| `/membership`| `app/(site)/membership/` | `page.tsx` | `pageCss.ts` (+ v1.5 desktop block) |
| `/social` | `app/(site)/social/` | `page.tsx` | Shared Modules + `pageCss.ts` (+ v1.5 desktop block) |
| `/team` | `app/(site)/team/` | `page.tsx` | `pageCss.ts` (+ v1.5 desktop block) |
| `/speak` | `app/(site)/speak/` | `page.tsx` | `pageCss.ts` (+ v1.5 desktop block) |
| `/contact`, `/privacy`, `/terms` | `app/(site)/_info/` shared | `page.tsx` | `infoPageCss.ts` (shared + v1.5 desktop block) |
| `/register` | `app/register/` | `page.tsx` | `membershipCss` + inline `registerPageCss` (with desktop block) |

### 1.2 Desktop UI Optimization (v1.5)
The site implements a strict **Mobile Isolation Strategy** for high-resolution displays (≥1101px). All desktop polish lives inside `@media (min-width: 1101px)` gates — never leaking into mobile.

**Global layer (`globals.css` → "DESKTOP OPTIMIZATIONS v1.5" block):**
- **Container rhythm**: `.wrap { padding: 0 72px; }`; an ultra-wide `@media (min-width: 1600px)` tier lifts padding to `96px` and widens page-hero padding.
- **Readability caps**: Paragraph max-widths on `.hero-sub` (620px), `.register-body` / `.social-record-copy` (600px), and `.module-intro-copy` (62ch) prevent overly long lines on wide screens.
- **Hero rhythm**: `.page-hero`, `.module-page-hero` unified at `padding: 132px 72px 84px; min-height: 64vh;` with a 16ch `max-width` on the title and widened eyebrow rule/bottom-margin.
- **Nav density**: `.nav-inner { padding: 0 64px; }`, `.nav-links` gap 6px with comfortable link padding and letter-spacing.
- **Button elevation**: `.btn-primary` lifts `-3px` on hover with a `14px 44px` gold shadow on desktop.
- **Module cards**: `.module-card` padded to `48px 42px` with a layered ink + gold-tinted box-shadow on hover.
- **Footer interactivity**: `.footer-list a` translates `+4px` on hover and recolours to `--gold-lt`; footer brand tagline clamped to 280px.
- **Scroll UX**: larger `.arc-btn` (56×56) and longer `.rv` reveal easing for a calmer feel on large hero typography.
- **Reveal/page-sweep** tuned with finer blur/translate for smoother desktop entries.

**Per-page layer (`pageCss.ts` → each page's own `@media (min-width: 1101px)` block):**
- **Home**: stats bar density (32px values, 48px padding), `.about-body` / `.who-intro-body` / `.speaking-body` line-length caps, richer portal-card padding (`64px 56px`), airier register section.
- **Events / Social**: 2-col module intro grid, meta-row hover padding shift, signature/gathering card `56px` padding.
- **Team**: larger photo (104×130), 19px serif bio, subtle `filter: brightness/saturate` treatment on photo hover, refined social icons.
- **Membership**: benefits-grid `40px` gap, FAQ summary `36px 24px` padding with `20px` serif answers capped at 680px, 72px register-form padding.
- **Speak**: meta-row hover shift + airier apply block (`720px` inner width, 52px body margin).
- **Info (privacy/terms/contact)**: wider `740px` body, interactive contact-card hover, `168px` top hero padding.
- **404 / register**: consistent desktop padding + container widths.

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
