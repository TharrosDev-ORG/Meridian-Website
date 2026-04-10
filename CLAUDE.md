# Meridian Website

Static website for The Meridian Society â€” a student-run speaker forum serving Carleton University, uOttawa, and Algonquin College students in Ottawa, Canada.

Live site: `meridiansociety.ca`
GitHub remote: `https://github.com/meridiansociety/Meridian-Website.git`

---

## Stack

- HTML5, embedded CSS, vanilla JavaScript â€” no frameworks
- **Build step**: `npm run build` minifies CSS (csso) and JS (terser) â†’ `.min.css` / `.min.js` files. HTML pages reference the minified versions.
- Deployed on Vercel; `vercel.json` runs `npm install && npm run build` before serving
- Google Fonts: **Cormorant Garamond** (serif), **Barlow Condensed** (sans-serif)
- Font loading: preload critical weights (`wght@300;400`) + deferred `media="print" onload="this.media='all'"` + `<noscript>` fallback

---

## File Structure

```
index.html            # Homepage â€” hero, globe, about, events teaser, membership, join strip
events.html           # Events listing â€” driven by js/events-data.js
team.html             # Team member profiles â€” Magnus Abdelnour, Colin Sherwood
404.html              # Custom error page
_headers              # Vercel HTTP headers (caching + security policy)
vercel.json           # Vercel build command config
package.json          # npm build scripts (csso-cli + terser)
.gitignore            # Excludes node_modules/ and .claude/
robots.txt            # SEO + AI crawler directives (do not modify AI blocks)
sitemap.xml           # XML sitemap
site.webmanifest      # PWA manifest
css/
  base.css            # Reset, :root tokens (legacy dark theme), body, arc-btn, keyframes â€” source
  nav.css             # Nav bar, hamburger, mobile drawer â€” source
  page.css            # LEGACY â€” page header, explore-strip, dark footer (no longer loaded by events/team)
  base.min.css        # Minified â€” served by all pages
  nav.min.css         # Minified â€” served by all pages
  page.min.css        # Minified â€” LEGACY, only served by 404.html if applicable
js/
  site.js             # Shared JS â€” source (see JS Architecture below)
  events-data.js      # EVENTS array â€” source; edit here to add/change events
  site.min.js         # Minified â€” served by all pages
  events-data.min.js  # Minified â€” served by events.html
assets/
  images/
    og-image.png      # Open Graph image (1200Ã—630)
    team/
      magnus.webp     # Magnus Abdelnour photo (96Ã—120px display, ~3 KB)
      colin.webp      # Colin Sherwood photo (96Ã—120px display, ~2.6 KB)
  favicons/           # Full favicon set (SVG, PNG 48/32/16, ICO, Apple touch)
```

> **Always edit source files** (`base.css`, `site.js`, etc.), then run `npm run build` to regenerate the `.min` files. Never edit `.min` files directly.
>
> **Caching**: `/assets/*` â†’ `Cache-Control: public, max-age=31536000, immutable` (1 year).
> `/css/` and `/js/` are NOT under `/assets/`, so edits are immediately visible after deploy.
> Never move CSS/JS files into `/assets/` â€” they would be uncacheable without filename hashing.

---

## Design Tokens

The site uses **two token systems**: a legacy set in `css/base.css` (with confusing inverted names) and a **new cream/ink palette** used by `index.html`, `events.html`, and `team.html` in their inline `<style>` blocks. The new palette is the source of truth for all active pages.

### New cream/ink palette (inline `:root` in index.html, events.html, team.html)

```css
--cream:       #F4EDE3        /* page background */
--cream-mid:   #EBE2D4        /* secondary surface (e.g. arc button bg) */
--cream-deep:  #DDD0BC        /* section backgrounds (events-sec, team-sec, footer) */
--ink:         #18150F        /* primary text */
--ink-90:      rgba(24,21,15,0.90)   /* near-primary text */
--ink-75:      rgba(24,21,15,0.75)   /* secondary text */
--ink-55:      rgba(24,21,15,0.55)   /* muted text, labels */
--ink-30:      rgba(24,21,15,0.30)   /* subtle borders, footer copy */
--ink-15:      rgba(24,21,15,0.15)   /* card borders, dividers */
--ink-08:      rgba(24,21,15,0.08)   /* meta row borders, faint separators */
--gold:        #B8932A        /* primary accent */
--gold-lt:     #D4AF50        /* lighter gold accent */
--serif:       'Cormorant Garamond', Georgia, serif
--sans:        'Barlow Condensed', 'Arial Narrow', Arial, sans-serif
--grain:       url("data:...")  /* SVG noise texture for hero overlays */
```

