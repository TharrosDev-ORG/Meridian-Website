import { Metadata } from 'next';
import PageStyles from '@/components/PageStyles';
import { speakCss } from './pageCss';
import Link from 'next/link';
import { SPEAK_URL } from '@/components/NavBar';

export const metadata: Metadata = {
  title: "Speak | The Meridian Society",
  description: "Apply to speak at The Meridian Society in Ottawa. Share your experience with a motivated student audience and join our growing forum.",
};


export default function Page() { 
  return (
    <>
      <PageStyles css={speakCss} />
      <main id="main-content">

  {/* ═══════════ HERO ═══════════ */}
  <section className="page-hero" aria-label="Speak hero">
    <div className="page-hero-content">
      <div className="hero-eyebrow rv">
        <span className="hero-eyebrow-rule"></span>
        <span className="hero-eyebrow-text">The Meridian Society</span>
        <span className="hero-eyebrow-rule"></span>
      </div>
      <p className="hero-pre">Speaker Applications</p>
      <h1 className="hero-title">Make an Impact.</h1>
      <div className="hero-hr rv" aria-hidden="true" data-d="1"></div>
      <p className="hero-sub rv" data-d="2">Motivated students. Genuine curiosity. A room built for real conversation.</p>
      <div className="hero-actions rv" data-d="3">
        <a href={SPEAK_URL} className="btn-primary" target="_blank" rel="noopener noreferrer"><span>Apply to Speak</span></a>
        <a href="#why" className="btn-ghost-link">Learn More <span>&#8595;</span></a>
      </div>
    </div>
  </section>

  <div className="marquee-wrap" aria-hidden="true">
    <div className="marquee-track" data-static="true">
      <span className="m-item">The Meridian Society</span><span className="m-gem">◆</span><span className="m-item">Ottawa</span><span className="m-gem">◆</span><span className="m-item">Est. 2025</span><span className="m-gem">◆</span><span className="m-item">Student-Run</span><span className="m-gem">◆</span><span className="m-item">Carleton University</span><span className="m-gem">◆</span><span className="m-item">uOttawa</span><span className="m-gem">◆</span><span className="m-item">Algonquin College</span><span className="m-gem">◆</span><span className="m-item">The Meridian Society</span><span className="m-gem">◆</span><span className="m-item">Ottawa</span><span className="m-gem">◆</span><span className="m-item">Est. 2025</span><span className="m-gem">◆</span><span className="m-item">Student-Run</span><span className="m-gem">◆</span><span className="m-item">Carleton University</span><span className="m-gem">◆</span><span className="m-item">uOttawa</span><span className="m-gem">◆</span><span className="m-item">Algonquin College</span><span className="m-gem">◆</span>
    </div>
  </div>

  {/* ═══════════ WHY SPEAK ═══════════ */}
  <section className="speak-why-sec" id="why" aria-labelledby="why-heading">
    <div className="wrap">
      <div className="speak-why-header">
        <h2 className="speak-why-title rv" id="why-heading">Why Speak <em>With Us.</em></h2>
        <a href="#apply" className="text-link rv" data-d="1">Apply Now  &#8594;</a>
      </div>
      <div className="speak-why-grid">

        <article className="speak-why-card rv" data-d="1">
          <div className="speak-why-num">01</div>
          <h3 className="speak-why-heading">A Platform Worth Having</h3>
          <p className="speak-why-body">Direct access to an engaged, vetted student audience. No noise, no passive scrolling. People who showed up to listen.</p>
        </article>

        <article className="speak-why-card rv" data-d="2">
          <div className="speak-why-num">02</div>
          <h3 className="speak-why-heading">Give Back, Tangibly</h3>
          <p className="speak-why-body">Your experience becomes someone&apos;s turning point. The students in that room are early in their careers. Your insight lands differently here.</p>
        </article>

        <article className="speak-why-card rv" data-d="3">
          <div className="speak-why-num">03</div>
          <h3 className="speak-why-heading">Join a Growing Forum</h3>
          <p className="speak-why-body">Meridian is building something. Speakers at the inaugural events become part of the founding story of an Ottawa institution.</p>
        </article>

      </div>
    </div>
  </section>

  {/* ═══════════ FORMAT ═══════════ */}
  <section className="speak-format-sec" id="format" aria-labelledby="format-heading">
    <div className="wrap">
      <div className="speak-format-header">
        <h2 className="speak-format-title rv" id="format-heading">What to <em>Expect.</em></h2>
        <Link href="/events" className="text-link rv" data-d="1">View Events  &#8594;</Link>
      </div>
      <div className="speak-meta rv" data-d="2" role="table" aria-label="Speaker format details">
        <div className="speak-meta-row" role="row">
          <div className="speak-meta-lbl" role="rowheader">Length</div>
          <div className="speak-meta-val" role="cell">30–45 minute presentation</div>
        </div>
        <div className="speak-meta-row" role="row">
          <div className="speak-meta-lbl" role="rowheader">Format</div>
          <div className="speak-meta-val" role="cell">Presentation followed by open Q&amp;A</div>
        </div>
        <div className="speak-meta-row" role="row">
          <div className="speak-meta-lbl" role="rowheader">Audience Size</div>
          <div className="speak-meta-val" role="cell">20–30 students</div>
        </div>
        <div className="speak-meta-row" role="row">
          <div className="speak-meta-lbl" role="rowheader">Who Attends</div>
          <div className="speak-meta-val" role="cell">Registered Society members</div>
        </div>
        <div className="speak-meta-row" role="row">
          <div className="speak-meta-lbl" role="rowheader">Location</div>
          <div className="speak-meta-val" role="cell">Ottawa, Canada</div>
        </div>
        <div className="speak-meta-row" role="row">
          <div className="speak-meta-lbl" role="rowheader">Fields</div>
          <div className="speak-meta-val" role="cell">Policy, academia, entrepreneurship, law, business, politics, and beyond</div>
        </div>
        <div className="speak-meta-row" role="row">
          <div className="speak-meta-lbl" role="rowheader">Compensation</div>
          <div className="speak-meta-val" role="cell">Volunteer</div>
        </div>
      </div>
    </div>
  </section>

  {/* ═══════════ APPLY ═══════════ */}
  <section className="speak-apply-sec" id="apply" aria-labelledby="apply-heading">
    <div className="wrap">
      <div className="speak-apply-inner">
        <h2 className="speak-apply-title rv" id="apply-heading">Ready to Speak?</h2>
        <p className="speak-apply-body rv" data-d="1">Tell us about yourself and what you&apos;d like to discuss. We&apos;ll be in touch.</p>
        <div className="speak-apply-ctas rv" data-d="2">
          <a href={SPEAK_URL} className="btn-primary" data-speak target="_blank" rel="noopener noreferrer"><span>Apply to Speak</span></a>
          <a href="mailto:meridiansocietycanada@gmail.com" className="btn-ghost-link">or email us <span>&#8594;</span></a>
        </div>
        <p className="speak-apply-trust rv" data-d="3">We take every application seriously.</p>
        <p className="noscript-speak-note" style={{"display":"none","fontSize":"0.85em","marginTop":"1rem"}}>
          <a href={SPEAK_URL} target="_blank" rel="noopener noreferrer">Apply directly</a>
        </p>
      </div>
    </div>
  </section>

</main>
    </>
  ); 
}
