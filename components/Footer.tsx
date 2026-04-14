import Link from "next/link";
import { REGISTER_URL } from "./NavBar";

export default function Footer() {
  return (
    <footer>
      <span className="footer-ghost" aria-hidden="true">MERIDIAN</span>
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="footer-wordmark">The Meridian Society</div>
            <div className="footer-tagline">Ottawa · Est. 2025</div>
          </div>
          <div className="footer-connect">
            <a href="https://www.instagram.com/Meridian.Society" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="mailto:meridiansocietycanada@gmail.com">Email</a>
          </div>
        </div>
        <div className="footer-nav" role="navigation" aria-label="Site pages">
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/social">Social</Link>
          <Link href="/team">Team</Link>
          <Link href="/speak">Speak</Link>
          <Link href={REGISTER_URL}>Membership</Link>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} The Meridian Society &nbsp;·&nbsp; Independent Student Organization</span>
        </div>
      </div>
    </footer>
  );
}
