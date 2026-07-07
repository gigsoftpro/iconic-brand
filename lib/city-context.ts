// ═══════════════════════════════════════════════════════════════════
// City Context: Unique content per city for MCP content differentiation
// Source: SEO Goals CSV "Rationale" column + industry mapping
// MCP Requirement: "Each page MUST have unique value" — no thin/duplicate content
// ═══════════════════════════════════════════════════════════════════

export interface CityContext {
  /** Key industries/sectors for this city (from CSV rationale) */
  industries: string[];
  /** One-line rationale from the city targets CSV */
  rationale: string;
  /** Unique paragraph about why this city is relevant for consulting/marketing */
  uniqueParagraph: string;
  /** City-specific pain points that consulting/marketing can solve */
  painPoints: string[];
  /** Relevant service keywords to emphasize for this city */
  serviceEmphasis: string[];
}

// Industry-to-service mapping per MCP Category 5 (Target Industry Programmatic Keywords)
const industryServiceMap: Record<string, { painPoints: string[]; services: string[] }> = {
  'tech': {
    painPoints: ['Scaling engineering teams while maintaining product quality', 'Standing out in a saturated market with differentiated positioning', 'Building sustainable growth beyond initial VC funding'],
    services: ['startup consulting', 'digital marketing', 'brand strategy', 'growth consulting'],
  },
  'fintech': {
    painPoints: ['Navigating complex regulatory compliance across jurisdictions', 'Building consumer trust in a crowded financial services landscape', 'Scaling customer acquisition cost-effectively'],
    services: ['startup consulting', 'investor relations', 'brand development', 'performance marketing'],
  },
  'biotech': {
    painPoints: ['Long go-to-market timelines demanding sustained investor confidence', 'Translating complex science into compelling market narratives', 'Recruiting specialized talent in competitive corridors'],
    services: ['business consulting', 'fundraising strategy', 'content marketing', 'brand positioning'],
  },
  'healthcare': {
    painPoints: ['Meeting compliance requirements while scaling operations', 'Reaching patients and providers through digital channels', 'Differentiating in a trust-driven industry'],
    services: ['operations consulting', 'digital marketing', 'brand development', 'content strategy'],
  },
  'saas': {
    painPoints: ['Reducing churn and improving net revenue retention', 'Achieving product-market fit in competitive SaaS verticals', 'Building a scalable go-to-market engine'],
    services: ['startup consulting', 'performance marketing', 'growth strategy', 'content marketing'],
  },
  'ecommerce': {
    painPoints: ['Rising customer acquisition costs on paid channels', 'Building brand loyalty in a commoditized market', 'Optimizing conversion rates across the funnel'],
    services: ['marketing agency', 'social media marketing', 'brand development', 'performance marketing'],
  },
  'defense': {
    painPoints: ['Navigating government procurement processes', 'Building B2G brand awareness with decision makers', 'Scaling from a single contract to a diversified portfolio'],
    services: ['business consulting', 'operations consulting', 'brand strategy', 'business development'],
  },
  'logistics': {
    painPoints: ['Optimizing supply chain operations for profitability', 'Building a brand in a commoditized service industry', 'Adopting technology to stay competitive'],
    services: ['business operations consulting', 'digital marketing', 'process optimization'],
  },
  'energy': {
    painPoints: ['Transitioning from legacy to renewable business models', 'Reaching new markets during the energy transition', 'Communicating sustainability credibly to stakeholders'],
    services: ['business consulting', 'brand development', 'investor relations', 'marketing strategy'],
  },
  'creative': {
    painPoints: ['Monetizing creative talent and skills sustainably', 'Standing out in a fragmented creator economy', 'Scaling creative businesses beyond solo founder'],
    services: ['branding agency', 'marketing agency', 'content marketing', 'growth consulting'],
  },
  'manufacturing': {
    painPoints: ['Digitizing operations for efficiency and cost reduction', 'Finding skilled workers in tight labor markets', 'Expanding into new markets and verticals'],
    services: ['business operations consulting', 'business development', 'digital marketing'],
  },
  'university': {
    painPoints: ['Commercializing research into viable startups', 'Attracting seed and pre-seed funding for new ventures', 'Competing with established companies for talent and attention'],
    services: ['startup consulting', 'startup advisory services', 'fundraising strategy', 'brand development'],
  },
  'smb': {
    painPoints: ['Limited marketing budget requiring high-ROI strategies', 'Competing with larger brands for local customers', 'Building operational efficiency to improve margins'],
    services: ['small business consulting', 'digital marketing', 'marketing agency', 'business advisor'],
  },
  'ai': {
    painPoints: ['Communicating AI value propositions to non-technical buyers', 'Ethical AI positioning and differentiation', 'Scaling teams while navigating rapid technology shifts'],
    services: ['startup consulting', 'brand strategy', 'content marketing', 'investor relations'],
  },
  'real-estate': {
    painPoints: ['Differentiating in a saturated local market with high competition', 'Building trust and credibility with investors and buyers', 'Scaling a real estate business across multiple markets'],
    services: ['business consulting', 'digital marketing', 'brand development', 'investor relations'],
  },
  'hospitality': {
    painPoints: ['Managing seasonal demand fluctuations and occupancy rates', 'Building a memorable brand in a crowded hospitality landscape', 'Adapting to digital-first booking and guest experience expectations'],
    services: ['marketing agency', 'brand strategy', 'social media marketing', 'content marketing'],
  },
  'fitness-wellness': {
    painPoints: ['Retaining members and reducing churn in subscription models', 'Standing out among national chains and boutique competitors', 'Building community-driven brand loyalty in local markets'],
    services: ['branding agency', 'social media marketing', 'content marketing', 'growth consulting'],
  },
};

