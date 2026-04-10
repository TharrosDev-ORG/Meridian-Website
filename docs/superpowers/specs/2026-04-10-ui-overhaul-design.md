# MeridianSociety.ca — Front-End UI Overhaul Design Spec
**Date:** 2026-04-10
**Status:** Approved

---

## 1. Problem Statement

The current site reads as sparse and generic. It lacks visual depth, has no micro-animations, and does not convey the editorial character of the organization. The goal is a full front-end redesign using existing content only — no new sections.

---

## 2. Aesthetic Direction

**Luxury boutique with editorial touches** (Aesop + Monocle/Economist).

- Warm cream palette, not white
- Restrained typographic hierarchy — large display serif, tight condensed sans for labels
- Depth through layered CSS textures (grain, radial gradients, dot grids), not images
- Micro-animations on scroll, hover, and load — no gratuitous motion

---

## 3. Design Tokens

```css
--cream:      #F4EDE3;   /* page background */
--cream-mid:  #EBE2D4;   /* section alternate bg */
--cream-deep: #DDD0BC;   /* deepest cream, borders */
--ink:        #18150F;   /* primary text */
--ink-90/75/55/30/15/08  /* opacity steps */
--gold:       #B8932A;   /* accent, interactive states */
--gold-lt:    #D4AF50;   /* lighter gold for decorative use */
--serif:      'Cormorant Garamond', Georgia, serif;
--sans:       'Barlow Condensed', 'Arial Narrow', Arial, sans-serif;
```

---

## 4. Typography Scale

All sizes use `clamp()` for fluid scaling:

| Role | Size |
|---|---|
| Hero display | `clamp(76px, 13.5vw, 196px)` — all caps, `letter-spacing: 0.06em` |
| Hero pre/post lines | `clamp(22px, 3vw, 38px)` — italic serif |
| Hero sub | `clamp(19px, 2.2vw, 27px)` |
| Section titles (h2) | `clamp(36px, 5vw, 64px)` |
| Section labels | 8–9px, all-caps, `letter-spacing: 0.3em+`, Barlow Condensed |
| Body | 16–17px, Cormorant Garamond, `line-height: 1.7` |

---

## 5. Page Sections & Key Decisions

### Nav
- Fixed, transparent → ink bg on scroll (`.scrolled` class via JS)
- Logo left, links right, gold hover underline

### Hero
- Full-viewport, cream background with grain texture overlay and radial warm vignette
- Ghost "M" letterform behind title (parallax on scroll, 0.22× rate)
- Eyebrow: "Independent Student Organization" in gold, 11px, `letter-spacing: 0.32em`
- Pre-line: "A Place For" (italic serif)
- Title: **DISCOURSE** (all caps, large display serif, mouse-tilt 3D effect via JS)
- Post-line: subtitle copy, max-width 560px
- CTA row: primary button + ghost link

### Marquee
- Ink background strip between hero and stats
- Items: The Meridian Society · Ottawa · Est. 2025 · Student-Run · Carleton University · uOttawa · Algonquin College
- Pauses on hover; edge fade via `::before`/`::after` gradients

### Stats Bar
- 4 stats: "3 Universities & Colleges", "Ottawa — Based At Carleton", "Fall '26 — Inaugural Event", "Est. 2025 — Independent Organization"
- No "Free" stat

### About
- Two-column: large pull quote left, body + section label right
- Section has diagonal stripe texture on `::before`, dot grid on `::after`

### Who We Serve
- Accordion-style list of student profiles
- Hover: gold accent border, slight indent

### What We Are Not
- Two-column: explanatory copy left, negation list right
- List markers: `×` (turn gold on hover)
- List header label: "Not" (8px, all-caps)
- No "university or institutional program" list item
- Copy frames the list before showing it — prevents misreading as a feature list

### Events Teaser
- Single featured event card with status dot, tags, and meta table (When / Where / Format / Entry)
- Placeholder: "Our First Event is Coming" — Fall 2026

### Get Involved
- Left: heading + body copy (section label: "Get Involved")
- Right: numbered list under "What We Host" label (sec-label style)
  - 01 Formal presentations & keynotes
  - 02 Open conversations & Q&A
  - 03 Career pathway talks
  - 04 Panel discussions
  - 05 Social gatherings & community events
- List items: hover indent + gold gradient sweep animation