### Nav cream theme override (inline in events.html + team.html)

Since `nav.css` defaults to a dark bar, subpages re-scope nav variables to cream:
```css
#mainNav {
  --cream: #18150F; --cream-70: rgba(24,21,15,0.90);
  --cream-45: rgba(24,21,15,0.75); --cream-20: rgba(24,21,15,0.55);
  --black: #F4EDE3; --gold: #B8932A;
  background: rgba(244,237,227,0.92) !important;
  backdrop-filter: blur(16px) !important;
}
```

### Legacy tokens in `css/base.css` (still loaded but overridden)

The legacy tokens (`--black: #F0EBE3`, `--cream: #111111`, `--surface`, `--gold-border`, etc.) remain in `base.css` for any shared component that references them (arc button base styles, progress bar). They are overridden by the inline `:root` in each page's `<style>` block.

---

## CSS Architecture

### `css/base.css` â€” loaded by ALL pages
- `*, *::before, *::after` reset
- `:root` design tokens (listed above)
- `html` + `body` base styles
- `:focus-visible` gold outline
- `.skip-link` (accessibility, top:-100px â†’ top:8px on focus)
- `.progress` â€” fixed 1px top scroll bar, gold gradient
- `.arc-btn`, `.arc-track`, `.arc-fill`, `.arc-inner`, `.arc-icon` â€” circular back-to-top button, bottom-right, hidden until `scrollY > 200`
- `@keyframes riseIn` â€” `translateY(16px) â†’ 0`, used by page-header entrances
- `@keyframes shimmer` â€” gold sweep on page-header title (**do not re-declare in page `<style>` blocks**)
- `@keyframes livePulse` â€” event status dot pulse (**do not re-declare in page `<style>` blocks**)
- `@keyframes orbitRing` â€” globe orbit ring on index.html
- `prefers-reduced-motion` â€” disables all animation/transition globally
- Mobile base: tap highlight + touch-action

### `css/nav.css` â€” loaded by ALL pages
- `nav` â€” fixed, z-index 200, height 68px, dark glassmorphism background always active (`rgba(10,10,10,0.95)` + `blur(24px)`). Scopes `--cream`, `--cream-70`, `--cream-45`, `--cream-20`, `--black` back to dark-theme values so nav text is always legible against the dark bar regardless of page theme.
- `nav.scrolled` â€” darkens to `rgba(8,8,8,0.98)` + gold border + shadow; triggers at `scrollY > 40`
- `.nav-inner` â€” max-width 1440px, padding `0 52px`
- `.nav-logo` / `.nav-wordmark` â€” 3D tilt on hover (`perspective rotateX/Y`)
- `.nav-links a` â€” gold underline extends on hover/active; `.nav-active` = gold text
- `.nav-cta` â€” gold border button with slide-fill hover; `[data-register]` href set by site.js
- `.hamburger` â€” 2-bar, hidden on desktop; open state rotates to X
- `.mob-backdrop` â€” full-screen blur overlay, z-index 190
- `.mob-drawer` â€” 280px right drawer, z-index 191, translateX(100%) â†’ 0
- `.mob-wordmark`, `.mob-links`, `.mob-arrow`, `.mob-bottom`, `.mob-meta`, `.mob-cta`
- Mobile breakpoint (â‰¤700px): hide `.nav-links`/`.nav-cta`, show `.hamburger`

### `css/page.css` â€” LEGACY, no longer loaded by events.html or team.html
Contains the old dark-theme page header (`.page-header`), explore strip, and footer. Kept for reference only. All active subpages now use inline `<style>` blocks with the cream/ink palette.

### Page-specific `<style>` blocks
Each HTML file embeds a `<style>` block containing the full cream/ink `:root` palette, body override, nav cream override, page-specific components, shared utils (`.wrap`, `.sec-label`, `.text-link`, `.rv`), marquee, footer, responsive breakpoints, reduced-motion, and print media queries. Each page is self-contained â€” no dependency on `page.css`.

