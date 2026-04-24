import { Metadata } from 'next';
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { infoPageCss } from '../_info/infoPageCss';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema } from '@/utils/jsonld';

export const metadata: Metadata = getMetadata({
  title: "Terms",
  description: "The terms under which The Meridian Society operates its website and membership.",
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
          <div className="info-meta">Last updated · April 2026</div>
        </section>

        <section className="info-body">
          <p className="info-lede">
            The Meridian Society is an independent, student-run organisation based in Ottawa.
            This page describes the terms under which we operate our website and membership
            programme. It is written in plain language and is not a formal legal contract.
          </p>

          <h2>Eligibility</h2>
          <p>
            Membership is open to anyone with an interest in the ideas we explore — there is no
            geographic restriction and no academic affiliation required. By registering, you
            confirm that the information you have provided is accurate.
          </p>

          <h2>Membership</h2>
          <p>
            Registering as a member is free and creates no binding obligation on either side.
            Members receive event invitations and Society announcements. Attendance at any particular
            event is entirely optional. We reserve the right to remove a member at our discretion
            if their conduct is inconsistent with the standards described below.
          </p>

          <h2>Events</h2>
          <p>
            Event details — times, locations, speakers, formats — may change. We make reasonable
            efforts to communicate updates promptly through email and Instagram. Events may be
            rescheduled or cancelled if circumstances require. The Society accepts no liability for
            travel or other costs incurred in reliance on a scheduled event.
          </p>

          <h2>Conduct</h2>
          <p>
            We expect members and guests to treat one another, speakers, and organizers with respect
            at all Society gatherings — in person and online. The Society reserves the right to
            decline future attendance or membership to anyone whose conduct falls below that
            standard, without obligation to explain the decision.
          </p>

          <h2>Intellectual property</h2>
          <p>
            All original content on this site — text, photography, visual design, and branding —
            belongs to The Meridian Society or to the individuals and organisations credited. You
            are welcome to share links. Reproducing, adapting, or republishing content for any
            purpose other than personal reference requires prior written permission.
          </p>
          <p>
            Speaker presentations and remarks are the intellectual property of the speaker unless
            otherwise agreed in writing.
          </p>

          <h2>External links</h2>
          <p>
            This site links to external services including Instagram and others. Those services
            operate under their own terms and privacy policies, which we do not control. A link
            to a third-party site does not imply endorsement of its content or practices.
          </p>

          <h2>Disclaimer of warranties</h2>
          <p>
            This website is provided on an &ldquo;as is&rdquo; basis. The Meridian Society makes
            no warranties, express or implied, regarding the accuracy, completeness, or
            availability of any content on the site.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by applicable law, The Meridian Society and its
            organizers shall not be liable for any indirect, incidental, or consequential damages
            arising from your use of this website or participation in Society events.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the Province of Ontario and the federal laws
            of Canada applicable therein. Any dispute arising under these terms shall be subject
            to the exclusive jurisdiction of the courts of Ontario.
          </p>

          <h2>Privacy</h2>
          <p>
            How we handle personal information is described separately in our{' '}
            <Link href="/privacy">Privacy Notice</Link>.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms as the Society evolves. The version published on this page
            is the current one, effective as of the date shown above.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Write to{' '}
            <a href="mailto:meridiansocietycanada@gmail.com">meridiansocietycanada@gmail.com</a>.
          </p>

          <div className="info-related">
            <div className="info-related-label">Also on this site</div>
            <div className="info-related-links">
              <Link href="/privacy">Privacy Notice</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
