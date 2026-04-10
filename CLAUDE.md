# Meridian Website

Static website for The Meridian Society — a student-run speaker forum serving Carleton University, uOttawa, and Algonquin College students in Ottawa, Canada.

Live site: `meridiansociety.ca`
GitHub remote: `https://github.com/meridiansociety/Meridian-Website.git`

---

## Stack

- HTML5, embedded CSS, vanilla JavaScript — no frameworks
- **Build step**: `npm run build` minifies CSS (csso) and JS (terser) → `.min.css` / `.min.js` files. HTML pages reference the minified versions.
- Deployed on Vercel; `vercel.json` runs `npm install && npm run build` before serving
- Google Fonts: **Cormorant Garamond** (serif), **Barlow Condensed** (sans-serif)
- Font loading: preload critical weights (`wght@300;400`) + deferred `media="print" onload="this.media='all'"` + `<noscript>` fallback

---

## File Structure

```
index.html            # Homepage — hero, globe, about, events teaser, membership, join strip
events.html           # Events listing — driven by js/events-data.js
team.html             # Team member profiles — Magnus Abdelnour, Colin Sherwood
404.html              # Custom error page
_headers              # Vercel HTTP headers (caching + security policy)
vercel.json           # Vercel build command config
package.json          # npm build scripts (csso-cli + terser)
.gitignore            # Excludes node_modules/ and .claude/
robots.txt            # SEO + AI crawler directives (do not modify AI blocks)
sitemap.xml           # XML sitemap
site.webmanifest      # PWA manifest
css/
  base.css            # Reset, :root tokens, body, arc-btn, keyframes — source
  nav.css             # Nav bar, hamburger, mobile drawer — source
  page.css            # Page header, layout utilities, footer — source
  base.min.css        # Minified — served by all pages
  nav.min.css         # Minified — served by all pages
  page.min.css        # Minified — served by events + team
js/
  site.js             # Shared JS — source (see JS Architecture below)
  events-data.js      # EVENTS array — source; edit here to add/change events
  site.min.js         # Minified — served by all pages
  events-data.min.js  # Minified — served by events.html
assets/
  images/
    og-image.png      # Open Graph image (1200×630)
    team/
      magnus.webp     # Magnus Abdelnour photo (96×120px display, ~3 KB)
      colin.webp      # Colin Sherwood photo (96×120px display, ~2.6 KB)
  favicons/           # Full favicon set (SVG, PNG 48/32/16, ICO, Apple touch)
```

> **Always edit source files** (`base.css`, `site.js`, etc.), then run `npm run build` to regenerate the `.min` files. Never edit `.min` files directly.
>
> **Caching**: `/assets/*` → `Cache-Control: public, max-age=31536000, immutable` (1 year).
> `/css/` and `/js/` are NOT under `/assets/`, so edits are immediately visible after deploy.
> Never move CSS/JS files into `/assets/` — they would be uncacheable without filename hashing.

---

## Design Tokens (`:root` in `css/base.css`)

```css
--black:        #F0EBE3      /* page background — warm cream (variable name is legacy) */
--dark:         #0d0d0d
--surface:      #111111      /* card / footer / explore-strip background */
--surface2:     #161616
--gold:         #d4af50      /* primary accent */
--gold-light:   #e8cc7a
--gold-pale:    #f0dfa0
--gold-dim:     rgba(212,175,80,0.15)
--gold-border:  rgba(212,175,80,0.38)   /* standard border */
--gold-border2: rgba(212,175,80,0.60)   /* stronger border */
--gold-bw:      1.5px                   /* gold border width token */
--cream:        #111111      /* primary text — dark (variable name is legacy) */
--cream-70:     rgba(17,17,17,0.90)
--cream-45:     rgba(17,17,17,0.82)     /* secondary text */
--cream-20:     rgba(17,17,17,0.70)     /* muted text */
--grey:         #2a2a2a
--grey2:        #1a1a1a
--serif:        'Cormorant Garamond', Georgia, serif
--sans:         'Barlow Condensed', 'Arial Narrow', Arial, sans-serif
```

> **Token naming note**: `--black` and `--cream` have inverted semantics from their names — `--black` is the light page background and `--cream` is the dark text colour. The nav re-scopes both back to dark-theme values (`--black: #080808`, `--cream: #f5f0e8`) so the nav bar always reads correctly against its dark background.

