# 🏛️ The Meridian Society — Dashboard

Welcome to the central maintenance dashboard for The Meridian Society. This document is designed for zero-friction management of the site's content and members.

---

### 🚀 Quick Access Dashboard
*Click a task to jump directly to its instructions.*

| **Content & Team** | **Administration** | **Strategy** |
| :--- | :--- | :--- |
| 🎖️ [Add a Team Member](#-i-want-to-add-a-new-team-member) | 👥 [Manage Member List](#-i-want-to-manage-the-member-list) | 🤳 [Instagram Guidelines](#-i-want-to-manage-socials--events) |
| ✍️ [Edit Site Text](#-i-want-to-fix-a-typo-or-edit-text) | 🗺️ [Visual File Map](#-i-want-to-know-which-file-to-edit) | 📜 [Project Context](#-project-context-the-mission) |

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

## 🗺️ I want to know which file to edit

Use this map to find the source code for any page on the site.

| Goal Page | Website Link | Source File Path (Click in IDE) |
| :--- | :--- | :--- |
| **Homepage** | [/](https://meridiansociety.ca) | [page.tsx](app/(site)/page.tsx) |
| **Speaker Events** | [/events](https://meridiansociety.ca/events) | [page.tsx](app/(site)/events/page.tsx) |
| **Social Gatherings** | [/social](https://meridiansociety.ca/social) | [page.tsx](app/(site)/social/page.tsx) |
| **The Team** | [/team](https://meridiansociety.ca/team) | [page.tsx](app/(site)/team/page.tsx) |
| **Membership** | [/membership](https://meridiansociety.ca/membership) | [page.tsx](app/(site)/membership/page.tsx) |
| **Speaker App** | [/speak](https://meridiansociety.ca/speak) | [page.tsx](app/(site)/speak/page.tsx) |
| **Registration** | [/register](https://meridiansociety.ca/register) | [page.tsx](app/register/page.tsx) |

---

## 🎖️ I want to add a new Team Member

Follow these three steps in `app/(site)/team/page.tsx`.

### 1. The Photo
Upload a portrait photo to `public/assets/images/team/`. Name it `name.webp`.

### 2. The Search Data (Line 57)
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

### 3. The Display Card (Line 151)
Paste this above the `{/* Placeholder */}` block. 

| **LinkedIn Version** | **Instagram Version** |
| :--- | :--- |
| [Copy Code Here](https://github.com/meridiansociety/Meridian-Website/blob/main/README.md#option-a-with-linkedin-icon) | [Copy Code Here](https://github.com/meridiansociety/Meridian-Website/blob/main/README.md#option-b-with-instagram-icon) |

*(Templates provided in full below for direct copying)*

---

## 👥 I want to manage the Member List

1. Open the [Supabase Dashboard](https://database.new).
2. Go to the **Table Editor** -> `members` table.
3. **Add**: Click "Insert Row".
4. **Remove**: Right-click a row and select "Delete Row".
5. **Sync**: The website footer counter updates automatically.

---

## ✍️ I want to fix a typo or edit text

1. Find the **Source File** in the mapping above.
2. Search (`Ctrl + F`) for the specific word you want to change.
3. Replace it with your new text (Remember **Rule #3** for apostrophes!).
4. Save the file.

---

## 🤳 I want to manage Socials & Events

> [!NOTE]
> **Instagram-First Strategy**: All event dates, locations, and RSVPs are managed via Instagram. The website is an informational "Program Guide." 
> *   Do not look for a calendar file.
> *   Do not add specific dates to the codebase.
> *   Direct all inquiries to [@Meridian.Society](https://www.instagram.com/Meridian.Society).

---

## 📜 Project Context: The Mission

**The Meridian Society** is a student-led speaker forum based in Ottawa, Ontario. 

Founded on the belief that curiosity is the primary driver of education, the Society serves as a bridge between the university campus and the professional world. We bring journalists, founders, scholars, and accomplished professionals directly to the room to share knowledge, challenge assumptions, and inspire the next generation of leaders.

The site is built as a premium, "Deep Ink" digital institution—reflecting the weight and seriousness of the discourse it hosts.

---
*For deep technical specs, see [TECHNICAL.md](TECHNICAL.md).*
