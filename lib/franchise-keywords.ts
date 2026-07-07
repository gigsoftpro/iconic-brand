// Franchise Marketing & Consulting Keywords Data
// ~80 high-commercial-intent keywords for programmatic SEO

export interface FranchiseKeyword {
  slug: string;
  title: string;
  category: string;
  description: string;
  metaTitle: string;
  h1Template: string;
}

// Primary High-Intent Keywords
const primaryKeywords: FranchiseKeyword[] = [
  {
    slug: "franchise-marketing-agency",
    title: "Franchise Marketing Agency",
    category: "primary",
    description: "Full-service franchise marketing solutions to grow your brand and attract qualified leads.",
    metaTitle: "Franchise Marketing Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Marketing Agency in {city}, {state}"
  },
  {
    slug: "franchise-business-consulting",
    title: "Franchise Business Consulting",
    category: "primary",
    description: "Expert franchise business consulting to optimize operations and maximize profitability.",
    metaTitle: "Franchise Business Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Business Consulting in {city}, {state}"
  },
  {
    slug: "franchise-growth-consulting",
    title: "Franchise Growth Consulting",
    category: "primary",
    description: "Strategic franchise growth consulting to scale your franchise system effectively.",
    metaTitle: "Franchise Growth Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Growth Consulting in {city}, {state}"
  },
  {
    slug: "franchise-brand-development",
    title: "Franchise Brand Development",
    category: "primary",
    description: "Comprehensive franchise brand development services to establish market presence.",
    metaTitle: "Franchise Brand Development in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Brand Development in {city}, {state}"
  },
  {
    slug: "franchise-lead-generation-agency",
    title: "Franchise Lead Generation Agency",
    category: "primary",
    description: "Targeted franchise lead generation to attract qualified franchisees and customers.",
    metaTitle: "Franchise Lead Generation Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Lead Generation Agency in {city}, {state}"
  },
  {
    slug: "franchise-digital-marketing-agency",
    title: "Franchise Digital Marketing Agency",
    category: "primary",
    description: "Digital marketing solutions tailored specifically for franchise businesses.",
    metaTitle: "Franchise Digital Marketing Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Digital Marketing Agency in {city}, {state}"
  },
  {
    slug: "franchise-advertising-services",
    title: "Franchise Advertising Services",
    category: "primary",
    description: "Strategic franchise advertising services to increase brand visibility and drive growth.",
    metaTitle: "Franchise Advertising Services in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Advertising Services in {city}, {state}"
  },
  {
    slug: "franchise-seo-services",
    title: "Franchise SEO Services",
    category: "primary",
    description: "Specialized SEO services to help franchise locations rank higher in local search.",
    metaTitle: "Franchise SEO Services in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise SEO Services in {city}, {state}"
  },
  {
    slug: "franchise-social-media-marketing",
    title: "Franchise Social Media Marketing",
    category: "primary",
    description: "Social media marketing strategies designed for franchise brand consistency.",
    metaTitle: "Franchise Social Media Marketing in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Social Media Marketing in {city}, {state}"
  },
  {
    slug: "franchise-sales-funnel-consulting",
    title: "Franchise Sales Funnel Consulting",
    category: "primary",
    description: "Optimize your franchise sales funnel to convert more leads into franchisees.",
    metaTitle: "Franchise Sales Funnel Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Sales Funnel Consulting in {city}, {state}"
  },
  {
    slug: "franchise-brand-strategy-firm",
    title: "Franchise Brand Strategy Firm",
    category: "primary",
    description: "Strategic brand consulting to position your franchise for long-term success.",
    metaTitle: "Franchise Brand Strategy Firm in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Brand Strategy Firm in {city}, {state}"
  },
  {
    slug: "franchise-operations-consulting",
    title: "Franchise Operations Consulting",
    category: "primary",
    description: "Streamline franchise operations for improved efficiency and profitability.",
    metaTitle: "Franchise Operations Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Operations Consulting in {city}, {state}"
  },
  {
    slug: "franchise-expansion-consulting",
    title: "Franchise Expansion Consulting",
    category: "primary",
    description: "Expert guidance for expanding your franchise into new territories and markets.",
    metaTitle: "Franchise Expansion Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Expansion Consulting in {city}, {state}"
  },
  {
    slug: "franchise-recruitment-marketing",
    title: "Franchise Recruitment Marketing",
    category: "primary",
    description: "Marketing strategies to attract and recruit qualified franchise candidates.",
    metaTitle: "Franchise Recruitment Marketing in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Recruitment Marketing in {city}, {state}"
  },
  {
    slug: "franchise-investor-marketing",
    title: "Franchise Investor Marketing",
    category: "primary",
    description: "Targeted marketing to attract franchise investors and funding opportunities.",
    metaTitle: "Franchise Investor Marketing in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Investor Marketing in {city}, {state}"
  }
];

