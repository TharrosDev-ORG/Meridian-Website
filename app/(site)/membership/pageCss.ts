export const membershipCss = `
    /*
     * The Meridian Society — Membership Page Styles
     * Page-specific overrides only. Tokens and nav live in globals.css.
     */

    /* Keyframes consolidated to globals.css */
    @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); max-height: 0; } to { opacity: 1; transform: none; max-height: 100px; } }

    /* ── Page hero ── */


    /* ── Benefits register CTA ── */
    .benefits-register-link {
      font-family: var(--sans); font-size: 11.5px; font-weight: 700;
      letter-spacing: 0.28em; text-transform: uppercase;
      color: var(--gold); text-decoration: none;
      border-bottom: 1px solid rgba(184,147,42,0.35);
      padding-bottom: 4px;
      transition: color 0.2s, border-color 0.2s;
      white-space: nowrap;
    }
    .benefits-register-link:hover { color: var(--gold-lt); border-color: var(--gold-lt); }

    /* ── Benefits section ── */
    .benefits-sec {
      padding: 80px 0; background: var(--cream-deep); position: relative; overflow: hidden;
    }
    .benefits-sec::before { content: ''; position: absolute; top: 40px; right: 40px; width: 80px; height: 80px; border-top: 1px solid var(--ink-15); border-right: 1px solid var(--ink-15); pointer-events: none; }
    .benefits-sec::after  { content: ''; position: absolute; bottom: 40px; left: 40px; width: 80px; height: 80px; border-bottom: 1px solid var(--ink-15); border-left: 1px solid var(--ink-15); pointer-events: none; }
    .benefits-sec .wrap { position: relative; z-index: 1; }
    .benefits-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 52px; }
    .benefits-title { font-family: var(--serif); font-size: clamp(36px, 3.5vw, 56px); font-weight: 300; line-height: 1.05; color: var(--ink); }
    .benefits-title em { font-style: italic; color: var(--gold); }
    .benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    @media (min-width: 1101px) {
      .benefits-grid { gap: 48px; }
    }

    .benefit-card {
      background: var(--cream); border: 1px solid var(--ink-15);
      padding: 40px 36px; display: flex; flex-direction: column;
      box-shadow: 0 2px 12px rgba(24,21,15,0.04), 0 8px 40px rgba(24,21,15,0.06);
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s;
    }
    .benefit-card:hover { transform: translateY(-4px); box-shadow: 0 4px 24px rgba(24,21,15,0.06), 0 16px 60px rgba(24,21,15,0.10); }
    .benefit-num { font-family: var(--sans); font-size: 10.5px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
    .benefit-heading { font-family: var(--serif); font-size: clamp(22px, 2vw, 32px); font-weight: 300; line-height: 1.15; color: var(--ink); margin-bottom: 16px; }
    .benefit-body { font-family: var(--serif); font-size: 19px; line-height: 1.85; color: var(--ink-75); }

    /* ── FAQ section ── */
    .faq-sec { padding: 80px 0; background: var(--cream); }
    .faq-sec .wrap { position: relative; z-index: 1; }
    .faq-header { margin-bottom: 52px; }
    .faq-title { font-family: var(--serif); font-size: clamp(36px, 3.5vw, 56px); font-weight: 300; line-height: 1.05; color: var(--ink); }
    .faq-title em { font-style: italic; color: var(--gold); }
    .faq-list { border-top: 1px solid var(--ink-15); }
    .faq-item {
      border-bottom: 1px solid var(--ink-15);
      overflow: hidden;
      position: relative;
      padding-left: 14px;
    }
    .faq-item::before {
      content: ''; position: absolute; left: 0; top: 0; bottom: 0;
      width: 2px; background: var(--gold);
      transform: scaleY(0); transform-origin: top center;
      transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
    }
    .faq-item[open]::before { transform: scaleY(1); }
    .faq-item[data-closing]::before { transform: scaleY(0); }
    .faq-item summary {
      list-style: none; display: flex; align-items: center; justify-content: space-between;
      padding: 32px 0; cursor: pointer;
      font-family: var(--serif); font-size: clamp(19px, 2vw, 26px); font-weight: 300; color: var(--ink);
      transition: color 0.2s;
      gap: 24px;
    }
    .faq-item summary::-webkit-details-marker { display: none; }
    .faq-item summary:hover { color: var(--gold); }
    @media (min-width: 1101px) {
      .faq-item summary { transition: color 0.2s, background 0.3s; padding: 32px 24px; margin: 0 -24px; }
      .faq-item summary:hover { background: rgba(184, 147, 42, 0.03); }
    }

    .faq-icon {
      font-family: var(--sans); font-size: 20px; font-weight: 300; color: var(--ink-30);
      flex-shrink: 0; transition: transform 0.65s cubic-bezier(0.16,1,0.3,1), color 0.2s;
      line-height: 1;
    }
    .faq-item[open] > summary .faq-icon { transform: rotate(45deg); color: var(--gold); }
    .faq-item[data-closing] > summary .faq-icon { transform: rotate(0deg); color: var(--ink-30); }
    .faq-item[open] > summary { color: var(--ink); }
    .faq-body {
      max-height: 0;
      overflow: hidden;
      /* Duration and easing controlled here; JS sets the exact pixel value to avoid snap-lag */
      transition: max-height 0.65s cubic-bezier(0.16,1,0.3,1);
    }
    /* Note: max-height open state is set by JS to exact content height — no CSS override here */
    .faq-answer {
      font-family: var(--serif); font-size: 19px; font-weight: 300; line-height: 1.85;
      color: var(--ink-75); padding: 0 0 32px; max-width: 640px;
    }
    .faq-answer a {
      color: var(--gold); text-decoration: none;
      border-bottom: 1px solid rgba(184,147,42,0.35);
      transition: color 0.2s, border-color 0.2s;
    }
    .faq-answer a:hover { color: var(--gold-lt); border-color: var(--gold-lt); }

    /* ── Register section ── */
    .register { padding: 64px 0; background: var(--cream-mid); position: relative; overflow: hidden; }
    .register::before {
      content: ''; position: absolute; inset: 0; z-index: 0;
      background: radial-gradient(ellipse 65% 60% at 50% 50%, rgba(184,147,42,0.06) 0%, transparent 70%),
                  radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(24,21,15,0.04) 100%);
      pointer-events: none;
    }
    .register::after { content: ''; position: absolute; inset: 0; z-index: 0; opacity: 0.03; background-image: var(--grain); background-size: 200px 200px; pointer-events: none; }
    .register-ghost {
      position: absolute; bottom: -32px; left: 50%; transform: translateX(-50%);
      font-family: var(--sans); font-size: clamp(60px, 30vw, 180px); font-weight: 700;
      letter-spacing: 0.3em; white-space: nowrap;
      color: transparent; -webkit-text-stroke: 1.5px rgba(24,21,15,0.13);
      user-select: none; pointer-events: none; z-index: 0;
    }
    .register .wrap { position: relative; z-index: 1; text-align: center; }
    .register-rule-top { width: 1px; height: 40px; background: var(--ink-15); margin: 0 auto 24px; }
    .register-eyebrow { font-family: var(--sans); font-size: 10.5px; font-weight: 700; letter-spacing: 0.38em; text-transform: uppercase; color: var(--ink-55); margin-bottom: 24px; }
    .register-title { font-family: var(--serif); font-size: clamp(42px, 6vw, 84px); font-weight: 300; line-height: 0.95; color: var(--ink); margin-bottom: 24px; }
    .register-title em { font-style: italic; font-weight: 300; color: var(--gold); }
    .register-body { font-family: var(--serif); font-size: 18px; font-style: italic; font-weight: 300; color: var(--ink-75); max-width: 560px; margin: 0 auto 40px; line-height: 1.8; }
    .register-actions { display: flex; align-items: center; gap: 28px; justify-content: center; }
    .register-rule-btm { width: 1px; height: 40px; background: var(--ink-15); margin: 32px auto 0; }
    .member-count-box { display: inline-flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 40px; }
    .member-count-num { font-family: var(--serif); font-size: 52px; font-weight: 300; color: var(--gold); line-height: 1; }
    .member-count-lbl { font-family: var(--sans); font-size: 10px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-55); }

    /* ── Integrated Registration Form ── */
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

    .reg-conditional {
      overflow: hidden;
      animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      margin-top: 8px;
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

    .success-overhaul {
      max-width: 1000px; margin: 0 auto; padding: 40px 0;
      display: flex; flex-direction: column; align-items: center; text-align: center;
    }
    .success-header { margin-bottom: 48px; }
    .success-eyebrow { font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
    .success-title { font-family: var(--serif); font-size: clamp(48px, 6vw, 84px); font-weight: 300; line-height: 1; color: var(--ink); margin-bottom: 24px; }
    .success-title em { font-style: italic; color: var(--gold); }
    .success-rule { width: 44px; height: 1px; background: var(--ink-15); margin: 0 auto; }

    .success-registry { margin-bottom: 56px; width: 100%; display: flex; justify-content: center; }
    .registry-box {
      padding: 32px 48px; background: var(--cream); border: 1px solid var(--ink-10);
      box-shadow: 0 12px 48px rgba(24,21,15,0.06); position: relative; overflow: hidden;
      display: flex; flex-direction: column; align-items: center;
    }
    .registry-box::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--gold); }
    .registry-label { font-family: var(--sans); font-size: 10px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-30); margin-bottom: 16px; }
    .registry-id { display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px; }
    .registry-prefix { font-family: var(--sans); font-size: 11px; font-weight: 600; color: var(--ink-55); letter-spacing: 0.12em; }
    .registry-val { font-family: var(--sans); font-size: 38px; font-weight: 500; color: var(--ink); line-height: 1; }
    .registry-status { display: flex; align-items: center; gap: 10px; }
    .status-dot { width: 6px; height: 6px; background: #2d8a4e; border-radius: 50%; box-shadow: 0 0 12px rgba(45,138,78,0.5); }
    .status-text { font-family: var(--sans); font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #2d8a4e; }

    .success-lead { font-family: var(--serif); font-size: 22px; font-weight: 300; font-style: italic; color: var(--ink-75); line-height: 1.8; max-width: 680px; margin-bottom: 64px; }

    .success-actions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; width: 100%; margin-bottom: 64px; }
    .action-card {
      background: var(--cream); border: 1px solid var(--ink-08); padding: 36px 28px;
      display: flex; flex-direction: column; align-items: center; text-align: center;
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s;
    }
    .action-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(24,21,15,0.08); }
    .action-num { font-family: var(--sans); font-size: 10px; font-weight: 700; color: var(--gold); margin-bottom: 16px; letter-spacing: 0.2em; }
    .action-h { font-family: var(--serif); font-size: 22px; font-weight: 400; color: var(--ink); margin-bottom: 12px; }
    .action-p { font-family: var(--serif); font-size: 16px; color: var(--ink-55); line-height: 1.6; margin-bottom: 24px; flex-grow: 1; }
    .action-btn {
      font-family: var(--sans); font-size: 10.5px; font-weight: 700; letter-spacing: 0.2em;
      text-transform: uppercase; color: var(--ink); text-decoration: none;
      padding: 10px 24px; border: 1px solid var(--ink-15); transition: all 0.3s;
    }
    .action-btn:hover { background: var(--ink); color: var(--cream); border-color: var(--ink); }

    .success-home-link {
      font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.3em;
      text-transform: uppercase; color: var(--gold); text-decoration: none;
      border-bottom: 1px solid rgba(184,147,42,0.3); padding-bottom: 6px;
      transition: color 0.2s, border-color 0.2s;
    }
    .success-home-link:hover { color: var(--gold-lt); border-color: var(--gold-lt); }

    @media (max-width: 700px) {
      .reg-form-container { 
        padding: 32px 20px; 
        margin-top: 40px;
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
      .reg-choice {
        padding: 12px 0; /* Larger touch target */
      }
      .reg-field--full { grid-column: auto; }
      .reg-submit { width: 100%; padding: 18px 48px; }
      
      .success-state {
        padding: 20px 0;
      }
      .success-title {
        font-size: 28px;
      }
      .success-body {
        font-size: 17px;
        padding: 0 10px;
      }
    }


    /* ══ Desktop optimizations ══ */
    @media (min-width: 1101px) {
      .benefits-sec { padding: 120px 0; }
      .faq-sec { padding: 120px 0; }

      .benefits-header { margin-bottom: 64px; }
      .benefits-grid {
        /* 5 cards lay out naturally in 3x2; give balanced breathing */
        gap: 40px;
      }
      .benefit-card { padding: 48px 44px; }
      .benefit-heading { margin-bottom: 20px; }
      .benefit-body { font-size: 19px; line-height: 1.85; }
      .benefit-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 56px rgba(24,21,15,0.10), 0 2px 8px rgba(184,147,42,0.05);
      }

      /* FAQ refinements: richer spacing & smoother body */
      .faq-header { margin-bottom: 64px; }
      .faq-item summary { padding: 36px 24px; font-size: clamp(20px, 2vw, 26px); }
      .faq-answer { font-size: 20px; line-height: 1.9; padding-bottom: 36px; max-width: 680px; }
      .faq-item { padding-left: 16px; }

      /* Register form container: refined desktop feel */
      .reg-form-container { max-width: 1100px; padding: 72px 80px 64px; }
      .reg-options-grid { grid-template-columns: repeat(3, 1fr); gap: 16px 32px; }
      .reg-grid { gap: 40px 60px; }
      .reg-label { font-size: 11px; letter-spacing: 0.26em; }
      .reg-input { font-size: 19px; padding: 14px 0; }
      .reg-submit { padding: 17px 72px 16px; }
    }


    /* ── Mobile sticky CTA ── */
    .sticky-join {
      display: none; position: fixed;
      bottom: 1.4rem; left: 50%; z-index: 99;
      padding: 0.85rem 2.8rem;
      background: var(--ink); border: 1px solid rgba(184,147,42,0.5);
      color: var(--gold-lt); text-decoration: none;
      font-family: var(--sans); font-size: 11px; font-weight: 700;
      letter-spacing: 0.24em; text-transform: uppercase;
      white-space: nowrap;
      box-shadow: 0 12px 60px rgba(24,21,15,0.18);
      opacity: 0; pointer-events: none;
      transform: translateX(-50%) translateY(18px) scale(0.96);
      transition: opacity 0.45s cubic-bezier(0.34,1.56,0.64,1),
                  transform 0.45s cubic-bezier(0.34,1.56,0.64,1),
                  background 0.2s, color 0.2s;
    }
    .sticky-join.visible { opacity: 1; pointer-events: all; transform: translateX(-50%) translateY(0) scale(1); }
    .sticky-join:hover { background: var(--gold); color: var(--ink); }


    /* ── Responsive ── */
    @media (max-width: 1100px) {
      .benefits-header { flex-direction: column; align-items: flex-start; gap: 16px; }
      .benefits-grid { grid-template-columns: 1fr; gap: 20px; }

      /* Optimize text heavy blocks on mobile */
      .benefits-title, .faq-title, .register-title { font-size: 32px; line-height: 1.1; }
      .benefit-heading { font-size: 20px; }
      .benefit-body, .faq-answer, .register-body { font-size: 16px; line-height: 1.7; }
      .benefit-card { padding: 32px 24px; }
      .faq-item summary { font-size: 18px; padding: 20px 0; }
      .member-count-num { font-size: 40px; }
      .sticky-join { display: block; bottom: calc(1.4rem + env(safe-area-inset-bottom, 0px)); }
      .rv { transform: none; transition: opacity 0.4s ease; }
      .rv[data-d="1"], .rv[data-d="2"], .rv[data-d="3"], .rv[data-d="4"], .rv[data-d="5"] { transition-delay: 0s; }
    }

    /* ── Dedicated mobile polish ── */
    @media (max-width: 700px) {
      .benefits-sec, .faq-sec { padding: 60px 0; }
      .benefits-sec::before, .benefits-sec::after { width: 48px; height: 48px; top: 22px; right: 22px; }
      .benefits-sec::after { top: auto; right: auto; bottom: 22px; left: 22px; }

      .benefits-header { margin-bottom: 28px; gap: 14px; }
      .benefits-title, .faq-title, .register-title {
        font-size: clamp(30px, 8vw, 40px);
        line-height: 1.08;
      }
      .benefits-register-link {
        font-size: 10.5px; letter-spacing: 0.22em;
        padding-bottom: 6px; min-height: 40px;
        display: inline-flex; align-items: center;
      }

      .benefit-num { font-size: 9.5px; letter-spacing: 0.22em; margin-bottom: 14px; }
      .benefit-heading { font-size: 22px; line-height: 1.15; margin-bottom: 12px; }
      .benefit-body { font-size: 16.5px; line-height: 1.72; }
      .benefit-card {
        padding: 32px 24px;
        box-shadow: 0 2px 10px rgba(24,21,15,0.04), 0 6px 20px rgba(24,21,15,0.04);
      }

      /* FAQ — more tappable & readable */
      .faq-header { margin-bottom: 28px; }
      .faq-item { padding-left: 10px; }
      .faq-item summary {
        font-size: 18px;
        padding: 22px 0;
        gap: 14px;
        min-height: 56px;
      }
      .faq-icon { font-size: 22px; }
      .faq-answer {
        font-size: 16.5px;
        line-height: 1.75;
        padding: 0 0 26px !important;
      }

      /* Register form container padding already adjusted at 700px above */
      .reg-form-container {
        padding: 32px 22px;
        margin-top: 32px;
        background: rgba(244, 237, 227, 0.55) !important;
      }
      .reg-label { font-size: 10.5px; letter-spacing: 0.22em; margin-bottom: 2px; }
      .reg-input {
        font-size: 17px;
        padding: 14px 0;
      }
      .reg-input::placeholder { font-size: 15px; }
      .reg-options-grid { gap: 6px 20px; }
      .reg-choice {
        padding: 14px 0;
        font-size: 16.5px;
        gap: 14px;
        min-height: 48px;
      }
      .reg-choice-ui { width: 20px; height: 20px; }
      .reg-submit {
        width: 100%;
        padding: 18px 24px 17px;
        font-size: 12px;
        letter-spacing: 0.22em;
        min-height: 54px;
      }
      .reg-submit-wrap { margin-top: 40px; }
      .reg-feedback { font-size: 15px; }

      .success-overhaul { padding: 20px 0; }
      .success-title { font-size: 38px; }
      .success-lead { font-size: 17px; line-height: 1.7; padding: 0 10px; margin-bottom: 40px; }
      .success-actions-grid { grid-template-columns: 1fr; gap: 16px; }
      .action-card { padding: 32px 24px; }
      .registry-box { padding: 24px; width: 100%; }
      .registry-val { font-size: 32px; }
    }

    @media (max-width: 380px) {
      .reg-form-container { padding: 28px 18px; }
      .benefit-card { padding: 28px 20px; }
      .faq-item summary { font-size: 17px; }
    }
  `;
