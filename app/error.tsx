"use client";

import { useEffect } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import BackToTop from "@/components/BackToTop";
import TransitionWrapper from "@/components/TransitionWrapper";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[App Error]", error);
  }, [error]);

  return (
    <>
      <NavBar />
      <TransitionWrapper>
        <main id="main-content" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 24px" }}>
          <div style={{ maxWidth: 560, textAlign: "center" }}>
            <p className="rv" style={{ fontFamily: "var(--sans)", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: 13, color: "var(--gold)", marginBottom: 24 }}>
              Unexpected Error
            </p>
            <h1 className="rv" data-d="1" style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05, marginBottom: 16 }}>
              Something went <em>wrong.</em>
            </h1>
            <p className="rv" data-d="2" style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink-75)", marginBottom: 32 }}>
              A page on the site failed to render. The team has been notified.
            </p>
            <div className="rv" data-d="3" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={reset}
                className="btn-primary"
                style={{ cursor: "pointer", border: "none" }}
              >
                <span>Try Again</span>
              </button>
              <Link href="/" className="btn-ghost-link">
                Return Home <span>&#8594;</span>
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