/**
 * Parse a city's rationale string into industry tags.
 * e.g., "Fintech, crypto, LatAm gateway" → ['fintech', 'finance', 'ecommerce']
 */
function rationaleToIndustries(rationale: string): string[] {
  const r = rationale.toLowerCase();
  const matched: string[] = [];

  // Order matters: more specific matches first
  if (r.includes('biotech') || r.includes('medtech') || r.includes('pharma')) matched.push('biotech');
  if (r.includes('healthcare') || r.includes('health tech') || r.includes('med ')) matched.push('healthcare');
  if (r.includes('fintech') || r.includes('finance') || r.includes('crypto') || r.includes('banking')) matched.push('fintech');
  if (r.includes('saas') || r.includes('software') || r.includes('enterprise')) matched.push('saas');
  if (r.includes('ai') || r.includes('machine learning') || r.includes('deep tech')) matched.push('ai');
  if (r.includes('defense') || r.includes('aerospace') || r.includes('military') || r.includes('cyber')) matched.push('defense');
  if (r.includes('logistics') || r.includes('port') || r.includes('supply chain')) matched.push('logistics');
  if (r.includes('energy') || r.includes('clean tech') || r.includes('sustainability') || r.includes('climate')) matched.push('energy');
  if (r.includes('tech') && !matched.includes('fintech') && !matched.includes('biotech') && !matched.includes('ai')) matched.push('tech');
  if (r.includes('creative') || r.includes('design') || r.includes('media') || r.includes('film') || r.includes('creator')) matched.push('creative');
  if (r.includes('manufacturing') || r.includes('industrial')) matched.push('manufacturing');
  if (r.includes('university') || r.includes('research') || r.includes('spinout')) matched.push('university');
  if (r.includes('ecommerce') || r.includes('dtc') || r.includes('d2c') || r.includes('retail')) matched.push('ecommerce');
  if (r.includes('real estate') || r.includes('property') || r.includes('housing')) matched.push('real-estate');
  if (r.includes('hospitality') || r.includes('hotel') || r.includes('restaurant') || r.includes('tourism') || r.includes('resort')) matched.push('hospitality');
  if (r.includes('fitness') || r.includes('wellness') || r.includes('yoga') || r.includes('gym') || r.includes('health & wellness')) matched.push('fitness-wellness');
  if (r.includes('smb') || r.includes('small business')) matched.push('smb');

  // Default fallback
  if (matched.length === 0) matched.push('smb');

  return matched;
}

