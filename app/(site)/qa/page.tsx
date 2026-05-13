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
