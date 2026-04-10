# Homepage UI Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current dark Three.js-based homepage with the approved luxury-boutique cream/ink design while preserving all SEO infrastructure, accessibility, and interactive functionality.

**Architecture:** All styling lives in `index.html`'s page-specific `<style>` block (per project convention). Shared files (`base.css`, `nav.css`, `site.js`) receive only minimal targeted changes. The new nav theme is scoped to `index.html` by overriding `nav.css` variables inside `#mainNav`. Three.js globe is removed; replaced by a pure-CSS hero with a ghost letterform and mouse-tilt JS.

**Tech Stack:** Vanilla HTML5/CSS/JS, Cormorant Garamond + Barlow Condensed (Google Fonts), IntersectionObserver, RAF-batched scroll handler, `npm run build` (csso-cli + terser), Vercel

**Reference mockup:** `.superpowers/brainstorm/7769-1775825550/content/homepage-v3.html`

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `js/site.js` | Modify | Add `data-static` guard to marquee injection; update `MARQUEE_TEXT` |
| `css/base.css` | No change | Arc button base styles preserved; tokens kept for events/team pages |
| `css/nav.css` | No change | Nav overridden per-page in index.html `<style>` block |
| `index.html` | Full rewrite of `<style>` block + `<body>` | New design — SEO head preserved intact |
| `js/events-data.js` | No change | Out of scope |
| `events.html`, `team.html` | No change | Out of scope |

---

## Task 1: Update site.js — Marquee guard + content

**Files:**
- Modify: `js/site.js:27-32`
- Modify: `js/site.js:17` (REGISTER_URL stays the same — no change)

The new `index.html` uses static hardcoded marquee HTML (not injected by site.js). Without a guard, site.js will overwrite the static HTML on page load.

Fix: add `data-static` attribute check before injection. The new marquee-track will carry `data-static="true"`.

Also update `MARQUEE_TEXT` so events.html + team.html marquees reflect the new branding.

- [ ] **Step 1: Open `js/site.js` and update the marquee block (lines ~27–32)**

Replace:
```js
var MARQUEE_TEXT = 'First Event <span class="mgem">◈</span> Fall 2026 <span class="mgem">◈</span> Ottawa <span class="mgem">◈</span> Member Registration Open <span class="mgem">◈</span> Student Run Speaker Forum <span class="mgem">◈</span> Law &amp; Policy <span class="mgem">◈</span> Business &amp; Media <span class="mgem">◈</span> For Students, By Students <span class="mgem">◈</span>';

var marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.innerHTML = '<div class="marquee-item">' + MARQUEE_TEXT + '</div><div class="marquee-item">' + MARQUEE_TEXT + '</div>';
}
```

With:
```js
var MARQUEE_TEXT = 'The Meridian Society <span class="mgem">◈</span> Ottawa <span class="mgem">◈</span> Est. 2025 <span class="mgem">◈</span> Student-Run <span class="mgem">◈</span> Inaugural Event — Fall 2026 <span class="mgem">◈</span> Carleton University <span class="mgem">◈</span> uOttawa <span class="mgem">◈</span> Algonquin College <span class="mgem">◈</span>';

var marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack && !marqueeTrack.dataset.static) {
  marqueeTrack.innerHTML = '<div class="marquee-item">' + MARQUEE_TEXT + '</div><div class="marquee-item">' + MARQUEE_TEXT + '</div>';
}
```

- [ ] **Step 2: Run the build**

```bash
npm run build
```

Expected: `js/site.min.js` regenerated, no errors.

- [ ] **Step 3: Verify events.html and team.html marquees still work**

Open `events.html` and `team.html` in a browser (via `localhost` or open-file). The ticker strip below the page header should scroll with the updated text. No console errors.

- [ ] **Step 4: Commit**

```bash
git add js/site.js js/site.min.js
git commit -m "feat: update marquee text and add data-static guard for homepage"
```

---

## Task 2: index.html — HEAD: tokens, SEO, fonts

**Files:**
- Modify: `index.html:1–379` (everything before `<link rel="stylesheet">`)

This task rewrites the `<head>` to install the new design tokens (`:root` in the `<style>` block) while preserving all SEO metadata verbatim. The Three.js-related `<script>` and `events-data.min.js` references in the head are removed.

> **Do not touch the JSON-LD blocks** — they are preserved exactly. Only update `dateModified` to `2026-04-10` across all JSON-LD objects that have it.

- [ ] **Step 1: Update `dateModified` in all JSON-LD blocks**

In `index.html`, find all occurrences of `"dateModified": "2026-04-07"` and replace with `"dateModified": "2026-04-10"`. There are 2 occurrences (WebPage and ProfilePage schemas).

- [ ] **Step 2: Update the `speakable` CSS selectors to match new section IDs**

Find the WebPage JSON-LD block and update the speakable selectors:
```json
"speakable": {
  "@type": "SpeakableSpecification",
  "cssSelector": ["#hero-speakable", "#about-speakable", "#register-speakable"]
},
```
These IDs will be added to the new HTML in later tasks — leave the JSON-LD as-is.

- [ ] **Step 3: Remove the `events-data.min.js` script tag from `<head>`**

Delete this line from `<head>`:
```html
<script src="/js/events-data.min.js"></script>
```
(Events data is still needed — it will be loaded at the bottom of `<body>` in Task 10.)

- [ ] **Step 4: Replace the `<style>` block opening with new design tokens**

The `<style>` block currently starts after the CSS `<link>` tags. Replace only the `:root` section inside the existing `<style>` block:

```css
:root {
  /* ── New cream/ink palette ── */
  --cream:       #F4EDE3;
  --cream-mid:   #EBE2D4;
  --cream-deep:  #DDD0BC;
  --ink:         #18150F;
  --ink-90:      rgba(24,21,15,0.90);
  --ink-75:      rgba(24,21,15,0.75);
  --ink-55:      rgba(24,21,15,0.55);
  --ink-30:      rgba(24,21,15,0.30);
  --ink-15:      rgba(24,21,15,0.15);
  --ink-08:      rgba(24,21,15,0.08);
  --gold:        #B8932A;
  --gold-lt:     #D4AF50;
  --serif:       'Cormorant Garamond', Georgia, serif;
  --sans:        'Barlow Condensed', 'Arial Narrow', Arial, sans-serif;
  --grain: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

> **Note:** These tokens replace the existing `:root` block (`--black`, `--dark`, `--surface`, etc.). The new tokens use semantically correct names. The old `--black`/`--cream` inverse-naming is gone for this page. `base.css` tokens still exist globally but are overridden by this `:root` redeclaration in the `<style>` block.

- [ ] **Step 5: Update `body` base style inside the `<style>` block**

Replace the existing `body { background: var(--black); color: var(--cream); ... }` with:

```css
body {
  background: var(--cream);
  color: var(--ink);
  font-family: var(--serif);
  font-weight: 400;
  line-height: 1.7;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

- [ ] **Step 6: Load the page in a browser (direct file open)**

Expected: Page background should now be warm cream `#F4EDE3`. The existing layout will look broken — that's expected. Check there are no JS errors related to missing elements.

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat(index): install new cream/ink design tokens and update SEO dateModified"
```

---

## Task 3: index.html — CSS: Nav override + Hero styles

**Files:**
- Modify: `index.html` — `<style>` block

Replace the existing `STICKY JOIN`, `HERO`, stats, button styles with the new versions. Keep the `@media` blocks and other sections — they'll be replaced in later tasks.

- [ ] **Step 1: Replace the nav override section in the `<style>` block**

Remove the existing `.sticky-join` block and add after `:root`:

```css
/* ══ NAV OVERRIDE — cream theme (index.html only) ══
   nav.css forces dark glassmorphism sitewide.
   These rules re-scope its CSS variables + background for the cream homepage. */
#mainNav {
  --cream:  #18150F;
  --cream-70: rgba(24,21,15,0.90);
  --cream-45: rgba(24,21,15,0.75);
  --cream-20: rgba(24,21,15,0.55);
  --black:  #F4EDE3;
  --gold:   #B8932A;
  --gold-border:  rgba(184,147,42,0.38);
  --gold-border2: rgba(184,147,42,0.60);
  background: rgba(244,237,227,0.92) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border-bottom: 1px solid rgba(24,21,15,0.10) !important;
  box-shadow: none !important;
}
#mainNav.scrolled {
  background: rgba(244,237,227,0.98) !important;
  box-shadow: 0 2px 28px rgba(24,21,15,0.06) !important;
  border-bottom-color: rgba(24,21,15,0.16) !important;
}

