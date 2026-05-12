export const qaCss = `
  .qa-section {
    padding: 120px 0 100px;
    background: var(--cream);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  /* Background grid for that industrial feel */
  .qa-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, var(--ink-05) 1px, transparent 1px),
      linear-gradient(to bottom, var(--ink-05) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .qa-header {
    max-width: 1000px;
    margin: 0 auto 64px;
    text-align: center;
    position: relative;
    z-index: 10;
  }

  .qa-title {
    font-family: var(--serif);
    font-size: clamp(48px, 6vw, 84px);
    font-weight: 300;
    line-height: 0.95;
    color: var(--ink);
    margin-top: 16px;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
  }

  .qa-title em {
    font-style: italic;
    font-weight: 400;
    color: var(--gold);
  }

  .qa-intro {
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--ink-40);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.8;
  }

  .qa-container {
    position: relative;
    z-index: 10;
  }

  @media (max-width: 1100px) {
    .qa-section {
      padding: 100px 0 60px;
    }
    .qa-header {
      margin-bottom: 40px;
      padding: 0 24px;
    }
    .qa-title {
      font-size: clamp(36px, 10vw, 56px);
    }
  }
`;