// Franchise Brand (Franchisor) Focused Keywords
const franchisorKeywords: FranchiseKeyword[] = [
  {
    slug: "franchise-brand-marketing",
    title: "Franchise Brand Marketing",
    category: "franchisor",
    description: "Comprehensive brand marketing for franchise systems seeking growth.",
    metaTitle: "Franchise Brand Marketing in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Brand Marketing in {city}, {state}"
  },
  {
    slug: "franchise-system-marketing-agency",
    title: "Franchise System Marketing Agency",
    category: "franchisor",
    description: "Marketing agency specializing in franchise system-wide campaigns.",
    metaTitle: "Franchise System Marketing Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise System Marketing Agency in {city}, {state}"
  },
  {
    slug: "franchise-brand-consulting-firm",
    title: "Franchise Brand Consulting Firm",
    category: "franchisor",
    description: "Expert consulting for franchise brands looking to strengthen market position.",
    metaTitle: "Franchise Brand Consulting Firm in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Brand Consulting Firm in {city}, {state}"
  },
  {
    slug: "franchise-development-marketing",
    title: "Franchise Development Marketing",
    category: "franchisor",
    description: "Marketing strategies to support franchise development and unit growth.",
    metaTitle: "Franchise Development Marketing in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Development Marketing in {city}, {state}"
  },
  {
    slug: "franchise-territory-expansion-services",
    title: "Franchise Territory Expansion Services",
    category: "franchisor",
    description: "Strategic services to help franchises expand into new territories.",
    metaTitle: "Franchise Territory Expansion Services in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Territory Expansion Services in {city}, {state}"
  },
  {
    slug: "franchise-brand-positioning",
    title: "Franchise Brand Positioning",
    category: "franchisor",
    description: "Position your franchise brand for competitive advantage in the market.",
    metaTitle: "Franchise Brand Positioning in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Brand Positioning in {city}, {state}"
  },
  {
    slug: "franchise-rebranding-services",
    title: "Franchise Rebranding Services",
    category: "franchisor",
    description: "Complete rebranding services for franchise systems ready for transformation.",
    metaTitle: "Franchise Rebranding Services in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Rebranding Services in {city}, {state}"
  },
  {
    slug: "franchise-marketing-strategy",
    title: "Franchise Marketing Strategy",
    category: "franchisor",
    description: "Develop winning marketing strategies tailored for franchise success.",
    metaTitle: "Franchise Marketing Strategy in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Marketing Strategy in {city}, {state}"
  },
  {
    slug: "franchise-corporate-marketing-support",
    title: "Franchise Corporate Marketing Support",
    category: "franchisor",
    description: "Corporate-level marketing support for franchise headquarters.",
    metaTitle: "Franchise Corporate Marketing Support in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Corporate Marketing Support in {city}, {state}"
  },
  {
    slug: "franchise-content-marketing-agency",
    title: "Franchise Content Marketing Agency",
    category: "franchisor",
    description: "Content marketing solutions to build franchise brand authority.",
    metaTitle: "Franchise Content Marketing Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Content Marketing Agency in {city}, {state}"
  },
  {
    slug: "franchise-website-development",
    title: "Franchise Website Development",
    category: "franchisor",
    description: "Custom website development for franchise brands and locations.",
    metaTitle: "Franchise Website Development in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Website Development in {city}, {state}"
  },
  {
    slug: "franchise-crm-implementation",
    title: "Franchise CRM Implementation",
    category: "franchisor",
    description: "CRM implementation services to streamline franchise operations.",
    metaTitle: "Franchise CRM Implementation in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise CRM Implementation in {city}, {state}"
  },
  {
    slug: "franchise-automation-consulting",
    title: "Franchise Automation Consulting",
    category: "franchisor",
    description: "Automate franchise processes for improved efficiency and scalability.",
    metaTitle: "Franchise Automation Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Automation Consulting in {city}, {state}"
  },
  {
    slug: "franchise-ai-marketing-solutions",
    title: "Franchise AI Marketing Solutions",
    category: "franchisor",
    description: "AI-powered marketing solutions to give your franchise a competitive edge.",
    metaTitle: "Franchise AI Marketing Solutions in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise AI Marketing Solutions in {city}, {state}"
  },
  {
    slug: "franchise-franchisee-acquisition-marketing",
    title: "Franchise Franchisee Acquisition Marketing",
    category: "franchisor",
    description: "Marketing campaigns designed to acquire new franchisees efficiently.",
    metaTitle: "Franchisee Acquisition Marketing in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchisee Acquisition Marketing in {city}, {state}"
  }
];