// ── City Context Data ──────────────────────────────────────────
// Mapped from the 500-city CSV. Key = slug, value = rationale string.
// Only includes cities with meaningful rationale from the SEO goals CSV.
const cityRationales: Record<string, string> = {
  'san-francisco-ca': 'Top VC density, global startup epicenter',
  'new-york-ny': 'Largest US business community, capital markets access',
  'san-jose-ca': 'Silicon Valley core, deep tech talent',
  'austin-tx': 'Fastest-growing startup hub, tech migration',
  'los-angeles-ca': 'Media, creator economy, DTC brands',
  'seattle-wa': 'Big tech ecosystem, cloud, AI',
  'boston-ma': 'Biotech, deep tech, elite universities',
  'miami-fl': 'Fintech, crypto, LatAm gateway',
  'chicago-il': 'Diverse industry base, corporate HQs',
  'denver-co': 'Outdoors/lifestyle tech, SaaS growth',
  'atlanta-ga': 'Fintech, logistics, film industry',
  'dallas-tx': 'Corporate relocations, enterprise tech',
  'san-diego-ca': 'Biotech, defense, lifestyle brands',
  'houston-tx': 'Energy transition, med tech',
  'portland-or': 'Design, DTC, sustainability',
  'phoenix-az': 'Semiconductors, rapid population growth',
  'washington-dc': 'GovTech, cybersecurity, think tanks',
  'nashville-tn': 'Healthcare, media, startup culture',
  'charlotte-nc': 'Banking/fintech hub',
  'tampa-fl': 'Cybersecurity, fintech, defense',
  'orlando-fl': 'Simulation, hospitality tech',
  'jacksonville-fl': 'Logistics, fintech',
  'minneapolis-mn': 'Medtech, retail tech',
  'columbus-oh': 'Data/AI, retail, Intel fabs',
  'pittsburgh-pa': 'Robotics, AI, universities',
  'philadelphia-pa': 'Healthcare, finance, edtech',
  'detroit-mi': 'Mobility, advanced manufacturing',
  'raleigh-nc': 'Research Triangle, biotech',
  'salt-lake-city-ut': 'Silicon Slopes enterprise SaaS',
  'indianapolis-in': 'Logistics, sports tech',
  'kansas-city-mo': 'Agtech, logistics',
  'st-louis-mo': 'Agtech, healthcare',
  'baltimore-md': 'Cyber, healthcare',
  'oklahoma-city-ok': 'Energy transition, aero',
  'las-vegas-nv': 'Hospitality tech, esports',
  'louisville-ky': 'Logistics, bourbon/CPG',
  'milwaukee-wi': 'Manufacturing, water tech',
  'albuquerque-nm': 'Aerospace, national labs',
  'tucson-az': 'Aerospace, university',
  'fresno-ca': 'Agtech, SMB',
  'memphis-tn': 'Logistics (FedEx), medtech',
  'fort-worth-tx': 'Aero/defense, logistics',
  'el-paso-tx': 'Logistics, cross-border trade',
  'san-antonio-tx': 'Cybersecurity, defense',
  'sacramento-ca': 'GovTech, SMB',
  'mesa-az': 'Growth corridor',
  'omaha-ne': 'Fintech, enterprise',
  'boise-id': 'Semiconductors, outdoor tech',
  'richmond-va': 'Fintech, logistics',
  'ann-arbor-mi': 'University-led tech, mobility',
};

/**
 * Get unique context for a city based on its rationale from the SEO goals.
 * Uses state-level fallback rationales (not generic "Growing business hub") per MCP.
 */
export function getCityContext(slug: string, city: string, state: string, market: string, tier?: string): CityContext {
  // Priority: city-specific rationale → state-level industry fallback → generic
  const { getStateFallbackRationale, generateRichUniqueParagraph } = require('./geo-content');
  const rationale = cityRationales[slug] || getStateFallbackRationale(state) || `Diverse business ecosystem in ${state}`;
  const industries = rationaleToIndustries(rationale);
  const primaryIndustry = industries[0];
  const industryData = industryServiceMap[primaryIndustry] || industryServiceMap['smb']!;

  // Build a unique paragraph using actual city data (not just name-swapping per MCP)
  const industryNames = industries
    .map(i => i.charAt(0).toUpperCase() + i.slice(1))
    .join(', ');

  // Use richer paragraph generator with 10 templates instead of 3
  const uniqueParagraph = generateRichUniqueParagraph(city, state, market, rationale, industryNames, primaryIndustry, tier || 'secondary');

  return {
    industries,
    rationale,
    uniqueParagraph,
    painPoints: industryData.painPoints,
    serviceEmphasis: industryData.services,
  };
}

