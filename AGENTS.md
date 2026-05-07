# Meridian Website — AGENTS.md

Instructions and context for AI agents working on the Meridian Society flagship website.

---

## 🏛 Organizational Context
The **Meridian Website** is the core of The Meridian Society—it is the society's entire identity and the foundational base for all its operations. All designs must adhere to the high-contrast, cream-and-ink aesthetic.


---

## 🚦 Strategic Rules
1.  **Strict Typing**: Maintain TypeScript integrity. Avoid `any` for registration, member, event, or RPC-response objects. Validate Supabase RPC payloads through the Zod schemas in `utils/rpcSchemas.ts`.
2.  **No Dynamic Overrides**: Do not modify `globals.css` design tokens without explicit authorization. Tailwind v4 is present only for the `@theme {}` block; structural CSS lives in `globals.css` and per-page `pageCss.ts` strings.
3.  **Pathing & Network Proxy**:
    - **Sovereign Gate**: all public registrations and data ingestion must follow the "Sovereign Gate" protocol defined in the root `proxy.ts` (Next.js 16 rename of `middleware.ts`).
    - Do **not** create a root `middleware.ts` — Next.js 16 will fail with "Both middleware file and proxy file are detected."
4.  **Supabase Client**:
    - Front-facing work MUST use the singleton in `utils/supabase/client.ts`.
    - BEWARE: the client is wrapped in a **Proxy** for SSR safety — server access throws. Initialization only happens in the browser.
    - Service-role writes must stay in server actions / route handlers; never import `utils/supabase/service.ts` from a `'use client'` file.
5.  **Hardened SSR Pattern**:
    - To prevent `ReferenceError: document/window is not defined`, use the **Mounted Guard** pattern on all `'use client'` components that touch browser-only APIs (`MemberCounter`, `CalendarClient`, `PublicRegistration`, `RegistrationForm`).
    - Check a `mounted` boolean (set in `useEffect`) before invoking Supabase realtime, `localStorage`, or `document`.
6.  **CSS Module Policy**:
    - Centralized layout patterns (Heros, Intro Grids, Cards) MUST use the shared `.module-` classes in `app/globals.css`. Do not duplicate structural CSS in `pageCss.ts`.
7.  **Mobile Isolation Strategy**:
    - All desktop-only visual and interactive enhancements (increased spacing, high-fidelity hovers, desktop-specific typography) MUST be strictly encapsulated within `@media (min-width: 1101px)` blocks.
    - This protects recent mobile optimizations (iOS input zoom fixes, safe-area insets, MobileDock placement) from regression on high-resolution displays.
8.  **Shared Security Primitives**:
    - All public-write server actions MUST run through `utils/serverActionSecurity.ts` (`runSecurityChecks` + `securityDelay` + `redactEmail`). Don't re-implement the honeypot / UA / rate-limit pipeline ad-hoc.

---

- **RPC-SOVEREIGN Pattern**: All sensitive mutations MUST use the hardened `SECURITY DEFINER` RPCs that verify credentials against the internal **Sovereign Vault** (`system_settings`).
- **3-Master SQL Architecture**: The database is structured into three "Sources of Truth":
    1. `01_Sovereign_Member_Registry.sql`: Core identity and member registry (primary for this site).
    2. `02_Meridian_EventOS_Engine.sql`: Event orchestration, `event_registrations`, and the `secure_register_for_event` RPC.
    3. `03_Security_Vault_and_Audit_Logs.sql`: Security vault, master-signature verification, audit logs.
- **RPC Lockdown**: Public `EXECUTE` privileges are REVOKED for all sensitive RPCs. Mutations must occur via `service_role` actions.

---

## 🛠 Feature specific logic
- **Real-Time Member Count**: hybrid approach — initial fetch via `/api/stats/count` (Edge, no-store) followed by a Supabase Realtime subscription on channel `member-stats-global` listening for `UPDATE`s on `site_stats`. **Renders on the homepage About section** via `<MemberCounter>`, NOT in the footer (the footer is a server component with no realtime).
- **Registration Flow**:
    - Includes a **Honeypot** check (`fax_number`).
    - Implements **bot User-Agent rejection** + **IP-based rate limiting** (5-min window for `/register`, 10-min for `/apply`).
    - **Polymorphic Lookup**: `checkMemberStatus(identifier)` supports both email (lower-cased) and member-number (upper-cased) identifiers.
    - **Background Sync**: missing `localStorage` data (join date / full name) is back-filled transparently via `checkMemberStatus` on mount.
    - **Canvas Identity (Vertical Portrait)**: Member ID cards are generated client-side via Canvas API (1200×1800 portrait).
        - **Branding**: Society Seal at top-center.
        - **QR Encoding**: Encodes the persistent `member_number` (M26-XXXX) with Level H error correction for PorterOS compatibility.
        - **Typography**: Requires font loading parity for `Cormorant Garamond` and `Barlow Condensed` (awaited via `document.fonts.load()` before drawing).
- **Calendar / Event RSVPs (`/calendar`)**:
    - ISR with `revalidate = 60` on the server side; renders upcoming + 3 most-recent past events.
    - Members RSVP via `<PublicRegistration>` which calls the `secure_register_for_event` RPC. Responses are validated against `PublicRegisterResultSchema` before use.
    - ICS downloads come from `utils/ics.ts`.

- **Success Screen Design**:
    - **Single-Viewport Constraint**: Success screens (specifically `.success-overhaul`) MUST fit entirely within a single viewport (`90vh` on desktop) to maintain a cinematic, gallery-style feel.
    - **Interactive Elements**: All exit paths (Back/Home) must use Next.js `useRouter` for fluid SPA navigation.

---

- Always use `serif` (Cormorant Garamond) for primary headings.
- Always use `sans` (Barlow Condensed) for labels and metadata.
- Borders should be subtle: `border-[var(--ink)]/10`.
- Hover states should use `var(--gold)`.

---

## 🛰 PorterOS Synchronization
- **ID Strategy**: Member IDs are persistent access keys. EventOS should verify scanned `memberNumber` payloads against the `meridian_members` registry.
- **Verification Logic**: 1. Scanned `M26-XXXX` -> 2. Registry Check -> 3. Ticket Cross-Reference (Event ID) -> 4. Attendance Log Entry.

---

## 🏛 Registry Foundation (SQL)
The project utilizes a Unified Database architecture. To initialize the system settings vault, run this in the Supabase SQL Editor:

```sql
SELECT initialize_system_vault('YOUR_SECRET_HERE');
```