// Franchise Operator (Franchisee) Focused Keywords
const franchiseeKeywords: FranchiseKeyword[] = [
  {
    slug: "marketing-for-franchise-owners",
    title: "Marketing for Franchise Owners",
    category: "franchisee",
    description: "Tailored marketing services specifically for franchise owners.",
    metaTitle: "Marketing for Franchise Owners in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Marketing for Franchise Owners in {city}, {state}"
  },
  {
    slug: "franchisee-marketing-services",
    title: "Franchisee Marketing Services",
    category: "franchisee",
    description: "Local marketing services to help franchisees grow their business.",
    metaTitle: "Franchisee Marketing Services in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchisee Marketing Services in {city}, {state}"
  },
  {
    slug: "local-marketing-for-franchisees",
    title: "Local Marketing for Franchisees",
    category: "franchisee",
    description: "Hyperlocal marketing strategies for franchise location success.",
    metaTitle: "Local Marketing for Franchisees in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Local Marketing for Franchisees in {city}, {state}"
  },
  {
    slug: "franchise-location-marketing",
    title: "Franchise Location Marketing",
    category: "franchisee",
    description: "Location-specific marketing to drive foot traffic and sales.",
    metaTitle: "Franchise Location Marketing in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Location Marketing in {city}, {state}"
  },
  {
    slug: "multi-unit-franchise-marketing",
    title: "Multi-Unit Franchise Marketing",
    category: "franchisee",
    description: "Marketing solutions for multi-unit franchise operators.",
    metaTitle: "Multi-Unit Franchise Marketing in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Multi-Unit Franchise Marketing in {city}, {state}"
  },
  {
    slug: "franchisee-business-coaching",
    title: "Franchisee Business Coaching",
    category: "franchisee",
    description: "Business coaching to help franchisees achieve their goals.",
    metaTitle: "Franchisee Business Coaching in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchisee Business Coaching in {city}, {state}"
  },
  {
    slug: "franchisee-growth-consulting",
    title: "Franchisee Growth Consulting",
    category: "franchisee",
    description: "Growth consulting for franchisees ready to scale their operations.",
    metaTitle: "Franchisee Growth Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchisee Growth Consulting in {city}, {state}"
  },
  {
    slug: "franchise-local-seo-services",
    title: "Franchise Local SEO Services",
    category: "franchisee",
    description: "Local SEO services to improve franchise visibility in local search.",
    metaTitle: "Franchise Local SEO Services in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Local SEO Services in {city}, {state}"
  },
  {
    slug: "franchise-google-ads-management",
    title: "Franchise Google Ads Management",
    category: "franchisee",
    description: "Expert Google Ads management for franchise locations.",
    metaTitle: "Franchise Google Ads Management in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Google Ads Management in {city}, {state}"
  },
  {
    slug: "franchise-social-media-management",
    title: "Franchise Social Media Management",
    category: "franchisee",
    description: "Social media management to build local franchise engagement.",
    metaTitle: "Franchise Social Media Management in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Social Media Management in {city}, {state}"
  },
  {
    slug: "franchise-reputation-management",
    title: "Franchise Reputation Management",
    category: "franchisee",
    description: "Protect and enhance your franchise location's online reputation.",
    metaTitle: "Franchise Reputation Management in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Reputation Management in {city}, {state}"
  },
  {
    slug: "franchise-customer-acquisition-services",
    title: "Franchise Customer Acquisition Services",
    category: "franchisee",
    description: "Customer acquisition strategies to grow your franchise customer base.",
    metaTitle: "Franchise Customer Acquisition in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Customer Acquisition Services in {city}, {state}"
  }
];

// Business Consulting + Franchise Combined Keywords
const consultingKeywords: FranchiseKeyword[] = [
  {
    slug: "franchise-business-strategy-consulting",
    title: "Franchise Business Strategy Consulting",
    category: "consulting",
    description: "Strategic business consulting to optimize franchise performance.",
    metaTitle: "Franchise Business Strategy Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Business Strategy Consulting in {city}, {state}"
  },
  {
    slug: "franchise-operational-efficiency-consulting",
    title: "Franchise Operational Efficiency Consulting",
    category: "consulting",
    description: "Improve operational efficiency across your franchise system.",
    metaTitle: "Franchise Operational Efficiency Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Operational Efficiency Consulting in {city}, {state}"
  },
  {
    slug: "franchise-systems-consulting",
    title: "Franchise Systems Consulting",
    category: "consulting",
    description: "Systems consulting to standardize and scale franchise operations.",
    metaTitle: "Franchise Systems Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Systems Consulting in {city}, {state}"
  },
  {
    slug: "franchise-profitability-consulting",
    title: "Franchise Profitability Consulting",
    category: "consulting",
    description: "Maximize franchise profitability with expert consulting.",
    metaTitle: "Franchise Profitability Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Profitability Consulting in {city}, {state}"
  },
  {
    slug: "franchise-scaling-consulting",
    title: "Franchise Scaling Consulting",
    category: "consulting",
    description: "Scale your franchise system with proven growth strategies.",
    metaTitle: "Franchise Scaling Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Scaling Consulting in {city}, {state}"
  },
  {
    slug: "franchise-launch-consulting",
    title: "Franchise Launch Consulting",
    category: "consulting",
    description: "Launch your franchise successfully with expert guidance.",
    metaTitle: "Franchise Launch Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Launch Consulting in {city}, {state}"
  },
  {
    slug: "franchise-startup-consulting",
    title: "Franchise Startup Consulting",
    category: "consulting",
    description: "Consulting services for new franchise startups and emerging brands.",
    metaTitle: "Franchise Startup Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Startup Consulting in {city}, {state}"
  },
  {
    slug: "franchise-business-mentorship",
    title: "Franchise Business Mentorship",
    category: "consulting",
    description: "Mentorship programs for franchise owners and operators.",
    metaTitle: "Franchise Business Mentorship in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Business Mentorship in {city}, {state}"
  },
  {
    slug: "franchise-executive-advisory",
    title: "Franchise Executive Advisory",
    category: "consulting",
    description: "Executive-level advisory services for franchise leadership.",
    metaTitle: "Franchise Executive Advisory in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Executive Advisory in {city}, {state}"
  },
  {
    slug: "franchise-leadership-coaching",
    title: "Franchise Leadership Coaching",
    category: "consulting",
    description: "Leadership coaching to develop strong franchise management.",
    metaTitle: "Franchise Leadership Coaching in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Leadership Coaching in {city}, {state}"
  }
];

