import { Metadata } from 'next';
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { eventsCss } from './pageCss';
import Magnetic from '@/components/Magnetic';
import Marquee from '@/components/Marquee';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema } from '@/utils/jsonld';
import SocialInstagramSection from '@/components/sections/SocialInstagramSection';
import ScrollToTopOnMount from '@/components/ScrollToTopOnMount';

export const metadata: Metadata = getMetadata({
  title: "Speaker Forum Events",
  description: "Our signature Speaker Forum events bring world-class perspectives to Ottawa. View our upcoming schedule of dialogues, presentations, and networking mixers.",
  urlPath: "/events",
  keywords: ['Ottawa Speaker Forum', 'Student Intellectual Events', 'Campus Speaker Series', 'Professional Networking Ottawa']
});

export default function EventsPage() {
  return (
    <>
      <PageStyles css={eventsCss} />
      <ScrollToTopOnMount />
      {/* JSON-LD Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Events", item: "/events" },
          ])),
        }}
      />
      <main id="main-content">

        {/* ═══════════ HERO ═══════════ */}
        <section className="page-hero page-hero-asym" aria-label="Events hero">
          <div className="page-hero-content">
            <div className="page-hero-asym-masthead" aria-hidden="true">
              <span className="page-hero-asym-masthead-counter">
                <span className="page-hero-asym-masthead-current">II</span>
                <span className="page-hero-asym-masthead-total">/ VI</span>
              </span>
              <span className="page-hero-asym-masthead-rule"></span>
              <span className="page-hero-asym-masthead-volume">Vol. I &middot; MMXXV&ndash;MMXXVI &middot; Ottawa</span>
            </div>
            <div className="page-hero-left">
              <div className="hero-eyebrow rv">
                <span className="hero-eyebrow-rule"></span>
                <span className="hero-eyebrow-text">The Meridian Society</span>
                <span className="hero-eyebrow-rule"></span>
              </div>
              <p className="hero-pre rv">Society</p>
              <h1 className="hero-title rv rv-stagger">
                <span className="rv-stagger-item">Speaker<br aria-hidden="true" /><em>Events.</em></span>
              </h1>
              <div className="hero-hr rv" aria-hidden="true" data-d="1"></div>
              <p className="hero-sub rv" data-d="2">Connecting Ottawa students with the professionals, alumni, and scholars who can expand their mindset.</p>
              <div className="hero-actions rv" data-d="3">
                <Magnetic strength={0.25}>
                  <Link href="/calendar" className="btn-primary"><span>View Live Registry</span></Link>
                </Magnetic>
                <a href="#about" className="btn-ghost-link">Learn More <span>&#8595;</span></a>
              </div>
            </div>
            <aside className="page-hero-right" aria-hidden="true">
              <div className="page-hero-asym-numeral">II</div>
              <div className="page-hero-asym-label rv" data-d="2">The Program</div>
              <p className="page-hero-asym-quote rv" data-d="3">A room you&apos;ll want to be a part of.</p>
            </aside>
          </div>
          <div className="page-hero-asym-scroll" aria-hidden="true">
            <span className="page-hero-asym-scroll-label">Scroll</span>
            <span className="page-hero-asym-scroll-line"></span>
          </div>
        </section>

        <Marquee />

        {/* ═══════════ ABOUT THE FORUM ═══════════ */}
        <section className="events-sec" id="about" aria-labelledby="events-heading">
          <div className="wrap">
            <div className="module-intro-grid">
              <div className="module-intro-left">
                <div className="sec-label rv">The Program</div>
                <h2 className="events-copy-title rv" data-d="1">A room you&apos;ll want to be a part of.</h2>
              </div>
              <div className="module-intro-right">
                <p className="module-intro-copy rv" data-d="2">
                  The Speaker Forum is our flagship event, providing a platform for professionals and academics to share their experience with students.
                  <br /><br />
                  These are not just lectures. They are open dialogues designed to give students practical insight into their fields, along with exposure to ideas and networks not found in the classroom.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SIGNATURE SERIES ═══════════ */}
        <section className="sig-sec">
          <div className="wrap">
            <div className="module-card-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <article className="module-card rv" data-d="1">
                <div className="sig-num">01</div>
                <h3 className="sig-h">Dialogue Over Noise</h3>
                <p className="sig-p">Small, curated audiences ensure that every student has the chance to ask questions and engage directly with the speaker.</p>
              </article>
              <article className="module-card rv" data-d="2">
                <div className="sig-num">02</div>
                <h3 className="sig-h">Vetted Insight</h3>
                <p className="sig-p">Our speakers share honest perspectives, practical advice, and knowledge drawn from experience.</p>
              </article>
              <article className="module-card rv" data-d="3">
                <div className="sig-num">03</div>
                <h3 className="sig-h">Beyond the Classroom</h3>
                <p className="sig-p">Bridge the gap between theory and practice by exploring how ideas are applied in real-world contexts.</p>
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
                ['Format', 'followed by a Q&A'],
                ['Audience Size', '20-30 students'],
                ['Who Attends', 'Society Members'],
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

        <SocialInstagramSection />

      </main>
    </>
  );
}
