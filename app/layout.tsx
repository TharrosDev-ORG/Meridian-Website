import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Barlow_Condensed } from "next/font/google";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollProgress from "@/components/ScrollProgress";
import { generateOrganizationSchema } from "@/utils/jsonld";
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
  title: "The Meridian Society | Ottawa Student Speaker Forum & Social Community",
  description:
    "An independent, student-run community in Ottawa. The Meridian Society connects motivated students with professionals through our curated speaker forum and vibrant social events. Built by students, for students.",
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
    title: "The Meridian Society | Ottawa Student Speaker Forum & Social Community",
    description: "An independent, student-run community in Ottawa. The Meridian Society connects motivated students with professionals through our curated speaker forum and vibrant social events. Built by students, for students.",
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
    title: "The Meridian Society | Ottawa Student Speaker Forum & Social Community",
    description:
      "An independent, student-run community in Ottawa. The Meridian Society connects motivated students with professionals through our curated speaker forum and vibrant social events. Built by students, for students.",
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
          {/* JSON-LD Organization Schema (site-wide; sourced from utils/jsonld) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateOrganizationSchema()),
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
