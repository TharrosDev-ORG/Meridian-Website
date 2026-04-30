import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://meridiansociety.ca';
  const lastModified = new Date();

  const routes = [
    '',
    '/events',
    '/calendar',
    '/team',
    '/speak',
    '/membership',
    '/social',
    '/contact',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '/calendar' || route === '/events' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
