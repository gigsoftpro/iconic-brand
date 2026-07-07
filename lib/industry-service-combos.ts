// ═══════════════════════════════════════════════════════════════════
// Industry-Service Combinations for 3-axis programmatic SEO
// Route: /industries/[industry]/[service]/[city]
// Example: /industries/tech/startup-consulting/miami-fl
//
// Cat 7 from SEO Goals: industry-specific service pages
// Only top high-intent combos to avoid thin content (MCP OOPSEO)
// ═══════════════════════════════════════════════════════════════════

export interface IndustryServiceCombo {
  industrySlug: string;
  industryName: string;
  /** Subset of keyword slugs (from franchise-keywords.ts) relevant to this industry */
  keywordSlugs: string[];
  /** Custom intro templates per keyword slug */
  introTemplates: Record<string, string>;
  /** Custom value propositions per keyword slug */
  valueProps: Record<string, string[]>;
}

export const industryServiceCombos: IndustryServiceCombo[] = [
  {
    industrySlug: 'tech',
    industryName: 'Tech & Software',
    keywordSlugs: [
      'startup-consulting',
      'business-growth-consulting',
      'branding-agency',
      'digital-marketing-agency',
      'startup-funding-consulting',
    ],
    introTemplates: {
      'startup-consulting':
        'Tech startups need more than generic advice — they need a consulting partner who understands product-market fit, SaaS metrics, and the speed at which technology markets evolve. Iconic Brand Group delivers {keyword} for tech companies in {city}, {stateCode}, helping founders build go-to-market strategies, refine positioning, and scale efficiently.',
      'business-growth-consulting':
        'Scaling a tech company in {city} requires a growth engine that balances customer acquisition, product development, and operational efficiency. Our {keyword} for tech companies helps SaaS businesses and software firms in {city}, {stateCode} build repeatable, data-driven growth systems.',
      'branding-agency':
        'In the crowded tech landscape, brand is your moat. Our {keyword} services for tech companies in {city}, {stateCode} help startups and software firms build differentiated brands that stand out, attract talent, and win enterprise deals.',
      'digital-marketing-agency':
        'Tech-focused digital marketing requires a deep understanding of developer audiences, SaaS buyer journeys, and technical content. Our {keyword} for tech companies in {city}, {stateCode} drives qualified traffic, signups, and demos through SEO, content, and paid channels.',
      'startup-funding-consulting':
        'Raising capital for a tech startup in {city} requires more than a great product — you need a compelling narrative, solid metrics, and the right investor connections. Our {keyword} for tech companies in {city}, {stateCode} prepares founders for seed rounds through Series C.',
    },
    valueProps: {
      'startup-consulting': [
        'Deep understanding of SaaS metrics (MRR, churn, CAC/LTV)',
        'Go-to-market strategy for B2B and B2C tech products',
        'Product-market fit validation and pivot advisory',
        'Tech team scaling and organizational design',
      ],
      'business-growth-consulting': [
        'Revenue growth modeling for SaaS and software',
        'Customer acquisition channel diversification',
        'Pricing strategy optimization',
        'Market expansion and vertical targeting',
      ],
      'branding-agency': [
        'Tech brand positioning against competitors',
        'Developer-focused brand voice and messaging',
        'Visual identity for digital-first companies',
        'Employer branding to attract top talent',
      ],
      'digital-marketing-agency': [
        'Technical SEO for SaaS and software websites',
        'Content marketing for developer audiences',
        'Paid media with SaaS-specific attribution',
        'Conversion rate optimization for free trials and demos',
      ],
      'startup-funding-consulting': [
        'Pitch deck development and storytelling',
        'Financial modeling and projections',
        'Investor targeting and warm introductions',
        'Due diligence preparation and data room setup',
      ],
    },
  },
  {
    industrySlug: 'healthcare',
    industryName: 'Healthcare & MedTech',
    keywordSlugs: [
      'startup-consulting',
      'business-growth-consulting',
      'branding-agency',
      'digital-marketing-agency',
    ],
    introTemplates: {
      'startup-consulting':
        'Healthcare is one of the most complex industries to build a business in — regulatory hurdles, long sales cycles, and the need for absolute trust. Our {keyword} for healthcare companies in {city}, {stateCode} helps medtech startups and health organizations navigate these challenges and scale sustainably.',
      'business-growth-consulting':
        'Growing a healthcare business in {city} requires balancing compliance, quality of care, and business performance. Our {keyword} for healthcare companies in {city}, {stateCode} helps health organizations build sustainable growth strategies that respect regulatory requirements.',
      'branding-agency':
        'Trust is the foundation of healthcare brands. Our {keyword} for healthcare companies in {city}, {stateCode} builds credible, professional brand identities that resonate with patients, providers, and partners.',
      'digital-marketing-agency':
        'Healthcare digital marketing must balance effectiveness with compliance. Our {keyword} for healthcare companies in {city}, {stateCode} delivers HIPAA-conscious campaigns across SEO, content, and paid channels.',
    },
    valueProps: {
      'startup-consulting': [
        'Compliance-aware business strategy (HIPAA, FDA)',
        'Medtech go-to-market planning',
        'Healthcare partnership and distribution strategy',
        'Clinical validation and credibility building',
      ],
      'business-growth-consulting': [
        'Multi-location healthcare scaling',
        'Patient acquisition and retention strategies',
        'Revenue cycle optimization',
        'Telehealth and digital health integration',
      ],
      'branding-agency': [
        'Patient-centered brand messaging',
        'Professional healthcare visual identity',
        'Physician and provider trust building',
        'Healthcare employer branding',
      ],
      'digital-marketing-agency': [
        'HIPAA-compliant marketing campaigns',
        'Healthcare SEO and local search optimization',
        'Patient education content marketing',
        'Physician referral marketing programs',
      ],
    },
  },
  {
    industrySlug: 'finance',
    industryName: 'Finance & Fintech',
    keywordSlugs: [
      'startup-consulting',
      'business-growth-consulting',
      'branding-agency',
      'startup-funding-consulting',
    ],
    introTemplates: {
      'startup-consulting':
        'Fintech is reshaping financial services, but building in this space requires navigating regulation, earning trust, and differentiating in a crowded market. Our {keyword} for fintech companies in {city}, {stateCode} helps founders and financial firms build compliant, scalable businesses.',
      'business-growth-consulting':
        'Growing a financial services company in {city} demands strategic precision — the cost of customer acquisition is high, and regulatory missteps are costly. Our {keyword} for fintech companies in {city}, {stateCode} helps financial organizations grow efficiently.',
      'branding-agency':
        'Financial brands must project trust, security, and innovation. Our {keyword} for fintech companies in {city}, {stateCode} builds brand identities that inspire confidence while differentiating from legacy institutions.',
      'startup-funding-consulting':
        'Raising capital for a fintech startup requires sector expertise and regulatory awareness. Our {keyword} for fintech companies in {city}, {stateCode} prepares founders with compelling materials, financial models, and investor introductions.',
    },
    valueProps: {
      'startup-consulting': [
        'Regulatory navigation (SEC, FINRA, state licensing)',
        'Fintech product strategy and pricing',
        'Banking partnership and API integration guidance',
        'Compliance-first go-to-market planning',
      ],
      'business-growth-consulting': [
        'Customer acquisition cost optimization',
        'Financial product diversification strategy',
        'Enterprise sales enablement for B2B fintech',
        'Market expansion across state lines',
      ],
      'branding-agency': [
        'Trust-building brand architecture',
        'Consumer and enterprise financial brand design',
        'Fintech thought leadership positioning',
        'Competitive differentiation against legacy banks',
      ],
      'startup-funding-consulting': [
        'Fintech-specific investor targeting',
        'Regulatory compliance narratives for investors',
        'Financial projections and unit economics',
        'Series A–C fundraising strategy',
      ],
    },
  },
  {
    industrySlug: 'ecommerce',
    industryName: 'eCommerce & DTC',
    keywordSlugs: [
      'marketing-agency',
      'branding-agency',
      'social-media-marketing-company',
      'business-growth-consulting',
    ],
    introTemplates: {
      'marketing-agency':
        'eCommerce success in {city} depends on mastering multiple marketing channels — from paid social to SEO to email. Our {keyword} for ecommerce brands in {city}, {stateCode} builds multi-channel strategies that drive profitable sales growth.',
      'branding-agency':
        'In a sea of online stores, brand is what separates winners from commodities. Our {keyword} for ecommerce brands in {city}, {stateCode} builds DTC brands that command premium pricing and customer loyalty.',
      'social-media-marketing-company':
        'Social media is the discovery engine for ecommerce. Our {keyword} for ecommerce brands in {city}, {stateCode} creates Instagram, TikTok, and Pinterest strategies that turn scrollers into buyers.',
      'business-growth-consulting':
        'Scaling an ecommerce brand profitably takes more than great products. Our {keyword} for ecommerce brands in {city}, {stateCode} optimizes unit economics, diversifies channels, and builds the operational foundation for scale.',
    },
    valueProps: {
      'marketing-agency': [
        'Multi-channel ecommerce marketing (paid, organic, email)',
        'ROAS-focused campaign management',
        'Customer lifecycle marketing automation',
        'Marketplace strategy (Amazon, Walmart, etc.)',
      ],
      'branding-agency': [
        'DTC brand identity and packaging design',
        'Brand storytelling and content strategy',
        'Premium positioning and pricing strategy',
        'Customer experience design',
      ],
      'social-media-marketing-company': [
        'Instagram and TikTok commerce strategies',
        'Influencer marketing and UGC programs',
        'Shoppable content and social storefronts',
        'Community building and brand ambassadors',
      ],
      'business-growth-consulting': [
        'Unit economics optimization (CAC, LTV, AOV)',
        'Inventory and supply chain strategy',
        'Channel diversification planning',
        'International expansion readiness',
      ],
    },
  },
  {
    industrySlug: 'real-estate',
    industryName: 'Real Estate',
    keywordSlugs: [
      'business-consulting',
      'branding-agency',
      'digital-marketing-agency',
    ],
    introTemplates: {
      'business-consulting':
        'Real estate in {city} is relationship-driven and hyper-local. Our {keyword} for real estate companies in {city}, {stateCode} helps developers, brokerages, and proptech firms build scalable business models and enter new markets.',
      'branding-agency':
        'In real estate, your brand is your reputation. Our {keyword} for real estate companies in {city}, {stateCode} builds trusted brands that generate referrals and command market leadership.',
      'digital-marketing-agency':
        'Real estate buyers and sellers start online. Our {keyword} for real estate companies in {city}, {stateCode} delivers high-quality leads through local SEO, Google Ads, and targeted social campaigns.',
    },
    valueProps: {
      'business-consulting': [
        'Multi-market expansion strategy',
        'Brokerage and team scaling advisory',
        'Proptech integration and digital transformation',
        'Revenue diversification for real estate firms',
      ],
      'branding-agency': [
        'Luxury and boutique real estate branding',
        'Multi-location brand consistency',
        'Developer and new construction branding',
        'Agent personal brand development',
      ],
      'digital-marketing-agency': [
        'Hyperlocal SEO for real estate markets',
        'Google Ads for property listings and leads',
        'Social media for real estate agents and developers',
        'Content marketing around market insights',
      ],
    },
  },
  {
    industrySlug: 'hospitality',
    industryName: 'Hospitality & Tourism',
    keywordSlugs: [
      'branding-agency',
      'social-media-marketing-company',
      'digital-marketing-agency',
    ],
    introTemplates: {
      'branding-agency':
        'Hospitality is an experience — and that experience starts with your brand. Our {keyword} for hospitality businesses in {city}, {stateCode} creates emotional, memorable brands for hotels, restaurants, and tourism companies.',
      'social-media-marketing-company':
        'Hospitality thrives on visual storytelling. Our {keyword} for hospitality businesses in {city}, {stateCode} creates stunning social media campaigns that inspire travel, drive bookings, and build community.',
      'digital-marketing-agency':
        'Reducing OTA dependency starts with direct digital marketing. Our {keyword} for hospitality businesses in {city}, {stateCode} builds direct booking channels through SEO, email, and targeted advertising.',
    },
    valueProps: {
      'branding-agency': [
        'Hospitality brand identity and visual design',
        'Guest experience and brand touchpoint mapping',
        'Restaurant and hotel brand positioning',
        'Multi-property brand architecture',
      ],
      'social-media-marketing-company': [
        'Visual-first Instagram and TikTok strategies',
        'Influencer partnerships and press trips',
        'User-generated content and review campaigns',
        'Seasonal campaign planning',
      ],
      'digital-marketing-agency': [
        'Direct booking optimization and conversion',
        'Local SEO for hospitality businesses',
        'OTA reduction and commission savings',
        'Reputation management (Google, TripAdvisor, Yelp)',
      ],
    },
  },
  {
    industrySlug: 'fitness-wellness',
    industryName: 'Fitness & Wellness',
    keywordSlugs: [
      'branding-agency',
      'social-media-marketing-company',
      'business-growth-consulting',
    ],
    introTemplates: {
      'branding-agency':
        'Fitness brands that inspire action win members. Our {keyword} for fitness and wellness companies in {city}, {stateCode} creates energetic, motivating brand identities that differentiate from the competition.',
      'social-media-marketing-company':
        'Social media is the #1 discovery channel for fitness brands. Our {keyword} for fitness businesses in {city}, {stateCode} builds community, drives memberships, and turns members into advocates.',
      'business-growth-consulting':
        'Growing a fitness business in {city} means mastering retention, pricing, and community. Our {keyword} for fitness and wellness companies in {city}, {stateCode} builds the strategic foundation for multi-location growth.',
    },
    valueProps: {
      'branding-agency': [
        'Fitness brand identity and visual language',
        'Athleisure and wellness lifestyle branding',
        'Franchise-ready brand systems',
        'Instructor and influencer personal branding',
      ],
      'social-media-marketing-company': [
        'Instagram Reels and TikTok workout content',
        'Community building and member spotlights',
        'Challenge and transformation campaigns',
        'Ambassador and referral programs',
      ],
      'business-growth-consulting': [
        'Membership growth and retention optimization',
        'Pricing strategy and revenue per member',
        'Multi-location expansion planning',
        'Digital offering (app/virtual) integration',
      ],
    },
  },
];

/**
 * Get the combo data for a given industry + keyword pair
 */
export function getIndustryServiceCombo(
  industrySlug: string,
  keywordSlug: string
): { combo: IndustryServiceCombo; introTemplate: string; valueProps: string[] } | null {
  const combo = industryServiceCombos.find(c => c.industrySlug === industrySlug);
  if (!combo) return null;
  if (!combo.keywordSlugs.includes(keywordSlug)) return null;

  const introTemplate = combo.introTemplates[keywordSlug] ?? '';
  const valueProps = combo.valueProps[keywordSlug] ?? [];

  return { combo, introTemplate, valueProps };
}

/**
 * Get all valid industry-keyword-location triples for sitemap/SSG
 */
export function getAllIndustryServiceSlugs(): { industry: string; keyword: string }[] {
  const results: { industry: string; keyword: string }[] = [];
  for (const combo of industryServiceCombos) {
    for (const kw of combo.keywordSlugs) {
      results.push({ industry: combo.industrySlug, keyword: kw });
    }
  }
  return results;
}
