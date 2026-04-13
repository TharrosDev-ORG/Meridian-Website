import { Metadata } from 'next';
import Image from 'next/image';
import PageStyles from '@/components/PageStyles';
import { teamCss } from './pageCss';

export const metadata: Metadata = {
  title: "Team | The Meridian Society",
  description: "Meet the student team behind The Meridian Society. Leadership and operations and the vision for an Ottawa campus institution.",
};


export default function Page() { 
  return (
    <>
      <PageStyles css={teamCss} />
      <main id="main-content">

  {/* PAGE HERO */}
  <section className="page-hero" aria-label="Team hero">
    <div className="page-hero-content">
      <div className="hero-eyebrow">
        <span className="hero-eyebrow-rule"></span>
        <span className="hero-eyebrow-text">The Meridian Society</span>
        <span className="hero-eyebrow-rule"></span>
      </div>
      <p className="hero-pre rv">Student Speaker Forum</p>
      <h1 className="hero-title rv rv-stagger">
        <span className="rv-stagger-item">The Team.</span>
      </h1>
      <div className="hero-hr" aria-hidden="true"></div>
      <p className="hero-sub">The student team behind the Meridian Society.</p>
      <div className="hero-actions">
        <a href="#team" className="btn-ghost-link">Meet the Team <span>&#8594;</span></a>
      </div>
    </div>
  </section>

  <div className="marquee-wrap" aria-hidden="true">
    <div className="marquee-track" data-static="true">
      <span className="m-item">The Meridian Society</span><span className="m-gem">◆</span><span className="m-item">Ottawa</span><span className="m-gem">◆</span><span className="m-item">Est. 2025</span><span className="m-gem">◆</span><span className="m-item">Student-Run</span><span className="m-gem">◆</span><span className="m-item">Carleton University</span><span className="m-gem">◆</span><span className="m-item">uOttawa</span><span className="m-gem">◆</span><span className="m-item">Algonquin College</span><span className="m-gem">◆</span><span className="m-item">The Meridian Society</span><span className="m-gem">◆</span><span className="m-item">Ottawa</span><span className="m-gem">◆</span><span className="m-item">Est. 2025</span><span className="m-gem">◆</span><span className="m-item">Student-Run</span><span className="m-gem">◆</span><span className="m-item">Carleton University</span><span className="m-gem">◆</span><span className="m-item">uOttawa</span><span className="m-gem">◆</span><span className="m-item">Algonquin College</span><span className="m-gem">◆</span>
    </div>
  </div>

  {/* ═══════════ TEAM SECTION ═══════════ */}
  <section className="team-sec" id="team" aria-labelledby="team-heading">
    <div className="wrap">
      <div className="team-header">
        <h2 className="team-title rv rv-stagger" id="team-heading">
          <span className="rv-stagger-item">Leadership &amp;</span>
          <span className="rv-stagger-item">Operations.</span>
        </h2>
        <a href="/events" className="text-link rv" data-d="1">View Events  &#8594;</a>
      </div>

      <div className="member-grid">

        {/* Magnus */}
        <article className="member-card rv" id="magnus" aria-labelledby="name-magnus" data-tilt>
          <div className="member-body">
            <div className="member-header">
              <div className="member-photo-wrap">
                <Image
                  src="/assets/images/team/magnus.webp"
                  className="member-photo"
                  alt="Magnus Abdelnour, Founder and President of The Meridian Society"
                  priority
                  width={96}
                  height={120}
                />
              </div>
              <div>
                <h3 className="member-name" id="name-magnus">Magnus Abdelnour</h3>
                <div className="member-role">Founder &amp; President</div>
              </div>
            </div>
            <p className="member-studies">Bachelor&apos;s of Global and International Studies — European and Russian Studies, Carleton University</p>
            <p className="member-bio">Started The Meridian Society because the journalists, founders, scholars, and accomplished professionals worth learning from rarely just show up — someone has to bring them to the room.</p>
            <div className="member-social">
              <a href="https://www.linkedin.com/in/magnus-a-9b5b50378" target="_blank" rel="noopener noreferrer" aria-label="Magnus Abdelnour on LinkedIn">
                {/* LinkedIn icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </article>

        {/* Colin */}
        <article className="member-card rv" id="colin" aria-labelledby="name-colin" data-tilt>
          <div className="member-body">
            <div className="member-header">
              <div className="member-photo-wrap">
                <Image
                  src="/assets/images/team/colin.webp"
                  className="member-photo"
                  alt="Colin Sherwood, Event Coordinator of The Meridian Society"
                  width={96}
                  height={120}
                />
              </div>
              <div>
                <h3 className="member-name" id="name-colin">Colin Sherwood</h3>
                <div className="member-role">Event Coordinator</div>
              </div>
            </div>
            <p className="member-studies">Bachelor&apos;s of Criminology and Criminal Justice — Concentration in Law, Minor in French, Carleton University</p>
            <p className="member-bio">Behind every event is someone who made it possible. Colin does that work quietly, carefully, and well.</p>
            <div className="member-social">
              <a href="https://www.instagram.com/colinsherwood34" target="_blank" rel="noopener noreferrer" aria-label="Colin Sherwood on Instagram">
                {/* Instagram icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </article>

        {/* Placeholder — third slot */}
        <div className="member-card member-card--placeholder rv" aria-label="Future team member" data-tilt>
          <div className="placeholder-icon" aria-hidden="true">◇</div>
          <p className="placeholder-text">The team is growing.</p>
          <p className="placeholder-sub">More to come</p>
        </div>

      </div>
    </div>
  </section>

</main>
    </>
  ); 
}
