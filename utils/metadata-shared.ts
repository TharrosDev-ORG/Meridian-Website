import { Metadata } from 'next';

const SITE_CONFIG = {
  name: 'The Meridian Society',
  url: 'https://meridiansociety.ca',
  description: 'An independent, student-run community in Ottawa. The Meridian Society connects motivated students with professionals through our curated speaker forum and vibrant social events. Built by students, for students.',
  locale: 'en_CA',
  twitter: '@MeridianSociety',
  keywords: [
    'Meridian Society', 'Ottawa Student Speaker Forum', 'Undergraduate Speaker Series',
    'Academic Dialogue Ottawa', 'Professional Networking for Students', 'Career Orientation Students',
    'Independent Student Org', 'Ottawa Campus Community', 'Student-Led Professional Development',
    'Carleton University Student Club', 'uOttawa Campus Life', 'Algonquin College Events',
    'Youth Leadership Ottawa', 'Intellectual Community Students', 'Ottawa Networking Events',
    'Academic Social Groups Ottawa', 'Student Mentorship Connections', 'Campus Intellectual Life',
    'Ottawa Career Readiness', 'Higher Education Networking'
  ]
};

export function getMetadata(options: {
  title: string;
  description?: string;
  urlPath?: string;
  type?: 'website' | 'article';
  keywords?: string | string[];
}): Metadata {
  const { title, description = SITE_CONFIG.description, urlPath = '', type = 'website', keywords = [] } = options;
  const url = `${SITE_CONFIG.url}${urlPath}`;
  const fullTitle = `${SITE_CONFIG.name} | ${title}`;

  // Combine global keywords with page-specific ones
  const combinedKeywords = Array.isArray(keywords) 
    ? [...SITE_CONFIG.keywords, ...keywords] 
    : [...SITE_CONFIG.keywords, keywords];

  return {
    title: fullTitle,
    description,
    keywords: combinedKeywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