/* ══ STICKY JOIN (mobile floating CTA) ══ */
.sticky-join {
  display: none; position: fixed;
  bottom: 1.4rem; left: 50%; z-index: 99;
  padding: 0.85rem 2.8rem;
  background: var(--ink); border: 1px solid rgba(184,147,42,0.5);
  color: var(--gold-lt); text-decoration: none;
  font-family: var(--sans); font-size: 11px; font-weight: 700;
  letter-spacing: 0.24em; text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 12px 60px rgba(24,21,15,0.18);
  opacity: 0; pointer-events: none;
  transform: translateX(-50%) translateY(18px) scale(0.96);
  transition: opacity 0.45s cubic-bezier(0.34,1.56,0.64,1),
              transform 0.45s cubic-bezier(0.34,1.56,0.64,1),
              background 0.2s, color 0.2s;
}
.sticky-join.visible { opacity: 1; pointer-events: all; transform: translateX(-50%) translateY(0) scale(1); }
.sticky-join:hover { background: var(--gold); color: var(--ink); }
```

- [ ] **Step 2: Replace the hero section CSS**

Remove all existing `.hero`, `.hero-canvas-wrap`, `.hero-vignette`, `.hero-rail`, `.hero-content`, `.hero-eyebrow*`, `.hero-pre`, `.hero-title`, `.hero-sub`, `.hero-div*`, `.hero-desc`, `.hero-ctas`, `.cta-primary`, `.cta-ghost`, `.hero-ig-btn`, `.hero-stats`, `.hero-stat`, `.stat-val`, `.stat-lbl` rules.

Add:

```css
/* ══════════════════════════════
   KEYFRAMES
══════════════════════════════ */
@keyframes riseIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}
@keyframes goldPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(184,147,42,0.5); }
  50%       { box-shadow: 0 0 0 4px rgba(184,147,42,0); }
}
@keyframes marqueeScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ══════════════════════════════
   HERO
══════════════════════════════ */
.hero {
  position: relative; min-height: 94vh;
  display: flex; flex-direction: column;
  align-items: center; text-align: center;
  padding: 80px 64px 0; overflow: hidden;
  background: var(--cream);
}
.hero::before {
  content: ''; position: absolute; inset: 0; z-index: 0;
  background:
    radial-gradient(ellipse 70% 55% at 50% 35%, transparent 45%, rgba(166,138,88,0.08) 100%),
    radial-gradient(ellipse 100% 60% at 50% 90%, rgba(150,120,70,0.07) 0%, transparent 60%),
    linear-gradient(175deg, rgba(255,252,244,0.55) 0%, transparent 50%);
  pointer-events: none;
}
.hero::after {
  content: ''; position: absolute; inset: 0; z-index: 1;
  opacity: 0.03; background-image: var(--grain);
  background-size: 220px 220px; pointer-events: none;
}

/* Ghost "M" letterform — parallax target via JS */
.hero-ghost {
  position: absolute; z-index: 1;
  bottom: -80px; left: 50%;
  transform: translateX(-50%);
  font-family: var(--serif); font-size: 560px; font-weight: 300; line-height: 1;
  color: transparent; -webkit-text-stroke: 1px rgba(24,21,15,0.035);
  user-select: none; pointer-events: none; letter-spacing: -0.05em;
}

.hero-content {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: center;
  flex: 1; justify-content: center;
}
.hero-eyebrow {
  display: flex; align-items: center; gap: 16px; margin-bottom: 52px;
  opacity: 0; animation: riseIn 0.7s 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
}
.hero-eyebrow-rule { width: 36px; height: 1px; background: var(--gold); opacity: 0.5; }
.hero-eyebrow-text {
  font-family: var(--sans); font-size: 11px; font-weight: 700;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold);
}
.hero-pre {
  font-family: var(--serif); font-size: clamp(22px, 3vw, 38px);
  font-style: italic; font-weight: 300; color: var(--ink-55);
  letter-spacing: 0.06em; margin-bottom: 10px;
  opacity: 0; animation: riseIn 0.7s 0.55s cubic-bezier(0.16,1,0.3,1) forwards;
}
.hero-title {
  font-family: var(--serif); font-size: clamp(76px, 13.5vw, 196px);
  font-weight: 300; line-height: 0.86; color: var(--ink); letter-spacing: 0.06em;
  opacity: 0; animation: riseIn 0.9s 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
  text-shadow: 0 2px 40px rgba(24,21,15,0.04);
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
}
.hero-hr {
  width: 44px; height: 1px; background: var(--ink-15); margin: 36px auto;
  opacity: 0; animation: riseIn 0.6s 0.95s ease forwards;
}
.hero-sub {
  font-family: var(--serif); font-size: clamp(19px, 2.2vw, 27px);
  font-style: italic; font-weight: 300; color: var(--ink-75);
  max-width: 560px; line-height: 1.85; margin-bottom: 52px;
  opacity: 0; animation: riseIn 0.7s 1.05s ease forwards;
}
.hero-actions {
  display: flex; align-items: center; gap: 36px;
  opacity: 0; animation: riseIn 0.7s 1.2s ease forwards;
}

/* Primary CTA button — fill from left */
.btn-primary {
  font-family: var(--sans); font-size: 10px; font-weight: 700;
  letter-spacing: 0.24em; text-transform: uppercase;
  color: var(--cream); background: var(--ink);
  text-decoration: none; padding: 13px 32px 12px;
  position: relative; overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s;
}
.btn-primary::before {
  content: ''; position: absolute; inset: 0; background: var(--gold);
  transform: translateX(-100%);
  transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
}
.btn-primary span { position: relative; z-index: 1; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(24,21,15,0.14); }
.btn-primary:hover::before { transform: translateX(0); }

/* Ghost serif link */
.btn-ghost-link {
  font-family: var(--serif); font-size: 16px; font-style: italic; font-weight: 300;
  color: var(--ink-55); text-decoration: none;
  display: flex; align-items: center; gap: 8px;
  transition: color 0.2s, gap 0.25s;
}
.btn-ghost-link:hover { color: var(--ink); gap: 14px; }

/* Instagram icon button */
.hero-ig-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 44px; height: 44px; flex-shrink: 0;
  border: 1px solid var(--ink-30); text-decoration: none;
  position: relative; overflow: hidden;
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
}
.hero-ig-btn::before {
  content: ''; position: absolute; inset: 0; background: var(--gold);
  transform: translateX(-100%);
  transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); z-index: 0;
}
.hero-ig-btn svg { position: relative; z-index: 1; width: 16px; height: 16px; fill: var(--ink-55); transition: fill 0.25s; }
.hero-ig-btn:hover { border-color: var(--gold); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,147,42,0.18); }
.hero-ig-btn:hover::before { transform: translateX(0); }
.hero-ig-btn:hover svg { fill: var(--cream); }

/* Stats bar — full width, pushed to bottom by flex */
.hero-stats {
  position: relative; z-index: 2; width: 100%; margin-top: auto;
  display: grid; grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--ink-15);
  opacity: 0; animation: riseIn 0.7s 1.4s ease forwards;
}
.stat {
  padding: 26px 40px; border-right: 1px solid var(--ink-08);
  position: relative; cursor: default; transition: background 0.3s; overflow: hidden;
}
.stat:last-child { border-right: none; }
.stat::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
  background: var(--gold); transform: scaleX(0); transform-origin: left;
  transition: transform 0.35s ease;
}
.stat:hover { background: rgba(184,147,42,0.04); }
.stat:hover::after { transform: scaleX(1); }
.stat:hover .stat-val { color: var(--gold); }
.stat-val { font-family: var(--serif); font-size: 26px; font-weight: 300; color: var(--ink); line-height: 1; margin-bottom: 5px; transition: color 0.3s; }
.stat-lbl { font-family: var(--sans); font-size: 8px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-55); }

/* Arc button — cream theme override (base.css defaults are dark-theme) */
.arc-btn {
  background: var(--cream-mid) !important; border: 1px solid var(--ink-15) !important;
  box-shadow: 0 4px 24px rgba(24,21,15,0.08) !important;
}
.arc-btn:hover { background: var(--ink) !important; border-color: var(--ink) !important; }
.arc-track { stroke: var(--ink-08) !important; }
.arc-fill  { stroke: var(--gold) !important; }
.arc-icon  { color: var(--ink-75) !important; font-family: var(--serif) !important; font-size: 14px !important; }
.arc-btn:hover .arc-icon  { color: var(--cream) !important; }
.arc-inner { background: transparent !important; border: none !important; inset: 0 !important; border-radius: 0 !important; }
```

- [ ] **Step 3: Load `index.html` in a browser**

Expected: Page has cream background. Nav bar is cream/transparent. Hero section renders but content HTML hasn't been changed yet — some text will be mis-styled. No console errors.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat(index): nav cream override, hero CSS, button styles, arc override"
```

