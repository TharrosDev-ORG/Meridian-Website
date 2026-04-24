import { Metadata } from 'next';
import Link from 'next/link';
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
          <div className="info-eyebrow rv">The Meridian Society</div>
          <h1 className="info-title rv rv-stagger">
            <span className="rv-stagger-item">Privacy <em>Notice.</em></span>
          </h1>
          <div className="info-meta rv" data-d="1">Last updated · April 2026</div>
        </section>

        <section className="info-body">
          <p className="info-lede">
            This notice explains what personal information The Meridian Society collects through
            this website, how we use it, and the choices available to you.
          </p>

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

          <h2>How we use it</h2>
          <ul>
            <li>To send event invitations and Society announcements to the email you provided</li>
            <li>To understand, in aggregate, the backgrounds and interests of our membership</li>
            <li>To reach you if a specific event you signed up for changes or is cancelled</li>
          </ul>
          <p>
            We do not use your information for automated decision-making or profiling of any kind.
          </p>

          <h2>Where it lives</h2>
          <p>
            Registration data is stored in a Supabase-hosted PostgreSQL database operated for the
            Society. Access is restricted to organizers of The Meridian Society. Supabase is a
            third-party service provider whose infrastructure is maintained in accordance with
            industry-standard security controls.
          </p>
          <p>
            This website is hosted on Vercel. Vercel may process request metadata — IP address,
            user-agent, request path — in the ordinary course of serving the site. That metadata is
            not linked to your registration record and is subject to Vercel&apos;s own privacy
            policy.
          </p>

          <h2>Cookies &amp; tracking</h2>
          <p>
            This site does not use advertising cookies or third-party tracking pixels. We do not
            run Google Analytics or any equivalent service. The only browser storage we write is a
            session flag set after you submit a registration, which shows you the confirmation screen
            if you return to the page. It contains no personal information and expires when you
            clear your browser data.
          </p>

          <h2>Data retention</h2>
          <p>
            We retain your registration record for as long as you remain an active member or until
            you ask us to remove it. Records associated with email addresses that have not engaged
            with any communication over an extended period may be purged at the discretion of the
            organizers.
          </p>

          <h2>Your rights</h2>
          <p>
            Canadian residents may have rights under the Personal Information Protection and
            Electronic Documents Act (PIPEDA) and applicable provincial privacy legislation,
            including the right to:
          </p>
          <ul>
            <li>Request access to the personal information we hold about you</li>
            <li>Ask us to correct inaccurate or incomplete information</li>
            <li>Request deletion of your record</li>
          </ul>
          <p>
            To exercise any of these rights, email{' '}
            <a href="mailto:meridiansocietycanada@gmail.com">meridiansocietycanada@gmail.com</a>{' '}
            from the address you registered with. We will respond within five business days.
          </p>

          <h2>What we don&apos;t do</h2>
          <ul>
            <li>We don&apos;t sell your information to anyone.</li>
            <li>We don&apos;t share it with third parties for advertising or marketing purposes.</li>
            <li>We don&apos;t post about individual members publicly without their explicit consent.</li>
            <li>We don&apos;t use it for any purpose not described in this notice.</li>
          </ul>

          <h2>Removing your record</h2>
          <p>
            If you&apos;d like your information removed, email{' '}
            <a href="mailto:meridiansocietycanada@gmail.com">meridiansocietycanada@gmail.com</a>{' '}
            from the address you registered with. We will confirm deletion within five business days.
          </p>

          <h2>Changes to this notice</h2>
          <p>
            If we make material changes to how we handle personal information, we will update this
            page and revise the &ldquo;Last updated&rdquo; date above. Continued use of the site
            after a change constitutes acceptance of the revised notice.
          </p>

          <h2>Questions</h2>
          <p>
            Reach us at{' '}
            <a href="mailto:meridiansocietycanada@gmail.com">meridiansocietycanada@gmail.com</a>.
          </p>

          <div className="info-related">
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
