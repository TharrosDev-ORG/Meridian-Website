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
  title: "Social Gatherings & Mixers",
  description: "Beyond the forum: we create authentic spaces for Ottawa students to connect. From relaxed coffee meetups to high-impact social mixers and fundraisers.",
  urlPath: "/social",
  keywords: ['Ottawa Student Socials', 'Student Networking Socials', 'Community Events Ottawa', 'Peer Networking', 'Student Mixers']
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
      <section className="page-hero" aria-label="Social events hero">
        <div className="page-hero-content">
          <div className="hero-eyebrow rv">
            <span className="hero-eyebrow-rule"></span>
            <span className="hero-eyebrow-text">The Meridian Society</span>
            <span className="hero-eyebrow-rule"></span>
          </div>
          <p className="hero-pre rv">Society</p>
          <h1 className="hero-title rv rv-stagger">
            <span className="rv-stagger-item">Social <em>Events.</em></span>
          </h1>
          <div className="hero-hr rv" aria-hidden="true" data-d="1"></div>
          <p className="hero-sub rv" data-d="2">A space for students to connect.</p>
          <div className="hero-actions rv" data-d="3">
            <Magnetic strength={0.25}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary"><span>Join the Community</span></a>
            </Magnetic>
            <a href="#details" className="btn-ghost-link">Learn More <span>&#8595;</span></a>
          </div>
        </div>
      </section>

      <Marquee />

      {/* SOCIAL ABOUT / INTRO */}
      <section className="social-about-sec" id="details">
        <div className="wrap">
          <div className="module-intro-grid">
            <div className="module-intro-left">
              <div className="sec-label rv">Society</div>
              <h2 className="social-h2 rv" data-d="1">Why We <em>Gather.</em></h2>
            </div>
            <div className="module-intro-right">
              <p className="module-intro-copy rv" data-d="2">
                The Meridian Society is more than a speaker series. It is a community of students who value dialogue, debate, and discovery. Our social gatherings are designed to facilitate these connections in a casual, high-impact environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GATHERING GRID */}
      <section className="gathering-sec">
        <div className="wrap">
          <div className="gathering-grid">
            <div className="gathering-card rv" data-d="1">
              <div className="gathering-type">Themed Gatherings</div>
              <h3 className="gathering-h3">Bar Nights &amp; Lounges</h3>
              <p className="gathering-p">High-impact social environments where students can socialize and expand there circles.</p>
            </div>

            <div className="gathering-card rv" data-d="2">
              <div className="gathering-type">Small Format</div>
              <h3 className="gathering-h3">Coffee &amp; Conversation</h3>
              <p className="gathering-p">Low-pressure meetups designed for smaller groups. Perfect for deeper dialogue and getting to know the community.</p>
            </div>

            <div className="gathering-card rv" data-d="3">
              <div className="gathering-type">Impact Driven</div>
              <h3 className="gathering-h3">Fundraisers &amp; Galas</h3>
              <p className="gathering-p">Specialized events dedicated to raising support for society missions while bringing the community together for a cause.</p>
            </div>

            <div className="gathering-card rv" data-d="4">
              <div className="gathering-type">Academic Plus</div>
              <h3 className="gathering-h3">Social Mixers</h3>
              <p className="gathering-p">Post-Speaker Forum gatherings where students and guest speakers can continue the conversation in a casual setting.</p>
            </div>
          </div>
        </div>
      </section>

      <SocialInstagramSection />

    </main>
  );
}