---

## Task 4: index.html — CSS: Marquee, About, Who

**Files:**
- Modify: `index.html` — `<style>` block

- [ ] **Step 1: Replace the marquee CSS section**

Remove the existing `/* marquee — base styles in base.css */` comment block and add:

```css
/* ══════════════════════════════
   MARQUEE
══════════════════════════════ */
.marquee-wrap {
  overflow: hidden; background: var(--ink);
  padding: 13px 0; position: relative; z-index: 2;
  display: flex; align-items: center;
}
.marquee-wrap::before,
.marquee-wrap::after {
  content: ''; position: absolute; top: 0; bottom: 0;
  width: 80px; z-index: 1; pointer-events: none;
}
.marquee-wrap::before { left: 0; background: linear-gradient(to right, var(--ink), transparent); }
.marquee-wrap::after  { right: 0; background: linear-gradient(to left, var(--ink), transparent); }
.marquee-track {
  display: flex; flex-wrap: nowrap; align-items: center;
  white-space: nowrap; width: max-content;
  animation: marqueeScroll 32s linear infinite;
}
.marquee-wrap:hover .marquee-track { animation-play-state: paused; }
.m-item {
  font-family: var(--sans); font-size: 9px; font-weight: 600;
  letter-spacing: 0.34em; text-transform: uppercase;
  color: rgba(244,237,227,0.38); padding: 0 24px;
  flex-shrink: 0; white-space: nowrap; line-height: 1;
}
.m-gem { color: rgba(212,175,80,0.45); padding: 0 4px; flex-shrink: 0; line-height: 1; }
```

- [ ] **Step 2: Replace the About section CSS**

Remove all existing `.about-*`, `.def-block`, `.def-*`, `.pull-quote` rules. Add:

```css
/* ══════════════════════════════
   SHARED UTILS
══════════════════════════════ */
.wrap { max-width: 1280px; margin: 0 auto; padding: 0 64px; }
.sec-label {
  font-family: var(--sans); font-size: 9px; font-weight: 700;
  letter-spacing: 0.34em; text-transform: uppercase; color: var(--ink-55);
  display: flex; align-items: center; gap: 14px; margin-bottom: 28px;
}
.sec-label::after { content: ''; flex: 1; height: 1px; background: var(--ink-15); }
.text-link {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--sans); font-size: 9.5px; font-weight: 700;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--ink-55); text-decoration: none; position: relative;
}
.text-link::after {
  content: ''; position: absolute; bottom: -3px; left: 0;
  width: 100%; height: 1px; background: var(--ink-30); transition: background 0.2s;
}
.text-link:hover { color: var(--ink); }
.text-link:hover::after { background: var(--gold); }

/* Scroll reveal */
.rv { opacity: 0; transform: translateY(20px); transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1); }
.rv.on { opacity: 1; transform: none; }
.rv[data-d="1"] { transition-delay: 0.08s; }
.rv[data-d="2"] { transition-delay: 0.16s; }
.rv[data-d="3"] { transition-delay: 0.24s; }
.rv[data-d="4"] { transition-delay: 0.32s; }

/* ══════════════════════════════
   ABOUT
══════════════════════════════ */
.about { padding: 120px 0; position: relative; overflow: hidden; }
.about::before {
  content: ''; position: absolute; inset: 0; z-index: 0;
  background-image: radial-gradient(circle, rgba(24,21,15,0.065) 1px, transparent 1px);
  background-size: 28px 28px; pointer-events: none;
}
.about::after {
  content: ''; position: absolute; inset: 0; z-index: 1;
  background:
    radial-gradient(ellipse 70% 80% at 50% 50%, var(--cream) 50%, transparent 100%),
    linear-gradient(to bottom, var(--cream) 0%, transparent 15%, transparent 85%, var(--cream) 100%);
  pointer-events: none;
}
.about .wrap { position: relative; z-index: 2; }
.about-layout { display: grid; grid-template-columns: 340px 1fr; gap: 0; align-items: start; }
.about-left { padding-right: 72px; border-right: 1px solid var(--ink-15); position: sticky; top: 96px; }
.about-num {
  font-family: var(--serif); font-size: 96px; font-weight: 300; line-height: 1;
  letter-spacing: -0.04em; color: transparent; -webkit-text-stroke: 1px var(--ink-15);
  display: block; margin-bottom: 8px; transition: -webkit-text-stroke-color 0.4s;
}
.about-left:hover .about-num { -webkit-text-stroke-color: rgba(184,147,42,0.25); }
.about-section-label { font-family: var(--sans); font-size: 9px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-55); margin-bottom: 20px; }
.about-title { font-family: var(--serif); font-size: clamp(30px, 3.5vw, 50px); font-weight: 300; line-height: 1.05; color: var(--ink); }
.about-title em { font-style: italic; color: var(--gold); }
.about-right { padding-left: 80px; }
.about-body { font-family: var(--serif); font-size: 19px; font-weight: 400; line-height: 1.95; color: var(--ink-90); margin-bottom: 28px; }
.pull-quote {
  padding: 24px 28px 24px 32px; margin: 40px 0;
  background: var(--cream-mid); border-left: 2px solid var(--gold);
  box-shadow: inset 0 0 0 1px var(--ink-08), 0 4px 20px rgba(24,21,15,0.06);
  transition: border-left-width 0.3s, box-shadow 0.3s, transform 0.3s;
}
.pull-quote:hover { border-left-width: 4px; box-shadow: inset 0 0 0 1px var(--ink-08), 0 8px 32px rgba(24,21,15,0.10); transform: translateX(4px); }
.pull-quote p { font-family: var(--serif); font-size: 21px; font-style: italic; font-weight: 300; line-height: 1.65; color: var(--ink); }
```

- [ ] **Step 3: Replace the Who We Gather CSS**

Remove all existing `#who`, `.who-intro`, `.who-headline`, `.who-intro-body`, `.who-list`, `.who-row*`, `.who-row-*` rules. Add:

```css
/* ══════════════════════════════
   WHO WE GATHER
══════════════════════════════ */
.who { padding: 110px 0; background: var(--cream-mid); position: relative; overflow: visible; }
.who::before {
  content: ''; position: absolute; inset: 0; z-index: 0;
  background-image: repeating-linear-gradient(-45deg, transparent, transparent 24px, rgba(24,21,15,0.025) 24px, rgba(24,21,15,0.025) 25px);
  pointer-events: none;
}
.who .wrap { position: relative; z-index: 1; }
.who-top { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: end; margin-bottom: 60px; }
.who-title { font-family: var(--serif); font-size: clamp(30px, 3.5vw, 50px); font-weight: 300; line-height: 1.05; color: var(--ink); }
.who-title em { font-style: italic; }
.who-intro-body { font-family: var(--serif); font-size: 18px; font-weight: 400; line-height: 1.9; color: var(--ink-90); }
.who-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--ink-15); border: 1px solid var(--ink-15); overflow: visible; }
.who-item {
  background: var(--cream-mid); padding: 40px 36px;
  position: relative; overflow: hidden; cursor: default;
  transition: background 0.35s, transform 0.35s cubic-bezier(0.16,1,0.3,1);
}
.who-item::before {
  content: attr(data-num); position: absolute; bottom: -16px; right: -8px;
  font-family: var(--serif); font-size: 120px; font-weight: 300;
  color: transparent; -webkit-text-stroke: 1px rgba(24,21,15,0.06);
  line-height: 1; pointer-events: none; transition: -webkit-text-stroke-color 0.35s;
}
.who-item::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: var(--gold); transform: scaleX(0); transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
}
.who-item:hover { background: var(--cream); transform: translateY(-3px); box-shadow: 0 8px 40px rgba(24,21,15,0.08); }
.who-item:hover::after { transform: scaleX(1); }
.who-item:hover::before { -webkit-text-stroke-color: rgba(184,147,42,0.1); }
.who-num { font-family: var(--sans); font-size: 8px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; transition: letter-spacing 0.3s; }
.who-item:hover .who-num { letter-spacing: 0.36em; }
.who-item-title { font-family: var(--serif); font-size: 22px; font-weight: 400; font-style: italic; color: var(--ink); line-height: 1.2; margin-bottom: 14px; }
.who-item-desc { font-family: var(--serif); font-size: 15px; color: var(--ink-90); line-height: 1.75; position: relative; z-index: 1; }
```

- [ ] **Step 4: Verify in browser**

