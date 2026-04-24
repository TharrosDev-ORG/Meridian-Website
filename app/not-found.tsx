import Link from "next/link";
import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import BackToTop from "@/components/BackToTop";
import TransitionWrapper from "@/components/TransitionWrapper";

export const metadata: Metadata = {
  title: "Page Not Found | The Meridian Society",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <NavBar />
      <TransitionWrapper>
        <main id="main-content" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 24px" }}>
          <div style={{ maxWidth: 560, textAlign: "center" }}>
            <p className="rv" style={{ fontFamily: "var(--sans)", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: 13, color: "var(--gold)", marginBottom: 24 }}>
              404 &mdash; Not Found
            </p>
            <h1 className="rv" data-d="1" style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05, marginBottom: 16 }}>
              This page doesn&apos;t <em>exist.</em>
            </h1>
            <p className="rv" data-d="2" style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink-75)", marginBottom: 32 }}>
              The page you&apos;re looking for may have moved, or never existed.
            </p>
            <div className="rv" data-d="3">
              <Link href="/" className="btn-primary">
                <span>Return Home</span>
              </Link>
            </div>
          </div>
        </main>
      </TransitionWrapper>
      <Footer />
      <MobileMenu />
      <BackToTop />
    </>
  );
}
