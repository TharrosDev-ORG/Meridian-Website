export const speakCss = `
    /*
     * The Meridian Society — Speak Page Styles
     * Page-specific overrides only. Tokens and nav live in globals.css.
     */

    /* ── Keyframes ── */
    @keyframes riseIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
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
    .hero-hr { width: 44px; height: 1px; background: var(--ink-15); margin: 36px auto; }
    .hero-sub { font-family: var(--serif); font-size: clamp(19px, 2vw, 26px); font-style: italic; font-weight: 300; color: var(--ink-75); max-width: 520px; line-height: 1.85; margin-bottom: 44px; }
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
    .rv[data-d="3"] { transition-delay: 0.24s; }

    /* ── Arc button — cream theme override ── */
    .arc-btn { background: var(--cream-mid) !important; border: 1px solid var(--ink-15) !important; box-shadow: 0 4px 24px rgba(24,21,15,0.08) !important; }
    .arc-btn:hover { background: var(--ink) !important; border-color: var(--ink) !important; }
    .arc-track { stroke: var(--ink-08) !important; }
    .arc-fill  { stroke: var(--gold) !important; }
    .arc-icon  { color: var(--ink-75) !important; font-family: var(--serif) !important; font-size: 14px !important; }
    .arc-btn:hover .arc-icon { color: var(--cream) !important; }
    .arc-inner { background: transparent !important; border: none !important; inset: 0 !important; border-radius: 0 !important; }

    /* ── Why Speak section (value props) ── */
    .speak-why-sec { padding: 110px 0; background: var(--cream-deep); position: relative; overflow: hidden; }
    .speak-why-sec::before { content: ''; position: absolute; top: 40px; right: 40px; width: 80px; height: 80px; border-top: 1px solid var(--ink-15); border-right: 1px solid var(--ink-15); pointer-events: none; }
    .speak-why-sec::after  { content: ''; position: absolute; bottom: 40px; left: 40px; width: 80px; height: 80px; border-bottom: 1px solid var(--ink-15); border-left: 1px solid var(--ink-15); pointer-events: none; }
    .speak-why-sec .wrap { position: relative; z-index: 1; }
    .speak-why-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 52px; }
    .speak-why-title { font-family: var(--serif); font-size: clamp(36px, 3.5vw, 56px); font-weight: 300; line-height: 1.05; color: var(--ink); }
    .speak-why-title em { font-style: italic; }

    .speak-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .speak-why-card {
      background: var(--cream); border: 1px solid var(--ink-15);
      padding: 40px 36px; display: flex; flex-direction: column;
      box-shadow: 0 2px 12px rgba(24,21,15,0.04), 0 8px 40px rgba(24,21,15,0.06);
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s;
    }
    .speak-why-card:hover { transform: translateY(-4px); box-shadow: 0 4px 24px rgba(24,21,15,0.06), 0 16px 60px rgba(24,21,15,0.10); }
    .speak-why-num { font-family: var(--sans); font-size: 10.5px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
    .speak-why-heading { font-family: var(--serif); font-size: clamp(22px, 2vw, 32px); font-weight: 300; line-height: 1.15; color: var(--ink); margin-bottom: 16px; }
    .speak-why-body { font-family: var(--serif); font-size: 17px; line-height: 1.85; color: var(--ink-75); }

    /* ── Format section ── */
    .speak-format-sec { padding: 110px 0; background: var(--cream); }
    .speak-format-sec .wrap { position: relative; z-index: 1; }
    .speak-format-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 52px; }
    .speak-format-title { font-family: var(--serif); font-size: clamp(40px, 3.5vw, 56px); font-weight: 300; line-height: 1.05; color: var(--ink); }
    .speak-format-title em { font-style: italic; }

    .speak-meta { border: 1px solid var(--ink-15); background: var(--cream); box-shadow: 0 2px 12px rgba(24,21,15,0.04), 0 8px 40px rgba(24,21,15,0.06); }
    .speak-meta-row { display: grid; grid-template-columns: 220px 1fr; padding: 26px 32px; border-bottom: 1px solid var(--ink-08); transition: background 0.2s; }
    .speak-meta-row:last-child { border-bottom: none; }
    .speak-meta-row:hover { background: rgba(24,21,15,0.02); }
    .speak-meta-lbl { font-family: var(--sans); font-size: 10.5px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-55); padding-top: 4px; }
    .speak-meta-val { font-family: var(--serif); font-size: 22px; font-style: italic; color: var(--ink); line-height: 1.4; }

    /* ── Apply section ── */
    .speak-apply-sec { padding: 110px 0; background: var(--cream-deep); position: relative; overflow: hidden; }
    .speak-apply-sec::before { content: ''; position: absolute; top: 40px; right: 40px; width: 80px; height: 80px; border-top: 1px solid var(--ink-15); border-right: 1px solid var(--ink-15); pointer-events: none; }
    .speak-apply-sec::after  { content: ''; position: absolute; bottom: 40px; left: 40px; width: 80px; height: 80px; border-bottom: 1px solid var(--ink-15); border-left: 1px solid var(--ink-15); pointer-events: none; }
    .speak-apply-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; text-align: center; }
    .speak-apply-title { font-family: var(--serif); font-size: clamp(40px, 5vw, 76px); font-weight: 300; line-height: 1.0; color: var(--ink); margin-bottom: 20px; }
    .speak-apply-body { font-family: var(--serif); font-size: clamp(19px, 2vw, 24px); font-style: italic; font-weight: 300; color: var(--ink-75); line-height: 1.85; margin-bottom: 44px; }
    .speak-apply-ctas { display: flex; align-items: center; justify-content: center; gap: 36px; margin-bottom: 28px; }
    .speak-apply-trust { font-family: var(--sans); font-size: 10.5px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-55); }

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
      .speak-why-grid { grid-template-columns: repeat(2, 1fr); }
      .footer-nav a { padding-right: 16px; margin-right: 16px; }
      .wrap { padding: 0 40px; }
      .speak-why-sec, .speak-format-sec, .speak-apply-sec { padding: 80px 0; }
      .page-hero { padding: 100px 40px 60px; }
      .speak-meta-row { grid-template-columns: 180px 1fr; }
    }
    @media (max-width: 700px) {
      .speak-why-grid { grid-template-columns: 1fr; }
      .speak-meta-row { grid-template-columns: 1fr; gap: 6px; }
      .speak-apply-ctas { flex-direction: column; gap: 16px; width: 100%; }
      .btn-primary { width: 100%; display: block; text-align: center; }
      .btn-ghost-link { display: inline-flex; justify-content: center; width: 100%; margin-top: 8px; font-size: 18px; }
      .wrap { padding: 0 20px; }
      .speak-why-sec, .speak-format-sec, .speak-apply-sec { padding: 60px 0; }
      .page-hero { padding: 80px 20px 48px; min-height: 50vh; }
      .footer-top { flex-direction: column; gap: 20px; }
      .hero-title { font-size: clamp(38px, 10.5vw, 52px); }
      .hero-eyebrow { margin-bottom: 24px; gap: 8px; flex-wrap: wrap; justify-content: center; }
      .hero-eyebrow-rule { display: none; }
      .hero-eyebrow-text { font-size: 11px; letter-spacing: 0.12em; }
      .hero-hr { margin: 24px auto; }
      .hero-sub { font-size: 16px; line-height: 1.65; margin-bottom: 32px; }
      
      /* Optimize text heavy blocks on mobile */
      .speak-why-title, .speak-format-title, .speak-apply-title { font-size: 32px; line-height: 1.1; }
      .speak-why-body, .speak-apply-body { font-size: 16px; line-height: 1.7; }
      .speak-why-heading { font-size: 20px; }
      .speak-why-card { padding: 32px 24px; }
      .speak-meta-val { font-size: 18px; }
      .speak-format-header { flex-direction: column; align-items: flex-start; gap: 16px; }
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
