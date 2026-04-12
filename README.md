# The Meridian Society — Website

Public website for [The Meridian Society](https://meridiansociety.ca), a student-run speaker forum in Ottawa.

---

## Stack

- **HTML5** — one file per page, self-contained inline styles
- **CSS** — shared base (`base.css`, `nav.css`) + per-page `<style>` blocks; no frameworks
- **JavaScript** — vanilla JS with `var` only; shared logic in `site.js`, events data in `events-data.js`
- **Build** — `csso-cli` (CSS minification) + `terser` (JS minification) via `npm run build`
- **Hosting** — Vercel; build runs automatically on push to `main`

---

## Local Development

```bash
npm install
npm run build
```

Then open any `.html` file in a browser, or use a local server:

```bash
npx serve .
```

> HTML pages load `.min.css` and `.min.js` files. Always run `npm run build` after editing any source CSS or JS — the raw `.css`/`.js` source files are not loaded by the browser directly.

---

## Pages

| File | URL | Description |
|------|-----|-------------|
| `index.html` | `/` | Homepage |
| `events.html` | `/events` | Events listing |
| `team.html` | `/team` | Team profiles |
| `speak.html` | `/speak` | Speaker applications |
| `social.html` | `/social` | Social events |
| `membership.html` | `/membership` | Membership info and registration |
| `404.html` | — | Custom error page |

---

## Key Files

```
js/site.js          — Shared JS: nav, footer, mobile menu, scroll, reveal
js/events-data.js   — Event content (edit here to add/change events)
css/base.css        — Reset, design tokens, shared keyframes
css/nav.css         — Navbar and mobile drawer styles
```

**Nav, mobile drawer, and footer are injected at runtime** by `site.js` (`buildNav()`, `buildMobileMenu()`, `buildFooter()`). Do not hardcode them in HTML files — edit `site.js` instead.

---

## Adding a Speaker Event

Edit `js/events-data.js`. The events page renders whichever object has `isCurrent: true`.

```js
{
  id: "event-id",                          // unique slug
  status: "Registration Open",             // status badge text
  title: "Event <em>Title</em>",           // HTML allowed
  desc: "Description text.",               // HTML allowed
  tags: ["Speaker Event", "Ottawa"],
  ctaText: "Register",
  ctaHref: "https://...",                  // overridden sitewide by REGISTER_URL in site.js
  when: "Fall 2026",
  where: "Ottawa, Canada",                 // HTML allowed
  format: "Speaker & Open Conversation",   // HTML allowed
  speaker: "To Be Announced",
  entry: "Registered Members",             // HTML allowed
  isCurrent: true                          // only one event at a time
}
```

Run `npm run build` after editing.

---

## Adding a Social Event

Edit `js/social-data.js`. Events are automatically sorted into **Upcoming** and **Past** based on the `date` field.

```js
{
  id: "event-slug",               // unique slug
  title: "Bar Night",             // event name
  desc: "Short description.",     // HTML allowed
  date: "2026-09-15",             // YYYY-MM-DD — determines upcoming vs. past
  time: "9:00 PM",                // optional
  where: "Venue Name, Ottawa",    // HTML allowed
  type: "public",                 // "public" or "members"
  tags: ["Bar Night", "Ottawa"],
  cost: "Free",                   // optional
  capacity: "Limited",            // optional
  ctaText: "RSVP",                // optional — upcoming cards only
  ctaHref: "https://..."          // optional — upcoming cards only
}
```

Run `npm run build` after editing.

---

## Adding a Team Member

Team members are hardcoded in `team.html` as `<article class="member-card">` elements inside `.member-grid`. Copy an existing card and update the fields.

**1. Add the photo**

- Format: WebP, cropped to roughly ID-card proportions (96×120px display size)
- Target file size: under 10 KB
- Save to: `assets/images/team/<firstname>.webp`

**2. Add the card HTML** (inside `.member-grid` in `team.html`)

```html
<article class="member-card rv" id="firstname" aria-labelledby="name-firstname">
  <div class="member-body">
    <div class="member-header">
      <div class="member-photo-wrap">
        <img
          src="/assets/images/team/firstname.webp"
          class="member-photo"
          alt="Full Name, Role at The Meridian Society"
          loading="lazy"
          width="96"
          height="120"
        />
      </div>
      <div>
        <h3 class="member-name" id="name-firstname">Full Name</h3>
        <div class="member-role">Role Title</div>
      </div>
    </div>
    <p class="member-studies">Degree Program, University</p>
    <p class="member-bio">One or two sentences about this person.</p>
    <div class="member-social">
      <!-- LinkedIn -->
      <a href="https://linkedin.com/in/..." target="_blank" rel="noopener noreferrer" aria-label="Full Name on LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <!-- Instagram (if applicable) -->
      <a href="https://instagram.com/..." target="_blank" rel="noopener noreferrer" aria-label="Full Name on Instagram">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      </a>
    </div>
  </div>
</article>
```

If no photo is available yet, replace the `<img>` with:
```html
<div class="member-photo-placeholder" aria-hidden="true"></div>
```

No build step required — `team.html` is static HTML.

---

## Deployment

Push to `main` — Vercel auto-deploys. Build command (`npm install && npm run build`) runs on Vercel before serving.

---

## Registration Link

The registration Google Form URL is set once in `js/site.js` as `REGISTER_URL`. All `[data-register]` links across every page pull from this constant — update it in one place.
