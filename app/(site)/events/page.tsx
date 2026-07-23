import { Metadata } from 'next';
import PageStyles from '@/components/PageStyles';
import { eventsCss } from './pageCss';
import Magnetic from '@/components/Magnetic';
import Marquee from '@/components/Marquee';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema } from '@/utils/jsonld';
import SocialInstagramSection from '@/components/sections/SocialInstagramSection';
import ScrollToTopOnMount from '@/components/ScrollToTopOnMount';
import EventsTabs from './EventsTabs';
import { INSTAGRAM_URL } from '@/utils/social';

export const metadata: Metadata = getMetadata({
  title: "Speaker Forum & Social Events",
  description: "Our signature Speaker Forum brings world-class perspectives to Ottawa, alongside relaxed social gatherings, mixers, and fundraisers that build community.",
  urlPath: "/events",
  keywords: ['Ottawa Speaker Forum', 'Student Intellectual Events', 'Campus Speaker Series', 'Professional Networking Ottawa', 'Ottawa Student Socials', 'Student Mixers']
});

export default function EventsPage() {
  return (
    <>
      <PageStyles css={eventsCss} />
      <ScrollToTopOnMount />
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
        <section className="rec-hero" data-theme="dark" aria-label="Events hero">
          <div className="grid-lines" aria-hidden="true"></div>
          <div className="rec-hero-inner">
            <div className="rec-hero-masthead rv" aria-hidden="true">
              <span className="mono-label is-gold">Folio &middot; Programs</span>
              <span className="rule-fill"></span>
              <span className="mono-label">I / II &middot; Vol. I</span>
            </div>
            <p className="hero-pre rv" data-d="1">Programs</p>
            <h1 className="rec-hero-title rv" data-d="1">What We <em>Host.</em></h1>
            <div className="rec-hero-meta rv" data-d="2" aria-hidden="true">
              <span className="mono-label">Speaker Forum</span>
              <span className="rec-meta-dot">/</span>
              <span className="mono-label">Social Gatherings</span>
              <span className="rec-meta-dot">/</span>
              <span className="mono-label">Ottawa · Est. 2025</span>
            </div>
            <p className="rec-hero-sub rv" data-d="2">Two programs, one Society. Speaker forums that broaden perspective and social gatherings that build community.</p>
            <div className="rec-hero-actions rv" data-d="3">
              <Magnetic strength={0.2}>
                <a href="#programs" className="btn-primary"><span>View Programs</span></a>
              </Magnetic>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-link">Live Updates on Instagram <span>&#8594;</span></a>
            </div>
          </div>
        </section>

        <Marquee />

        <EventsTabs />

        <SocialInstagramSection />

      </main>
    </>
  );
}
