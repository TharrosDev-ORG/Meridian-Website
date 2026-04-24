import { Metadata } from 'next';
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { infoPageCss } from '../_info/infoPageCss';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema } from '@/utils/jsonld';
import { INSTAGRAM_URL } from '@/utils/social';

export const metadata: Metadata = getMetadata({
  title: "Contact",
  description: "How to reach The Meridian Society — general inquiries, speaker applications, and press.",
  urlPath: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <PageStyles css={infoPageCss} />
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
        <section className="info-hero">
          <div className="info-eyebrow">The Meridian Society</div>
          <h1 className="info-title">Get in <em>Touch.</em></h1>
          <div className="info-meta">Ottawa · Est. 2025</div>
        </section>

        <section className="info-body">
          <p className="info-lede">
            The Meridian Society is based in Ottawa and run by students. We&apos;re a small,
            direct team — the right path depends on why you&apos;re writing.
          </p>

          <div className="info-contact-grid">
            <div className="info-contact-card">
              <div className="info-contact-lbl">General</div>
              <div className="info-contact-val">
                <a href="mailto:meridiansocietycanada@gmail.com">meridiansocietycanada@gmail.com</a>
              </div>
              <div className="info-contact-desc">
                Press, partnerships, and anything else. We typically reply within two business days.
              </div>
            </div>
            <div className="info-contact-card">
              <div className="info-contact-lbl">Instagram</div>
              <div className="info-contact-val">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@Meridian.Society</a>
              </div>
              <div className="info-contact-desc">
                Event announcements, speaker highlights, and Society updates in real time.
              </div>
            </div>
          </div>

          <h2>Speaking at an event</h2>
          <p>
            If you&apos;re a professional, academic, or alum who would like to speak at a Meridian
            event, begin with the application on the <Link href="/speak">Speak</Link> page.
            It captures what we need to assess fit — we follow up within two weeks.
          </p>
          <p>
            We host speakers across disciplines: law, business, public policy, the sciences, and
            beyond. The common thread is a willingness to engage a curious, generalist audience.
          </p>

          <h2>Joining as a member</h2>
          <p>
            Membership is free and open to anyone. Visit the <Link href="/register">Register</Link>{' '}
            page to submit your information — we&apos;ll reach out with invitations as events are
            scheduled. There is no commitment and no fee.
          </p>

          <h2>Press &amp; partnerships</h2>
          <p>
            For media inquiries, collaboration proposals, or anything that doesn&apos;t fit the
            above, write to the general inbox with a brief description of your request. We&apos;ll
            route it to the right person on the team.
          </p>

          <div className="info-related">
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
