"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error]", error);
  }, [error]);

  return (
    <html lang="en-CA">
      <body style={{ margin: 0, background: "#F4EDE3", color: "#18150F", fontFamily: "Georgia, serif" }}>
        <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ textTransform: "uppercase", letterSpacing: "0.18em", fontSize: 13, color: "#B8932A", marginBottom: 24 }}>
              Critical Error
            </p>
            <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05, marginBottom: 16, fontWeight: 400 }}>
              Something went wrong.
            </h1>
            <p style={{ fontSize: 18, opacity: 0.75, marginBottom: 32 }}>
              The site failed to load. Please try again.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                cursor: "pointer",
                border: "1px solid #18150F",
                background: "#18150F",
                color: "#F4EDE3",
                padding: "14px 28px",
                fontSize: 14,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
