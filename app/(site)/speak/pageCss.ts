export const speakCss = `
    /*
     * The Meridian Society — Speak Page Styles
     * Page-specific overrides only. Tokens and nav live in globals.css.
     */

    /* Keyframes consolidated to globals.css */

    /* ── Page hero ── */
    /* ── Why Speak section (value props) ── */
    .speak-why-sec { padding: 80px 0; background: var(--cream-deep); position: relative; overflow: hidden; }
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
    .speak-format-sec { padding: 80px 0; background: var(--cream); }
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
    .speak-apply-sec { padding: 80px 0; background: var(--cream-deep); position: relative; overflow: hidden; }
    .speak-apply-sec::before { content: ''; position: absolute; top: 40px; right: 40px; width: 80px; height: 80px; border-top: 1px solid var(--ink-15); border-right: 1px solid var(--ink-15); pointer-events: none; }
    .speak-apply-sec::after  { content: ''; position: absolute; bottom: 40px; left: 40px; width: 80px; height: 80px; border-bottom: 1px solid var(--ink-15); border-left: 1px solid var(--ink-15); pointer-events: none; }
    .speak-apply-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; text-align: center; }
    .speak-apply-title { font-family: var(--serif); font-size: clamp(40px, 5vw, 76px); font-weight: 300; line-height: 1.0; color: var(--ink); margin-bottom: 20px; }
    .speak-apply-body { font-family: var(--serif); font-size: clamp(19px, 2vw, 24px); font-style: italic; font-weight: 300; color: var(--ink-75); line-height: 1.85; margin-bottom: 44px; }
    .speak-apply-ctas { display: flex; align-items: center; justify-content: center; gap: 36px; margin-bottom: 28px; }
    .speak-apply-trust { font-family: var(--sans); font-size: 10.5px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-55); }



    /* ── Responsive ── */
    @media (max-width: 1100px) {
      /* Optimize text heavy blocks on mobile */
      .speak-why-title, .speak-format-title, .speak-apply-title { font-size: 32px; line-height: 1.1; }
      .speak-why-body, .speak-apply-body { font-size: 16px; line-height: 1.7; }
      .speak-why-heading { font-size: 20px; }
      .speak-why-card { padding: 32px 24px; }
      .speak-meta-val { font-size: 18px; }
      .speak-format-header { flex-direction: column; align-items: flex-start; gap: 16px; }
      .speak-why-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
      .rv { transform: none; transition: opacity 0.4s ease; }
      .rv[data-d="1"], .rv[data-d="2"], .rv[data-d="3"] { transition-delay: 0s; }
    }

    @media (max-width: 750px) {
      .speak-why-grid { grid-template-columns: 1fr; }
      .speak-meta-row { grid-template-columns: 1fr; gap: 12px; padding: 24px 20px; }
      .speak-meta-lbl { padding-top: 0; }
      .speak-apply-ctas { flex-direction: column; gap: 20px; width: 100%; }
      .speak-apply-ctas .btn-primary { width: 100%; text-align: center; }
    }
  `;
