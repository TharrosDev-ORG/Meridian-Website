# Membership Page Design

**Date:** 2026-04-11
**File:** `membership.html`
**Status:** Approved

---

## Context

The homepage has a register section ("Become a Member.") but no dedicated membership page. A standalone page gives the Register nav link a real destination, lets benefits breathe, and serves visitors who want more context before committing — without sacrificing conversion speed.

---

## Goals

- Get the register CTA in view fast (before benefits)
- Explain the five membership benefits with enough detail to feel real
- Answer common questions without burying the CTA
- Mobile sticky bar keeps register action always accessible on small screens

---

## Page Structure

### 1. Hero
Follows the subpage hero pattern (`page-hero`) used by events.html, team.html, speak.html.

- Pre: *"Student Speaker Forum"*
- Title: `Membership.`
- Subtitle: *"Free to join. Built for the curious."*
- No CTA buttons in the hero — first CTA block handles this immediately below

### 2. First CTA Block
Centered, minimal block directly below the hero. Contains:
- Register button (`data-register`, filled by `site.js`)
- One supporting line: *"Takes 30 seconds. No cost."*

Purpose: puts the register action in view before any scrolling.

### 3. Benefits Section
Cream-deep background (`--cream-deep`), corner ornaments — matches `.events-sec` / `.team-sec` pattern.

Five benefits, each with a short label and 2–3 sentence expansion:

| # | Label | Core idea |
|---|-------|-----------|
| 1 | Speaker Events | Priority announcements, event schedules, invitations to all speaker events |
| 2 | Social Gatherings | Invitations to bar nights, casual meetups, and community events |
| 3 | Professional Exposure | Direct exposure to professionals, alumni, and scholars across diverse career pathways |
| 4 | Community | A circle of genuinely curious, motivated people — not a club, a network that forms naturally |
| 5 | Your Peers | The people in the room are half the reason to show up. Meridian members are Ottawa students who take ideas seriously |

### 4. FAQ Section
Accordion-style, reusing the existing accordion pattern from index.html's "who" section (site.js already handles expand/collapse via `role="button"`, `aria-expanded`).

Four questions:
1. **Is membership free?** — Yes, completely.
2. **Who can join?** — Any motivated, curious student in the Ottawa area.
3. **What happens after I register?** — You'll receive event announcements and invitations as they go out.
4. **Do I have to attend every event?** — No. Register once, come to what interests you.

### 5. Second CTA (Register Section)
Exact reuse of the `.register` section from index.html — "Become a Member.", live member count box, register button, supporting body copy. No redesign needed.

### 6. Mobile Sticky Bar
Same `.sticky-join` pattern from index.html. Visible only on mobile (`≤700px`). Activates after scrolling past the hero (uses existing `site.js` scroll handler with null-check). Gives mobile users a persistent register action without cluttering desktop.

---

## Technical Notes

- Follows the same HTML/CSS/JS stack as all other pages (no frameworks)
- Inline `<style>` block with full cream/ink `:root` — copy from events.html as base
- Nav cream override required (same as events/team/speak)
- Mobile drawer injected by `buildMobileMenu()` in site.js — no drawer HTML in the file
- All `data-register` links filled by `site.js` REGISTER_URL — use `href="#"` as placeholder
- Member count box: copy exact markup from index.html — fetched by same inline script
- Accordion: reuse the `role="button"` / `aria-expanded` / `data-d` pattern from index.html `#who` section; site.js handles the toggle
- FAQ structured data (JSON-LD `FAQPage`) should be added in `<head>` for SEO
- Add `membership.html` to sitemap.xml and nav links across all pages

---

## Files to Create / Modify

| File | Action |
|------|--------|
| `membership.html` | Create |
| `index.html` | Add Membership to nav + mobile drawer |
| `events.html` | Add Membership to nav + mobile drawer |
| `team.html` | Add Membership to nav + mobile drawer |
| `social.html` | Add Membership to nav + mobile drawer |
| `speak.html` | Add Membership to nav + mobile drawer |
| `js/site.js` | Add Membership link to `buildMobileMenu()` |
| `sitemap.xml` | Add membership.html entry |