### Register / Membership CTA
- Cream-mid background (stays on-theme)
- Ghost "MERIDIAN" watermark, thin vertical rules
- Ink button with gold fill-from-left animation
- No "Register for Free" — just "Register for Updates" / "Become a Member"

### Footer
- Dark ink background
- Nav links, contact email, social links
- "Operating out of Carleton University" note
- Copyright line

---

## 6. Animation System

### Scroll Reveal
- Class `.rv` on all reveal targets: `opacity:0; transform:translateY(20px)`
- `IntersectionObserver` adds `.on` class → animates in
- Staggered via `data-d="1..4"` attribute → `transition-delay: 0.08s` per step

### Hero
- Title load: `riseIn` keyframe (translateY + opacity), 0.9s, delay 0.7s
- Title mouse-tilt: `perspective(1200px) rotateX/Y` on mousemove, resets on mouseleave
- Ghost "M" parallax: `translateX(-50%) translateY(scrollY * 0.22px)`

### Buttons
- Primary: fill-from-left using `::before` `translateX(-100%)` → `translateX(0)`
- Ghost link: arrow gap widens on hover

### Hover States
- Cards / list items: `padding-left` indent + gold gradient sweep (CSS `::before` translateX)
- Nav links: gold underline grows from left
- Not-list `×`: color transitions to gold

---

## 7. Depth & Texture System

Each section uses CSS pseudo-elements for layered depth (no image files):

- **Grain texture**: inline SVG `feTurbulence` filter, low opacity (~3–6%), applied as `background-image`
- **Radial vignette**: `radial-gradient` from transparent center to cream-deep edges
- **Dot grid**: SVG data-URI with repeating dots, low opacity
- **Diagonal stripes**: linear-gradient repeating pattern at 45°
- **Ghost letterforms**: oversized text, `-webkit-text-stroke`, `color: transparent`

---

## 8. Technical Constraints

- Vanilla HTML5 / CSS / JS — no frameworks
- Fonts: Google Fonts (Cormorant Garamond + Barlow Condensed)
- Three.js globe (current hero) removed in favour of pure CSS hero with ghost letterform + parallax
- Build: `npm` with `csso-cli` (CSS min) and `terser` (JS min)
- Hosting: Vercel, auto-deploy on git push
- No new pages — homepage, events, team pages only (events and team redesigns TBD)

---

## 9. Functionality to Preserve (from current site)

All items below must be carried into the new build. Visual styling updated to match the new cream/ink/gold theme.

### Interactive
- **Arc back-to-top button** — fixed bottom-right, circular SVG progress ring showing scroll depth, appears after 200px scroll. Restyled: cream-mid background, ink border, gold progress arc, ink arrow. On hover: ink fill, cream arrow.
- **Instagram CTA in hero** — square icon button in the hero actions row. Restyled: ink border, ink SVG, gold fill-from-left on hover.
- **Sticky register CTA** — floating pill button that appears on mobile as user scrolls past the hero. Restyled to ink background, gold text, gold fill on hover.
- **"Who We Gather" accordion** — expandable rows per member type with `aria-expanded` / `role="button"` / keyboard support.
- **Live member count** — fetched from Google Apps Script endpoint; displayed in stats bar. Falls back to `—` on error.

### SEO / Head
All of the following must be carried verbatim (updating content where relevant) into the new `index.html`:
- `<title>`, `<meta name="description">`, `<meta name="keywords">`
- Geo meta tags (`geo.region`, `geo.placename`, `geo.position`, `ICBM`)
- `<link rel="canonical">` + `hreflang` (`en-CA` + `x-default`)
- Open Graph tags (type, url, title, description, image, image dimensions, site_name, locale)
- Twitter Card tags
- Favicon set (SVG, 48/32/16px PNG, ICO, Apple touch icon)
- JSON-LD structured data blocks (all 7 from current site):
  - WebPage with `speakable` selectors
  - EducationalOrganization
  - Event (inaugural Fall 2026)
  - WebSite with SearchAction
  - BreadcrumbList
  - FAQPage (7 Q&A entries)
  - EventSeries
- Update `speakable` CSS selectors to match new section IDs

### Accessibility
- `prefers-reduced-motion` media query — disables all `.rv` transitions and hero animations globally
- All interactive elements retain `aria-label`, `role`, `tabindex` as appropriate
- Skip link preserved

---

## 10. Out of Scope

- Events page redesign (separate spec)
- Team page redesign (separate spec)
- Backend / membership system
- New content sections
