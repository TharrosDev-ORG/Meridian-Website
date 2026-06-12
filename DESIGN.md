# Design

## Theme

Evolved dual-surface system. The original cream-only page becomes an alternation: deep-ink "forum" chapters against cream "reading" chapters. Gold is the single accent on both surfaces. Grain texture (`--grain`) unifies them.

## Color

All tokens live in `app/globals.css` `@theme` with `:root` mirrors.

| Role | Token | Value |
|---|---|---|
| Light surface | `--cream` | `#F4EDE3` |
| Light raised | `--cream-mid` / `--cream-deep` | `#EBE2D4` / `#DDD0BC` |
| Dark surface | `--ink` | `#18150F` |
| Dark raised | `--ink-2` | `#211D15` |
| Dark border | `--ink-3` | `#2A251B` |
| Ink-on-cream ladder | `--ink-90` … `--ink-08` | rgba(24,21,15,…) |
| Cream-on-ink ladder | `--cream-90` … `--cream-08` | rgba(244,237,227,…) |
| Accent | `--gold` / `--gold-lt` | `#B8932A` / `#D4AF50` |
| Glow | `--gold-glow` | rgba(212,175,80,0.35) |

Section theming: `section[data-theme="dark"]` remaps generic vars (`--bg`, `--fg`, `--fg-75`, `--fg-55`, `--line`, `--line-soft`) so shared component CSS renders correctly on either surface. Never pure #FFF or #000.

On dark surfaces, body text uses `--cream-90`+; `--cream-55` is for short metadata only. Gold on ink is reserved for rules, numerals, and CTAs (large-text contrast only).

## Typography

- **Display/serif**: Cormorant Garamond (`--serif`) — titles, pull quotes, oversized numerals.
- **Sans**: Barlow Condensed (`--sans`) — metadata, labels, buttons, nav. Uppercase only for short labels.
- Hero display: `clamp(64px, 12vw, 180px)`, letter-spacing ≥ -0.04em, `text-wrap: balance`.
- Section titles: `clamp(40px, 6vw, 96px)`. Body 19–20px (site minimum per legibility pass), labels ≥ 11.5px.
- Scale steps ≥ 1.25 ratio. Light-on-dark body gets +0.05 line-height.

## Motion

- **Stack**: GSAP + ScrollTrigger (+ Lenis smooth scroll), Three.js gold particle field in the hero.
- **Contract**: content visible by default; GSAP applies from-states at runtime only. Reveals never gate visibility.
- **Gating**: Lenis, scrub effects, and the WebGL hero run only at `(min-width:1101px) and (pointer:fine) and (prefers-reduced-motion: no-preference)`. Touch and reduced-motion get the instant path.
- **Feel**: ease-out expo/quint, no bounce, no pinned sections, wheel multiplier 1, lerp ~0.1. One orchestrated hero timeline; per-section reveals fit what they reveal.
- Magnetic buttons (`quickTo`), marquee loop (xPercent), page-sweep transition retained.

## Components

- `NavBar` (+ `.site-nav--on-dark` transparent state), `Footer` (dark, server component), `MobileMenu`, `MobileDock` (≤1100px, structurally frozen).
- `Magnetic`, `Marquee`, `TransitionWrapper`, `ScrollProgress`, `BackToTop`.
- `motion/MotionProvider` — Lenis + ScrollTrigger wiring + reveal batching.
- `three/HeroVisual` (static fallback + eligibility gate) → `three/HeroParticles` (lazy WebGL).
- Registry-style member cards, ledger-style stat/format lists, gold-ruled section seams.

## Layout

- Per-page CSS in `pageCss.ts` template strings injected via `<PageStyles>`; structural CSS in `app/globals.css`.
- `.wrap` container; fluid `clamp()` spacing; desktop enhancements strictly inside `@media (min-width: 1101px)`.
- Horizontal scroll rows (`.h-scroll`) for team/who/events on mobile.