function generateUniqueParagraph(
  city: string,
  state: string,
  market: string,
  rationale: string,
  industryNames: string,
  primaryIndustry: string
): string {
  // Create genuinely differentiated content per MCP Content Differentiation requirement
  const cityLower = city.toLowerCase();
  const primaryLabel = primaryIndustry.charAt(0).toUpperCase() + primaryIndustry.slice(1);

  const templates = [
    `${city}'s position as a hub for ${rationale.toLowerCase()} creates distinct opportunities — and challenges — for startups and established businesses alike. The ${market} market demands strategies that account for local competitive dynamics in ${industryNames.toLowerCase()} while capitalizing on ${city}'s unique strengths. Iconic Brand Group brings deep expertise in the industries driving ${city}'s economy, delivering consulting and marketing strategies grounded in real market intelligence.`,

    `With its strong foundation in ${rationale.toLowerCase()}, ${city} attracts ambitious founders and operators competing for the same talent, capital, and customers. The ${market} area's ${primaryLabel.toLowerCase()} ecosystem requires precise positioning with messaging that resonates with a sophisticated, local audience. Our team works with ${city} businesses at every stage to build brand authority, optimize operations, and execute growth campaigns that deliver measurable results.`,

    `The ${city}, ${state} market — known for ${rationale.toLowerCase()} — is evolving rapidly. Companies here face the dual challenge of capturing growth in emerging sectors like ${industryNames.toLowerCase()} while building sustainable, scalable operations. Iconic Brand Group partners with ${city} businesses to develop data-driven marketing strategies and operational frameworks that turn local market insight into competitive advantage across the ${market} region.`,
  ];

  // Deterministic selection based on city name to ensure consistency across builds
  const index = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % templates.length;
  return templates[index]!;
}

/**
 * Get city-specific FAQ answers (unique per city, not just name swaps).
 * Returns differentiated Q&A pairs per MCP AIO/GEO optimization.
 */
export function getCityFAQs(city: string, state: string, market: string, context: CityContext, serviceTitle: string) {
  const primaryIndustry = context.industries[0]!;
  const industryLabel = primaryIndustry.charAt(0).toUpperCase() + primaryIndustry.slice(1);

  return [
    {
      question: `Why choose Iconic Brand Group for ${serviceTitle.toLowerCase()} in ${city}?`,
      answer: `${city}'s market is defined by ${context.rationale.toLowerCase()}. We understand these dynamics and build strategies around them — not generic playbooks. Our team combines industry expertise in ${industryLabel.toLowerCase()} with local market intelligence across the ${market} area to deliver results that reflect ${city}'s specific competitive landscape.`,
    },
    {
      question: `What industries do you serve in ${city}, ${state}?`,
      answer: `In ${city}, we focus on the industries driving the local economy: ${context.industries.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ')}. Each engagement is tailored to the competitive dynamics and growth patterns unique to ${city}'s ${context.industries[0]} ecosystem.`,
    },
    {
      question: `How much does ${serviceTitle.toLowerCase()} cost in ${city}?`,
      answer: `Pricing depends on scope, goals, and competitive intensity in the ${market} market. We offer flexible engagement models — from focused consulting sprints to ongoing retainers. Schedule a free consultation to discuss your ${city} business goals and get a custom proposal.`,
    },
    {
      question: `How quickly can I expect results from your services in ${city}?`,
      answer: `Timeline depends on your starting point and the ${city} competitive landscape. Paid campaigns and operational improvements typically show measurable impact within 30-60 days. SEO and brand authority strategies deliver compounding returns over 3-6 months in the ${market} market.`,
    },
    {
      question: `Do you work with startups or established businesses in ${city}?`,
      answer: `Both. We work with early-stage startups navigating ${city}'s ${context.rationale.toLowerCase()} as well as established businesses scaling across the ${market} region. Our frameworks adapt to your stage — whether you need fundraising strategy, brand development, or growth marketing.`,
    },
  ];
}

/**
 * Get category-appropriate services based on keyword category.
 * Matches SEO Goal Categories 1–6 vs franchise keywords.
 */
