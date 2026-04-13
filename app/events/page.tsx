import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { eventsCss } from './pageCss';
import { REGISTER_URL } from '@/components/NavBar';
import { EVENTS } from '@/data/events';

export default function EventsPage() {
  const currentEvent = EVENTS.find(e => e.isCurrent);

  return (
    <main id="main-content">
      <PageStyles css={eventsCss} />

      <section className="page-hero" aria-label="Events hero">
        <div className="page-hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-rule"></span>
            <span className="hero-eyebrow-text">The Meridian Society</span>
            <span className="hero-eyebrow-rule"></span>
          </div>
          <p className="hero-pre">Student Speaker Forum</p>
          <h1 className="hero-title">Events.</h1>
          <div className="hero-hr" aria-hidden="true"></div>
          <p className="hero-sub">Follow <a href="https://www.instagram.com/Meridian.Society" target="_blank" rel="noopener noreferrer">@Meridian.Society</a> for announcements and event details.</p>
          <div className="hero-actions">
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn-primary"><span>Register as a Member</span></a>
            <a href="#events" className="btn-ghost-link">View Events <span>&#8594;</span></a>
          </div>
        </div>
      </section>

      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-track" data-static="true">
          <span className="m-item">The Meridian Society</span><span className="m-gem">◆</span><span className="m-item">Ottawa</span><span className="m-gem">◆</span><span className="m-item">Est. 2025</span><span className="m-gem">◆</span><span className="m-item">Student-Run</span><span className="m-gem">◆</span><span className="m-item">Carleton University</span><span className="m-gem">◆</span><span className="m-item">uOttawa</span><span className="m-gem">◆</span><span className="m-item">Algonquin College</span><span className="m-gem">◆</span><span className="m-item">The Meridian Society</span><span className="m-gem">◆</span><span className="m-item">Ottawa</span><span className="m-gem">◆</span><span className="m-item">Est. 2025</span><span className="m-gem">◆</span><span className="m-item">Student-Run</span><span className="m-gem">◆</span><span className="m-item">Carleton University</span><span className="m-gem">◆</span><span className="m-item">uOttawa</span><span className="m-gem">◆</span><span className="m-item">Algonquin College</span><span className="m-gem">◆</span>
        </div>
      </div>

      <section className="events-sec" id="events" aria-labelledby="events-heading">
        <div className="wrap">
          <div className="events-header">
            <h2 className="events-title rv" id="events-heading">Upcoming<br/><em>Events.</em></h2>
            <Link href="/" className="text-link rv" data-d="1">Back to Home &#8594;</Link>
          </div>
          
          {currentEvent ? (
            <div className="event-card rv">
              <div className="event-main">
                <div className="event-status">
                  <span className="event-dot" aria-hidden="true"></span> {currentEvent.status}
                </div>
                <h3 className="event-title" dangerouslySetInnerHTML={{ __html: currentEvent.title }} />
                <p className="event-desc" dangerouslySetInnerHTML={{ __html: currentEvent.desc }} />
                <div className="event-tags" aria-label="Event tags">
                  {currentEvent.tags.map(tag => (
                    <span key={tag} className="event-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="event-meta" aria-label="Event details">
                {[
                  ['When', currentEvent.when],
                  ['Where', currentEvent.where],
                  ['Format', currentEvent.format],
                  ['Entry', currentEvent.entry]
                ].map(([label, val]) => (
                  <div key={label} className="event-meta-row">
                    <div className="meta-lbl">{label}</div>
                    <div className="meta-val" dangerouslySetInnerHTML={{ __html: val }} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="event-empty-state rv">
              <div className="event-empty-icon" aria-hidden="true">◇</div>
              <p className="event-empty-title">Our first event is coming.</p>
              <p className="event-empty-body">Details will be announced on Instagram first. Follow us to be the first to know.</p>
              <a href="https://www.instagram.com/Meridian.Society" target="_blank" rel="noopener noreferrer" className="event-empty-cta">
                Follow @Meridian.Society →
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
