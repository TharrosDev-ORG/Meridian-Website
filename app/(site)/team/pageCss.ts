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
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s;
    }
    .member-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 24px rgba(24,21,15,0.06), 0 16px 60px rgba(24,21,15,0.10);
    }

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

    .member-body { padding: 28px 28px 32px; display: flex; flex-direction: column; flex: 1; }
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
      background: transparent;
      transition: background 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    }
    .member-social a:hover {
      background: var(--ink); color: var(--cream);
      border-color: var(--ink);
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(24,21,15,0.12);
    }
    .member-social svg { width: 15px; height: 15px; }

    /* Placeholder card */
    .member-card--placeholder {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center; min-height: 320px; border-style: dashed;
      background: transparent; box-shadow: none;
    }
    .member-card--placeholder:hover { transform: none; box-shadow: none; border-color: var(--ink-30); }
    .placeholder-icon { font-size: 22px; color: var(--gold); opacity: 0.25; margin-bottom: 20px; line-height: 1; }
    .placeholder-text { font-family: var(--serif); font-size: 20px; font-style: italic; font-weight: 300; color: var(--ink-55); line-height: 1.4; }
    .placeholder-sub { font-family: var(--sans); font-size: 9px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); opacity: 0.50; margin-top: 12px; }



    /* ── Responsive ── */
    @media (max-width: 1100px) {
      .rv { transform: none; transition: opacity 0.4s ease; }
      .rv[data-d="1"], .rv[data-d="2"], .rv[data-d="3"] { transition-delay: 0s; }
    }
`;
