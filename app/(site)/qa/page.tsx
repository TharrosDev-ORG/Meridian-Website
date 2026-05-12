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
      
      <section className="page-hero" aria-labelledby="qa-title">
        <div className="page-hero-content">
          <div className="sec-label rv">Intelligence</div>
          <h1 className="hero-title rv rv-stagger" id="qa-title">
            <span className="rv-stagger-item">Questions &</span>
            <span className="rv-stagger-item"><em>Answers.</em></span>
          </h1>
          <p className="hero-sub rv" data-d="1">
            Our intelligent assistant is here to help you navigate the society, 
            understand our programs, and find the information you need.
          </p>
        </div>
      </section>

      <section className="qa-container">
        <div className="wrap">
          <FaqAgent />
        </div>
      </section>
    </main>
  );
}
