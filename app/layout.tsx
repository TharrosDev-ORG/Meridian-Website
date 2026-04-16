import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Barlow_Condensed } from "next/font/google";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--serif",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F4EDE3",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://meridiansociety.ca"),
  title: "The Meridian Society | Ottawa's Student Speaker Forum",
  description:
    "Ottawa's flagship student speaker forum. The Meridian Society connects curious students with professionals, alumni, and scholars through curated speaker events and open dialogue.",
  keywords: [
    "Meridian Society", "Magnus Abdelnour", "Colin Sherwood", "Ottawa Student Speaker Forum", "Undergraduate Speaker Series",
    "Academic Dialogue Ottawa", "Professional Networking for Students", "Career Orientation Students",
    "Independent Student Org", "Ottawa Campus Community", "Student-Led Professional Development",
    "Carleton University Student Club", "uOttawa Campus Life", "Algonquin College Events",
    "Youth Leadership Ottawa", "Intellectual Community Students", "Ottawa Networking Events",
    "Academic Social Groups Ottawa", "Student Mentorship Connections", "Campus Intellectual Life",
    "Ottawa Career Readiness", "Higher Education Networking", "Ottawa Student Leadership",
    "Speaker Forum Canada", "Student Engagement Ottawa", "Post-Secondary Dialogue", "Ottawa Student Community"
  ],
  verification: {
    google: "google2af069010dc1ab79",
  },
  authors: [{ name: "The Meridian Society" }],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://meridiansociety.ca/",
    languages: {
      "en-CA": "https://meridiansociety.ca/",
      "x-default": "https://meridiansociety.ca/",
    },
  },
  openGraph: {
    title: "The Meridian Society | Ottawa's Student Speaker Forum",
    description: "The Meridian Society is Ottawa's premier student speaker forum, connecting curious minds with professionals, alumni, and scholars.",
    url: "https://meridiansociety.ca/",
    siteName: "The Meridian Society",
    images: [
      {
        url: "https://meridiansociety.ca/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Meridian Society — Ottawa Student Speaker Forum Logo",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Meridian Society | Ottawa Student Speaker Forum",
    description:
      "A student-run speaker forum in Ottawa. Free events, open conversations, and a community of curious minds.",
    site: "@MeridianSociety",
    images: ["https://meridiansociety.ca/assets/og-image.png"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: '/assets/favicons/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/favicons/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/assets/favicons/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/assets/favicons/favicon-48x48.png', type: 'image/png', sizes: '48x48' }
    ],
    shortcut: '/assets/favicons/favicon.ico',
    apple: '/assets/favicons/apple-touch-icon.png'
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${cormorant.variable} ${barlow.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Providers>
          {children}
          <div className="progress" role="progressbar" aria-label="Reading progress" id="progressBar"></div>
          <ScrollProgress />
          <Analytics />
          <SpeedInsights />
          {/* JSON-LD Organization Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "The Meridian Society",
                "url": "https://meridiansociety.ca",
                "logo": "https://meridiansociety.ca/assets/favicons/favicon-48x48.png",
                "description": "An independent student speaker forum in Ottawa connecting curious students with professionals, alumni, and scholars.",
                "sameAs": [
                  "https://www.instagram.com/Meridian.Society"
                ],
                "location": {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Ottawa",
                    "addressRegion": "ON",
                    "addressCountry": "CA"
                  }
                }
              }),
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