---

## CSS Architecture

### `css/base.css` — loaded by ALL pages
- `*, *::before, *::after` reset
- `:root` design tokens (listed above)
- `html` + `body` base styles
- `:focus-visible` gold outline
- `.skip-link` (accessibility, top:-100px → top:8px on focus)
- `.progress` — fixed 1px top scroll bar, gold gradient
- `.arc-btn`, `.arc-track`, `.arc-fill`, `.arc-inner`, `.arc-icon` — circular back-to-top button, bottom-right, hidden until `scrollY > 200`
- `@keyframes riseIn` — `translateY(16px) → 0`, used by page-header entrances
- `@keyframes shimmer` — gold sweep on page-header title (**do not re-declare in page `<style>` blocks**)
- `@keyframes livePulse` — event status dot pulse (**do not re-declare in page `<style>` blocks**)
- `@keyframes orbitRing` — globe orbit ring on index.html
- `prefers-reduced-motion` — disables all animation/transition globally
- Mobile base: tap highlight + touch-action

### `css/nav.css` — loaded by ALL pages
- `nav` — fixed, z-index 200, height 68px, dark glassmorphism background always active (`rgba(10,10,10,0.95)` + `blur(24px)`). Scopes `--cream`, `--cream-70`, `--cream-45`, `--cream-20`, `--black` back to dark-theme values so nav text is always legible against the dark bar regardless of page theme.
- `nav.scrolled` — darkens to `rgba(8,8,8,0.98)` + gold border + shadow; triggers at `scrollY > 40`
- `.nav-inner` — max-width 1440px, padding `0 52px`
- `.nav-logo` / `.nav-wordmark` — 3D tilt on hover (`perspective rotateX/Y`)
- `.nav-links a` — gold underline extends on hover/active; `.nav-active` = gold text
- `.nav-cta` — gold border button with slide-fill hover; `[data-register]` href set by site.js
- `.hamburger` — 2-bar, hidden on desktop; open state rotates to X
- `.mob-backdrop` — full-screen blur overlay, z-index 190
- `.mob-drawer` — 280px right drawer, z-index 191, translateX(100%) → 0
- `.mob-wordmark`, `.mob-links`, `.mob-arrow`, `.mob-bottom`, `.mob-meta`, `.mob-cta`
- Mobile breakpoint (≤700px): hide `.nav-links`/`.nav-cta`, show `.hamburger`

### `css/page.css` — loaded by events.html + team.html ONLY
- `.wrap` — `max-width: 1440px; padding: 0 52px`
- `section` — `padding: 80px 0`
- `.sec-head` / `.sec-tag` / `.sec-rule` / `.sec-num` — section header row (tag + gold rule + number)
- `.rv` / `.rv.on` — scroll reveal: `translateY(20px) opacity:0` → `0 opacity:1`, 0.6s ease
- **Page header**: `.page-header`, `.page-header-vignette`, `.page-header-rail`, `.page-header-content`, `.page-header-eyebrow`, `.page-header-eyebrow-line`, `.page-header-eyebrow-text`, `.page-header-pre`, `.page-header-title`, `.page-header-sub`, `.page-header-div`, `.page-header-ctas`
- `.page-header-corners` — four gold corner ornaments (absolute-positioned `<span>` elements, L-shaped gold borders at each corner of the page header)
- `.ph-cta-primary` — gold filled button (slide-reveal `gold-pale` on hover + 3D lift)
- `.ph-cta-ghost` — transparent text link with animated arrow
- `.page-header-ig-link` — gold inline link for Instagram references
- **Explore strip**: `.explore-strip`, `.explore-strip-inner`, `.explore-strip-left`, `.explore-strip-diamond`, `.explore-strip-label`, `.explore-strip-rule`, `.explore-strip-link`
- **Footer**: `footer`, `.footer-top`, `.footer-coords`, `.footer-coords-dot`, `.footer-cta-row`, `.footer-cta-main`, `.footer-cta-ig`, `.footer-grid` (2fr 1fr 1fr 1fr), `.footer-brand-name`, `.footer-brand-desc`, `.footer-col-head`, `.footer-links`, `.footer-bottom`, `.footer-copy`, `.footer-meta`
- Responsive 1100px: padding drops to 32px, footer grid collapses to 1 col, rail hides
- Responsive 700px: padding drops to 20px, full mobile adjustments for header + footer + arc-btn

