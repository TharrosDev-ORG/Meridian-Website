import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/proxy/', '/admin/'],
    },
    sitemap: 'https://meridiansociety.ca/sitemap.xml',
  };
}
