import { Metadata } from 'next';
import PageStyles from '@/components/PageStyles';
import { infoPageCss } from '../_info/infoPageCss';
import { getMetadata } from '@/utils/metadata-shared';
import { generateBreadcrumbSchema } from '@/utils/jsonld';
import { INSTAGRAM_URL } from '@/utils/social';

export const metadata: Metadata = getMetadata({
  title: "Accessibility",
  description: "How The Meridian Society thinks about access on the web and in person, and how to reach us for accommodations.",
  urlPath: "/accessibility"
});

export default function AccessibilityPage() {
  return (
    <>
      <PageStyles css={infoPageCss} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Accessibility", item: "/accessibility" },
          ])),
        }}
      />
      <main id="main-content">
        <section className="info-hero">
          <div className="info-eyebrow">The Meridian Society</div>
          <h1 className="info-title">Access &amp; <em>Inclusion.</em></h1>
          <div className="info-meta">Informational Overview</div>
        </section>

        <section className="info-body">
          <p>
            The Meridian Society wants its website, events, and community to be usable by as many
            people as possible. We are a small, student-run group, so this page reflects our
            intentions and current practice rather than a formal compliance statement.
          </p>

          <h2>On the web</h2>
          <ul>
            <li>Semantic HTML and labelled interactive elements</li>
            <li>Full keyboard navigation with a visible focus outline</li>
            <li>A skip-to-content link at the top of every page</li>
            <li>Respect for the <em>prefers-reduced-motion</em> setting on animations</li>
            <li>High-contrast cream-and-ink palette in place of pure black or white</li>
          </ul>

          <h2>At events</h2>
          <p>
            Our speaker events are held at venues in the Ottawa area. Specific accessibility
            features vary by venue. If a particular event is relevant to you and you want to know
            whether it will work for your needs, please reach out before you register.
          </p>

          <h2>Tell us when something breaks</h2>
          <p>
            If you encounter a barrier on this site — a missing label, a link you can&apos;t reach
            with the keyboard, contrast that doesn&apos;t hold up, a video without captions — let
            us know and we will work to fix it. Please include the page you were on and what you
            were trying to do.
          </p>

          <h2>Contact</h2>
          <p>
            Email{' '}
            <a href="mailto:meridiansocietycanada@gmail.com">meridiansocietycanada@gmail.com</a>
            {' '}or send us a message on Instagram at{' '}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@Meridian.Society</a>.
          </p>
        </section>
      </main>
    </>
  );
}
