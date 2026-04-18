# Mobile UI Fixes — Design Spec
**Date:** 2026-04-11
**Target:** iPhone 375px (primary), 320–700px range

## Problem

Several mobile layout bugs cause text to be clipped off-screen or elements to overflow the viewport on 375px devices. All bugs are CSS-only — wrong or missing rules in existing `@media (max-width: 700px)` blocks.

## Scope

CSS changes only. No HTML or JS modifications. Edit source files, then run `npm run build` to regenerate `.min` files.

---

## Changes

### 1. Hero title font-size — all 4 pages

**Root cause:** `clamp()` minimum values are too large for 375px. At 375px the content area is 335px (375px − 2×20px padding). "DISCOURSE" at 76px (index.html min) is ~430px wide and gets clipped by `overflow: hidden` on the hero.

**Fix:** Add to each page's `@media (max-width: 700px)` block:

- `index.html`: `.hero-title { font-size: clamp(40px, 10.7vw, 76px); }`
  - At 375px → 40px. "DISCOURSE" fits in 335px.
- `events.html`, `team.html`, `speak.html`: `.hero-title { font-size: clamp(44px, 11.7vw, 64px); }`
  - At 375px → 44px. "The Team." fits comfortably.

### 2. Hero eyebrow mobile rules — events, team, speak

**Root cause:** `index.html` already has mobile rules for `.hero-eyebrow`, `.hero-eyebrow-rule`, and `.hero-eyebrow-text`. The three subpages do not. The eyebrow with two 36px decorative rules + gap + text totals ~394px — overflows the 335px content width.

**Fix:** Add to each subpage's `@media (max-width: 700px)` block:
```css
.hero-eyebrow { gap: 8px; flex-wrap: wrap; justify-content: center; }
.hero-eyebrow-rule { display: none; }
.hero-eyebrow-text { font-size: 9px; letter-spacing: 0.12em; }
```

### 3. Event card padding — index.html only

**Root cause:** `.event-main { padding: 48px 52px; }` is never overridden at mobile on index.html. The 104px of horizontal padding in a 335px content area leaves only 231px for text. `events.html` correctly overrides to `padding: 32px 24px` at 700px.

**Fix:** Add to `index.html`'s `@media (max-width: 700px)` block:
```css
.event-main { padding: 32px 24px; }
```

### 4. Hover reflow fix — all pages

**Root cause:** Two hover effects animate `padding-left`, causing layout reflow every frame. This violates the explicit CLAUDE.md rule: "Do not use padding-left on hover for slide effects — use transform: translateX() instead."

**Affected rules:**
- `index.html`: `.not-list li:hover { padding-left: 8px; }` (transition includes `padding-left 0.3s`)
- All 4 pages: `.footer-col a:hover { padding-left: 4px; }` (transition includes `padding-left 0.2s`)

**Fix:** Replace `padding-left` with `transform: translateX()` on both the `transition` and `:hover` declarations. Each page has its own footer CSS block — all 4 must be updated.

### 5. Speak format header — speak.html only

**Root cause:** `.speak-format-header { display: flex; align-items: flex-end; justify-content: space-between; }` has no mobile override. Title + link try to flex-row at 375px, getting cramped.

**Fix:** Add to `speak.html`'s `@media (max-width: 700px)` block:
```css
.speak-format-header { flex-direction: column; align-items: flex-start; gap: 16px; }
```

### 6. Hero separator margin — events, team, speak

**Root cause:** `.hero-hr { margin: 36px auto; }` adds 72px of vertical space around the gold separator line on a compact mobile hero. Unnecessary on 375px.

**Fix:** Add to each subpage's `@media (max-width: 700px)` block:
```css
.hero-hr { margin: 24px auto; }
```

### 7. Hero subtitle spacing — events, team, speak

**Root cause:** `line-height: 1.85` and `margin-bottom: 44px` on `.hero-sub` at 17px creates excessive vertical rhythm on a small-screen hero.

**Fix:** Add to each subpage's `@media (max-width: 700px)` block:
```css
.hero-sub { line-height: 1.65; margin-bottom: 32px; }
```

---

## Files Modified

| File | Changes |
|------|---------|
| `index.html` | Hero title clamp, event-main padding, not-list hover fix, footer-col hover fix |
| `events.html` | Hero title clamp, eyebrow mobile rules, hero-hr margin, hero-sub spacing, footer-col hover fix |
| `team.html` | Hero title clamp, eyebrow mobile rules, hero-hr margin, hero-sub spacing, footer-col hover fix |
| `speak.html` | Hero title clamp, eyebrow mobile rules, hero-hr margin, hero-sub spacing, speak-format-header stack, footer-col hover fix |

## Verification

1. Run `npm run build` after all edits
2. Open each page in browser DevTools at 375px iPhone viewport
3. Verify hero title visible and not clipped on all 4 pages
4. Verify eyebrow fits on one line (or wraps cleanly) on subpages
5. Verify event card on index.html has appropriate padding at 375px
6. Verify hover effects on not-list and footer links slide smoothly (no layout jump)
7. Verify speak format header stacks vertically on mobile
8. Confirm no horizontal scrollbar appears on any page at 375px
