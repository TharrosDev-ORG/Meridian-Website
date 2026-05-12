export const qaCss = `
  .qa-container {
    padding: 80px 0;
    background: var(--cream);
    min-height: 60vh;
  }

  .qa-agent-placeholder {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    aspect-ratio: 16/9;
    background: var(--ink);
    color: var(--cream);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
    text-align: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .qa-agent-placeholder::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: var(--grain);
    background-size: 220px 220px;
    opacity: 0.05;
    pointer-events: none;
  }

  .qa-agent-placeholder h3 {
    font-family: var(--serif);
    font-size: 2rem;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }

  .qa-agent-placeholder p {
    font-family: var(--sans);
    opacity: 0.7;
    max-width: 400px;
    position: relative;
    z-index: 1;
  }

  .qa-agent-placeholder .spinner {
    width: 40px;
    height: 40px;
    border: 2px solid rgba(255,255,255,0.1);
    border-top-color: var(--gold);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 1100px) {
    .qa-agent-placeholder {
      aspect-ratio: 4/5;
    }
  }
`;