**index.html** (base + nav only):
- Full cream/ink `:root` palette (source of truth for all pages)
- `.sticky-join` â€” sticky register CTA bar
- Hero section: `.hero` (94vh), `.hero-eyebrow`, `.hero-pre`, `.hero-title`, `.hero-sub`, `.hero-hr`, `.hero-actions`, `.hero-stats`, `.hero-ig-btn`, ghost M letter
- `.btn-primary` â€” ink bg button with gold slide-reveal on hover
- `.btn-ghost-link` â€” italic serif link with arrow
- `.marquee-wrap`, `.m-item`, `.m-gem` â€” dark ticker bar below hero. Content from `site.js` (`MARQUEE_TEXT`)
- `.wrap` â€” `max-width: 1280px; padding: 0 64px`
- `.rv` â€” scroll reveal with `data-d` delay attributes
- `.sec-label` â€” section label with trailing rule
- `.text-link` â€” uppercase link with underline
- About, who, event teaser, "not", speaking, membership, join-strip sections
- **Event card** (shared with events.html): `.event-card`, `.event-main`, `.event-status`, `.event-dot`, `.event-title`, `.event-desc`, `.event-tags`/`.event-tag`, `.event-meta`, `.event-meta-row`, `.meta-lbl`, `.meta-val`
- Events section: `.events` (cream-deep bg, corner ornaments), `.events-header`, `.events-title`
- Index footer (big MERIDIAN watermark): `.footer-inner`, `.footer-wordmark`, `.footer-tagline`, `.footer-note`, `.footer-links`, `.footer-col`, `.footer-col-title`, `.footer-bottom`, `.footer-copy`

**events.html** (base + nav only):
- Full cream/ink `:root` palette (matches index.html)
- Nav cream override, body override, arc button cream override
- `.page-hero` â€” subpage hero (60vh, cream bg, radial gradients, grain overlay). Contains `.hero-eyebrow`, `.hero-pre`, `.hero-title`, `.hero-hr`, `.hero-sub`, `.hero-actions`
- `.btn-primary`, `.btn-ghost-link` â€” same as index.html
- `.marquee-wrap`, `.m-item`, `.m-gem` â€” dark ticker bar (static `data-static="true"`)
- `.events-sec` â€” events section (cream-deep bg, corner ornaments via ::before/::after), `.events-header`, `.events-title`
- **Event card** (identical to index.html): `.event-card`, `.event-main`, `.event-status`, `.event-dot`, `.event-title`, `.event-desc`, `.event-tags`/`.event-tag`, `.event-meta`, `.event-meta-row`, `.meta-lbl`, `.meta-val`
- Empty state: `.event-empty-state`, `.event-empty-icon`, `.event-empty-title`, `.event-empty-body`, `.event-empty-cta`
- Shared utils, footer, responsive (1100px/700px), reduced-motion, print

**team.html** (base + nav only):
- Full cream/ink `:root` palette (matches index.html)
- Nav cream override, body override, arc button cream override
- `.page-hero` â€” same subpage hero as events.html
- `.btn-ghost-link` â€” same as index.html
- `.marquee-wrap`, `.m-item`, `.m-gem` â€” dark ticker bar (static)
- `.team-sec` â€” team section (cream-deep bg, corner ornaments), `.team-header`, `.team-title`
- Member grid: `.member-grid` (3-col â†’ 2-col â†’ 1-col)
- Member card (cream theme): `.member-card` (cream bg, ink-15 border, box-shadow, hover lift), `.member-photo-wrap`, `.member-photo`, `.member-body`, `.member-header`, `.member-name` (ink color), `.member-role` (gold), `.member-studies` (ink-55, ink-15 left border), `.member-bio` (ink-75), `.member-social` (ink-15 borders, ink hover)
- Placeholder: `.member-card--placeholder` (dashed ink-15 border), `.placeholder-icon`, `.placeholder-text`, `.placeholder-sub`
- Shared utils, footer, responsive (1100px/700px), reduced-motion, print

---

## JS Architecture

### `js/site.js` â€” loaded by ALL pages
All using `var` (not `const/let`) for broadest compatibility. Execution order:

0. **`buildMobileMenu()` IIFE** â€” runs immediately on script load, before any `getElementById` calls. Injects the mobile drawer HTML (`#menuBackdrop` + `#mobileMenu`) into `document.body` based on `window.location.pathname`. Per-page differences: index uses `#about`/`#speaking` etc. (no slash); team uses `/team.html` as the 5th link; others use `/#about` etc. Also re-populates `data-register` hrefs and binds click-to-close listeners on the injected links. **Do not add mobile drawer HTML to the HTML files** â€” it is always injected here.

