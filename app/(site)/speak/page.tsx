import { Metadata } from 'next';
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { speakCss } from './pageCss';
import Marquee from '@/components/Marquee';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema } from '@/utils/jsonld';

export const metadata: Metadata = getMetadata({
  title: "Speak at The Meridian | Guest Speaker Opportunities",
  description: "Engage with a curated audience of motivated Ottawa students. We provide a platform for experts, founders, and scholars to share knowledge and inspire the next generation.",
  urlPath: "/speak",
  keywords: ['Guest Speaker Opportunities Ottawa', 'Student Mentorship', 'Thought Leadership Ottawa', 'University Guest Lectures']
});


export default function Page() { 
  return (
    <>
      <PageStyles css={speakCss} />
      {/* JSON-LD Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Speak", item: "/speak" },
          ])),
        }}
      />
      <main id="main-content">

  {/* ═══════════ HERO ═══════════ */}
  <section className="page-hero page-hero-asym" aria-label="Speak hero">
    <div className="page-hero-content">
      <div className="page-hero-asym-masthead" aria-hidden="true">
        <span className="page-hero-asym-masthead-counter">
          <span className="page-hero-asym-masthead-current">V</span>
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
        <p className="hero-pre rv">Speaker Applications</p>
        <h1 className="hero-title rv rv-stagger">
          <span className="rv-stagger-item">Make an<br aria-hidden="true" />Impact.</span>
        </h1>
        <div className="hero-hr rv" aria-hidden="true" data-d="1"></div>
        <p className="hero-sub rv" data-d="2">Motivated students. Genuine curiosity. A room built for real conversation.</p>
        <div className="hero-actions rv" data-d="3">
          <Link href="/apply" className="btn-primary"><span>Apply to Speak</span></Link>
          <a href="#why" className="btn-ghost-link">Learn More <span>&#8595;</span></a>
        </div>
      </div>
      <aside className="page-hero-right" aria-hidden="true">
        <div className="page-hero-asym-numeral">V</div>
        <div className="page-hero-asym-label rv" data-d="2">Open Applications</div>
        <p className="page-hero-asym-quote rv" data-d="3">Your experience becomes someone&apos;s turning point.</p>
      </aside>
    </div>
    <div className="page-hero-asym-scroll" aria-hidden="true">
      <span className="page-hero-asym-scroll-label">Scroll</span>
      <span className="page-hero-asym-scroll-line"></span>
    </div>
  </section>
  
  {/* ═══════════ NOMINATE ═══════════ */}
  <section className="speak-nominate-sec" aria-label="Nominate a speaker">
    <div className="wrap">
      <div className="nominate-card rv" data-d="4">
        <div className="nominate-content">
          <h2 className="nominate-h">Nominate a Speaker</h2>
          <p className="nominate-p">Great events start with a recommendation. If there&apos;s someone you&apos;d like to see at our next forum, help us bring them to the stage.</p>
        </div>
        <a href="mailto:meridiansocietycanada@gmail.com?subject=Speaker%20Nomination" className="btn-nominate">
          <span>Email Nomination</span>
        </a>
      </div>
    </div>
  </section>

  <Marquee />

  {/* ═══════════ WHY SPEAK ═══════════ */}
  <section className="speak-why-sec" id="why" aria-labelledby="why-heading">
    <div className="wrap">
      <div className="speak-why-header">
        <h2 className="speak-why-title rv" id="why-heading">Why Speak <em>With Us.</em></h2>
        <Link href="/apply" className="text-link rv" data-d="1">Apply Now  &#8594;</Link>
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
        <h2 className="speak-apply-title rv" id="apply-heading">Ready to Share?</h2>
        <p className="speak-apply-body rv" data-d="1">Join a community built on genuine curiosity. Tell us about your expertise and what you&apos;d like to discuss.</p>
        
        <div className="speak-apply-ctas rv" data-d="2">
          <Link href="/apply" className="btn-primary">
            <span>Open Application Form</span>
          </Link>
        </div>

        <div className="speak-apply-footer" style={{ marginTop: '56px', textAlign: 'center' }}>
          <p className="speak-apply-trust rv" data-d="3">We take every application seriously.</p>
          <a href="mailto:meridiansocietycanada@gmail.com" className="btn-ghost-link" style={{ justifyContent: 'center', marginTop: '20px' }}>or email us directly <span>&#8594;</span></a>
        </div>
      </div>
    </div>
  </section>

</main>
    </>
  ); 
}
