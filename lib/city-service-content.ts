import birminghamContent from '@/json/birminghamcontentex.json';

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

const cityServiceContentByKey = birminghamContent as unknown as Record<string, CityServiceContentRecord>;

export function getCityServiceContent(
  serviceSlug: string,
  citySlug: string
): CityServiceContent | undefined {
  const key = `${serviceSlug}::${citySlug}`;
  const content = cityServiceContentByKey[key];

  if (!content) {
    return undefined;
  }

  return {
    ...content,
    key: content.key ?? key,
  };
}
