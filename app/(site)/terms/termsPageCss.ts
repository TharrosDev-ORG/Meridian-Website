import { infoPageCss } from "../_info/infoPageCss";

export const termsPageCss = infoPageCss + `
  .terms-hero {
    position: relative;
    overflow: hidden;
  }
  .terms-hero::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -5%;
    width: 40%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(184, 147, 42, 0.04) 0%, transparent 70%);
    filter: blur(50px);
    pointer-events: none;
  }

  .info-body {
    max-width: 800px !important;
    padding-bottom: 160px !important;
  }

  h2 {
    position: relative;
    display: inline-block;
    margin-top: 64px !important;
    margin-bottom: 24px !important;
  }
  h2::before {
    content: '◈';
    position: absolute;
    left: -32px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: var(--gold);
    opacity: 0.4;
  }

  .info-lede {
    font-size: 22px;
    color: var(--ink);
    border-bottom: 1px solid var(--ink-08);
    padding-bottom: 48px;
    margin-bottom: 48px;
    line-height: 1.7;
  }

  p {
    font-size: 18px;
    line-height: 1.8;
    color: var(--ink-90);
    margin-bottom: 24px;
  }

  @media (max-width: 700px) {
    h2::before { display: none; }
    p { font-size: 16.5px; }
    .info-body { padding: 60px 24px 100px !important; }
  }
`;
