/*
 * Shared styles for informational pages: privacy, terms, accessibility, contact.
 * Matches the Deep Ink aesthetic used across the site.
 */
export const infoPageCss = `
  main {
    background: var(--cream);
    min-height: 100vh;
  }

  .info-hero {
    padding: 140px 52px 60px;
    background: var(--cream);
    position: relative;
    text-align: center;
  }
  .info-hero::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 48px;
    height: 1px;
    background: var(--gold);
    opacity: 0.5;
  }

  .info-eyebrow {
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 24px;
  }

  .info-title {
    font-family: var(--serif);
    font-size: clamp(44px, 6vw, 80px);
    font-weight: 300;
    line-height: 1.02;
    color: var(--ink);
    letter-spacing: 0.01em;
    margin-bottom: 20px;
  }
  .info-title em {
    font-style: italic;
    color: var(--gold);
  }

  .info-meta {
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-55);
    margin-top: 12px;
  }

  .info-body {
    max-width: 720px;
    margin: 0 auto;
    padding: 80px 52px 120px;
  }
  @media (min-width: 1101px) {
    .info-hero { padding: 168px 72px 72px; }
    .info-hero::after { width: 56px; }
    .info-body { padding: 128px 0 176px; max-width: 740px; }
    .info-body h2 { margin: 64px 0 22px; }
    .info-body p, .info-body li { font-size: 19px; line-height: 1.85; }
    .info-body a { transition: color 0.25s ease, text-decoration-color 0.25s ease; }
    .info-body a:hover { text-decoration-color: var(--ink); }
    .info-contact-grid { gap: 32px; margin: 40px 0; }
    .info-contact-card {
      padding: 32px;
      transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .info-contact-card:hover {
      transform: translateY(-3px);
      border-color: var(--gold-lt);
      box-shadow: 0 8px 28px rgba(24,21,15,0.06);
    }
    .info-contact-val { font-size: 19px; }
  }


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
    font-size: 18px;
    line-height: 1.8;
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
    font-size: 18px;
    line-height: 1.8;
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

  .info-contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    margin: 32px 0;
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
    font-size: 18px;
    color: var(--ink);
    line-height: 1.5;
  }
  .info-contact-val a { text-decoration: none; border-bottom: 1px solid var(--gold); padding-bottom: 2px; }

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
    .info-body h2 {
      font-size: 22px;
      margin: 40px 0 14px;
      padding-bottom: 10px;
      line-height: 1.25;
    }
    .info-body p, .info-body li {
      font-size: 16.5px;
      line-height: 1.75;
      margin-bottom: 14px;
    }
    .info-body li { padding-left: 20px; }
    .info-body li::before { left: 4px; }

    .info-contact-grid { grid-template-columns: 1fr; gap: 14px; margin: 24px 0; }
    .info-contact-card { padding: 22px; }
    .info-contact-lbl { font-size: 10px; letter-spacing: 0.24em; margin-bottom: 10px; }
    .info-contact-val { font-size: 16.5px; line-height: 1.55; }
    .info-contact-val a { word-break: break-word; }
  }

  @media (max-width: 380px) {
    .info-hero { padding: 100px 18px 44px; }
    .info-body { padding: 44px 18px 64px; }
    .info-title { font-size: clamp(32px, 11vw, 44px); }
  }
`;