Load the page. The marquee strip and about/who sections should now reflect the new styles (even though HTML hasn't been updated yet — body HTML is rewritten in Tasks 6–10).

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat(index): marquee, about, who CSS"
```

---

## Task 5: index.html — CSS: Not, Events, Speaking, Register, Footer, Responsive

**Files:**
- Modify: `index.html` — `<style>` block (remainder)

- [ ] **Step 1: Replace Not section CSS**

Remove `.not-intro`, `.not-headline`, `.not-intro-body`, `.not-list`, `.not-item`, `.not-x`, `.not-text`, `.not-coda`, `.not-quote`, `.not-coda-body` rules. Add:

```css
/* ══════════════════════════════
   WHAT WE ARE NOT
══════════════════════════════ */
.not-sec { padding: 110px 0; position: relative; overflow: hidden; }
.not-sec::before { content: ''; position: absolute; inset: 0; z-index: 0; opacity: 0.03; background-image: var(--grain); background-size: 200px 200px; pointer-events: none; }
.not-sec .wrap { position: relative; z-index: 1; }
.not-layout { display: grid; grid-template-columns: 400px 1fr; gap: 0; align-items: start; }
.not-left { padding-right: 72px; border-right: 1px solid var(--ink-15); }
.not-title { font-family: var(--serif); font-size: clamp(28px, 3vw, 44px); font-weight: 300; line-height: 1.1; color: var(--ink); margin-bottom: 24px; }
.not-body { font-family: var(--serif); font-size: 17px; line-height: 1.9; color: var(--ink-90); }
.not-right { padding-left: 72px; }
.not-list { list-style: none; }
.not-list-header {
  font-family: var(--sans); font-size: 8px; font-weight: 700; letter-spacing: 0.32em;
  text-transform: uppercase; color: var(--ink-30); padding-bottom: 12px;
  border-bottom: 1px solid var(--ink-15); margin-bottom: 0;
  display: flex; align-items: center; gap: 10px;
}
.not-list-header::before { content: '×'; font-family: var(--sans); font-size: 12px; font-weight: 300; color: var(--gold); opacity: 0.7; }
.not-list li {
  display: flex; align-items: baseline; gap: 20px;
  padding: 18px 0; border-bottom: 1px solid var(--ink-08);
  font-family: var(--serif); font-size: 17px; font-style: italic;
  color: var(--ink-90); line-height: 1.4;
  transition: color 0.25s, padding-left 0.3s, border-bottom-color 0.25s; cursor: default;
}
.not-list li:first-child { border-top: none; }
.not-list li::before { content: '×'; font-style: normal; font-family: var(--sans); font-size: 11px; font-weight: 300; color: var(--ink-15); flex-shrink: 0; transition: color 0.25s; }
.not-list li:hover { color: var(--ink); padding-left: 8px; }
.not-list li:hover::before { color: var(--gold); }
```

- [ ] **Step 2: Replace Events Teaser CSS**

Remove `.event-card`, `.event-card-main`, `.event-card-top`, `.event-status`, `.event-status-dot`, `.event-status-text`, `.event-card-title`, `.event-card-desc`, `.event-card-bottom`, `.event-card-tags`, `.event-tag`, `.event-card-cta`, `.event-card-panel`, `.event-panel-*` rules. Add:

```css
/* ══════════════════════════════
   EVENTS TEASER
══════════════════════════════ */
.events { padding: 110px 0; background: var(--cream-deep); position: relative; overflow: hidden; }
.events::before { content: ''; position: absolute; top: 40px; right: 40px; width: 80px; height: 80px; border-top: 1px solid var(--ink-15); border-right: 1px solid var(--ink-15); pointer-events: none; }
.events::after  { content: ''; position: absolute; bottom: 40px; left: 40px; width: 80px; height: 80px; border-bottom: 1px solid var(--ink-15); border-left: 1px solid var(--ink-15); pointer-events: none; }
.events .wrap { position: relative; z-index: 1; }
.events-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 52px; }
.events-title { font-family: var(--serif); font-size: clamp(30px, 3.5vw, 50px); font-weight: 300; line-height: 1.05; color: var(--ink); }
.events-title em { font-style: italic; }
.event-card {
  background: var(--cream); border: 1px solid var(--ink-15);
  display: grid; grid-template-columns: 1fr 280px; gap: 0;
  box-shadow: 0 2px 12px rgba(24,21,15,0.04), 0 8px 40px rgba(24,21,15,0.06);
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s;
  position: relative; overflow: hidden;
}
.event-card:hover { transform: translateY(-4px); box-shadow: 0 4px 24px rgba(24,21,15,0.06), 0 16px 60px rgba(24,21,15,0.10); }
.event-main { padding: 48px 52px; border-right: 1px solid var(--ink-15); position: relative; z-index: 1; }
.event-status { display: inline-flex; align-items: center; gap: 8px; font-family: var(--sans); font-size: 8px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-55); margin-bottom: 24px; }
.event-dot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; animation: goldPulse 2.2s ease-in-out infinite; }
.event-title { font-family: var(--serif); font-size: clamp(26px, 3vw, 42px); font-weight: 300; line-height: 1.1; color: var(--ink); margin-bottom: 20px; }
.event-title em { font-style: italic; }
.event-desc { font-family: var(--serif); font-size: 17px; line-height: 1.85; color: var(--ink-90); max-width: 520px; margin-bottom: 32px; }
.event-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.event-tag { font-family: var(--sans); font-size: 8px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-55); border: 1px solid var(--ink-15); padding: 5px 12px; transition: border-color 0.2s, color 0.2s; }
.event-tag:hover { border-color: var(--gold); color: var(--ink); }
.event-meta { position: relative; z-index: 1; }
.event-meta-row { padding: 22px 28px; border-bottom: 1px solid var(--ink-08); transition: background 0.2s; }
.event-meta-row:last-child { border-bottom: none; }
.event-meta-row:hover { background: rgba(24,21,15,0.02); }
.meta-lbl { font-family: var(--sans); font-size: 7.5px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-55); margin-bottom: 5px; }
.meta-val { font-family: var(--serif); font-size: 15px; font-style: italic; color: var(--ink); line-height: 1.3; }
```

- [ ] **Step 3: Replace Get Involved / Speaking CSS**

Remove `.speaking-layout`, `.speaking-headline`, `.speaking-body`, `.speaking-email`, `.formats-panel`, `.formats-label`, `.formats-list li` rules. Add:

```css
/* ══════════════════════════════
   GET INVOLVED
══════════════════════════════ */
.speaking { padding: 110px 0; position: relative; overflow: hidden; }
.speaking::before {
  content: ''; position: absolute; inset: 0; z-index: 0;
  background-image: radial-gradient(circle, rgba(24,21,15,0.055) 1px, transparent 1px);
  background-size: 36px 36px; pointer-events: none;
}
.speaking::after {
  content: ''; position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(to right, var(--cream) 0%, transparent 20%, transparent 80%, var(--cream) 100%),
              linear-gradient(to bottom, var(--cream) 0%, transparent 12%, transparent 88%, var(--cream) 100%);
  pointer-events: none;
}
.speaking .wrap { position: relative; z-index: 2; }
.speaking-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 0; align-items: start; }
.speaking-left { padding-right: 80px; border-right: 1px solid var(--ink-15); }
.speaking-title { font-family: var(--serif); font-size: clamp(30px, 3.5vw, 50px); font-weight: 300; line-height: 1.05; color: var(--ink); margin-bottom: 8px; }
.speaking-title em { font-style: italic; }
.speaking-sub { font-family: var(--serif); font-size: 18px; font-style: italic; color: var(--ink-55); margin-bottom: 32px; }
.speaking-body { font-family: var(--serif); font-size: 17px; line-height: 1.9; color: var(--ink-90); margin-bottom: 36px; }
.speaking-right { padding-left: 80px; }
.formats-list { list-style: none; }
.formats-item {
  display: flex; align-items: center; gap: 20px;
  padding: 16px 0; border-bottom: 1px solid var(--ink-08);
  cursor: default; position: relative; overflow: hidden;
  transition: padding-left 0.3s cubic-bezier(0.16,1,0.3,1), border-bottom-color 0.2s;
}
.formats-item:first-child { border-top: 1px solid var(--ink-15); }
.formats-item::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to right, rgba(184,147,42,0.05) 0%, transparent 100%);
  transform: translateX(-100%); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
}
.formats-item:hover { padding-left: 12px; border-bottom-color: var(--ink-15); }
.formats-item:hover::before { transform: translateX(0); }
.formats-num { font-family: var(--sans); font-size: 7.5px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); flex-shrink: 0; position: relative; z-index: 1; transition: letter-spacing 0.3s; }
.formats-item:hover .formats-num { letter-spacing: 0.28em; }
.formats-text { font-family: var(--serif); font-size: 16px; font-style: italic; color: var(--ink-90); position: relative; z-index: 1; transition: color 0.2s; }
.formats-item:hover .formats-text { color: var(--ink); }
```

- [ ] **Step 4: Replace Register / Membership CSS**

Remove `.register-layout`, `.register-headline`, `.register-body`, `.register-perks`, `.btn-register`, `.member-panel`, `.member-*`, `.live-dot`, `.count-loader*` rules. Add:

```css
/* ══════════════════════════════
   REGISTER
══════════════════════════════ */
.register { padding: 120px 0; background: var(--cream-mid); position: relative; overflow: hidden; }
.register::before {
  content: ''; position: absolute; inset: 0; z-index: 0;
  background: radial-gradient(ellipse 65% 60% at 50% 50%, rgba(184,147,42,0.06) 0%, transparent 70%),
              radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(24,21,15,0.04) 100%);
  pointer-events: none;
}
.register::after { content: ''; position: absolute; inset: 0; z-index: 0; opacity: 0.03; background-image: var(--grain); background-size: 200px 200px; pointer-events: none; }
.register-ghost {
  position: absolute; bottom: -32px; left: 50%; transform: translateX(-50%);
  font-family: var(--sans); font-size: 180px; font-weight: 700;
  letter-spacing: 0.3em; white-space: nowrap;
  color: transparent; -webkit-text-stroke: 1px rgba(24,21,15,0.06);
  user-select: none; pointer-events: none; z-index: 0;
}
.register .wrap { position: relative; z-index: 1; text-align: center; }
.register-rule-top { width: 1px; height: 60px; background: var(--ink-15); margin: 0 auto 40px; }
.register-eyebrow { font-family: var(--sans); font-size: 9px; font-weight: 700; letter-spacing: 0.38em; text-transform: uppercase; color: var(--ink-30); margin-bottom: 36px; }
.register-title { font-family: var(--serif); font-size: clamp(46px, 7.5vw, 108px); font-weight: 300; line-height: 0.88; color: var(--ink); margin-bottom: 36px; }
.register-title em { font-style: italic; font-weight: 300; color: var(--gold); }
.register-body { font-family: var(--serif); font-size: 19px; font-style: italic; font-weight: 300; color: var(--ink-75); max-width: 440px; margin: 0 auto 52px; line-height: 1.85; }
.register-actions { display: flex; align-items: center; gap: 28px; justify-content: center; }
.register-btn {
  display: inline-block; font-family: var(--sans); font-size: 10px; font-weight: 700;
  letter-spacing: 0.26em; text-transform: uppercase; color: var(--cream);
  background: var(--ink); padding: 16px 48px 15px; text-decoration: none;
  position: relative; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s;
}
.register-btn::before { content: ''; position: absolute; inset: 0; background: var(--gold); transform: translateX(-100%); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
.register-btn span { position: relative; z-index: 1; }
.register-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(24,21,15,0.12); }
.register-btn:hover::before { transform: translateX(0); }
.register-rule-btm { width: 1px; height: 60px; background: var(--ink-15); margin: 44px auto 0; }

