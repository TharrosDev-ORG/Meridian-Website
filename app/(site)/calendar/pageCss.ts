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

    /* Registration Panel */
    .reg-overlay {
      position: fixed;
      inset: 0;
      background: rgba(24,21,15,0.8);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .registration-panel-inner {
      animation: slideUp 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
      will-change: transform, opacity;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .reg-panel-close {
      position: absolute;
      top: 32px;
      right: 32px;
      color: var(--cream);
      background: none;
      border: none;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    .reg-panel-close:hover { opacity: 1; transform: scale(1.1); }

    /* ── SUCCESS OVERHAUL (Archival Receipt) ── */
    .archival-receipt {
      background: var(--ink);
      color: var(--cream);
      padding: 60px 40px;
      position: relative;
      overflow: hidden;
      border: 1px solid var(--gold-20);
      box-shadow: 0 40px 100px rgba(0,0,0,0.4);
    }

    .archival-receipt::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: var(--grain);
      background-size: 200px 200px;
      opacity: 0.15;
      pointer-events: none;
    }

    .receipt-perforation {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background-image: radial-gradient(circle, var(--cream-mid) 1px, transparent 1px);
      background-size: 8px 8px;
      background-position: center;
      opacity: 0.2;
    }

    .receipt-perforation--bottom {
      top: auto;
      bottom: 0;
    }

    .receipt-seal-watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 0.03;
      pointer-events: none;
      color: var(--gold);
    }

    .ticket-id-box {
      background: rgba(244,237,227,0.05);
      border: 1px solid rgba(244,237,227,0.1);
      padding: 20px;
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .ticket-id-label {
      font-family: var(--sans);
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 4px;
      display: block;
    }

    .ticket-id-val {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 14px;
      letter-spacing: 0.1em;
      color: var(--cream-mid);
    }

    /* Admission Header */
    .admission-header {
      text-align: center;
      margin-bottom: 40px;
      position: relative;
    }

    .admission-eyebrow {
      font-family: var(--sans);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 16px;
      display: block;
    }

    .admission-title {
      font-family: var(--serif);
      font-size: 38px;
      font-weight: 300;
      line-height: 1.1;
      color: var(--ink);
    }

    .registration-panel-inner {
      background: var(--cream);
      border: 1px solid var(--ink-10);
      box-shadow: 0 50px 100px rgba(24,21,15,0.15);
      position: relative;
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
