import { Metadata } from 'next';
import Image from 'next/image';
import PageStyles from '@/components/PageStyles';
import { indexCss } from './pageCss';
import { REGISTER_URL } from '@/components/NavBar';
import Magnetic from '@/components/Magnetic';
import Link from 'next/link';
import RegisterSection from '@/components/sections/RegisterSection';
import { getMetadata } from '@/utils/metadata-shared';
import { INSTAGRAM_URL, CONTACT_EMAIL } from '@/utils/social';
import { INAUGURAL_EVENT_LABEL } from '@/utils/copy';
import { generatePersonSchema } from '@/utils/jsonld';
import { MemberCounter, Marquee, IndexInteractive } from './HomeClientSide';
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePersonSchema({
            name: "Magnus Abdelnour",
            jobTitle: "Founder & President",
            description: "Started The Meridian Society to bring journalists, founders, scholars, and accomplished professionals to the room to share knowledge with students.",
            image: "/assets/images/team/magnus.webp",
            sameAs: ["https://www.linkedin.com/in/magnus-a-9b5b50378"]
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePersonSchema({
            name: "Colin Sherwood",
            jobTitle: "Event Coordinator",
            description: "Dedicated student leader coordinating the logistics and execution of Meridian Society speaker forums.",
            image: "/assets/images/team/colin.webp",
            sameAs: ["https://www.instagram.com/colinsherwood34"]
          })),
        }}
      />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Link href={REGISTER_URL} className="sticky-join" id="stickyJoin">Register</Link>
      <section className="hero" id="main-content" data-theme="dark" aria-label="Hero">
  {/* Atmospheric layer: static gold glow + ghost mark, WebGL particles on eligible desktops */}
  <HeroVisual />

  <div className="hero-content">
    <div className="hero-eyebrow rv" aria-hidden="true">
      <span className="hero-eyebrow-rule"></span>
      <span className="hero-eyebrow-text" id="hero-speakable">An Independent Student Organization  ·  Ottawa  ·  Est. 2025</span>
      <span className="hero-eyebrow-rule"></span>
    </div>
    <p className="hero-pre rv">A Place for</p>
    <h1 className="hero-title rv rv-stagger" id="heroTitle">
      <span className="rv-stagger-item">DISCOURSE</span>
    </h1>
    <div className="hero-hr rv" aria-hidden="true" data-d="1"></div>
    <p className="hero-sub rv" data-d="2">Bringing students together with the professionals, alumni, and scholars who can expand their mindset.</p>
    <div className="hero-actions">
      <div className="hero-main-ctas rv" data-d="3">
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
      </div>
      <div className="hero-actions-divider rv" data-d="4"></div>
      <Link href="/events" className="btn-ghost-link rv" data-d="4">Explore Events  &#8594;</Link>
    </div>
  </div>

  {/* Stats bar — pinned to hero bottom by flex margin-top: auto */}
  <ul className="hero-stats rv" data-d="5" aria-label="Key facts">
    <li className="stat">
      <div className="stat-val">3</div>
      <div className="stat-lbl">Universities &amp; Colleges</div>
    </li>
    <li className="stat">
      <div className="stat-val">Ottawa</div>
      <div className="stat-lbl">Canada</div>
    </li>
    <li className="stat">
      <div className="stat-val">{INAUGURAL_EVENT_LABEL}</div>
      <div className="stat-lbl">Inaugural Event</div>
    </li>
    <li className="stat">
      <div className="stat-val">Est. 2025</div>
      <div className="stat-lbl">Independent Organization</div>
    </li>
  </ul>
</section>

{/* MARQUEE */}
<Marquee />

{/* ABOUT */}
<section className="about" id="about" aria-labelledby="about-heading">
  <div className="wrap about-layout">
    <div className="about-left rv">
      <span className="about-num" aria-hidden="true">01</span>
      <div className="about-section-label">About</div>
      <h2 className="about-title rv rv-stagger" id="about-heading">
        <span className="rv-stagger-item">Building a</span>
        <span className="rv-stagger-item"><em>Community.</em></span>
      </h2>
      <MemberCounter className="about-counter-wrap rv" />
    </div>
    <div className="about-right">
      <p className="about-body rv" id="about-speakable">The Meridian Society is an independent, student-run organization based in Ottawa. It was founded to connect motivated students with professionals who can broaden their perspective, while building a strong community of students and young professionals.</p>
      <p className="about-body rv" data-d="1">Through events, discussions, and gatherings, we aim to create a space where members can better navigate an increasingly complex and competitive world. It is entirely student-built, owned, and operated, without institutional affiliation.</p>
      <div className="pull-quote rv" data-d="2">
        <p>&quot;Shaped by the effort you put in, your input defines your outcome by building knowledge, connections, and opportunity.&quot;</p>
      </div>
      <a href="#team" className="text-link rv" data-d="3">Meet the Team  &#8595;</a>
    </div>
  </div>
</section>

