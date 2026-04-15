export const eventsCss = `
    /*
     * The Meridian Society — Events Page Styles
     * Page-specific overrides only. Tokens and nav live in globals.css.
     */

    /* Keyframes consolidated to globals.css */

    /* ── Page hero (subpage version of index hero) ── */
    .page-hero {
      position: relative; min-height: 60vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; padding: 110px 64px 60px; overflow: hidden;
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
    .hero-eyebrow { display: flex; align-items: center; gap: 16px; margin-bottom: 40px; }
    .hero-eyebrow-rule { width: 36px; height: 1px; background: var(--gold); opacity: 0.5; }
    .hero-eyebrow-text { font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); }
    .hero-pre { font-family: var(--serif); font-size: clamp(18px, 2.5vw, 30px); font-style: italic; font-weight: 300; color: var(--ink-55); letter-spacing: 0.06em; margin-bottom: 8px; }
    .hero-title { font-family: var(--serif); font-size: clamp(64px, 12vw, 160px); font-weight: 300; line-height: 0.86; color: var(--ink); letter-spacing: 0.06em; text-shadow: 0 2px 40px rgba(24,21,15,0.04); }
    .hero-hr { width: 44px; height: 1px; background: var(--ink-15); margin: 28px auto; }
    .hero-sub { font-family: var(--serif); font-size: clamp(19px, 2vw, 26px); font-style: italic; font-weight: 300; color: var(--ink-75); max-width: 520px; line-height: 1.85; margin-bottom: 32px; }
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
    .wrap { max-width: 1440px; margin: 0 auto; padding: 0 64px; }
    .sec-label { font-family: var(--sans); font-size: 10.5px; font-weight: 700; letter-spacing: 0.34em; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
    .sec-label::after { content: ''; flex: 1; height: 1px; background: var(--gold); opacity: 0.15; }
    .text-link { display: inline-flex; align-items: center; gap: 10px; font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-55); text-decoration: none; position: relative; }
    .text-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 100%; height: 1px; background: var(--ink-30); transition: background 0.2s; }
    .text-link:hover { color: var(--ink); }
    .text-link:hover::after { background: var(--gold); }
    /* Scroll reveals consolidated to globals.css */

    /* ── Events intro ── */
    .events-sec { padding: 80px 0; background: var(--cream-deep); position: relative; overflow: hidden; }
    .events-sec::before { content: ''; position: absolute; top: 40px; right: 40px; width: 80px; height: 80px; border-top: 1px solid var(--ink-15); border-right: 1px solid var(--ink-15); pointer-events: none; }
    .events-sec::after  { content: ''; position: absolute; bottom: 40px; left: 40px; width: 80px; height: 80px; border-bottom: 1px solid var(--ink-15); border-left: 1px solid var(--ink-15); pointer-events: none; }
    .events-intro-grid { display: flex; flex-direction: column; gap: 48px; align-items: stretch; }
    .events-intro-left { max-width: 800px; }
    .events-copy-title { font-family: var(--serif); font-size: clamp(32px, 4vw, 56px); font-weight: 300; line-height: 1.1; color: var(--ink); margin-bottom: 24px; }
    .events-copy-title em { font-style: italic; }
    .events-intro-right { background: var(--cream); padding: 48px; border: 1px solid var(--gold-lt); box-shadow: 0 4px 24px rgba(24,21,15,0.04); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease; }
    .events-intro-right:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(184,147,42,0.12); }
    .events-copy-body { font-family: var(--serif); font-size: 20px; line-height: 1.85; color: var(--ink-85); }

    /* ── Signature Series ── */
    .sig-sec { padding: 80px 0; background: var(--cream); position: relative; border-top: 1px solid var(--ink-08); }
    .sig-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
    .sig-card { padding: 40px; border: 1px solid var(--ink-08); background: var(--cream); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease; }
    .sig-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(24,21,15,0.06); }
    .sig-num { font-family: var(--sans); font-size: 10px; font-weight: 700; color: var(--gold); margin-bottom: 20px; letter-spacing: 0.2em; }
    .sig-h { font-family: var(--serif); font-size: 24px; font-weight: 300; color: var(--ink); margin-bottom: 16px; }
    .sig-p { font-family: var(--serif); font-size: 17px; line-height: 1.7; color: var(--ink-75); }

    /* ── Metadata Grid (Expectations) ── */
    .expect-sec { padding: 80px 0; background: var(--cream-mid); border-top: 1px solid var(--ink-08); }
    .expect-header { margin-bottom: 40px; }
    .expect-title { font-family: var(--serif); font-size: clamp(36px, 4vw, 56px); font-weight: 300; line-height: 1.05; color: var(--ink); }
    .expect-title em { font-style: italic; }
    .expect-grid { border: 1px solid var(--ink-15); background: var(--cream); box-shadow: 0 2px 12px rgba(24,21,15,0.04), 0 8px 40px rgba(24,21,15,0.06); margin-top: 40px; }
    .expect-row { display: grid; grid-template-columns: 220px 1fr; border-bottom: 1px solid var(--ink-08); padding: 26px 32px; transition: background 0.2s; }
    .expect-row:last-child { border-bottom: none; }
    .expect-row:hover { background: rgba(24,21,15,0.02); }
    .expect-lbl { font-family: var(--sans); font-size: 10.5px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: var(--ink-55); padding-top: 4px; }
    .expect-val { font-family: var(--serif); font-size: 22px; font-style: italic; color: var(--ink); line-height: 1.4; }

    /* ── Stay Notified CTA ── */
    .notify-sec { padding: 80px 0; background: var(--cream-deep); position: relative; overflow: hidden; border-top: 1px solid var(--ink-15); }
    .notify-sec::before { content: ''; position: absolute; top: 40px; right: 40px; width: 80px; height: 80px; border-top: 1px solid var(--ink-15); border-right: 1px solid var(--ink-15); pointer-events: none; }
    .notify-sec::after  { content: ''; position: absolute; bottom: 40px; left: 40px; width: 80px; height: 80px; border-bottom: 1px solid var(--ink-15); border-left: 1px solid var(--ink-15); pointer-events: none; }
    .notify-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; text-align: center; }
    .notify-title { font-family: var(--serif); font-size: clamp(40px, 5vw, 76px); font-weight: 300; line-height: 1.0; color: var(--ink); margin-bottom: 20px; }
    .notify-title em { font-style: italic; color: var(--gold); }
    .notify-sub { font-family: var(--serif); font-size: clamp(19px, 2vw, 24px); font-style: italic; font-weight: 300; color: var(--ink-75); line-height: 1.85; margin-bottom: 44px; }
    .notify-actions { display: flex; align-items: center; justify-content: center; }

    /* ── Responsive ── */
    @media (max-width: 1100px) {
      .event-card { grid-template-columns: 1fr; }
      .event-main { border-right: none; border-bottom: 1px solid var(--ink-15); }
      .wrap { padding: 0 40px; }
      .events-sec { padding: 80px 0; }
      .page-hero { padding: 100px 40px 60px; }
    }
    @media (max-width: 700px) {
      .wrap { padding: 0 20px; }
      .events-sec { padding: 60px 0; }
      .page-hero { padding: 80px 20px 48px; min-height: 50vh; }
      .event-main { padding: 32px 24px; }
      .event-meta-row { padding: 18px 20px; }
      .hero-actions { flex-direction: column; gap: 16px; width: 100%; }
      .btn-primary { width: 100%; display: block; text-align: center; }
      .btn-ghost-link { display: inline-flex; justify-content: center; width: 100%; margin-top: 8px; font-size: 18px; }
      .event-empty-state { padding: 48px 24px; }
      .rv { transform: none; transition: opacity 0.4s ease; }
      .rv[data-d="1"], .rv[data-d="2"] { transition-delay: 0s; }
      .hero-title { font-size: clamp(38px, 10.5vw, 52px); }
      .hero-eyebrow { margin-bottom: 24px; gap: 8px; flex-wrap: wrap; justify-content: center; }
      .hero-eyebrow-rule { display: none; }
      .hero-eyebrow-text { font-size: 11px; letter-spacing: 0.12em; }
      .hero-hr { margin: 24px auto; }
      .hero-sub { font-size: 16px; line-height: 1.65; margin-bottom: 32px; }
      
      /* Optimize text heavy blocks on mobile */
      .events-intro-grid { grid-template-columns: 1fr; gap: 40px; }
      .events-intro-right { padding: 32px 24px; }
      .sig-grid { grid-template-columns: 1fr; }
      .events-copy-title, .notify-title, .expect-title { font-size: 32px; line-height: 1.1; }
      .events-copy-body, .notify-sub { font-size: 16px; line-height: 1.7; }
      .expect-row { grid-template-columns: 1fr; gap: 6px; }
      .expect-val { font-size: 18px; line-height: 1.4; }
      .sig-h { font-size: 20px; }
      .sig-p { font-size: 15.5px; line-height: 1.6; }
      .sig-card { padding: 32px 24px; }
    }

    /* ── Footer (matches index.html — overrides page.css footer) ── */
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

    @media (max-width: 1100px) {
      .footer-nav a { padding-right: 16px; margin-right: 16px; }
    }
    @media (max-width: 700px) {
      .footer-top { flex-direction: column; gap: 20px; }
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
