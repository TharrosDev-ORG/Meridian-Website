import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Barlow_Condensed } from "next/font/google";
import Providers from "@/components/Providers";
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
  weight: ["300", "400", "600", "700"],
  variable: "--sans",
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
    <html lang="en-CA" className={`${cormorant.variable} ${barlow.variable}`}>
      <head>
        {/* Performance: Preconnect to critical third-party domains to shave off handshake latency */}
        <link rel="preconnect" href="https://dsyiuztquzkcikehkigv.supabase.co" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" crossOrigin="anonymous" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Providers>
          {children}
          <div className="progress" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} id="progressBar"></div>
          <ScrollProgress />
          <Analytics />
          <SpeedInsights />
          {/* JSON-LD Schemas */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateOrganizationSchema()),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateWebSiteSchema()),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateSiteNavigationElementSchema()),
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
