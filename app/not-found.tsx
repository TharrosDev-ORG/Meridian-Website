import Link from 'next/link';
import PageStyles from '@/components/PageStyles';
import { notFoundCss } from './not-foundCss';


export default function NotFound() { 
  return (
    <>
      <PageStyles css={notFoundCss} />
      <main id="main-content">
        <div className="e404-main">
          <div className="e404-wrap">
            <p className="e404-eyebrow">Error 404</p>
            <div className="e404-code" aria-hidden="true">404</div>
            <div className="e404-rule" aria-hidden="true"></div>
            <h1 className="e404-title">Beyond Our Meridian</h1>
            <p className="e404-desc">
              The page you&apos;re looking for has drifted out of reach.<br />
              Let us orient you.
            </p>
            <div className="e404-ctas">
              <Link href="/" className="e404-cta-primary"><span>Return Home</span></Link>
              <Link href="/events" className="e404-cta-ghost">View Events &#8594;</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  ); 
}