{/* THE TEAM */}
<section className="team-home-sec" id="team" aria-labelledby="team-home-heading">
  <div className="wrap">
    <div className="team-home-header">
      <div className="sec-label rv">The Team</div>
      <div className="team-home-title-wrap">
        <h2 className="team-home-title rv rv-stagger" id="team-home-heading">
          <span className="rv-stagger-item">Leadership &amp;</span>
          <span className="rv-stagger-item"><em>Operations.</em></span>
        </h2>
        <div className="swipe-hint rv" data-d="2" aria-hidden="true">
          <span>Swipe to explore</span>
          <svg viewBox="0 0 24 24"><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/></svg>
        </div>
      </div>
      <p className="team-home-intro rv" data-d="1">The student team behind The Meridian Society. The team is growing.</p>
    </div>

    <div className="member-grid h-scroll">

      {/* Magnus */}
      <article className="member-card member-card--registry rv h-scroll-item" id="magnus" aria-labelledby="name-magnus" data-tilt>
        <div className="registry-header">
          <div className="registry-info">
            <div className="registry-field">
              <span className="field-label">NAME</span>
              <h3 className="member-name field-value" id="name-magnus">Magnus Abdelnour</h3>
            </div>
            <div className="registry-field">
              <span className="field-label">ROLE</span>
              <div className="member-role field-value">Founder &amp; President</div>
            </div>
          </div>
          <div className="member-photo-wrap">
            <Image
              src="/assets/images/team/magnus.webp"
              className="member-photo"
              alt="Magnus Abdelnour, Founder and President of The Meridian Society"
              sizes="(max-width: 768px) 80px, 120px"
              width={100}
              height={120}
            />
          </div>
        </div>
        <div className="member-body">
          <div className="registry-field">
            <span className="field-label">PROGRAM/SCHOOL</span>
            <p className="member-studies field-value">Bachelor&apos;s of Global and International Studies — European and Russian Studies, Carleton University</p>
          </div>
          <div className="registry-footer">
            <div className="member-social">
              <a href="https://www.linkedin.com/in/magnus-a-9b5b50378" target="_blank" rel="noopener noreferrer" aria-label="Magnus Abdelnour on LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Colin */}
      <article className="member-card member-card--registry rv h-scroll-item" id="colin" aria-labelledby="name-colin" data-tilt>
        <div className="registry-header">
          <div className="registry-info">
            <div className="registry-field">
              <span className="field-label">NAME</span>
              <h3 className="member-name field-value" id="name-colin">Colin Sherwood</h3>
            </div>
            <div className="registry-field">
              <span className="field-label">ROLE</span>
              <div className="member-role field-value">Event Coordinator</div>
            </div>
          </div>
          <div className="member-photo-wrap">
            <Image
              src="/assets/images/team/colin.webp"
              className="member-photo"
              alt="Colin Sherwood, Event Coordinator of The Meridian Society"
              sizes="(max-width: 768px) 80px, 120px"
              width={100}
              height={120}
            />
          </div>
        </div>
        <div className="member-body">
          <div className="registry-field">
            <span className="field-label">PROGRAM/SCHOOL</span>
            <p className="member-studies field-value">Bachelor&apos;s of Criminology and Criminal Justice — Concentration in Law, Minor in French, Carleton University</p>
          </div>
          <div className="registry-footer">
            <div className="member-social">
              <a href="https://www.instagram.com/colinsherwood34" target="_blank" rel="noopener noreferrer" aria-label="Colin Sherwood on Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Placeholder */}
      <div className="member-card member-card--placeholder rv h-scroll-item" aria-label="Future team member" data-tilt>
        <div className="placeholder-icon" aria-hidden="true">&#9671;</div>
        <p className="placeholder-text">The team is growing.</p>
        <p className="placeholder-sub">More to come</p>
      </div>

    </div>
  </div>
</section>

{/* WHO WE GATHER */}
<section className="who" id="who" data-theme="dark" aria-labelledby="who-heading">
  <div className="wrap">
    <div className="who-top">
      <div className="who-title-wrap">
        <h2 className="who-title rv rv-stagger" id="who-heading">
          <span className="rv-stagger-item">Who We</span>
          <span className="rv-stagger-item"><em>Gather.</em></span>
        </h2>
        <div className="swipe-hint rv" data-d="2" aria-hidden="true">
          <span>Swipe to explore</span>
          <svg viewBox="0 0 24 24"><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/></svg>
        </div>
      </div>
      <p className="who-intro-body rv" data-d="1">We bring together people at every stage, from students to seasoned professionals.</p>
    </div>
    <div className="who-grid h-scroll">
      <div className="who-item rv h-scroll-item" data-num="01" data-tilt>
        <div className="who-num">01</div>
        <div className="who-item-title">Students &amp; Alumni</div>
        <p className="who-item-desc">Motivated, individuals from Carleton University, uOttawa, and Algonquin College, and anyone drawn to the work we do.</p>
      </div>
      <div className="who-item rv h-scroll-item" data-d="1" data-num="02" data-tilt>
        <div className="who-num">02</div>
        <div className="who-item-title">Speakers &amp; Professionals</div>
        <p className="who-item-desc">People across law, business, policy, media, and beyond, with lived experience.</p>
      </div>
      <div className="who-item rv h-scroll-item" data-d="2" data-num="03" data-tilt>
        <div className="who-num">03</div>
        <div className="who-item-title">Scholars &amp; Thinkers</div>
        <p className="who-item-desc">Academics and researchers whose work challenges assumptions, opens new territory, and gives students something to think about.</p>
      </div>
    </div>
  </div>
