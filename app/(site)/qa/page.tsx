import { Metadata } from 'next';
import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { qaCss } from './pageCss';
import { getMetadata } from '@/utils/metadata-shared';
import FaqAgent from '@/components/FaqAgent';
import QaBriefing from '@/components/QaBriefing';

export const metadata: Metadata = getMetadata({
  title: "Q&A — Tharros FAQ Agent",
  description: "Get answers to your questions about The Meridian Society through our intelligent Tharros FAQ agent.",
  urlPath: "/qa",
});

export default function QAPage() {
  return (
    <main id="main-content">
      <PageStyles css={qaCss} />

      <section className="qa-mobile-block" aria-label="Q&A unavailable on mobile">
        <div className="qa-mobile-block-inner">
          <p className="sec-label">Desktop Required</p>
          <h1 className="qa-mobile-title">
            Our Q&amp;A agent is a <em>desktop experience.</em>
          </h1>
          <p className="qa-mobile-copy">
            The Tharros intelligence console is tuned for a high-fidelity command environment. 
            Please revisit this page on a laptop or desktop to speak with the agent.
          </p>
          <Link href="/" className="qa-mobile-cta">Return to Society Home</Link>
        </div>
      </section>

      <section className="qa-section">
        <div className="wrap">
          <div className="qa-grid">
            {/* Left: Strategic Briefing (Client Island) */}
            <QaBriefing />

            {/* Right: The Console (Client Island) */}
            <FaqAgent />
          </div>
        </div>
      </section>
    </main>
  );
}
