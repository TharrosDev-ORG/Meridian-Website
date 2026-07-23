import { Metadata } from 'next';
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { contactPageCss } from './contactPageCss';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema } from '@/utils/jsonld';
import { INSTAGRAM_URL, CONTACT_EMAIL, CONTACT_MAILTO } from '@/utils/social';
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
          <div className="grid-lines" aria-hidden="true"></div>
          <div className="contact-hero-inner">
            <div className="info-eyebrow rv">Folio &middot; Contact</div>
            <h1 className="info-title rv">Get in <em>Touch.</em></h1>
            <div className="info-meta rv" data-d="1">Ottawa &middot; Canada / Direct Paths to Our Team</div>
          </div>
        </section>

        <section className="info-body" style={{ paddingTop: 0 }}>
          <div className="contact-grid-premium">
            <Magnetic strength={0.08}>
              <a href={CONTACT_MAILTO} className="contact-card-v2 rv" data-d="2">
                <div>
                  <div className="contact-card-lbl">01 &middot; General Inquiry</div>
                  <div className="contact-card-val">
                    {CONTACT_EMAIL}
                  </div>
                </div>
                <div className="contact-card-desc">
                  For press, partnerships, and general Society administration.
                </div>
              </a>
            </Magnetic>

            <Magnetic strength={0.08}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="contact-card-v2 rv" data-d="3">
                <div>
                  <div className="contact-card-lbl">02 &middot; Social Presence</div>
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

          <div className="folio-head rv" data-d="4" style={{ marginTop: '96px' }}>
            <span className="folio-index">[ 01 ]</span>
            <span className="folio-kicker">Pathways</span>
            <span className="rule-fill"></span>
          </div>
          <h2 className="contact-sub-title rv" data-d="4">Looking for <em>more?</em></h2>
          <p className="info-lede rv" data-d="5" style={{ maxWidth: '640px' }}>
            The Meridian Society is built on collaboration across disciplines.
            Choose the path that best fits your intent.
          </p>

          <ol className="contact-paths">
            <li className="contact-path rv" data-d="5">
              <span className="contact-path-num">01</span>
              <div>
                <h3>Speaking at an event</h3>
                <p>
                  If you&apos;re a professional, academic, or alum who would like to speak at a Meridian
                  event, begin with the <Link href="/apply">speaker application</Link>.
                  It captures what we need to assess fit — we follow up within two weeks.
                </p>
              </div>
            </li>
            <li className="contact-path rv" data-d="6">
              <span className="contact-path-num">02</span>
              <div>
                <h3>Joining as a member</h3>
                <p>
                  Membership is free and open to anyone. Visit the <Link href="/register">Register</Link>{' '}
                  page to submit your information — we&apos;ll reach out with invitations as events are
                  scheduled.
                </p>
              </div>
            </li>
            <li className="contact-path rv" data-d="7">
              <span className="contact-path-num">03</span>
              <div>
                <h3>Press &amp; partnerships</h3>
                <p>
                  For media inquiries or collaboration proposals, write to the general inbox.
                  We route all requests to the appropriate organizers within 48 hours.
                </p>
              </div>
            </li>
          </ol>

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
