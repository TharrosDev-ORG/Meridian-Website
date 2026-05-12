export const qaCss = `
  .qa-section {
    padding: 100px 0 0;
    background: var(--cream);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .qa-header {
    max-width: 800px;
    margin: 0 auto 40px;
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
    font-size: clamp(40px, 5vw, 64px);
    font-weight: 300;
    line-height: 1;
    color: var(--ink);
    margin: 0;
  }

  .qa-title em {
    font-style: italic;
    color: var(--gold);
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
