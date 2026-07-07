// ═══════════════════════════════════════════════════════════════════
// Industry Data: Cat 5 Target Industry Programmatic Keywords
// Each industry gets a hub page at /industries/[slug]
// These serve as pillar pages linking to [service]/[city] variants
// ═══════════════════════════════════════════════════════════════════

export interface Industry {
  slug: string;
  name: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  heroSubtitle: string;
  overview: string;
  challenges: { title: string; description: string }[];
  services: { title: string; description: string; link: string }[];
  stats: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
}

export const industries: Industry[] = [
  {
    slug: 'tech',
    name: 'Tech & Software',
    metaTitle: 'Startup Consulting for Tech Companies | Iconic Brand Group',
    description: 'Strategic consulting and marketing for tech companies, SaaS startups, and software firms. From go-to-market strategy to brand development.',
    keywords: ['startup consulting for tech companies', 'marketing for SaaS startups', 'business consulting for software firms', 'tech startup consulting', 'SaaS marketing agency'],
    heroSubtitle: 'Strategic consulting and marketing for tech startups, SaaS companies, and software firms.',
    overview: 'The technology sector moves faster than any other industry. Whether you\'re a seed-stage SaaS startup or a growth-stage software company, you need a strategic partner who understands the unique challenges of building, marketing, and scaling tech products. Iconic Brand Group has deep experience helping tech companies achieve product-market fit, build go-to-market strategies, and scale customer acquisition.',
    challenges: [
      { title: 'Standing Out in Saturated Markets', description: 'The tech landscape is crowded. Differentiated positioning and compelling messaging are essential to cut through the noise and win customers.' },
      { title: 'Scaling Beyond VC Funding', description: 'Many tech startups struggle to build sustainable growth engines beyond their initial funding. Building repeatable, profitable marketing and sales systems is critical.' },
      { title: 'Hiring & Retaining Talent', description: 'Competition for top tech talent is fierce. Your brand, culture, and mission need to attract the right people — and your compensation models need to retain them.' },
      { title: 'Enterprise Sales Complexity', description: 'B2B tech sales cycles are long and complex. You need content, case studies, and a consultative sales approach to win enterprise deals.' },
    ],
    services: [
      { title: 'Go-to-Market Strategy', description: 'Build a comprehensive GTM plan covering positioning, pricing, channels, and sales enablement.', link: '/startup-consulting' },
      { title: 'Digital Marketing', description: 'SEO, paid media, content marketing, and social media tailored for tech audiences.', link: '/digital-marketing-agency' },
      { title: 'Brand Strategy', description: 'Positioning, messaging, and visual identity that differentiates your tech brand.', link: '/branding-agency' },
      { title: 'Fundraising Support', description: 'Pitch deck development, investor targeting, and fundraising strategy for tech startups.', link: '/startup-funding-consulting' },
    ],
    stats: [
      { label: 'Tech clients served', value: '100+' },
      { label: 'Average revenue growth', value: '185%' },
      { label: 'Successful fundraises', value: '$200M+' },
      { label: 'Markets covered', value: '50+' },
    ],
    faqs: [
      { question: 'Do you work with early-stage tech startups?', answer: 'Yes. We work with tech companies at every stage — from pre-seed startups validating their idea to growth-stage companies scaling to $10M+ ARR. Our engagement models are flexible to fit your stage and budget.' },
      { question: 'What makes your tech consulting different?', answer: 'We combine strategic consulting with hands-on marketing execution. Unlike traditional consultants who deliver reports, we embed with your team and drive measurable outcomes — leads, revenue, and market share.' },
      { question: 'Can you help with SaaS marketing specifically?', answer: 'Absolutely. SaaS marketing is one of our core specialties. We understand SaaS metrics (MRR, churn, CAC/LTV), SaaS buying journeys, and the content and SEO strategies that drive organic SaaS growth.' },
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare & MedTech',
    metaTitle: 'Consulting for Healthcare Companies | Iconic Brand Group',
    description: 'Business consulting and marketing for healthcare companies, medical startups, and medtech firms. Compliance-aware strategies that drive growth.',
    keywords: ['startup consulting for healthcare companies', 'marketing for medical startups', 'healthcare business consulting', 'medtech marketing agency'],
    heroSubtitle: 'Consulting and marketing for healthcare companies, medical startups, and medtech firms.',
    overview: 'Healthcare is one of the most complex and regulated industries to operate in — yet it\'s also one of the most impactful. Whether you\'re launching a medtech device, building a digital health platform, or growing a healthcare practice, you need a partner who understands compliance, trust, and the unique buying dynamics of healthcare. Iconic Brand Group helps healthcare companies build brands, reach providers and patients, and scale operations.',
    challenges: [
      { title: 'Regulatory Compliance', description: 'Healthcare marketing must comply with HIPAA, FDA, and other regulations. Every campaign, message, and channel must be vetted for compliance.' },
      { title: 'Building Trust', description: 'Healthcare decisions are high-stakes. Patients and providers need to trust your brand before they\'ll engage. This requires credibility, testimonials, and thought leadership.' },
      { title: 'Complex Buying Cycles', description: 'B2B healthcare sales involve multiple stakeholders — physicians, administrators, procurement, and compliance teams. Long sales cycles require nurturing and education.' },
      { title: 'Digital Transformation', description: 'Healthcare is rapidly moving digital. Telehealth, patient portals, and digital marketing are now table stakes — but many healthcare organizations lag behind.' },
    ],
    services: [
      { title: 'Healthcare Brand Strategy', description: 'Positioning and messaging that builds trust with patients, providers, and partners.', link: '/branding-agency' },
      { title: 'Compliance-Aware Marketing', description: 'Digital marketing campaigns designed within healthcare regulatory frameworks.', link: '/digital-marketing-agency' },
      { title: 'Operations Consulting', description: 'Operational improvements for healthcare practices, clinics, and health systems.', link: '/business-operations-consulting' },
      { title: 'Fundraising & Investor Relations', description: 'Helping medtech and health startups prepare for fundraising rounds.', link: '/startup-funding-consulting' },
    ],
    stats: [
      { label: 'Healthcare clients', value: '60+' },
      { label: 'Patient engagement lift', value: '140%' },
      { label: 'Compliance audits passed', value: '100%' },
      { label: 'Medtech launches', value: '25+' },
    ],
    faqs: [
      { question: 'Do you understand healthcare compliance requirements?', answer: 'Yes. Our team has experience working within HIPAA, FDA, and state-level healthcare regulations. We design marketing campaigns and content strategies that are compliant by design.' },
      { question: 'Can you help with medtech startup marketing?', answer: 'Absolutely. We\'ve helped 25+ medtech startups go to market with strategies covering brand positioning, digital marketing, and investor readiness.' },
    ],
  },
  {
    slug: 'finance',
    name: 'Finance & Fintech',
    metaTitle: 'Business Consulting for Fintech Startups | Iconic Brand Group',
    description: 'Strategic consulting and marketing for fintech startups, financial services firms, and investment companies. Build trust, reach customers, and scale.',
    keywords: ['business consulting for fintech startups', 'startup strategy for investment firms', 'fintech marketing agency', 'financial services consulting'],
    heroSubtitle: 'Strategic consulting and marketing for fintech, financial services, and investment firms.',
    overview: 'Finance is evolving faster than ever, driven by fintech innovation, changing consumer expectations, and regulatory shifts. Whether you\'re building a neobank, a payments platform, or a wealth management startup, you need strategic partners who understand the intersection of technology, regulation, and trust. Iconic Brand Group helps finance and fintech companies build credible brands, acquire customers, and navigate growth.',
    challenges: [
      { title: 'Regulatory Navigation', description: 'Financial services are heavily regulated. Marketing, product launches, and partnerships all need to account for SEC, FINRA, state licensing, and anti-money laundering requirements.' },
      { title: 'Consumer Trust', description: 'People are protective of their money. Building trust in a new financial brand requires transparency, social proof, and consistent messaging.' },
      { title: 'Competitive Differentiation', description: 'The fintech space is crowded. Standing out requires clear positioning, a compelling value proposition, and excellent user experience.' },
      { title: 'Customer Acquisition Cost', description: 'Financial product CAC can be extremely high. Efficient, targeted marketing is essential to build a sustainable business.' },
    ],
    services: [
      { title: 'Fintech Brand Development', description: 'Build a credible, trustworthy financial brand that attracts customers and investors.', link: '/branding-agency' },
      { title: 'Performance Marketing', description: 'Targeted, ROI-focused campaigns to acquire financial customers efficiently.', link: '/performance-marketing-agency' },
      { title: 'Investor Relations', description: 'Prepare for fundraising with compelling pitch materials and investor positioning.', link: '/investor-relations-consulting' },
      { title: 'Growth Strategy', description: 'Market expansion, product diversification, and scaling strategies for fintech companies.', link: '/business-growth-consulting' },
    ],
    stats: [
      { label: 'Fintech clients', value: '40+' },
      { label: 'Capital raised for clients', value: '$150M+' },
      { label: 'Customer acquisition improvement', value: '220%' },
      { label: 'Markets entered', value: '30+' },
    ],
    faqs: [
      { question: 'Do you work with early-stage fintech startups?', answer: 'Yes. We work with fintech companies from pre-seed through Series C, providing consulting and marketing that scales with your growth stage.' },
      { question: 'Can you help with fintech regulatory marketing?', answer: 'Yes. We understand the regulatory constraints of financial marketing and design campaigns that are effective and compliant.' },
    ],
  },
  {
    slug: 'ecommerce',
    name: 'eCommerce & DTC',
    metaTitle: 'Consulting for eCommerce Brands | Iconic Brand Group',
    description: 'Marketing and consulting for ecommerce brands, online stores, and DTC companies. Drive sales, build brand loyalty, and scale profitably.',
    keywords: ['startup consulting for ecommerce brands', 'marketing for online stores', 'ecommerce marketing agency', 'DTC brand consulting'],
    heroSubtitle: 'Marketing and consulting for eCommerce brands, online stores, and DTC companies.',
    overview: 'eCommerce is booming, but so is competition. Rising ad costs, Amazon domination, and shifting consumer expectations make it harder than ever to build a profitable online brand. Iconic Brand Group helps eCommerce companies differentiate, acquire customers efficiently, and build the brand loyalty that drives long-term value.',
    challenges: [
      { title: 'Rising Customer Acquisition Costs', description: 'Paid social and search costs are climbing. Brands need diversified acquisition strategies including SEO, content, email, and partnerships.' },
      { title: 'Brand vs. Commodity', description: 'Without strong brand positioning, eCommerce products become commodities competing on price alone. Brand building is the moat.' },
      { title: 'Conversion Rate Optimization', description: 'Small improvements in conversion rates have massive revenue impact. Site speed, UX, copy, and trust signals all matter.' },
      { title: 'Customer Retention', description: 'Acquiring a new customer costs 5x more than retaining one. Email, loyalty programs, and post-purchase experience drive retention.' },
    ],
    services: [
      { title: 'eCommerce Marketing Strategy', description: 'Multi-channel marketing plans covering paid, organic, social, email, and affiliates.', link: '/marketing-agency' },
      { title: 'Brand Development', description: 'Build a DTC brand that stands out and commands premium pricing.', link: '/branding-agency' },
      { title: 'Social Media Marketing', description: 'Instagram, TikTok, and Pinterest strategies that drive discovery and sales.', link: '/social-media-marketing-company' },
      { title: 'Growth Consulting', description: 'Unit economics, scaling strategy, and operational efficiency for eCommerce.', link: '/business-growth-consulting' },
    ],
    stats: [
      { label: 'eCommerce brands served', value: '80+' },
      { label: 'Average ROAS improvement', value: '3.2x' },
      { label: 'Revenue driven', value: '$50M+' },
      { label: 'Conversion rate lift', value: '45%' },
    ],
    faqs: [
      { question: 'Do you work with Shopify brands?', answer: 'Yes. We work with eCommerce brands on all platforms including Shopify, WooCommerce, BigCommerce, and custom builds. Our strategies are platform-agnostic.' },
      { question: 'Can you help reduce our customer acquisition costs?', answer: 'Absolutely. We audit your current acquisition channels, identify inefficiencies, and build diversified strategies that lower CAC while maintaining volume.' },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    metaTitle: 'Consulting for Real Estate Startups | Iconic Brand Group',
    description: 'Business consulting and marketing for real estate companies, developers, and proptech startups. Build your brand and grow your portfolio.',
    keywords: ['consulting for real estate startups', 'business growth for real estate developers', 'real estate marketing agency', 'proptech consulting'],
    heroSubtitle: 'Consulting and marketing for real estate companies, developers, and proptech startups.',
    overview: 'Real estate is a relationship-driven, hyper-local industry undergoing rapid digital transformation. Whether you\'re a developer, brokerage, property manager, or proptech startup, standing out requires a blend of local market expertise and modern marketing. Iconic Brand Group helps real estate companies build trusted brands, generate qualified leads, and scale across markets.',
    challenges: [
      { title: 'Local Market Competition', description: 'Real estate is intensely local. Standing out against established players requires hyper-targeted marketing and deep local brand recognition.' },
      { title: 'Digital Lead Generation', description: 'Buyers and sellers increasingly start their journey online. If your digital presence is weak, you\'re invisible to the majority of prospects.' },
      { title: 'Trust and Credibility', description: 'Real estate transactions are major financial decisions. Building trust through reviews, case studies, and thought leadership is essential.' },
      { title: 'Multi-Market Scaling', description: 'Growing a real estate business across markets requires systems, brand consistency, and localized marketing strategies.' },
    ],
    services: [
      { title: 'Real Estate Brand Strategy', description: 'Positioning and identity that differentiates your real estate brand in local markets.', link: '/branding-agency' },
      { title: 'Digital Marketing', description: 'SEO, Google Ads, social media, and content marketing tailored for real estate.', link: '/digital-marketing-agency' },
      { title: 'Business Consulting', description: 'Growth strategy, operational efficiency, and market expansion planning.', link: '/business-consulting' },
      { title: 'Investor Relations', description: 'Prepare for capital raises with professional materials and investor positioning.', link: '/investor-relations-consulting' },
    ],
    stats: [
      { label: 'Real estate clients', value: '35+' },
      { label: 'Leads generated', value: '10K+' },
      { label: 'Markets covered', value: '25+' },
      { label: 'Average ROI', value: '280%' },
    ],
    faqs: [
      { question: 'Do you work with commercial or residential real estate?', answer: 'Both. We serve commercial developers, residential brokerages, property management companies, and proptech startups with tailored strategies for each segment.' },
      { question: 'Can you help with real estate lead generation?', answer: 'Yes. We build multi-channel lead generation systems using SEO, paid search, social media, and content marketing, all optimized for real estate conversion.' },
    ],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing & Industrial',
    metaTitle: 'Consulting for Manufacturing Startups | Iconic Brand Group',
    description: 'Business consulting and marketing for manufacturing companies and industrial businesses. Modernize operations, build your brand, and reach new markets.',
    keywords: ['consulting for manufacturing startups', 'marketing for industrial businesses', 'manufacturing business consulting', 'industrial marketing agency'],
    heroSubtitle: 'Consulting and marketing for manufacturing companies and industrial businesses.',
    overview: 'Manufacturing is the backbone of the economy, but it\'s also an industry facing significant transformation. Automation, reshoring, workforce challenges, and digital marketing are reshaping how manufacturing businesses compete. Iconic Brand Group helps manufacturers modernize operations, build professional brands, and reach new customers through digital channels.',
    challenges: [
      { title: 'Digital Transformation', description: 'Many manufacturers have minimal digital presence. Building a professional website, implementing digital marketing, and adopting CRM tools are essential modernization steps.' },
      { title: 'Workforce Development', description: 'Finding and retaining skilled workers is a top challenge. Employer branding and recruitment marketing help manufacturers attract talent.' },
      { title: 'Market Expansion', description: 'Expanding into new verticals or geographic markets requires strategic planning, market research, and targeted business development.' },
      { title: 'Operational Efficiency', description: 'Lean manufacturing principles and process optimization can significantly improve margins and competitiveness.' },
    ],
    services: [
      { title: 'Operations Consulting', description: 'Process optimization, lean manufacturing consulting, and operational efficiency improvements.', link: '/business-operations-consulting' },
      { title: 'Digital Marketing', description: 'Build your online presence with SEO, Google Ads, and content marketing for B2B manufacturing.', link: '/digital-marketing-agency' },
      { title: 'Business Development', description: 'Market expansion strategy, partnership development, and sales enablement.', link: '/business-development-consulting' },
      { title: 'Brand Development', description: 'Professional brand identity that positions your manufacturing company as an industry leader.', link: '/branding-agency' },
    ],
    stats: [
      { label: 'Manufacturing clients', value: '30+' },
      { label: 'Operational cost reduction', value: '22%' },
      { label: 'New markets entered', value: '15+' },
      { label: 'Revenue growth avg', value: '35%' },
    ],
    faqs: [
      { question: 'Do you understand B2B manufacturing marketing?', answer: 'Yes. B2B manufacturing marketing is different from consumer marketing. We build strategies focused on trade publications, SEO for technical terms, LinkedIn, and account-based marketing.' },
    ],
  },
  {
    slug: 'hospitality',
    name: 'Hospitality & Tourism',
    metaTitle: 'Consulting for Hospitality Businesses | Iconic Brand Group',
    description: 'Marketing and consulting for hospitality businesses, hotels, restaurants, and tourism companies. Build memorable brands and drive bookings.',
    keywords: ['startup consulting for hospitality businesses', 'marketing for hotels and restaurants', 'hospitality marketing agency', 'tourism business consulting'],
    heroSubtitle: 'Marketing and consulting for hotels, restaurants, tourism, and hospitality businesses.',
    overview: 'Hospitality is an experience-driven industry where brand reputation, customer experience, and digital presence directly impact revenue. Whether you\'re running a boutique hotel, a restaurant group, or a tourism startup, Iconic Brand Group helps you build a brand that drives bookings, builds loyalty, and stands out in a competitive market.',
    challenges: [
      { title: 'Online Reputation', description: 'Reviews on Google, Yelp, and TripAdvisor make or break hospitality businesses. Active reputation management is essential.' },
      { title: 'Seasonal Demand', description: 'Managing marketing spend across peak and off-peak seasons requires strategic budgeting and creative campaigns.' },
      { title: 'OTA Dependency', description: 'Over-reliance on platforms like Booking.com or Expedia cuts margins. Building direct booking channels is critical.' },
      { title: 'Digital Guest Experience', description: 'From discovery to booking to post-stay, the digital experience must be seamless on mobile and desktop.' },
    ],
    services: [
      { title: 'Hospitality Brand Strategy', description: 'Build a hospitality brand that creates emotional connection and drives repeat visits.', link: '/branding-agency' },
      { title: 'Social Media Marketing', description: 'Visual-first social strategies for Instagram, TikTok, and Facebook that drive discovery and bookings.', link: '/social-media-marketing-company' },
      { title: 'Digital Marketing', description: 'SEO, Google Ads, and content marketing to increase direct bookings and reduce OTA dependence.', link: '/digital-marketing-agency' },
      { title: 'Business Consulting', description: 'Operational optimization, revenue management, and growth strategy for hospitality businesses.', link: '/business-consulting' },
    ],
    stats: [
      { label: 'Hospitality clients', value: '45+' },
      { label: 'Direct booking increase', value: '160%' },
      { label: 'Review score improvement', value: '0.8 pts' },
      { label: 'Revenue growth', value: '75%' },
    ],
    faqs: [
      { question: 'Do you work with independent hotels and restaurants?', answer: 'Yes. We work with independent hospitality businesses as well as multi-location groups. Our strategies are tailored to your size, market, and goals.' },
      { question: 'Can you help increase direct bookings?', answer: 'Absolutely. We build direct booking strategies using SEO, email marketing, loyalty programs, and website optimization to reduce OTA commission costs.' },
    ],
  },
  {
    slug: 'fitness-wellness',
    name: 'Fitness & Wellness',
    metaTitle: 'Consulting for Fitness Startups | Iconic Brand Group',
    description: 'Brand development and marketing for fitness startups, wellness brands, and health companies. Build a loyal community and grow your business.',
    keywords: ['consulting for fitness startups', 'brand development for wellness brands', 'fitness marketing agency', 'wellness business consulting'],
    heroSubtitle: 'Brand development and marketing for fitness startups, wellness brands, and health companies.',
    overview: 'The fitness and wellness industry is booming, fueled by growing health consciousness and digital innovation. Whether you\'re launching a gym, a wellness app, a supplement brand, or a fitness studio, building a strong brand and community is essential. Iconic Brand Group helps fitness and wellness companies create brands that inspire, acquire members efficiently, and build lasting loyalty.',
    challenges: [
      { title: 'Member Retention', description: 'The fitness industry has notoriously high churn rates. Building community, delivering results, and creating habits are key to retention.' },
      { title: 'Local Competition', description: 'Fitness is hyper-local. Competing against national chains, boutique studios, and home fitness options requires clear differentiation.' },
      { title: 'Digital Engagement', description: 'From virtual classes to app-based workouts, fitness brands need strong digital offerings to complement in-person experiences.' },
      { title: 'Community Building', description: 'The most successful fitness brands build communities, not just customer lists. Social media, events, and ambassadors drive organic growth.' },
    ],
    services: [
      { title: 'Fitness Brand Development', description: 'Build an inspiring brand identity that motivates your audience and differentiates from competitors.', link: '/branding-agency' },
      { title: 'Social Media Marketing', description: 'Build community and drive memberships through targeted social media campaigns.', link: '/social-media-marketing-company' },
      { title: 'Content Marketing', description: 'Content strategies covering workouts, nutrition, lifestyle, and community that build authority and drive organic traffic.', link: '/content-marketing-agency' },
      { title: 'Growth Consulting', description: 'Membership growth, retention strategies, and multi-location expansion planning.', link: '/business-growth-consulting' },
    ],
    stats: [
      { label: 'Fitness/wellness clients', value: '35+' },
      { label: 'Member growth average', value: '120%' },
      { label: 'Retention improvement', value: '40%' },
      { label: 'Social engagement lift', value: '250%' },
    ],
    faqs: [
      { question: 'Do you work with boutique fitness studios?', answer: 'Yes. We work with boutique studios, gyms, wellness centers, fitness apps, and supplement brands. Our strategies are tailored to the unique dynamics of the fitness and wellness space.' },
      { question: 'Can you help with fitness membership sales?', answer: 'Absolutely. We build enrollment campaigns using paid social, local SEO, referral programs, and community events that drive new member signups.' },
    ],
  },
  {
    slug: 'energy',
    name: 'Energy & Sustainability',
    metaTitle: 'Consulting for Green Energy Startups | Iconic Brand Group',
    description: 'Business consulting and marketing for green energy startups, cleantech firms, and sustainability-focused companies. Build your brand and drive the energy transition.',
    keywords: ['business consulting for green energy startups', 'marketing for eco-friendly brands', 'cleantech consulting', 'sustainability marketing agency'],
    heroSubtitle: 'Consulting and marketing for green energy startups, cleantech, and sustainability companies.',
    overview: 'The energy transition is creating massive opportunities for startups and established companies alike. Clean energy, sustainability tech, and eco-friendly brands are growing rapidly — but so is competition. Iconic Brand Group helps energy and sustainability companies build credible brands, reach environmentally conscious consumers, and scale operations sustainably.',
    challenges: [
      { title: 'Communicating Impact', description: 'Sustainability claims must be specific, credible, and substantiated. Greenwashing backlash is real. Authentic storytelling is essential.' },
      { title: 'Complex Sales Cycles', description: 'B2B energy sales often involve government, enterprise, and utility customers with long decision timelines.' },
      { title: 'Emerging Market Education', description: 'Many clean energy products require consumer education. Content marketing and thought leadership build understanding and demand.' },
      { title: 'Funding & Grants', description: 'Energy startups often rely on a mix of VC, grants, and government programs. Navigating this landscape requires expertise.' },
    ],
    services: [
      { title: 'Sustainability Brand Strategy', description: 'Build an authentic sustainability brand that resonates with conscious consumers and investors.', link: '/branding-agency' },
      { title: 'Content Marketing', description: 'Thought leadership, educational content, and impact storytelling that builds authority.', link: '/content-marketing-agency' },
      { title: 'Investor Relations', description: 'Fundraising strategy for cleantech startups including pitch development and investor targeting.', link: '/startup-funding-consulting' },
      { title: 'Business Consulting', description: 'Market entry, operational scaling, and strategic planning for energy companies.', link: '/business-consulting' },
    ],
    stats: [
      { label: 'Energy/sustainability clients', value: '20+' },
      { label: 'Funding raised for clients', value: '$45M+' },
      { label: 'Thought leadership pieces', value: '200+' },
      { label: 'Markets entered', value: '12+' },
    ],
    faqs: [
      { question: 'Do you understand cleantech marketing?', answer: 'Yes. We help cleantech and sustainability companies communicate their impact authentically. Our team understands the nuances of sustainability messaging, carbon claims, and impact reporting.' },
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find(i => i.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industries.map(i => i.slug);
}
