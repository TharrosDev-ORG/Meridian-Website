import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | The Meridian Society",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main-content" style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      <div style={{ maxWidth: 560, textAlign: "center" }}>
        <p style={{ fontFamily: "var(--sans)", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: 13, color: "var(--gold)", marginBottom: 24 }}>
          404 &mdash; Not Found
        </p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05, marginBottom: 16 }}>
          This page doesn&apos;t <em>exist.</em>
        </h1>
        <p style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink-75)", marginBottom: 32 }}>
          The page you&apos;re looking for may have moved, or never existed.
        </p>
        <Link href="/" className="btn-primary">
          <span>Return Home</span>
        </Link>
      </div>
    </main>
  );
}
