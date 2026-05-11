import { MetadataRoute } from 'next';

const BASE_URL = 'https://meridiansociety.ca';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /api/ — internal Edge route used by the live member counter; no
        //          SEO value, and crawling it wastes the rate limit.
        // /admin/ — defensive; no admin surface is exposed today, but block
        //           any future addition from being indexed by default.
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
