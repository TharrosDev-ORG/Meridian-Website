export const socialCss = `
    /*
     * The Meridian Society — Social Events Page Styles
     * Page-specific overrides only. Tokens and nav live in globals.css.
     */

    /* Keyframes consolidated to globals.css */

    /* ── Page hero ── */
    /* ── Social Intro ── */
    .social-about-sec { padding: 80px 0; background: var(--cream-deep); border-bottom: 1px solid var(--ink-08); }
    .social-h2 { font-family: var(--serif); font-size: clamp(32px, 4vw, 56px); font-weight: 300; line-height: 1.1; color: var(--ink); margin-bottom: 24px; }
    .social-h2 em { font-style: italic; }
    
    .module-intro-right::before {
      content: 'SOCIAL'; position: absolute; bottom: -20px; right: -10px;
      font-family: var(--sans); font-size: 140px; font-weight: 700;
      color: var(--ink); opacity: 0.02; letter-spacing: 0.1em;
      pointer-events: none; z-index: 0;
    }

    /* ── Vibe Grid ── */
    .vibe-sec { padding: 80px 0; background: var(--cream-mid); }
    /* ── Vibe Grid ── */
    .vibe-sec { padding: 80px 0; background: var(--cream-mid); }
    .vibe-type { font-family: var(--sans); font-size: 10px; font-weight: 700; color: var(--gold); margin-bottom: 20px; letter-spacing: 0.2em; text-transform: uppercase; }
    .vibe-h3 { font-family: var(--serif); font-size: 24px; font-weight: 300; color: var(--ink); margin-bottom: 16px; }
    .vibe-p { font-family: var(--serif); font-size: 17px; line-height: 1.7; color: var(--ink-75); }

    /* ── Stay Notified (Matches Events) ── */



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
