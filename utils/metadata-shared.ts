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
    'Ottawa Career Readiness', 'Higher Education Networking', 'Ottawa Student Leadership',
    'Speaker Forum Canada', 'Student Engagement Ottawa', 'Post-Secondary Dialogue', 'Ottawa Student Community'
  ]
};

export function getMetadata(options: {
  title: string;
  description?: string;
  urlPath?: string;
  type?: 'website' | 'article';
  keywords?: string | string[];
  image?: string;
  robots?: string;
}): Metadata {
  const { 
    title, 
    description = SITE_CONFIG.description, 
    urlPath = '', 
    type = 'website', 
    keywords = [],
    image = '/assets/og-image.png',
    robots = 'index, follow'
  } = options;
  
  const url = `${SITE_CONFIG.url}${urlPath}`;
  const fullTitle = `${SITE_CONFIG.name} | ${title}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`;

  // Combine global keywords with page-specific ones
  const combinedKeywords = Array.isArray(keywords) 
    ? [...SITE_CONFIG.keywords, ...keywords] 
    : [...SITE_CONFIG.keywords, keywords];

  return {
    title: fullTitle,
    description,
    keywords: combinedKeywords,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: { canonical: urlPath },
    robots: {
      index: robots.includes('index'),
      follow: robots.includes('follow'),
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: SITE_CONFIG.twitter,
    },
    icons: {
      icon: [
        { url: '/assets/favicons/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
        { url: '/assets/favicons/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
        { url: '/assets/favicons/favicon.png', type: 'image/png', sizes: '512x512' },
        { url: '/assets/favicons/favicon.ico', type: 'image/x-icon' }
      ],
      shortcut: '/assets/favicons/favicon.ico',
      apple: '/assets/favicons/apple-touch-icon.png'
    },
    other: {
      'apple-mobile-web-app-title': SITE_CONFIG.name,
    }
  };
}