1. **Register URL** â€” `var REGISTER_URL = 'https://docs.google.com/forms/...'`; sets `href` on all `a[data-register]` elements. To change the registration link, update this one constant.

1b. **Marquee text** â€” `var MARQUEE_TEXT`; populates all `.marquee-track` elements on every page. Edit here to update the ticker sitewide.

2. **Named constants** â€” scroll/swipe/reveal thresholds:
   - `SCROLL_NAV_THRESHOLD = 40` â€” nav gets `.scrolled` class
   - `SCROLL_ARC_THRESHOLD = 200` â€” arc back-to-top button appears
   - `ARC_RADIUS = 22` â€” SVG circle radius
   - `SWIPE_CLOSE_THRESHOLD = 72` â€” swipe distance to close mobile drawer
   - `REVEAL_ROOT_MARGIN = '0px 0px -40px 0px'` â€” IntersectionObserver margin

3. **Scroll handler** â€” RAF-batched single scroll listener. Drives:
   - `nav.scrolled` class at `scrollY > SCROLL_NAV_THRESHOLD`
   - `.progress` bar width
   - `#arcFill` stroke-dashoffset (scroll progress ring)
   - `.arc-btn.visible` at `scrollY > SCROLL_ARC_THRESHOLD`
   - `#stickyJoin.visible` (null-checked â€” only activates on index.html where element exists)

4. **Scroll reveal** â€” `IntersectionObserver` on all `.rv` elements; adds `.on` class once, then unobserves. Threshold: 0.01, rootMargin: `REVEAL_ROOT_MARGIN`.

5. **Mobile menu** â€” `openMenu()` / `closeMenu()`. Manages `.open` classes on `#mobileMenu`, `#menuBackdrop`, `#burgerBtn`. No inline `onclick` handlers â€” click-to-close is bound by `buildMobileMenu()`.

6. **Pull-to-dismiss** â€” touchstart/touchmove/touchend/touchcancel on `#mobileMenu`. Visual drag feedback during swipe; swipe > `SWIPE_CLOSE_THRESHOLD` triggers `closeMenu()`.

### `js/events-data.js` â€” loaded by events.html + index.html
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
2. "Who" section accordion (expand/collapse blocks) â€” `.who-row` elements have `role="button"`, `tabindex="0"`, `aria-expanded`, and `aria-label` describing the category
3. Member count fetch from Google Apps Script endpoint â€” on error, shows `â€”` (em dash) and logs a warning
4. Three.js globe initialization (`#globeCanvas`) â€” loaded **conditionally** via an inline script: only on viewports â‰¥ 1024px with `deviceMemory â‰¥ 2` (or undefined). `initGlobe()` is called via `s.onload` after dynamic injection.

**events.html** inline script contains:
- Event card DOM builder (creates card or empty-state from `EVENTS` data; runs after `events-data.js`). Uses `var` throughout. Builds the same card structure as index.html: `.event-card` > `.event-main` (`.event-status`/`.event-dot`, `.event-title`, `.event-desc`, `.event-tags`) + `.event-meta` (`.event-meta-row` > `.meta-lbl` + `.meta-val`).

**team.html**: No inline script â€” entirely handled by `site.js`.

---

## HTML Shared Patterns

Every page uses the same nav and arc button in HTML. The mobile drawer is **not** in the HTML â€” it is injected at runtime by `buildMobileMenu()` in `site.js`.

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
  <div class="arc-inner"><span class="arc-icon">â†‘</span></div>
</button>

<!-- Mobile drawer is injected by buildMobileMenu() in site.js â€” do NOT add it here -->
```

### Subpage hero (events.html + team.html)

```html
<section class="page-hero" aria-label="...">
  <div class="page-hero-content">
    <div class="hero-eyebrow">
      <span class="hero-eyebrow-rule"></span>
      <span class="hero-eyebrow-text">The Meridian Society</span>
      <span class="hero-eyebrow-rule"></span>
    </div>
    <p class="hero-pre">Student Speaker Forum</p>
    <h1 class="hero-title">Page Title.</h1>
    <div class="hero-hr" aria-hidden="true"></div>
    <p class="hero-sub">Subtitle text.</p>
    <div class="hero-actions"><!-- btn-primary / btn-ghost-link --></div>
  </div>
