"use client";

import { useEffect } from "react";
import Link from "next/link";

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
    <main id="main-content" style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      <div style={{ maxWidth: 560, textAlign: "center" }}>
        <p style={{ fontFamily: "var(--sans)", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: 13, color: "var(--gold)", marginBottom: 24 }}>
          Unexpected Error
        </p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05, marginBottom: 16 }}>
          Something went <em>wrong.</em>
        </h1>
        <p style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink-75)", marginBottom: 32 }}>
          A page on the site failed to render. The team has been notified. You can try again or return home.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
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
  );
}
