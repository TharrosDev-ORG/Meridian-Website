# 🏛️ The Meridian Society — Core Platform

The **Meridian Website** is the core of The Meridian Society—it is the society's entire identity and the foundational base for all its operations. This document is designed for zero-friction management of the society's primary engine.

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
> **3. The Apostrophe Rule**: If you need to use an apostrophe ( ' ), type `&apos;` instead. This prevents code errors.

---

<a name="file-map"></a>
## 🗺️ I want to know which file to edit

Use this map to find the source code for any page on the site.

| Goal Page | Website Link | Source File Path (Click in IDE) |
| :--- | :--- | :--- |
| **Homepage** | [/](https://meridiansociety.ca) | [page.tsx](app/(site)/page.tsx) |
| **Speaker Events** | [/events](https://meridiansociety.ca/events) | [page.tsx](app/(site)/events/page.tsx) |
| **Social Gatherings** | [/social](https://meridiansociety.ca/social) | [page.tsx](app/(site)/social/page.tsx) |
| **The Team** | [/team](https://meridiansociety.ca/team) | [page.tsx](app/(site)/team/page.tsx) |
| **Membership** | [/membership](https://meridiansociety.ca/membership) | [page.tsx](app/(site)/membership/page.tsx) |
| **Speaker Program** | [/speak](https://meridiansociety.ca/speak) | [page.tsx](app/(site)/speak/page.tsx) |
| **Contact** | [/contact](https://meridiansociety.ca/contact) | [page.tsx](app/(site)/contact/page.tsx) |
| **Privacy Notice** | [/privacy](https://meridiansociety.ca/privacy) | [page.tsx](app/(site)/privacy/page.tsx) |
| **Terms of Use** | [/terms](https://meridiansociety.ca/terms) | [page.tsx](app/(site)/terms/page.tsx) |
| **Registration** | [/register](https://meridiansociety.ca/register) | [page.tsx](app/register/page.tsx) |
| **Speaker Application** | [/apply](https://meridiansociety.ca/apply) | [page.tsx](app/apply/page.tsx) |

---

<a name="add-team"></a>
## 🎖️ I want to add a new Team Member

Follow these three steps in `app/(site)/team/page.tsx`.

### 1. The Photo
Upload a portrait photo to `public/assets/images/team/`. Name it `name.webp`.

### 2. The Search Data (Around Line 57)
Paste this below the last script tag. Update the name and bio.
```tsx
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePersonSchema({
            name: "Full Name",
            jobTitle: "Founder & President",
            description: "Started The Meridian Society to share knowledge with students.",
            image: "/assets/images/team/name.webp",
            sameAs: ["https://linkedin.com/in/..."]
          })),
        }}
      />
```

### 3. The Display Card (Around Line 151)
Paste **ONE** of these blocks above the `{/* Placeholder */}` block.

#### Option A: With LinkedIn Icon
```tsx
        <article className="member-card rv" id="unique-id" aria-labelledby="name-id" data-tilt>
          <div className="member-body">
            <div className="member-header">
              <div className="member-photo-wrap">
                <Image src="/assets/images/team/name.webp" className="member-photo" alt="Full Name" width={96} height={120} />
              </div>
              <div>
                <h3 className="member-name" id="name-id">Full Name</h3>
                <div className="member-role">Your Role</div>
              </div>
            </div>
            <p className="member-studies">Program Name, University</p>
            <p className="member-bio">Your bio text goes here. Keep it professional and concise.</p>
            <div className="member-social">
              <a href="https://linkedin.com/in/..." target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </article>
```

#### Option B: With Instagram Icon
```tsx
        <article className="member-card rv" id="unique-id" aria-labelledby="name-id" data-tilt>
          <div className="member-body">
            <div className="member-header">
              <div className="member-photo-wrap">
                <Image src="/assets/images/team/name.webp" className="member-photo" alt="Full Name" width={96} height={120} />
              </div>
              <div>
                <h3 className="member-name" id="name-id">Full Name</h3>
                <div className="member-role">Your Role</div>
              </div>
            </div>
            <p className="member-studies">Program Name, University</p>
            <p className="member-bio">Your bio text goes here. Keep it professional and concise.</p>
            <div className="member-social">
              <a href="https://instagram.com/..." target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
            </div>
          </div>
        </article>
```

---

<a name="manage-members"></a>
## 👥 I want to manage the Member List

1. Open the [Supabase Dashboard](https://database.new).
2. Go to the **Table Editor** → `members` table.
3. **Add**: Click "Insert Row".
4. **Remove**: Right-click a row and select "Delete Row".
5. **Sync**: The website footer counter updates automatically via database trigger.
6. **Member Numbers**: Every row has a unique `member_number` (format `M26-1001`). Numbers are auto-assigned on insert and can never be changed — do not attempt to edit this column.

---

<a name="member-cards"></a>
## 💳 Member ID Cards

The Society issues digital **Official Member Cards** (PNG format) upon successful registration or verification. Members download them directly from the registration success screen.

- **What&apos;s on the card**: Member name, unique member number (large serif), registration date, society seal, and "The Meridian Society" header — all rendered client-side on a 1200×750 canvas.
- **Card preview**: A live HTML/CSS preview of the card is shown on the success screen before download so members know what they&apos;re getting.
- **Registration date**: The "Member Since" date is displayed directly on the success screen alongside the member number.
- **Copy member number**: Members can copy their number to the clipboard with one click from the success screen.
- **Auto-Sync**: If a member returns to the site, the system automatically retrieves their registry data (name, join date) to ensure the card is always accurate.
- **Security**: Member numbers are immutable — once assigned at the database level, they serve as the permanent identifier in the Sovereign Registry and cannot be altered.

---

<a name="edit-text"></a>
## ✍️ I want to fix a typo or edit text

1. Find the **Source File** in the mapping above.
2. Search (`Ctrl + F`) for the specific word you want to change.
3. Replace it with your new text (Remember **Rule #3** for apostrophes!).
4. Save the file.

---

<a name="mission"></a>
**The Meridian Society** is a student-led speaker forum based in Ottawa, Ontario. 

Founded on the belief that curiosity is the primary driver of education, the Society serves as a bridge between the university campus and the professional world. We bring journalists, founders, scholars, and accomplished professionals directly to the room to share knowledge, challenge assumptions, and inspire the next generation of leaders.

The Meridian Website is the society's entire identity and the base of everything it does. It is a premium digital presence that serves as the society's central engine, utilizing a unified **Social Record** system to bridge informational content with real-time community dispatches.

---

## 🏛️ Sovereign Registry (SQL Architecture)

The Meridian Project utilizes a unified database architecture built up through eight sequential migrations in `supabase/migrations/`. Apply them in order to any new Supabase instance:

| File | What it does |
|------|-------------|
| `20260415000000_foundation_registry_and_stats.sql` | Core `members` and `site_stats` tables, count trigger, basic RLS |
| `20260415000001_sovereign_rls_lockdown.sql` | Tightens RLS, hardens function search paths |
| `20260415000002_vault_access_control.sql` | Blocks anonymous inserts, `site_stats` read-only for anon |
| `20260416113000_advanced_member_schema_ext.sql` | ENUM types, `join_date_readable` generated column |
| `20260417000000_archival_audit_logging_sys.sql` | Removes remaining back-doors, adds security functions |
| `20260417120000_strict_privilege_revocation.sql` | Revokes EXECUTE from PUBLIC; service_role only |
| `20260427152500_add_member_numbers.sql` | `member_number` column, sequence, auto-assign + immutability triggers |
| `20260427154500_sovereign_hardening.sql` | Final function hardening, speaker tables RLS |

### Table Definitions
- **`members`**: Registration records. Email is the primary key. Includes ENUMs for role/institution/referral, an interests array, `member_number` (immutable, auto-assigned `M{YY}-{NNNN}`), and a generated `join_date_readable` column.
- **`site_stats`**: Single-row global metadata (`id = 'meridian_global_stats'`). `member_count` is auto-maintained by a trigger on `members`.

---

## Deployment

Push to `main` → Vercel auto-deploys. No manual build step.

Vercel env vars required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Favicons are in `public/assets/favicons/` — do not add `app/favicon.ico` (overrides the metadata-managed set).

---

## 🗺️ Future Roadmap
- [ ] **The Ledger (Interactive Timeline)**: 
    - **Concept**: An immutable digital record of the Society's trajectory, serving as the definitive historical archive of all forums and milestones.
    - **Function**: A vertical, scroll-synchronized timeline documenting forum dates, key speakers, founding declarations, and member growth metrics.
    - **Aesthetic**: Minimalist "Ink-on-Cream" vertical spine. Utilizes monospace-style timestamps paired with elegant Serif narratives. Milestones should "fade into view" with a subtle ink-bleed animation, as if the record is being written in real-time during the scroll.
    - **Visual Sketch**:
      ```mermaid
      graph TD
        %% Vertical Spine
        S1(( )) --- P1(( ))
        P1 --- P2(( ))
        P2 --- P3(( ))
        P3 --- S2(( ))

        %% Milestones (Linked horizontally to force verticality of spine)
        P1 --- M1["<b>OCT 2024</b><br/>Founding Declaration"]
        P2 --- M2["<b>NOV 2024</b><br/>Inaugural Speaker Forum"]
        P3 --- M3["<b>JAN 2025</b><br/>Member OS 1.0 Deployment"]

        %% Details
        M1 --- D1["[+] Expansion Record: <i>Founding signatories gathered...</i>"]
        M2 --- D2["[+] Expansion Record: <i>A forum on the future of curiosity...</i>"]
        M3 --- D3["[+] Expansion Record: <i>Sovereign Gate protocol finalized...</i>"]

        %% Styling to emphasize the straight "Ink" line
        style S1 fill:#18150F,stroke:#D4AF37
        style S2 fill:#18150F,stroke:#D4AF37
        style P1 fill:#D4AF37,stroke:#18150F
        style P2 fill:#D4AF37,stroke:#18150F
        style P3 fill:#D4AF37,stroke:#18150F
        
        style M1 fill:#FDFCF8,stroke:#18150F
        style M2 fill:#FDFCF8,stroke:#18150F
        style M3 fill:#FDFCF8,stroke:#18150F
        
        style D1 fill:#FDFCF8,stroke:#D4AF37,stroke-dasharray: 3 3
        style D2 fill:#FDFCF8,stroke:#D4AF37,stroke-dasharray: 3 3
        style D3 fill:#FDFCF8,stroke:#D4AF37,stroke-dasharray: 3 3

        %% Layout hints
        classDef default font-family:serif,font-size:12px;
      ```
