export const calendarCss = `
    /*
     * The Meridian Society — Calendar Page Styles
     */

    .calendar-sec { background: var(--cream); min-height: 100vh; padding-bottom: 120px; }
    
    .calendar-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
      margin-top: 60px;
    }

    .event-card {
      display: grid;
      grid-template-columns: 180px 1fr 240px;
      background: var(--cream-mid);
      border: 1px solid var(--ink-10);
      transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.4s ease;
      overflow: hidden;
      position: relative;
      will-change: transform, border-color, box-shadow;
    }

    .event-card:hover {
      border-color: var(--gold-40);
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(24,21,15,0.05);
    }

    /* Date column */
    .event-date-col {
      background: var(--ink);
      color: var(--cream);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px;
      text-align: center;
    }

    .date-day { font-family: var(--sans); font-size: 48px; font-weight: 700; line-height: 1; margin-bottom: 4px; }
    .date-month { font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); }
    .date-year { font-family: var(--sans); font-size: 10px; font-weight: 700; letter-spacing: 0.1em; opacity: 0.4; margin-top: 8px; }

    /* Info column */
    .event-info-col {
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .event-tag {
      font-family: var(--sans);
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 16px;
      display: inline-block;
    }

    .event-title {
      font-family: var(--serif);
      font-size: 32px;
      font-weight: 300;
      line-height: 1.1;
      color: var(--ink);
      margin-bottom: 12px;
    }

    .event-desc {
      font-family: var(--serif);
      font-size: 16px;
      font-style: italic;
      line-height: 1.6;
      color: var(--ink-60);
      max-width: 540px;
    }

    /* Action column */
    .event-action-col {
      padding: 40px;
      border-left: 1px solid var(--ink-05);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      background: rgba(24,21,15,0.02);
    }

    .event-meta-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .meta-lbl { font-family: var(--sans); font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-30); }
    .meta-val { font-family: var(--serif); font-size: 15px; color: var(--ink-80); }

    .btn-register {
      margin-top: 24px;
      width: 100%;
    }

    /* Registration Panel Overhaul */
    .reg-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(18, 16, 14, 0.92); 
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      z-index: 99999;
      display: grid;
      place-items: center;
      padding: 20px;
      animation: fadeIn 0.25s ease-out forwards;
      pointer-events: auto; /* Re-enabled for click-off-to-close */
      overflow: hidden;
    }

    .registration-panel-inner {
      animation: portalPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      will-change: transform, opacity;
      max-width: 440px;
      width: 100%;
      position: relative;
      z-index: 100000;
      pointer-events: auto;
      background: var(--cream);
      padding: 6px; /* Elegant frame spacing */
      border: 1px solid var(--ink);
      box-shadow: 0 40px 100px rgba(0,0,0,0.6);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes portalPop {
      from { opacity: 0; transform: scale(0.96) translateY(12px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }


    /* ── SUCCESS MINIMAL (Registry Overhaul) ── */
    .success-minimal {
      text-align: center;
      padding: 60px 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }
    
    .success-minimal-title {
      font-family: var(--serif);
      font-size: 38px;
      font-weight: 400;
      line-height: 1.1;
      color: var(--ink);
      margin-bottom: 8px;
    }

    .success-minimal-greeting {
      font-family: var(--serif);
      font-size: 22px;
      font-style: italic;
      color: var(--ink-80);
    }

    .success-minimal-blurb {
      font-family: var(--serif);
      font-size: 16px;
      font-style: italic;
      line-height: 1.7;
      color: var(--ink-40);
      max-width: 36ch;
      margin: 0 auto;
    }

    .btn-secondary-ghost {
      font-family: var(--sans);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--gold);
      background: transparent;
      border: 1px solid var(--gold-20);
      padding: 14px 28px;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .btn-secondary-ghost:hover {
      background: var(--gold);
      color: var(--cream);
      border-color: var(--gold);
    }

    /* Admission Header */
    .admission-header {
      text-align: center;
      margin-bottom: 40px;
      position: relative;
    }

    .admission-eyebrow {
      font-family: var(--sans);
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 12px;
      display: block;
    }

    .admission-title {
      font-family: var(--serif);
      font-size: 34px;
      font-weight: 400;
      line-height: 1.15;
      color: var(--ink);
    }
    
    .admission-title em {
      font-style: italic;
      color: var(--gold);
    }

    .registration-panel-inner {
      background: var(--cream);
      border: 1px solid var(--ink);
      padding: 8px; /* Internal frame spacing */
      box-shadow: 0 40px 100px rgba(0,0,0,0.5);
    }

    .registry-box-outer {
      border: 1px solid var(--gold-20);
      background: var(--cream);
      position: relative;
      padding: 48px 40px;
    }
    
    .registry-input-wrap {
      background: var(--cream-mid);
      border: 1px solid var(--ink-08);
      padding: 12px;
      margin: 12px 0 24px;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    
    .registry-input-wrap:focus-within {
      border-color: var(--gold);
      box-shadow: 0 0 0 1px var(--gold);
    }

    .registry-input {
      width: 100%;
      background: transparent;
      border: none;
      font-family: var(--serif);
      font-size: 28px;
      text-align: center;
      color: var(--ink);
      outline: none;
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }
    
    .registry-input::placeholder {
      color: var(--ink-15);
      font-size: 24px;
      letter-spacing: 0.1em;
    }

    /* Empty state */
    .calendar-empty {
      padding: 120px 0;
      text-align: center;
      border: 1px dashed var(--ink-20);
      background: var(--cream-mid);
    }

    .empty-h { font-family: var(--serif); font-size: 28px; font-weight: 300; color: var(--ink-40); margin-bottom: 16px; }
    .empty-p { font-family: var(--serif); font-size: 16px; font-style: italic; color: var(--ink-30); }

    /* Desktop Grid layout */
    @media (min-width: 1101px) {
      .calendar-grid { gap: 40px; }
    }

    /* Mobile adjustments */
    @media (max-width: 1100px) {
      .event-card {
        grid-template-columns: 120px 1fr;
      }
      .event-action-col {
        grid-column: 1 / -1;
        border-left: none;
        border-top: 1px solid var(--ink-05);
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 24px 32px;
      }
      .event-meta-item { margin-bottom: 0; }
      .btn-register { width: auto; margin-top: 0; }
    }

    @media (max-width: 700px) {
      .event-card {
        grid-template-columns: 1fr;
      }
      .event-date-col {
        flex-direction: row;
        gap: 16px;
        padding: 20px;
        justify-content: flex-start;
      }
      .date-day { font-size: 32px; margin-bottom: 0; }
      .date-year { margin-top: 0; }
      
      .event-info-col { padding: 32px 24px; }
      .event-title { font-size: 26px; }
      
      .event-action-col {
        flex-direction: column;
        align-items: stretch;
        gap: 20px;
        padding: 24px;
      }
      .btn-register { width: 100%; }
    }
`;
