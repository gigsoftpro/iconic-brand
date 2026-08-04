// Internal linking system for SEO optimization
export interface InternalLink {
  href: string;
  text: string;
  description?: string;
  category: 'service' | 'location' | 'about' | 'contact' | 'resource' | 'blog' | 'industry';
}

// Hub and spoke linking structure
export const hubPages = {
  home: '/',
  services: '/services',
  locations: '/locations',
  about: '/about',
  contact: '/contact',
  blog: '/blog',
  industries: '/industries',
};

// Service-related internal links
export const serviceLinks: InternalLink[] = [
  {
    href: '/services',
    text: 'Our Business Services',
    description: 'Comprehensive consulting and marketing solutions',
    category: 'service'
  },
  {
    href: '/services/consulting',
    text: 'Business Consulting Services',
    description: 'Strategic planning and operations optimization',
    category: 'service'
  },
  {
    href: '/services/marketing',
    text: 'Digital Marketing Solutions',
    description: 'Brand strategy and growth marketing',
    category: 'service'
  },
  // Individual consulting service pages
  {
    href: '/services/consulting/business-strategy',
    text: 'Business Strategy & Planning',
    description: 'Strategic planning and competitive positioning',
    category: 'service'
  },
  {
    href: '/services/consulting/operations-management',
    text: 'Operations Management',
    description: 'Streamline processes and optimize workflows',
    category: 'service'
  },
  {
    href: '/services/consulting/financial-advisory',
    text: 'Financial Advisory',
    description: 'Financial planning, budgeting, and investment strategies',
    category: 'service'
  },
  {
    href: '/services/consulting/change-management',
    text: 'Change Management',
    description: 'Navigate organizational transformation',
    category: 'service'
  },
  {
    href: '/services/consulting/risk-assessment',
    text: 'Risk Assessment & Mitigation',
    description: 'Identify and manage business risks',
    category: 'service'
  },
  {
    href: '/services/consulting/performance-analytics',
    text: 'Performance Analytics',
    description: 'Data-driven insights and KPI tracking',
    category: 'service'
  },
  {
    href: '/services/consulting/market-analysis',
    text: 'Market Analysis',
    description: 'Deep market research and competitive intelligence',
    category: 'service'
  },
  {
    href: '/services/consulting/organizational-development',
    text: 'Organizational Development',
    description: 'Build high-performing teams and optimize structure',
    category: 'service'
  },
  // Individual marketing service pages
  {
    href: '/services/marketing/brand-strategy',
    text: 'Brand Strategy & Positioning',
    description: 'Build a brand that resonates and stands out',
    category: 'service'
  },
  {
    href: '/services/marketing/content-creation',
    text: 'Content Creation & Production',
    description: 'Captivating content that drives engagement',
    category: 'service'
  },
  {
    href: '/services/marketing/paid-media',
    text: 'Paid Media Management',
    description: 'Strategic ad campaigns that maximize ROI',
    category: 'service'
  },
  {
    href: '/services/marketing/email-crm',
    text: 'Email + CRM Management',
    description: 'Automated systems that nurture leads',
    category: 'service'
  },
  {
    href: '/services/marketing/website-funnels',
    text: 'Website + Funnel Systems',
    description: 'High-converting websites and sales funnels',
    category: 'service'
  },
  {
    href: '/services/marketing/seo',
    text: 'SEO + Awareness Growth',
    description: 'Dominate search rankings with organic visibility',
    category: 'service'
  },
  {
    href: '/services/marketing/lead-generation',
    text: 'Lead Generation & Revenue',
    description: 'Complete funnel systems that convert leads',
    category: 'service'
  },
  {
    href: '/services/marketing/ecommerce',
    text: 'eCommerce Marketplace Growth',
    description: 'Scale across Amazon, Walmart, and major marketplaces',
    category: 'service'
  },
  {
    href: '/services/marketing/analytics',
    text: 'Analytics + Reporting',
    description: 'Data-driven insights that guide strategy',
    category: 'service'
  },
];