// Marketing + Consulting Hybrid Keywords
const hybridKeywords: FranchiseKeyword[] = [
  {
    slug: "franchise-marketing-and-consulting",
    title: "Franchise Marketing and Consulting",
    category: "hybrid",
    description: "Integrated marketing and consulting services for franchise success.",
    metaTitle: "Franchise Marketing and Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Marketing and Consulting in {city}, {state}"
  },
  {
    slug: "full-service-franchise-marketing-firm",
    title: "Full Service Franchise Marketing Firm",
    category: "hybrid",
    description: "Full-service marketing firm dedicated to franchise growth.",
    metaTitle: "Full Service Franchise Marketing Firm in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Full Service Franchise Marketing Firm in {city}, {state}"
  },
  {
    slug: "franchise-brand-growth-partner",
    title: "Franchise Brand Growth Partner",
    category: "hybrid",
    description: "Your strategic partner for franchise brand growth and success.",
    metaTitle: "Franchise Brand Growth Partner in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Brand Growth Partner in {city}, {state}"
  },
  {
    slug: "strategic-franchise-marketing",
    title: "Strategic Franchise Marketing",
    category: "hybrid",
    description: "Strategic marketing approaches for franchise market dominance.",
    metaTitle: "Strategic Franchise Marketing in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Strategic Franchise Marketing in {city}, {state}"
  },
  {
    slug: "franchise-marketing-automation",
    title: "Franchise Marketing Automation",
    category: "hybrid",
    description: "Automate your franchise marketing for efficiency and scale.",
    metaTitle: "Franchise Marketing Automation in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Marketing Automation in {city}, {state}"
  },
  {
    slug: "franchise-analytics-consulting",
    title: "Franchise Analytics Consulting",
    category: "hybrid",
    description: "Data-driven analytics consulting for informed franchise decisions.",
    metaTitle: "Franchise Analytics Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Analytics Consulting in {city}, {state}"
  },
  {
    slug: "franchise-marketing-systems",
    title: "Franchise Marketing Systems",
    category: "hybrid",
    description: "Build scalable marketing systems for your franchise network.",
    metaTitle: "Franchise Marketing Systems in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Marketing Systems in {city}, {state}"
  },
  {
    slug: "done-for-you-franchise-marketing",
    title: "Done For You Franchise Marketing",
    category: "hybrid",
    description: "Complete done-for-you marketing solutions for franchise businesses.",
    metaTitle: "Done For You Franchise Marketing in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Done For You Franchise Marketing in {city}, {state}"
  }
];

// Technology & AI-Driven Franchise Keywords
const technologyKeywords: FranchiseKeyword[] = [
  {
    slug: "ai-marketing-for-franchises",
    title: "AI Marketing for Franchises",
    category: "technology",
    description: "Leverage AI-powered marketing to accelerate franchise growth.",
    metaTitle: "AI Marketing for Franchises in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "AI Marketing for Franchises in {city}, {state}"
  },
  {
    slug: "crm-for-franchise-systems",
    title: "CRM for Franchise Systems",
    category: "technology",
    description: "CRM solutions designed specifically for franchise operations.",
    metaTitle: "CRM for Franchise Systems in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "CRM for Franchise Systems in {city}, {state}"
  },
  {
    slug: "ai-lead-generation-for-franchises",
    title: "AI Lead Generation for Franchises",
    category: "technology",
    description: "AI-powered lead generation to fuel franchise growth.",
    metaTitle: "AI Lead Generation for Franchises in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "AI Lead Generation for Franchises in {city}, {state}"
  },
  {
    slug: "franchise-tech-consulting",
    title: "Franchise Tech Consulting",
    category: "technology",
    description: "Technology consulting to modernize franchise operations.",
    metaTitle: "Franchise Tech Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Tech Consulting in {city}, {state}"
  },
  {
    slug: "franchise-digital-transformation",
    title: "Franchise Digital Transformation",
    category: "technology",
    description: "Digital transformation services for forward-thinking franchises.",
    metaTitle: "Franchise Digital Transformation in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Digital Transformation in {city}, {state}"
  },
  {
    slug: "franchise-software-implementation",
    title: "Franchise Software Implementation",
    category: "technology",
    description: "Expert software implementation for franchise systems.",
    metaTitle: "Franchise Software Implementation in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Software Implementation in {city}, {state}"
  }
];

