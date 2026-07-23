import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import MotionProvider from "@/components/motion/MotionProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollProgress from "@/components/ScrollProgress";
import { generateOrganizationSchema, generateWebSiteSchema, generateSiteNavigationElementSchema } from "@/utils/jsonld";
import { getMetadata } from "@/utils/metadata-shared";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--serif",
  display: "swap",
});

// Barlow Condensed: drop the rarely-used 500 weight; the four remaining
// weights cover everything the site actually styles. Each dropped weight
// shaves a font file from the initial payload.
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--sans",
  display: "swap",
});

// IBM Plex Mono: the metadata voice of "The Record" brutalist-editorial
// system — index numbers, coordinates, folio labels. Two weights keep the
// payload lean; self-hosted by next/font so no CSP connect-src change.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F4EDE3",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = getMetadata({
  title: "Ottawa Student Speaker Forum & Social Community",
  description: "An independent, student-run community in Ottawa. The Meridian Society connects motivated students with professionals through our curated speaker forum and vibrant social events. Built by students, for students.",
  urlPath: "/"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${cormorant.variable} ${barlow.variable} ${plexMono.variable}`}>
      <head>
        {/* Preconnect: shave handshake latency for Supabase Realtime + Vercel
            telemetry. dns-prefetch is a cheaper hint for Supabase since the
            WebSocket only opens on the homepage. */}
        <link rel="preconnect" href="https://va.vercel-scripts.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://dsyiuztquzkcikehkigv.supabase.co" />
        {/* The old pre-hydration early-reveal shim is gone: .rv content is
            visible by default everywhere, and MotionProvider marks above-fold
            elements after hydration. No more React className mismatch. */}
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Providers>
          <MotionProvider />
          {children}
          <div className="progress" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} id="progressBar"></div>
          <ScrollProgress />
          <Analytics />
          <SpeedInsights />
          {/* Single JSON-LD @graph: one parse pass instead of three. */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  generateOrganizationSchema(),
                  generateWebSiteSchema(),
                  generateSiteNavigationElementSchema(),
                ],
              }),
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
