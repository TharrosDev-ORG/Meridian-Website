// Homepage-scoped CSS — "THE RECORD" brutalist-editorial system.
// Injected via <PageStyles css={indexCss} /> in app/(site)/page.tsx.
// Shared tokens, .folio-head, .mono-label, .rule, .grid-lines, .btn-* and the
// .rv reveal contract all live in app/globals.css.
export const indexCss = `
/* ══════════════ FOLIO 00 — MASTHEAD (HERO) ══════════════ */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 84px;
}

/* Atmospheric layers — subdued in the brutalist system; type leads. */
.hero-visual { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.hero-visual-static { position: absolute; inset: 0; transition: opacity 1.1s ease; }
.hero-visual-static.is-muted { opacity: 0.4; }
.hero-glow {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 20% 30%, rgba(184,147,42,0.14) 0%, transparent 60%),
    radial-gradient(ellipse 80% 60% at 90% 90%, rgba(0,0,0,0.5) 0%, transparent 55%);
}
.hero-ghost-mark {
  position: absolute; right: -2vw; bottom: -6vh;
  font-family: var(--serif); font-weight: 300; font-style: italic;
  font-size: clamp(320px, 46vw, 620px); line-height: 0.7;
  color: transparent; -webkit-text-stroke: 1px var(--cream-08);
  letter-spacing: -0.04em; user-select: none;
}
.hero-visual-webgl { position: absolute; inset: 0; opacity: 0; transition: opacity 1.4s ease; mix-blend-mode: screen; }
.hero-visual-webgl.is-ready { opacity: 0.6; }
.hero .grid-lines::before { opacity: 0.5; }

/* Content — flush-left editorial masthead, vertically centered. */
.hero-content {
  position: relative; z-index: 2;
  flex: 1 1 auto;
  display: flex; flex-direction: column; justify-content: center;
  width: 100%; max-width: 1440px; margin: 0 auto;
  padding: 40px 64px;
}
.hero-masthead {
  display: flex; align-items: center; gap: 18px;
  margin-bottom: clamp(28px, 6vh, 60px);
}
.hero-masthead .rule-fill { flex: 1; height: 1px; background: var(--cream-15); }

.hero-pre {
  font-family: var(--serif); font-style: italic; font-weight: 300;
  font-size: clamp(22px, 3vw, 40px); color: var(--cream-55);
  letter-spacing: 0.01em; margin: 0 0 6px 2px;
}
.hero-title {
  font-family: var(--serif); font-weight: 300;
  font-size: clamp(68px, 15vw, 240px); line-height: 0.82;
  letter-spacing: -0.02em; text-transform: uppercase;
  color: var(--cream); margin: 0;
}
.hero-title span { display: inline-block; }
.hero-meta {
  display: flex; flex-wrap: wrap; align-items: center; gap: 14px;
  margin: 30px 0 0 2px; padding-top: 22px;
  border-top: 1px solid var(--cream-15);
}
.hero-meta-dot { color: var(--gold); font-family: var(--mono); font-size: 11px; }
.hero-sub {
  font-family: var(--serif); font-style: italic; font-weight: 300;
  font-size: clamp(18px, 1.9vw, 24px); line-height: 1.7;
  color: var(--cream-75); max-width: 46ch; margin: 26px 0 0 2px;
}

.hero-actions { margin: 40px 0 0 2px; }
.hero-main-ctas { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.hero-ig-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 50px; height: 50px; border: 1px solid var(--cream-30);
  color: var(--cream); transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.hero-ig-btn svg { width: 20px; height: 20px; }
.hero-ig-btn:hover { background: var(--gold); border-color: var(--gold); color: var(--ink); }
.hero-actions .btn-ghost-link { color: var(--cream-55); }
.hero-actions .btn-ghost-link:hover { color: var(--cream); }

/* Ledger stats — pinned to the hero base, hairline-ruled columns. */
.hero-stats {
  position: relative; z-index: 2; flex: 0 0 auto;
  list-style: none;
  display: grid; grid-template-columns: repeat(4, 1fr);
  width: 100%; max-width: 1440px; margin: 0 auto;
  padding: 0; border-top: 1px solid var(--cream-15);
}
.hero-stats .stat {
  display: flex; flex-direction: column; gap: 6px;
  padding: 26px 30px; border-left: 1px solid var(--cream-15);
  min-height: 118px;
}
.hero-stats .stat:first-child { border-left: 0; }
.stat-idx { font-family: var(--mono); font-size: 11px; color: var(--gold); letter-spacing: 0.1em; }
.stat-val { font-family: var(--serif); font-size: clamp(26px, 2.4vw, 38px); font-weight: 300; color: var(--cream); line-height: 1; margin-top: auto; }
.stat-lbl { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--cream-55); }
/* ══════════════ FOLIO 01 — THE PREMISE (ABOUT) ══════════════ */
.about { padding: clamp(88px, 12vh, 150px) 0; background: var(--cream); }
.about-layout {
  display: grid; grid-template-columns: 1fr; gap: 48px;
}
.about-title {
  font-family: var(--serif); font-weight: 300;
  font-size: clamp(46px, 6vw, 92px); line-height: 0.94;
  letter-spacing: -0.015em; color: var(--ink); margin: 0 0 40px;
}
.about-title em { font-style: italic; color: var(--gold); }
.about-body {
  font-family: var(--serif); font-size: clamp(18px, 1.35vw, 21px);
  line-height: 1.85; color: var(--ink-75); margin: 0 0 24px; max-width: 60ch;
}
.pull-quote {
  margin: 40px 0 0; padding: 4px 0 4px 28px;
  border-left: 2px solid var(--gold);
}
.pull-quote p {
  font-family: var(--serif); font-style: italic; font-weight: 300;
  font-size: clamp(22px, 2.2vw, 30px); line-height: 1.45; color: var(--ink);
}

/* Live member counter — rolling-reel ledger entry. */
.about-counter-wrap { display: inline-flex; }
.count-box {
  display: flex; flex-direction: column; gap: 8px;
  padding: 22px 30px; border: 1px solid var(--ink-15);
}
.count-num-overflow { height: 52px; overflow: hidden; }
.count-num-reel { display: flex; flex-direction: column; transition: transform 0.9s cubic-bezier(0.7,0,0.2,1); }
.count-num-reel.is-rolling { transform: translateY(-52px); }
.count-num { font-family: var(--serif); font-weight: 300; font-size: 52px; line-height: 52px; height: 52px; color: var(--gold); }
.count-lbl { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-55); }

/* ══════════════ FOLIO 02 — WHO WE GATHER ══════════════ */
.who { padding: clamp(88px, 12vh, 150px) 0; }
.who-top { margin-bottom: 20px; }
.who-title {
  font-family: var(--serif); font-weight: 300;
  font-size: clamp(46px, 6vw, 92px); line-height: 0.92;
  letter-spacing: -0.015em; color: var(--cream); margin: 0 0 20px;
}
.who-title em { font-style: italic; color: var(--gold-lt); }
.who-intro-body {
  font-family: var(--serif); font-style: italic; font-weight: 300;
  font-size: clamp(18px, 1.7vw, 23px); color: var(--cream-55); max-width: 44ch; margin: 0;
}
.record-list { list-style: none; margin: 40px 0 0; padding: 0; border-top: 1px solid var(--cream-15); }
.record-row {
  display: grid; grid-template-columns: 1fr; gap: 10px;
  padding: 28px 4px; border-bottom: 1px solid var(--cream-15);
  transition: padding-left 0.35s cubic-bezier(0.16,1,0.3,1), background 0.35s;
}
.record-num { font-family: var(--mono); font-size: 13px; color: var(--gold); letter-spacing: 0.1em; }
.record-title { font-family: var(--serif); font-weight: 300; font-size: clamp(24px, 2.4vw, 34px); color: var(--cream); line-height: 1.1; }
.record-desc { font-family: var(--serif); font-size: 17px; line-height: 1.7; color: var(--cream-55); max-width: 60ch; }
/* ══════════════ FOLIO 03 — WHAT WE ARE NOT ══════════════ */
.not-sec { padding: clamp(88px, 12vh, 150px) 0; background: var(--ink-2); }
.not-layout { display: grid; grid-template-columns: 1fr; gap: 44px; }
.not-title {
  font-family: var(--serif); font-weight: 300;
  font-size: clamp(40px, 5vw, 78px); line-height: 0.98;
  letter-spacing: -0.01em; color: var(--cream); margin: 0 0 28px;
}
.not-title em { font-style: italic; color: var(--gold-lt); }
.not-body { font-family: var(--serif); font-size: clamp(17px, 1.3vw, 20px); line-height: 1.85; color: var(--cream-55); max-width: 52ch; }
.not-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--cream-15); }
.not-item {
  display: flex; align-items: baseline; gap: 18px;
  padding: 22px 4px; border-bottom: 1px solid var(--cream-15);
  font-family: var(--serif); font-style: italic; font-weight: 300;
  font-size: clamp(19px, 1.7vw, 24px); color: var(--cream-75);
  transition: padding-left 0.35s cubic-bezier(0.16,1,0.3,1), color 0.3s;
}
.not-item-mark { font-family: var(--mono); font-style: normal; font-size: 16px; color: var(--gold); }

/* ══════════════ FOLIO 04 — THE PROGRAMME (EVENTS) ══════════════ */
.events { padding: clamp(88px, 12vh, 150px) 0; background: var(--cream); }
.folio-link { color: var(--ink-55); text-decoration: none; transition: color 0.2s; }
.folio-link:hover { color: var(--gold); }
.events-title { font-family: var(--serif); font-weight: 300; font-size: clamp(52px, 8vw, 128px); line-height: 0.86; letter-spacing: -0.02em; color: var(--ink); margin: 0 0 44px; }
.events-title em { font-style: italic; color: var(--gold); }
.portal-grid { display: grid; grid-template-columns: 1fr; gap: 0; border-top: 1px solid var(--ink); }
.portal-card {
  position: relative; display: block; text-decoration: none; color: inherit;
  padding: 40px 34px 34px; border-bottom: 1px solid var(--ink);
  transition: background 0.3s, transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.portal-idx { position: absolute; top: 22px; right: 30px; font-family: var(--mono); font-size: 13px; color: var(--gold); }
.portal-eyebrow { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-55); margin-bottom: 20px; }
.portal-h3 { font-family: var(--serif); font-weight: 300; font-size: clamp(34px, 4vw, 64px); line-height: 0.94; color: var(--ink); margin: 0 0 18px; }
.portal-h3 em { font-style: italic; color: var(--gold); }
.portal-p { font-family: var(--serif); font-size: 18px; line-height: 1.7; color: var(--ink-75); max-width: 46ch; margin: 0 0 26px; }
.portal-cta { font-family: var(--mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink); display: inline-flex; gap: 8px; transition: gap 0.25s, color 0.2s; }
.portal-card:hover .portal-cta { gap: 16px; color: var(--gold); }

/* ══════════════ FOLIO 05 — APPLY TO SPEAK ══════════════ */
.speaking { padding: clamp(88px, 12vh, 150px) 0; }
.speaking-layout { display: grid; grid-template-columns: 1fr; gap: 52px; }
.speaking-title { font-family: var(--serif); font-weight: 300; font-size: clamp(40px, 5vw, 80px); line-height: 0.98; letter-spacing: -0.01em; color: var(--cream); margin: 0 0 26px; }
.speaking-title em { font-style: italic; color: var(--gold-lt); }
.speaking-body { font-family: var(--serif); font-size: clamp(17px, 1.3vw, 20px); line-height: 1.85; color: var(--cream-55); max-width: 52ch; margin: 0 0 34px; }
.speak-home-ctas { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
.speak-home-ctas .btn-ghost-link { color: var(--cream-55); }
.speak-home-ctas .btn-ghost-link:hover { color: var(--cream); }
.speaking-format-label { margin-bottom: 18px; padding-bottom: 16px; border-bottom: 1px solid var(--cream-15); }
.formats-list { list-style: none; margin: 0; padding: 0; }
.formats-item {
  display: flex; align-items: baseline; gap: 20px;
  padding: 18px 0; border-bottom: 1px solid var(--cream-15);
  transition: padding-left 0.3s cubic-bezier(0.16,1,0.3,1);
}
.formats-num { font-family: var(--mono); font-size: 12px; color: var(--gold); }
.formats-text { font-family: var(--serif); font-size: clamp(17px, 1.5vw, 21px); color: var(--cream-90); }
/* ══════════════ DESKTOP (≥1101px) — grid + hover ══════════════ */
@media (min-width: 1101px) {
  .hero-content { padding: 40px 72px; }
  .about-layout { grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 90px; align-items: start; }
  .about-left { position: sticky; top: 120px; }

  .who-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 60px; }
  .who-intro-body { padding-bottom: 8px; }
  .record-row { grid-template-columns: 80px minmax(220px, 320px) 1fr; gap: 44px; align-items: baseline; padding: 32px 4px; }
  .record-row:hover { padding-left: 20px; background: var(--cream-08); }
  .record-row:hover .record-num { color: var(--gold-lt); }

  .not-layout { grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .not-item:hover { padding-left: 16px; color: var(--cream); }

  .portal-grid { grid-template-columns: 1fr 1fr; }
  .portal-card:nth-child(2) { border-left: 1px solid var(--ink); }
  .portal-card { padding: 52px 40px 40px; }
  .portal-card:hover { background: var(--cream-mid); box-shadow: inset 5px 0 0 var(--gold); }

  .speaking-layout { grid-template-columns: 1.05fr 0.95fr; gap: 90px; align-items: start; }
  .speaking-right { position: sticky; top: 120px; }
  .formats-item:hover { padding-left: 14px; }
}

@media (min-width: 1600px) {
  .hero-content, .hero-stats { max-width: 1560px; }
}

/* ══════════════ MOBILE (≤1100px) ══════════════ */
@media (max-width: 1100px) {
  .folio-head { flex-wrap: wrap; row-gap: 10px; }
  .hero-ghost-mark { font-size: clamp(280px, 70vw, 460px); right: -8vw; }
}
@media (max-width: 700px) {
  .hero { min-height: auto; padding: 92px 0 0; }
  .hero-content { padding: 26px 22px 44px; }
  .hero-meta { gap: 8px; }
  .about, .who, .not-sec, .events, .speaking { padding: 66px 0; }

  .hero-stats { grid-template-columns: 1fr 1fr; border-top: 0; }
  .hero-stats .stat {
    border-left: 1px solid var(--cream-15); border-top: 1px solid var(--cream-15);
    padding: 18px 20px; min-height: 92px;
  }
  .hero-stats .stat:nth-child(odd) { border-left: 0; }

  .about-counter-wrap { display: flex; }
  .record-row { padding: 22px 2px; }
  .portal-card { padding: 32px 22px 28px; }
}
/* ══════════════ MOBILE STICKY JOIN CTA ══════════════ */
.sticky-join {
  display: none; position: fixed; bottom: 1.4rem; left: 50%; z-index: 99;
  padding: 0.85rem 2.6rem; transform: translateX(-50%) translateY(20px) scale(0.98);
  background: var(--ink); border: 1px solid var(--gold);
  color: var(--gold-lt); text-decoration: none;
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.16em; text-transform: uppercase;
  opacity: 0; pointer-events: none; transition: opacity 0.3s, transform 0.3s;
}
.sticky-join.visible { opacity: 1; pointer-events: all; transform: translateX(-50%) translateY(0) scale(1); }
.sticky-join:hover { background: var(--gold); color: var(--ink); }
@media (max-width: 1100px) { .sticky-join { display: block; } }
@media (min-width: 1101px) { .sticky-join { display: none !important; } }
/* ::APPEND:: */
`;
