# Meridian Website — AGENTS.md

Instructions and context for AI agents working on the Meridian Society flagship website.

---

## 🏛 Organizational Context
The **Meridian Website** is the public facade of The Meridian Society. It represents the "Member Registry" to the public. All designs must adhere to the high-contrast, cream-and-ink aesthetic.

---

## 🚦 Strategic Rules
1.  **Strict Typing**: Maintain TypeScript integrity. Avoid `any` for registration or member objects.
2.  **No Dynamic Overrides**: Do not modify `globals.css` design tokens without explicit authorization. Use Tailwind 4 tokens for theme consistency.
3.  **Pathing & Network Proxy**: 
    - **Sovereign Gate**: All public registrations and data ingestion must follow the "Sovereign Gate" protocol defined in the root `proxy.ts`.
    - Note that `middleware.ts` is deprecated; all gating logic lives in the proxy.
4.  **Supabase Client**: 
    - Front-facing work MUST use the singleton in `utils/supabase/client.ts`.
    - BEWARE: The client is wrapped in a **Proxy** for SSR safety. Initialization only happens in the browser.
5.  **Hardened SSR Pattern**: 
    - To prevent `ReferenceError: document/window is not defined`, use the **Mounted Guard** pattern on all `'use client'` pages.
    - Check `if (!mounted) return <Loader />` before rendering interactive components.
6.  **CSS Module Policy**:
    - Centralized layout patterns (Heros, Intro Grids, Cards) MUST use the shared `.module-` classes in `app/globals.css`. Do not duplicate structural CSS in `pageCss.ts`.

---

- **RPC-SOVEREIGN Pattern**: All sensitive mutations MUST use the hardened `SECURITY DEFINER` RPCs that verify credentials against the internal **Sovereign Vault** (`system_settings`).
- **3-Master SQL Architecture**: The database is structured into three "Sources of Truth":
    1. `master_foundation.sql`: Core identity and member registry (Primary for this site).
    2. `master_event_os.sql`: Event orchestration.
    3. `master_member_os.sql`: Security audit logs and governance.
- **RPC Lockdown**: Public `EXECUTE` privileges are REVOKED for all sensitive RPCs. Mutations must occur via `service_role` actions.

---

## 🛠 Feature specific logic
- **Real-Time Member Count**: Uses a hybrid approach: Initial fetch via `/api/stats/count` followed by a Supabase Realtime subscription to the `site_stats` table.
- **Registration Flow**:
    - Includes a **Honeypot** check (`fax_number`).
    - Implements **IP-based Rate Limiting**.
    - Utilizes **Name Shielding** (verified members' names cannot be changed by subsequent public registrations).

---

- Always use `serif` (Cormorant Garamond) for primary headings.
- Always use `sans` (Barlow Condensed) for labels and metadata.
- Borders should be subtle: `border-[var(--ink)]/10`.
- Hover states should use `var(--gold)`.

---

## 🏛 Registry Foundation (SQL)
The project utilizes a Unified Database architecture. To initialize the system settings vault, run this in the Supabase SQL Editor:

```sql
SELECT initialize_system_vault('YOUR_SECRET_HERE');
```