// Investor & Expansion Focused Keywords
const investorKeywords: FranchiseKeyword[] = [
  {
    slug: "franchise-expansion-strategy",
    title: "Franchise Expansion Strategy",
    category: "investor",
    description: "Strategic planning for successful franchise expansion.",
    metaTitle: "Franchise Expansion Strategy in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Expansion Strategy in {city}, {state}"
  },
  {
    slug: "franchise-deal-flow-marketing",
    title: "Franchise Deal Flow Marketing",
    category: "investor",
    description: "Marketing to increase franchise deal flow and opportunities.",
    metaTitle: "Franchise Deal Flow Marketing in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Deal Flow Marketing in {city}, {state}"
  },
  {
    slug: "franchise-capital-raise-consulting",
    title: "Franchise Capital Raise Consulting",
    category: "investor",
    description: "Consulting services to help franchises raise capital effectively.",
    metaTitle: "Franchise Capital Raise Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Capital Raise Consulting in {city}, {state}"
  },
  {
    slug: "franchise-pitch-deck-agency",
    title: "Franchise Pitch Deck Agency",
    category: "investor",
    description: "Create compelling pitch decks to attract franchise investors.",
    metaTitle: "Franchise Pitch Deck Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Pitch Deck Agency in {city}, {state}"
  },
  {
    slug: "franchise-growth-investment-consulting",
    title: "Franchise Growth Investment Consulting",
    category: "investor",
    description: "Investment consulting for franchise growth and expansion.",
    metaTitle: "Franchise Growth Investment Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Franchise Growth Investment Consulting in {city}, {state}"
  }
];

// ═══════════════════════════════════════════════════════
// SEO GOAL-ALIGNED KEYWORDS (Categories 1–6 from SEO Roadmap)
// These target the broader startup/business/marketing audience
// per the Comprehensive Keyword Master List
// ═══════════════════════════════════════════════════════

// Category 1: Startup Consulting & Business Growth
const startupConsultingKeywords: FranchiseKeyword[] = [
  {
    slug: "startup-consulting",
    title: "Startup Consulting",
    category: "startup",
    description: "Expert startup consulting to help entrepreneurs launch, grow, and scale their business with proven strategies.",
    metaTitle: "Startup Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Startup Consulting in {city}, {state}"
  },
  {
    slug: "business-consulting",
    title: "Business Consulting",
    category: "startup",
    description: "Strategic business consulting services for companies seeking growth, efficiency, and competitive advantage.",
    metaTitle: "Business Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Business Consulting in {city}, {state}"
  },
  {
    slug: "business-growth-consulting",
    title: "Business Growth Consulting",
    category: "startup",
    description: "Accelerate your business growth with data-driven consulting strategies tailored to your market.",
    metaTitle: "Business Growth Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Business Growth Consulting in {city}, {state}"
  },
  {
    slug: "startup-advisory-services",
    title: "Startup Advisory Services",
    category: "startup",
    description: "Comprehensive advisory services for startup founders navigating early-stage challenges and growth.",
    metaTitle: "Startup Advisory Services in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Startup Advisory Services in {city}, {state}"
  },
  {
    slug: "business-consulting-firm",
    title: "Business Consulting Firm",
    category: "startup",
    description: "Full-service business consulting firm delivering strategic planning, operations, and growth solutions.",
    metaTitle: "Business Consulting Firm in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Business Consulting Firm in {city}, {state}"
  },
  {
    slug: "startup-consulting-agency",
    title: "Startup Consulting Agency",
    category: "startup",
    description: "Startup consulting agency helping entrepreneurs build, launch, and scale successful businesses.",
    metaTitle: "Startup Consulting Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Startup Consulting Agency in {city}, {state}"
  },
  {
    slug: "business-development-consulting",
    title: "Business Development Consulting",
    category: "startup",
    description: "Drive revenue and partnerships with strategic business development consulting services.",
    metaTitle: "Business Development Consulting {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Business Development Consulting in {city}, {state}"
  },
  {
    slug: "startup-growth-consultants",
    title: "Startup Growth Consultants",
    category: "startup",
    description: "Experienced startup growth consultants providing actionable strategies for rapid, sustainable scaling.",
    metaTitle: "Startup Growth Consultants in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Startup Growth Consultants in {city}, {state}"
  },
  {
    slug: "business-scaling-consultants",
    title: "Business Scaling Consultants",
    category: "startup",
    description: "Scale your business efficiently with expert consultants who specialize in growth-stage operations.",
    metaTitle: "Business Scaling Consultants in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Business Scaling Consultants in {city}, {state}"
  },
  {
    slug: "startup-strategy-consulting",
    title: "Startup Strategy Consulting",
    category: "startup",
    description: "Strategic consulting for startups building winning go-to-market strategies and business models.",
    metaTitle: "Startup Strategy Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Startup Strategy Consulting in {city}, {state}"
  },
  {
    slug: "startup-advisor",
    title: "Startup Advisor",
    category: "startup",
    description: "Trusted startup advisor providing strategic guidance on product, growth, and fundraising.",
    metaTitle: "Startup Advisor in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Startup Advisor in {city}, {state}"
  },
  {
    slug: "business-consulting-services",
    title: "Business Consulting Services",
    category: "startup",
    description: "Comprehensive business consulting services for companies of all sizes seeking growth and operational excellence.",
    metaTitle: "Business Consulting Services in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Business Consulting Services in {city}, {state}"
  },
  {
    slug: "startup-consulting-services",
    title: "Startup Consulting Services",
    category: "startup",
    description: "End-to-end startup consulting services from ideation to scaling — strategy, operations, and fundraising.",
    metaTitle: "Startup Consulting Services in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Startup Consulting Services in {city}, {state}"
  },
  {
    slug: "startup-accelerator-services",
    title: "Startup Accelerator Services",
    category: "startup",
    description: "Accelerator-style consulting for startups seeking rapid growth through mentorship, resources, and strategy.",
    metaTitle: "Startup Accelerator Services in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Startup Accelerator Services in {city}, {state}"
  },
  {
    slug: "consulting-firm-for-startups",
    title: "Consulting Firm for Startups",
    category: "startup",
    description: "Specialized consulting firm for startups delivering actionable strategies for launch, growth, and scale.",
    metaTitle: "Consulting Firm for Startups in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Consulting Firm for Startups in {city}, {state}"
  },
  {
    slug: "startup-mentorship-programs",
    title: "Startup Mentorship Programs",
    category: "startup",
    description: "Structured mentorship programs connecting startup founders with experienced business leaders and advisors.",
    metaTitle: "Startup Mentorship Programs in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Startup Mentorship Programs in {city}, {state}"
  },
  {
    slug: "business-strategy-firm",
    title: "Business Strategy Firm",
    category: "startup",
    description: "Business strategy firm helping companies develop competitive positioning, market entry plans, and growth roadmaps.",
    metaTitle: "Business Strategy Firm in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Business Strategy Firm in {city}, {state}"
  },
];

