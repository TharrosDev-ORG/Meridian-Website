import { Metadata } from 'next';

const SITE_CONFIG = {
  name: 'The Meridian Society',
  url: 'https://meridiansociety.ca',
  description: 'An independent, student-run organization connecting motivated Ottawa students with the professionals, alumni, and scholars who can expand their world.',
  locale: 'en_CA',
  twitter: '@MeridianSociety', // Assuming this is the handle
};

export function getMetadata(options: {
  title: string;
  description?: string;
  urlPath?: string;
  type?: 'website' | 'article';
}): Metadata {
  const { title, description = SITE_CONFIG.description, urlPath = '', type = 'website' } = options;
  const url = `${SITE_CONFIG.url}${urlPath}`;
  const fullTitle = `${title} | ${SITE_CONFIG.name}`;

  return {
    title: fullTitle,
    description,
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
