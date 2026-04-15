import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/_next/', '/scratch/', '/*.html'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'CCBot', 'Google-Extended'],
        disallow: '/',
      }
    ],
    sitemap: 'https://meridiansociety.ca/sitemap.xml',
  };
}
