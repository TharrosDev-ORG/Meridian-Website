export const teamCss = `
    /*
     * The Meridian Society — Team Page Styles
     * Page-specific overrides only. Tokens and nav live in globals.css.
     */

    /* Keyframes consolidated to globals.css */

    /* ── Page hero (subpage version of index hero) ── */
    /* ── Team section ── */
    .team-sec { padding: 80px 0; background: var(--cream-deep); position: relative; overflow: hidden; }
    .team-sec::before { content: ''; position: absolute; top: 40px; right: 40px; width: 80px; height: 80px; border-top: 1px solid var(--ink-15); border-right: 1px solid var(--ink-15); pointer-events: none; }
    .team-sec::after  { content: ''; position: absolute; bottom: 40px; left: 40px; width: 80px; height: 80px; border-bottom: 1px solid var(--ink-15); border-left: 1px solid var(--ink-15); pointer-events: none; }
    .team-sec .wrap { position: relative; z-index: 1; }
    .team-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 52px; }
    .team-title { font-family: var(--serif); font-size: clamp(36px, 3.5vw, 56px); font-weight: 300; line-height: 1.05; color: var(--ink); }
    .team-title em { font-style: italic; }

    /* ── Member grid ── */
    .member-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

    .member-card {
      display: flex; flex-direction: column;
      background: var(--cream); border: 1px solid var(--ink-15);
      overflow: hidden; position: relative;
      box-shadow: 0 2px 12px rgba(24,21,15,0.04), 0 8px 40px rgba(24,21,15,0.06);
      transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease;
    }
    .member-card::before {
      content: ''; position: absolute; inset: 0;
      background-image: var(--grain); background-size: 200px 200px;
      opacity: 0.04; pointer-events: none; z-index: 0;
      transition: opacity 0.4s ease;
    }
    .member-card:hover {
      transform: translateY(-8px);
      border-color: var(--gold-20);
      box-shadow: 0 12px 32px rgba(24,21,15,0.08), 0 24px 80px rgba(24,21,15,0.12);
    }
    .member-card:hover::before { opacity: 0.07; }
    
    .member-card::after {
      content: ''; position: absolute; inset: 0;
      border: 1px solid var(--gold); opacity: 0;
      pointer-events: none; transition: opacity 0.4s ease; z-index: 5;
    }
    .member-card:hover::after { opacity: 0.1; }

    .member-photo-wrap {
      position: relative; width: 96px; height: 120px; flex-shrink: 0;
      overflow: hidden; background: var(--cream-mid);
      border: 1px solid var(--ink-15);
      box-shadow: inset 0 0 0 1px rgba(24,21,15,0.05);
    }
    .member-photo {
      width: 100%; height: 100%; object-fit: cover; object-position: center top;
      display: block; transition: filter 0.4s ease;
    }
    .member-photo-placeholder {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      color: var(--gold); opacity: 0.15;
      font-family: var(--sans); font-size: 11px;
      letter-spacing: 0.24em; text-transform: uppercase;
    }

    .member-body { padding: 28px 28px 32px; display: flex; flex-direction: column; flex: 1; position: relative; z-index: 1; }
    .member-header { display: flex; align-items: flex-start; gap: 18px; margin-bottom: 22px; }

    .member-name { font-family: var(--serif); font-size: 26px; font-weight: 300; color: var(--ink); line-height: 1.1; margin-bottom: 6px; }
    .member-role { font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); }
    .member-studies { font-family: var(--serif); font-size: 17px; font-style: italic; color: var(--ink-75); line-height: 1.55; border-left: 2px solid var(--ink-15); padding-left: 14px; margin-bottom: 18px; }
    .member-bio { font-family: var(--serif); font-size: 18px; font-weight: 400; color: var(--ink-90); line-height: 1.75; flex: 1; margin-bottom: 24px; }

    .member-social { display: flex; gap: 10px; margin-top: auto; }
    .member-social a {
      display: flex; align-items: center; justify-content: center;
      width: 34px; height: 34px;
      border: 1px solid var(--ink-15); color: var(--ink-55);
      transition: background 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    }
    .member-social a:hover {
      background: var(--ink); color: var(--cream);
      border-color: var(--ink);
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(24,21,15,0.12);
    }
    @media (min-width: 1101px) {
      .member-social a:hover {
        transform: translateY(-5px) scale(1.1);
        transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s, color 0.3s;
      }
    }


    .member-social svg { width: 15px; height: 15px; }

    /* Placeholder card */
    .member-card--placeholder {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; min-height: 320px; 
      border: 1px dashed var(--ink-30);
      background: linear-gradient(135deg, var(--cream) 0%, var(--cream-mid) 100%); 
      box-shadow: inset 0 0 40px rgba(24,21,15,0.02);
      transition: border-color 0.4s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
    }
    .member-card--placeholder::before {
      content: ''; position: absolute; inset: 0;
      background-image: var(--grain); background-size: 180px 180px;
      opacity: 0.03; pointer-events: none;
    }
    .member-card--placeholder:hover { 
      transform: translateY(-4px); 
      border-color: var(--gold); 
      border-style: solid;
      background: var(--cream);
    }
    .placeholder-icon { 
      font-size: 28px; color: var(--gold); opacity: 0.4; 
      margin-bottom: 24px; line-height: 1; 
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s;
    }
    .member-card--placeholder:hover .placeholder-icon { transform: scale(1.2) rotate(15deg); opacity: 1; }
    .placeholder-text { font-family: var(--serif); font-size: 22px; font-style: italic; font-weight: 300; color: var(--ink-75); line-height: 1.4; }
    .placeholder-sub { font-family: var(--sans); font-size: 10px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); opacity: 0.60; margin-top: 16px; }



    /* ══ Desktop optimizations ══ */
    @media (min-width: 1101px) {
      .team-sec { padding: 112px 0; }
      .team-header { margin-bottom: 64px; }
      .member-grid { gap: 32px; }

      /* Photo + header: more presence on desktop */
      .member-photo-wrap { width: 104px; height: 130px; }
      .member-header { gap: 22px; margin-bottom: 26px; }
      .member-name { font-size: 28px; margin-bottom: 8px; }
      .member-role { font-size: 11px; }
      .member-studies { font-size: 18px; padding-left: 16px; margin-bottom: 22px; line-height: 1.6; }
      .member-bio { font-size: 19px; line-height: 1.8; }
      .member-body { padding: 32px 32px 36px; }

      /* Social icons: larger & more tactile */
      .member-social a { width: 38px; height: 38px; }
      .member-social svg { width: 16px; height: 16px; }

      /* Subtle photo treatment on card hover */
      .member-card:hover .member-photo { filter: brightness(1.05) saturate(1.05); }

      /* Placeholder card feels more balanced on desktop */
      .member-card--placeholder { min-height: 360px; }
      .placeholder-icon { font-size: 26px; margin-bottom: 24px; }
      .placeholder-text { font-size: 22px; }
    }

    /* ── Responsive ── */
    @media (max-width: 1100px) {
      .team-header { flex-direction: column; align-items: flex-start; gap: 16px; }
      .member-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
      .rv { transform: none; transition: opacity 0.4s ease; }
      .rv[data-d="1"], .rv[data-d="2"], .rv[data-d="3"] { transition-delay: 0s; }
    }

    @media (max-width: 750px) {
      .member-grid { grid-template-columns: 1fr; gap: 16px; }
      .member-header { flex-direction: row; align-items: center; gap: 20px; margin-bottom: 20px; }
      .member-photo-wrap { width: 88px; height: 108px; flex-shrink: 0; }
      .member-name { font-size: 23px; line-height: 1.1; margin-bottom: 4px; }
      .member-role { font-size: 10px; letter-spacing: 0.24em; }
      .member-studies { font-size: 16px; line-height: 1.6; padding-left: 12px; margin-bottom: 16px; }
      .member-bio { font-size: 16.5px; line-height: 1.72; margin-bottom: 20px; }
      .member-body { padding: 26px 24px 28px; }
    }

    @media (max-width: 700px) {
      .team-sec { padding: 60px 0; }
      .team-sec::before, .team-sec::after { width: 48px; height: 48px; top: 22px; right: 22px; }
      .team-sec::after { top: auto; right: auto; bottom: 22px; left: 22px; }
      .team-header { margin-bottom: 28px; gap: 14px; }
      .team-title { font-size: clamp(30px, 8vw, 40px); line-height: 1.08; }

      .member-card--placeholder { min-height: 240px; padding: 40px 24px; }
      .placeholder-icon { font-size: 24px; margin-bottom: 18px; }
      .placeholder-text { font-size: 18px; }
      .placeholder-sub { font-size: 10px; }

      .member-social a {
        width: 40px; height: 40px;
      }
      .member-social svg { width: 16px; height: 16px; }
    }

    @media (max-width: 380px) {
      .member-body { padding: 24px 20px 26px; }
      .member-photo-wrap { width: 80px; height: 100px; }
      .member-name { font-size: 22px; }
    }
`;
