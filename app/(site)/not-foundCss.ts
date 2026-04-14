export const notFoundCss = `
    /*
     * The Meridian Society — 404 Page Styles
     * Uses the cream/ink palette consistent with all other site pages.
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
    }

    body {
      background: var(--cream);
      color: var(--ink);
      font-family: var(--serif);
    }

    /* Arc button cream override */
    .arc-btn { background: var(--cream-mid); border-color: var(--ink-15); }
    .arc-btn .arc-icon { color: var(--ink-75); }
    .arc-track { stroke: var(--ink-15); }
    .arc-fill  { stroke: var(--gold); }

    /* Nav cream override — matches events.html / team.html */
    #mainNav {
      --cream: #18150F;
      --cream-70: rgba(24,21,15,0.90);
      --cream-45: rgba(24,21,15,0.75);
      --cream-20: rgba(24,21,15,0.55);
      --black: #F4EDE3;
      --gold: #B8932A;
      background: rgba(244,237,227,0.92) !important;
      backdrop-filter: blur(16px) !important;
    }
    #mainNav.scrolled {
      background: rgba(244,237,227,0.98) !important;
      border-bottom-color: rgba(184,147,42,0.25) !important;
    }

    .e404-main {
      min-height: 100svh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120px 52px 80px;
      background: var(--cream);
    }

    .e404-wrap {
      text-align: center;
      max-width: 640px;
    }

    .e404-eyebrow {
      font-family: var(--sans);
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 28px;
    }

    .e404-code {
      font-family: var(--serif);
      font-size: clamp(96px, 18vw, 180px);
      font-weight: 700;
      line-height: 0.9;
      letter-spacing: -0.02em;
      color: var(--ink-15);
      margin-bottom: 36px;
    }

    .e404-rule {
      width: 48px;
      height: 1px;
      background: var(--gold);
      margin: 0 auto 32px;
      opacity: 0.5;
    }

    .e404-title {
      font-family: var(--serif);
      font-size: clamp(26px, 3.5vw, 44px);
      font-weight: 400;
      color: var(--ink);
      letter-spacing: 0.01em;
      margin-bottom: 20px;
    }

    .e404-desc {
      font-family: var(--serif);
      font-size: clamp(17px, 1.8vw, 21px);
      font-style: italic;
      font-weight: 300;
      color: var(--ink-55);
      line-height: 1.7;
      margin-bottom: 44px;
    }

    .e404-ctas {
      display: flex;
      gap: 28px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }

    .e404-cta-primary {
      display: inline-flex;
      align-items: center;
      padding: 14px 36px;
      background: var(--ink);
      color: var(--cream);
      text-decoration: none;
      font-family: var(--sans);
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      position: relative;
      overflow: hidden;
      transition: color 0.28s;
    }
    .e404-cta-primary::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--gold);
      transform: translateX(-101%);
      transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
    }
    .e404-cta-primary span { position: relative; z-index: 1; }
    .e404-cta-primary:hover::before { transform: translateX(0); }
    .e404-cta-primary:hover { color: var(--ink); }

    .e404-cta-ghost {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      font-family: var(--sans);
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--ink-55);
      transition: color 0.25s;
      padding: 14px 0;
    }
    .e404-cta-ghost:hover { color: var(--ink); }

    @media (max-width: 700px) {
      .e404-main { padding: 100px 20px 60px; }
      .e404-ctas { flex-direction: column; gap: 16px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .e404-cta-primary, .e404-cta-primary::before { transition: none; }
    }
  `;
