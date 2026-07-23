import { Metadata } from 'next';
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { membershipCss } from './pageCss';
import FaqAccordion from '@/components/FaqAccordion';
import { REGISTER_URL } from '@/components/NavBar';
import Magnetic from '@/components/Magnetic';
import ScrambleText from '@/components/ScrambleText';
import Marquee from '@/components/Marquee';
import RegisterSection from '@/components/sections/RegisterSection';
import { getMetadata } from '@/utils/metadata-shared';
import { generateFaqSchema, generateBreadcrumbSchema } from '@/utils/jsonld';
import { CONTACT_MAILTO } from '@/utils/social';
import { FAQ_ITEMS } from '@/constants/membership';


export const metadata: Metadata = getMetadata({
  title: "Membership | Priority Access & Community",
  description: "Join The Meridian Society for priority access to our flagship speaker events, exclusive social mixers, and a digital ID for rapid venue check-in. Build your network in Ottawa.",
  urlPath: "/membership",
  keywords: ['Student Membership Ottawa', 'Vetted Student Community', 'Priority Event Access']
});



export default function Page() { 
  return (
    <>
      <PageStyles css={membershipCss} />
      {/* JSON-LD Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Membership", item: "/membership" },
          ])),
        }}
      />
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFaqSchema(FAQ_ITEMS)),
        }}
      />
      <main id="main-content">
  {/* ═══════════ HERO ═══════════ */}
  <section className="rec-hero" data-theme="dark" aria-label="Membership hero">
    <div className="grid-lines" aria-hidden="true"></div>
    <div className="rec-hero-inner">
      <div className="rec-hero-masthead rv" aria-hidden="true">
        <span className="mono-label is-gold">Folio · Membership</span>
        <span className="rule-fill"></span>
        <span className="mono-label">Vol. I · Ottawa</span>
      </div>
      <p className="hero-pre rv" data-d="1">Student Speaker Forum</p>
      <h1 className="rec-hero-title rv" data-d="1">
        <ScrambleText text="Membership." duration={800} delay={180} />
      </h1>
      <div className="rec-hero-meta rv" data-d="2" aria-hidden="true">
        <span className="mono-label">Open Enrollment</span>
        <span className="rec-meta-dot">/</span>
        <span className="mono-label">Free to Join</span>
        <span className="rec-meta-dot">/</span>
        <span className="mono-label">No Commitment</span>
      </div>
      <p className="rec-hero-sub rv" data-d="2">Built for students. Free to join, no commitment required.</p>
      <div className="rec-hero-actions rv" data-d="3">
        <Magnetic strength={0.2}>
          <Link href={REGISTER_URL} className="btn-primary"><span>Register Now</span></Link>
        </Magnetic>
        <a href="#benefits" className="btn-ghost-link">Learn More <span>&#8595;</span></a>
      </div>
    </div>
  </section>

  <Marquee />

  {/* ═══════════ BENEFITS — MEMBERSHIP DOSSIER ═══════════ */}
  <section className="dossier-sec" id="benefits" aria-labelledby="benefits-heading">
    <div className="wrap">
      <div className="folio-head rv">
        <span className="folio-index">[ 01 ]</span>
        <span className="folio-kicker">The Provisions</span>
        <span className="rule-fill"></span>
        <Link href={REGISTER_URL} className="mono-label folio-link" id="benefitsRegisterCta">Register  &#8594;</Link>
      </div>
      <div className="dossier-top">
        <h2 className="dossier-heading rv" id="benefits-heading">What You<br/><em>Get.</em></h2>
        <p className="dossier-intro rv" data-d="1">Five provisions of membership. Free, and open to any student who takes ideas seriously.</p>
      </div>
      <ol className="dossier">
        <li className="dossier-row rv">
          <span className="dossier-num">01</span>
          <div className="dossier-main">
            <h3 className="dossier-h">Speaker Events</h3>
            <p className="dossier-p">Be the first to know. Members receive all announcements, event schedules, and invitations to Meridian speaker events. Priority access means you&apos;re in the room when it matters.</p>
          </div>
        </li>
        <li className="dossier-row rv" data-d="1">
          <span className="dossier-num">02</span>
          <div className="dossier-main">
            <h3 className="dossier-h">Social Gatherings</h3>
            <p className="dossier-p">Beyond the stage. Members are invited to Meridian social events: bar nights, casual meetups, and community gatherings that happen between the formal programming.</p>
          </div>
        </li>
        <li className="dossier-row rv" data-d="2">
          <span className="dossier-num">03</span>
          <div className="dossier-main">
            <h3 className="dossier-h">Professional Exposure</h3>
            <p className="dossier-p">The people speaking at Meridian are professionals, alumni, and scholars from fields you may never have crossed otherwise. Membership puts their stories and perspectives directly in front of you.</p>
          </div>
        </li>
        <li className="dossier-row rv" data-d="3">
          <span className="dossier-num">04</span>
          <div className="dossier-main">
            <h3 className="dossier-h">A Real Community</h3>
            <p className="dossier-p">Meridian builds a circle over time. Members connect with people who share a genuine curiosity. Not a major, not a club, but a sensibility.</p>
          </div>
        </li>
        <li className="dossier-row rv" data-d="4">
          <span className="dossier-num">05</span>
          <div className="dossier-main">
            <h3 className="dossier-h">Your Peers</h3>
            <p className="dossier-p">The people in the room are half the reason to show up. Meridian members are Ottawa students who take ideas seriously.</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  {/* ═══════════ FAQ ═══════════ */}
  <section className="faq-sec" id="faq" aria-labelledby="faq-heading">
    <div className="wrap">
      <div className="folio-head rv">
        <span className="folio-index">[ 02 ]</span>
        <span className="folio-kicker">Common Questions</span>
        <span className="rule-fill"></span>
      </div>
      <h2 className="faq-title rv" id="faq-heading">Good to <em>Know.</em></h2>
      <FaqAccordion />
      <div className="faq-cta rv" data-d="1">
        <p className="sans-label">Still have questions?</p>
        <a href={CONTACT_MAILTO} className="btn-ghost-link">Email us your question &#8594;</a>
      </div>
    </div>
  </section>

  <RegisterSection />

</main>
    </>
  ); 
}
