export const eventsCss = `
    /*
     * The Meridian Society — Events Page Styles
     * Page-specific overrides only. Tokens and nav live in globals.css.
     */

    /* Keyframes consolidated to globals.css */

    /* ── Page hero (subpage version of index hero) ── */
    /* ── Events intro ── */

    /* ── Events intro ── */
    .events-sec { padding: 80px 0; background: var(--cream-deep); position: relative; overflow: hidden; }
    .events-sec::before { content: ''; position: absolute; top: 40px; right: 40px; width: 80px; height: 80px; border-top: 1px solid var(--ink-15); border-right: 1px solid var(--ink-15); pointer-events: none; }
    .events-sec::after  { content: ''; position: absolute; bottom: 40px; left: 40px; width: 80px; height: 80px; border-bottom: 1px solid var(--ink-15); border-left: 1px solid var(--ink-15); pointer-events: none; }
    .events-copy-title { font-family: var(--serif); font-size: clamp(32px, 4vw, 56px); font-weight: 300; line-height: 1.1; color: var(--ink); margin-bottom: 24px; }
    .events-copy-title em { font-style: italic; }
    .module-intro-right::before {
      content: 'FORUM'; position: absolute; bottom: -20px; right: -10px;
      font-family: var(--sans); font-size: 140px; font-weight: 700;
      color: var(--ink); opacity: 0.02; letter-spacing: 0.1em;
      pointer-events: none; z-index: 0;
    }

    /* ── Signature Series ── */
    .sig-sec { padding: 80px 0; background: var(--cream); position: relative; border-top: 1px solid var(--ink-08); }
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

    /* ── Responsive ── */
    @media (max-width: 1100px) {
      .event-card { grid-template-columns: 1fr; }
      .event-main { border-right: none; border-bottom: 1px solid var(--ink-15); }
    }
    @media (max-width: 700px) {
      .events-sec, .sig-sec, .expect-sec { padding: 60px 0; }
      .events-sec::before, .events-sec::after { width: 48px; height: 48px; top: 22px; right: 22px; }
      .events-sec::after { top: auto; right: auto; bottom: 22px; left: 22px; }
      .event-main { padding: 32px 24px; }
      .event-meta-row { padding: 18px 20px; }
      .event-empty-state { padding: 48px 24px; }
      .rv { transform: none; transition: opacity 0.4s ease; }
      .rv[data-d="1"], .rv[data-d="2"] { transition-delay: 0s; }

      /* Optimize text heavy blocks on mobile */
      .events-intro-grid { grid-template-columns: 1fr; gap: 32px; }
      .events-intro-right { padding: 32px 24px; }
      .sig-grid { grid-template-columns: 1fr; }
      .events-copy-title, .notify-title, .expect-title {
        font-size: clamp(30px, 8vw, 40px);
        line-height: 1.1;
        margin-bottom: 18px;
      }
      .events-copy-body, .notify-sub { font-size: 16.5px; line-height: 1.75; }

      /* Signature series cards: tighter + clearer */
      .sig-num { font-size: 9.5px; letter-spacing: 0.22em; margin-bottom: 14px; }
      .sig-h { font-size: 20px; margin-bottom: 12px; line-height: 1.2; }
      .sig-p { font-size: 16px; line-height: 1.7; }
      .sig-card { padding: 30px 22px; }

      /* Expectations grid: readable stacked rows */
      .expect-header { margin-bottom: 28px; }
      .expect-grid { margin-top: 28px; }
      .expect-row {
        grid-template-columns: 1fr;
        gap: 8px;
        padding: 22px 22px;
      }
      .expect-lbl {
        padding-top: 0;
        font-size: 10px;
        letter-spacing: 0.26em;
        color: var(--gold);
      }
      .expect-val { font-size: 18px; line-height: 1.5; }
    }

    @media (max-width: 380px) {
      .expect-row { padding: 20px 18px; }
      .expect-val { font-size: 17px; }
    }
  `;
