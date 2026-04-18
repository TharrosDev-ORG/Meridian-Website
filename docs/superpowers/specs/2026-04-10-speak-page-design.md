# speak.html — Design Spec
**Date:** 2026-04-10
**Status:** Approved

---

## Purpose

A dedicated page for professionals, academics, and practitioners who want to speak at a Meridian Society event. Serves two audiences: cold organic visitors who discover the page, and people being actively pitched who are sent the link directly.

---

## URL

`/speak.html`

---

## Stack / Constraints

- Static HTML, embedded CSS, vanilla JS — no frameworks
- Follows exact patterns from `events.html` and `team.html` (cream/ink palette, inline `<style>`, same nav/footer/marquee/arc-btn)
- Google Fonts: Cormorant Garamond + Barlow Condensed
- Loads `base.min.css`, `nav.min.css`, `site.min.js`
- No new CSS files — all styles in inline `<style>` block
- Mobile drawer injected by `buildMobileMenu()` in `site.js` — not in HTML
- Registration/speaker form link managed via `data-speak` attribute (new, mirrors `data-register` pattern)
- Email: `meridiansocietycanada@gmail.com`
- Speaker form: placeholder URL until Google Form is created

---

## Sections (top to bottom)

### 1. Page Hero
- Pattern: `.page-hero` (matches `events.html` / `team.html`)
- Eyebrow: "The Meridian Society"
- Pre-line: "Speaker Applications"
- Title (h1): `Make an Impact.`
- Subtitle: One sentence — who the audience is, what the room feels like (intimate, curious, engaged students from Carleton, uOttawa, Algonquin)
- CTA: `.btn-primary` → smooth scrolls to `#apply` section
- Marquee bar below hero (dark ticker, static, matches other subpages)

### 2. Value Props
- Background: `--cream-deep` (matches `.events-sec` / `.team-sec`)
- Corner ornaments via `::before` / `::after`
- Section label: "Why Speak With Us"
- Three cards in a horizontal row (→ 1-col on mobile):
  1. **A Platform Worth Having** — Direct access to an engaged, vetted student audience. No noise, no passive scrolling — people who showed up to listen.
  2. **Give Back, Tangibly** — Your experience becomes someone's turning point. Students in that room are early in their careers — your insight lands differently here.
  3. **Join a Growing Forum** — Meridian is building something. Speakers at the inaugural events become part of the founding story.
- Cards: cream bg, ink-15 border, subtle hover lift (matches `.member-card` pattern)

### 3. Format & Logistics
- Background: `--cream` (alternating with cream-deep)
- Section label: "What to Expect"
- Clean meta grid (2-col key/value layout, matches `.event-meta-row` pattern):
  - Length: 30–45 minute presentation
  - Format: Speaker talk followed by open Q&A
  - Audience: 20–30 curated students
  - Who attends: Carleton, uOttawa & Algonquin members
  - Location: Ottawa, Canada
  - Fields: Policy, academia, entrepreneurship, law, business, politics — and beyond
  - Compensation: Volunteer — community contribution

### 4. Application (id="apply")
- Background: `--cream-deep`
- Centered layout, max-width ~640px
- Headline: `Ready to Speak?`
- Body: "Tell us about yourself and what you'd like to discuss. We'll be in touch."
- Two CTAs side-by-side:
  - Primary (`.btn-primary`): "Apply to Speak" → `data-speak` href (Google Form placeholder)
  - Ghost link (`.btn-ghost-link`): "or email us →" → `mailto:meridiansocietycanada@gmail.com`
- Trust line below CTAs: *"We take every application seriously."*
- `<noscript>` fallback paragraph with direct Google Form link

### 5. Footer
- Identical to `events.html` and `team.html` footer
- `.footer-ghost` DOM element for JS parallax

---

## JS Changes

Add to `site.js`:

```js
var SPEAK_URL = 'https://docs.google.com/forms/PLACEHOLDER';
// On load, set href on all [data-speak] elements
document.querySelectorAll('a[data-speak]').forEach(function(a) {
  a.href = SPEAK_URL;
});
```

Also update `buildMobileMenu()` to include a "Speak" nav link pointing to `/speak.html`.

---

## Nav Updates

Add "Speak" link to:
- Desktop nav (`.nav-links`) on all pages
- Mobile drawer (in `buildMobileMenu()` in `site.js`)

---

## SEO

- `<title>`: "Speak at Meridian | The Meridian Society — Ottawa Student Speaker Forum"
- `<meta name="description">`: Speaker-focused, Ottawa/student keywords
- Canonical: `https://meridiansociety.ca/speak.html`
- hreflang: `en-CA` + `x-default`
- JSON-LD: `WebPage` + `BreadcrumbList` + `Organization`
- Geo meta tags (CA-ON, Ottawa, coords)
- Open Graph + Twitter Card tags
- Add `speak.html` to `sitemap.xml`

---

## Responsive Breakpoints

- `≤1100px`: value prop cards → 2-col
- `≤700px`: value prop cards → 1-col, hero title scales down, meta grid → stacked
- Matches breakpoints used in `events.html` and `team.html`

---

## Accessibility

- Hero CTA has descriptive label
- Value prop cards are `<article>` or `<div>` with readable heading hierarchy
- Apply section has `id="apply"` for anchor scroll target
- `aria-label` on sections
- `prefers-reduced-motion` respected via existing `base.css` global rule + JS guard in `site.js`
