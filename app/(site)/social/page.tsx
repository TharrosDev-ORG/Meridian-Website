import { Metadata } from 'next';
import PageStyles from '@/components/PageStyles';
import { socialCss } from './pageCss';
import Magnetic from '@/components/Magnetic';
import Marquee from '@/components/Marquee';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema } from '@/utils/jsonld';
import { INSTAGRAM_URL } from '@/utils/social';

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
      <section className="page-hero" aria-label="Social events hero">
        <div className="page-hero-content">
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
          <p className="hero-sub rv" data-d="2">From quiet coffee meetups to high-energy social nights.<br />A space for students to connect.</p>
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
          <div className="social-intro-grid">
            <div className="social-intro-left">
              <div className="sec-label rv">Culture</div>
              <h2 className="social-h2 rv" data-d="1">Our Social Culture.</h2>
            </div>
            <div className="social-intro-right">
              <p className="social-p rv" data-d="2">
                The Society isn&apos;t just about formal talks; it&apos;s about the conversations that happen afterward. Our social events are designed to create a relaxed, authentic space for students to meet peers who share their drive.
                <br /><br />
                We believe that the best connections happen when the agenda is loose and the curiosity is high. Whether it&apos;s a themed bar night or a quiet weekend gathering, the focus is always on genuine interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIBE GRID */}
      <section className="vibe-sec">
        <div className="wrap">
          <div className="vibe-grid">
            <article className="vibe-card rv" data-d="1">
              <div className="vibe-type">Themed Gatherings</div>
              <h3 className="vibe-h3">Bar Nights &amp; Lounges</h3>
              <p className="vibe-p">Evening events in premier Ottawa spaces. High-impact social environments where student ambition meets professional experience.</p>
            </article>

            <article className="vibe-card rv" data-d="2">
              <div className="vibe-type">Small Format</div>
              <h3 className="vibe-h3">Coffee &amp; Conversation</h3>
              <p className="vibe-p">Low-pressure meetups designed for smaller groups. Perfect for deeper dialogue and getting to know the core community.</p>
            </article>

            <article className="vibe-card rv" data-d="3">
              <div className="vibe-type">Impact Driven</div>
              <h3 className="vibe-h3">Fundraisers &amp; Galas</h3>
              <p className="vibe-p">Specialized events dedicated to raising support for society missions while bringing the community together for a cause.</p>
            </article>

            <article className="vibe-card rv" data-d="4">
              <div className="vibe-type">Academic Plus</div>
              <h3 className="vibe-h3">Social Mixers</h3>
              <p className="vibe-p">Post-Speaker Forum gatherings where students and guest speakers can continue the conversation in a casual setting.</p>
            </article>
          </div>
        </div>
      </section>

      {/* NOTIFY / INSTAGRAM */}
      <section className="notify-sec">
        <div className="wrap notify-inner">
          <h2 className="notify-title rv">Social Announcements live on <em>Instagram.</em></h2>
          <p className="notify-sub rv" data-d="1">Our community gathers spontaneously. We post all social invitations, locations, and RSVPs via Instagram Stories first.</p>
          <div className="notify-actions rv" data-d="2">
            <Magnetic strength={0.3}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <span>Follow @Meridian.Society</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </section>

    </main>
  );
}
