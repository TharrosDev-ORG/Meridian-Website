export const qaCss = `
  /* Hide global footer and utility overlays to maintain dashboard focus */
  footer, .footer, .progress, .skip-link, .arc-btn, .mobile-dock, .back-to-top-btn {
    display: none !important;
  }

  /* ── Mobile block: the chat is desktop-only. ── */
  .qa-mobile-block { display: none; }

  @media (max-width: 1100px) {
    .qa-mobile-block {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 60px);
      margin-top: 60px;
      padding: 40px 24px;
      background: var(--cream);
    }
    .qa-section { display: none !important; }
  }

  .qa-mobile-block-inner {
    max-width: 480px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .qa-mobile-block .sec-label {
    justify-content: center;
    margin-bottom: 0;
  }

  .qa-mobile-block .sec-label::after,
  .qa-mobile-block .sec-label::before {
    display: none;
  }

  .qa-mobile-title {
    font-family: var(--serif);
    font-size: clamp(28px, 7vw, 36px);
    font-weight: 300;
    line-height: 1.15;
    color: var(--ink);
    letter-spacing: -0.01em;
    margin: 0;
  }

  .qa-mobile-title em {
    font-style: italic;
    color: var(--gold);
  }

  .qa-mobile-copy {
    font-family: var(--serif);
    font-size: 16px;
    font-style: italic;
    color: var(--ink-75);
    line-height: 1.55;
    margin: 0;
  }

  .qa-mobile-cta {
    margin-top: 18px;
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cream);
    background: var(--ink);
    padding: 14px 26px;
    border-radius: 2px;
    text-decoration: none;
    transition: background 0.25s ease;
  }

  .qa-mobile-cta:hover { background: var(--gold); }
  
  @media (min-width: 1101px) {
    html, body {
      overflow: hidden !important;
      height: 100% !important;
    }
  }

  .qa-section {
    background: var(--cream);
    margin-top: 68px; /* Push below fixed Nav */
    height: calc(100vh - 68px);
    width: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0 !important;
  }

  .qa-section .wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    padding: 0 40px;
    min-height: 0;
  }

  @media (max-width: 1100px) {
    .qa-section .wrap {
      padding: 0 20px;
    }
    .qa-section {
      height: calc(100vh - 68px); /* Reclaim space from hidden MobileDock */
    }
  }

  .qa-grid {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;
    gap: 0;
    min-height: 0;
  }

  @media (min-width: 1101px) {
    .qa-grid {
      grid-template-columns: 420px 1fr;
      gap: 80px;
    }
  }

  /* ── Left Column: Briefing ── */
  .qa-briefing {
    padding-top: 24px;
    padding-bottom: 24px;
    z-index: 10;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  @media (min-width: 1101px) {
    .qa-briefing {
      height: 100%;
      border-right: 1px solid rgba(24, 21, 15, 0.04);
      padding-right: 40px; /* Buffer from the chat wall */
    }
  }

  @media (max-width: 1100px) {
    .qa-briefing {
      padding: 18px 0 14px;
      height: auto;
      flex-shrink: 0;
      border-bottom: 1px solid rgba(24, 21, 15, 0.03);
    }
  }

  .sec-label {
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .sec-label::after {
    content: '';
    height: 1px;
    flex: 1;
    background: rgba(24, 21, 15, 0.08);
  }

  .qa-title {
    font-family: var(--serif);
    font-size: clamp(26px, 2.8vw, 34px);
    font-weight: 300;
    line-height: 1.1;
    color: var(--ink);
    margin-bottom: 6px;
    letter-spacing: -0.01em;
  }

  .qa-title em {
    font-style: italic;
    color: var(--gold);
  }

  .qa-intro {
    font-family: var(--serif);
    font-size: 18px;
    font-style: italic;
    font-weight: 400;
    color: var(--ink-75);
    line-height: 1.5;
    margin-bottom: 14px;
  }

  .briefing-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 16px;
    padding: 12px 14px;
    background: rgba(24, 21, 15, 0.03);
    border: 1px solid rgba(24, 21, 15, 0.05);
    border-radius: 2px;
    margin-bottom: 12px;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .meta-label {
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-55);
  }

  .meta-value {
    font-family: var(--sans);
    font-size: 15px;
    font-weight: 500;
    color: var(--ink);
    line-height: 1.4;
  }

  .tharros-link {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: rgba(184, 147, 42, 0.3);
    transition: all 0.3s ease;
  }

  .tharros-link:hover {
    color: var(--gold);
    text-decoration-color: var(--gold);
  }

  .suggested-questions {
    margin-top: auto;
    padding-top: 16px;
    flex-shrink: 0;
  }

  @media (max-width: 1100px) {
    .suggested-questions { padding-top: 8px; margin-top: 0; }
  }

  .suggested-title {
    font-family: var(--sans);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 8px;
  }

  .suggested-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .suggested-btn {
    background: transparent;
    border: 1px solid rgba(24, 21, 15, 0.05);
    padding: 9px 14px;
    text-align: left;
    font-family: var(--sans);
    font-size: 15px;
    color: var(--ink-75);
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 2px;
    outline: none;
    line-height: 1.35;
  }

  .suggested-btn:hover {
    border-color: var(--gold-20);
    color: var(--ink);
    background: rgba(24, 21, 15, 0.03);
  }

  .suggested-btn:active { transform: scale(0.98); }

  .suggested-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .suggested-btn:disabled:hover {
    border-color: rgba(24, 21, 15, 0.05);
    color: var(--ink-55);
    background: transparent;
  }

  .meta-value.inquiries-meta {
    color: var(--gold);
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .meta-value.inquiries-meta.depleted {
    color: #d32f2f;
  }

  .qa-note {
    font-family: var(--sans);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-55);
    margin: 0 0 14px;
    padding: 8px 12px;
    border-left: 2px solid var(--gold-20);
    background: rgba(184, 147, 42, 0.05);
    line-height: 1.4;
  }

  @media (max-width: 1100px) {
    .qa-briefing.is-compact .qa-note { display: none; }
  }

  /* Live status dot inside the briefing meta row */
  .meta-value.live-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .meta-value.live-status::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--gold);
    box-shadow: 0 0 0 0 rgba(184,147,42,0.4);
    animation: dotPulse 2.2s ease-in-out infinite;
  }

  .meta-value.live-status[data-status="loading"]::before {
    background: var(--ink-30);
    animation: dotPulse 1.2s ease-in-out infinite;
  }

  .meta-value.live-status[data-status="failed"]::before {
    background: #d32f2f;
    animation: none;
    box-shadow: none;
  }

  /* Mobile: keep the briefing within its slot — no internal scroll. */
  @media (max-width: 1100px) {
    .qa-briefing .sec-label,
    .qa-briefing .qa-intro,
    .qa-briefing .briefing-meta,
    .qa-briefing .qa-note {
      display: none;
    }
    .qa-briefing .qa-title {
      font-size: 22px;
      margin-bottom: 8px;
    }
    .qa-briefing.is-compact .suggested-questions,
    .qa-briefing.is-compact .qa-title {
      display: none;
    }
    .qa-briefing.is-compact {
      padding: 10px 0;
    }
  }

  /* ── Right Column: Console ── */
  .qa-console {
    display: flex;
    flex-direction: column;
    background: var(--cream);
    position: relative;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    z-index: 1;
  }

  @media (max-width: 1100px) {
    .qa-console {
      flex: 1;
      min-height: 0;
    }
  }

  /* ── Chat Messages ── */
  .chat-viewport {
    flex: 1 1 0%;
    padding: 40px 24px 40px 0; /* Increased right padding */
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    min-height: 0;
    touch-action: pan-y;
    -webkit-overflow-scrolling: touch;
    z-index: 1;
    /* Hide scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .chat-viewport::-webkit-scrollbar {
    display: none;
  }

  .terminal-ready-indicator {
    padding: 40px 0;
    opacity: 0;
    animation: fadeIn 0.8s ease forwards 0.5s;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  @keyframes fadeIn { to { opacity: 1; } }

  .terminal-ready-indicator .sans-label {
    font-family: var(--sans);
    font-size: 11px;
    letter-spacing: 0.35em;
    color: var(--gold);
    text-transform: uppercase;
    font-weight: 700;
  }

  .ready-greeting {
    font-family: var(--serif);
    font-size: clamp(20px, 2.4vw, 28px);
    font-weight: 300;
    line-height: 1.25;
    color: var(--ink);
    letter-spacing: -0.01em;
    max-width: 38ch;
    margin: 0;
  }

  .ready-greeting em {
    font-style: italic;
    color: var(--gold);
  }

  .ready-hint {
    font-family: var(--sans);
    font-size: 14px;
    color: var(--ink-75);
    letter-spacing: 0.01em;
    line-height: 1.6;
    max-width: 52ch;
    margin: 0;
  }

  @keyframes dotPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(184,147,42,0.4); }
    50% { box-shadow: 0 0 0 5px rgba(184,147,42,0); }
  }

  /* ── Jump-to-latest pill ── */
  .jump-latest {
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: var(--ink);
    color: var(--cream);
    border: none;
    padding: 10px 16px 10px 14px;
    border-radius: 999px;
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(24,21,15,0.16);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
    z-index: 60;
  }

  .jump-latest.visible {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    pointer-events: auto;
  }

  .jump-latest:hover { background: var(--gold); }

  .jump-latest svg { width: 11px; height: 11px; }

  .msg-block {
    display: flex;
    width: 100%;
    flex-shrink: 0;
    padding-bottom: 32px;
    border-bottom: 1px solid var(--ink-05);
    position: relative;
    /* Clean reveal without risk of invisibility */
    animation: messageFadeIn 0.5s ease-out forwards;
  }

  @keyframes messageFadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .msg-block:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .msg-block.user { justify-content: flex-end; }
  .msg-block.agent { justify-content: flex-start; }

  .msg-content-wrap {
    max-width: 85%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  @media (min-width: 1101px) {
    .msg-content-wrap { max-width: 80%; }
  }

  .user .msg-content-wrap { align-items: flex-end; }
  .agent .msg-content-wrap { align-items: flex-start; }

  .msg-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 4px;
    margin-bottom: 2px;
  }

  .header-sep {
    font-family: var(--sans);
    font-size: 11px;
    color: var(--ink-20);
    line-height: 1;
    margin-right: 4px;
  }

  .sender-name {
    font-family: var(--sans);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-55);
  }

  .agent .sender-name { color: var(--gold); opacity: 1; }

  .msg-time {
    font-family: var(--sans);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--ink-55);
    text-transform: lowercase;
  }

  .msg-text {
    font-family: var(--sans);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.65;
    padding: 16px 22px;
    letter-spacing: 0.005em;
    position: relative;
    word-break: break-word;
  }

  .agent .msg-text {
    background: var(--ink-08);
    color: var(--ink);
    border-radius: 2px 16px 16px 16px;
    border-left: 2px solid var(--gold);
    box-shadow: 0 4px 16px rgba(24,21,15,0.03);
  }

  .user .msg-text {
    background: var(--ink);
    color: var(--cream);
    border-radius: 16px 2px 16px 16px;
    box-shadow: 0 12px 32px rgba(24,21,15,0.12);
  }

  /* ── Initialization ── */
  .init-loading {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--sans);
    font-size: 14px;
    color: var(--ink-75);
  }

  .init-spinner {
    width: 14px;
    height: 14px;
    border: 1px solid var(--gold-20);
    border-top-color: var(--gold);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── Input Area ── */
  .input-area-wrap {
    padding: 24px 0 48px;
    background: var(--cream);
    border-top: 1px solid var(--ink-05);
    margin-top: auto;
    flex-shrink: 0;
    z-index: 50; /* Ensure it stays above scrolling content */
    position: relative;
  }

  .input-form {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--ink-05);
    border: 1px solid var(--ink-08);
    border-radius: 2px;
    padding: 4px 4px 4px 16px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .input-form:focus-within {
    border-color: var(--gold-20);
    background: var(--cream);
    box-shadow: 0 8px 32px rgba(184,147,42,0.04);
  }

  .input-form textarea {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-family: var(--serif);
    font-size: 16px;
    font-style: italic;
    color: var(--ink);
    padding: 10px 0;
    min-width: 0;
    resize: none;
    line-height: 1.45;
    max-height: 160px;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .input-form textarea::placeholder {
    color: var(--ink-30);
    font-style: italic;
  }

  .input-form textarea:disabled {
    color: var(--ink-30);
    cursor: not-allowed;
  }

  .input-hint {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
    font-family: var(--sans);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-55);
    font-weight: 600;
  }

  .input-hint kbd {
    font-family: var(--sans);
    font-size: 11px;
    background: var(--ink-05);
    border: 1px solid var(--ink-08);
    border-radius: 2px;
    padding: 2px 6px;
    color: var(--ink);
    letter-spacing: 0.04em;
  }

  .inquiries-left {
    font-family: var(--sans);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 700;
    flex-shrink: 0;
  }

  .inquiries-left.depleted {
    color: #d32f2f;
  }

  @media (max-width: 1100px) {
    .input-hint {
      display: flex;
      justify-content: center;
      padding-top: 4px;
    }
    .input-hint > span:first-child { display: none; }
  }

  .submit-btn {
    background: var(--ink);
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    color: var(--cream);
    padding: 8px 16px;
    border-radius: 2px;
    transition: all 0.3s;
    flex-shrink: 0;
  }

  .submit-btn span {
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .submit-btn:hover:not(:disabled) { background: var(--gold); }
  .submit-btn:disabled { opacity: 0.1; cursor: not-allowed; }

  .typing-indicator { display: flex; gap: 4px; padding: 10px 0; }
  .typing-indicator span {
    width: 3px;
    height: 3px;
    background: var(--gold);
    border-radius: 50%;
    animation: typingPulse 1.2s infinite ease-in-out;
  }
  .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
  .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typingPulse {
    0%, 100% { transform: scale(1); opacity: 0.2; }
    50% { transform: scale(1.6); opacity: 1; }
  }

  .inline-error {
    font-family: var(--sans);
    font-size: 12px;
    color: #d32f2f;
    margin-top: 10px;
    letter-spacing: 0.03em;
    font-weight: 600;
  }

  .msg-block.agent.error .msg-text {
    border-left-color: #d32f2f;
    background: rgba(211, 47, 47, 0.06);
  }

  .msg-block.agent.error .sender-name {
    color: #d32f2f;
    opacity: 1;
  }

  .msg-text .inline-code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.92em;
    padding: 2px 6px;
    background: var(--ink-08);
    border-radius: 3px;
  }

  .agent .msg-text .inline-code {
    background: rgba(24, 21, 15, 0.08);
  }

  .user .msg-text .inline-code {
    background: rgba(244, 237, 227, 0.16);
    color: var(--cream);
  }


  .chat-viewport::-webkit-scrollbar { width: 4px; }
  .chat-viewport::-webkit-scrollbar-track { background: transparent; }
  .chat-viewport::-webkit-scrollbar-thumb { background: var(--ink-20); border-radius: 10px; }

  @media (max-width: 1100px) {
    .chat-viewport { padding: 16px 0; gap: 16px; }
    .msg-content-wrap { max-width: 95%; }
    .input-area-wrap { padding-bottom: 24px; padding-top: 16px; }
    .submit-btn span { display: none; }
    .submit-btn { padding: 12px; }
  }
`;
