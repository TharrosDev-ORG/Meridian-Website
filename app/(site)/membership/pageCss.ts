export const membershipCss = `
    /*
     * The Meridian Society — Membership Page Styles
     * Page-specific overrides only. Tokens and nav live in globals.css.
     */

    /* ── Keyframes ── */
    @keyframes riseIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
    @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); max-height: 0; } to { opacity: 1; transform: none; max-height: 100px; } }

    /* ── Page hero ── */
    .page-hero {
      position: relative; min-height: 60vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; padding: 120px 64px 80px; overflow: hidden;
      background: var(--cream);
    }
    .page-hero::before {
      content: ''; position: absolute; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse 70% 55% at 50% 35%, transparent 45%, rgba(166,138,88,0.08) 100%),
        radial-gradient(ellipse 100% 60% at 50% 90%, rgba(150,120,70,0.07) 0%, transparent 60%);
      pointer-events: none;
    }
    .page-hero::after {
      content: ''; position: absolute; inset: 0; z-index: 1;
      opacity: 0.03; background-image: var(--grain); background-size: 220px 220px; pointer-events: none;
    }
    .page-hero-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
    .hero-eyebrow { display: flex; align-items: center; gap: 16px; margin-bottom: 52px; }
    .hero-eyebrow-rule { width: 36px; height: 1px; background: var(--gold); opacity: 0.5; }
    .hero-eyebrow-text { font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); }
    .hero-pre { font-family: var(--serif); font-size: clamp(18px, 2.5vw, 30px); font-style: italic; font-weight: 300; color: var(--ink-55); letter-spacing: 0.06em; margin-bottom: 10px; }
    .hero-title { font-family: var(--serif); font-size: clamp(64px, 12vw, 160px); font-weight: 300; line-height: 0.86; color: var(--ink); letter-spacing: 0.06em; text-shadow: 0 2px 40px rgba(24,21,15,0.04); }
    .hero-sub { font-family: var(--serif); font-size: clamp(17px, 1.6vw, 22px); font-style: italic; font-weight: 300; color: var(--ink-75); max-width: 480px; line-height: 1.8; margin: 24px auto 0; }
    .hero-actions { display: flex; align-items: center; gap: 36px; margin-top: 44px; }
    .btn-ghost-link { font-family: var(--serif); font-size: 16px; font-style: italic; font-weight: 300; color: var(--ink-55); text-decoration: none; display: flex; align-items: center; gap: 8px; transition: color 0.2s, gap 0.25s; }
    .btn-ghost-link:hover { color: var(--ink); gap: 14px; }

    /* ── Register button ── */
    .register-btn {
      display: inline-block; font-family: var(--sans); font-size: 11.5px; font-weight: 700;
      letter-spacing: 0.26em; text-transform: uppercase; color: var(--cream);
      background: var(--ink); text-decoration: none; padding: 16px 48px 15px;
      position: relative; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s;
    }
    .register-btn::before { content: ''; position: absolute; inset: 0; background: var(--gold); transform: translateX(-100%); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
    .register-btn span { position: relative; z-index: 1; }
    .register-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(24,21,15,0.12); }
    .register-btn:hover::before { transform: translateX(0); }

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

    /* ── Shared utils ── */
    .wrap { max-width: 1280px; margin: 0 auto; padding: 0 64px; }
    .sec-label { font-family: var(--sans); font-size: 10.5px; font-weight: 700; letter-spacing: 0.34em; text-transform: uppercase; color: var(--ink-55); display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
    .sec-label::after { content: ''; flex: 1; height: 1px; background: var(--ink-15); }
    .rv { opacity: 0; transform: translateY(20px); transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1); }
    .rv.on { opacity: 1; transform: none; }
    .rv[data-d="1"] { transition-delay: 0.08s; }
    .rv[data-d="2"] { transition-delay: 0.16s; }
    .rv[data-d="3"] { transition-delay: 0.24s; }
    .rv[data-d="4"] { transition-delay: 0.32s; }
    .rv[data-d="5"] { transition-delay: 0.40s; }

    /* ── Arc button — cream theme override ── */
    .arc-btn { background: var(--cream-mid) !important; border: 1px solid var(--ink-15) !important; box-shadow: 0 4px 24px rgba(24,21,15,0.08) !important; }
    .arc-btn:hover { background: var(--ink) !important; border-color: var(--ink) !important; }
    .arc-track { stroke: var(--ink-08) !important; }
    .arc-fill  { stroke: var(--gold) !important; }
    .arc-icon  { color: var(--ink-75) !important; font-family: var(--serif) !important; font-size: 14px !important; }
    .arc-btn:hover .arc-icon { color: var(--cream) !important; }
    .arc-inner { background: transparent !important; border: none !important; inset: 0 !important; border-radius: 0 !important; }

    /* ── Benefits section ── */
    .benefits-sec {
      padding: 110px 0; background: var(--cream-deep); position: relative; overflow: hidden;
    }
    .benefits-sec::before { content: ''; position: absolute; top: 40px; right: 40px; width: 80px; height: 80px; border-top: 1px solid var(--ink-15); border-right: 1px solid var(--ink-15); pointer-events: none; }
    .benefits-sec::after  { content: ''; position: absolute; bottom: 40px; left: 40px; width: 80px; height: 80px; border-bottom: 1px solid var(--ink-15); border-left: 1px solid var(--ink-15); pointer-events: none; }
    .benefits-sec .wrap { position: relative; z-index: 1; }
    .benefits-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 52px; }
    .benefits-title { font-family: var(--serif); font-size: clamp(36px, 3.5vw, 56px); font-weight: 300; line-height: 1.05; color: var(--ink); }
    .benefits-title em { font-style: italic; color: var(--gold); }
    .benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
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
    .faq-sec { padding: 110px 0; background: var(--cream); }
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
    .register { padding: 120px 0; background: var(--cream-mid); position: relative; overflow: hidden; }
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
    .register-rule-top { width: 1px; height: 60px; background: var(--ink-15); margin: 0 auto 40px; }
    .register-eyebrow { font-family: var(--sans); font-size: 10.5px; font-weight: 700; letter-spacing: 0.38em; text-transform: uppercase; color: var(--ink-55); margin-bottom: 36px; }
    .register-title { font-family: var(--serif); font-size: clamp(46px, 7.5vw, 108px); font-weight: 300; line-height: 0.88; color: var(--ink); margin-bottom: 36px; }
    .register-title em { font-style: italic; font-weight: 300; color: var(--gold); }
    .register-body { font-family: var(--serif); font-size: 19px; font-style: italic; font-weight: 300; color: var(--ink-75); max-width: 440px; margin: 0 auto 52px; line-height: 1.85; }
    .register-actions { display: flex; align-items: center; gap: 28px; justify-content: center; }
    .register-rule-btm { width: 1px; height: 60px; background: var(--ink-15); margin: 44px auto 0; }
    .member-count-box { display: inline-flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 40px; }
    .member-count-num { font-family: var(--serif); font-size: 52px; font-weight: 300; color: var(--gold); line-height: 1; }
    .member-count-lbl { font-family: var(--sans); font-size: 10px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-55); }

    /* ── Integrated Registration Form ── */
    .reg-form-container {
      max-width: 800px;
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

    .success-state {
      text-align: center;
      padding: 40px 0;
      animation: riseIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .success-icon {
      font-size: 48px;
      color: var(--gold);
      margin-bottom: 24px;
      display: block;
    }
    .success-title {
      font-family: var(--serif);
      font-size: 32px;
      font-weight: 300;
      color: var(--ink);
      margin-bottom: 16px;
    }
    .success-body {
      font-family: var(--serif);
      font-size: 18px;
      color: var(--ink-75);
      line-height: 1.6;
    }

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

    /* ── Marquee ── */
    .marquee-wrap {
      overflow: hidden; background: var(--ink);
      padding: 13px 0; position: relative; z-index: 2;
      display: flex; align-items: center;
    }
    .marquee-wrap::before,
    .marquee-wrap::after {
      content: ''; position: absolute; top: 0; bottom: 0;
      width: 80px; z-index: 1; pointer-events: none;
    }
    .marquee-wrap::before { left: 0; background: linear-gradient(to right, var(--ink), transparent); }
    .marquee-wrap::after  { right: 0; background: linear-gradient(to left, var(--ink), transparent); }
    .marquee-wrap .marquee-track {
      display: flex; flex-wrap: nowrap; align-items: center;
      white-space: nowrap; width: max-content;
      animation: marqueeScroll 32s linear infinite;
    }
    .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
    .m-item {
      font-family: var(--sans); font-size: 9px; font-weight: 600;
      letter-spacing: 0.34em; text-transform: uppercase;
      color: rgba(244,237,227,0.55); padding: 0 24px;
      flex-shrink: 0; white-space: nowrap; line-height: 1;
    }
    .m-gem { color: rgba(212,175,80,0.45); padding: 0 4px; flex-shrink: 0; line-height: 1; }

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

    /* ── Footer ── */
    footer {
      padding: 60px 0 36px; background: var(--cream-deep);
      border-top: 1px solid var(--ink-15); position: relative; overflow: hidden;
    }
    .footer-ghost {
      position: absolute; bottom: -24px; left: 50%; transform: translateX(-50%);
      font-family: var(--sans); font-size: 160px; font-weight: 700;
      letter-spacing: 0.3em; white-space: nowrap;
      color: transparent; -webkit-text-stroke: 1px rgba(24,21,15,0.04);
      user-select: none; pointer-events: none; z-index: 0; display: block;
    }
    .footer-top { display: flex; align-items: flex-start; justify-content: space-between; padding-bottom: 32px; border-bottom: 1px solid var(--ink-08); margin-bottom: 28px; position: relative; z-index: 1; }
    .footer-wordmark { font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: var(--ink); margin-bottom: 6px; }
    .footer-tagline { font-family: var(--serif); font-size: 16px; font-style: italic; color: var(--ink-55); }
    .footer-connect { display: flex; gap: 20px; align-items: center; padding-top: 3px; }
    .footer-connect a { font-family: var(--serif); font-size: 17px; color: var(--ink-55); text-decoration: none; transition: color 0.2s; }
    .footer-connect a:hover { color: var(--ink); }
    .footer-nav { display: flex; flex-wrap: wrap; align-items: center; margin-bottom: 28px; position: relative; z-index: 1; }
    .footer-nav a { font-family: var(--serif); font-size: 17px; color: var(--ink-55); text-decoration: none; transition: color 0.2s; padding-right: 20px; margin-right: 20px; border-right: 1px solid var(--ink-15); line-height: 1.6; }
    .footer-nav a:last-child { border-right: none; padding-right: 0; margin-right: 0; }
    .footer-nav a:hover { color: var(--ink); }
    .footer-bottom { padding-top: 24px; border-top: 1px solid var(--ink-08); position: relative; z-index: 1; }
    .footer-copy { font-family: var(--sans); font-size: 11px; font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-55); }

    /* ── Responsive ── */
    @media (max-width: 1100px) {
      .benefits-grid { grid-template-columns: repeat(2, 1fr); }
      .footer-nav a { padding-right: 16px; margin-right: 16px; }
      .wrap { padding: 0 40px; }
      .benefits-sec, .faq-sec { padding: 80px 0; }
      .page-hero { padding: 100px 40px 60px; }
    }
    @media (max-width: 700px) {
      .benefits-grid { grid-template-columns: 1fr; }
      .register-actions { flex-direction: column; gap: 16px; }
      .register-btn { width: 100%; display: block; text-align: center; }
      .hero-actions { flex-direction: column; gap: 16px; width: 100%; }
      .btn-ghost-link { display: inline-flex; justify-content: center; width: 100%; margin-top: 8px; font-size: 18px; }
      .wrap { padding: 0 20px; }
      .benefits-sec, .faq-sec { padding: 60px 0; }
      .register { padding: 80px 0; }
      .page-hero { padding: 80px 20px 48px; min-height: 50vh; }
      .page-hero-content { width: 100%; }
      .hero-sub { width: 100%; }
      .footer-top { flex-direction: column; gap: 20px; }
      .hero-title { font-size: clamp(38px, 10.5vw, 52px); }
      .hero-eyebrow { margin-bottom: 24px; gap: 8px; flex-wrap: wrap; justify-content: center; }
      .hero-eyebrow-rule { display: none; }
      .hero-eyebrow-text { font-size: 11px; letter-spacing: 0.12em; }
      .benefits-header { flex-direction: column; align-items: flex-start; gap: 16px; }
      .hero-sub { font-size: 16px; line-height: 1.65; margin-bottom: 32px; }
      
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

    @media (prefers-reduced-motion: reduce) {
      .rv, .hero-eyebrow, .hero-pre, .hero-title, .hero-sub {
        opacity: 1 !important; transform: none !important; animation: none !important;
      }
    }

    @media print {
      .progress, .arc-btn, .sticky-join, .hamburger, .mob-backdrop, .mob-drawer { display: none !important; }
      nav { position: static; }
      body { background: #fff; color: #000; }
    }
  `;
