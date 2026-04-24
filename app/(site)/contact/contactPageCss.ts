import { infoPageCss } from "../_info/infoPageCss";

export const contactPageCss = infoPageCss + `
  .contact-hero {
    position: relative;
    overflow: hidden;
    padding-bottom: 120px !important;
  }
  .info-body {
    max-width: 1100px !important;
  }
  .contact-hero::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 60%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(184, 147, 42, 0.05) 0%, transparent 70%);
    filter: blur(60px);
    pointer-events: none;
  }

  .contact-grid-premium {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-top: -60px;
    position: relative;
    z-index: 2;
  }

  .contact-card-v2 {
    background: var(--cream);
    border: 1px solid var(--ink-10);
    padding: 48px 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 280px;
    box-shadow: 0 4px 20px rgba(24, 21, 15, 0.03), 0 20px 80px rgba(24, 21, 15, 0.06);
    transition: border-color 0.4s ease, box-shadow 0.4s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .contact-card-v2:hover {
    border-color: var(--gold-lt);
    box-shadow: 0 8px 30px rgba(24, 21, 15, 0.05), 0 30px 100px rgba(24, 21, 15, 0.1);
  }

  .contact-card-v2::after {
    content: '◆';
    position: absolute;
    bottom: 24px;
    right: 24px;
    font-size: 14px;
    color: var(--gold);
    opacity: 0.2;
    transition: opacity 0.4s, transform 0.4s;
  }
  .contact-card-v2:hover::after {
    opacity: 1;
    transform: rotate(90deg);
  }

  .contact-card-lbl {
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 32px;
  }

  .contact-card-val {
    font-family: var(--serif);
    font-size: clamp(16px, 1.8vw, 24px);
    line-height: 1.2;
    color: var(--ink);
    margin-bottom: 24px;
    white-space: nowrap;
    letter-spacing: -0.02em;
    display: inline-block;
    background-image: linear-gradient(var(--gold), var(--gold));
    background-position: 0% 100%;
    background-repeat: no-repeat;
    background-size: 0% 2px;
    transition: background-size 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .contact-card-v2:hover .contact-card-val {
    background-size: 100% 2px;
  }

  .contact-card-desc {
    font-family: var(--serif);
    font-size: 18px;
    line-height: 1.7;
    color: var(--ink-75);
    max-width: 320px;
  }

  .contact-sub-header {
    margin-top: 120px;
    text-align: center;
  }
  .contact-sub-title {
    font-family: var(--serif);
    font-size: 32px;
    font-weight: 300;
    color: var(--ink);
    margin-bottom: 24px;
  }
  .contact-sub-title em {
    font-style: italic;
    color: var(--gold);
  }

  @media (max-width: 1100px) {
    .contact-grid-premium {
      grid-template-columns: 1fr;
      margin-top: 0;
      gap: 24px;
    }
    .contact-card-v2 {
      padding: 32px;
      min-height: auto;
    }
    .contact-card-val {
      font-size: 26px;
    }
  }

  @media (max-width: 700px) {
    .contact-hero { padding-bottom: 60px !important; }
    .contact-card-v2 { padding: 24px; }
    .contact-card-lbl { margin-bottom: 20px; }
    .contact-card-val { font-size: 22px; }
    .contact-card-desc { font-size: 16px; }
  }
`;
