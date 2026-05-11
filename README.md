# 🏛️ The Meridian Society — Core Platform

The **Meridian Website** is the core of The Meridian Society — the society's entire identity and the foundational base for all its operations. This document is designed for zero-friction management of the society's primary engine.

---

## 💎 The Golden Rules of Maintenance

If you stay within these guidelines, you can manage the site with 100% safety.

> [!IMPORTANT]
> **1. The "Between the Tags" Rule**: When editing text, only change words found between `< >` tags.
> *   ✅ Correct: `<p>Change this text</p>`
> *   ❌ Dangerous: `<p Change this text /p>` (Deleting a bracket breaks the site).
>
> **2. The WebP Image Rule**: Only upload photos in `.webp` format. It keeps the site fast and professional.
>
> **3. The Apostrophe Rule**: If you need an apostrophe ( ' ), type `&apos;` instead. Prevents code errors.

---

## 🗺️ I want to know which file to edit

| Goal Page | Website Link | Source File Path |
| :--- | :--- | :--- |
| **Homepage** | [/](https://meridiansociety.ca) | [page.tsx](<app/(site)/page.tsx>) |
| **Events** (Forum + Socials, tabbed) | [/events](https://meridiansociety.ca/events) | [page.tsx](<app/(site)/events/page.tsx>) + [EventsTabs.tsx](<app/(site)/events/EventsTabs.tsx>) |
| **Membership** | [/membership](https://meridiansociety.ca/membership) | [page.tsx](<app/(site)/membership/page.tsx>) |
| **Contact** | [/contact](https://meridiansociety.ca/contact) | [page.tsx](<app/(site)/contact/page.tsx>) |
| **Privacy Notice** | [/privacy](https://meridiansociety.ca/privacy) | [page.tsx](<app/(site)/privacy/page.tsx>) |
| **Terms of Use** | [/terms](https://meridiansociety.ca/terms) | [page.tsx](<app/(site)/terms/page.tsx>) |
| **Registration** | [/register](https://meridiansociety.ca/register) | [page.tsx](app/register/page.tsx) |
| **Speaker Application** | [/apply](https://meridiansociety.ca/apply) | [page.tsx](app/apply/page.tsx) |

There is no longer a standalone `/team`, `/social`, `/speak`, or `/calendar` route — those were consolidated during the May 2026 declutter. Old URLs are permanent-redirected from `next.config.ts`.

---

## 🎖️ I want to add or change a Team Member

Team cards live on the homepage in `app/(site)/page.tsx`, inside the `{/* THE TEAM */}` section.

### 1. The Photo
Upload a portrait to `public/assets/images/team/`. Name it `firstname.webp`.

### 2. The Person JSON-LD (top of `page.tsx`)
Find the existing `generatePersonSchema(...)` blocks at the top of the file and copy one to add a new person.

### 3. The Display Card
Inside the `<div className="member-grid h-scroll">` block, copy one of the existing `<article className="member-card ...">` blocks and update the name / role / school / social link. Place the new card before the `{/* Placeholder */}` block.

> The placeholder card ("The team is growing.") can stay or be removed depending on whether the grid is full.

---

## 👥 I want to manage the Member List

1. Open the [Supabase Dashboard](https://database.new).
2. Go to the **Table Editor** → `members` table.
3. **Add**: Click "Insert Row".
4. **Remove**: Right-click a row → "Delete Row".
5. **Sync**: The live counter on the homepage About section updates automatically via a DB trigger + Supabase Realtime channel (`member-stats-global`). No deploy needed.
6. **Member Numbers**: Every row gets a unique `member_number` (`M26-1001`). Auto-assigned on insert and never editable — do not attempt to change this column.

> The `events` and `event_registrations` tables still exist in Supabase but are no longer wired to the public website. They remain for any external admin tooling.

---

## 💳 Member ID Cards

The Society issues digital **Official Member Cards** (PNG) upon successful registration or verification. Members download them directly from the registration success screen.

- **What's on the card**: Member name, member number (large serif), member-since date, society seal, "The Meridian Society" header, and an "Independent Student Organization · Ottawa · Est. 2025" signature line — all rendered client-side on a 1200×1200 portrait canvas.
- **Card preview**: A live HTML/CSS preview is shown on the success screen before download.
- **Member-since date**: Shown alongside the member number on the success screen.
- **Copy member number**: One-click clipboard copy from the success screen.
- **Auto-Sync**: Returning visitors who have a cookie or matching email get their registry data back-filled so the card is always accurate.
- **Security**: Member numbers are immutable at the database level.

> The previous version of the card embedded a QR code for venue scanning. That was removed during the May 2026 cleanup — the card is now a clean visual ID.

---

## ✍️ I want to fix a typo or edit text

1. Find the **Source File** in the file map above.
2. Search (`Ctrl + F`) for the specific word.
3. Replace it (remember **Rule #3** for apostrophes).
4. Save the file.

For shared copy used in many places, see `utils/copy.ts` and `utils/social.ts` (Instagram URL + contact email).

For the membership FAQ, edit `constants/membership.ts` (`FAQ_ITEMS`). Changes update both the accordion and the FAQ JSON-LD automatically.

---

## 🛫 Deployment

Push to `main` → Vercel auto-deploys. No manual build step.

Required Vercel env vars:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Favicons are in `public/assets/favicons/` — do not add `app/favicon.ico` (that would override the metadata-managed set).

---

## 🧭 Site Navigation (for editors)

- **NavBar** (desktop) — `components/NavBar.tsx`. Four items: About (`/#about`), Team (`/#team`), Events, Membership; plus the Register CTA.
- **MobileMenu** — slide-out drawer at `components/MobileMenu.tsx`. Mirrors NavBar plus an Apply to Speak link.
- **MobileDock** — bottom mobile dock at `components/MobileDock.tsx`. Home / Events / Register / Menu.
- **Footer** — `components/Footer.tsx` (server component). Society / Engage / Connect / Info columns. The live member counter is NOT here — it lives on the homepage.

---

## 🏛️ Mission

**The Meridian Society** is a student-led speaker forum and social community based in Ottawa, Ontario.

Founded on the belief that curiosity is the primary driver of education, the Society bridges the university campus and the professional world. We bring journalists, founders, scholars, and accomplished professionals directly to the room to share knowledge, challenge assumptions, and inspire the next generation of leaders.

The website is the society's central engine — a premium digital presence that pairs evergreen informational content with real-time community dispatches on Instagram.

---

## 🗄️ Sovereign Registry (SQL Architecture)

The project utilizes a unified database architecture built up through three master files in `supabase/` and eight sequential migrations in `supabase/migrations/`.

| File | What it does |
|------|-------------|
| **`01_Sovereign_Member_Registry.sql`** | Primary identity and member registry |
| **`02_Meridian_EventOS_Engine.sql`** | Event orchestration (no longer wired to the public site) |
| **`03_Security_Vault_and_Audit_Logs.sql`** | Security vault, master-signature verification, audit logging |

| Migration File | What it does |
|------|-------------|
| `20260415000000_foundation_registry_and_stats.sql` | Core `members` + `site_stats`, count trigger, basic RLS |
| `20260415000001_sovereign_rls_lockdown.sql` | Tightens RLS, hardens function search paths |
| `20260415000002_vault_access_control.sql` | Blocks anonymous inserts; `site_stats` read-only for anon |
| `20260416113000_advanced_member_schema_ext.sql` | ENUM types; `join_date_readable` generated column |
| `20260417000000_archival_audit_logging_sys.sql` | Removes back-doors; adds security functions |
| `20260417120000_strict_privilege_revocation.sql` | Revokes EXECUTE from PUBLIC; service_role only |
| `20260427152500_add_member_numbers.sql` | `member_number` column, sequence, triggers |
| `20260427154500_sovereign_hardening.sql` | Final function hardening, speaker tables RLS |

### Public app's slice of the database
The public website only touches:
- `members` — registration core
- `site_stats` — live counter
- `speaker_applications` — apply funnel
- `check_member_status` RPC — polymorphic email/number lookup

Everything else in the schema is admin/system surface and is intentionally untouched.

---

## 🛠️ For Developers

- **AI agent guardrails**: [CLAUDE.md](CLAUDE.md)
- **Technical encyclopedia**: [TECHNICAL.md](TECHNICAL.md)
- **Agent-specific rules**: [AGENTS.md](AGENTS.md)
