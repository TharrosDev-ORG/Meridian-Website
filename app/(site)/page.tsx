import { Metadata } from 'next';
import PageStyles from '@/components/PageStyles';
import { indexCss } from './pageCss';
import { REGISTER_URL } from '@/components/NavBar';
import Magnetic from '@/components/Magnetic';
import Link from 'next/link';
import RegisterSection from '@/components/sections/RegisterSection';
import { getMetadata } from '@/utils/metadata-shared';
import { INSTAGRAM_URL, CONTACT_EMAIL } from '@/utils/social';
import { INAUGURAL_EVENT_LABEL } from '@/utils/copy';
import { MemberCounter, Marquee, IndexInteractive } from './HomeClientSide';
import ScrambleText from '@/components/ScrambleText';
import HeroVisual from '@/components/three/HeroVisual';

export const metadata: Metadata = getMetadata({
  title: "Ottawa Student Speaker Forum & Social Community",
  description: "The Meridian Society is an independent, student-run organization based in Ottawa, connecting motivated students with professionals to broaden perspectives and build a strong community.",
  urlPath: "/",
  keywords: ['Ottawa Student Leadership', 'Speaker Series Ottawa', 'Professional Development Students']
});

export default function Home() {
  return (
    <main>
      <PageStyles css={indexCss} />
      {/* Organization JSON-LD lives in app/layout.tsx so it ships site-wide. */}
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Link href={REGISTER_URL} className="sticky-join" id="stickyJoin">Register</Link>

      {/* ══ FOLIO 00 — MASTHEAD ══ */}
      <section className="hero" id="main-content" data-theme="dark" aria-label="Hero">
        {/* Atmospheric layer: subdued grid/glow + optional WebGL field */}
        <HeroVisual />
        <div className="grid-lines" aria-hidden="true"></div>

        <div className="hero-content">
          <div className="hero-masthead rv" aria-hidden="true">
            <span className="mono-label is-gold">Folio 00</span>
            <span className="rule-fill"></span>
            <span className="mono-label">The Record</span>
          </div>

          <p className="hero-pre rv" data-d="1">A Place for</p>
          <h1 className="hero-title rv" id="heroTitle">
            <ScrambleText text="DISCOURSE" duration={900} delay={220} />
          </h1>

          <div className="hero-meta rv" data-d="2" id="hero-speakable" aria-hidden="true">
            <span className="mono-label">Ottawa · Canada</span>
            <span className="hero-meta-dot">/</span>
            <span className="mono-label">45.42°N 75.69°W</span>
            <span className="hero-meta-dot">/</span>
            <span className="mono-label">Est. 2025 · Independent</span>
          </div>

          <p className="hero-sub rv" data-d="3">Bringing students together with the professionals, alumni, and scholars who can expand their mindset.</p>

          <div className="hero-actions rv" data-d="4">
            <div className="hero-main-ctas">
              <Magnetic strength={0.2}>
                <Link href={REGISTER_URL} className="btn-primary" data-register>
                  <span>Register for Updates</span>
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href={INSTAGRAM_URL} className="hero-ig-btn"
                   aria-label="The Meridian Society on Instagram" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
                  </svg>
                </a>
              </Magnetic>
              <Link href="/events" className="btn-ghost-link">Explore Events  &#8594;</Link>
            </div>
          </div>
        </div>

        {/* Ledger stats — pinned to hero base */}
        <ul className="hero-stats rv" data-d="5" aria-label="Key facts">
          <li className="stat"><span className="stat-idx">01</span><span className="stat-val">3</span><span className="stat-lbl">Universities &amp; Colleges</span></li>
          <li className="stat"><span className="stat-idx">02</span><span className="stat-val">Ottawa</span><span className="stat-lbl">Canada</span></li>
          <li className="stat"><span className="stat-idx">03</span><span className="stat-val">{INAUGURAL_EVENT_LABEL}</span><span className="stat-lbl">Inaugural Event</span></li>
          <li className="stat"><span className="stat-idx">04</span><span className="stat-val">2025</span><span className="stat-lbl">Independent Org.</span></li>
        </ul>
      </section>

      <Marquee />

      {/* ══ FOLIO 01 — THE PREMISE ══ */}
      <section className="about" id="about" aria-labelledby="about-heading">
        <div className="wrap">
          <div className="folio-head rv">
            <span className="folio-index">[ 01 ]</span>
            <span className="folio-kicker">The Premise</span>
            <span className="rule-fill"></span>
            <span className="mono-label">Building a Community</span>
          </div>
          <div className="about-layout">
            <div className="about-left">
              <h2 className="about-title rv" id="about-heading">Building a<br/><em>Community.</em></h2>
              <MemberCounter className="about-counter-wrap rv" />
            </div>
            <div className="about-right">
              <p className="about-body rv">The Meridian Society is an independent, student-run organization based in Ottawa. It was founded to connect motivated students with professionals who can broaden their perspective, while building a strong community of students and young professionals.</p>
              <p className="about-body rv" data-d="1">Through events, discussions, and gatherings, we aim to create a space where members can better navigate an increasingly complex and competitive world. It is entirely student-built, owned, and operated, without institutional affiliation.</p>
              <blockquote className="pull-quote rv" data-d="2">
                <p>Shaped by the effort you put in, your input defines your outcome by building knowledge, connections, and opportunity.</p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOLIO 02 — WHO WE GATHER ══ */}
      <section className="who" id="who" data-theme="dark" aria-labelledby="who-heading">
        <div className="wrap">
          <div className="folio-head rv">
            <span className="folio-index">[ 02 ]</span>
            <span className="folio-kicker">Who We Gather</span>
            <span className="rule-fill"></span>
            <span className="mono-label">Three Registers</span>
          </div>
          <div className="who-top">
            <h2 className="who-title rv" id="who-heading">Who We<br/><em>Gather.</em></h2>
            <p className="who-intro-body rv" data-d="1">We bring together people at every stage, from students to seasoned professionals.</p>
          </div>
          <ol className="record-list">
            <li className="record-row rv">
              <span className="record-num">01</span>
              <span className="record-title">Students &amp; Alumni</span>
              <span className="record-desc">Motivated individuals from Carleton University, uOttawa, and Algonquin College, and anyone drawn to the work we do.</span>
            </li>
            <li className="record-row rv" data-d="1">
              <span className="record-num">02</span>
              <span className="record-title">Speakers &amp; Professionals</span>
              <span className="record-desc">People across law, business, policy, media, and beyond, with lived experience.</span>
            </li>
            <li className="record-row rv" data-d="2">
              <span className="record-num">03</span>
              <span className="record-title">Scholars &amp; Thinkers</span>
              <span className="record-desc">Academics and researchers whose work challenges assumptions, opens new territory, and gives students something to think about.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* ══ FOLIO 03 — WHAT WE ARE NOT ══ */}
      <section className="not-sec" id="not" data-theme="dark" aria-labelledby="not-heading">
        <div className="wrap">
          <div className="folio-head rv">
            <span className="folio-index">[ 03 ]</span>
            <span className="folio-kicker">A Negative Space</span>
            <span className="rule-fill"></span>
            <span className="mono-label">What We Are Not</span>
          </div>
          <div className="not-layout">
            <div className="not-left">
              <h2 className="not-title rv" id="not-heading">Intentionally<br/>Not for <em>Everyone.</em></h2>
              <p className="not-body rv" data-d="1">We are not a resume workshop, a pitch competition, or a networking event. We have no political agenda or exclusive membership criteria, and we are fully student-run and independent. What we offer is simple: a room with the right people and the willingness to listen.</p>
            </div>
            <ul className="not-list" aria-label="What the Society is not">
              <li className="not-item rv"><span className="not-item-mark">×</span><span>A resume workshop or career placement office</span></li>
              <li className="not-item rv" data-d="1"><span className="not-item-mark">×</span><span>A political advocacy or activism group</span></li>
              <li className="not-item rv" data-d="2"><span className="not-item-mark">×</span><span>A startup incubator or pitch competition</span></li>
              <li className="not-item rv" data-d="3"><span className="not-item-mark">×</span><span>A closed, elite, invitation-only circle</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ══ FOLIO 04 — THE PROGRAMME ══ */}
      <section className="events" id="events" aria-labelledby="events-heading">
        <div className="wrap">
          <div className="folio-head rv">
            <span className="folio-index">[ 04 ]</span>
            <span className="folio-kicker">The Programme</span>
            <span className="rule-fill"></span>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="mono-label folio-link">Instagram  &#8594;</a>
          </div>
          <h2 className="events-title rv" id="events-heading">Our<br/><em>Events.</em></h2>
          <div className="portal-grid">
            <Link href="/events" className="portal-card rv" data-d="1">
              <span className="portal-idx">01</span>
              <div className="portal-eyebrow">Signature Program</div>
              <h3 className="portal-h3">The Speaker <em>Forum.</em></h3>
              <p className="portal-p">Established professionals and academics sharing lived experience with motivated students.</p>
              <span className="portal-cta">View Program &#8594;</span>
            </Link>
            <Link href="/events#social" className="portal-card rv" data-d="2">
              <span className="portal-idx">02</span>
              <div className="portal-eyebrow">Community</div>
              <h3 className="portal-h3">Social <em>Events.</em></h3>
              <p className="portal-p">Events that build community, from quiet coffee meetups to high-energy nights out.</p>
              <span className="portal-cta">Explore Socials &#8594;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FOLIO 05 — APPLY TO SPEAK ══ */}
      <section className="speaking" id="speak" data-theme="dark" aria-labelledby="speaking-heading">
        <div className="wrap">
          <div className="folio-head rv">
            <span className="folio-index">[ 05 ]</span>
            <span className="folio-kicker">Take the Floor</span>
            <span className="rule-fill"></span>
            <span className="mono-label">Apply to Speak</span>
          </div>
          <div className="speaking-layout">
            <div className="speaking-left">
              <h2 className="speaking-title rv" id="speaking-heading">Have a Story or Idea Worth <em>Sharing?</em></h2>
              <p className="speaking-body rv" data-d="1">Direct access to an engaged, vetted student audience. Professionals, founders, alumni, and scholars share lived experience with motivated Ottawa students in a room built for real conversation.</p>
              <div className="speak-home-ctas rv" data-d="2">
                <Magnetic strength={0.2}>
                  <Link href="/apply" className="btn-primary"><span>Apply to Speak</span></Link>
                </Magnetic>
                <a href={`mailto:${CONTACT_EMAIL}?subject=Speaker%20Nomination`} className="btn-ghost-link">Nominate a Speaker  &#8594;</a>
              </div>
            </div>
            <div className="speaking-right">
              <div className="mono-label speaking-format-label">The Format</div>
              <ol className="formats-list" aria-label="Speaker forum format">
                <li className="formats-item rv"><span className="formats-num">01</span><span className="formats-text">30–45 minute presentation</span></li>
                <li className="formats-item rv" data-d="1"><span className="formats-num">02</span><span className="formats-text">Followed by an open Q&amp;A</span></li>
                <li className="formats-item rv" data-d="2"><span className="formats-num">03</span><span className="formats-text">Curated audience of 20–30 students</span></li>
                <li className="formats-item rv" data-d="3"><span className="formats-num">04</span><span className="formats-text">Policy, business, law, academia &amp; beyond</span></li>
                <li className="formats-item rv" data-d="4"><span className="formats-num">05</span><span className="formats-text">Ottawa, Canada</span></li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <RegisterSection />

      <IndexInteractive />
    </main>
  );
}