// Category 2: Marketing Agency & Brand Development
const marketingAgencyKeywords: FranchiseKeyword[] = [
  {
    slug: "marketing-agency",
    title: "Marketing Agency",
    category: "marketing",
    description: "Full-service marketing agency delivering brand strategy, digital campaigns, and measurable growth.",
    metaTitle: "Marketing Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Marketing Agency in {city}, {state}"
  },
  {
    slug: "digital-marketing-agency",
    title: "Digital Marketing Agency",
    category: "marketing",
    description: "Results-driven digital marketing agency specializing in SEO, paid media, social, and content strategy.",
    metaTitle: "Digital Marketing Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Digital Marketing Agency in {city}, {state}"
  },
  {
    slug: "branding-agency",
    title: "Branding Agency",
    category: "marketing",
    description: "Strategic branding agency that builds memorable brands through identity, messaging, and positioning.",
    metaTitle: "Branding Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Branding Agency in {city}, {state}"
  },
  {
    slug: "marketing-agency-for-startups",
    title: "Marketing Agency for Startups",
    category: "marketing",
    description: "Specialized marketing agency helping startups build brand awareness, acquire customers, and scale fast.",
    metaTitle: "Marketing Agency for Startups in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Marketing Agency for Startups in {city}, {state}"
  },
  {
    slug: "content-marketing-agency",
    title: "Content Marketing Agency",
    category: "marketing",
    description: "Content marketing agency creating high-impact content strategies that drive organic growth and authority.",
    metaTitle: "Content Marketing Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Content Marketing Agency in {city}, {state}"
  },
  {
    slug: "social-media-marketing-company",
    title: "Social Media Marketing Company",
    category: "marketing",
    description: "Expert social media marketing to build your brand presence, engage audiences, and drive conversions.",
    metaTitle: "Social Media Marketing in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Social Media Marketing Company in {city}, {state}"
  },
  {
    slug: "performance-marketing-agency",
    title: "Performance Marketing Agency",
    category: "marketing",
    description: "Data-driven performance marketing agency focused on ROI, customer acquisition, and scalable growth.",
    metaTitle: "Performance Marketing Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Performance Marketing Agency in {city}, {state}"
  },
  {
    slug: "creative-marketing-agency",
    title: "Creative Marketing Agency",
    category: "marketing",
    description: "Creative marketing agency blending strategy with compelling creative to build unforgettable brands.",
    metaTitle: "Creative Marketing Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Creative Marketing Agency in {city}, {state}"
  },
  {
    slug: "marketing-consultants",
    title: "Marketing Consultants",
    category: "marketing",
    description: "Expert marketing consultants providing strategic guidance on brand, digital, and growth marketing.",
    metaTitle: "Marketing Consultants in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Marketing Consultants in {city}, {state}"
  },
  {
    slug: "startup-marketing-strategy",
    title: "Startup Marketing Strategy",
    category: "marketing",
    description: "Build and execute a winning marketing strategy for your startup — from brand positioning to customer acquisition.",
    metaTitle: "Startup Marketing Strategy in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Startup Marketing Strategy in {city}, {state}"
  },
  {
    slug: "marketing-and-branding-agency",
    title: "Marketing & Branding Agency",
    category: "marketing",
    description: "Full-service marketing and branding agency creating cohesive brand experiences that drive growth.",
    metaTitle: "Marketing & Branding Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Marketing & Branding Agency in {city}, {state}"
  },
  {
    slug: "digital-marketing-services",
    title: "Digital Marketing Services",
    category: "marketing",
    description: "Comprehensive digital marketing services including SEO, paid media, social, and content for growing businesses.",
    metaTitle: "Digital Marketing Services in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Digital Marketing Services in {city}, {state}"
  },
  {
    slug: "startup-marketing-experts",
    title: "Startup Marketing Experts",
    category: "marketing",
    description: "Startup marketing experts who understand the unique challenges of building brand awareness on a budget.",
    metaTitle: "Startup Marketing Experts in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Startup Marketing Experts in {city}, {state}"
  },
  {
    slug: "marketing-consultants-for-entrepreneurs",
    title: "Marketing Consultants for Entrepreneurs",
    category: "marketing",
    description: "Marketing consultants specializing in helping entrepreneurs build effective, scalable marketing systems.",
    metaTitle: "Marketing Consultants for Entrepreneurs {city} | Iconic Brand Group",
    h1Template: "Marketing Consultants for Entrepreneurs in {city}, {state}"
  },
  {
    slug: "multimedia-marketing-agency",
    title: "Multimedia Marketing Agency",
    category: "marketing",
    description: "Multimedia marketing agency creating video, audio, visual, and interactive campaigns that engage audiences.",
    metaTitle: "Multimedia Marketing Agency in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Multimedia Marketing Agency in {city}, {state}"
  },
];

