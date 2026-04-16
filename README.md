# The Meridian Society — Operations Manual

Welcome to the official manual for [The Meridian Society](https://meridiansociety.ca). This guide is designed for non-technical administrators to manage the site with zero coding knowledge.

---

## 🗺️ Visual-to-File Map

Use this table to find exactly which file you need to open to edit a specific page.

| Page Name | Website Link | Source File Path |
| :--- | :--- | :--- |
| **Homepage** | [/](https://meridiansociety.ca) | `app/(site)/page.tsx` |
| **Speaker Events** | [/events](https://meridiansociety.ca/events) | `app/(site)/events/page.tsx` |
| **Social Gatherings** | [/social](https://meridiansociety.ca/social) | `app/(site)/social/page.tsx` |
| **The Team** | [/team](https://meridiansociety.ca/team) | `app/(site)/team/page.tsx` |
| **Membership** | [/membership](https://meridiansociety.ca/membership) | `app/(site)/membership/page.tsx` |
| **Speaker App** | [/speak](https://meridiansociety.ca/speak) | `app/(site)/speak/page.tsx` |
| **Registration** | [/register](https://meridiansociety.ca/register) | `app/register/page.tsx` |

---

## 👥 Managing Members (Supabase)

All member registrations are stored in **Supabase**. 

1.  **Login**: Access your project at [database.new](https://database.new).
2.  **Table Editor**: Select the `members` table from the left sidebar.
3.  **To Add/Delete**: Use the **Insert Row** or right-click to **Delete**.
4.  **Live Counter**: Changes here update the website footer automatically in seconds.

---

## 🎖️ Adding a Team Member (Frictionless Templates)

Adding a person requires **three** copy-paste steps in `app/(site)/team/page.tsx`.

### Step 1: Upload the Photo
1. Upload a portrait-style photo to `public/assets/images/team/`.
2. Name it something simple (e.g., `sarah.webp`).

### Step 2: Paste the "Search Data" (Template 1)
Find **Line 57** in `app/(site)/team/page.tsx`. Paste this block immediately **below** the existing scripts:

```tsx
      {/* JSON-LD Person Schema (NAME) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePersonSchema({
            name: "Full Name",
            jobTitle: "Your Role Here",
            description: "A short one-sentence bio for Google search results.",
            image: "/assets/images/team/sarah.webp",
            sameAs: ["https://linkedin.com/in/yourprofile"]
          })),
        }}
      />
```

### Step 3: Paste the "Display Card" (Templates 2 & 3)
Find **Line 151** in `app/(site)/team/page.tsx`. Paste this block immediately **above** the `{/* Placeholder */}` comment. 

**Choose the icon you need (Template 3):**

#### Option A: With LinkedIn Icon
```tsx
        <article className="member-card rv" id="unique-id" aria-labelledby="name-id" data-tilt>
          <div className="member-body">
            <div className="member-header">
              <div className="member-photo-wrap">
                <Image src="/assets/images/team/sarah.webp" className="member-photo" alt="Full Name" width={96} height={120} />
              </div>
              <div>
                <h3 className="member-name" id="name-id">Full Name</h3>
                <div className="member-role">Your Role</div>
              </div>
            </div>
            <p className="member-studies">Program Name, University</p>
            <p className="member-bio">Your bio text goes here. Keep it professional and concise.</p>
            <div className="member-social">
              <a href="https://linkedin.com/..." target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
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
                <Image src="/assets/images/team/sarah.webp" className="member-photo" alt="Full Name" width={96} height={120} />
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

## 🛠️ Troubleshooting

| Issue | Likely Cause | Solution |
| :--- | :--- | :--- |
| **Error: "Unterminated string"** | Single quote used | Use `&apos;` instead of a normal apostrophe (`'`). |
| **Photo is missing** | Filename mismatch | Case matters! `Sarah.webp` is not the same as `sarah.webp`. |
| **Site didn't update** | Deployment delay | Wait ~60 seconds. If it doesn't work, check the "Deployment" tab in Vercel for errors. |

---

## 🔒 Security & Performance

- **Media**: Always use **WebP** for photos. It makes the site load 10x faster.
- **Save Early**: Any changes pushed to the `main` branch are live globally in under a minute.

---
*For technical specifications, see [TECHNICAL.md](TECHNICAL.md).*