// Blog-related internal links
export const blogLinks: InternalLink[] = [
  {
    href: '/blog',
    text: 'Insights & Resources',
    description: 'Expert articles on business growth and marketing',
    category: 'blog'
  },
  {
    href: '/blog/how-to-grow-a-startup-business',
    text: 'How to Grow a Startup Business',
    description: 'Strategic guide for scaling your startup',
    category: 'blog'
  },
  {
    href: '/blog/startup-marketing-tips',
    text: 'Startup Marketing Tips',
    description: 'Marketing strategies for early-stage companies',
    category: 'blog'
  },
  {
    href: '/blog/how-to-find-a-business-consultant',
    text: 'How to Find a Business Consultant',
    description: 'Guide to choosing the right consulting partner',
    category: 'blog'
  },
  {
    href: '/blog/scaling-your-startup-from-idea-to-profit',
    text: 'Scaling Your Startup from Idea to Profit',
    description: 'From idea validation to profitability',
    category: 'blog'
  },
];

// Industry-related internal links
export const industryLinks: InternalLink[] = [
  {
    href: '/industries',
    text: 'Industries We Serve',
    description: 'Specialized consulting across 9+ industries',
    category: 'industry'
  },
  {
    href: '/industries/tech',
    text: 'Tech & Software Consulting',
    description: 'Consulting for tech startups and SaaS companies',
    category: 'industry'
  },
  {
    href: '/industries/healthcare',
    text: 'Healthcare Consulting',
    description: 'Compliance-aware strategies for healthcare companies',
    category: 'industry'
  },
  {
    href: '/industries/finance',
    text: 'Finance & Fintech Consulting',
    description: 'Strategic consulting for financial services',
    category: 'industry'
  },
  {
    href: '/industries/ecommerce',
    text: 'eCommerce & DTC Consulting',
    description: 'Marketing and growth for online brands',
    category: 'industry'
  },
  {
    href: '/industries/real-estate',
    text: 'Real Estate Consulting',
    description: 'Consulting for developers and proptech firms',
    category: 'industry'
  },
  {
    href: '/industries/hospitality',
    text: 'Hospitality Consulting',
    description: 'Marketing for hotels, restaurants, and tourism',
    category: 'industry'
  },
  {
    href: '/industries/fitness-wellness',
    text: 'Fitness & Wellness Consulting',
    description: 'Brand development for fitness and wellness companies',
    category: 'industry'
  },
  {
    href: '/industries/energy',
    text: 'Energy & Sustainability Consulting',
    description: 'Consulting for green energy and cleantech',
    category: 'industry'
  },
];

// Location-related internal links
export const locationLinks: InternalLink[] = [
  {
    href: '/locations',
    text: 'Our Service Locations',
    description: 'Serving 500+ cities across the United States',
    category: 'location'
  },
];

// Company-related internal links
export const companyLinks: InternalLink[] = [
  {
    href: '/about',
    text: 'About Iconic Brand Group',
    description: 'Our mission, team, and values',
    category: 'about'
  },
  {
    href: '/contact',
    text: 'Get Your Free Consultation',
    description: 'Contact our expert team today',
    category: 'contact'
  },
  {
    href: '/careers',
    text: 'Careers at Iconic Brand Group',
    description: 'Join our growing team',
    category: 'about'
  },
];

