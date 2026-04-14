export const socialCss = `
    /*
     * The Meridian Society — Social Events Page Styles
     * Design system matches index.html / events.html.
     * Loads base.css + nav.css only. All page styles inline.
     */

    :root {
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
      background: var(--cream); color: var(--ink);
      font-family: var(--serif); font-weight: 400; line-height: 1.7;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }

    /* ── Nav override — cream theme ── */
    #mainNav {
      --cream: #18150F; --cream-70: rgba(24,21,15,0.90);
      --cream-45: rgba(24,21,15,0.75); --cream-20: rgba(24,21,15,0.55);
      --black: #F4EDE3; --gold: #B8932A;
      --gold-border: rgba(184,147,42,0.38); --gold-border2: rgba(184,147,42,0.60);
      background: rgba(244,237,227,0.92) !important;
      backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important;
      border-bottom: 1px solid rgba(24,21,15,0.10) !important; box-shadow: none !important;
    }
    #mainNav.scrolled {
      background: rgba(244,237,227,0.98) !important;
      box-shadow: 0 2px 28px rgba(24,21,15,0.06) !important;
      border-bottom-color: rgba(24,21,15,0.16) !important;
    }

    /* ── Keyframes ── */
    @keyframes riseIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
    @keyframes goldPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(184,147,42,0.5); } 50% { box-shadow: 0 0 0 4px rgba(184,147,42,0); } }
    @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

    /* ── Page hero ── */
    .page-hero {
      position: relative; min-height: 60vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; padding: 120px 64px 80px; overflow: hidden;
      background: var(--cream);
    }
    .page-hero::before {
      content: ''; position: absolute; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse 70% 55% at 50% 35%, transparent 45%, rgba(166,138,88,0.08) 100%),
        radial-gradient(ellipse 100% 60% at 50% 90%, rgba(150,120,70,0.07) 0%, transparent 60%);
      pointer-events: none;
    }
    .page-hero::after {
      content: ''; position: absolute; inset: 0; z-index: 1;
      opacity: 0.03; background-image: var(--grain); background-size: 220px 220px; pointer-events: none;
    }
    .page-hero-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
    .hero-eyebrow { display: flex; align-items: center; gap: 16px; margin-bottom: 52px; }
    .hero-eyebrow-rule { width: 36px; height: 1px; background: var(--gold); opacity: 0.5; }
    .hero-eyebrow-text { font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); }
    .hero-pre { font-family: var(--serif); font-size: clamp(18px, 2.5vw, 30px); font-style: italic; font-weight: 300; color: var(--ink-55); letter-spacing: 0.06em; margin-bottom: 10px; }
    .hero-title { font-family: var(--serif); font-size: clamp(64px, 12vw, 160px); font-weight: 300; line-height: 0.86; color: var(--ink); letter-spacing: 0.06em; text-shadow: 0 2px 40px rgba(24,21,15,0.04); }
    .hero-post { font-family: var(--serif); font-size: clamp(18px, 2.5vw, 30px); font-style: italic; font-weight: 300; color: var(--ink-55); letter-spacing: 0.06em; margin-top: 12px; }
    .hero-hr { width: 44px; height: 1px; background: var(--ink-15); margin: 36px auto; }
    .hero-sub { font-family: var(--serif); font-size: clamp(19px, 2vw, 26px); font-style: italic; font-weight: 300; color: var(--ink-75); max-width: 520px; line-height: 1.85; margin-bottom: 44px; }
    .hero-sub a { color: var(--gold); text-decoration: none; transition: color 0.2s; }
    .hero-sub a:hover { color: var(--ink); }
    .hero-actions { display: flex; align-items: center; gap: 36px; }
    .btn-primary { font-family: var(--sans); font-size: 11.5px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: var(--cream); background: var(--ink); text-decoration: none; padding: 13px 32px 12px; position: relative; overflow: hidden; transition: transform 0.25s, box-shadow 0.25s; }
    .btn-primary::before { content: ''; position: absolute; inset: 0; background: var(--gold); transform: translateX(-100%); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
    .btn-primary span { position: relative; z-index: 1; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(24,21,15,0.14); }
    .btn-primary:hover::before { transform: translateX(0); }
    .btn-ghost-link { font-family: var(--serif); font-size: 16px; font-style: italic; font-weight: 300; color: var(--ink-55); text-decoration: none; display: flex; align-items: center; gap: 8px; transition: color 0.2s, gap 0.25s; }
    .btn-ghost-link:hover { color: var(--ink); gap: 14px; }

    /* ── Shared utils ── */
    .wrap { max-width: 1280px; margin: 0 auto; padding: 0 64px; }
    .sec-label { font-family: var(--sans); font-size: 10.5px; font-weight: 700; letter-spacing: 0.34em; text-transform: uppercase; color: var(--ink-55); display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
    .sec-label::after { content: ''; flex: 1; height: 1px; background: var(--ink-15); }
    .text-link { display: inline-flex; align-items: center; gap: 10px; font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-55); text-decoration: none; position: relative; }
    .text-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 100%; height: 1px; background: var(--ink-30); transition: background 0.2s; }
    .text-link:hover { color: var(--ink); }
    .text-link:hover::after { background: var(--gold); }
    .rv { opacity: 0; transform: translateY(20px); transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1); }
    .rv.on { opacity: 1; transform: none; }
    .rv[data-d="1"] { transition-delay: 0.08s; }
    .rv[data-d="2"] { transition-delay: 0.16s; }

    /* ── Arc button — cream theme override ── */
    .arc-btn { background: var(--cream-mid) !important; border: 1px solid var(--ink-15) !important; box-shadow: 0 4px 24px rgba(24,21,15,0.08) !important; }
    .arc-btn:hover { background: var(--ink) !important; border-color: var(--ink) !important; }
    .arc-track { stroke: var(--ink-08) !important; }
    .arc-fill  { stroke: var(--gold) !important; }
    .arc-icon  { color: var(--ink-75) !important; font-family: var(--serif) !important; font-size: 14px !important; }
    .arc-btn:hover .arc-icon { color: var(--cream) !important; }
    .arc-inner { background: transparent !important; border: none !important; inset: 0 !important; border-radius: 0 !important; }

    /* ── Social events section ── */
    .events-sec { padding: 110px 0; background: var(--cream-deep); position: relative; overflow: hidden; }
    .events-sec::before { content: ''; position: absolute; top: 40px; right: 40px; width: 80px; height: 80px; border-top: 1px solid var(--ink-15); border-right: 1px solid var(--ink-15); pointer-events: none; }
    .events-sec::after  { content: ''; position: absolute; bottom: 40px; left: 40px; width: 80px; height: 80px; border-bottom: 1px solid var(--ink-15); border-left: 1px solid var(--ink-15); pointer-events: none; }
    .events-sec .wrap { position: relative; z-index: 1; }
    .events-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 52px; }
    .events-title { font-family: var(--serif); font-size: clamp(36px, 3.5vw, 56px); font-weight: 300; line-height: 1.05; color: var(--ink); }
    .events-title em { font-style: italic; }

    /* ── Past section — dimmed treatment ── */
    .social-past-sec { background: var(--cream-deep); padding-top: 0; border-top: 1px solid var(--ink-15); }
    .social-past-sec::before, .social-past-sec::after { display: none; }
    .social-past-sec .events-title { color: var(--ink-55); }

    /* ── Social card grid ── */
    .social-grid { display: flex; flex-direction: column; gap: 24px; }

    /* ── Past card — dimmed ── */
    .event-card--past { opacity: 0.55; transition: opacity 0.3s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease; }
    .event-card--past:hover { opacity: 0.75; transform: translateY(-2px); }
    .event-card--past .event-dot { background: var(--ink-30) !important; animation: none !important; }

    /* ── CTA inside card ── */
    .social-card-cta { margin-top: 28px; }

    /* ── EVENT CARD (matches events.html exactly) ── */
    .event-card {
      background: var(--cream); border: 1px solid var(--ink-15);
      display: grid; grid-template-columns: 1fr 280px; gap: 0;
      box-shadow: 0 2px 12px rgba(24,21,15,0.04), 0 8px 40px rgba(24,21,15,0.06);
      transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
      position: relative; overflow: hidden;
    }
    .event-card:not(.event-card--past):hover { transform: translateY(-4px); box-shadow: 0 4px 24px rgba(24,21,15,0.06), 0 16px 60px rgba(24,21,15,0.10); }
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

    /* ── Empty state ── */
    .event-empty-state {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; text-align: center;
      padding: 72px 48px;
      border: 1px solid var(--ink-15);
      background: var(--cream);
      box-shadow: 0 2px 12px rgba(24,21,15,0.04), 0 8px 40px rgba(24,21,15,0.06);
    }
    .event-empty-icon { font-size: 28px; color: var(--gold); opacity: 0.35; margin-bottom: 28px; line-height: 1; }
    .event-empty-title { font-family: var(--serif); font-size: clamp(22px, 2.5vw, 32px); font-weight: 300; font-style: italic; color: var(--ink); margin-bottom: 14px; line-height: 1.2; }
    .event-empty-body { font-family: var(--serif); font-size: 19px; font-weight: 400; color: var(--ink-75); line-height: 1.8; max-width: 400px; margin-bottom: 36px; }
    .event-empty-cta { display: inline-flex; align-items: center; padding: 12px 32px; border: 1px solid var(--ink-30); color: var(--ink-55); font-family: var(--sans); font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none; transition: background 0.2s, color 0.2s, border-color 0.2s; }
    .event-empty-cta:hover { background: var(--ink); color: var(--cream); border-color: var(--ink); }

    /* ── Marquee ── */
    .marquee-wrap { overflow: hidden; background: var(--ink); padding: 13px 0; position: relative; z-index: 2; display: flex; align-items: center; }
    .marquee-wrap::before, .marquee-wrap::after { content: ''; position: absolute; top: 0; bottom: 0; width: 80px; z-index: 1; pointer-events: none; }
    .marquee-wrap::before { left: 0; background: linear-gradient(to right, var(--ink), transparent); }
    .marquee-wrap::after  { right: 0; background: linear-gradient(to left, var(--ink), transparent); }
    .marquee-wrap .marquee-track { display: flex; flex-wrap: nowrap; align-items: center; white-space: nowrap; width: max-content; animation: marqueeScroll 32s linear infinite; }
    .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
    .m-item { font-family: var(--sans); font-size: 9px; font-weight: 600; letter-spacing: 0.34em; text-transform: uppercase; color: rgba(244,237,227,0.55); padding: 0 24px; flex-shrink: 0; white-space: nowrap; line-height: 1; }
    .m-gem { color: rgba(212,175,80,0.45); padding: 0 4px; flex-shrink: 0; line-height: 1; }

    /* ── Footer ── */
    footer { padding: 60px 0 36px; background: var(--cream-deep); border-top: 1px solid var(--ink-15); position: relative; overflow: hidden; }
    .footer-ghost { position: absolute; bottom: -24px; left: 50%; transform: translateX(-50%); font-family: var(--sans); font-size: 160px; font-weight: 700; letter-spacing: 0.3em; white-space: nowrap; color: transparent; -webkit-text-stroke: 1px rgba(24,21,15,0.04); user-select: none; pointer-events: none; z-index: 0; display: block; }
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

    /* ── Responsive ── */
    @media (max-width: 1100px) {
      .event-card { grid-template-columns: 1fr; }
      .event-main { border-right: none; border-bottom: 1px solid var(--ink-15); }
      .wrap { padding: 0 40px; }
      .events-sec { padding: 80px 0; }
      .page-hero { padding: 100px 40px 60px; }
      .footer-nav a { padding-right: 16px; margin-right: 16px; }
    }
    @media (max-width: 700px) {
      .wrap { padding: 0 20px; }
      .events-sec { padding: 60px 0; }
      .page-hero { padding: 80px 20px 48px; min-height: 50vh; }
      .page-hero-content { width: 100%; }
      .event-main { padding: 32px 24px; }
      .event-meta-row { padding: 18px 20px; }
      .hero-actions { flex-direction: column; gap: 16px; width: 100%; }
      .btn-primary { width: 100%; display: block; text-align: center; }
      .btn-ghost-link { display: inline-flex; justify-content: center; width: 100%; margin-top: 8px; font-size: 18px; }
      .event-empty-state { padding: 48px 24px; }
      .rv { transform: none; transition: opacity 0.4s ease; }
      .rv[data-d="1"], .rv[data-d="2"] { transition-delay: 0s; }
      .hero-title { font-size: clamp(44px, 11.7vw, 64px); }
      .hero-eyebrow { margin-bottom: 24px; gap: 8px; flex-wrap: wrap; justify-content: center; }
      .hero-eyebrow-rule { display: none; }
      .hero-eyebrow-text { font-size: 11px; letter-spacing: 0.12em; }
      .hero-hr { margin: 24px auto; }
      .hero-sub { line-height: 1.65; margin-bottom: 32px; }
      .footer-top { flex-direction: column; gap: 20px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .rv, .hero-eyebrow, .hero-pre, .hero-post, .hero-title, .hero-sub, .hero-hr, .hero-actions {
        opacity: 1 !important; transform: none !important; animation: none !important;
      }
    }

    @media print {
      .progress, .arc-btn, .hamburger, .mob-backdrop, .mob-drawer { display: none !important; }
      nav { position: static; }
      body { background: #fff; color: #000; }
    }
  `;