// Category 3: Business Operations & Strategy
const businessOpsKeywords: FranchiseKeyword[] = [
  {
    slug: "business-operations-consulting",
    title: "Business Operations Consulting",
    category: "operations",
    description: "Optimize your business operations for efficiency, scalability, and profitability with expert consulting.",
    metaTitle: "Business Operations Consulting {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Business Operations Consulting in {city}, {state}"
  },
  {
    slug: "process-optimization-consulting",
    title: "Process Optimization Consulting",
    category: "operations",
    description: "Streamline business processes and eliminate inefficiencies with proven optimization frameworks.",
    metaTitle: "Process Optimization Consulting {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Process Optimization Consulting in {city}, {state}"
  },
  {
    slug: "business-management-consulting",
    title: "Business Management Consulting",
    category: "operations",
    description: "Expert management consulting to strengthen leadership, operations, and organizational performance.",
    metaTitle: "Business Management Consulting {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Business Management Consulting in {city}, {state}"
  },
  {
    slug: "operations-improvement-firm",
    title: "Operations Improvement Firm",
    category: "operations",
    description: "Operational improvement firm helping businesses streamline workflows, reduce costs, and scale efficiently.",
    metaTitle: "Operations Improvement Firm in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Operations Improvement Firm in {city}, {state}"
  },
  {
    slug: "organizational-development-consulting",
    title: "Organizational Development Consulting",
    category: "operations",
    description: "Organizational development consulting to build high-performing teams, culture, and leadership pipelines.",
    metaTitle: "Organizational Development Consulting {city} | Iconic Brand Group",
    h1Template: "Organizational Development Consulting in {city}, {state}"
  },
  {
    slug: "small-business-efficiency-consultants",
    title: "Small Business Efficiency Consultants",
    category: "operations",
    description: "Efficiency consultants for small businesses seeking to optimize operations and improve margins.",
    metaTitle: "Small Business Efficiency Consultants {city} | Iconic Brand Group",
    h1Template: "Small Business Efficiency Consultants in {city}, {state}"
  },
];

// Category 4: Funding & Investor Keywords
const fundingKeywords: FranchiseKeyword[] = [
  {
    slug: "startup-funding-consulting",
    title: "Startup Funding Consulting",
    category: "funding",
    description: "Prepare your startup for fundraising with expert consulting on pitch decks, investor strategy, and capital raising.",
    metaTitle: "Startup Funding Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Startup Funding Consulting in {city}, {state}"
  },
  {
    slug: "investor-relations-consulting",
    title: "Investor Relations Consulting",
    category: "funding",
    description: "Build strong investor relationships with strategic IR consulting, reporting, and communication.",
    metaTitle: "Investor Relations Consulting {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Investor Relations Consulting in {city}, {state}"
  },
  {
    slug: "fundraising-strategy-consulting",
    title: "Fundraising Strategy Consulting",
    category: "funding",
    description: "Develop a winning fundraising strategy with expert guidance on capital raising and investor outreach.",
    metaTitle: "Fundraising Strategy Consulting {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Fundraising Strategy Consulting in {city}, {state}"
  },
  {
    slug: "venture-consulting-firm",
    title: "Venture Consulting Firm",
    category: "funding",
    description: "Venture consulting firm advising startups on fundraising, investor acquisition, and growth equity strategies.",
    metaTitle: "Venture Consulting Firm in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Venture Consulting Firm in {city}, {state}"
  },
  {
    slug: "capital-raising-consulting",
    title: "Capital Raising Consulting",
    category: "funding",
    description: "Capital raising consulting to help startups and growing businesses secure seed, Series A, and growth funding.",
    metaTitle: "Capital Raising Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Capital Raising Consulting in {city}, {state}"
  },
  {
    slug: "venture-strategy-consultants",
    title: "Venture Strategy Consultants",
    category: "funding",
    description: "Strategic consultants specializing in venture-backed growth, fundraising roadmaps, and investor positioning.",
    metaTitle: "Venture Strategy Consultants in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Venture Strategy Consultants in {city}, {state}"
  },
];

