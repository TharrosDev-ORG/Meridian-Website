import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://meridiansociety.ca';

  // Static lastModified bumped per content release. Avoids `new Date()` so the
  // sitemap doesn't churn on every build and signal false freshness to crawlers.
  const lastModified = new Date('2026-04-19');

  return [
    { url: baseUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/events`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/membership`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/social`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/speak`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/team`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/register`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },

  ];
}
