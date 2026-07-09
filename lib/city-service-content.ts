import { createRequire } from 'node:module';
import birminghamContent from '@/json/birminghamcontentex.json';

// Additional cities, generated per state by scripts/generate-city-content.mjs.
// Loaded with require() (not `import`) so TypeScript treats each file as
// `any` instead of inferring a full literal type for every record — with
// 230+ cities x 123 services, resolveJsonModule literal inference across
// all of these at once exceeds the type checker's default heap. Add one
// require() + spread per state as new states are generated.
const require = createRequire(import.meta.url);
const alCitiesContent = require('../json/al-cities.json');
const akCitiesContent = require('../json/ak-cities.json');
const arCitiesContent = require('../json/ar-cities.json');
const dcCitiesContent = require('../json/dc-cities.json');
const hiCitiesContent = require('../json/hi-cities.json');
const mdCitiesContent = require('../json/md-cities.json');
const mtCitiesContent = require('../json/mt-cities.json');
const ndCitiesContent = require('../json/nd-cities.json');
const riCitiesContent = require('../json/ri-cities.json');
const sdCitiesContent = require('../json/sd-cities.json');
const scCitiesContent = require('../json/sc-cities.json');
const neCitiesContent = require('../json/ne-cities.json');
const kyCitiesContent = require('../json/ky-cities.json');
const idCitiesContent = require('../json/id-cities.json');
const iaCitiesContent = require('../json/ia-cities.json');
const paCitiesContent = require('../json/pa-cities.json');
const utCitiesContent = require('../json/ut-cities.json');
const okCitiesContent = require('../json/ok-cities.json');
const nmCitiesContent = require('../json/nm-cities.json');
const laCitiesContent = require('../json/la-cities.json');
const nyCitiesContent = require('../json/ny-cities.json');
const ctCitiesContent = require('../json/ct-cities.json');
const wiCitiesContent = require('../json/wi-cities.json');
const orCitiesContent = require('../json/or-cities.json');
const nvCitiesContent = require('../json/nv-cities.json');
const ksCitiesContent = require('../json/ks-cities.json');
const moCitiesContent = require('../json/mo-cities.json');
const mnCitiesContent = require('../json/mn-cities.json');
const gaCitiesContent = require('../json/ga-cities.json');
const inCitiesContent = require('../json/in-cities.json');
const ilCitiesContent = require('../json/il-cities.json');
const ohCitiesContent = require('../json/oh-cities.json');
const njCitiesContent = require('../json/nj-cities.json');
const maCitiesContent = require('../json/ma-cities.json');
const vaCitiesContent = require('../json/va-cities.json');
const tnCitiesContent = require('../json/tn-cities.json');
const coCitiesContent = require('../json/co-cities.json');
const azCitiesContent = require('../json/az-cities.json');
const waCitiesContent = require('../json/wa-cities.json');
const ncCitiesContent = require('../json/nc-cities.json');
const miCitiesContent = require('../json/mi-cities.json');
const txCitiesContent = require('../json/tx-cities.json');

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

// Merge every city's generated content into one compound-key lookup.
// Birmingham is hand-tuned; other cities are generated per state.
const cityServiceContentByKey = {
  ...(birminghamContent as unknown as Record<string, CityServiceContentRecord>),
  ...(alCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(akCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(arCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(dcCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(hiCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(mdCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(mtCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(ndCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(riCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(sdCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(scCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(neCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(kyCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(idCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(iaCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(paCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(utCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(okCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(nmCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(laCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(nyCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(ctCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(wiCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(orCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(nvCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(ksCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(moCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(mnCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(gaCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(inCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(ilCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(ohCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(njCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(maCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(vaCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(tnCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(coCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(azCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(waCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(ncCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(miCitiesContent as unknown as Record<string, CityServiceContentRecord>),
  ...(txCitiesContent as unknown as Record<string, CityServiceContentRecord>),
};

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
