import { Metadata } from 'next';
import PageStyles from '@/components/PageStyles';
import { infoPageCss } from '../_info/infoPageCss';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema } from '@/utils/jsonld';

export const metadata: Metadata = getMetadata({
  title: "Terms",
  description: "The informal terms under which The Meridian Society operates its website and membership.",
  urlPath: "/terms"
});

export default function TermsPage() {
  return (
    <>
      <PageStyles css={infoPageCss} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Terms", item: "/terms" },
          ])),
        }}
      />
      <main id="main-content">
        <section className="info-hero">
          <div className="info-eyebrow">The Meridian Society</div>
          <h1 className="info-title">Terms of <em>Use.</em></h1>
          <div className="info-meta">Informational Overview</div>
        </section>

        <section className="info-body">
          <p>
            The Meridian Society is an independent, student-run organization. This page is a
            plain-language overview of how our website and membership work. It is not intended as a
            formal legal contract.
          </p>

          <h2>Membership</h2>
          <p>
            Registering to become a member is free. Members receive invitations and announcements
            about upcoming events. Attending any particular event is optional.
          </p>

          <h2>Events</h2>
          <p>
            Event details — times, locations, speakers — may change. We do our best to communicate
            updates promptly through email and Instagram. Events may be rescheduled or cancelled if
            circumstances require.
          </p>

          <h2>Conduct</h2>
          <p>
            We ask members and guests to treat one another with respect at Society gatherings.
            Organizers may decline future attendance to anyone whose conduct is inconsistent with
            that expectation.
          </p>

          <h2>Content</h2>
          <p>
            Content on this site — text, photographs, branding — belongs to The Meridian Society or
            to the individuals and organizations credited. Please ask before reusing it for anything
            other than personal reference.
          </p>

          <h2>External links</h2>
          <p>
            This site links to external services (Instagram, Google Forms). Those services have
            their own terms; we have no control over their availability or content.
          </p>

          <h2>Changes</h2>
          <p>
            We may update this page as the Society evolves. The version on this site is the current
            one.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Write to{' '}
            <a href="mailto:meridiansocietycanada@gmail.com">meridiansocietycanada@gmail.com</a>.
          </p>
        </section>
      </main>
    </>
  );
}