### Page-specific `<style>` blocks
Each HTML file embeds a `<style>` block for its own components only. Each of `events.html` and `team.html` also includes a `@media (prefers-reduced-motion: reduce)` block targeting `.rv` and `.page-header-*` elements.

**index.html** (does NOT use page.css):
- `.sticky-join` — sticky register CTA bar that appears between hero and #register section
- Hero section: `.hero`, `.hero-eyebrow`, `.hero-pre` (italic serif "The" above title), `.hero-title`, `.hero-sub`, `.hero-ctas`, `.hero-scroll`
- `.marquee`, `.marquee-track`, `.marquee-item`, `.mgem` — horizontal ticker scroll. **CSS lives in `base.css`. Content (`MARQUEE_TEXT`) is set by `site.js` — edit there to update the ticker on all pages at once.**
- `.wrap` — `padding: 48px 52px` *(differs from page.css's `0 52px`)*
- `.rv` — `translateY(10px)` 0.3s *(differs from page.css's `translateY(20px)` 0.6s)*
- `.sec-head` — `margin-bottom: 36px` *(differs from page.css's `60px`)*
- About, who, event teaser, "not", speaking, membership, join-strip sections
- Index footer (big wordmark design): `.footer-hero`, `.footer-wordmark-wrap`, `.footer-big-name`, `.footer-eyebrow` — entirely different from page.css footer

**events.html** (uses base + nav + page.css):
- `.marquee`, `.marquee-track`, `.marquee-item`, `.mgem` — ticker bar below page header. CSS in `base.css`; content populated by `site.js` (`MARQUEE_TEXT`)
- Event card: `.event-card`, `.event-card-main`, `.event-card-top`, `.event-status`, `.event-status-dot`, `.event-status-text`, `.event-card-title`, `.event-card-desc`, `.event-card-bottom`, `.event-card-tags`, `.event-tag`, `.event-card-cta`
- Event panel: `.event-card-panel`, `.event-panel-row`, `.event-panel-label`, `.event-panel-value`, `.event-panel-divider`, `.event-panel-entry`, `.event-panel-value--gold`
- Empty state: `.event-empty-state`, `.event-empty-icon`, `.event-empty-title`, `.event-empty-body`, `.event-empty-cta`
- Responsive (event card only): card stacks vertically at 1100px; adjustments at 700px

**team.html** (uses base + nav + page.css):
- `.marquee`, `.marquee-track`, `.marquee-item`, `.mgem` — ticker bar below page header. CSS in `base.css`; content populated by `site.js` (`MARQUEE_TEXT`)
- Member grid: `.member-grid` (3-col → 2-col at 1100px → 1-col at 700px)
- Member card: `.member-card`, `.member-card::before` (gold top accent), `.member-photo-wrap`, `.member-photo`, `.member-photo-placeholder`
- Card body: `.member-body`, `.member-header`, `.member-name`, `.member-role`, `.member-studies`, `.member-bio`, `.member-social`
- Placeholder: `.member-card--placeholder`, `.placeholder-icon`, `.placeholder-text`, `.placeholder-sub`

---

## JS Architecture

### `js/site.js` — loaded by ALL pages
All using `var` (not `const/let`) for broadest compatibility. Execution order:

0. **`buildMobileMenu()` IIFE** — runs immediately on script load, before any `getElementById` calls. Injects the mobile drawer HTML (`#menuBackdrop` + `#mobileMenu`) into `document.body` based on `window.location.pathname`. Per-page differences: index uses `#about`/`#speaking` etc. (no slash); team uses `/team.html` as the 5th link; others use `/#about` etc. Also re-populates `data-register` hrefs and binds click-to-close listeners on the injected links. **Do not add mobile drawer HTML to the HTML files** — it is always injected here.

1. **Register URL** — `var REGISTER_URL = 'https://docs.google.com/forms/...'`; sets `href` on all `a[data-register]` elements. To change the registration link, update this one constant.

1b. **Marquee text** — `var MARQUEE_TEXT`; populates all `.marquee-track` elements on every page. Edit here to update the ticker sitewide.

2. **Named constants** — scroll/swipe/reveal thresholds:
   - `SCROLL_NAV_THRESHOLD = 40` — nav gets `.scrolled` class
   - `SCROLL_ARC_THRESHOLD = 200` — arc back-to-top button appears
   - `ARC_RADIUS = 22` — SVG circle radius
   - `SWIPE_CLOSE_THRESHOLD = 72` — swipe distance to close mobile drawer
   - `REVEAL_ROOT_MARGIN = '0px 0px -40px 0px'` — IntersectionObserver margin

3. **Scroll handler** — RAF-batched single scroll listener. Drives:
   - `nav.scrolled` class at `scrollY > SCROLL_NAV_THRESHOLD`
   - `.progress` bar width
   - `#arcFill` stroke-dashoffset (scroll progress ring)
   - `.arc-btn.visible` at `scrollY > SCROLL_ARC_THRESHOLD`
   - `#stickyJoin.visible` (null-checked — only activates on index.html where element exists)

4. **Scroll reveal** — `IntersectionObserver` on all `.rv` elements; adds `.on` class once, then unobserves. Threshold: 0.01, rootMargin: `REVEAL_ROOT_MARGIN`.

5. **Mobile menu** — `openMenu()` / `closeMenu()`. Manages `.open` classes on `#mobileMenu`, `#menuBackdrop`, `#burgerBtn`. No inline `onclick` handlers — click-to-close is bound by `buildMobileMenu()`.

6. **Pull-to-dismiss** — touchstart/touchmove/touchend/touchcancel on `#mobileMenu`. Visual drag feedback during swipe; swipe > `SWIPE_CLOSE_THRESHOLD` triggers `closeMenu()`.

### `js/events-data.js` — loaded by events.html + index.html
```js
const EVENTS = [
  {
    id: "fall-2026-inaugural",
    status: "Registration Open",     // shown in status badge
    title: "Our <em>First Event</em><br />is Coming.",  // HTML allowed
    desc: "...",                      // HTML allowed
    tags: ["Speaker Event", "Open Conversation", "Ottawa"],
    ctaText: "Register for Updates",
    ctaHref: "https://...",          // direct href (also overridden by REGISTER_URL via data-register)
    when: "Fall 2026",
    where: "Ottawa,<br />Canada",    // HTML allowed
    format: "Speaker &amp;<br />Open Conversation",
    speaker: "To Be Announced",
    entry: "Must Be A<br />Registered Member",
    isCurrent: true                  // only one event should have isCurrent: true
  }
];
```
The events.html render script uses `EVENTS.find(e => e.isCurrent)`. If none found, shows empty state.

### Inline `<script>` blocks (page-specific only)

**index.html** inline script contains:
1. Active nav link detection (compares `location.pathname`)
2. "Who" section accordion (expand/collapse blocks) — `.who-row` elements have `role="button"`, `tabindex="0"`, `aria-expanded`, and `aria-label` describing the category
3. Member count fetch from Google Apps Script endpoint — on error, shows `—` (em dash) and logs a warning
4. Three.js globe initialization (`#globeCanvas`) — loaded **conditionally** via an inline script: only on viewports ≥ 1024px with `deviceMemory ≥ 2` (or undefined). `initGlobe()` is called via `s.onload` after dynamic injection.

**events.html** inline script contains:
- Event card DOM builder (creates card or empty-state from `EVENTS` data; runs after `events-data.js`). Uses `var` throughout.

**team.html**: No inline script — entirely handled by `site.js`.

---

## HTML Shared Patterns

Every page uses the same nav and arc button in HTML. The mobile drawer is **not** in the HTML — it is injected at runtime by `buildMobileMenu()` in `site.js`.

```html
<!-- Nav -->
<nav id="mainNav" role="navigation" aria-label="Main navigation">
  <div class="nav-inner">
    <a href="/" class="nav-logo"><span class="nav-wordmark">The Meridian Society</span></a>
    <ul class="nav-links">...</ul>
    <a href="#" class="nav-cta" data-register><span>Register</span></a>
    <button class="hamburger" id="burgerBtn" aria-label="..." aria-expanded="false"
            aria-controls="mobileMenu">
      <span></span><span></span>
    </button>
  </div>
</nav>

<!-- Arc button -->
<button class="arc-btn" id="arcBtn" aria-label="Back to top">
  <svg viewBox="0 0 52 52">
    <circle class="arc-track" cx="26" cy="26" r="22"/>
    <circle class="arc-fill" id="arcFill" cx="26" cy="26" r="22"/>
  </svg>
  <div class="arc-inner"><span class="arc-icon">↑</span></div>
</button>

<!-- Mobile drawer is injected by buildMobileMenu() in site.js — do NOT add it here -->
```

Registration links use `data-register` attribute — `site.js` sets `href` from `REGISTER_URL` on load. Use `href="#"` as placeholder. A `<noscript>` fallback `<p class="noscript-register-note">` with the direct Google Form link is placed after the first `data-register` link on each page.

```html
<a href="#" data-register class="nav-cta"><span>Register</span></a>
```

---

## SEO Pattern

Every page has:
- `<title>` + `<meta name="description">` + `<meta name="keywords">`
- Geo meta tags (region: `CA-ON`, placename: `Ottawa`, coords: `45.4215;-75.6972`)
- `<link rel="canonical">` + hreflang (`en-CA` + `x-default`)
- Open Graph tags (`og:type`, `og:url`, `og:title`, `og:description`, `og:image`)
- Twitter Card tags
- JSON-LD structured data (WebPage/AboutPage + BreadcrumbList + Organization + page-specific types)
- Favicon set (SVG, 48/32/16px PNG, ICO, Apple touch icon)

Update `<meta name="keywords">`, JSON-LD `dateModified`, and all title/description fields when changing page content.

---

## Events — How to Edit

Edit `js/events-data.js`. The render script in events.html reads this file automatically.

- Only one event object should have `isCurrent: true` at a time
- `title`, `desc`, `where`, `format`, `entry` fields support inline HTML
- The `ctaHref` on the event object is set as the `href`, but `site.js` also overrides it via `[data-register]` — so the CTA will always point to `REGISTER_URL`
- To show an upcoming event as "coming soon", add it with `isCurrent: false` (it won't render yet)

After editing, run `npm run build` to regenerate `js/events-data.min.js`.

---

## Team Photos

- Format: WebP, ID-card proportions (96×120px display, can be larger source)
- Target size: < 10 KB per image (current: magnus.webp ~3 KB, colin.webp ~2.6 KB)
- Location: `assets/images/team/<name>.webp`
- Referenced in `team.html` `<img src="/assets/images/team/...">` and JSON-LD

---

## Deployment

Push to `main` → Vercel auto-deploys. `vercel.json` runs `npm install && npm run build` first, generating the `.min` files that the HTML pages reference.

The `_headers` file sets:
- `/assets/*` → 1-year immutable cache
- `/css/*.min.css` and `/js/*.min.js` → 24-hour browser cache, 1-year CDN cache
- Security headers (CSP, X-Frame-Options, etc.) — **do not modify without explicit instruction**
- CSP `script-src` does **not** include `'unsafe-inline'` — no inline event handlers allowed

Current CSP `connect-src` allows: `self`, `script.google.com`, `script.googleusercontent.com` (member count API), `cdn.jsdelivr.net` (globe TopoJSON), `vitals.vercel-insights.com` (Vercel Analytics).

---

## What to Avoid

- **No new CSS files** beyond the existing three. Page-specific styles go in each HTML file's `<style>` block.
- **Do not move CSS/JS into `/assets/`** — they will be cached immutably and edits will be invisible.
- **Do not modify `robots.txt` AI-crawler blocks** or `_headers` security policy without explicit instruction.
- **Do not add `const`/`let` to `site.js`** — it uses `var` intentionally for compatibility. `events-data.js` may use `const` since it is not inline.
- **Do not hardcode the registration URL** in HTML — use `href="#" data-register` on links; `site.js` fills the href from `REGISTER_URL`. Exception: the `<noscript>` fallback `<a>` inside `.noscript-register-note` paragraphs.
- **Do not add mobile drawer HTML to the HTML files** — it is injected by `buildMobileMenu()` in `site.js`.
- **Do not add inline `onclick` handlers** — CSP blocks them. Use event listeners in `site.js`.
- **Do not re-declare `@keyframes shimmer` or `@keyframes livePulse`** in page `<style>` blocks — they are defined in `base.css`.
- **Do not duplicate CSS** across pages — if a style is needed on all pages, it goes in `base.css` or `nav.css`; if needed on events + team only, it goes in `page.css`; otherwise it's page-specific.
- **Always run `npm run build`** after editing any source CSS or JS file so the `.min` files stay in sync.