</section>

{/* WHAT WE ARE NOT */}
<section className="not-sec" id="not" data-theme="dark" aria-labelledby="not-heading">
  <div className="wrap not-layout">
    <div className="not-left">
      <div className="sec-label rv">What We Are Not</div>
      <h2 className="not-title rv" data-d="1" id="not-heading">Intentionally<br/>Not for Everyone.</h2>
      <p className="not-body rv" data-d="2">We are not a resume workshop, a pitch competition, or a networking event. We have no political agenda or exclusive membership criteria, and we are fully student-run and independent. What we offer is simple: a room with the right people and the willingness to listen.</p>
    </div>
    <div className="not-right">
      <div className="not-list-header rv">Not</div>
      <ul className="not-list" aria-label="What the Society is not">
        <li className="rv">A resume workshop or career placement office</li>
        <li className="rv" data-d="1">A political advocacy or activism group</li>
        <li className="rv" data-d="2">A startup incubator or pitch competition</li>
        <li className="rv" data-d="3">A closed, elite, invitation-only circle</li>
      </ul>
    </div>
  </div>
</section>

{/* OUR EVENTS PORTAL */}
<section className="events" id="events" aria-labelledby="events-heading">
  <div className="wrap">
    <div className="events-header">
      <div className="events-title-wrap">
        <h2 className="events-title rv" id="events-heading">Our<br/><em>Events.</em></h2>
        <div className="swipe-hint rv" data-d="1" aria-hidden="true">
          <span>Swipe to explore</span>
          <svg viewBox="0 0 24 24"><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/></svg>
        </div>
      </div>
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-link rv" data-d="1">Instagram  &#8594;</a>
    </div>

    <div className="portal-grid h-scroll">
      <Link href="/events" className="portal-card rv h-scroll-item" data-d="1" data-tilt>
        <div className="portal-eyebrow">Signature Program</div>
        <h3 className="portal-h3">The Speaker<br/><em>Forum.</em></h3>
        <p className="portal-p">Established professionals and academics sharing lived experience with a motivated students.</p>
        <span className="portal-cta">View Program &#8594;</span>
      </Link>

      <Link href="/events#social" className="portal-card rv h-scroll-item" data-d="2" data-tilt>
        <div className="portal-eyebrow">Community</div>
        <h3 className="portal-h3">Social<br/><em>Events.</em></h3>
        <p className="portal-p">Events that build community, from quiet coffee meetups to high-energy nights out.</p>
        <span className="portal-cta">Explore Socials &#8594;</span>
      </Link>
    </div>
  </div>
</section>

{/* APPLY TO SPEAK */}
<section className="speaking" id="speak" data-theme="dark" aria-labelledby="speaking-heading">
  <div className="wrap speaking-layout">
    <div className="speaking-left">
      <div className="sec-label rv">Apply to Speak</div>
      <h2 className="speaking-title rv" data-d="1" id="speaking-heading">Have a Story<br/> or Idea Worth <em>Sharing?</em></h2>
      <p className="speaking-sub rv" data-d="2">We&apos;d love to hear from you.</p>
      <p className="speaking-body rv" data-d="2">Direct access to an engaged, vetted student audience. Professionals, founders, alumni, and scholars share lived experience with motivated Ottawa students in a room built for real conversation.</p>
      <div className="speak-home-ctas rv" data-d="3">
        <Magnetic strength={0.2}>
          <Link href="/apply" className="btn-primary"><span>Apply to Speak</span></Link>
        </Magnetic>
        <a href={`mailto:${CONTACT_EMAIL}?subject=Speaker%20Nomination`} className="btn-ghost-link">Nominate a Speaker  &#8594;</a>
      </div>
    </div>
    <div className="speaking-right">
      <div className="sec-label rv" style={{"marginBottom":"20px"}}>The Format</div>
      <ul className="formats-list" aria-label="Speaker forum format">
        <li className="formats-item rv"><span className="formats-num">01</span><span className="formats-text">30–45 minute presentation</span></li>
        <li className="formats-item rv" data-d="1"><span className="formats-num">02</span><span className="formats-text">Followed by an open Q&amp;A</span></li>
        <li className="formats-item rv" data-d="2"><span className="formats-num">03</span><span className="formats-text">Curated audience of 20–30 students</span></li>
        <li className="formats-item rv" data-d="3"><span className="formats-num">04</span><span className="formats-text">Policy, business, law, academia &amp; beyond</span></li>
        <li className="formats-item rv" data-d="4"><span className="formats-num">05</span><span className="formats-text">Ottawa, Canada</span></li>
      </ul>
    </div>
  </div>
</section>

<RegisterSection />

      <IndexInteractive />
    </main>
  ); 
}
