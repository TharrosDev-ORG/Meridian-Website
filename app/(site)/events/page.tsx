import { Metadata } from 'next';
import Link from 'next/link';
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
          <p className="hero-pre rv">Inaugural Program</p>
          <h1 className="hero-title rv rv-stagger">
            <span className="rv-stagger-item">The Speaker</span>
            <br />
            <span className="rv-stagger-item">Forum.</span>
          </h1>
          <div className="hero-hr rv" aria-hidden="true" data-d="1"></div>
          <p className="hero-sub rv" data-d="2">Connecting Ottawa students with the professionals, alumni, and scholars who can expand their world.</p>
          <div className="hero-actions rv" data-d="3">
            <Magnetic strength={0.25}>
              <a href={REGISTER_URL} className="btn-primary"><span>Register as a Member</span></a>
            </Magnetic>
            <a href="#about" className="btn-ghost-link">Explore the Program <span>&#8594;</span></a>
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
              <h2 className="events-copy-title rv" data-d="1">A Room with the<br /><em>Right People.</em></h2>
            </div>
            <div className="events-intro-right">
              <p className="events-copy-body rv" data-d="2">
                The Speaker Forum is Meridian&apos;s flagship event series. We bring in established professionals, academics, and alumni to share their lived experience with a room of vetted, motivated students.
                <br /><br />
                These aren&apos;t just lectures. They are open dialogues designed to provide students with tangible orientation in their respective fields—exposure to ideas and networks that aren&apos;t found in a classroom.
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
              <p className="sig-p">Our speakers are chosen for their willingness to share the unglamorous reality of their careers and the insights they wish they had as students.</p>
            </article>
            <article className="sig-card rv" data-d="3">
              <div className="sig-num">03</div>
              <h3 className="sig-h">Tangible Access</h3>
              <p className="sig-p">Every event is followed by an open networking session, bridging the gap between current students and the professional world.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ═══════════ EXPECTATIONS ═══════════ */}
      <section className="expect-sec">
        <div className="wrap">
          <div className="expect-header">
            <div className="sec-label rv">Expectations</div>
            <h2 className="expect-title rv" data-d="1">What to Expect<br /><em>At the Forum.</em></h2>
          </div>
          <div className="expect-grid rv" data-d="2" role="table">
            {[
              ['Length', '45 minute talk followed by 30 minute open Q&A'],
              ['Audience', '20–30 registered Meridian members'],
              ['Location', 'Curated spaces across Downtown Ottawa'],
              ['Admission', 'Free for registered members'],
              ['Waitlist', 'First-come, first-served via Instagram registration']
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
        <div className="notify-bg" aria-hidden="true"></div>
        <div className="wrap">
          <h2 className="notify-title rv">Event Announcements<br />live on <em>Instagram.</em></h2>
          <p className="notify-sub rv" data-d="1">We announce all forum dates, speakers, and registration links exclusively through our social channels first.</p>
          <div className="notify-actions rv" data-d="2">
            <Magnetic strength={0.3}>
              <a href="https://www.instagram.com/Meridian.Society" target="_blank" rel="noopener noreferrer" className="btn-gold">
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
