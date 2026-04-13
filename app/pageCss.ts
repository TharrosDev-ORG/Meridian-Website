export const indexCss = `
    /*
     * The Meridian Society — Homepage Styles
     * Shared tokens/nav/base loaded from /css/base.css and /css/nav.css.
     * This block contains only index-specific styles.
     */

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
      color: transparent; -webkit-text-stroke: 1.5px rgba(24,21,15,0.09);
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
      display: flex; align-items: center; gap: 36px; margin-bottom: 56px;
      opacity: 0; animation: riseIn 0.7s 1.2s ease forwards;
    }

    /* Primary CTA button — fill from left */
    .btn-primary {
      font-family: var(--sans); font-size: 11.5px; font-weight: 700;
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
    .hero-ig-label { display: none; }

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
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    .stat:hover { background: rgba(184,147,42,0.04); }
    .stat:hover::after { transform: scaleX(1); }
    .stat:hover .stat-val { color: var(--gold); }
    .stat-val { font-family: var(--serif); font-size: 28px; font-weight: 300; color: var(--ink); line-height: 1; margin-bottom: 5px; transition: color 0.3s; }
    .stat-lbl { font-family: var(--sans); font-size: 11px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-75); }

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
      color: rgba(244,237,227,0.55); padding: 0 24px;
      flex-shrink: 0; white-space: nowrap; line-height: 1;
    }
    .m-gem { color: rgba(212,175,80,0.45); padding: 0 4px; flex-shrink: 0; line-height: 1; }

    /* ══════════════════════════════
       SHARED UTILS
    ══════════════════════════════ */
    .wrap { max-width: 1280px; margin: 0 auto; padding: 0 64px; }
    .sec-label {
      font-family: var(--sans); font-size: 10.5px; font-weight: 700;
      letter-spacing: 0.34em; text-transform: uppercase; color: var(--ink-55);
      display: flex; align-items: center; gap: 14px; margin-bottom: 28px;
    }
    .sec-label::after { content: ''; flex: 1; height: 1px; background: var(--ink-15); }
    .text-link {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: var(--sans); font-size: 11px; font-weight: 700;
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
    .about-layout { display: grid; grid-template-columns: 340px 1fr; gap: 0; align-items: stretch; }
    .about-left { padding-right: 72px; border-right: 1px solid var(--ink-15); position: sticky; top: 96px; display: flex; flex-direction: column; justify-content: center; }
    .about-num {
      font-family: var(--serif); font-size: 96px; font-weight: 300; line-height: 1;
      letter-spacing: -0.04em; color: transparent; -webkit-text-stroke: 1px var(--ink-15);
      display: block; margin-bottom: 8px; transition: -webkit-text-stroke-color 0.4s, letter-spacing 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    .about-left:hover .about-num { -webkit-text-stroke-color: rgba(184,147,42,0.45); letter-spacing: -0.06em; }
    .about-section-label { font-family: var(--sans); font-size: 10.5px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--ink-55); margin-bottom: 20px; }
    .about-title { font-family: var(--serif); font-size: clamp(36px, 3.5vw, 56px); font-weight: 300; line-height: 1.05; color: var(--ink); }
    .about-title em { font-style: italic; color: var(--gold); }
    .about-right { padding-left: 80px; }
    .about-body { font-family: var(--serif); font-size: 19px; font-weight: 400; line-height: 1.95; color: var(--ink-90); margin-bottom: 28px; }
    .pull-quote {
      padding: 24px 28px 24px 32px; margin: 40px 0;
      background: var(--cream-mid);
      border-left: 1px solid var(--ink-08);
      box-shadow: inset 0 0 0 1px var(--ink-08), 0 4px 20px rgba(24,21,15,0.06);
      position: relative; overflow: hidden;
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .pull-quote::before {
      content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
      background: var(--gold);
      transform: scaleY(0.35); transform-origin: bottom;
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
      pointer-events: none;
    }
    .pull-quote:hover { box-shadow: inset 0 0 0 1px var(--ink-08), 0 8px 32px rgba(24,21,15,0.10); transform: translateX(4px); }
    .pull-quote:hover::before { transform: scaleY(1); }
    .pull-quote p { font-family: var(--serif); font-size: 21px; font-style: italic; font-weight: 300; line-height: 1.65; color: var(--ink); }

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
    .who-title { font-family: var(--serif); font-size: clamp(36px, 3.5vw, 56px); font-weight: 300; line-height: 1.05; color: var(--ink); }
    .who-title em { font-style: italic; }
    .who-intro-body { font-family: var(--serif); font-size: 20px; font-weight: 400; line-height: 1.9; color: var(--ink-90); }
    .who-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--ink-15); border: 1px solid var(--ink-15); overflow: visible; }
    .who-item {
      background: var(--cream-mid); padding: 40px 36px;
      position: relative; overflow: hidden; cursor: default;
      transition: background 0.35s, transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s 0.06s;
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
    .who-item:hover { background: var(--cream); transform: translateY(-3px); box-shadow: 0 12px 48px rgba(24,21,15,0.11); transition: background 0.35s, transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s 0s; }
    .who-item:hover::after { transform: scaleX(1); }
    .who-item:hover::before { -webkit-text-stroke-color: rgba(184,147,42,0.1); }
    .who-num { font-family: var(--sans); font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; transition: letter-spacing 0.3s; }
    .who-item:hover .who-num { letter-spacing: 0.36em; }
    .who-item-title { font-family: var(--serif); font-size: 22px; font-weight: 400; font-style: italic; color: var(--ink); line-height: 1.2; margin-bottom: 14px; }
    .who-item-desc { font-family: var(--serif); font-size: 19px; color: var(--ink-90); line-height: 1.75; position: relative; z-index: 1; }

    /* ══════════════════════════════
       WHAT WE ARE NOT
    ══════════════════════════════ */
    .not-sec { padding: 110px 0; position: relative; overflow: hidden; }
    .not-sec::before { content: ''; position: absolute; inset: 0; z-index: 0; opacity: 0.03; background-image: var(--grain); background-size: 200px 200px; pointer-events: none; }
    .not-sec .wrap { position: relative; z-index: 1; }
    .not-layout { display: grid; grid-template-columns: 400px 1fr; gap: 0; align-items: start; }
    .not-left { padding-right: 72px; border-right: 1px solid var(--ink-15); }
    .not-title { font-family: var(--serif); font-size: clamp(34px, 3vw, 50px); font-weight: 300; line-height: 1.1; color: var(--ink); margin-bottom: 24px; }
    .not-body { font-family: var(--serif); font-size: 19px; line-height: 1.9; color: var(--ink-90); }
    .not-right { padding-left: 72px; }
    .not-list { list-style: none; }
    .not-list-header {
      font-family: var(--sans); font-size: 11.5px; font-weight: 700; letter-spacing: 0.32em;
      text-transform: uppercase; color: var(--ink-30); padding-bottom: 12px;
      border-bottom: 1px solid var(--ink-15); margin-bottom: 0;
      display: flex; align-items: center; gap: 10px;
    }
    .not-list-header::before { content: '\\u00D7'; font-family: var(--sans); font-size: 12px; font-weight: 300; color: var(--gold); opacity: 0.7; }
    .not-list li {
      display: flex; align-items: baseline; gap: 20px;
      padding: 18px 0; border-bottom: 1px solid var(--ink-08);
      font-family: var(--serif); font-size: 19px; font-style: italic;
      color: var(--ink-90); line-height: 1.4;
      transition: color 0.25s, transform 0.3s, border-bottom-color 0.25s; cursor: default;
    }
    .not-list li:first-child { border-top: none; }
    .not-list li::before { content: '\\u00D7'; font-style: normal; font-family: var(--sans); font-size: 11px; font-weight: 300; color: var(--ink-30); flex-shrink: 0; transition: color 0.25s; }
    .not-list li:hover { color: var(--ink); transform: translateX(8px); }
    .not-list li:hover::before { color: var(--gold); }

    /* ══════════════════════════════
       EVENTS TEASER
    ══════════════════════════════ */
    .events { padding: 110px 0; background: var(--cream-deep); position: relative; overflow: hidden; }
    .events::before { content: ''; position: absolute; top: 40px; right: 40px; width: 80px; height: 80px; border-top: 1px solid var(--ink-15); border-right: 1px solid var(--ink-15); pointer-events: none; }
    .events::after  { content: ''; position: absolute; bottom: 40px; left: 40px; width: 80px; height: 80px; border-bottom: 1px solid var(--ink-15); border-left: 1px solid var(--ink-15); pointer-events: none; }
    .events .wrap { position: relative; z-index: 1; }
    .events-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 52px; }
    .events-title { font-family: var(--serif); font-size: clamp(36px, 3.5vw, 56px); font-weight: 300; line-height: 1.05; color: var(--ink); }
    .events-title em { font-style: italic; }
    .event-card {
      background: var(--cream); border: 1px solid var(--ink-15);
      display: grid; grid-template-columns: 1fr 280px; gap: 0;
      box-shadow: 0 2px 12px rgba(24,21,15,0.04), 0 8px 40px rgba(24,21,15,0.06);
      transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
      position: relative; overflow: hidden;
    }
    .event-card:hover { transform: translateY(-4px); box-shadow: 0 4px 24px rgba(24,21,15,0.06), 0 16px 60px rgba(24,21,15,0.10); }
    .event-main { padding: 48px 52px; border-right: 1px solid var(--ink-15); position: relative; z-index: 1; }
    .event-status { display: inline-flex; align-items: center; gap: 8px; font-family: var(--sans); font-size: 11.5px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-55); margin-bottom: 24px; }
    .event-dot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; animation: goldPulse 2.2s ease-in-out infinite; }
    .event-title { font-family: var(--serif); font-size: clamp(26px, 3vw, 42px); font-weight: 300; line-height: 1.1; color: var(--ink); margin-bottom: 20px; }
    .event-title em { font-style: italic; }
    .event-desc { font-family: var(--serif); font-size: 19px; line-height: 1.85; color: var(--ink-90); max-width: 520px; margin-bottom: 32px; }
    .event-tags { display: flex; gap: 8px; flex-wrap: wrap; }
    .event-tag { font-family: var(--sans); font-size: 11.5px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-55); border: 1px solid var(--ink-15); padding: 5px 12px; transition: border-color 0.2s, color 0.2s; }
    .event-tag:hover { border-color: var(--gold); color: var(--ink); }
    .event-meta { position: relative; z-index: 1; }
    .event-meta-row { padding: 22px 28px; border-bottom: 1px solid var(--ink-08); transition: background 0.2s; }
    .event-meta-row:last-child { border-bottom: none; }
    .event-meta-row:hover { background: rgba(24,21,15,0.02); }
    .meta-lbl { font-family: var(--sans); font-size: 11.5px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-55); margin-bottom: 5px; }
    .meta-val { font-family: var(--serif); font-size: 19px; font-style: italic; color: var(--ink); line-height: 1.3; }

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
    .speaking-title { font-family: var(--serif); font-size: clamp(36px, 3.5vw, 56px); font-weight: 300; line-height: 1.05; color: var(--ink); margin-bottom: 8px; }
    .speaking-title em { font-style: italic; }
    .speaking-sub { font-family: var(--serif); font-size: 19px; font-style: italic; color: var(--ink-55); margin-bottom: 32px; }
    .speaking-body { font-family: var(--serif); font-size: 19px; line-height: 1.9; color: var(--ink-90); margin-bottom: 36px; }
    .speaking-right { padding-left: 80px; }
    .formats-list { list-style: none; }
    .formats-item {
      display: flex; align-items: center; gap: 20px;
      padding: 16px 0; border-bottom: 1px solid var(--ink-08);
      cursor: default; position: relative; overflow: hidden;
      transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-bottom-color 0.2s;
    }
    .formats-item:first-child { border-top: 1px solid var(--ink-15); }
    .formats-item::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(to right, rgba(184,147,42,0.05) 0%, transparent 100%);
      transform: translateX(-100%); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
    }
    .formats-item:hover { transform: translateX(12px); border-bottom-color: var(--ink-15); }
    .formats-item:hover::before { transform: translateX(0); }
    .formats-num { font-family: var(--sans); font-size: 11.5px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); flex-shrink: 0; position: relative; z-index: 1; transition: letter-spacing 0.3s; }
    .formats-item:hover .formats-num { letter-spacing: 0.28em; }
    .formats-text { font-family: var(--serif); font-size: 19px; font-style: italic; color: var(--ink-90); position: relative; z-index: 1; transition: color 0.2s; }
    .formats-item:hover .formats-text { color: var(--ink); }

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
      font-family: var(--sans); font-size: clamp(60px, 30vw, 180px); font-weight: 700;
      letter-spacing: 0.3em; white-space: nowrap;
      color: transparent; -webkit-text-stroke: 1.5px rgba(24,21,15,0.13);
      user-select: none; pointer-events: none; z-index: 0;
    }
    .register .wrap { position: relative; z-index: 1; text-align: center; }
    .register-rule-top { width: 1px; height: 60px; background: var(--ink-15); margin: 0 auto 40px; }
    .register-eyebrow { font-family: var(--sans); font-size: 10.5px; font-weight: 700; letter-spacing: 0.38em; text-transform: uppercase; color: var(--ink-55); margin-bottom: 36px; }
    .register-title { font-family: var(--serif); font-size: clamp(46px, 7.5vw, 108px); font-weight: 300; line-height: 0.88; color: var(--ink); margin-bottom: 36px; }
    .register-title em { font-style: italic; font-weight: 300; color: var(--gold); }
    .register-body { font-family: var(--serif); font-size: 19px; font-style: italic; font-weight: 300; color: var(--ink-75); max-width: 440px; margin: 0 auto 52px; line-height: 1.85; }
    .register-actions { display: flex; align-items: center; gap: 28px; justify-content: center; }
    .register-btn {
      display: inline-block; font-family: var(--sans); font-size: 11.5px; font-weight: 700;
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
    .member-count-lbl { font-family: var(--sans); font-size: 10px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-55); }

    /* ══════════════════════════════
       FOOTER
    ══════════════════════════════ */
    footer {
      padding: 60px 0 36px; background: var(--cream-deep);
      border-top: 1px solid var(--ink-15); position: relative; overflow: hidden;
    }
    .footer-ghost {
      position: absolute; bottom: -24px; left: 50%; transform: translateX(-50%);
      font-family: var(--sans); font-size: 160px; font-weight: 700;
      letter-spacing: 0.3em; white-space: nowrap;
      color: transparent; -webkit-text-stroke: 1px rgba(24,21,15,0.04);
      user-select: none; pointer-events: none; z-index: 0; display: block;
    }
    .footer-top { display: flex; align-items: flex-start; justify-content: space-between; padding-bottom: 32px; border-bottom: 1px solid var(--ink-08); margin-bottom: 28px; position: relative; z-index: 1; }
    .footer-wordmark { font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: var(--ink); margin-bottom: 6px; }
    .footer-tagline { font-family: var(--serif); font-size: 16px; font-style: italic; color: var(--ink-55); }
    .footer-connect { display: flex; gap: 20px; align-items: center; padding-top: 3px; }
    .footer-connect a { font-family: var(--serif); font-size: 17px; color: var(--ink-55); text-decoration: none; transition: color 0.2s; }
    .footer-connect a:hover { color: var(--ink); }
    .footer-nav { display: flex; flex-wrap: wrap; align-items: center; margin-bottom: 28px; position: relative; z-index: 1; }
    .footer-nav a { font-family: var(--serif); font-size: 17px; color: var(--ink-55); text-decoration: none; transition: color 0.2s; padding-right: 20px; margin-right: 20px; border-right: 1px solid var(--ink-15); line-height: 1.6; }
    .footer-nav a:last-child { border-right: none; padding-right: 0; margin-right: 0; }
    .footer-nav a:hover { color: var(--ink); }
    .footer-bottom { padding-top: 24px; border-top: 1px solid var(--ink-08); position: relative; z-index: 1; }
    .footer-copy { font-family: var(--sans); font-size: 11px; font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-55); }

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
      .footer-nav a { padding-right: 16px; margin-right: 16px; }
      .wrap { padding: 0 40px; }
    }

    @media (max-width: 700px) {
      .hero { padding: 80px 20px 0; }
      .hero-pre { font-size: clamp(17px, 3vw, 30px); }
      .hero-title { font-size: clamp(40px, 10.7vw, 76px); }
      .wrap { padding: 0 20px; }
      .about { padding: 64px 0; }
      .who { padding: 64px 0; }
      .not-sec { padding: 64px 0; }
      .events { padding: 80px 0; }
      .speaking { padding: 64px 0; }
      .register { padding: 64px 0; }
      .hero-ghost { display: none; }
      .hero-content { width: 100%; }
      .hero-eyebrow { margin-bottom: 24px; gap: 8px; flex-wrap: wrap; justify-content: center; }
      .hero-eyebrow-rule { display: none; }
      .hero-eyebrow-text { font-size: 11px; letter-spacing: 0.12em; }
      .hero-sub { width: 100%; max-width: 100%; }
      .hero-actions { flex-wrap: wrap; gap: 16px; }
      .hero-actions > span[aria-hidden="true"] { display: none; }
      .hero-stats { grid-template-columns: 1fr 1fr; }
      .stat { padding: 18px 20px; }
      .stat-val { font-size: 22px; }
      .stat:nth-child(3),
      .stat:nth-child(4) { border-top: 1px solid var(--ink-08); }
      .stat-lbl { font-size: 11px; letter-spacing: 0.18em; }
      .btn-primary { width: 100%; justify-content: center; text-align: center; display: block; padding: 13px 24px; }
      .btn-ghost-link { display: none; }
      .hero-ig-btn { width: 100%; height: auto; padding: 13px 24px; gap: 10px; justify-content: center; }
      .hero-ig-label { display: inline; font-family: var(--sans); font-size: 11.5px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-55); position: relative; z-index: 1; }
      .hero-ig-btn:hover .hero-ig-label { color: var(--cream); }
      .about-body { font-size: 17px; }
      .pull-quote p { font-size: 18px; }
      .who-grid { grid-template-columns: 1fr; }
      .who-item { padding: 28px 20px; overflow: hidden; }
      .event-meta-row { padding: 16px 20px; }
      .event-main { padding: 32px 24px; }
      .event-meta { background: rgba(24,21,15,0.025); }
      .events-header { flex-direction: column; align-items: flex-start; gap: 20px; margin-bottom: 36px; }
      .register-btn { width: 100%; text-align: center; }
      .footer-top { flex-direction: column; gap: 20px; }
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
  `;