</section>
```

### Shared event card (index.html hardcoded, events.html JS-rendered)

```html
<div class="event-card rv" data-d="1">
  <div class="event-main">
    <div class="event-status"><span class="event-dot" aria-hidden="true"></span> Status Text</div>
    <h3 class="event-title">Title with <em>italic</em></h3>
    <p class="event-desc">Description text.</p>
    <div class="event-tags"><span class="event-tag">Tag</span></div>
  </div>
  <div class="event-meta" aria-label="Event details">
    <div class="event-meta-row"><div class="meta-lbl">Label</div><div class="meta-val">Value</div></div>
  </div>
</div>
```

### Section wrapper pattern (events-sec, team-sec)

Sections with `.events-sec` or `.team-sec` use `cream-deep` background with corner ornaments (::before top-right, ::after bottom-left). Content wrapped in `.wrap`. Header is `.events-header`/`.team-header` with title + `.text-link`.

Registration links use `data-register` attribute â€” `site.js` sets `href` from `REGISTER_URL` on load. Use `href="#"` as placeholder. A `<noscript>` fallback `<p class="noscript-register-note">` with the direct Google Form link is placed after the first `data-register` link on each page.

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

## Events â€” How to Edit

Edit `js/events-data.js`. The render script in events.html reads this file automatically.

- Only one event object should have `isCurrent: true` at a time
- `title`, `desc`, `where`, `format`, `entry` fields support inline HTML
- The `ctaHref` on the event object is set as the `href`, but `site.js` also overrides it via `[data-register]` â€” so the CTA will always point to `REGISTER_URL`
- To show an upcoming event as "coming soon", add it with `isCurrent: false` (it won't render yet)

After editing, run `npm run build` to regenerate `js/events-data.min.js`.

---

## Team Photos

- Format: WebP, ID-card proportions (96Ã—120px display, can be larger source)
- Target size: < 10 KB per image (current: magnus.webp ~3 KB, colin.webp ~2.6 KB)
- Location: `assets/images/team/<name>.webp`
- Referenced in `team.html` `<img src="/assets/images/team/...">` and JSON-LD

---

## Deployment

Push to `main` â†’ Vercel auto-deploys. `vercel.json` runs `npm install && npm run build` first, generating the `.min` files that the HTML pages reference.

The `_headers` file sets:
- `/assets/*` â†’ 1-year immutable cache
- `/css/*.min.css` and `/js/*.min.js` â†’ 24-hour browser cache, 1-year CDN cache
- Security headers (CSP, X-Frame-Options, etc.) â€” **do not modify without explicit instruction**
- CSP `script-src` does **not** include `'unsafe-inline'` â€” no inline event handlers allowed

Current CSP `connect-src` allows: `self`, `script.google.com`, `script.googleusercontent.com` (member count API), `cdn.jsdelivr.net` (globe TopoJSON), `vitals.vercel-insights.com` (Vercel Analytics).

---

## What to Avoid

- **No new CSS files.** Page-specific styles go in each HTML file's `<style>` block. `page.css` is legacy â€” do not add it back to events.html or team.html.
- **Do not move CSS/JS into `/assets/`** â€” they will be cached immutably and edits will be invisible.
- **Do not modify `robots.txt` AI-crawler blocks** or `_headers` security policy without explicit instruction.
- **Do not add `const`/`let` to `site.js`** â€” it uses `var` intentionally for compatibility. `events-data.js` may use `const` since it is not inline.
- **Do not hardcode the registration URL** in HTML â€” use `href="#" data-register` on links; `site.js` fills the href from `REGISTER_URL`. Exception: the `<noscript>` fallback `<a>` inside `.noscript-register-note` paragraphs.
- **Do not add mobile drawer HTML to the HTML files** â€” it is injected by `buildMobileMenu()` in `site.js`.
- **Do not add inline `onclick` handlers** â€” CSP blocks them. Use event listeners in `site.js`.
- **Do not edit the index.html design** â€” it is the source of truth. When overhauling subpages, copy patterns from index.html.
- **Event card structure must match** between index.html and events.html â€” same class names (`.event-card`, `.event-main`, `.event-status`, `.event-dot`, `.event-title`, `.event-desc`, `.event-tags`, `.event-tag`, `.event-meta`, `.event-meta-row`, `.meta-lbl`, `.meta-val`).
- **Always run `npm run build`** after editing any source CSS or JS file so the `.min` files stay in sync.
