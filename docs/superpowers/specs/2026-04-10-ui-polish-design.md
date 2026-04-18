# UI Polish & Mobile Fix — Design Spec
**Date:** 2026-04-10
**Scope:** index.html, events.html, team.html, css/nav.css, js/site.js
**Phases:** Option 1 (mobile fixes) → Option 2 (desktop polish/interactions)

---

## Goals

- Fix specific mobile layout and spacing defects across all pages
- Elevate existing desktop interactions to feel more premium and physically alive
- No new sections or components — surgical changes to existing elements only
- All changes must respect `prefers-reduced-motion` and not regress the existing reduced-motion handling

---

## Phase 1 — Mobile Fixes (≤700px unless noted)

### 1.1 Hero typographic hierarchy (`index.html`)
**Problem:** `hero-pre` ("A Place For") at `clamp(22px, 3vw, 38px)` lands at ~22px on phones — too close in weight to the `hero-sub` below it. The three-layer hierarchy (pre → title → sub) collapses.
**Fix:** In the `@media (max-width: 700px)` block, override `hero-pre` to `font-size: clamp(17px, 3vw, 30px)`. No other hero changes needed — title floor (76px) and sub (width:100%) are already correct.

### 1.2 Stats bar row separator (`index.html`)
**Problem:** 4-stat grid collapses to 2×2. No horizontal rule separates the top row (Universities / Ottawa) from the bottom row (Fall '26 / Est. 2025) — the two rows bleed together.
**Fix:** At `≤700px` add `border-top: 1px solid var(--ink-08)` to `.stat:nth-child(3)` and `.stat:nth-child(4)`. Matches the existing column dividers. Grid reads as a proper 2×2 table.
**Also:** `stat-lbl` is 8px/0.24em tracking at mobile — illegibly small at phone density. Bump to `font-size: 9px; letter-spacing: 0.18em` at `≤700px`.

### 1.3 Event card meta panel (`index.html`, `≤700px`)
**Problem:** When the event card stacks to single-column, the meta panel sits below the main content with no visual distinction — it reads as a continuation rather than a separate "info panel".
**Fix:** At `≤700px`:
- Reduce `.event-meta-row` padding from `22px 28px` to `16px 20px`
- Add `background: rgba(24,21,15,0.025)` to `.event-meta` — faint tint distinguishes it from the cream main panel above

### 1.4 Register ghost text overflow (`index.html`)
**Problem:** `.register-ghost` "MERIDIAN" has `font-size: 180px; white-space: nowrap`. On small screens the absolute-positioned text overflows the container despite `overflow: hidden` on `.register`.
**Fix:** Change to `font-size: clamp(60px, 30vw, 180px)`. Scales proportionally — still visible as a texture element at all viewport widths.

### 1.5 Section vertical padding (`index.html`)
**Problem:** `.about`, `.who`, `.not-sec`, `.speaking`, `.register` all use `padding: 80px 0` at `≤700px`. Stacked, the cumulative whitespace between sections feels excessive on small screens.
**Fix:** Reduce to `padding: 64px 0` for all five sections at `≤700px`. The `.events` section retains `80px 0` (background color change benefits from more breathing room).

### 1.6 Who-grid ghost number clip (`index.html`, `≤700px`)
**Problem:** The `::before` pseudo-element ghost number (120px serif, absolute bottom-right) overflows the card boundary on single-column mobile layout where cards are shorter.
**Fix:** Add `overflow: hidden` to `.who-item` at `≤700px`. Clips the ghost number within its card.

---

## Phase 2 — Desktop Polish & Interactions

### 2.1 Hero title tilt — smoother exit (`index.html` inline script)
**Problem:** Mouse-leave transition uses `transform 0.6s cubic-bezier(0.16,1,0.3,1)` — overshoots on fast mouse-outs, feels abrupt.
**Fix:** Change leave transition to `transform 0.8s cubic-bezier(0.16,1,0.3,1)`. Longer settle, softer return — the title feels like it has physical weight.

### 2.2 Pull-quote gold accent — animated bar (`index.html` inline styles)
**Problem:** `border-left-width` animates from 2px→4px on hover, but CSS cannot interpolate border-width — it jumps instantly despite the declared transition.
**Fix:** Remove the border-left-width animation. Instead:
- Set `.pull-quote` border-left to permanent `2px solid var(--ink-08)` (structural only)
- Add `.pull-quote::before`: `position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--gold); transform: scaleY(0.35); transform-origin: bottom; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); pointer-events: none`
- On `.pull-quote:hover::before`: `transform: scaleY(1)`
- `.pull-quote` needs `position: relative` (already has it via the existing hover transform)
The gold bar grows upward from the bottom on hover — far more intentional than a width jump.

### 2.3 Who-grid hover shadow depth (`index.html` inline styles)
**Problem:** Hover shadow `0 8px 40px rgba(24,21,15,0.08)` is too subtle against cream-mid background — the lift registers visually but the shadow does not reinforce it.
**Fix:**
- Increase hover shadow to `0 12px 48px rgba(24,21,15,0.11)`
- Add `transition-delay` asymmetry: shadow fades out with a `0.06s` delay on hover-out (the "hang" as shadow releases) while hover-in is instant. Achieved by setting the default `.who-item` transition to `background 0.35s, transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s 0.06s` and the hover state to `transition: background 0.35s, transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s 0s`.

### 2.4 About section ghost number — stronger gold reveal (`index.html` inline styles)
**Problem:** `.about-left:hover .about-num` transitions stroke color to `rgba(184,147,42,0.25)` — nearly invisible, the interaction doesn't register.
**Fix:**
- Change hover stroke to `rgba(184,147,42,0.45)` — still restrained, actually visible
- Add `letter-spacing` shift: default `-0.04em`, hover `-0.06em`. A 0.02em tighten on hover creates a subtle "snap" that makes the number feel reactive.

### 2.5 Stat bar gold underline — proper spring timing (`index.html` inline styles)
**Problem:** `.stat::after` gold underline scaleX is caught in the parent's `transition: background 0.3s` declaration with no explicit transform timing of its own. Animates linearly.
**Fix:** Add explicit `transition: transform 0.4s cubic-bezier(0.16,1,0.3,1)` to `.stat::after`. Gold line springs out instead of sweeping linearly.

### 2.6 Nav CTA — compositor promotion (`index.html`, `events.html`, `team.html` inline styles / nav.css)
**Problem:** The 3D `perspective(1000px) translateY(-3px) rotateX(1deg)` hover on `.nav-cta` can cause adjacent nav elements to shift slightly due to the transform affecting layout flow.
**Fix:** Add `will-change: transform` to `.nav-cta` in `nav.css`. Promotes the element to its own compositor layer — the 3D transform no longer affects surrounding layout.

### 2.7 Formats list — layout-thrash fix (`index.html` inline styles)
**Problem:** `.formats-item:hover` shifts `padding-left: 12px` — a layout-affecting property that triggers reflow on every frame of the hover transition.
**Fix:** Remove `padding-left` from the hover state. Instead, add `transform: translateX(12px)` to `.formats-item` on hover. Apply `transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-bottom-color 0.2s` to `.formats-item`. Same visual result, compositor-only, no reflow.

### 2.8 Register ghost — scroll parallax (`index.html` inline script)
**Problem:** `.register-ghost` "MERIDIAN" is static. The hero ghost M has scroll parallax (0.22 multiplier) but the register section has no depth.
**Fix:** Add scroll listener (passive) to the existing inline script. On scroll: `registerGhost.style.transform = 'translateX(-50%) translateY(' + (window.scrollY * 0.08) + 'px)'`. Multiplier 0.08 — subtle depth, almost imperceptible but rewards close attention. Must null-check `registerGhost` element.

### 2.9 Footer MERIDIAN — scroll parallax (`index.html`, `events.html`, `team.html` inline scripts / site.js)
**Problem:** Footer `::before` MERIDIAN watermark is a CSS pseudo-element — cannot be targeted by JS directly. The watermark is static.
**Fix:** Add a `<span class="footer-ghost" aria-hidden="true">MERIDIAN</span>` as a real DOM element inside `<footer>` on all three pages. Style it identically to the current `footer::before` pseudo-element (same font, size, position, stroke, z-index). Remove the `footer::before` rule from all three page inline `<style>` blocks (index.html, events.html, team.html). The real element can then receive scroll-driven `translateY(scrollY * 0.05)` parallax via `site.js` (null-checked, runs on all pages). Multiplier 0.05 — very low since footer scroll delta is large by page bottom.

### 2.10 Event card hover — spring lift (`index.html`, `events.html` inline styles)
**Problem:** `transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s` uses the same curve for both. The lift and the shadow feel identical in character.
**Fix:** Split the transitions:
- Transform: `0.45s cubic-bezier(0.34,1.56,0.64,1)` — spring with slight overshoot (card bounces up)
- Box-shadow: `0.4s ease` — smooth follow (light doesn't bounce)
The card lifts with spring physics, the shadow follows naturally. Premium micro-interaction pattern.

---

## Files Changed

| File | Phase | Changes |
|------|-------|---------|
| `index.html` inline `<style>` | 1 + 2 | hero-pre mobile size, stat bar nth-child borders, stat-lbl mobile, event-meta mobile, register-ghost clamp, section padding reductions, who-item overflow, pull-quote ::before, who-item shadow/delay, about-num stroke/tracking, stat::after timing, formats-item transform, event-card transition split |
| `index.html` inline `<script>` | 2 | Hero tilt leave duration, register ghost parallax, footer ghost parallax |
| `events.html` inline `<style>` | 1 + 2 | event-meta mobile, event-card transition split |
| `events.html` body | 2 | footer-ghost span element |
| `team.html` body | 2 | footer-ghost span element |
| `css/nav.css` | 2 | will-change: transform on .nav-cta |
| `js/site.js` | 2 | footer ghost parallax handler (null-checked, all pages) |

---

## Constraints

- All new transitions must be wrapped in `@media (prefers-reduced-motion: no-preference)` blocks or the existing reduced-motion override must explicitly zero them
- `will-change: transform` on `.nav-cta` only — not applied broadly
- No new CSS files — all page-specific styles stay in inline `<style>` blocks per CLAUDE.md
- Run `npm run build` after any changes to `site.js` or CSS source files
- Formats-list `padding-left` change must be verified against the `::before` gradient sweep — they must still align correctly after switching to `translateX`
