/*
 * The Meridian Society — Membership & Registration Styles
 * Consolidated for performance and architectural clarity.
 */

export const membershipCss = `
    /* ── Page overrides ── */
    @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); max-height: 0; } to { opacity: 1; transform: none; max-height: 100px; } }

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
    @media (min-width: 1101px) {
      .benefits-register-link:hover { color: var(--gold-lt); border-color: var(--gold-lt); }
    }

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
    @media (min-width: 1101px) {
      .benefit-card:hover { transform: perspective(var(--perspective-card)) translateY(-8px) rotateX(2deg) rotateY(-1deg) translateZ(12px); box-shadow: 0 4px 24px rgba(24,21,15,0.06), 0 20px 64px rgba(24,21,15,0.12); }
    }
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
      transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .faq-item::before {
      content: ''; position: absolute; left: 0; top: 0; bottom: 0;
      width: 2px; background: var(--gold);
      transform: scaleY(0); transform-origin: top center;
      transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
    }
    .faq-item[open]::before { transform: scaleY(1); }
    
    .faq-item summary {
      list-style: none; display: flex; align-items: center; justify-content: space-between;
      padding: 32px 0; cursor: pointer;
      font-family: var(--serif); font-size: clamp(19px, 2vw, 26px); font-weight: 300; color: var(--ink);
      transition: color 0.2s, padding 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      gap: 24px;
    }
    .faq-item summary::-webkit-details-marker { display: none; }
    .faq-item summary:active { color: var(--gold); background: rgba(184, 147, 42, 0.04); }

    @media (min-width: 1101px) {
      .faq-item { padding-left: 0; }
      .faq-item summary { padding: 36px 32px; }
      .faq-item:hover { background: rgba(184, 147, 42, 0.04); }
      .faq-item:hover summary { color: var(--gold); transform: perspective(var(--perspective-scene)) translateZ(2px); }
      .faq-icon-wrap { transition: border-color 0.4s, background 0.4s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
      .faq-item:hover .faq-icon-wrap { transform: perspective(var(--perspective-card)) rotateY(8deg) translateZ(4px); }
    }

    .faq-icon-wrap {
      width: 44px; height: 44px;
      display: flex; align-items: center; justify-content: center;
      border: 1px solid var(--ink-10);
      border-radius: 50%;
      flex-shrink: 0;
      transition: border-color 0.4s, background 0.4s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      color: var(--ink-30);
    }
    .faq-item[open] .faq-icon-wrap {
      border-color: var(--gold-40);
      background: var(--gold-05);
      color: var(--gold);
    }
    .faq-chevron { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }

    .faq-body {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.65s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .faq-answer {
      font-family: var(--serif); font-size: 19px; font-weight: 300; line-height: 1.85;
      color: var(--ink-75); padding: 0 32px 36px; max-width: 680px;
    }
    .faq-answer a {
      color: var(--gold); text-decoration: none;
      border-bottom: 1px solid rgba(184,147,42,0.35);
      transition: color 0.2s, border-color 0.2s;
    }
    .faq-answer a:hover { color: var(--gold-lt); border-color: var(--gold-lt); }

    /* ── Register section (CTA) ── */
    .register { padding: 64px 0; background: var(--cream-mid); position: relative; overflow: hidden; }
    .register .wrap { position: relative; z-index: 1; text-align: center; }
    .register-rule-top { width: 1px; height: 40px; background: var(--ink-15); margin: 0 auto 24px; }
    .register-eyebrow { font-family: var(--sans); font-size: 10.5px; font-weight: 700; letter-spacing: 0.38em; text-transform: uppercase; color: var(--ink-55); margin-bottom: 24px; }
    .register-title { font-family: var(--serif); font-size: clamp(42px, 6vw, 84px); font-weight: 300; line-height: 0.95; color: var(--ink); margin-bottom: 24px; }
    .register-title em { font-style: italic; font-weight: 300; color: var(--gold); }
    .register-body { font-family: var(--serif); font-size: 18px; font-style: italic; font-weight: 300; color: var(--ink-75); max-width: 560px; margin: 0 auto 40px; line-height: 1.8; }
    .register-actions { display: flex; align-items: center; gap: 28px; justify-content: center; }
    .register-rule-btm { width: 1px; height: 40px; background: var(--ink-15); margin: 32px auto 0; }
    
    /* ── Mobile Sticky CTA ── */
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
    
    @media (max-width: 1100px) {
      .benefits-header { flex-direction: column; align-items: flex-start; gap: 16px; }
      .benefits-grid { grid-template-columns: 1fr; gap: 20px; }
      .sticky-join { display: block; bottom: calc(1.4rem + env(safe-area-inset-bottom, 0px)); }
    }
`;

