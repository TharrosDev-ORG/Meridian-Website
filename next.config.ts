import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' va.vercel-scripts.com;
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
  async headers() {
    return [
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
      { source: "/Team.html", destination: "/team", permanent: true },
      { source: "/team.html", destination: "/team", permanent: true },
      { source: "/membership.html", destination: "/membership", permanent: true },
      { source: "/social.html", destination: "/social", permanent: true },
      { source: "/speak.html", destination: "/speak", permanent: true },
    ];
  },
};

export default nextConfig;
