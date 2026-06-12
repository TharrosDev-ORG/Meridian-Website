export const notFoundCss = `
    /*
     * The Meridian Society — 404 Page Styles
     * The dark "forum" surface: a page lost beyond the meridian, at night.
     * Tokens come from globals.css; the section opts in via data-theme="dark".
     */

    .e404-main {
      min-height: 100svh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120px 52px 80px;
    }
    .e404-main::after {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 55% 45% at 50% 42%, var(--gold-glow) 0%, transparent 70%);
      opacity: 0.25;
      pointer-events: none;
    }

    .e404-wrap {
      position: relative; z-index: 1;
      text-align: center;
      max-width: 640px;
    }

    .e404-eyebrow {
      font-family: var(--sans);
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--gold-lt);
      margin-bottom: 28px;
    }

    .e404-code {
      font-family: var(--serif);
      font-size: clamp(96px, 18vw, 180px);
      font-weight: 300;
      line-height: 0.9;
      letter-spacing: -0.02em;
      color: transparent;
      -webkit-text-stroke: 1.5px rgba(244,237,227,0.18);
      margin-bottom: 36px;
    }

    .e404-rule {
      width: 48px;
      height: 1px;
      background: var(--gold);
      margin: 0 auto 32px;
      opacity: 0.6;
    }

    .e404-title {
      font-family: var(--serif);
      font-size: clamp(28px, 3.8vw, 52px);
      font-weight: 300;
      color: var(--cream);
      letter-spacing: 0.01em;
      margin-bottom: 20px;
      text-wrap: balance;
    }

    .e404-desc {
      font-family: var(--serif);
      font-size: clamp(17px, 1.8vw, 21px);
      font-style: italic;
      font-weight: 300;
      color: var(--cream-75);
      line-height: 1.8;
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
      background: var(--gold);
      color: var(--ink);
      text-decoration: none;
      font-family: var(--sans);
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      position: relative;
      overflow: hidden;
      transition: color 0.28s, box-shadow 0.3s;
    }
    .e404-cta-primary::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--gold-lt);
      transform: translateX(-101%);
      transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
    }
    .e404-cta-primary span { position: relative; z-index: 1; }
    .e404-cta-primary:hover::before { transform: translateX(0); }
    .e404-cta-primary:hover { box-shadow: 0 8px 32px var(--gold-glow); }

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
      color: var(--cream-55);
      transition: color 0.25s;
      padding: 14px 0;
    }
    .e404-cta-ghost:hover { color: var(--cream); }

    @media (min-width: 1101px) {
      .e404-main { padding: 140px 72px 100px; }
      .e404-wrap { max-width: 720px; }
      .e404-code { font-size: clamp(160px, 16vw, 220px); margin-bottom: 44px; }
      .e404-title { margin-bottom: 24px; }
      .e404-desc { margin-bottom: 52px; }
      .e404-cta-primary { padding: 16px 40px; font-size: 12px; letter-spacing: 0.24em; }
      .e404-cta-ghost { font-size: 12px; letter-spacing: 0.22em; }
    }

    @media (max-width: 700px) {
      .e404-main { padding: 100px 20px 60px; }
      .e404-ctas { flex-direction: column; gap: 16px; }
      .e404-cta-primary { width: 100%; justify-content: center; }
    }

    @media (prefers-reduced-motion: reduce) {
      .e404-cta-primary, .e404-cta-primary::before { transition: none; }
    }
  `;
