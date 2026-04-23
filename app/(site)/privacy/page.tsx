import { Metadata } from 'next';
import PageStyles from '@/components/PageStyles';
import { infoPageCss } from '../_info/infoPageCss';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema } from '@/utils/jsonld';

export const metadata: Metadata = getMetadata({
  title: "Privacy",
  description: "What information The Meridian Society collects when you register, and how we use it.",
  urlPath: "/privacy"
});

export default function PrivacyPage() {
  return (
    <>
      <PageStyles css={infoPageCss} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Privacy", item: "/privacy" },
          ])),
        }}
      />
      <main id="main-content">
        <section className="info-hero">
          <div className="info-eyebrow">The Meridian Society</div>
          <h1 className="info-title">Privacy <em>Notice.</em></h1>
          <div className="info-meta">Informational Overview</div>
        </section>

        <section className="info-body">
          <h2>What we collect</h2>
          <p>When you register through this site, we ask for:</p>
          <ul>
            <li>Your name</li>
            <li>A contact email</li>
            <li>Your current or most recent institution, if applicable</li>
            <li>Interests you select from a short checklist</li>
          </ul>
          <p>We do not ask for payment information. Membership is free.</p>

          <h2>How we use it</h2>
          <ul>
            <li>To send event announcements and invitations</li>
            <li>To understand, in aggregate, who is interested in the Society</li>
            <li>To reach you if a specific event you signed up for changes</li>
          </ul>

          <h2>Where it lives</h2>
          <p>
            Registrations are stored in a Supabase database that we operate for the Society.
            Access is limited to organizers of The Meridian Society.
          </p>

          <h2>What we don&apos;t do</h2>
          <ul>
            <li>We don&apos;t sell your information.</li>
            <li>We don&apos;t share it with third parties for advertising.</li>
            <li>We don&apos;t post about individual members publicly without their consent.</li>
          </ul>

          <h2>Removing your record</h2>
          <p>
            If you&apos;d like your information removed, email{' '}
            <a href="mailto:meridiansocietycanada@gmail.com">meridiansocietycanada@gmail.com</a>
            {' '}from the address you registered with and we&apos;ll take care of it.
          </p>

          <h2>Questions</h2>
          <p>
            Reach us at{' '}
            <a href="mailto:meridiansocietycanada@gmail.com">meridiansocietycanada@gmail.com</a>.
          </p>
        </section>
      </main>
    </>
  );
}
