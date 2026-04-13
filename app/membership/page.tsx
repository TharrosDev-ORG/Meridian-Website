
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { membershipCss } from './pageCss';
import { REGISTER_URL } from '@/components/NavBar';

export default function Page() { 
  return (
    <>
      <PageStyles css={membershipCss} />
      <main id="main-content">

  {/* ═══════════ HERO ═══════════ */}
  <section className="page-hero" aria-label="Membership hero">
    <div className="page-hero-content">
      <div className="hero-eyebrow">
        <span className="hero-eyebrow-rule"></span>
        <span className="hero-eyebrow-text">The Meridian Society</span>
        <span className="hero-eyebrow-rule"></span>
      </div>
      <p className="hero-pre">Student Speaker Forum</p>
      <h1 className="hero-title">Membership.</h1>
      <p className="hero-sub">Built for students. Free to join, no commitment required.</p>
      <div className="hero-actions">
        <a href="#" target="_blank" rel="noopener noreferrer" className="register-btn" >
          <span>Register Now</span>
        </a>
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
        <h2 className="benefits-title rv" id="benefits-heading">What You <em>Get.</em></h2>
        <a href="#memberCountBox" className="benefits-register-link rv" data-d="1" id="benefitsRegisterCta">Register  &#8594;</a>
      </div>
      <div className="benefits-grid">

        <article className="benefit-card rv" data-d="1">
          <div className="benefit-num">01</div>
          <h3 className="benefit-heading">Speaker Events</h3>
          <p className="benefit-body">Be the first to know. Members receive all announcements, event schedules, and invitations to Meridian speaker events. Priority access means you're in the room when it matters.</p>
        </article>

        <article className="benefit-card rv" data-d="2">
          <div className="benefit-num">02</div>
          <h3 className="benefit-heading">Social Gatherings</h3>
          <p className="benefit-body">Beyond the stage. Members are invited to Meridian social events: bar nights, casual meetups, and community gatherings that happen between the formal programming.</p>
        </article>

        <article className="benefit-card rv" data-d="3">
          <div className="benefit-num">03</div>
          <h3 className="benefit-heading">Professional Exposure</h3>
          <p className="benefit-body">The people speaking at Meridian are professionals, alumni, and scholars from fields you may never have crossed otherwise. Membership puts their stories and perspectives directly in front of you.</p>
        </article>

        <article className="benefit-card rv" data-d="4">
          <div className="benefit-num">04</div>
          <h3 className="benefit-heading">A Real Community</h3>
          <p className="benefit-body">Meridian builds a circle over time. Members connect with people who share a genuine curiosity. Not a major, not a club, but a sensibility.</p>
        </article>

        <article className="benefit-card rv" data-d="5">
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
      <div className="faq-list rv" data-d="2">

        <details className="faq-item">
          <summary>Is membership free? <span className="faq-icon">+</span></summary>
          <div className="faq-body"><p className="faq-answer">Yes. Membership is completely free. There is no cost to join The Meridian Society.</p></div>
        </details>

        <details className="faq-item">
          <summary>Who can join? <span className="faq-icon">+</span></summary>
          <div className="faq-body"><p className="faq-answer">Any motivated, curious student in the Ottawa area is welcome to register. You don't need to be from a specific school or program.</p></div>
        </details>

        <details className="faq-item">
          <summary>What happens after I register? <span className="faq-icon">+</span></summary>
          <div className="faq-body"><p className="faq-answer">You'll receive event announcements and invitations as they go out. No spam, no commitments. You can also follow us on <a href="https://www.instagram.com/Meridian.Society" target="_blank" rel="noopener noreferrer">Instagram</a> for updates.</p></div>
        </details>

        <details className="faq-item">
          <summary>Do I have to attend every event? <span className="faq-icon">+</span></summary>
          <div className="faq-body"><p className="faq-answer">No. Register once, come to what interests you. There is no attendance requirement. Membership is yours to use how it suits you.</p></div>
        </details>

      </div>
    </div>
  </section>

  {/* ═══════════ REGISTER ═══════════ */}
  <section className="register" id="register" aria-labelledby="register-heading">
    <div className="register-ghost" aria-hidden="true">MERIDIAN</div>
    <div className="wrap">
      <div className="register-rule-top" aria-hidden="true"></div>
      <p className="register-eyebrow rv">Independent  ·  Student-Run  ·  Ottawa  ·  Est. 2025</p>
      <h2 className="register-title rv" data-d="1" id="register-heading">Become a<br/><em>Member.</em></h2>
      <div className="member-count-box rv" data-d="1" id="memberCountBox" aria-live="polite">
        <span className="member-count-num" id="memberCountNum">&mdash;</span>
        <span className="member-count-lbl">Members Registered</span>
      </div>
      <p className="register-body rv" data-d="2">Membership puts you in the room. Register to stay informed, attend events, and become part of a community built around curiosity and conversation.</p>
      <div className="register-actions rv" data-d="3">
        <a href="#" target="_blank" rel="noopener noreferrer" className="register-btn" >
          <span>Register for Updates</span>
        </a>
      </div>
      <div className="register-rule-btm" aria-hidden="true"></div>
    </div>
  </section>

</main>
    </>
  ); 
}
