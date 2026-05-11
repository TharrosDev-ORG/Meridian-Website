export const eventsCss = `
    /*
     * The Meridian Society — Events Page Styles
     * Tabbed Forum / Social layout. Tokens and nav live in globals.css.
     */

    /* ── Tabs section shell ── */
    .events-tabs-sec {
      padding: 88px 0;
      background: var(--cream-deep);
      position: relative;
      overflow: hidden;
    }
    .events-tabs-sec::before {
      content: ''; position: absolute; top: 40px; right: 40px;
      width: 80px; height: 80px;
      border-top: 1px solid var(--ink-15);
      border-right: 1px solid var(--ink-15);
      pointer-events: none;
    }
    .events-tabs-sec::after {
      content: ''; position: absolute; bottom: 40px; left: 40px;
      width: 80px; height: 80px;
      border-bottom: 1px solid var(--ink-15);
      border-left: 1px solid var(--ink-15);
      pointer-events: none;
    }
    .events-tabs-sec .wrap { position: relative; z-index: 1; }

    .events-tabs-header { margin-bottom: 36px; }
    .events-tabs-title {
      font-family: var(--serif);
      font-size: clamp(36px, 4vw, 56px);
      font-weight: 300;
      line-height: 1.05;
      color: var(--ink);
    }
    .events-tabs-title em { font-style: italic; }

    /* ── Tab switch (segmented) ── */
    .events-tab-switch {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      border: 1px solid var(--ink-15);
      background: var(--cream);
      box-shadow: 0 2px 12px rgba(24,21,15,0.04);
      margin-bottom: 40px;
    }
    .events-tab-btn {
      appearance: none;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 22px 28px;
      display: flex;
      align-items: center;
      gap: 16px;
      font-family: var(--sans);
      color: var(--ink-55);
      text-align: left;
      position: relative;
      transition: background 0.3s ease, color 0.3s ease;
      border-right: 1px solid var(--ink-15);
    }
    .events-tab-btn:last-child { border-right: none; }
    .events-tab-btn:hover { color: var(--ink); background: rgba(24,21,15,0.02); }
    .events-tab-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: -2px; }
    .events-tab-btn.is-active { color: var(--ink); background: var(--cream); }
    .events-tab-btn.is-active::after {
      content: '';
      position: absolute;
      left: 0; right: 0; bottom: -1px;
      height: 2px;
      background: var(--gold);
    }
    .events-tab-num {
      font-family: var(--serif);
      font-size: 28px;
      font-weight: 300;
      font-style: italic;
      color: var(--gold);
      line-height: 1;
      min-width: 28px;
    }
    .events-tab-label {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    /* ── Tab panel ── */
    .events-tab-panel { animation: tabFade 0.45s cubic-bezier(0.16, 1, 0.3, 1); }
    .events-tab-panel[hidden] { display: none; }
    @keyframes tabFade {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Tab content grid (lede + pillars) ── */
    .events-tab-grid {
      display: grid;
      grid-template-columns: 0.85fr 1.15fr;
      gap: 56px;
      align-items: start;
      padding: 8px 0 36px;
    }
    .events-tab-intro { position: sticky; top: 92px; }
    .events-tab-lede {
      font-family: var(--serif);
      font-size: 19px;
      font-style: italic;
      font-weight: 300;
      line-height: 1.7;
      color: var(--ink-75);
    }

    .events-pillars {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .events-pillar {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 24px;
      align-items: start;
      padding: 26px 0;
      border-top: 1px solid var(--ink-10);
      transition: padding-left 0.3s ease, background 0.3s ease;
    }
    .events-pillar:first-child { border-top: none; padding-top: 4px; }
    .events-pillar:hover { padding-left: 12px; background: rgba(184,147,42,0.02); }

    .events-pillar-num {
      font-family: var(--serif);
      font-size: 44px;
      font-weight: 300;
      font-style: italic;
      color: var(--gold);
      line-height: 1;
    }
    .events-pillar-type {
      font-family: var(--sans);
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      color: var(--gold);
      align-self: center;
    }
    .events-pillar-h {
      font-family: var(--serif);
      font-size: 24px;
      font-weight: 400;
      color: var(--ink);
      margin-bottom: 6px;
      line-height: 1.2;
    }
    .events-pillar-p {
      font-family: var(--serif);
      font-size: 17px;
      line-height: 1.7;
      color: var(--ink-75);
      max-width: 56ch;
    }

    /* ── Forum format strip (replaces tall expectations table) ── */
    .events-format-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border: 1px solid var(--ink-10);
      background: var(--cream);
      margin-top: 8px;
    }
    .events-format-cell {
      padding: 20px 24px;
      border-right: 1px solid var(--ink-08);
      border-bottom: 1px solid var(--ink-08);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .events-format-cell:nth-child(3n) { border-right: none; }
    .events-format-cell:nth-last-child(-n+3) { border-bottom: none; }
    .events-format-lbl {
      font-family: var(--sans);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      color: var(--gold);
    }
    .events-format-val {
      font-family: var(--serif);
      font-size: 17px;
      font-style: italic;
      line-height: 1.4;
      color: var(--ink);
    }

    /* ══ Desktop optimizations ══ */
    @media (min-width: 1101px) {
      .events-tabs-sec { padding: 112px 0; }
      .events-tabs-header { margin-bottom: 48px; }
      .events-tab-btn { padding: 26px 36px; }
      .events-tab-label { font-size: 13.5px; }
      .events-tab-grid { gap: 72px; padding-bottom: 48px; }
      .events-tab-lede { font-size: 20px; line-height: 1.8; }
      .events-pillar { padding: 30px 0; }
      .events-pillar-h { font-size: 26px; }
      .events-pillar-p { font-size: 18px; line-height: 1.75; }
      .events-format-cell { padding: 24px 28px; }
      .events-format-val { font-size: 18px; }
    }

    /* ── Tablet ── */
    @media (max-width: 1100px) {
      .events-tab-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .events-tab-intro { position: static; }
      .rv { transform: none; transition: opacity 0.4s ease; }
      .rv[data-d="1"], .rv[data-d="2"] { transition-delay: 0s; }
    }

    /* ── Mobile ── */
    @media (max-width: 750px) {
      .events-format-strip { grid-template-columns: repeat(2, 1fr); }
      .events-format-cell:nth-child(3n) { border-right: 1px solid var(--ink-08); }
      .events-format-cell:nth-child(2n) { border-right: none; }
      .events-format-cell:nth-last-child(-n+3) { border-bottom: 1px solid var(--ink-08); }
      .events-format-cell:nth-last-child(-n+2) { border-bottom: none; }
    }
    @media (max-width: 700px) {
      .events-tabs-sec { padding: 56px 0; }
      .events-tabs-sec::before, .events-tabs-sec::after {
        width: 48px; height: 48px; top: 20px; right: 20px;
      }
      .events-tabs-sec::after { top: auto; right: auto; bottom: 20px; left: 20px; }

      .events-tabs-header { margin-bottom: 22px; }
      .events-tabs-title { font-size: clamp(30px, 8vw, 40px); line-height: 1.1; }

      .events-tab-switch { margin-bottom: 28px; }
      .events-tab-btn {
        padding: 16px 14px;
        gap: 10px;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
      }
      .events-tab-num { font-size: 22px; }
      .events-tab-label { font-size: 11px; letter-spacing: 0.18em; }

      .events-pillar {
        grid-template-columns: 56px 1fr;
        gap: 16px;
        padding: 22px 0;
      }
      .events-pillar-num { font-size: 32px; }
      .events-pillar-h { font-size: 19px; }
      .events-pillar-p { font-size: 16px; line-height: 1.7; }

      .events-format-cell { padding: 16px 18px; }
      .events-format-val { font-size: 16px; }
    }
    @media (max-width: 380px) {
      .events-format-strip { grid-template-columns: 1fr; }
      .events-format-cell { border-right: none !important; border-bottom: 1px solid var(--ink-08) !important; }
      .events-format-cell:last-child { border-bottom: none !important; }
    }
  `;
