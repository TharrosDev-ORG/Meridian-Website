/**
 * Utility for generating Structured Data (JSON-LD) for SEO.
 * This helps search engines understand the content and structure of the site.
 */

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Meridian Society",
    "url": "https://meridiansociety.ca",
    "logo": "https://meridiansociety.ca/assets/favicons/favicon-48x48.png",
    "description": "An independent student speaker forum in Ottawa connecting curious students with professionals, alumni, and scholars.",
    "sameAs": [
      "https://www.instagram.com/Meridian.Society"
    ],
    "location": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ottawa",
        "addressRegion": "ON",
        "addressCountry": "CA"
      }
    }
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith('http') ? item.item : `https://meridiansociety.ca${item.item}`,
    })),
  };
}

export function generatePersonSchema(person: {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "jobTitle": person.jobTitle,
    "description": person.description,
    "image": person.image ? `https://meridiansociety.ca${person.image}` : undefined,
    "sameAs": person.sameAs || [],
    "worksFor": {
      "@type": "Organization",
      "name": "The Meridian Society"
    }
  };
}
export function generateEventSchema(event: {
  name: string;
  startDate: string;
  endDate?: string;
  description: string;
  locationName: string;
  locationAddress?: string;
  image?: string;
  performerName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "startDate": event.startDate,
    "endDate": event.endDate || event.startDate,
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": event.locationName,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ottawa",
        "addressRegion": "ON",
        "addressCountry": "CA",
        "streetAddress": event.locationAddress || "Carleton University"
      }
    },
    "image": event.image ? `https://meridiansociety.ca${event.image}` : [
      "https://meridiansociety.ca/assets/og-image.png"
    ],
    "description": event.description,
    "performer": {
      "@type": "Person",
      "name": event.performerName || "Guest Speaker"
    },
    "organizer": {
      "@type": "Organization",
      "name": "The Meridian Society",
      "url": "https://meridiansociety.ca"
    }
  };
}
