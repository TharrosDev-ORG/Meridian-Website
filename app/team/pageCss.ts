export const teamCss = `
    /*
     * The Meridian Society — Team Page Styles
     * Design system matches index.html overhaul.
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

    /* ── Nav override — cream theme (matches index.html) ── */
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

    /* ── Page hero (subpage version of index hero) ── */
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
    .hero-eyebrow { display: flex; align-items: center; gap: 16px; margin-bottom: 52px; opacity: 0; animation: riseIn 0.7s 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }
    .hero-eyebrow-rule { width: 36px; height: 1px; background: var(--gold); opacity: 0.5; }
    .hero-eyebrow-text { font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); }
    .hero-pre { font-family: var(--serif); font-size: clamp(18px, 2.5vw, 30px); font-style: italic; font-weight: 300; color: var(--ink-55); letter-spacing: 0.06em; margin-bottom: 10px; opacity: 0; animation: riseIn 0.7s 0.55s cubic-bezier(0.16,1,0.3,1) forwards; }
    .hero-title { font-family: var(--serif); font-size: clamp(64px, 12vw, 160px); font-weight: 300; line-height: 0.86; color: var(--ink); letter-spacing: 0.06em; opacity: 0; animation: riseIn 0.9s 0.7s cubic-bezier(0.16,1,0.3,1) forwards; text-shadow: 0 2px 40px rgba(24,21,15,0.04); }
    .hero-hr { width: 44px; height: 1px; background: var(--ink-15); margin: 36px auto; opacity: 0; animation: riseIn 0.6s 0.95s ease forwards; }
    .hero-sub { font-family: var(--serif); font-size: clamp(19px, 2vw, 26px); font-style: italic; font-weight: 300; color: var(--ink-75); max-width: 520px; line-height: 1.85; margin-bottom: 44px; opacity: 0; animation: riseIn 0.7s 1.05s ease forwards; }
    .hero-actions { display: flex; align-items: center; gap: 36px; opacity: 0; animation: riseIn 0.7s 1.2s ease forwards; }
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
    .rv[data-d="3"] { transition-delay: 0.24s; }

    /* ── Arc button — cream theme override ── */
    .arc-btn { background: var(--cream-mid) !important; border: 1px solid var(--ink-15) !important; box-shadow: 0 4px 24px rgba(24,21,15,0.08) !important; }
    .arc-btn:hover { background: var(--ink) !important; border-color: var(--ink) !important; }
    .arc-track { stroke: var(--ink-08) !important; }
    .arc-fill  { stroke: var(--gold) !important; }
    .arc-icon  { color: var(--ink-75) !important; font-family: var(--serif) !important; font-size: 14px !important; }
    .arc-btn:hover .arc-icon { color: var(--cream) !important; }
    .arc-inner { background: transparent !important; border: none !important; inset: 0 !important; border-radius: 0 !important; }

    /* ── Team section ── */
    .team-sec { padding: 110px 0; background: var(--cream-deep); position: relative; overflow: hidden; }
    .team-sec::before { content: ''; position: absolute; top: 40px; right: 40px; width: 80px; height: 80px; border-top: 1px solid var(--ink-15); border-right: 1px solid var(--ink-15); pointer-events: none; }
    .team-sec::after  { content: ''; position: absolute; bottom: 40px; left: 40px; width: 80px; height: 80px; border-bottom: 1px solid var(--ink-15); border-left: 1px solid var(--ink-15); pointer-events: none; }
    .team-sec .wrap { position: relative; z-index: 1; }
    .team-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 52px; }
    .team-title { font-family: var(--serif); font-size: clamp(36px, 3.5vw, 56px); font-weight: 300; line-height: 1.05; color: var(--ink); }
    .team-title em { font-style: italic; }

    /* ── Member grid ── */
    .member-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

    .member-card {
      display: flex; flex-direction: column;
      background: var(--cream); border: 1px solid var(--ink-15);
      overflow: hidden; position: relative;
      box-shadow: 0 2px 12px rgba(24,21,15,0.04), 0 8px 40px rgba(24,21,15,0.06);
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s;
    }
    .member-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 24px rgba(24,21,15,0.06), 0 16px 60px rgba(24,21,15,0.10);
    }

    .member-photo-wrap {
      position: relative; width: 96px; height: 120px; flex-shrink: 0;
      overflow: hidden; background: var(--cream-mid);
      border: 1px solid var(--ink-15);
      box-shadow: inset 0 0 0 1px rgba(24,21,15,0.05);
    }
    .member-photo {
      width: 100%; height: 100%; object-fit: cover; object-position: center top;
      display: block; transition: filter 0.4s ease;
    }
    .member-photo-placeholder {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      color: var(--gold); opacity: 0.15;
      font-family: var(--sans); font-size: 11px;
      letter-spacing: 0.24em; text-transform: uppercase;
    }

    .member-body { padding: 28px 28px 32px; display: flex; flex-direction: column; flex: 1; }
    .member-header { display: flex; align-items: flex-start; gap: 18px; margin-bottom: 22px; }

    .member-name { font-family: var(--serif); font-size: 26px; font-weight: 300; color: var(--ink); line-height: 1.1; margin-bottom: 6px; }
    .member-role { font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); }
    .member-studies { font-family: var(--serif); font-size: 17px; font-style: italic; color: var(--ink-75); line-height: 1.55; border-left: 2px solid var(--ink-15); padding-left: 14px; margin-bottom: 18px; }
    .member-bio { font-family: var(--serif); font-size: 18px; font-weight: 400; color: var(--ink-90); line-height: 1.75; flex: 1; margin-bottom: 24px; }

    .member-social { display: flex; gap: 10px; margin-top: auto; }
    .member-social a {
      display: flex; align-items: center; justify-content: center;
      width: 34px; height: 34px;
      border: 1px solid var(--ink-15); color: var(--ink-55);
      background: transparent;
      transition: background 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    }
    .member-social a:hover {
      background: var(--ink); color: var(--cream);
      border-color: var(--ink);
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(24,21,15,0.12);
    }
    .member-social svg { width: 15px; height: 15px; }

    /* Placeholder card */
    .member-card--placeholder {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; min-height: 320px; border-style: dashed;
      background: transparent; box-shadow: none;
    }
    .member-card--placeholder:hover { transform: none; box-shadow: none; border-color: var(--ink-30); }
    .placeholder-icon { font-size: 22px; color: var(--gold); opacity: 0.25; margin-bottom: 20px; line-height: 1; }
    .placeholder-text { font-family: var(--serif); font-size: 20px; font-style: italic; font-weight: 300; color: var(--ink-55); line-height: 1.4; }
    .placeholder-sub { font-family: var(--sans); font-size: 9px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); opacity: 0.50; margin-top: 12px; }

    /* ── Marquee ── */
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
    .marquee-wrap .marquee-track {
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

    /* ── Footer ── */
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

    /* ── Responsive ── */
    @media (max-width: 1100px) {
      .member-grid { grid-template-columns: repeat(2, 1fr); }
      .footer-nav a { padding-right: 16px; margin-right: 16px; }
      .wrap { padding: 0 40px; }
      .team-sec { padding: 80px 0; }
      .page-hero { padding: 100px 40px 60px; }
    }
    @media (max-width: 700px) {
      .member-grid { grid-template-columns: 1fr; }
      .member-card--placeholder { min-height: 200px; }
      .wrap { padding: 0 20px; }
      .team-sec { padding: 60px 0; }
      .page-hero { padding: 80px 20px 48px; min-height: 50vh; }
      .footer-top { flex-direction: column; gap: 20px; }
      .hero-title { font-size: clamp(44px, 11.7vw, 64px); }
      .hero-eyebrow { margin-bottom: 24px; gap: 8px; flex-wrap: wrap; justify-content: center; }
      .hero-eyebrow-rule { display: none; }
      .hero-eyebrow-text { font-size: 11px; letter-spacing: 0.12em; }
      .hero-hr { margin: 24px auto; }
      .hero-sub { line-height: 1.65; margin-bottom: 32px; }
      .rv { transform: none; transition: opacity 0.4s ease; }
      .rv[data-d="1"], .rv[data-d="2"], .rv[data-d="3"] { transition-delay: 0s; }
    }

    @media (prefers-reduced-motion: reduce) {
      .rv, .hero-eyebrow, .hero-pre, .hero-title, .hero-sub, .hero-hr, .hero-actions {
        opacity: 1 !important; transform: none !important; animation: none !important;
      }
    }

    @media print {
      .progress, .arc-btn, .hamburger, .mob-backdrop, .mob-drawer { display: none !important; }
      nav { position: static; }
      body { background: #fff; color: #000; }
    }
  `;
