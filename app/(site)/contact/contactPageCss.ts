import { infoPageCss } from "../_info/infoPageCss";

export const contactPageCss = infoPageCss + `
  .contact-hero { position: relative; overflow: hidden; padding-bottom: 52px !important; }
  .contact-hero-inner { position: relative; z-index: 2; }
  .contact-hero .grid-lines::before { opacity: 0.5; }
  .info-body { max-width: 1100px !important; }

  /* ══ Contact channels — brutalist bordered blocks ══ */
  .contact-grid-premium {
    display: grid; grid-template-columns: 1fr; border-top: 1px solid var(--ink);
    position: relative; z-index: 2; margin-top: 6px;
  }
  .contact-card-v2 {
    background: var(--cream); border-bottom: 1px solid var(--ink); padding: 44px 36px;
    display: flex; flex-direction: column; justify-content: space-between; min-height: 220px;
    text-decoration: none; position: relative; overflow: hidden; transition: background 0.3s;
  }
  .contact-card-v2::after {
    content: '↗'; position: absolute; top: 24px; right: 28px;
    font-family: var(--mono); font-size: 15px; color: var(--gold);
    opacity: 0.4; transition: opacity 0.3s, transform 0.3s;
  }
  .contact-card-v2:hover::after { opacity: 1; transform: translate(3px, -3px); }
  .contact-card-lbl {
    font-family: var(--mono); font-size: 11px; font-weight: 400; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 28px;
  }
  .contact-card-val {
    font-family: var(--serif); font-size: clamp(20px, 2.2vw, 30px); line-height: 1.2;
    color: var(--ink); margin-bottom: 22px; letter-spacing: -0.02em; display: inline-block;
    background-image: linear-gradient(var(--gold), var(--gold)); background-position: 0 100%;
    background-repeat: no-repeat; background-size: 0% 2px;
    transition: background-size 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .contact-card-v2:hover .contact-card-val { background-size: 100% 2px; }
  .contact-card-desc { font-family: var(--serif); font-size: 18px; line-height: 1.7; color: var(--ink-75); max-width: 340px; }

  /* ══ Pathways — record list ══ */
  .contact-sub-title { font-family: var(--serif); font-size: clamp(34px, 4vw, 60px); font-weight: 300; letter-spacing: -0.015em; color: var(--ink); margin: 0 0 14px; line-height: 0.98; }
  .contact-sub-title em { font-style: italic; color: var(--gold); }
  .contact-paths { list-style: none; margin: 36px 0 0; padding: 0; border-top: 1px solid var(--ink); }
  .contact-path { display: grid; grid-template-columns: 1fr; gap: 4px; padding: 30px 4px; border-bottom: 1px solid var(--ink-15); }
  .contact-path::before { content: none !important; }
  .contact-path-num { font-family: var(--mono); font-size: 13px; color: var(--gold); }
  .contact-path h3 { font-family: var(--serif); font-weight: 300; font-size: clamp(24px, 2.4vw, 34px); color: var(--ink); margin: 0; line-height: 1.05; }
  .contact-path p { margin: 6px 0 0 !important; max-width: 70ch; }

  @media (min-width: 1101px) {
    .contact-grid-premium { grid-template-columns: 1fr 1fr; }
    .contact-card-v2:nth-child(2) { border-left: 1px solid var(--ink); }
    .contact-card-v2:hover { background: var(--cream-mid); box-shadow: inset 5px 0 0 var(--gold); }
    .contact-path { grid-template-columns: 90px 1fr; gap: 44px; align-items: baseline; padding: 34px 4px; transition: padding-left 0.35s cubic-bezier(0.16,1,0.3,1), background 0.35s; }
    .contact-path:hover { padding-left: 18px; background: var(--ink-08); }
  }

  @media (max-width: 700px) {
    .contact-card-v2 { padding: 30px 22px; min-height: auto; }
    .contact-card-lbl { margin-bottom: 20px; }
    .contact-card-desc { font-size: 16px; }
  }
`;
