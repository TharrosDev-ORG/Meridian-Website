import { Metadata } from 'next';
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { membershipCss } from './pageCss';
import FaqAccordion from '@/components/FaqAccordion';
import { REGISTER_URL } from '@/components/NavBar';
import Marquee from '@/components/Marquee';
import RegisterSection from '@/components/sections/RegisterSection';
import { getMetadata } from '@/utils/metadata-shared';
import { generateFaqSchema, generateBreadcrumbSchema } from '@/utils/jsonld';
import { FAQ_ITEMS } from '@/constants/membership';


export const metadata: Metadata = getMetadata({
  title: "Membership",
  description: "Membership puts you in the room. Register for free priority access to speaker events and social gatherings, and join a community built around curiosity and conversation.",
  urlPath: "/membership"
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
  <section className="page-hero" aria-label="Membership hero">
    <div className="page-hero-content">
      <div className="hero-eyebrow rv">
        <span className="hero-eyebrow-rule"></span>
        <span className="hero-eyebrow-text">The Meridian Society</span>
        <span className="hero-eyebrow-rule"></span>
      </div>
      <p className="hero-pre rv">Student Speaker Forum</p>
      <h1 className="hero-title rv rv-stagger">
        <span className="rv-stagger-item">Membership.</span>
      </h1>
      <p className="hero-sub rv" data-d="2">Built for students. Free to join, no commitment required.</p>
      <div className="hero-actions rv" data-d="3">
        <Link href={REGISTER_URL} className="register-btn">
          <span>Register Now</span>
        </Link>
        <a href="#benefits" className="btn-ghost-link">Learn More <span>&#8595;</span></a>
      </div>
    </div>
  </section>

  <Marquee />

  {/* ═══════════ BENEFITS ═══════════ */}
  <section className="benefits-sec" id="benefits" aria-labelledby="benefits-heading">
    <div className="wrap">
      <div className="benefits-header">
        <h2 className="benefits-title rv rv-stagger" id="benefits-heading">
          <span className="rv-stagger-item">What You <em>Get.</em></span>
        </h2>
        <Link href={REGISTER_URL} className="benefits-register-link rv" data-d="1" id="benefitsRegisterCta">Register  &#8594;</Link>
      </div>
      <div className="benefits-grid">

        <article className="benefit-card rv" data-d="1" data-tilt>
          <div className="benefit-num">01</div>
          <h3 className="benefit-heading">Speaker Events</h3>
          <p className="benefit-body">Be the first to know. Members receive all announcements, event schedules, and invitations to Meridian speaker events. Priority access means you&apos;re in the room when it matters.</p>
        </article>

        <article className="benefit-card rv" data-d="2" data-tilt>
          <div className="benefit-num">02</div>
          <h3 className="benefit-heading">Social Gatherings</h3>
          <p className="benefit-body">Beyond the stage. Members are invited to Meridian social events: bar nights, casual meetups, and community gatherings that happen between the formal programming.</p>
        </article>

        <article className="benefit-card rv" data-d="3" data-tilt>
          <div className="benefit-num">03</div>
          <h3 className="benefit-heading">Professional Exposure</h3>
          <p className="benefit-body">The people speaking at Meridian are professionals, alumni, and scholars from fields you may never have crossed otherwise. Membership puts their stories and perspectives directly in front of you.</p>
        </article>

        <article className="benefit-card rv" data-d="4" data-tilt>
          <div className="benefit-num">04</div>
          <h3 className="benefit-heading">A Real Community</h3>
          <p className="benefit-body">Meridian builds a circle over time. Members connect with people who share a genuine curiosity. Not a major, not a club, but a sensibility.</p>
        </article>

        <article className="benefit-card rv" data-d="5" data-tilt>
          <div className="benefit-num">05</div>
          <h3 className="benefit-heading">Your Peers</h3>
          <p className="benefit-body">The people in the room are half the reason to show up. Meridian members are Ottawa students who take ideas seriously.</p>
        </article>

      </div>
    </div>
  </section>

  {/* ═══════════ FAQ ═══════════ */}
  <section className="faq-sec" id="faq" aria-labelledby="faq-heading">
    <div className="wrap">
      <div className="faq-header">
        <div className="sec-label">Common Questions</div>
        <h2 className="faq-title" id="faq-heading">Good to <em>Know.</em></h2>
      </div>
      <FaqAccordion />
    </div>
  </section>

  <RegisterSection />

</main>
    </>
  ); 
}
