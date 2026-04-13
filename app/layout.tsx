import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Barlow_Condensed } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
  title: "The Meridian Society | Ottawa Student Speaker Forum",
  description:
    "Join The Meridian Society, Ottawa's student speaker forum. Attend free events connecting curious students with professionals, alumni, and scholars for open conversation.",
  keywords:
    "The Meridian Society, Ottawa student speaker forum, free student events Ottawa, Carleton University student events, uOttawa student events, Algonquin College student events, student-run speaker forum Ottawa, student leadership Ottawa, Ottawa professional networking students, alumni speaker series Ottawa, Ottawa intellectual student community, Carleton uOttawa Algonquin events, student speaker series Ottawa, Ottawa campus events, Ottawa student organizations, Ottawa student clubs, student society Ottawa, Ottawa guest speaker events, Ottawa panel discussions students, Ottawa lecture series, Ottawa career talks students, Ottawa mentorship students, Ottawa student life, free events Ottawa 2026, Ottawa student community, Ottawa speaker events 2026, university events Ottawa, Ottawa student society, Ottawa student conference, Ottawa professional development students, Ottawa ideas forum, student forum Canada, Ottawa intellectual events, Ottawa student discourse, Ottawa academic events, student presentations Ottawa, free Ottawa student events, Ottawa young adult events, Ottawa student engagement, speaker series Ottawa 2025 2026, Ottawa student club registration, student forum Ottawa, Ottawa open conversation events, Carleton student clubs, uOttawa student clubs, Ottawa student networking, Ottawa alumni events students, Ottawa career development students, free speaker events Ottawa",
  verification: {
    google: "google2af069010dc1ab79",
  },
  authors: [{ name: "The Meridian Society" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
    title: "The Meridian Society | Ottawa Student Speaker Forum",
    description:
      "A student-run speaker forum in Ottawa. Free events, open conversations, and a community of curious minds. For Students · By Students.",
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

import TransitionWrapper from "@/components/TransitionWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${cormorant.variable} ${barlow.variable}`}>
      <body>
        <Providers>
          <NavBar />
          <TransitionWrapper>
            {children}
          </TransitionWrapper>
          <Footer />
          <MobileMenu />
          <div className="progress" id="progressBar"></div>
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