/* Member count box (lives inside register section) */
.member-count-box { display: inline-flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 40px; }
.member-count-num { font-family: var(--serif); font-size: 52px; font-weight: 300; color: var(--gold); line-height: 1; }
.member-count-lbl { font-family: var(--sans); font-size: 8px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-30); }
```

- [ ] **Step 5: Replace Footer CSS**

Remove all `.footer-hero`, `.footer-wordmark-wrap`, `.footer-big-name`, `.footer-eyebrow`, `.footer-coords*`, `.footer-cta-*`, `.footer-grid`, `.footer-brand-*`, `.footer-col-*`, `.footer-links`, `.footer-bottom`, `.footer-copy`, `.footer-meta`, `#join`, `.join-*` rules. Add:

```css
/* ══════════════════════════════
   FOOTER
══════════════════════════════ */
footer {
  padding: 60px 0 36px; background: var(--cream-deep);
  border-top: 1px solid var(--ink-15); position: relative; overflow: hidden;
}
footer::before {
  content: 'MERIDIAN'; position: absolute; bottom: -24px; left: 50%; transform: translateX(-50%);
  font-family: var(--sans); font-size: 160px; font-weight: 700;
  letter-spacing: 0.3em; white-space: nowrap;
  color: transparent; -webkit-text-stroke: 1px rgba(24,21,15,0.04);
  user-select: none; pointer-events: none;
}
.footer-inner { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 48px; position: relative; z-index: 1; }
.footer-wordmark { font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: var(--ink); margin-bottom: 6px; }
.footer-tagline { font-family: var(--serif); font-size: 14px; font-style: italic; color: var(--ink-55); }
.footer-note { font-family: var(--sans); font-size: 8px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-30); margin-top: 10px; }
.footer-links { display: flex; gap: 64px; }
.footer-col-title { font-family: var(--sans); font-size: 8.5px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-30); margin-bottom: 16px; }
.footer-col a { display: block; font-family: var(--serif); font-size: 15px; color: var(--ink-75); text-decoration: none; margin-bottom: 8px; transition: color 0.2s, padding-left 0.2s; }
.footer-col a:hover { color: var(--ink); padding-left: 4px; }
.footer-bottom { display: flex; align-items: center; justify-content: space-between; padding-top: 24px; border-top: 1px solid var(--ink-08); position: relative; z-index: 1; }
.footer-copy { font-family: var(--sans); font-size: 8.5px; font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-30); }
```

- [ ] **Step 6: Replace responsive + accessibility CSS**

Remove all existing `@media` blocks, `@media print`, `@media (prefers-reduced-motion)` blocks. Replace with:

```css
/* ══════════════════════════════
   RESPONSIVE
══════════════════════════════ */
@media (max-width: 1100px) {
  .hero { padding: 80px 40px 0; }
  .about-layout { grid-template-columns: 1fr; }
  .about-left { padding-right: 0; border-right: none; border-bottom: 1px solid var(--ink-15); padding-bottom: 48px; position: static; }
  .about-right { padding-left: 0; padding-top: 48px; }
  .who-top { grid-template-columns: 1fr; gap: 32px; }
  .who-grid { grid-template-columns: repeat(2, 1fr); }
  .not-layout { grid-template-columns: 1fr; gap: 0; }
  .not-left { padding-right: 0; border-right: none; border-bottom: 1px solid var(--ink-15); padding-bottom: 52px; margin-bottom: 52px; }
  .not-right { padding-left: 0; }
  .event-card { grid-template-columns: 1fr; }
  .event-main { border-right: none; border-bottom: 1px solid var(--ink-15); }
  .speaking-layout { grid-template-columns: 1fr; gap: 0; }
  .speaking-left { padding-right: 0; border-right: none; border-bottom: 1px solid var(--ink-15); padding-bottom: 52px; margin-bottom: 52px; }
  .speaking-right { padding-left: 0; }
  .hero-stats { grid-template-columns: repeat(2, 1fr); }
  .footer-links { gap: 36px; }
  .wrap { padding: 0 40px; }
}

@media (max-width: 700px) {
  .hero { padding: 80px 20px 0; }
  .wrap { padding: 0 20px; }
  .about { padding: 80px 0; }
  .who { padding: 80px 0; }
  .not-sec { padding: 80px 0; }
  .events { padding: 80px 0; }
  .speaking { padding: 80px 0; }
  .register { padding: 80px 0; }
  .hero-stats { grid-template-columns: 1fr 1fr; }
  .stat { padding: 18px 20px; }
  .stat-val { font-size: 20px; }
  .hero-actions { flex-wrap: wrap; gap: 16px; }
  .btn-primary { width: 100%; justify-content: center; text-align: center; display: block; padding: 13px 24px; }
  .btn-ghost-link { display: none; }
  .hero-ig-btn { width: 44px; }
  .who-grid { grid-template-columns: 1fr; }
  .footer-inner { flex-direction: column; gap: 36px; }
  .footer-links { gap: 24px; }
  .footer-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }
  .sticky-join { display: block; bottom: calc(1.4rem + env(safe-area-inset-bottom, 0px)); }
  .rv { transform: none; transition: opacity 0.4s ease; }
  .rv[data-d="1"], .rv[data-d="2"], .rv[data-d="3"], .rv[data-d="4"] { transition-delay: 0s; }
}

@media (prefers-reduced-motion: reduce) {
  .rv, .hero-eyebrow, .hero-pre, .hero-title, .hero-sub, .hero-hr, .hero-stats {
    opacity: 1 !important; transform: none !important; animation: none !important;
  }
}

@media print {
  .progress, .arc-btn, .sticky-join, .hamburger, .mob-backdrop, .mob-drawer { display: none !important; }
  nav { position: static; }
  body { background: #fff; color: #000; }
}
```

