import { Metadata } from 'next';
import PageStyles from '@/components/PageStyles';
import { socialCss } from './pageCss';
import Magnetic from '@/components/Magnetic';
import Marquee from '@/components/Marquee';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema } from '@/utils/jsonld';
import { INSTAGRAM_URL } from '@/utils/social';
import SocialInstagramSection from '@/components/sections/SocialInstagramSection';

export const metadata: Metadata = getMetadata({
  title: "Social Gatherings",
  description: "The social side of the Society. From coffee meetups to social nights, we create relaxed, authentic spaces for Ottawa students to meet like-minded peers.",
  urlPath: "/social",
  keywords: ['Ottawa Student Socials', 'Student Networking Socials', 'Community Events Ottawa', 'Peer Networking']
});

export default function SocialPage() {
  return (
    <main id="main-content">
      <PageStyles css={socialCss} />
      {/* JSON-LD Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Socials", item: "/social" },
          ])),
        }}
      />

      {/* PAGE HERO */}
      <section className="module-page-hero" aria-label="Social events hero">
        <div className="module-page-hero-content">
          <div className="hero-eyebrow rv">
            <span className="hero-eyebrow-rule"></span>
            <span className="hero-eyebrow-text">The Meridian Society</span>
            <span className="hero-eyebrow-rule"></span>
          </div>
          <p className="hero-pre rv">Society</p>
          <h1 className="hero-title rv">
            Social <em>Events.</em>
          </h1>
          <div className="hero-hr rv" aria-hidden="true" data-d="1"></div>
          <p className="hero-sub rv" data-d="2">A space for students to connect.</p>
          <div className="hero-actions rv" data-d="3">
            <Magnetic strength={0.25}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary"><span>Join the Community</span></a>
            </Magnetic>
            <a href="#vibe" className="btn-ghost-link">Learn More <span>&#8595;</span></a>
          </div>
        </div>
      </section>

      <Marquee />

      {/* SOCIAL ABOUT / INTRO */}
      <section className="social-about-sec" id="vibe">
        <div className="wrap">
          <div className="module-intro-grid">
            <div className="module-intro-left">
              <div className="sec-label rv">Culture</div>
              <h2 className="social-h2 rv" data-d="1">Our Social Culture.</h2>
            </div>
            <div className="module-intro-right">
              <p className="module-intro-copy rv" data-d="2">
                The Society isn&apos;t just about formal talks; it&apos;s about the conversations that happen afterward. Our social events are designed to create opportunities for students to meet peers who share their drive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIBE GRID */}
      <section className="vibe-sec">
        <div className="wrap">
          <div className="module-card-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <article className="module-card rv" data-d="1">
              <div className="vibe-type">Themed Gatherings</div>
              <h3 className="vibe-h3">Bar Nights &amp; Lounges</h3>
              <p className="vibe-p">High-impact social environments where students can socialize and expand there circles.</p>
            </article>

            <article className="module-card rv" data-d="2">
              <div className="vibe-type">Small Format</div>
              <h3 className="vibe-h3">Coffee &amp; Conversation</h3>
              <p className="vibe-p">Low-pressure meetups designed for smaller groups. Perfect for deeper dialogue and getting to know the community.</p>
            </article>

            <article className="module-card rv" data-d="3">
              <div className="vibe-type">Impact Driven</div>
              <h3 className="vibe-h3">Fundraisers &amp; Galas</h3>
              <p className="vibe-p">Specialized events dedicated to raising support for society missions while bringing the community together for a cause.</p>
            </article>

            <article className="module-card rv" data-d="4">
              <div className="vibe-type">Academic Plus</div>
              <h3 className="vibe-h3">Social Mixers</h3>
              <p className="vibe-p">Post-Speaker Forum gatherings where students and guest speakers can continue the conversation in a casual setting.</p>
            </article>
          </div>
        </div>
      </section>

      <SocialInstagramSection />

    </main>
  );
}
