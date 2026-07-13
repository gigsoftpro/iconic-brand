import { cache } from 'react';
import { sql, initDb } from '@/lib/db';

export interface CityServiceContent {
  key: string;
  hero: {
    headline: string;
    subtext: string;
    trustBadges: string[];
  };
  tldr: string;
  overview: {
    secondaryParagraph: string;
  };
  whyDifferent: {
    title: string;
    description: string;
  }[];
  differentiation: {
    differentLabel: string;
    differentHeadingLead: string;
    differentHeadingHighlight: string;
    differentIntro: string;
    valueLabel: string;
    valueHeadingLead: string;
    valueHeadingHighlight: string;
    valueIntro: string;
    valueClosing: string;
  };
  valuePillars: {
    money: string;
    time: string;
    risk: string;
    status: string;
  };
  trustedPartner: {
    heading: string;
    body80Words: string;
    testimonial: {
      quote: string;
      name: string;
      role: string;
      industry: string;
    };
    fiveQuickFacts: string[];
  };
  definition: {
    term: string;
    definition: string;
    keyComponents: string[];
  };
  expertQuote: {
    quote: string;
    name: string;
    title: string;
    context: string;
  };
  marketData: {
    populationRange: string;
    businessCount: string;
    medianHouseholdIncome: string;
    yearOverYearGrowth: string;
    smallBusinessShare: string;
    primaryIndustryFocus: string;
    source: string;
  };
  marketAnalysis: {
    heading: string;
    body40Words: string;
    bullets: {
      marketOpportunity: string;
      keyChallenge: string;
      ourStrategy: string;
    };
    snapshot: {
      marketRegion: string;
      metroArea: string;
      marketClassification: string;
      state: string;
    };
  };
  services: {
    heading: string;
    subtext: string;
    items: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  industries: {
    heading: string;
    intro: string;
    tags: string[];
    painPoints: string[];
  };
  commonMistakes: {
    heading: string;
    subtext: string;
    items: {
      mistake: string;
      consequence: string;
      solution: string;
    }[];
  };
  caseStudy: {
    badge: string;
    headline: string;
    result: string;
    description: string;
    industry: string;
    delivered: string[];
  };
  process: {
    heading: string;
    subtext: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  sources: {
    text: string;
    source: string;
  }[];
}

type CityServiceContentRecord = Omit<CityServiceContent, 'key'> & {
  key?: string;
};

// City-service content lives in Postgres (table `city_service_content`,
// synced from json/ by scripts/migrate-content-to-db.mjs and
// scripts/generate-city-content.mjs --sync-db) rather than bundled JSON —
// at 42,000+ records / 800MB+, require()-ing every state's JSON into one
// merged object made the Vercel production build hang while bundling/tracing
// the module graph. Wrapped in React's cache() so the two call sites in
// app/[keyword]/[location]/page.tsx (generateMetadata + the page body) share
// one DB round trip per render instead of querying twice.
export const getCityServiceContent = cache(async (
  serviceSlug: string,
  citySlug: string
): Promise<CityServiceContent | undefined> => {
  const key = `${serviceSlug}::${citySlug}`;
  try {
    await initDb();
    const rows = await sql`
      SELECT content FROM city_service_content
      WHERE service_slug = ${serviceSlug} AND city_slug = ${citySlug}
      LIMIT 1
    `;
    if (rows.length === 0) {
      return undefined;
    }
    const content = rows[0].content as CityServiceContentRecord;
    return {
      ...content,
      key: content.key ?? key,
    };
  } catch (err) {
    console.error(`getCityServiceContent(${key}) failed:`, err);
    return undefined;
  }
});
