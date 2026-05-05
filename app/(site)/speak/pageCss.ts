export const speakCss = `
    /*
     * The Meridian Society — Speak Page Styles
     * Page-specific overrides only. Tokens and nav live in globals.css.
     */

    /* Keyframes consolidated to globals.css */

    /* ── Page hero ── */
    /* ── Nominate Section ── */
    .speak-nominate-sec { padding: 40px 0; background: var(--cream); position: relative; z-index: 5; }
    .nominate-card { 
      background: var(--cream-deep); border: 1px solid var(--ink-10);
      padding: 32px 40px; display: flex; align-items: center; justify-content: space-between; gap: 32px;
      box-shadow: 0 4px 20px rgba(24,21,15,0.03); transition: border-color 0.4s;
    }
    .nominate-card:hover { border-color: var(--gold-45); }
    .nominate-content { flex: 1; }
    .nominate-h { font-family: var(--serif); font-size: 28px; font-weight: 300; color: var(--ink); margin-bottom: 8px; }
    .nominate-p { font-family: var(--serif); font-size: 19px; font-style: italic; color: var(--ink-75); line-height: 1.6; }
    .btn-nominate {
      padding: 14px 28px; border: 1px solid var(--ink-15); background: transparent;
      font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
      text-transform: uppercase; color: var(--ink); text-decoration: none;
      transition: all 0.3s cubic-bezier(0.16,1,0.3,1); display: inline-block;
    }
    .btn-nominate:hover { background: var(--ink); color: var(--cream); border-color: var(--ink); transform: translateY(-2px); }

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
    .speak-why-body { font-family: var(--serif); font-size: 20px; line-height: 1.85; color: var(--ink-75); }

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
    .speak-apply-body { font-family: var(--serif); font-size: clamp(20px, 2vw, 24px); font-style: italic; font-weight: 300; color: var(--ink-75); line-height: 1.85; margin-bottom: 44px; }
    .speak-apply-ctas { display: flex; align-items: center; justify-content: center; gap: 36px; margin-bottom: 28px; }
    .speak-apply-trust { font-family: var(--sans); font-size: 10.5px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-55); }



    /* ══ Desktop optimizations ══ */
    @media (min-width: 1101px) {
      .speak-why-sec { padding: 120px 0; }
      .speak-format-sec { padding: 120px 0; }
      .speak-apply-sec { padding: 120px 0; }
      
      .speak-nominate-sec { padding: 60px 0; }
      .nominate-card { padding: 48px 60px; }
      .nominate-h { font-size: 32px; }

      .speak-why-header { margin-bottom: 64px; }
      .speak-why-grid { gap: 40px; }
      .speak-why-card { padding: 48px 42px; }
      .speak-why-body { font-size: 21px; line-height: 1.9; }
      .speak-why-card:hover {
        transform: perspective(var(--perspective-card)) translateY(-8px) rotateX(2deg) rotateY(-1deg) translateZ(12px);
        box-shadow: 0 20px 64px rgba(24,21,15,0.12), 0 2px 8px rgba(184,147,42,0.06);
      }

      /* Format rows: consistent with events expectations */
      .speak-format-header { margin-bottom: 48px; }
      .speak-meta-row {
        grid-template-columns: 240px 1fr;
        padding: 32px 40px;
        transition: background 0.3s ease, padding 0.3s ease, transform 0.3s ease;
      }
      .speak-meta-row:hover { padding-left: 48px; transform: perspective(var(--perspective-scene)) translateX(4px) translateZ(4px); }
      .speak-meta-lbl { font-size: 11px; letter-spacing: 0.32em; }
      .speak-meta-val { font-size: 23px; line-height: 1.45; }

      /* Apply block: more inviting, airy */
      .speak-apply-inner { max-width: 720px; }
      .speak-apply-title { margin-bottom: 28px; }
      .speak-apply-body { margin-bottom: 52px; line-height: 1.9; }
      .speak-apply-ctas { gap: 40px; margin-bottom: 36px; }
    }

    /* ── Responsive ── */
    @media (max-width: 1100px) {
      /* Optimize text heavy blocks on mobile */
      .speak-why-title, .speak-format-title, .speak-apply-title { font-size: 32px; line-height: 1.1; }
      .speak-why-body, .speak-apply-body { font-size: 19px; line-height: 1.8; }
      .speak-why-heading { font-size: 20px; }
      .speak-why-card { padding: 32px 24px; }
      .speak-meta-val { font-size: 18px; }
      .speak-format-header { flex-direction: column; align-items: flex-start; gap: 16px; }
      .speak-why-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
      .rv { transform: none; transition: opacity 0.4s ease; }
      .rv[data-d="1"], .rv[data-d="2"], .rv[data-d="3"] { transition-delay: 0s; }
    }

    @media (max-width: 750px) {
      .speak-why-grid { grid-template-columns: 1fr; gap: 16px; }
      .speak-meta-row { grid-template-columns: 1fr; gap: 10px; padding: 22px 22px; }
      .speak-meta-lbl { padding-top: 0; font-size: 10px; letter-spacing: 0.26em; color: var(--gold); }
      .speak-apply-ctas { flex-direction: column; gap: 16px; width: 100%; }
      .speak-apply-ctas .btn-primary { width: 100%; text-align: center; }

      .nominate-card { flex-direction: column; text-align: center; padding: 32px 24px; gap: 24px; }
      .btn-nominate { width: 100%; text-align: center; }
      .nominate-h { font-size: 24px; }
    }

    @media (max-width: 700px) {
      .speak-why-sec, .speak-format-sec, .speak-apply-sec { padding: 60px 0; }
      .speak-why-sec::before, .speak-why-sec::after,
      .speak-apply-sec::before, .speak-apply-sec::after {
        width: 48px; height: 48px; top: 22px; right: 22px;
      }
      .speak-why-sec::after, .speak-apply-sec::after {
        top: auto; right: auto; bottom: 22px; left: 22px;
      }
      .speak-why-header, .speak-format-header { margin-bottom: 28px; gap: 14px; }
      .speak-why-title, .speak-format-title {
        font-size: clamp(30px, 8vw, 40px);
        line-height: 1.08;
      }
      .speak-why-num { font-size: 9.5px; letter-spacing: 0.22em; margin-bottom: 14px; }
      .speak-why-heading { font-size: 22px; line-height: 1.15; margin-bottom: 12px; }
      .speak-why-body { font-size: 18px; line-height: 1.8; }
      .speak-why-card { padding: 30px 22px; }

      .speak-meta-val { font-size: 18px; line-height: 1.45; }

      .speak-apply-title { font-size: clamp(34px, 9.5vw, 48px); line-height: 1.02; margin-bottom: 16px; }
      .speak-apply-body { font-size: 18.5px; line-height: 1.8; margin-bottom: 32px; }
      .speak-apply-trust { font-size: 10px; letter-spacing: 0.2em; }
    }

    @media (max-width: 380px) {
      .speak-why-card { padding: 28px 20px; }
      .speak-meta-row { padding: 20px 18px; }
    }
  
    /* ── Date Picker Grid (responsive) ── */
    .date-picker-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    @media (max-width: 480px) {
      .date-picker-grid {
        grid-template-columns: 1fr;
      }
    }

    /* ── Integrated Form Styling (Shared with Membership) ── */
    .reg-form-container {
      max-width: 1000px;
      margin: 60px auto 0;
      text-align: left;
      background: rgba(244, 237, 227, 0.4);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid var(--ink-08);
      padding: 64px;
      box-shadow: 0 12px 48px rgba(24, 21, 15, 0.05);
    }
    .reg-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
    .reg-field {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .reg-fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      min-inline-size: 0;
    }
    .reg-fieldset .reg-label {
      display: block;
      padding: 0;
    }
    .reg-field--full {
      grid-column: span 2;
    }
    .reg-label {
      font-family: var(--sans);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: var(--ink-55);
      margin-bottom: 4px;
    }
    .reg-input {
      background: transparent;
      border: none;
      border-bottom: 1.5px solid var(--ink-15);
      padding: 12px 0;
      font-family: var(--serif);
      font-size: 18px;
      color: var(--ink);
      transition: border-color 0.3s ease, background 0.3s ease;
      outline: none;
      border-radius: 0;
    }
    .reg-input:focus {
      border-color: var(--gold);
      background: rgba(184, 147, 42, 0.03);
    }
    .reg-input::placeholder {
      color: var(--ink-30);
      font-style: italic;
      font-size: 16px;
    }

    /* Options Grid (Radio/Checkboxes) */
    .reg-options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px 24px;
      margin-top: 4px;
    }
    .reg-choice {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      font-family: var(--serif);
      font-size: 17px;
      color: var(--ink-75);
      padding: 8px 0;
      user-select: none;
    }
    .reg-choice input { display: none; }
    .reg-choice-ui {
      width: 18px;
      height: 18px;
      border: 1.5px solid var(--ink-30);
      position: relative;
      transition: border-color 0.3s, background 0.3s;
      flex-shrink: 0;
    }
    .reg-choice--radio .reg-choice-ui { border-radius: 50%; }
    .reg-choice--check .reg-choice-ui { border-radius: 2px; }
    
    .reg-choice:hover .reg-choice-ui { border-color: var(--gold); }
    .reg-choice input:checked + .reg-choice-ui {
      border-color: var(--gold);
      background: var(--gold);
    }
    .reg-choice input:checked + .reg-choice-ui::after {
      content: '';
      position: absolute;
      inset: 3px;
      background: var(--cream);
    }
    .reg-choice--radio input:checked + .reg-choice-ui::after { border-radius: 50%; }
    .reg-choice--check input:checked + .reg-choice-ui::after {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
      mask-size: contain;
      mask-repeat: no-repeat;
      background: var(--cream);
    }

    .reg-submit-wrap {
      margin-top: 56px;
      display: flex;
      justify-content: center;
    }
    .reg-submit {
      appearance: none;
      border: none;
      cursor: pointer;
      display: inline-block;
      font-family: var(--sans);
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      color: var(--cream);
      background: var(--ink);
      padding: 16px 64px 15px;
      position: relative;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .reg-submit::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--gold);
      transform: translateX(-100%);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reg-submit span {
      position: relative;
      z-index: 1;
    }
    .reg-submit:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(24, 21, 15, 0.12);
    }
    .reg-submit:not(:disabled):hover::before {
      transform: translateX(0);
    }
    @media (min-width: 1101px) {
      .reg-submit:not(:disabled):hover { transform: perspective(var(--perspective-card)) translateY(-4px) rotateX(1.5deg) translateZ(8px); box-shadow: 0 12px 40px rgba(24, 21, 15, 0.16); }
    }
    .reg-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .reg-feedback {
      margin-top: 24px;
      font-family: var(--serif);
      font-size: 16px;
      font-style: italic;
      text-align: center;
      min-height: 24px;
    }
    .reg-error { color: #b22d2d; }
    .reg-success { color: var(--gold); }

    /* ── Success State ── */
    .success-overhaul {
      max-width: 1000px; margin: 0 auto; padding: 40px 0;
      display: flex; flex-direction: column; align-items: center; text-align: center;
    }
    .success-header { margin-bottom: 48px; }
    .success-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
    .success-title { font-family: var(--serif); font-size: clamp(48px, 6vw, 84px); font-weight: 300; line-height: 1; color: var(--ink); margin-bottom: 24px; }
    .success-title em { font-style: italic; color: var(--gold); }
    .success-rule { width: 44px; height: 1px; background: var(--ink-15); margin: 0 auto; }
    .success-lead { font-family: var(--serif); font-size: 22px; font-weight: 300; font-style: italic; color: var(--ink-75); line-height: 1.8; max-width: 680px; margin-bottom: 64px; }
    .success-home-link {
      font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.3em;
      text-transform: uppercase; color: var(--gold); text-decoration: none;
      border-bottom: 1px solid rgba(184,147,42,0.3); padding-bottom: 6px;
      transition: color 0.2s, border-color 0.2s;
    }
    .success-home-link:hover { color: var(--gold-lt); border-color: var(--gold-lt); }

    .success-registry { margin-bottom: 56px; width: 100%; display: flex; justify-content: center; }
    .registry-box {
      padding: 32px 48px; background: var(--cream); border: 1px solid var(--ink-10);
      box-shadow: 0 12px 48px rgba(24,21,15,0.06); position: relative; overflow: hidden;
      display: flex; flex-direction: column; align-items: center;
    }
    .registry-box::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--gold); }
    .registry-label { font-family: var(--sans); font-size: 10px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-30); margin-bottom: 16px; }
    .registry-status { display: flex; align-items: center; gap: 10px; }
    .status-dot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; box-shadow: 0 0 12px rgba(184,147,42,0.5); }
    .status-text { font-family: var(--sans); font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold); }

    /* ── Desktop Refinements ── */
    @media (min-width: 1101px) {
      .reg-form-container { max-width: 1100px; padding: 72px 80px 64px; }
      .reg-options-grid { grid-template-columns: repeat(3, 1fr); gap: 16px 32px; }
      .reg-grid { gap: 40px 60px; }
      .reg-label { font-size: 11px; letter-spacing: 0.26em; }
      .reg-input { font-size: 19px; padding: 14px 0; }
      .reg-submit { padding: 17px 72px 16px; }
      .registry-box { padding: 32px 64px; }
    }

    /* ── Mobile Polish ── */
    @media (max-width: 700px) {
      .reg-form-container { 
        padding: 32px 22px; 
        margin-top: 32px;
        background: rgba(244, 237, 227, 0.55) !important;
        border-right: none;
        border-left: none;
      }
      .reg-grid { 
        grid-template-columns: 1fr; 
        gap: 28px; 
      }
      .reg-options-grid { 
        grid-template-columns: 1fr; 
        gap: 8px;
      }
      .reg-choice { padding: 14px 0; font-size: 16.5px; gap: 14px; min-height: 48px; }
      .reg-choice-ui { width: 20px; height: 20px; }
      .reg-submit { width: 100%; padding: 18px 24px 17px; font-size: 12px; letter-spacing: 0.22em; min-height: 54px; }
      .reg-submit-wrap { margin-top: 40px; }
      .reg-feedback { font-size: 15px; }
      
      .success-overhaul { padding: 20px 0; }
      .success-title { font-size: 38px; }
      .success-lead { font-size: 17px; line-height: 1.7; padding: 0 10px; margin-bottom: 40px; }
      .registry-box { padding: 24px; width: 100%; }
    }
`;


