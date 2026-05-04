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

    /* ── Gathering Grid ── */
    .gathering-sec { padding: 80px 0; background: var(--cream-mid); }
    .gathering-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
    .gathering-card { background: var(--cream); padding: 48px; border: 1px solid var(--ink-08); box-shadow: 0 4px 20px rgba(24,21,15,0.04); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease; position: relative; overflow: hidden; will-change: transform, opacity; }
    @media (min-width: 1101px) {
      .gathering-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(24,21,15,0.06); }
    }
    .gathering-type { font-family: var(--sans); font-size: 10px; font-weight: 700; color: var(--gold); margin-bottom: 20px; letter-spacing: 0.2em; text-transform: uppercase; }
    .gathering-h3 { font-family: var(--serif); font-size: 24px; font-weight: 300; color: var(--ink); margin-bottom: 16px; }
    .gathering-p { font-family: var(--serif); font-size: 17px; line-height: 1.7; color: var(--ink-75); }

    /* ── Stay Notified (Matches Events) ── */

    /* ══ Desktop optimizations ══ */
    @media (min-width: 1101px) {
      .social-about-sec { padding: 112px 0; }
      .gathering-sec { padding: 112px 0; }

      /* Intro grid: 2-col at desktop for richer layout */
      .module-intro-grid {
        display: grid;
        grid-template-columns: 0.9fr 1.1fr;
        gap: 72px;
        align-items: start;
      }
      .module-intro-left { padding-right: 16px; }

      /* Gathering cards: richer breathing & content width */
      .gathering-grid { gap: 40px; }
      .gathering-card { padding: 56px; }
      .gathering-h3 { font-size: 26px; margin-bottom: 18px; }
      .gathering-p { font-size: 18px; line-height: 1.8; max-width: 42ch; }
      .gathering-card:hover {
        transform: perspective(var(--perspective-card)) translateY(-8px) rotateX(2deg) rotateY(-1deg) translateZ(12px);
        box-shadow: 0 20px 64px rgba(24,21,15,0.12), 0 2px 8px rgba(184,147,42,0.06);
      }
    }

    /* ── Responsive ── */
    @media (max-width: 1100px) {
      .social-intro-right { padding: 40px; }
      .gathering-card { padding: 32px; }
      .rv { transform: none; transition: opacity 0.4s ease; }
    }

    @media (max-width: 750px) {
      .gathering-grid { grid-template-columns: 1fr; gap: 16px; }
      .social-p { font-size: 17px; padding-left: 18px; line-height: 1.72; }
      .social-h2 {
        font-size: clamp(30px, 8vw, 40px);
        line-height: 1.08;
        margin-bottom: 20px;
      }
    }

    @media (max-width: 700px) {
      .social-about-sec, .gathering-sec { padding: 60px 0; }
      .gathering-type { font-size: 9.5px; letter-spacing: 0.22em; margin-bottom: 14px; }
      .gathering-h3 { font-size: 20px; margin-bottom: 12px; line-height: 1.2; }
      .gathering-p { font-size: 16.5px; line-height: 1.72; }
      .gathering-card { padding: 30px 22px; }
    }

    @media (max-width: 380px) {
      .gathering-card { padding: 26px 20px; }
      .gathering-p { font-size: 16px; }
    }
  `;
