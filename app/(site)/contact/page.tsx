import { Metadata } from 'next';
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { contactPageCss } from './contactPageCss';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema } from '@/utils/jsonld';
import { INSTAGRAM_URL } from '@/utils/social';
import Magnetic from '@/components/Magnetic';

export const metadata: Metadata = getMetadata({
  title: "Contact",
  description: "How to reach The Meridian Society — general inquiries, speaker applications, and press.",
  urlPath: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <PageStyles css={contactPageCss} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Contact", item: "/contact" },
          ])),
        }}
      />
      <main id="main-content">
        <section className="info-hero contact-hero">
          <div className="info-eyebrow rv">Communication</div>
          <h1 className="info-title rv rv-stagger">
            <span className="rv-stagger-item">Get in <em>Touch.</em></span>
          </h1>
          <div className="info-meta rv" data-d="1">Direct paths to our team.</div>
        </section>

        <section className="info-body" style={{ paddingTop: 0 }}>
          <div className="contact-grid-premium">
            <Magnetic strength={0.08}>
              <a href="mailto:meridiansocietycanada@gmail.com" className="contact-card-v2 rv" data-d="2" style={{ textDecoration: 'none' }}>
                <div>
                  <div className="contact-card-lbl">General Inquiry</div>
                  <div className="contact-card-val">
                    meridiansocietycanada@gmail.com
                  </div>
                </div>
                <div className="contact-card-desc">
                  For press, partnerships, and general Society administration.
                </div>
              </a>
            </Magnetic>

            <Magnetic strength={0.08}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="contact-card-v2 rv" data-d="3" style={{ textDecoration: 'none' }}>
                <div>
                  <div className="contact-card-lbl">Social Presence</div>
                  <div className="contact-card-val">
                    @Meridian.Society
                  </div>
                </div>
                <div className="contact-card-desc">
                  Event updates, speaker highlights, and real-time interaction.
                </div>
              </a>
            </Magnetic>
          </div>

          <div className="contact-sub-header rv" data-d="4">
            <h2 className="contact-sub-title">Looking for <em>more?</em></h2>
            <p className="info-lede" style={{ margin: '0 auto', maxWidth: '640px' }}>
              The Meridian Society is built on collaboration across disciplines. 
              Choose the path that best fits your intent.
            </p>
          </div>

          <div style={{ marginTop: '80px' }}>
            <div className="rv" data-d="5">
              <h2>Speaking at an event</h2>
              <p>
                If you&apos;re a professional, academic, or alum who would like to speak at a Meridian
                event, begin with the <Link href="/apply">speaker application</Link>.
                It captures what we need to assess fit — we follow up within two weeks.
              </p>
            </div>

            <div className="rv" data-d="6">
              <h2>Joining as a member</h2>
              <p>
                Membership is free and open to anyone. Visit the <Link href="/register">Register</Link>{' '}
                page to submit your information — we&apos;ll reach out with invitations as events are
                scheduled.
              </p>
            </div>

            <div className="rv" data-d="7">
              <h2>Press &amp; partnerships</h2>
              <p>
                For media inquiries or collaboration proposals, write to the general inbox. 
                We route all requests to the appropriate organizers within 48 hours.
              </p>
            </div>
          </div>

          <div className="info-related rv" data-d="10">
            <div className="info-related-label">Also on this site</div>
            <div className="info-related-links">
              <Link href="/privacy">Privacy Notice</Link>
              <Link href="/terms">Terms of Use</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
