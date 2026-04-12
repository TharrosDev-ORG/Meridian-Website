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

## Adding an Event

Edit `js/events-data.js`:

```js
{
  id: "event-id",
  status: "Registration Open",
  title: "Event <em>Title</em>",
  desc: "Description text.",
  tags: ["Tag One", "Tag Two"],
  ctaText: "Register",
  ctaHref: "https://...",
  when: "Fall 2026",
  where: "Ottawa, Canada",
  format: "Speaker & Open Conversation",
  speaker: "To Be Announced",
  entry: "Registered Members",
  isCurrent: true
}
```

Only one event should have `isCurrent: true`. Run `npm run build` after editing.

---

## Deployment

Push to `main` — Vercel auto-deploys. Build command (`npm install && npm run build`) runs on Vercel before serving.

---

## Registration Link

The registration Google Form URL is set once in `js/site.js` as `REGISTER_URL`. All `[data-register]` links across every page pull from this constant — update it in one place.
