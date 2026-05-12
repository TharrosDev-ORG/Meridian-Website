import { Metadata } from 'next';
import PageStyles from '@/components/PageStyles';
import { qaCss } from './pageCss';
import { getMetadata } from '@/utils/metadata-shared';
import FaqAgent from '@/components/FaqAgent';

export const metadata: Metadata = getMetadata({
  title: "Q&A — Tharros FAQ Agent",
  description: "Get answers to your questions about The Meridian Society through our intelligent Tharros FAQ agent.",
  urlPath: "/qa",
});

export default function QAPage() {
  return (
    <main>
      <PageStyles css={qaCss} />
      
      <section className="qa-section">
        <div className="wrap">
          <header className="qa-header rv">
            <div className="sec-label">Intelligence</div>
            <h1 className="qa-title">Questions & <em>Answers.</em></h1>
            <p className="qa-intro">
              Our assistant is here to help you navigate the society and find information.
            </p>
          </header>

          <FaqAgent />
        </div>
      </section>
    </main>
  );
}