- [ ] **Step 7: Verify the page loads cleanly**

Open in browser. All CSS should now be in place. HTML body still needs updating in Tasks 6–10.

- [ ] **Step 8: Commit**

```bash
git add index.html
git commit -m "feat(index): not, events, speaking, register, footer, responsive CSS"
```

---

## Task 6: index.html — BODY: Shared elements + Nav

**Files:**
- Modify: `index.html` — `<body>` open through `</nav>`

The existing `<body>` starts with `.skip-link`, `#progressBar`, `#arcBtn`, `#stickyJoin`, then `<nav>`. Rewrite this block.

- [ ] **Step 1: Replace the body open + shared fixed elements**

Replace everything from `<body>` through the end of `</nav>` with:

```html
<body>

<a href="#main-content" class="skip-link">Skip to content</a>
<div class="progress" id="progressBar" aria-hidden="true"></div>

<!-- Arc back-to-top -->
<button class="arc-btn" id="arcBtn" aria-label="Back to top">
  <svg viewBox="0 0 52 52" fill="none">
    <circle class="arc-track" cx="26" cy="26" r="22"/>
    <circle class="arc-fill" cx="26" cy="26" r="22" id="arcFill"/>
  </svg>
  <div class="arc-inner"><span class="arc-icon">↑</span></div>
</button>

<!-- Mobile sticky register CTA -->
<a href="#" target="_blank" rel="noopener noreferrer"
   class="sticky-join" id="stickyJoin" data-register aria-label="Register as a member">Register</a>
<p class="noscript-register-note" style="display:none; font-size:0.85em; margin-top:0.5rem;">
  <a href="https://docs.google.com/forms/d/1qThcXHxzfuW4uNVkZbHGhHwlDsy8x-YGtpHpOLnqTl4/viewform"
     target="_blank" rel="noopener noreferrer">Register directly</a>
</p>

<!-- NAV -->
<nav id="mainNav" role="navigation" aria-label="Main navigation">
  <div class="nav-inner">
    <a href="/" class="nav-logo" aria-label="The Meridian Society — home">
      <span class="nav-wordmark">The Meridian Society</span>
    </a>
    <ul class="nav-links" role="list">
      <li><a href="#about">About</a></li>
      <li><a href="/events.html">Events</a></li>
      <li><a href="#speaking">Get Involved</a></li>
      <li><a href="#register">Membership</a></li>
    </ul>
    <a href="#" target="_blank" rel="noopener noreferrer" class="nav-cta" data-register>
      <span>Register</span>
    </a>
    <button class="hamburger" id="burgerBtn"
            aria-label="Open navigation" aria-expanded="false" aria-controls="mobileMenu">
      <span></span><span></span>
    </button>
  </div>
</nav>
```

- [ ] **Step 2: Load in browser**

Nav should render in cream with dark text. Mobile hamburger present. No console errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(index): new body open — shared elements and cream nav"
```

---

## Task 7: index.html — BODY: Hero section

**Files:**
- Modify: `index.html` — hero `<section>`

- [ ] **Step 1: Replace the entire hero section**

Remove everything from `<!-- ═══════════ HERO ═══════════ -->` through `</section>` (the globe canvas, vignette, rail, hero-content, hero-stats). Replace with:

```html
<!-- HERO -->
<section class="hero" id="hero" aria-label="Hero" id="main-content">
  <!-- Ghost "M" letterform — parallax via JS -->
  <div class="hero-ghost" id="heroGhost" aria-hidden="true">M</div>

  <div class="hero-content">
    <div class="hero-eyebrow" aria-hidden="true">
      <span class="hero-eyebrow-rule"></span>
      <span class="hero-eyebrow-text" id="hero-speakable">An Independent Student Organization &nbsp;·&nbsp; Ottawa &nbsp;·&nbsp; Est. 2025</span>
      <span class="hero-eyebrow-rule"></span>
    </div>
    <p class="hero-pre">A Place For</p>
    <h1 class="hero-title" id="heroTitle">DISCOURSE</h1>
    <div class="hero-hr" aria-hidden="true"></div>
    <p class="hero-sub">Bringing curious students together with the professionals, alumni, and scholars who can expand their world.</p>
    <div class="hero-actions">
      <a href="#" target="_blank" rel="noopener noreferrer" class="btn-primary" data-register>
        <span>Register for Updates</span>
      </a>
      <span aria-hidden="true" style="width:1px;height:18px;background:var(--ink-15)"></span>
      <a href="/events.html" class="btn-ghost-link">Explore Events &nbsp;&#8594;</a>
      <span aria-hidden="true" style="width:1px;height:18px;background:var(--ink-15)"></span>
      <a href="https://www.instagram.com/Meridian.Society" class="hero-ig-btn"
         aria-label="The Meridian Society on Instagram" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
    </div>
  </div>

  <!-- Stats bar — pinned to hero bottom by flex margin-top: auto -->
  <div class="hero-stats" role="list" aria-label="Key facts">
    <div class="stat" role="listitem">
      <div class="stat-val">3</div>
      <div class="stat-lbl">Universities &amp; Colleges</div>
    </div>
    <div class="stat" role="listitem">
      <div class="stat-val">Ottawa</div>
      <div class="stat-lbl">Based At Carleton</div>
    </div>
    <div class="stat" role="listitem">
      <div class="stat-val">Fall '26</div>
      <div class="stat-lbl">Inaugural Event</div>
    </div>
    <div class="stat" role="listitem">
      <div class="stat-val">Est. 2025</div>
      <div class="stat-lbl">Independent Organization</div>
    </div>
  </div>
</section>
```

> **Note:** `id="main-content"` is on the `<section>`, not `<main>`, to maintain the skip-link target. The `id="hero-speakable"` on the eyebrow text matches the JSON-LD speakable selector.

- [ ] **Step 2: Load in browser**

Hero should render with DISCOURSE title, eyebrow, subtitle, CTA row with Instagram button, and stats bar at the bottom of the viewport.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(index): new hero section — ghost M, DISCOURSE title, stats bar, Instagram CTA"
```

---

## Task 8: index.html — BODY: Marquee + About + Who

**Files:**
- Modify: `index.html` — sections after `</section>` (hero) through Who

- [ ] **Step 1: Replace the marquee HTML**

Remove the existing `.marquee` + `.marquee-track` block. Replace with:

```html
<!-- MARQUEE -->
<div class="marquee-wrap" aria-hidden="true">
  <div class="marquee-track" data-static="true">
    <span class="m-item">The Meridian Society</span><span class="m-gem">◆</span><span class="m-item">Ottawa</span><span class="m-gem">◆</span><span class="m-item">Est. 2025</span><span class="m-gem">◆</span><span class="m-item">Student-Run</span><span class="m-gem">◆</span><span class="m-item">Carleton University</span><span class="m-gem">◆</span><span class="m-item">uOttawa</span><span class="m-gem">◆</span><span class="m-item">Algonquin College</span><span class="m-gem">◆</span><span class="m-item">The Meridian Society</span><span class="m-gem">◆</span><span class="m-item">Ottawa</span><span class="m-gem">◆</span><span class="m-item">Est. 2025</span><span class="m-gem">◆</span><span class="m-item">Student-Run</span><span class="m-gem">◆</span><span class="m-item">Carleton University</span><span class="m-gem">◆</span><span class="m-item">uOttawa</span><span class="m-gem">◆</span><span class="m-item">Algonquin College</span><span class="m-gem">◆</span>
  </div>
</div>
```

- [ ] **Step 2: Replace the About section**

Remove the entire existing `#about` section. Replace with:

```html
<!-- ABOUT -->
<section class="about" id="about" aria-labelledby="about-heading">
  <div class="wrap about-layout">
    <div class="about-left rv">
      <span class="about-num" aria-hidden="true">01</span>
      <div class="about-section-label">About</div>
      <h2 class="about-title" id="about-heading">A Room<br>With the<br><em>Right People.</em></h2>
    </div>
    <div class="about-right">
      <p class="about-body rv" id="about-speakable">The Meridian Society is an independent, student-run organization based at Carleton University. We exist to connect motivated students with the professionals, alumni, and scholars who can expand their world, and to build a community of genuinely curious people.</p>
      <p class="about-body rv" data-d="1">Through events, open conversations, and gatherings of all kinds, we help our members orient themselves in an increasingly complex world. Not an extension of any institution. Something built, owned, and run entirely by students.</p>
      <div class="pull-quote rv" data-d="2">
        <p>"We cannot promise outcomes, but we can provide access, exposure, and orientation to people and their ideas."</p>
      </div>
      <a href="/team.html" class="text-link rv" data-d="3">Meet the Team &nbsp;&#8594;</a>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Replace the Who We Gather section**

Remove the entire existing `#who` section. Replace with:

