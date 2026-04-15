import { Metadata } from 'next';
import PageStyles from '@/components/PageStyles';
import { eventsCss } from './pageCss';
import { REGISTER_URL } from '@/components/NavBar';

export const metadata: Metadata = {
  title: "Events | The Meridian Society",
  description: "View upcoming speaker events and student forums in Ottawa. Connect with professionals, alumni, and scholars.",
};

import Magnetic from '@/components/Magnetic';

export default function EventsPage() {
  return (
    <>
      <PageStyles css={eventsCss} />
      <main id="main-content">

        {/* ═══════════ HERO ═══════════ */}
        <section className="page-hero" aria-label="Events hero">
          <div className="page-hero-content">
            <div className="hero-eyebrow rv">
              <span className="hero-eyebrow-rule"></span>
              <span className="hero-eyebrow-text">The Meridian Society</span>
              <span className="hero-eyebrow-rule"></span>
            </div>
            <p className="hero-pre rv">Society</p>
            <h1 className="hero-title rv">
              Speaker <em>Events.</em>
            </h1>
            <div className="hero-hr rv" aria-hidden="true" data-d="1"></div>
            <p className="hero-sub rv" data-d="2">Connecting Ottawa students with the professionals, alumni, and scholars who can expand their mindset.</p>
            <div className="hero-actions rv" data-d="3">
              <Magnetic strength={0.25}>
                <a href={REGISTER_URL} className="btn-primary"><span>Register as a Member</span></a>
              </Magnetic>
              <a href="#about" className="btn-ghost-link">Learn More <span>&#8595;</span></a>
            </div>
          </div>
        </section>

        <div className="marquee-wrap" aria-hidden="true">
          <div className="marquee-track" data-static="true">
            <span className="m-item">The Meridian Society</span><span className="m-gem">◆</span><span className="m-item">Ottawa</span><span className="m-gem">◆</span><span className="m-item">Est. 2025</span><span className="m-gem">◆</span><span className="m-item">Student-Run</span><span className="m-gem">◆</span><span className="m-item">Carleton University</span><span className="m-gem">◆</span><span className="m-item">uOttawa</span><span className="m-gem">◆</span><span className="m-item">Algonquin College</span><span className="m-gem">◆</span><span className="m-item">The Meridian Society</span><span className="m-gem">◆</span><span className="m-item">Ottawa</span><span className="m-gem">◆</span><span className="m-item">Est. 2025</span><span className="m-gem">◆</span><span className="m-item">Student-Run</span><span className="m-gem">◆</span><span className="m-item">Carleton University</span><span className="m-gem">◆</span><span className="m-item">uOttawa</span><span className="m-gem">◆</span><span className="m-item">Algonquin College</span><span className="m-gem">◆</span>
          </div>
        </div>

        {/* ═══════════ ABOUT THE FORUM ═══════════ */}
        <section className="events-sec" id="about" aria-labelledby="events-heading">
          <div className="wrap">
            <div className="events-intro-grid">
              <div className="events-intro-left">
                <div className="sec-label rv">The Program</div>
                <h2 className="events-copy-title rv" data-d="1">A Room you&apos;ll want to be a part of.</h2>
              </div>
              <div className="events-intro-right">
                <p className="events-copy-body rv" data-d="2">
                  The Speaker Forum is our society&apos;s flagship event. Where we bring established professionals, academics, and alumni to share their lived experience and knowledge with a room of motivated students.
                  <br /><br />
                  These aren&apos;t just lectures. They are open dialogues designed to provide students with tangible orientation in their respective fields - exposure to ideas and networks that aren&apos;t found in a classroom.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SIGNATURE SERIES ═══════════ */}
        <section className="sig-sec">
          <div className="wrap">
            <div className="sig-grid">
              <article className="sig-card rv" data-d="1">
                <div className="sig-num">01</div>
                <h3 className="sig-h">Dialogue Over Noise</h3>
                <p className="sig-p">Small, curated audiences ensure that every student has the chance to ask questions and engage directly with the speaker.</p>
              </article>
              <article className="sig-card rv" data-d="2">
                <div className="sig-num">02</div>
                <h3 className="sig-h">Vetted Insight</h3>
                <p className="sig-p">Speakers are selected for their honesty and proven track records, offering practical advice and the hard-earned lessons they wish they had known starting out.</p>
              </article>
              <article className="sig-card rv" data-d="3">
                <div className="sig-num">03</div>
                <h3 className="sig-h">Beyond the Classroom</h3>
                <p className="sig-p">Step away from academic theory to explore the unwritten rules of your industry. This is where real-world strategy and practical execution take center stage.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ═══════════ EXPECTATIONS ═══════════ */}
        <section className="expect-sec">
          <div className="wrap">
            <div className="expect-header">
              <div className="sec-label rv">Expectations</div>
              <h2 className="expect-title rv" data-d="1">What to <em>Expect.</em></h2>
            </div>
            <div className="expect-grid rv" data-d="2" role="table">
              {[
                ['Length', '30-45 minute presentation'],
                ['Format', 'Presentation followed by open Q&A'],
                ['Audience Size', '20-30 students'],
                ['Who Attends', 'Registered Society members'],
                ['Location', 'Ottawa, Canada'],
                ['Fields', 'Policy, academia, entrepreneurship, law, business, politics, and beyond']
              ].map(([lbl, val]) => (
                <div key={lbl} className="expect-row" role="row">
                  <div className="expect-lbl" role="rowheader">{lbl}</div>
                  <div className="expect-val" role="cell">{val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ NOTIFY / INSTAGRAM ═══════════ */}
        <section className="notify-sec">
          <div className="wrap notify-inner">
            <h2 className="notify-title rv">Event Announcements<br />live on <em>Instagram.</em></h2>
            <p className="notify-sub rv" data-d="1">We announce all forum dates, speakers, and registration links exclusively through our social channels first.</p>
            <div className="notify-actions rv" data-d="2">
              <Magnetic strength={0.3}>
                <a href="https://www.instagram.com/Meridian.Society" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <span>Follow @Meridian.Society</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
