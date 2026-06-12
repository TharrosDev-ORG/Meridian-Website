import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { notFoundCss } from './not-foundCss';


export default function NotFound() { 
  return (
    <>
      <PageStyles css={notFoundCss} />
      <main id="main-content">
        <section className="e404-main" data-theme="dark">
          <div className="e404-wrap">
            <p className="e404-eyebrow rv">Error 404</p>
            <div className="e404-code rv" aria-hidden="true" data-d="1">404</div>
            <div className="e404-rule rv" aria-hidden="true" data-d="1"></div>
            <h1 className="e404-title rv rv-stagger" data-d="2">
              <span className="rv-stagger-item">Beyond Our Meridian</span>
            </h1>
            <p className="e404-desc rv" data-d="3">
              The page you&apos;re looking for has drifted out of reach.<br />
              Let us orient you.
            </p>
            <div className="e404-ctas rv" data-d="4">
              <Link href="/" className="e404-cta-primary"><span>Return Home</span></Link>
              <Link href="/events" className="e404-cta-ghost">View Events &#8594;</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  ); 
}