```html
<!-- WHO WE GATHER -->
<section class="who" id="who" aria-labelledby="who-heading">
  <div class="wrap">
    <div class="who-top">
      <h2 class="who-title rv" id="who-heading">Who We<br><em>Gather.</em></h2>
      <p class="who-intro-body rv" data-d="1">The Society brings together thoughtful people at all stages: from students still finding their footing to professionals and scholars with something worth sharing.</p>
    </div>
    <div class="who-grid">
      <div class="who-item rv" data-num="01">
        <div class="who-num">01</div>
        <div class="who-item-title">Students &amp; Alumni</div>
        <p class="who-item-desc">Motivated, curious individuals from Carleton University, uOttawa, and Algonquin College, and anyone drawn to the work we do.</p>
      </div>
      <div class="who-item rv" data-d="1" data-num="02">
        <div class="who-num">02</div>
        <div class="who-item-title">Speakers &amp; Professionals</div>
        <p class="who-item-desc">People across law, business, policy, media, and beyond, with lived experience and a story worth telling.</p>
      </div>
      <div class="who-item rv" data-d="2" data-num="03">
        <div class="who-num">03</div>
        <div class="who-item-title">Scholars &amp; Thinkers</div>
        <p class="who-item-desc">Academics and researchers whose work challenges assumptions, opens new territory, and gives students something to think about.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Load in browser and verify**

Marquee scrolls. About and Who sections render with correct layout and scroll-reveal on first visit.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat(index): marquee, about, who sections"
```

---

## Task 9: index.html — BODY: What We Are Not + Events

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the "What We Are Not" section**

Remove the existing `#not` section. Replace with:

```html
<!-- WHAT WE ARE NOT -->
<section class="not-sec" id="not" aria-labelledby="not-heading">
  <div class="wrap not-layout">
    <div class="not-left">
      <div class="sec-label rv">What We Are Not</div>
      <h2 class="not-title rv" data-d="1" id="not-heading">Intentionally<br>Not for Everyone.</h2>
      <p class="not-body rv" data-d="2">We are not a resume workshop, a pitch competition, or a networking event. We have no political agenda and no exclusive membership criteria. We are student-run and independent. What we offer is simple: a room with the right people, and the willingness to listen.</p>
    </div>
    <div class="not-right">
      <div class="not-list-header rv">Not</div>
      <ul class="not-list" aria-label="What the Society is not">
        <li class="rv">A resume workshop or career placement office</li>
        <li class="rv" data-d="1">A political advocacy or activism group</li>
        <li class="rv" data-d="2">A startup incubator or pitch competition</li>
        <li class="rv" data-d="3">A closed, elite, invitation-only circle</li>
        <li class="rv" data-d="4">A networking event with business cards</li>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Replace the Events Teaser section**

Remove the existing `#first-event` section. Replace with:

```html
<!-- EVENTS TEASER -->
<section class="events" id="events" aria-labelledby="events-heading">
  <div class="wrap">
    <div class="events-header">
      <h2 class="events-title rv" id="events-heading">Upcoming<br><em>Events.</em></h2>
      <a href="/events.html" class="text-link rv" data-d="1">All Events &nbsp;&#8594;</a>
    </div>
    <div class="event-card rv" data-d="1">
      <div class="event-main">
        <div class="event-status">
          <span class="event-dot" aria-hidden="true"></span>
          Registration Open
        </div>
        <h3 class="event-title">Our <em>First Event</em><br>is Coming.</h3>
        <p class="event-desc">The Meridian Society's inaugural event brings together Ottawa's student community with professionals and scholars for an evening of open conversation.</p>
        <div class="event-tags" aria-label="Event tags">
          <span class="event-tag">Speaker Event</span>
          <span class="event-tag">Open Conversation</span>
          <span class="event-tag">Ottawa</span>
        </div>
      </div>
      <div class="event-meta" aria-label="Event details">
        <div class="event-meta-row">
          <div class="meta-lbl">When</div>
          <div class="meta-val">Fall 2026</div>
        </div>
        <div class="event-meta-row">
          <div class="meta-lbl">Where</div>
          <div class="meta-val">Ottawa, Canada</div>
        </div>
        <div class="event-meta-row">
          <div class="meta-lbl">Format</div>
          <div class="meta-val">Speaker &amp; Open Conversation</div>
        </div>
        <div class="event-meta-row">
          <div class="meta-lbl">Entry</div>
          <div class="meta-val">Registered Members</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Load in browser**

Both sections should render. "Not" list items show `×` marker. Event card shows meta table.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat(index): what we are not and events teaser sections"
```

---

## Task 10: index.html — BODY: Get Involved + Register + Footer

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the Speaking / Get Involved section**

Remove the existing `#speaking` section. Replace with:

```html
<!-- GET INVOLVED -->
<section class="speaking" id="speaking" aria-labelledby="speaking-heading">
  <div class="wrap speaking-layout">
    <div class="speaking-left">
      <div class="sec-label rv">Get Involved</div>
      <h2 class="speaking-title rv" data-d="1" id="speaking-heading">Have a Story<br>Worth <em>Sharing?</em></h2>
      <p class="speaking-sub rv" data-d="2">We'd love to hear from you.</p>
      <p class="speaking-body rv" data-d="2">Whether you want to speak, collaborate, or simply get involved, The Meridian Society is always looking to grow its circle of people worth knowing.</p>
      <a href="mailto:meridiansocietycanada@gmail.com" class="text-link rv" data-d="3">Get in Touch &nbsp;&#8594;</a>
    </div>
    <div class="speaking-right">
      <div class="sec-label rv" style="margin-bottom:20px;">What We Host</div>
      <ul class="formats-list" aria-label="Event formats we host">
        <li class="formats-item rv"><span class="formats-num">01</span><span class="formats-text">Formal presentations &amp; keynotes</span></li>
        <li class="formats-item rv" data-d="1"><span class="formats-num">02</span><span class="formats-text">Open conversations &amp; Q&amp;A</span></li>
        <li class="formats-item rv" data-d="2"><span class="formats-num">03</span><span class="formats-text">Career pathway talks</span></li>
        <li class="formats-item rv" data-d="3"><span class="formats-num">04</span><span class="formats-text">Panel discussions</span></li>
        <li class="formats-item rv" data-d="4"><span class="formats-num">05</span><span class="formats-text">Social gatherings &amp; community events</span></li>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Replace the Register / Membership section**

Remove the existing `#register` section and `#join` strip. Replace with:

```html
<!-- REGISTER -->
<section class="register" id="register" aria-labelledby="register-heading">
  <div class="register-ghost" aria-hidden="true">MERIDIAN</div>
  <div class="wrap">
    <div class="register-rule-top" aria-hidden="true"></div>
    <p class="register-eyebrow rv">Independent &nbsp;·&nbsp; Student-Run &nbsp;·&nbsp; Ottawa &nbsp;·&nbsp; Est. 2025</p>
    <h2 class="register-title rv" data-d="1" id="register-heading">Become a<br><em>Member.</em></h2>
    <!-- Live member count — populated by inline script -->
    <div class="member-count-box rv" data-d="1" id="memberCountBox" aria-live="polite">
      <span class="member-count-num" id="memberCountNum">—</span>
      <span class="member-count-lbl">Members Registered</span>
    </div>
    <p class="register-body rv" data-d="2" id="register-speakable">Membership puts you in the room. Register to stay informed, attend events, and become part of a community built around curiosity and conversation.</p>
    <div class="register-actions rv" data-d="3">
      <a href="#" target="_blank" rel="noopener noreferrer" class="register-btn" data-register>
        <span>Register for Updates</span>
      </a>
    </div>
    <div class="register-rule-btm" aria-hidden="true"></div>
  </div>
</section>
```

- [ ] **Step 3: Replace the Footer**

Remove the existing `<footer>` block (all of it including `.footer-hero`, `.footer-grid`, etc.). Replace with:

