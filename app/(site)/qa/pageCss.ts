export const qaCss = `
  .qa-section {
    padding: 160px 0 100px;
    background: var(--cream);
    min-height: 100vh;
  }

  .qa-header {
    max-width: 900px;
    margin: 0 auto 64px;
    text-align: center;
  }

  .qa-title {
    font-family: var(--serif);
    font-size: clamp(40px, 5vw, 72px);
    font-weight: 300;
    line-height: 1.1;
    color: var(--ink);
    margin-top: 16px;
    margin-bottom: 24px;
  }

  .qa-title em {
    font-style: italic;
    color: var(--gold);
  }

  .qa-intro {
    font-family: var(--sans);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: var(--ink-75);
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.6;
    opacity: 0.8;
  }

  @media (max-width: 1100px) {
    .qa-section {
      padding: 120px 0 60px;
    }
    .qa-header {
      margin-bottom: 40px;
      padding: 0 20px;
    }
  }
`;
