import { Metadata } from 'next'

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  location?: string;
  service?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: "website" | "article";
  };
  twitter?: {
    card?: "summary" | "summary_large_image";
    title?: string;
    description?: string;
    image?: string;
  };
  structuredData?: object;
}

// Dynamic CTA system for titles and descriptions
export function addDynamicCTA(baseText: string, location?: string, service?: string, isTitle: boolean = false): string {
  const maxLength = isTitle ? 60 : 160;
  const currentLength = baseText.length;
  const remainingChars = maxLength - currentLength;
  
  // CTA options ordered by priority and length
  const titleCTAs = [
    " | Get Quote",      // 12 chars
    " | Call Now",       // 11 chars  
    " | 24/7",          // 6 chars
    " | Free",          // 7 chars
  ];
  
  const descriptionCTAs = [
    " Call for free quote!",           // 21 chars
    " Book consultation online.",       // 26 chars
    " Get your free quote today.",     // 25 chars
    " Call now for expert help.",      // 24 chars
    " Contact us today.",              // 16 chars
    " Get started now.",               // 17 chars
    " Call today.",                    // 12 chars
  ];
  
  const ctas = isTitle ? titleCTAs : descriptionCTAs;
  
  // Find the longest CTA that fits
  for (const cta of ctas) {
    if (remainingChars >= cta.length) {
      return baseText + cta;
    }
  }
  
  return baseText; // Return original if no CTA fits
}

// Enhanced title optimization
export function optimizeTitle(title: string, location?: string, service?: string): string {
  // Ensure title is within 50-60 characters
  if (title.length > 60) {
    // Truncate and add ellipsis, but try to keep important keywords
    const truncated = title.substring(0, 57) + "...";
    return truncated;
  }
  
  if (title.length < 50) {
    // Try to add dynamic CTA
    return addDynamicCTA(title, location, service, true);
  }
  
  return title;
}

// Enhanced description optimization  
export function optimizeDescription(description: string, location?: string, service?: string): string {
  // Ensure description is within 150-160 characters
  if (description.length > 160) {
    // Truncate at word boundary near 157 chars to leave room for ellipsis
    const truncated = description.substring(0, 157);
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.substring(0, lastSpace) + "...";
  }
  
  if (description.length < 140) {
    // Try to add dynamic CTA
    return addDynamicCTA(description, location, service, false);
  }
  
  return description;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const { title, description, keywords, canonical, location, service, openGraph, twitter } = config;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.iconicbrandgroup.com";
  
  // Optimize title and description with dynamic CTAs
  const optimizedTitle = optimizeTitle(title, location, service);
  const optimizedDescription = optimizeDescription(description, location, service);
  
  // Optimize OpenGraph titles and descriptions separately
  const ogTitle = openGraph?.title ? optimizeTitle(openGraph.title, location, service) : optimizedTitle;
  const ogDescription = openGraph?.description ? optimizeDescription(openGraph.description, location, service) : optimizedDescription;
  
  // Optimize Twitter titles and descriptions
  const twitterTitle = twitter?.title ? optimizeTitle(twitter.title, location, service) : optimizedTitle;
  const twitterDescription = twitter?.description ? optimizeDescription(twitter.description, location, service) : optimizedDescription;

  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: keywords?.join(", "),
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : undefined,
    },

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      siteName: "Iconic Brand Group",
      images: openGraph?.image
        ? [
            {
              url: `${baseUrl}${openGraph.image}`,
              width: 1200,
              height: 630,
              alt: ogTitle,
            },
          ]
        : [
            {
              url: `${baseUrl}/brand/full-logo-coloured.png`,
              width: 1200,
              height: 630,
              alt: ogTitle,
            },
          ],
      locale: "en_US",
      type: openGraph?.type || "website",
    },

    twitter: {
      card: twitter?.card || "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: twitter?.image ? [`${baseUrl}${twitter.image}`] : [`${baseUrl}/brand/full-logo-coloured.png`],
      creator: "@iconicbrandgroup",
      site: "@iconicbrandgroup",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    
    other: {
      "msapplication-TileColor": "#D5AF34",
      "theme-color": "#D5AF34",
    },
  };
}

// Structured Data Generators
export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.iconicbrandgroup.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Iconic Brand Group',
    description: 'Strategic consulting and innovative marketing solutions that transform businesses into industry leaders.',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/brand/full-logo-coloured.png`,
      width: '600',
      height: '60'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://linkedin.com/company/iconicbrandgroup',
      'https://twitter.com/iconicbrandgroup',
      'https://facebook.com/iconicbrandgroup'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    }
  }
}

export function generateServiceSchema(service: {
  name: string
  description: string
  provider: string
  areaServed?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider
    },
    areaServed: service.areaServed || 'Worldwide',
    serviceType: 'Business Consulting'
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  datePublished?: string
  dateModified?: string
  author?: string
  image?: string
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.iconicbrandgroup.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: article.author || 'Iconic Brand Group'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Iconic Brand Group',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/brand/full-logo-coloured.png`,
        width: '600',
        height: '60'
      }
    },
    image: article.image ? `${baseUrl}${article.image}` : `${baseUrl}/og-default.jpg`
  }
}

export function generateWebPageSchema(page: {
  name: string
  description: string
  url: string
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.iconicbrandgroup.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.name,
    description: page.description,
    url: `${baseUrl}${page.url}`,
    publisher: {
      '@type': 'Organization',
      name: 'Iconic Brand Group'
    },
    inLanguage: 'en-US'
  }
}