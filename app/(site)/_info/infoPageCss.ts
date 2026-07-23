/*
 * Shared styles for informational pages: privacy, terms, accessibility, contact.
 * Matches the Deep Ink aesthetic used across the site.
 */
export const infoPageCss = `
  main {
    background: var(--cream);
    min-height: 100vh;
    min-height: 100dvh;
  }

  .info-hero {
    padding: 150px 52px 44px;
    background: var(--cream);
    position: relative;
    text-align: left;
    max-width: 1440px;
    margin: 0 auto;
    border-bottom: 1px solid var(--ink-15);
    overflow: hidden;
  }

  .info-eyebrow {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 22px;
  }

  .info-title {
    font-family: var(--serif);
    font-size: clamp(52px, 8vw, 132px);
    font-weight: 300;
    line-height: 0.9;
    color: var(--ink);
    letter-spacing: -0.02em;
    margin-bottom: 24px;
  }
  .info-title em {
    font-style: italic;
    color: var(--gold);
  }
  .info-title span { display: inline-block; }

  .info-meta {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-55);
    margin-top: 12px;
  }

  .info-body {
    max-width: 720px;
    margin: 0 auto;
    padding: 80px 52px 120px;
  }

  /* ── Opening lede ── */
  .info-lede {
    font-family: var(--serif);
    font-size: 22px;
    line-height: 1.82;
    color: var(--ink-90);
    margin-bottom: 32px;
  }

  /* ── Callout / notice box ── */
  .info-notice {
    border-left: 2px solid var(--gold);
    padding: 18px 24px;
    background: var(--cream-mid);
    margin: 32px 0;
  }
  .info-notice p {
    font-family: var(--serif);
    font-size: 17px;
    line-height: 1.72;
    color: var(--ink-75);
    margin-bottom: 0;
  }

  /* ── Date stamp utility ── */
  .info-datestamp {
    display: inline-block;
    font-family: var(--mono);
    font-size: 10.5px;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-55);
    border: 1px solid var(--ink-15);
    padding: 7px 16px;
    margin-bottom: 52px;
  }

  /* ── Related pages footer nav ── */
  .info-related {
    margin-top: 80px;
    padding-top: 40px;
    border-top: 1px solid var(--ink-15);
    text-align: left;
  }
  .info-related-label {
    font-family: var(--mono);
    font-size: 10.5px;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-55);
    margin-bottom: 22px;
  }
  .info-related-links {
    display: flex;
    justify-content: flex-start;
    gap: 40px;
    flex-wrap: wrap;
  }
  .info-related-links a {
    font-family: var(--mono);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: none;
    border-bottom: 1px solid var(--gold);
    padding-bottom: 3px;
    transition: color 0.25s;
  }
  .info-related-links a:hover { color: var(--gold); }

  /* ── Body headings ── */
  .info-body h2 {
    font-family: var(--serif);
    font-size: clamp(24px, 2.4vw, 32px);
    font-weight: 400;
    color: var(--ink);
    letter-spacing: 0.01em;
    margin: 56px 0 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--ink-15);
  }
  .info-body h2:first-child { margin-top: 0; }

  .info-body p {
    font-family: var(--serif);
    font-size: 20px;
    line-height: 1.85;
    color: var(--ink-90);
    margin-bottom: 18px;
  }

  .info-body ul {
    list-style: none;
    padding: 0;
    margin: 0 0 18px;
  }
  .info-body li {
    font-family: var(--serif);
    font-size: 20px;
    line-height: 1.85;
    color: var(--ink-90);
    padding-left: 24px;
    position: relative;
    margin-bottom: 10px;
  }
  .info-body li::before {
    content: '·';
    position: absolute;
    left: 8px;
    top: 0;
    color: var(--gold);
    font-weight: 700;
  }

  .info-body a {
    color: var(--ink);
    text-decoration: underline;
    text-decoration-color: var(--gold);
    text-underline-offset: 4px;
    transition: color 0.2s;
  }
  .info-body a:hover { color: var(--gold); }

  /* ── Contact grid ── */
  .info-contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    margin: 32px 0 48px;
  }
  .info-contact-card {
    padding: 28px;
    background: var(--cream-mid);
    border: 1px solid var(--ink-15);
  }
  .info-contact-lbl {
    font-family: var(--sans);
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
  }
  .info-contact-val {
    font-family: var(--serif);
    font-size: 20px;
    color: var(--ink);
    line-height: 1.5;
  }
  .info-contact-val a {
    text-decoration: none;
    border-bottom: 1px solid var(--gold);
    padding-bottom: 2px;
  }
  .info-contact-desc {
    font-family: var(--sans);
    font-size: 11.5px;
    font-weight: 400;
    letter-spacing: 0.06em;
    color: var(--ink-55);
    margin-top: 12px;
    line-height: 1.65;
  }

  @media (min-width: 1101px) {
    .info-hero { padding: 168px 72px 72px; }
    .info-hero::after { width: 56px; }
    .info-body { padding: 128px 0 176px; max-width: 740px; }
    .info-lede { font-size: 24px; line-height: 1.85; }
    .info-body h2 { margin: 64px 0 22px; }
    .info-body p, .info-body li { font-size: 21px; line-height: 1.9; }
    .info-body a { transition: color 0.25s ease, text-decoration-color 0.25s ease; }
    .info-body a:hover { text-decoration-color: var(--ink); }
    .info-contact-grid { gap: 32px; margin: 40px 0 56px; }
    .info-contact-card {
      padding: 32px;
      transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .info-contact-card:hover {
      transform: perspective(var(--perspective-card)) translateY(-6px) rotateX(2deg) translateZ(8px);
      border-color: var(--gold-lt);
      box-shadow: 0 12px 36px rgba(24,21,15,0.08);
    }
    .info-contact-val { font-size: 21px; }
    .info-contact-desc { font-size: 12px; }
    .info-notice { padding: 22px 28px; }
    .info-notice p { font-size: 18px; }
    .info-related { margin-top: 100px; padding-top: 48px; }
    .info-related-links a:hover { border-bottom-color: var(--ink); }
  }

  @media (max-width: 700px) {
    .info-hero { padding: 104px 22px 48px; }
    .info-eyebrow { margin-bottom: 18px; font-size: 10px; letter-spacing: 0.26em; }
    .info-title {
      font-size: clamp(36px, 10vw, 52px);
      line-height: 1.02;
      margin-bottom: 16px;
    }
    .info-meta { font-size: 10px; letter-spacing: 0.2em; }

    .info-body { padding: 48px 22px 72px; }
    .info-lede { font-size: 19.5px; line-height: 1.75; margin-bottom: 24px; }
    .info-datestamp { font-size: 9.5px; letter-spacing: 0.22em; padding: 6px 14px; margin-bottom: 40px; }
    .info-body h2 {
      font-size: 22px;
      margin: 40px 0 14px;
      padding-bottom: 10px;
      line-height: 1.25;
    }
    .info-body h2:first-child { margin-top: 0; }
    .info-body p, .info-body li {
      font-size: 18.5px;
      line-height: 1.8;
      margin-bottom: 14px;
    }
    .info-body li { padding-left: 20px; }
    .info-body li::before { left: 4px; }

    .info-contact-grid { grid-template-columns: 1fr; gap: 14px; margin: 24px 0 36px; }
    .info-contact-card { padding: 22px; }
    .info-contact-lbl { font-size: 10px; letter-spacing: 0.24em; margin-bottom: 10px; }
    .info-contact-val { font-size: 16.5px; line-height: 1.55; }
    .info-contact-val a { word-break: break-word; }
    .info-contact-desc { font-size: 11px; margin-top: 10px; }

    .info-notice { padding: 16px 18px; }
    .info-notice p { font-size: 15.5px; }
    .info-related { margin-top: 60px; padding-top: 32px; }
    .info-related-links { gap: 24px; }
    .info-related-links a { font-size: 11px; }
  }

  @media (max-width: 380px) {
    .info-hero { padding: 100px 18px 44px; }
    .info-body { padding: 44px 18px 64px; }
    .info-title { font-size: clamp(32px, 11vw, 44px); }
  }
`;
