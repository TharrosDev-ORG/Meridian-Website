/**
 * Utility for generating JSON-LD structured data.
 */

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Meridian Society",
    "url": "https://meridiansociety.ca",
    "logo": "https://meridiansociety.ca/logo.png", // Correct if exists
    "sameAs": [
      "https://www.instagram.com/Meridian.Society"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ottawa",
      "addressRegion": "ON",
      "addressCountry": "CA"
    }
  };
}