// Category 6: Entrepreneur & Small Business Keywords
const entrepreneurKeywords: FranchiseKeyword[] = [
  {
    slug: "entrepreneur-consulting",
    title: "Entrepreneur Consulting",
    category: "entrepreneur",
    description: "Consulting services for entrepreneurs at every stage — from idea validation to scaling and exit.",
    metaTitle: "Entrepreneur Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Entrepreneur Consulting in {city}, {state}"
  },
  {
    slug: "small-business-consulting",
    title: "Small Business Consulting",
    category: "entrepreneur",
    description: "Affordable small business consulting to improve operations, marketing, and profitability.",
    metaTitle: "Small Business Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Small Business Consulting in {city}, {state}"
  },
  {
    slug: "business-advisor",
    title: "Business Advisor",
    category: "entrepreneur",
    description: "Experienced business advisor providing strategic guidance for growth, funding, and market positioning.",
    metaTitle: "Business Advisor in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Business Advisor in {city}, {state}"
  },
  {
    slug: "business-mentor-for-startups",
    title: "Business Mentor for Startups",
    category: "entrepreneur",
    description: "Startup mentorship from experienced business leaders who have built and scaled successful companies.",
    metaTitle: "Business Mentor for Startups in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Business Mentor for Startups in {city}, {state}"
  },
  {
    slug: "consulting-for-entrepreneurs",
    title: "Consulting for Entrepreneurs",
    category: "entrepreneur",
    description: "Growth-focused consulting for entrepreneurs building, launching, and scaling their ventures.",
    metaTitle: "Consulting for Entrepreneurs {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Consulting for Entrepreneurs in {city}, {state}"
  },
  {
    slug: "entrepreneur-growth-consulting",
    title: "Entrepreneur Growth Consulting",
    category: "entrepreneur",
    description: "Growth consulting for entrepreneurs seeking to scale revenue, expand markets, and build sustainable businesses.",
    metaTitle: "Entrepreneur Growth Consulting in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Entrepreneur Growth Consulting in {city}, {state}"
  },
  {
    slug: "consulting-firm-for-small-business-owners",
    title: "Consulting Firm for Small Business Owners",
    category: "entrepreneur",
    description: "Consulting firm dedicated to helping small business owners improve profitability, operations, and growth.",
    metaTitle: "Consulting for Small Business Owners in {city} | Iconic Brand Group",
    h1Template: "Consulting Firm for Small Business Owners in {city}, {state}"
  },
  {
    slug: "business-development-for-founders",
    title: "Business Development for Founders",
    category: "entrepreneur",
    description: "Business development consulting for founders looking to build partnerships, revenue channels, and market presence.",
    metaTitle: "Business Development for Founders in {city}, {stateCode} | Iconic Brand Group",
    h1Template: "Business Development for Founders in {city}, {state}"
  },
];

// Combine all keywords (franchise + SEO goal-aligned)
export const allFranchiseKeywords: FranchiseKeyword[] = [
  ...primaryKeywords,
  ...franchisorKeywords,
  ...franchiseeKeywords,
  ...consultingKeywords,
  ...hybridKeywords,
  ...technologyKeywords,
  ...investorKeywords,
  // SEO Goal-aligned keywords (Categories 1–6)
  ...startupConsultingKeywords,
  ...marketingAgencyKeywords,
  ...businessOpsKeywords,
  ...fundingKeywords,
  ...entrepreneurKeywords,
];

// Get all keyword slugs for static generation
export function getAllKeywordSlugs(): string[] {
  return allFranchiseKeywords.map(k => k.slug);
}

// Get keyword by slug
export function getKeywordBySlug(slug: string): FranchiseKeyword | undefined {
  return allFranchiseKeywords.find(k => k.slug === slug);
}

// Get keywords by category
export function getKeywordsByCategory(category: string): FranchiseKeyword[] {
  return allFranchiseKeywords.filter(k => k.category === category);
}

// Export category arrays for reference
export const keywordCategories = {
  primary: primaryKeywords,
  franchisor: franchisorKeywords,
  franchisee: franchiseeKeywords,
  consulting: consultingKeywords,
  hybrid: hybridKeywords,
  technology: technologyKeywords,
  investor: investorKeywords,
  // SEO Goal-aligned categories
  startup: startupConsultingKeywords,
  marketing: marketingAgencyKeywords,
  operations: businessOpsKeywords,
  funding: fundingKeywords,
  entrepreneur: entrepreneurKeywords,
};

// Determine if keyword is startup/business focused (vs franchise-only)
export function isStartupKeyword(slug: string): boolean {
  const k = getKeywordBySlug(slug);
  if (!k) return false;
  return ['startup', 'marketing', 'operations', 'funding', 'entrepreneur'].includes(k.category);
}

export const TOTAL_KEYWORDS = allFranchiseKeywords.length;
