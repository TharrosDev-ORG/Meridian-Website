import { Metadata } from 'next';
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { privacyPageCss } from './privacyPageCss';
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
      <PageStyles css={privacyPageCss} />
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
        <section className="info-hero privacy-hero">
          <div className="info-eyebrow rv">Data Protection</div>
          <h1 className="info-title rv rv-stagger">
            <span className="rv-stagger-item">Privacy <em>Notice.</em></span>
          </h1>
          <div className="info-meta rv" data-d="1">Revised · April 2026</div>
        </section>

        <section className="info-body">
          <p className="info-lede rv" data-d="2">
            This notice explains what personal information The Meridian Society collects through
            this website, how we use it, and the choices available to you as a member of our community.
          </p>

          <div className="rv" data-d="3">
            <h2>What we collect</h2>
            <p>When you register through this site, we ask for:</p>
            <ul>
              <li>Your name</li>
              <li>A contact email address</li>
              <li>Your current or most recent institution, if applicable</li>
              <li>Interests you select from a short checklist</li>
            </ul>
            <p>
              We do not ask for payment information, a phone number, or any government-issued
              identifier. Membership is free.
            </p>
          </div>

          <div className="rv" data-d="4">
            <h2>How we use it</h2>
            <ul>
              <li>To send event invitations and Society announcements to the email you provided</li>
              <li>To understand, in aggregate, the backgrounds and interests of our membership</li>
              <li>To reach you if a specific event you signed up for changes or is cancelled</li>
            </ul>
            <p>
              We do not use your information for automated decision-making or profiling of any kind.
            </p>
          </div>

          <div className="rv" data-d="5">
            <h2>Where it lives</h2>
            <p>
              Registration data is stored in a Supabase-hosted PostgreSQL database operated for the
              Society. Access is restricted to organizers of The Meridian Society. 
            </p>
            <p>
              This website is hosted on Vercel. Vercel may process request metadata — IP address,
              user-agent, request path — in the ordinary course of serving the site.
            </p>
          </div>

          <div className="rv" data-d="6">
            <h2>Cookies &amp; tracking</h2>
            <p>
              This site does not use advertising cookies or third-party tracking pixels. We do not
              run Google Analytics or any equivalent service. The only browser storage we write is a
              session flag set after you submit a registration.
            </p>
          </div>

          <div className="rv" data-d="7">
            <h2>Your rights</h2>
            <p>
              Canadian residents may have rights under the Personal Information Protection and
              Electronic Documents Act (PIPEDA), including the right to:
            </p>
            <ul>
              <li>Request access to the personal information we hold about you</li>
              <li>Ask us to correct inaccurate or incomplete information</li>
              <li>Request deletion of your record</li>
            </ul>
            <p>
              To exercise any of these rights, email{' '}
              <a href="mailto:meridiansocietycanada@gmail.com">meridiansocietycanada@gmail.com</a>.
            </p>
          </div>

          <div className="rv" data-d="8">
            <h2>Removing your record</h2>
            <p>
              If you&apos;d like your information removed, email{' '}
              <a href="mailto:meridiansocietycanada@gmail.com">meridiansocietycanada@gmail.com</a>{' '}
              from the address you registered with. We will confirm deletion within five business days.
            </p>
          </div>

          <div className="info-related rv" data-d="9">
            <div className="info-related-label">Also on this site</div>
            <div className="info-related-links">
              <Link href="/terms">Terms of Use</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