// Get contextual internal links for a page
export function getContextualLinks(currentPath: string, count: number = 8): InternalLink[] {
  const allLinks = [...serviceLinks, ...blogLinks, ...industryLinks, ...locationLinks, ...companyLinks];
  
  // Filter out current page
  const availableLinks = allLinks.filter(link => link.href !== currentPath);
  
  // Prioritize links based on current page context
  let prioritizedLinks: InternalLink[] = [];
  
  if (currentPath.includes('/services/consulting')) {
    // On consulting pages, show marketing cross-links + industries + blog
    prioritizedLinks = [
      ...availableLinks.filter(link => link.href.includes('/services/marketing')).slice(0, 3),
      ...availableLinks.filter(link => link.category === 'industry').slice(0, 2),
      ...availableLinks.filter(link => link.category === 'blog').slice(0, 2),
      ...availableLinks.filter(link => link.category === 'contact'),
    ];
  } else if (currentPath.includes('/services/marketing')) {
    // On marketing pages, show consulting cross-links + industries + blog
    prioritizedLinks = [
      ...availableLinks.filter(link => link.href.includes('/services/consulting')).slice(0, 3),
      ...availableLinks.filter(link => link.category === 'industry').slice(0, 2),
      ...availableLinks.filter(link => link.category === 'blog').slice(0, 2),
      ...availableLinks.filter(link => link.category === 'contact'),
    ];
  } else if (currentPath.includes('/servicesss')) {
    // On service hub, prioritize individual services + industries
    prioritizedLinks = [
      ...availableLinks.filter(link => link.category === 'service').slice(0, 4),
      ...availableLinks.filter(link => link.category === 'industry').slice(0, 2),
      ...availableLinks.filter(link => link.category === 'blog').slice(0, 1),
      ...availableLinks.filter(link => link.category === 'contact'),
    ];
  } else if (currentPath.includes('/blog')) {
    // On blog pages, prioritize services + industries
    prioritizedLinks = [
      ...availableLinks.filter(link => link.category === 'service').slice(0, 3),
      ...availableLinks.filter(link => link.category === 'industry').slice(0, 2),
      ...availableLinks.filter(link => link.category === 'blog').slice(0, 2),
      ...availableLinks.filter(link => link.category === 'contact'),
    ];
  } else if (currentPath.includes('/industries')) {
    // On industry pages, prioritize services + blog
    prioritizedLinks = [
      ...availableLinks.filter(link => link.category === 'service').slice(0, 3),
      ...availableLinks.filter(link => link.category === 'blog').slice(0, 2),
      ...availableLinks.filter(link => link.category === 'industry').slice(0, 2),
      ...availableLinks.filter(link => link.category === 'contact'),
    ];
  } else if (currentPath.includes('/locations') || currentPath.includes('/about') || currentPath.includes('/careers')) {
    // On company/location pages, mix services + industries + blog
    prioritizedLinks = [
      ...availableLinks.filter(link => link.category === 'service').slice(0, 3),
      ...availableLinks.filter(link => link.category === 'industry').slice(0, 2),
      ...availableLinks.filter(link => link.category === 'blog').slice(0, 2),
      ...availableLinks.filter(link => link.category === 'contact'),
    ];
  } else {
    // Homepage and other pages - broad mix
    prioritizedLinks = [
      ...availableLinks.filter(link => link.category === 'service').slice(0, 3),
      ...availableLinks.filter(link => link.category === 'industry').slice(0, 2),
      ...availableLinks.filter(link => link.category === 'blog').slice(0, 2),
      ...availableLinks.filter(link => link.category === 'location'),
      ...availableLinks.filter(link => link.category === 'contact'),
    ];
  }
  
  // Deduplicate
  const seen = new Set<string>();
  prioritizedLinks = prioritizedLinks.filter(link => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
  
  return prioritizedLinks.slice(0, count);
}

// Generate descriptive anchor text (avoid "click here", "read more")
export function generateAnchorText(service: string, location?: string): string {
  const templates = [
    `${service} services${location ? ` in ${location}` : ''}`,
    `Expert ${service.toLowerCase()}${location ? ` for ${location} businesses` : ''}`,
    `Professional ${service.toLowerCase()} solutions${location ? ` in ${location}` : ''}`,
    `${service} consulting${location ? ` in ${location}` : ''}`,
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

// Government and educational resource links (.gov, .edu)
export const governmentResourceLinks = [
  {
    href: 'https://www.sba.gov/business-guide',
    text: 'SBA Business Guide',
    description: 'Official Small Business Administration resources'
  },
  {
    href: 'https://www.census.gov/programs-surveys/economic-census.html',
    text: 'U.S. Economic Census Data',
    description: 'Official business and economic statistics'
  },
  {
    href: 'https://www.bls.gov/bdm/',
    text: 'Bureau of Labor Statistics',
    description: 'Employment and business dynamics data'
  },
  {
    href: 'https://www.trade.gov/market-intelligence',
    text: 'International Trade Administration',
    description: 'Market intelligence and trade resources'
  },
];

// Add government resources to page footer content
export function getGovernmentResources(count: number = 2) {
  return governmentResourceLinks.slice(0, count);
}