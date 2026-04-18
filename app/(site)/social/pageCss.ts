export const socialCss = `
    /*
     * The Meridian Society — Social Events Page Styles
     * Page-specific overrides only. Tokens and nav live in globals.css.
     */

    /* Keyframes consolidated to globals.css */

    /* ── Page hero ── */
    /* ── Social Intro ── */
    .social-about-sec { padding: 80px 0; background: var(--cream-deep); border-bottom: 1px solid var(--ink-08); }
    .social-intro-grid { display: flex; flex-direction: column; gap: 48px; align-items: stretch; }
    .social-intro-left { max-width: 800px; }
    .social-h2 { font-family: var(--serif); font-size: clamp(32px, 4vw, 56px); font-weight: 300; line-height: 1.1; color: var(--ink); margin-bottom: 24px; }
    .social-h2 em { font-style: italic; }
    .social-intro-right { 
      background: var(--cream); padding: 56px; border: 1px solid var(--gold-lt); 
      box-shadow: 0 4px 24px rgba(24,21,15,0.04); 
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease; 
      position: relative; overflow: hidden;
    }
    .social-intro-right::before {
      content: 'SOCIAL'; position: absolute; bottom: -20px; right: -10px;
      font-family: var(--sans); font-size: 140px; font-weight: 700;
      color: var(--ink); opacity: 0.02; letter-spacing: 0.1em;
      pointer-events: none; z-index: 0;
    }
    .social-intro-right::after {
      content: ''; position: absolute; inset: 12px;
      border: 1px solid var(--gold); opacity: 0.1;
      pointer-events: none; z-index: 0;
      mask-image: 
        linear-gradient(to right, black 20px, transparent 20px, transparent calc(100% - 20px), black calc(100% - 20px)),
        linear-gradient(to bottom, black 20px, transparent 20px, transparent calc(100% - 20px), black calc(100% - 20px));
      mask-composite: intersect;
    }
    .social-p { 
      font-family: var(--serif); font-size: 20px; line-height: 1.85; color: var(--ink-85); 
      position: relative; z-index: 1; padding-left: 32px; border-left: 1px solid rgba(184,147,42,0.2);
    }

    /* ── The Vibe Grid ── */
    .vibe-sec { padding: 80px 0; background: var(--cream); }
    .vibe-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
    .vibe-card { padding: 48px; border: 1px solid var(--ink-08); background: var(--cream-mid); transition: transform 0.4s ease; }
    .vibe-card:hover { transform: translateY(-4px); border-color: var(--gold-lt); }
    .vibe-type { font-family: var(--sans); font-size: 10px; font-weight: 700; color: var(--gold); margin-bottom: 20px; letter-spacing: 0.25em; text-transform: uppercase; }
    .vibe-h3 { font-family: var(--serif); font-size: 28px; font-weight: 300; color: var(--ink); margin-bottom: 16px; }
    .vibe-p { font-family: var(--serif); font-size: 18px; line-height: 1.7; color: var(--ink-75); }

    /* ── Stay Notified (Matches Events) ── */
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
      .social-intro-right { padding: 40px; }
      .vibe-card { padding: 32px; }
      .rv { transform: none; transition: opacity 0.4s ease; }
    }

    @media (max-width: 750px) {
      .vibe-grid { grid-template-columns: 1fr; gap: 20px; }
      .social-p { font-size: 18px; padding-left: 20px; }
      .social-h2 { font-size: 32px; }
    }
  `;