export const registrationCss = `
    /* ── Integrated Registration Form ── */
    .reg-form-container {
      max-width: 1000px;
      margin: 60px auto 0;
      text-align: left;
      background: rgba(244, 237, 227, 0.4);
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      border: 1px solid var(--ink-08);
      padding: 64px;
      box-shadow: 0 12px 48px rgba(24, 21, 15, 0.05);
      box-sizing: border-box;
      min-width: 0; overflow: hidden;
    }
    .reg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .reg-field { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
    .reg-field--full { grid-column: span 2; }
    .reg-label {
      font-family: var(--sans); font-size: 11px; font-weight: 700;
      letter-spacing: 0.24em; text-transform: uppercase;
      color: var(--ink-55); margin-bottom: 4px;
    }
    .reg-input {
      background: transparent; border: none; border-bottom: 1.5px solid var(--ink-15);
      padding: 12px 0; font-family: var(--serif); font-size: 18px; color: var(--ink);
      transition: border-color 0.3s ease, background 0.3s ease; outline: none; border-radius: 0;
      width: 100%; box-sizing: border-box;
    }
    .reg-input:focus { border-color: var(--gold); background: rgba(184, 147, 42, 0.03); }

    .reg-options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 24px; margin-top: 4px; }
    .reg-choice {
      display: flex; align-items: center; gap: 12px; cursor: pointer;
      font-family: var(--serif); font-size: 17px; color: var(--ink-75);
      padding: 8px 0; user-select: none;
    }
    .reg-choice-ui { width: 20px; height: 20px; border: 1.5px solid var(--ink-30); position: relative; transition: border-color 0.3s, background 0.3s; flex-shrink: 0; }
    .reg-choice input { display: none; }
    .reg-choice input:checked + .reg-choice-ui { border-color: var(--gold); background: var(--gold); }
    .reg-choice input:checked + .reg-choice-ui::after { content: ''; position: absolute; inset: 3px; background: var(--cream); }

    .reg-submit-wrap { margin-top: 56px; display: flex; justify-content: center; }
    .reg-submit {
      appearance: none; border: none; cursor: pointer; display: inline-block;
      font-family: var(--sans); font-size: 11.5px; font-weight: 700;
      letter-spacing: 0.26em; text-transform: uppercase; color: var(--cream);
      background: var(--ink); padding: 16px 64px 15px; position: relative;
      overflow: hidden; transition: transform 0.3s, box-shadow 0.3s;
    }
    .reg-submit::before { content: ''; position: absolute; inset: 0; background: var(--gold); transform: translateX(-100%); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    .reg-submit span { position: relative; z-index: 1; }
    .reg-submit:hover::before { transform: translateX(0); }

    /* Success Overhaul */
    .success-overhaul { min-height: 90vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; text-align: center; max-width: 800px; margin: 0 auto; }
    .registry-box { background: var(--cream); padding: 32px 40px; border: 1px solid var(--ink-10); box-shadow: 0 20px 60px rgba(24, 21, 15, 0.05); position: relative; }
    .registry-val { font-family: var(--serif); font-size: clamp(32px, 10vw, 64px); font-weight: 700; color: var(--ink); line-height: 1; }
    .reg-download-btn {
      appearance: none; border: none; cursor: pointer; font-family: var(--sans); font-size: 11.5px; font-weight: 700;
      letter-spacing: 0.26em; text-transform: uppercase; color: var(--cream);
      background: var(--ink); width: 100%; padding: 16px; margin-top: 24px; transition: background 0.4s;
    }

    @media (max-width: 750px) {
      .reg-grid { grid-template-columns: 1fr; gap: 24px; }
      .reg-field--full { grid-column: span 1; }
      .reg-form-container { padding: 32px 22px; }
      .reg-options-grid { grid-template-columns: 1fr; }
    }
    @media (min-width: 1101px) {
      .reg-form-container { max-width: 1100px; padding: 72px 80px 64px; }
      .reg-submit:hover { transform: perspective(var(--perspective-card)) translateY(-4px) rotateX(1.5deg) translateZ(8px); box-shadow: 0 12px 40px rgba(24, 21, 15, 0.16); }
    }
`;
