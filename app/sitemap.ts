import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://meridiansociety.ca';
  const lastModified = new Date();

  const routes = [
    '',
    '/events',
    '/membership',
    '/apply',
    '/register',
    '/contact',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '/events' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
