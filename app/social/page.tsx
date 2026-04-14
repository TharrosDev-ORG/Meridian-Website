import { Metadata } from 'next';
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { socialCss } from './pageCss';
import { SOCIAL_EVENTS, SocialEvent } from '@/data/social';

export const metadata: Metadata = {
  title: "Socials | The Meridian Society",
  description: "Join us for coffee, gatherings, and community events in Ottawa. Explore the social side of The Meridian Society.",
};

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function parseDate(iso: string) {
  const p = iso.split('-');
  return new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
}

function fmtDate(iso: string) {
  const d = parseDate(iso);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export default function SocialPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming: SocialEvent[] = [];
  const past: SocialEvent[] = [];

  SOCIAL_EVENTS.forEach((ev) => {
    (parseDate(ev.date) >= today ? upcoming : past).push(ev);
  });

  upcoming.sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
  past.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

  return (
    <main id="main-content">
      <PageStyles css={socialCss} />

      {/* PAGE HERO */}
      <section className="page-hero" aria-label="Social events hero">
        <div className="page-hero-content">
          <div className="hero-eyebrow rv">
            <span className="hero-eyebrow-rule"></span>
            <span className="hero-eyebrow-text">The Meridian Society</span>
            <span className="hero-eyebrow-rule"></span>
          </div>
          <p className="hero-pre rv">Community</p>
          <h1 className="hero-title rv rv-stagger">
            <span className="rv-stagger-item">Social</span>
          </h1>
          <p className="hero-post rv" data-d="1">Events</p>
          <div className="hero-hr rv" aria-hidden="true" data-d="1"></div>
          <p className="hero-sub rv" data-d="2">Bar nights, fundraisers, and community gatherings. Follow <a href="https://www.instagram.com/Meridian.Society" target="_blank" rel="noopener noreferrer">@Meridian.Society</a> for announcements.</p>
          <div className="hero-actions rv" data-d="3">
            <Magnetic strength={0.25}>
              <a href="#events" className="btn-primary"><span>View Events</span></a>
            </Magnetic>
            <a href="https://www.instagram.com/Meridian.Society" target="_blank" rel="noopener noreferrer" className="btn-ghost-link">Follow for Updates <span>&#8594;</span></a>
          </div>
        </div>
      </section>

      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-track" data-static="true">
          <span className="m-item">The Meridian Society</span><span className="m-gem">◆</span><span className="m-item">Ottawa</span><span className="m-gem">◆</span><span className="m-item">Est. 2025</span><span className="m-gem">◆</span><span className="m-item">Student-Run</span><span className="m-gem">◆</span><span className="m-item">Carleton University</span><span className="m-gem">◆</span><span className="m-item">uOttawa</span><span className="m-gem">◆</span><span className="m-item">Algonquin College</span><span className="m-gem">◆</span><span className="m-item">The Meridian Society</span><span className="m-gem">◆</span><span className="m-item">Ottawa</span><span className="m-gem">◆</span><span className="m-item">Est. 2025</span><span className="m-gem">◆</span><span className="m-item">Student-Run</span><span className="m-gem">◆</span><span className="m-item">Carleton University</span><span className="m-gem">◆</span><span className="m-item">uOttawa</span><span className="m-gem">◆</span><span className="m-item">Algonquin College</span><span className="m-gem">◆</span>
        </div>
      </div>

      {/* UPCOMING EVENTS */}
      <section className="events-sec" id="events" aria-labelledby="social-heading">
        <div className="wrap">
          <div className="events-header">
            <h2 className="events-title rv rv-stagger" id="social-heading">
              <span className="rv-stagger-item">Upcoming</span>
              <span className="rv-stagger-item"><em>Social Events.</em></span>
            </h2>
            <Link href="/" className="text-link rv" data-d="1">Back to Home &#8594;</Link>
          </div>
          
          {upcoming.length > 0 ? (
            <div className="social-grid">
              {upcoming.map(ev => (
                <SocialCard key={ev.id} ev={ev} isPast={false} />
              ))}
            </div>
          ) : (
            <div className="event-empty-state">
              <div className="event-empty-icon" aria-hidden="true">◇</div>
              <p className="event-empty-title">Our first social events are being planned.</p>
              <p className="event-empty-body">We&rsquo;re building something worth showing up for. Follow us on Instagram to find out more.</p>
              <a href="https://www.instagram.com/Meridian.Society" target="_blank" rel="noopener noreferrer" className="event-empty-cta">
                Follow @Meridian.Society →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* PAST EVENTS */}
      {past.length > 0 && (
        <section className="events-sec social-past-sec" id="pastSection" aria-labelledby="past-heading">
          <div className="wrap">
            <div className="events-header">
              <h2 className="events-title rv rv-stagger" id="past-heading">
                <span className="rv-stagger-item">Past</span>
                <span className="rv-stagger-item"><em>Events.</em></span>
              </h2>
            </div>
            <div className="social-grid">
              {past.map(ev => (
                <SocialCard key={ev.id} ev={ev} isPast={true} />
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}

import Magnetic from '@/components/Magnetic';

function SocialCard({ ev, isPast }: { ev: SocialEvent, isPast: boolean }) {
  return (
    <div className={`event-card ${isPast ? 'event-card--past' : ''}`} data-tilt>
      <div className="event-main">
        <div className="event-status">
          <span className="event-dot" aria-hidden="true"></span>
          &nbsp;{ev.type === 'members' ? 'Members Only' : 'Public Event'}
        </div>
        <h3 className="event-title">{ev.title}</h3>
        <p className="event-desc" dangerouslySetInnerHTML={{ __html: ev.desc }} />
        {ev.tags && ev.tags.length > 0 && (
          <div className="event-tags" aria-label="Event tags">
            {ev.tags.map((t: string) => (
              <span key={t} className="event-tag">{t}</span>
            ))}
          </div>
        )}
        {!isPast && ev.ctaText && ev.ctaHref && (
          <div className="social-card-cta">
            <a href={ev.ctaHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <span>{ev.ctaText}</span>
            </a>
          </div>
        )}
      </div>
      <div className="event-meta" aria-label="Event details">
        <div className="event-meta-row">
          <div className="meta-lbl">When</div>
          <div className="meta-val" dangerouslySetInnerHTML={{ __html: fmtDate(ev.date) + (ev.time ? '<br />' + ev.time : '') }} />
        </div>
        <div className="event-meta-row">
          <div className="meta-lbl">Where</div>
          <div className="meta-val">{ev.where}</div>
        </div>
        {ev.cost && (
          <div className="event-meta-row">
            <div className="meta-lbl">Admission</div>
            <div className="meta-val">{ev.cost}</div>
          </div>
        )}
        {ev.capacity && (
          <div className="event-meta-row">
            <div className="meta-lbl">Capacity</div>
            <div className="meta-val">{ev.capacity}</div>
          </div>
        )}
      </div>
    </div>
  );
}
