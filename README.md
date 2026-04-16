# The Meridian Society — Operations Manual

Welcome to the administration manual for [The Meridian Society](https://meridiansociety.ca). This guide is designed for non-technical administrators to manage members, update team profiles, and edit site content without needing to write code.

---

## 🗺️ Visual-to-File Map

Use this table to find exactly which file you need to open to edit a specific page on the website.

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

All member registrations are stored in **Supabase**. You can view, add, or remove members directly through the dashboard.

1.  **Login**: Access your project at [database.new](https://database.new) (Supabase Dashboard).
2.  **Table Editor**: Select the `members` table from the left sidebar.
3.  **To Add a Member**: Click **Insert Row** and fill in the details. The "Join Date" is automatically created.
4.  **To Remove a Member**: Right-click the row and select **Delete Row**.
5.  **Live Counter**: Any changes you make here will automatically update the "Live Member Count" in the website footer within seconds.

---

## ✍️ Editing Site Text (Find & Replace)

To change text on a page, follow these simple steps:

1.  Open the **Source File** from the map above.
2.  Press `Ctrl + F` (Windows) or `Cmd + F` (Mac) to search for the specific sentence you want to change.
3.  Type your new text inside the existing tags (e.g., `<p>Your New Text Here</p>`).
4.  **Save the file**. The website will update automatically if you are connected to the deployment pipeline (Vercel).

> [!WARNING]
> **Don't touch the tags!** Avoid deleting characters like `< > / { } [ ]`. These are the "bones" of the site; only edit the text between them.

---

## 🎖️ Adding a Team Member

Adding a new person to the [/team](https://meridiansociety.ca/team) page requires three steps:

### 1. Upload the Photo
Save a portrait photo in the `public/assets/images/team/` folder. 
- **Format**: `.webp` is preferred.
- **Dimensions**: Vertical (portrait) orientation.
- **Size**: Keep it under 20KB for fast loading.

### 2. Add the Search Info (JSON-LD)
Open `app/(site)/team/page.tsx` and find the `<script type="application/ld+json">` section. Copy and paste an existing block and update the name, title, and bio.

### 3. Add the Display Card
Find the `<div className="member-grid">` section. Copy an existing `<article className="member-card">` block and paste it below. Update the:
- `Image src` (the filename of the photo you uploaded)
- `h3.member-name`
- `div.member-role`
- `p.member-studies`
- `p.member-bio`

---

## 📸 Social Media & Events

> [!IMPORTANT]
> **Events are posted on Instagram.** We do not announce specific event dates or speaker names directly on the website codebase. All live updates markers should direct users to [@Meridian.Society](https://www.instagram.com/Meridian.Society).

The `/events` and `/social` pages on the website serve as **program descriptions** (explaining *what* we do), rather than a calendar.

---

## 🛠️ Troubleshooting

| Issue | Likely Cause | Solution |
| :--- | :--- | :--- |
| **Text looks "glitchy"** | Unescaped character | If you used an apostrophe (`'`), replace it with `&apos;` in the code. |
| **Photo won't load** | Wrong file path | Ensure the file name in the code matches the photo in `/public/assets/images/team/` exactly (case-sensitive). |
| **Site didn't update** | Deployment failed | Ensure you "Pushed" your changes to GitHub. Check the Vercel dashboard for red error messages. |
| **Counter stuck at 0** | Supabase connection | Verify that your `site_stats` table in Supabase hasn't been modified or deleted. |

---

## 🔒 Security & Performance

- **Typography**: Preferred body size is 19px. Never use pure black (`#000`); use `--ink` (`#18150F`).
- **Media**: Always use WebP for images.
- **Deployment**: Any save + push to the `main` branch trigger a live update within ~60 seconds.

---
*For deep technical specifications, see [TECHNICAL.md](TECHNICAL.md).*
