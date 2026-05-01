import { Metadata } from 'next';
import PageStyles from '@/components/PageStyles';
import { indexCss } from './pageCss';
import { REGISTER_URL } from '@/components/NavBar';
import IndexInteractive from './IndexInteractive';
import Magnetic from '@/components/Magnetic';
import Link from 'next/link';
import Marquee from '@/components/Marquee';
import RegisterSection from '@/components/sections/RegisterSection';
import { getMetadata } from '@/utils/metadata-shared';
import { INSTAGRAM_URL } from '@/utils/social';
import { INAUGURAL_EVENT_LABEL } from '@/utils/copy';
import MemberCounter from '@/components/MemberCounter';

export const metadata: Metadata = getMetadata({
  title: "Ottawa Student Speaker Forum & Social Community",
  description: "The Meridian Society is Ottawa's premier student-run forum, connecting curious minds with industry professionals, scholars, and innovators through curated speaker events and authentic social gatherings.",
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
      <section className="hero" id="main-content" aria-label="Hero">
  {/* Ghost "M" letterform — parallax via JS */}
  <div className="hero-ghost" id="heroGhost" aria-hidden="true">M</div>

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
  <div className="hero-stats rv" data-d="5" role="list" aria-label="Key facts">
    <div className="stat" role="listitem">
      <div className="stat-val">3</div>
      <div className="stat-lbl">Universities &amp; Colleges</div>
    </div>
    <div className="stat" role="listitem">
      <div className="stat-val">Ottawa</div>
      <div className="stat-lbl">Canada</div>
    </div>
    <div className="stat" role="listitem">
      <div className="stat-val">{INAUGURAL_EVENT_LABEL}</div>
      <div className="stat-lbl">Inaugural Event</div>
    </div>
    <div className="stat" role="listitem">
      <div className="stat-val">Est. 2025</div>
      <div className="stat-lbl">Independent Organization</div>
    </div>
  </div>
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
      <p className="about-body rv" id="about-speakable">The Meridian Society is an independent, student-run organization based in ottawa. Founded with the goal of connecting motivated students with the professionals who can expand their mindset, and to build a community of students and young professionals in Ottawa.</p>
      <p className="about-body rv" data-d="1">Through events, open conversations, and gatherings of all kinds, we aim to build a place where members can orient themselves in an increasingly complex and competitive world. Not an extension of any institution. Something built, owned, and run entirely by students.</p>
      <div className="pull-quote rv" data-d="2">
        <p>&quot;Shaped by the effort you put in, your input defines your outcome by building knowledge, connections, and opportunity.&quot;</p>
      </div>
      <Link href="/team" className="text-link rv" data-d="3">The Team  &#8594;</Link>
    </div>
  </div>
</section>

{/* WHO WE GATHER */}
<section className="who" id="who" aria-labelledby="who-heading">
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
<section className="not-sec" id="not" aria-labelledby="not-heading">
  <div className="wrap not-layout">
    <div className="not-left">
      <div className="sec-label rv">What We Are Not</div>
      <h2 className="not-title rv" data-d="1" id="not-heading">Intentionally<br/>Not for Everyone.</h2>
      <p className="not-body rv" data-d="2">We are not a resume workshop, a pitch competition, or a networking event. We have no political agenda and no exclusive membership criteria. We are student-run and independent. What we offer is simple: a room with the right people, and the willingness to listen.</p>
    </div>
    <div className="not-right">
      <div className="not-list-header rv">Not</div>
      <ul className="not-list" aria-label="What the Society is not">
        <li className="rv">A resume workshop or career placement office</li>
        <li className="rv" data-d="1">A political advocacy or activism group</li>
        <li className="rv" data-d="2">A startup incubator or pitch competition</li>
        <li className="rv" data-d="3">A closed, elite, invitation-only circle</li>
        <li className="rv" data-d="4">A networking event with business cards</li>
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

      <Link href="/social" className="portal-card rv h-scroll-item" data-d="2" data-tilt>
        <div className="portal-eyebrow">Community</div>
        <h3 className="portal-h3">Social<br/><em>Events.</em></h3>
        <p className="portal-p">Events that build community, from quiet coffee meetups to high-energy nights out.</p>
        <span className="portal-cta">Explore Socials &#8594;</span>
      </Link>
    </div>
  </div>
</section>

{/* GET INVOLVED */}
<section className="speaking" id="speaking" aria-labelledby="speaking-heading">
  <div className="wrap speaking-layout">
    <div className="speaking-left">
      <div className="sec-label rv">Get Involved</div>
      <h2 className="speaking-title rv" data-d="1" id="speaking-heading">Have a Story<br/> or Idea Worth <em>Sharing?</em></h2>
      <p className="speaking-sub rv" data-d="2">We’d love to hear from you.</p>
      <p className="speaking-body rv" data-d="2">Whether you want to speak, collaborate, or simply get involved, The Meridian Society is always looking to grow its community and team.</p>
      <Link href="/speak" className="text-link rv" data-d="3">Speak at The Meridian  &#8594;</Link>
    </div>
    <div className="speaking-right">
      <div className="sec-label rv" style={{"marginBottom":"20px"}}>What We Host</div>
      <ul className="formats-list" aria-label="Event formats we host">
        <li className="formats-item rv"><span className="formats-num">01</span><span className="formats-text">Formal presentations &amp; keynotes</span></li>
        <li className="formats-item rv" data-d="1"><span className="formats-num">02</span><span className="formats-text">Open conversations &amp; Q&amp;A</span></li>
        <li className="formats-item rv" data-d="2"><span className="formats-num">03</span><span className="formats-text">Career pathway talks</span></li>
        <li className="formats-item rv" data-d="3"><span className="formats-num">04</span><span className="formats-text">Panel discussions</span></li>
        <li className="formats-item rv" data-d="4"><span className="formats-num">05</span><span className="formats-text">Social gatherings &amp; community events</span></li>
      </ul>
    </div>
  </div>
</section>

<RegisterSection />

      <IndexInteractive />
    </main>
  ); 
}
