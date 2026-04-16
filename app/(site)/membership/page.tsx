import { Metadata } from 'next';
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { membershipCss } from './pageCss';
import FaqAccordion from '@/components/FaqAccordion';
import { REGISTER_URL } from '@/components/NavBar';

export const metadata: Metadata = {
  title: "Membership | The Meridian Society",
  description: "Membership puts you in the room. Register for free priority access to speaker events and social gatherings, and join a community built around curiosity and conversation.",
  alternates: { canonical: "https://meridiansociety.ca/membership" },
  openGraph: {
    title: "Membership | The Meridian Society",
    description: "Register for free priority access to speaker events and social gatherings. Join a community built around curiosity and conversation.",
    url: "https://meridiansociety.ca/membership",
    siteName: "The Meridian Society",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Membership | The Meridian Society",
    description: "Join the Society for priority access to events and a community built around curiosity.",
  },
};


export default function Page() { 
  return (
    <>
      <PageStyles css={membershipCss} />
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is membership free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Membership is completely free. There is no cost to join The Meridian Society."
                }
              },
              {
                "@type": "Question",
                "name": "Who can join?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Any motivated, curious student in the Ottawa area is welcome to register. You don't need to be from a specific school or program."
                }
              },
              {
                "@type": "Question",
                "name": "What happens after I register?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You'll receive event announcements and invitations as they go out. No spam, no commitments. You can also follow us on Instagram for updates."
                }
              },
              {
                "@type": "Question",
                "name": "Do I have to attend every event?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Register once, come to what interests you. There is no attendance requirement. Membership is yours to use how it suits you."
                }
              }
            ]
          }),
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
      <p className="hero-pre">Student Speaker Forum</p>
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

  <div className="marquee-wrap" aria-hidden="true">
    <div className="marquee-track" data-static="true">
      <span className="m-item">The Meridian Society</span><span className="m-gem">◆</span><span className="m-item">Ottawa</span><span className="m-gem">◆</span><span className="m-item">Est. 2025</span><span className="m-gem">◆</span><span className="m-item">Student-Run</span><span className="m-gem">◆</span><span className="m-item">Free Membership</span><span className="m-gem">◆</span><span className="m-item">Speaker Events</span><span className="m-gem">◆</span><span className="m-item">Social Gatherings</span><span className="m-gem">◆</span><span className="m-item">Ottawa Community</span><span className="m-gem">◆</span><span className="m-item">The Meridian Society</span><span className="m-gem">◆</span><span className="m-item">Ottawa</span><span className="m-gem">◆</span><span className="m-item">Est. 2025</span><span className="m-gem">◆</span><span className="m-item">Student-Run</span><span className="m-gem">◆</span><span className="m-item">Free Membership</span><span className="m-gem">◆</span><span className="m-item">Speaker Events</span><span className="m-gem">◆</span><span className="m-item">Social Gatherings</span><span className="m-gem">◆</span><span className="m-item">Ottawa Community</span><span className="m-gem">◆</span>
    </div>
  </div>

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
        <div className="sec-label rv">Common Questions</div>
        <h2 className="faq-title rv" data-d="1" id="faq-heading">Good to <em>Know.</em></h2>
      </div>
      <FaqAccordion />
    </div>
  </section>

  {/* ═══════════ REGISTER ═══════════ */}
  <section className="register" id="register" aria-labelledby="register-heading">
    <div className="register-ghost" aria-hidden="true">MERIDIAN</div>
    <div className="wrap">
      <div className="register-rule-top" aria-hidden="true"></div>
      <p className="register-eyebrow rv">Independent  ·  Student-Run  ·  Ottawa  ·  Est. 2025</p>
      <h2 className="register-title rv" data-d="1" id="register-heading">Become a <em>Member.</em></h2>
      <p className="register-body rv" data-d="2" style={{ marginBottom: '40px' }}>Membership puts you in the room. Register to stay informed, attend events, and become part of a community built around curiosity and conversation.</p>
      
      <div className="register-actions rv" data-d="3">
        <Link href={REGISTER_URL} className="register-btn">
          <span>Complete Registration</span>
        </Link>
      </div>

      <div className="register-rule-btm" aria-hidden="true"></div>
    </div>
  </section>

</main>
    </>
  ); 
}
