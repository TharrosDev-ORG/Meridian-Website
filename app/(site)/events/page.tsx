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
        <section className="page-hero page-hero-asym" aria-label="Events hero">
          <div className="page-hero-content">
            <div className="page-hero-asym-masthead" aria-hidden="true">
              <span className="page-hero-asym-masthead-counter">
                <span className="page-hero-asym-masthead-current">I</span>
                <span className="page-hero-asym-masthead-total">/ II</span>
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
              <p className="hero-pre rv">Programs</p>
              <h1 className="hero-title rv rv-stagger">
                <span className="rv-stagger-item">What We <em>Host.</em></span>
              </h1>
              <div className="hero-hr rv" aria-hidden="true" data-d="1"></div>
              <p className="hero-sub rv" data-d="2">Two programs, one Society. Speaker forums that broaden perspective and social gatherings that build community.</p>
              <div className="hero-actions rv" data-d="3">
                <Magnetic strength={0.25}>
                  <a href="#programs" className="btn-primary"><span>View Programs</span></a>
                </Magnetic>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-link">Live Updates on Instagram <span>&#8594;</span></a>
              </div>
            </div>
            <aside className="page-hero-right" aria-hidden="true">
              <div className="page-hero-asym-numeral">I</div>
              <div className="page-hero-asym-label rv" data-d="2">Two Programs</div>
              <p className="page-hero-asym-quote rv" data-d="3">A room you&apos;ll want to be a part of.</p>
            </aside>
          </div>
          <div className="page-hero-asym-scroll" aria-hidden="true">
            <span className="page-hero-asym-scroll-label">Scroll</span>
            <span className="page-hero-asym-scroll-line"></span>
          </div>
        </section>

        <Marquee />

        <EventsTabs />

        <SocialInstagramSection />

      </main>
    </>
  );
}