export function getCategoryServices(keywordCategory: string) {
  switch (keywordCategory) {
    case 'startup':
      return [
        { title: 'Strategy & Planning', description: 'Go-to-market strategy, business model validation, and competitive positioning for startups.', icon: '🎯' },
        { title: 'Growth Consulting', description: 'Revenue growth frameworks, customer acquisition strategy, and scaling roadmaps.', icon: '📈' },
        { title: 'Operations Optimization', description: 'Process design, team structure, and operational efficiency for growth-stage companies.', icon: '⚙️' },
        { title: 'Fundraising Support', description: 'Pitch deck development, investor strategy, and capital raising guidance.', icon: '💰' },
        { title: 'Brand Development', description: 'Brand identity, messaging framework, and positioning strategy.', icon: '✨' },
        { title: 'Digital Presence', description: 'Website strategy, SEO foundation, and digital marketing infrastructure.', icon: '💻' },
      ];
    case 'marketing':
      return [
        { title: 'Brand Strategy', description: 'Brand positioning, messaging architecture, and creative direction.', icon: '🎯' },
        { title: 'Digital Marketing', description: 'SEO, paid media, email, and multi-channel campaign management.', icon: '💻' },
        { title: 'Content Strategy', description: 'Content marketing, thought leadership, and editorial planning.', icon: '📝' },
        { title: 'Social Media', description: 'Platform strategy, community management, and social advertising.', icon: '📱' },
        { title: 'Performance Marketing', description: 'Paid acquisition, conversion optimization, and attribution modeling.', icon: '📊' },
        { title: 'Creative Production', description: 'Video, photography, graphic design, and brand asset creation.', icon: '🎨' },
      ];
    case 'operations':
      return [
        { title: 'Process Optimization', description: 'Workflow analysis, bottleneck elimination, and efficiency improvements.', icon: '⚙️' },
        { title: 'Systems Implementation', description: 'CRM, project management, and operational technology setup.', icon: '🔧' },
        { title: 'Team & Org Design', description: 'Organizational structure, hiring strategy, and team performance.', icon: '👥' },
        { title: 'Financial Operations', description: 'Budget planning, cash flow management, and financial modeling.', icon: '💰' },
        { title: 'Compliance & Legal', description: 'Regulatory compliance, risk assessment, and legal structure guidance.', icon: '📋' },
        { title: 'Scalability Planning', description: 'Infrastructure planning and operational readiness for growth.', icon: '📈' },
      ];
    case 'funding':
      return [
        { title: 'Pitch Deck Development', description: 'Investor-ready pitch decks with compelling narrative and data.', icon: '📊' },
        { title: 'Investor Targeting', description: 'Identify and connect with the right investors for your stage and sector.', icon: '🎯' },
        { title: 'Financial Modeling', description: 'Revenue projections, unit economics, and valuation frameworks.', icon: '💰' },
        { title: 'Due Diligence Prep', description: 'Data room setup, documentation, and investor Q&A preparation.', icon: '📋' },
        { title: 'Capital Strategy', description: 'Fundraising roadmap, round structure, and term sheet guidance.', icon: '🗺️' },
        { title: 'Investor Relations', description: 'Post-raise communication, board reporting, and stakeholder management.', icon: '🤝' },
      ];
    case 'entrepreneur':
      return [
        { title: 'Business Advisory', description: 'Strategic guidance for entrepreneurs at every stage of their journey.', icon: '🧭' },
        { title: 'Marketing Strategy', description: 'Affordable, high-impact marketing strategies for small businesses.', icon: '📊' },
        { title: 'Operations Setup', description: 'Build efficient systems, processes, and workflows from the ground up.', icon: '⚙️' },
        { title: 'Growth Planning', description: 'Market analysis, expansion strategy, and revenue growth roadmaps.', icon: '📈' },
        { title: 'Brand Building', description: 'Develop a strong brand identity that attracts customers and talent.', icon: '✨' },
        { title: 'Mentorship', description: 'Ongoing mentorship from experienced operators and founders.', icon: '🤝' },
      ];
    default:
      // General business categories
      return [
        { title: 'Strategic Marketing', description: 'Data-driven marketing strategies tailored for business growth and market penetration.', icon: '📊' },
        { title: 'Brand Development', description: 'Build a powerful brand that resonates with customers and differentiates you in competitive markets.', icon: '🎯' },
        { title: 'Digital Marketing', description: 'SEO, PPC, social media, and content marketing solutions for growing businesses.', icon: '💻' },
        { title: 'Lead Generation', description: 'Attract qualified customers and partners with targeted lead generation campaigns.', icon: '🚀' },
        { title: 'Operations Consulting', description: 'Streamline business operations for improved efficiency and profitability.', icon: '⚙️' },
        { title: 'Growth Strategy', description: 'Scale your business with proven expansion strategies and market analysis.', icon: '📈' },
      ];
  }
}
