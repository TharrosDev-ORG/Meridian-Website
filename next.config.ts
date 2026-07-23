import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self' docs.google.com;
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
    connect-src 'self' va.vercel-scripts.com va.vercel-speed-insights.com dsyiuztquzkcikehkigv.supabase.co wss://dsyiuztquzkcikehkigv.supabase.co;
`.replace(/\n/g, '').replace(/\s{2,}/g, ' ').trim();

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root: a stray lockfile in the user directory
    // otherwise makes Turbopack guess wrong and warn on every dev boot.
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  async headers() {
    return [
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/Index.html", destination: "/", permanent: true },
      { source: "/events.html", destination: "/events", permanent: true },
      { source: "/membership.html", destination: "/membership", permanent: true },
      // Consolidated routes — old standalone pages now live as homepage / events sections.
      // The team section was retired, so these land on the About chapter instead.
      { source: "/team", destination: "/#about", permanent: true },
      { source: "/Team.html", destination: "/#about", permanent: true },
      { source: "/team.html", destination: "/#about", permanent: true },
      { source: "/social", destination: "/events#social", permanent: true },
      { source: "/social.html", destination: "/events#social", permanent: true },
      { source: "/speak", destination: "/apply", permanent: true },
      { source: "/speak.html", destination: "/apply", permanent: true },
      { source: "/calendar", destination: "/events", permanent: true },
      { source: "/calendar.html", destination: "/events", permanent: true },
      // Q&A chatbot removed 2026-06 — FAQ lives on the membership page
      { source: "/qa", destination: "/membership#faq", permanent: true },
    ];
  },
};

export default nextConfig;
