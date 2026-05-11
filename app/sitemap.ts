import { MetadataRoute } from 'next';

const BASE_URL = 'https://meridiansociety.ca';

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

// Priorities reflect real SEO value: homepage first, conversion funnels
// (membership / register / apply) next, content pages after, legal last.
// Change frequency reflects how often each page's content actually
// changes — the site is static, so most pages are 'monthly' or rarer.
const ROUTES: Route[] = [
  { path: '',            priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/membership', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/register',   priority: 0.9, changeFrequency: 'monthly' },
  { path: '/events',     priority: 0.8, changeFrequency: 'monthly' },
  { path: '/apply',      priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact',    priority: 0.6, changeFrequency: 'yearly'  },
  { path: '/privacy',    priority: 0.3, changeFrequency: 'yearly'  },
  { path: '/terms',      priority: 0.3, changeFrequency: 'yearly'  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
