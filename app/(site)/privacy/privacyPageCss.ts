import { infoPageCss } from "../_info/infoPageCss";

export const privacyPageCss = infoPageCss + `
  .privacy-hero {
    position: relative;
    overflow: hidden;
  }
  .privacy-hero::before {
    content: '';
    position: absolute;
    top: -30%;
    left: -10%;
    width: 50%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(184, 147, 42, 0.04) 0%, transparent 70%);
    filter: blur(50px);
    pointer-events: none;
  }

  .info-body {
    max-width: 800px !important; /* Slightly wider for better line lengths */
    padding-bottom: 160px !important;
  }

  .info-body h2 {
    position: relative;
    display: inline-block;
    margin-top: 64px !important;
    margin-bottom: 32px !important;
  }
  .info-body h2::before {
    content: '◈';
    position: absolute;
    left: -32px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: var(--gold);
    opacity: 0.4;
  }

  .info-body ul {
    list-style: none;
    padding-left: 0;
    margin: 24px 0;
  }
  .info-body ul li {
    position: relative;
    padding-left: 28px;
    margin-bottom: 16px;
    font-family: var(--serif);
    font-size: 19px;
    color: var(--ink-90);
    line-height: 1.6;
  }
  .info-body ul li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 13px;
    width: 12px;
    height: 1px;
    background: var(--gold);
    opacity: 0.6;
  }

  .info-lede {
    font-size: 22px;
    color: var(--ink);
    border-bottom: 1px solid var(--ink-08);
    padding-bottom: 48px;
    margin-bottom: 48px;
  }

  @media (max-width: 700px) {
    h2::before { display: none; }
    ul li { font-size: 17px; padding-left: 20px; }
    .info-body { padding: 60px 24px 100px !important; }
  }
`;
