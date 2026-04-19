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
          <p>
            The Meridian Society is based in Ottawa and run by students. The best way to reach us
            depends on what you&apos;re writing about.
          </p>

          <div className="info-contact-grid">
            <div className="info-contact-card">
              <div className="info-contact-lbl">General</div>
              <div className="info-contact-val">
                <a href="mailto:meridiansocietycanada@gmail.com">meridiansocietycanada@gmail.com</a>
              </div>
            </div>
            <div className="info-contact-card">
              <div className="info-contact-lbl">Instagram</div>
              <div className="info-contact-val">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@Meridian.Society</a>
              </div>
            </div>
          </div>

          <h2>Speaking at an event</h2>
          <p>
            If you&apos;re a professional, academic, or alum who would like to speak at a future
            Meridian event, start with the application on the{' '}
            <Link href="/speak">Speak</Link> page. It gives us the basics we need to follow up.
          </p>

          <h2>Joining as a member</h2>
          <p>
            Registration is free. Head to{' '}
            <Link href="/register">Register</Link> to receive invitations to upcoming events.
          </p>

          <h2>Everything else</h2>
          <p>
            Press, partnerships, or a question that doesn&apos;t fit the above — email the general
            inbox and we&apos;ll route it to the right person on the team.
          </p>
        </section>
      </main>
    </>
  );
}