```html
<!-- FOOTER -->
<footer>
  <div class="wrap">
    <div class="footer-inner">
      <div>
        <div class="footer-wordmark">The Meridian Society</div>
        <div class="footer-tagline">Ottawa &middot; Est. 2025</div>
        <div class="footer-note">Operating out of Carleton University</div>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <div class="footer-col-title">Pages</div>
          <a href="/">Home</a>
          <a href="/events.html">Events</a>
          <a href="/team.html">Team</a>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">Connect</div>
          <a href="https://www.instagram.com/Meridian.Society" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://linktr.ee/meridiansociety" target="_blank" rel="noopener noreferrer">Linktree</a>
          <a href="mailto:meridiansocietycanada@gmail.com">Email</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">&copy; 2025 The Meridian Society &nbsp;·&nbsp; Independent Student Organization</span>
      <span class="footer-copy">Carleton &nbsp;·&nbsp; uOttawa &nbsp;·&nbsp; Algonquin College</span>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Add `events-data.min.js` script tag before closing `</body>`**

At the bottom of `<body>`, before `</body>`, ensure this line exists (move it from `<head>` where it was removed in Task 2):

```html
<script src="/js/events-data.min.js"></script>
```

- [ ] **Step 5: Load in browser**

Full page from hero to footer should render. Check that the register section has correct background and ghost watermark. Footer is on-theme (cream-deep).

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat(index): get involved, register, and footer sections"
```

---

## Task 11: index.html — Inline JS

**Files:**
- Modify: `index.html` — the existing `<script>` block at the bottom of `<body>`

The existing inline script contains: active nav detection, who-row accordion, member count fetch, Three.js globe init. Replace it entirely.

> **Note:** `site.js` already handles: scroll reveal (`.rv`), nav `.scrolled` class, arc button visibility + progress ring, sticky join, mobile menu. The inline script handles only: hero tilt, ghost parallax, member count, active nav link.

- [ ] **Step 1: Remove the old inline `<script>` block completely**

Delete the entire existing `<script>...</script>` block at the bottom of `<body>` (including globe init, accordion, member count, nav active detection).

- [ ] **Step 2: Add the new inline script**

```html
<script>
  // ── Active nav link ──
  (function() {
    var path = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(function(a) {
      if (a.getAttribute('href') === path) a.classList.add('nav-active');
    });
  }());

  // ── Hero mouse-tilt (3D rotation on mousemove) ──
  (function() {
    var hero  = document.querySelector('.hero');
    var title = document.getElementById('heroTitle');
    if (!hero || !title) return;
    hero.addEventListener('mousemove', function(e) {
      var r  = hero.getBoundingClientRect();
      var dx = (e.clientX - r.left - r.width  / 2) / r.width;
      var dy = (e.clientY - r.top  - r.height / 2) / r.height;
      title.style.transform  = 'perspective(1200px) rotateY(' + (dx * 3) + 'deg) rotateX(' + (-dy * 2) + 'deg)';
      title.style.transition = 'transform 0.1s linear';
    });
    hero.addEventListener('mouseleave', function() {
      title.style.transform  = 'none';
      title.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    });
  }());

  // ── Hero ghost parallax (scroll-driven translateY) ──
  // site.js scroll handler does not know about heroGhost, so we add it here.
  // Uses passive listener; piggybacks on the existing RAF pattern via a simple
  // direct update (low cost — single transform on a non-layout element).
  (function() {
    var ghost = document.getElementById('heroGhost');
    if (!ghost) return;
    window.addEventListener('scroll', function() {
      ghost.style.transform = 'translateX(-50%) translateY(' + (window.scrollY * 0.22) + 'px)';
    }, { passive: true });
  }());

  // ── Live member count ──
  (function() {
    var el = document.getElementById('memberCountNum');
    if (!el) return;
    fetch('https://script.google.com/macros/s/AKfycbzrW7eGHIqTMQDgRh8Ii6m_7vW1wSW1b6r_JlQIzYCWu55Mq5jBbhymN9aTy62tspI/exec')
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (d && typeof d.count === 'number') el.textContent = d.count;
      })
      .catch(function() {
        console.warn('Member count unavailable');
        el.textContent = '\u2014'; // em dash fallback
      });
  }());
</script>
```

> **Important:** The Google Apps Script URL above is the one already in the current `index.html`. Verify it matches `index.html` before this task — search for `script.google.com` in the current file.

- [ ] **Step 3: Verify the Google Apps Script URL**

In the current `index.html`, find the existing `fetch(` call for member count and copy the exact URL into the new script above. The URL in this plan is a placeholder from the CLAUDE.md description — replace with the actual URL.

- [ ] **Step 4: Load in browser and test**

- Move mouse over the hero title — it should tilt in 3D
- Scroll down — ghost "M" should move upward (parallax)
- Scroll past 200px — arc back-to-top button should appear
- Check browser console for member count fetch (may show count or warn if endpoint is unreachable in dev)

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat(index): inline JS — hero tilt, ghost parallax, member count"
```

---

## Task 12: Build, audit, and final commit

**Files:**
- Run build: `package.json` scripts

- [ ] **Step 1: Run the full build**

```bash
npm run build
```

Expected: `css/base.min.css`, `css/nav.min.css`, `js/site.min.js` regenerated. No errors. (Note: `index.html` inline CSS is not minified by the build — it's served as-is, which is acceptable for a single page.)

- [ ] **Step 2: Verify events.html and team.html are unaffected**

Open both pages in a browser. They should render identically to before this overhaul. Their dark glassmorphism nav, page headers, and marquees should all work.

- [ ] **Step 3: Audit the homepage**

Check each item in this list:

- [ ] All 7 JSON-LD blocks present in `<head>` (search for `@type` in the file — should find at least 7)
- [ ] `dateModified` updated to `2026-04-10`
- [ ] `speakable` selectors (`#hero-speakable`, `#about-speakable`, `#register-speakable`) all exist as element IDs in the HTML body
- [ ] `data-register` attribute on nav CTA, hero CTA, sticky join, register button
- [ ] Skip link (`#main-content`) points to a valid element
- [ ] Arc button (`#arcBtn`, `#arcFill`) present in HTML
- [ ] `#progressBar` present
- [ ] `#stickyJoin` present
- [ ] No inline `onclick` attributes anywhere (CSP blocks them)
- [ ] No `console.log` left in inline script
- [ ] Ghost parallax, tilt, and scroll reveal working in browser

- [ ] **Step 4: Update sitemap.xml `lastmod`**

In `sitemap.xml`, update the `<lastmod>` for the homepage URL to `2026-04-10`.

```bash
# Open sitemap.xml and update the homepage entry lastmod date
```

- [ ] **Step 5: Final commit**

```bash
git add index.html sitemap.xml
git commit -m "feat: homepage UI overhaul complete — cream/ink design, all SEO preserved"
```

- [ ] **Step 6: Push and verify on Vercel**

```bash
git push origin main
```

Wait for Vercel deploy to complete (usually 1–2 minutes). Open `https://meridiansociety.ca` and verify the live site matches expectations. Check the browser network tab — confirm `base.min.css`, `nav.min.css`, `site.min.js` are all loading.

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered by task |
|---|---|
| New design tokens | Task 2 |
| Nav cream theme | Task 3 |
| Hero: ghost M, DISCOURSE, mouse-tilt, parallax | Tasks 3, 7, 11 |
| Marquee: ink bg, static items, seamless loop | Tasks 4, 8 |
| Stats bar: 4 stats, no "Free" | Task 7 |
| About: two-column, pull quote, textures | Tasks 4, 8 |
| Who: 3-column card grid | Tasks 4, 8 |
| Not: ×-list, "Not" header | Tasks 5, 9 |
| Events: card with meta table, status dot | Tasks 5, 9 |
| Get Involved: "What We Host" list | Tasks 5, 10 |
| Register: cream-mid bg, ghost watermark | Tasks 5, 10 |
| Footer: cream-deep, on-theme | Tasks 5, 10 |
| Scroll reveal | Tasks 4 (CSS), site.js already handles |
| Arc button: cream restyle | Task 3 |
| Instagram CTA in hero | Task 7 |
| Sticky join | Tasks 3, 6 |
| Live member count | Task 10 (HTML), Task 11 (JS) |
| All 7 JSON-LD blocks | Task 2 |
| SEO meta, OG, Twitter, geo, hreflang | Task 2 |
| `prefers-reduced-motion` | Task 5 |
| Accessibility: aria-label, skip link | Tasks 6, 7, 8, 9, 10 |
| `data-static` marquee guard | Task 1 |
| `npm run build` + Vercel deploy | Task 12 |

**Gaps found and addressed:**
- Member count box added to Register section HTML in Task 10 (was in spec §9 but not initially in HTML plan)
- `events-data.min.js` moved from `<head>` to end of `<body>` in Task 10 (correct location per CLAUDE.md)
- Google Apps Script URL flagged for manual verification in Task 11
