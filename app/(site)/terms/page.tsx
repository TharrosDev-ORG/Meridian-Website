import { Metadata } from 'next';
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { termsPageCss } from './termsPageCss';
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
      <PageStyles css={termsPageCss} />
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
        <section className="info-hero terms-hero">
          <div className="info-eyebrow rv">Operational Standards</div>
          <h1 className="info-title rv rv-stagger">
            <span className="rv-stagger-item">Terms of <em>Use.</em></span>
          </h1>
          <div className="info-meta rv" data-d="1">Revised · April 2026</div>
        </section>

        <section className="info-body">
          <p className="info-lede rv" data-d="2">
            The Meridian Society is an independent, student-run organisation based in Ottawa.
            This page describes the standards and protocols under which we operate our digital
            presence and membership programme.
          </p>

          <div className="rv" data-d="3">
            <h2>Eligibility</h2>
            <p>
              Membership is open to anyone with an interest in the ideas we explore — there is no
              geographic restriction and no academic affiliation required. By registering, you
              confirm that the information you have provided is accurate.
            </p>
          </div>

          <div className="rv" data-d="4">
            <h2>Membership</h2>
            <p>
              Registering as a member is free and creates no binding obligation on either side.
              Members receive event invitations and Society announcements. Attendance at any particular
              event is entirely optional.
            </p>
          </div>

          <div className="rv" data-d="5">
            <h2>Events</h2>
            <p>
              Event details — times, locations, and speakers — may change. We make reasonable
              efforts to communicate updates promptly through email and Instagram. The Society 
              accepts no liability for costs incurred in reliance on a scheduled event.
            </p>
          </div>

          <div className="rv" data-d="6">
            <h2>Conduct</h2>
            <p>
              We expect members and guests to treat one another, speakers, and organizers with respect
              at all Society gatherings. The Society reserves the right to decline future attendance 
              to anyone whose conduct falls below this standard.
            </p>
          </div>

          <div className="rv" data-d="7">
            <h2>Intellectual property</h2>
            <p>
              All original content on this site — text, photography, visual design, and branding —
              belongs to The Meridian Society. Speaker presentations remain the property of the speaker.
            </p>
          </div>

          <div className="rv" data-d="8">
            <h2>Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, The Meridian Society and its organizers 
              shall not be liable for any incidental or consequential damages arising from your 
              use of this website or participation in Society events.
            </p>
          </div>

          <div className="rv" data-d="9">
            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of the Province of Ontario and the federal laws
              of Canada. Any dispute shall be subject to the exclusive jurisdiction of the courts of Ontario.
            </p>
          </div>

          <div className="info-related rv" data-d="9">
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
