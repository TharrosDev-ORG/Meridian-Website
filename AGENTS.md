# Meridian Website — AGENTS.md

Instructions and context for AI agents working on the Meridian Society flagship website.

---

## 🏛 Organizational Context
The **Meridian Website** is the public facade of The Meridian Society. It represents the "Archival Registry" to the public. All designs must adhere to the high-contrast, parchment-and-ink aesthetic.

---

## 🚦 Strategic Rules
1.  **Sovereign Gate (Security)**: All public registration and data ingestion must follow the "Sovereign Gate" protocol. The database independently verifies all administrative mutations.
2.  **Aesthetic Permanence**: Use Tailwind 4 tokens for theme consistency. Never use ad-hoc hex codes; always reference the CSS variables in `globals.css`.
3.  **Registry Hierarchy**: This site operates on the **Foundation** layer of the project. It handles the `members` registry which is shared with EventOS and MemberOS.
4.  **No FOUC Style Injection**: Use the `PageStyles` pattern for per-page CSS to prevent Flash of Unstyled Content during navigation.

---

## 🛡️ Security Protocols (SOVEREIGN-GATE)
- **Credential Safety**: Never commit `.env.local`.
- **Administrative Handshake**: Administrative actions (if any) are gated by the `PORTER_SECRET` or `MEMBER_SECRET`.
- **RPC-SOVEREIGN Pattern**: All sensitive mutations MUST use the hardened `SECURITY DEFINER` RPCs defined in the `3-Master` SQL architecture.

---

## 🛠 Feature specific logic
- **Real-Time Member Count**: Uses Supabase Realtime to subscribe to `site_stats`. Initial fetch is handled via server actions.
- **Registration Flow**:
    - Includes a **Honeypot** check (`fax_number`).
    - Implements **IP-based Rate Limiting**.
    - Utilizes **Name Shielding** (verified members' names cannot be changed by subsequent public registrations).

---

## 🏛 Archival Registry (SQL)
The project utilizes a Unified Database architecture split into three master modules:
1. `master_foundation.sql` (Foundational Identity - **Primary for this site**)
2. `master_event_os.sql` (Event Orchestration)
3. `master_member_os.sql` (Governance & Audit)

**Required Database Config**:
```sql
ALTER DATABASE postgres SET "app.settings.porter_secret" = 'YOUR_SECRET';
ALTER DATABASE postgres SET "app.settings.member_secret" = 'YOUR_SECRET';
```
