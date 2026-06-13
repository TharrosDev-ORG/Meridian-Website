import Link from "next/link";
import { INSTAGRAM_URL, CONTACT_MAILTO } from "@/utils/social";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-wordmark">The Meridian Society</div>
            <div className="footer-tagline">Independent Student Organization</div>
            <div className="footer-est">Ottawa, ON · Est. 2025</div>
          </div>

          <nav className="footer-col" aria-label="Society navigation">
            <h4 className="footer-col-h">Society</h4>
            <ul className="footer-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/membership">Membership</Link></li>
              <li><Link href="/membership#faq">FAQ</Link></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Engage navigation">
            <h4 className="footer-col-h">Engage</h4>
            <ul className="footer-list">
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/apply">Apply to Speak</Link></li>
            </ul>
          </nav>

          <div className="footer-col">
            <h4 className="footer-col-h">Connect</h4>
            <ul className="footer-list">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href={CONTACT_MAILTO}>Email Inquiries</a>
              </li>
              <li>
                <Link href="/contact" prefetch={false}>Contact</Link>
              </li>
            </ul>
          </div>

          <nav className="footer-col" aria-label="Footer legal">
            <h4 className="footer-col-h">Info</h4>
            <ul className="footer-list">
              {/* Legal pages: skip prefetch — visitors rarely click these and
                  every page would otherwise eagerly fetch their RSC payload. */}
              <li><Link href="/privacy" prefetch={false}>Privacy</Link></li>
              <li><Link href="/terms" prefetch={false}>Terms</Link></li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            © {currentYear} The Meridian Society. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
