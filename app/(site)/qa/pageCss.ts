export const qaCss = `
  /* Hide global footer and utility overlays to maintain dashboard focus */
  footer, .footer, .progress, .skip-link, .arc-btn, .mobile-dock, .back-to-top-btn {
    display: none !important;
  }
  
  html, body {
    overflow: hidden !important;
    height: 100% !important;
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
      grid-template-columns: 350px 1fr;
      gap: 80px;
    }
  }

  /* ── Left Column: Briefing ── */
  .qa-briefing {
    padding-top: 40px;
    padding-bottom: 40px;
    z-index: 10;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .qa-briefing::-webkit-scrollbar { display: none; }

  @media (min-width: 1101px) {
    .qa-briefing {
      height: 100%;
      border-right: 1px solid rgba(24, 21, 15, 0.04);
      padding-right: 40px; /* Buffer from the chat wall */
    }
  }

  @media (max-width: 1100px) {
    .qa-briefing {
      padding: 24px 0 16px;
      height: auto;
      max-height: 35vh;
      border-bottom: 1px solid rgba(24, 21, 15, 0.03);
      flex-shrink: 0;
    }
  }

  .sec-label {
    font-family: var(--sans);
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
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
    font-size: clamp(28px, 3.2vw, 40px);
    font-weight: 300;
    line-height: 1.1;
    color: var(--ink);
    margin-bottom: 12px;
    letter-spacing: -0.01em;
  }

  .qa-title em {
    font-style: italic;
    color: var(--gold);
  }

  .qa-intro {
    font-family: var(--serif);
    font-size: 15px;
    font-style: italic;
    font-weight: 300;
    color: var(--ink-55);
    line-height: 1.5;
    margin-bottom: 32px;
  }

  .briefing-meta {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    background: rgba(24, 21, 15, 0.03);
    border: 1px solid rgba(24, 21, 15, 0.05);
    border-radius: 2px;
    margin-bottom: 32px;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .meta-label {
    font-family: var(--sans);
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-30);
  }

  .meta-value {
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 500;
    color: var(--ink-75);
  }

  .suggested-questions {
    margin-top: auto;
    padding-top: 40px;
  }

  @media (max-width: 1100px) {
    .suggested-questions { padding-top: 24px; }
  }

  .suggested-title {
    font-family: var(--sans);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
  }

  .suggested-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .suggested-btn {
    background: transparent;
    border: 1px solid rgba(24, 21, 15, 0.05);
    padding: 10px 14px;
    text-align: left;
    font-family: var(--sans);
    font-size: 12px;
    color: var(--ink-55);
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 2px;
    outline: none;
  }

  .suggested-btn:hover {
    border-color: var(--gold-20);
    color: var(--ink);
    background: rgba(24, 21, 15, 0.03);
  }

  .suggested-btn:active { transform: scale(0.98); }

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
  }

  @keyframes fadeIn { to { opacity: 1; } }

  .terminal-ready-indicator .sans-label {
    font-size: 8px;
    letter-spacing: 0.5em;
    color: var(--ink-30);
    text-transform: uppercase;
    font-weight: 700;
  }

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
    font-size: 10px;
    color: var(--ink-15);
    line-height: 1;
    margin-right: 4px;
  }

  .sender-name {
    font-family: var(--sans);
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-30);
  }

  .agent .sender-name { color: var(--gold); opacity: 0.8; }

  .msg-time {
    font-family: var(--sans);
    font-size: 8px;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: var(--ink-20);
    text-transform: lowercase;
  }

  .msg-text {
    font-family: var(--sans);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.7;
    padding: 16px 22px;
    letter-spacing: 0.01em;
    position: relative;
    word-break: break-word;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .agent .msg-text {
    background: var(--ink-08);
    color: var(--ink);
    border-radius: 2px 16px 16px 16px;
    border-left: 2px solid var(--gold);
    box-shadow: 0 4px 16px rgba(24,21,15,0.03);
    transform-origin: top left;
  }

  .user .msg-text {
    background: var(--ink);
    color: var(--cream);
    border-radius: 16px 2px 16px 16px;
    box-shadow: 0 12px 32px rgba(24,21,15,0.12);
    transform-origin: top right;
  }

  .msg-block:hover .msg-text {
    transform: scale(1.005);
  }

  /* ── Initialization ── */
  .init-loading {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: var(--sans);
    font-size: 13px;
    color: var(--ink-55);
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

  .input-form input {
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
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.15em;
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
    font-size: 9px;
    color: #d32f2f;
    margin-top: 8px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 600;
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
