export const qaCss = `
  .qa-section {
    padding: 110px 0 60px;
    background: var(--cream);
    min-height: auto;
  }

  @media (max-width: 1100px) {
    .qa-section {
      padding: 90px 0 40px;
    }
  }

  .qa-header {
    max-width: 800px;
    margin: 0 auto 24px;
    text-align: center;
    padding: 0 24px;
  }

  .sec-label {
    font-family: var(--sans);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
  }

  .qa-title {
    font-family: var(--serif);
    font-size: clamp(40px, 5vw, 72px);
    font-weight: 300;
    line-height: 0.95;
    color: var(--ink);
    margin-bottom: 20px;
  }

  .qa-title em {
    font-style: italic;
    color: var(--gold);
  }

  .qa-intro {
    font-family: var(--serif);
    font-size: clamp(18px, 1.8vw, 24px);
    font-style: italic;
    font-weight: 300;
    color: var(--ink-55);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .qa-container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1100px) {
    .qa-section {
      padding-top: 80px;
    }
    .qa-header {
      margin-bottom: 32px;
    }
  }
`;
