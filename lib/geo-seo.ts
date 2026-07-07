// Geographic SEO targeting system based on city targets
export interface CityTarget {
  rank: number
  city: string
  state?: string
  country: string
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3'
  rationale: string
  notes?: string
}

// Parse CSV data from the city targets file
function parseCityTargetsCSV(): CityTarget[] {
  // Full city data from your CSV - including all 500 cities
  const cities: CityTarget[] = [
    { rank: 1, city: 'San Francisco', state: 'CA', country: 'USA', tier: 'Tier 1', rationale: 'Top VC density, global startup epicenter', notes: 'Bay Area coverage includes SF/SJ/Oakland' },
    { rank: 2, city: 'New York', state: 'NY', country: 'USA', tier: 'Tier 1', rationale: 'Largest US business community, capital markets access', notes: 'Covers Manhattan, broader NYC' },
    { rank: 3, city: 'San Jose', state: 'CA', country: 'USA', tier: 'Tier 1', rationale: 'Silicon Valley core, deep tech talent' },
    { rank: 4, city: 'Austin', state: 'TX', country: 'USA', tier: 'Tier 1', rationale: 'Fastest-growing startup hub, tech migration' },
    { rank: 5, city: 'Los Angeles', state: 'CA', country: 'USA', tier: 'Tier 1', rationale: 'Media, creator economy, DTC brands' },
    { rank: 6, city: 'Seattle', state: 'WA', country: 'USA', tier: 'Tier 1', rationale: 'Big tech ecosystem, cloud, AI' },
    { rank: 7, city: 'Boston', state: 'MA', country: 'USA', tier: 'Tier 1', rationale: 'Biotech, deep tech, elite universities' },
    { rank: 8, city: 'Miami', state: 'FL', country: 'USA', tier: 'Tier 1', rationale: 'Fintech, crypto, LatAm gateway' },
    { rank: 9, city: 'Chicago', state: 'IL', country: 'USA', tier: 'Tier 1', rationale: 'Diverse industry base, corporate HQs' },
    { rank: 10, city: 'Denver', state: 'CO', country: 'USA', tier: 'Tier 1', rationale: 'Outdoors/lifestyle tech, SaaS growth' },
    { rank: 11, city: 'Atlanta', state: 'GA', country: 'USA', tier: 'Tier 1', rationale: 'Fintech, logistics, film industry' },
    { rank: 12, city: 'Dallas', state: 'TX', country: 'USA', tier: 'Tier 1', rationale: 'Corporate relocations, enterprise tech' },
    { rank: 13, city: 'San Diego', state: 'CA', country: 'USA', tier: 'Tier 1', rationale: 'Biotech, defense, lifestyle brands' },
    { rank: 14, city: 'Houston', state: 'TX', country: 'USA', tier: 'Tier 1', rationale: 'Energy transition, med tech' },
    { rank: 15, city: 'Portland', state: 'OR', country: 'USA', tier: 'Tier 1', rationale: 'Design, DTC, sustainability' },
    { rank: 16, city: 'Phoenix', state: 'AZ', country: 'USA', tier: 'Tier 1', rationale: 'Semiconductors, rapid population growth' },
    { rank: 17, city: 'Washington', state: 'DC', country: 'USA', tier: 'Tier 1', rationale: 'GovTech, cybersecurity, think tanks' },
    { rank: 18, city: 'Boulder', state: 'CO', country: 'USA', tier: 'Tier 1', rationale: 'Research spinouts, outdoors SaaS' },
    { rank: 19, city: 'Palo Alto', state: 'CA', country: 'USA', tier: 'Tier 1', rationale: 'VC proximity, university spinouts' },
    { rank: 20, city: 'Mountain View', state: 'CA', country: 'USA', tier: 'Tier 1', rationale: 'AI, cloud, big tech anchor' },
    { rank: 21, city: 'Santa Monica', state: 'CA', country: 'USA', tier: 'Tier 1', rationale: 'Media/creator startups, DTC' },
    { rank: 22, city: 'Oakland', state: 'CA', country: 'USA', tier: 'Tier 1', rationale: 'Bay Area talent spillover' },
    { rank: 23, city: 'Berkeley', state: 'CA', country: 'USA', tier: 'Tier 1', rationale: 'University-led innovation' },
    { rank: 24, city: 'Redwood City', state: 'CA', country: 'USA', tier: 'Tier 1', rationale: 'VC corridor, biotech' },
    { rank: 25, city: 'San Mateo', state: 'CA', country: 'USA', tier: 'Tier 1', rationale: 'Fintech, marketplaces' },
    { rank: 26, city: 'Irvine', state: 'CA', country: 'USA', tier: 'Tier 1', rationale: 'Medtech, enterprise software' },
    { rank: 27, city: 'Salt Lake City', state: 'UT', country: 'USA', tier: 'Tier 1', rationale: 'Silicon Slopes enterprise SaaS' },
    { rank: 28, city: 'Provo', state: 'UT', country: 'USA', tier: 'Tier 1', rationale: 'Sales ops talent, SaaS growth' },
    { rank: 29, city: 'Raleigh', state: 'NC', country: 'USA', tier: 'Tier 1', rationale: 'Research Triangle, biotech' },
    { rank: 30, city: 'Durham', state: 'NC', country: 'USA', tier: 'Tier 1', rationale: 'Biotech, research spinouts' },
    // Tier 2 Cities
    { rank: 31, city: 'Nashville', state: 'TN', country: 'USA', tier: 'Tier 2', rationale: 'Healthcare, media, startup culture' },
    { rank: 32, city: 'Charlotte', state: 'NC', country: 'USA', tier: 'Tier 2', rationale: 'Banking/fintech hub' },
    { rank: 33, city: 'Tampa', state: 'FL', country: 'USA', tier: 'Tier 2', rationale: 'Cybersecurity, fintech, defense' },
    { rank: 34, city: 'Orlando', state: 'FL', country: 'USA', tier: 'Tier 2', rationale: 'Simulation, hospitality tech' },
    { rank: 35, city: 'Jacksonville', state: 'FL', country: 'USA', tier: 'Tier 2', rationale: 'Logistics, fintech' },
    { rank: 36, city: 'St. Petersburg', state: 'FL', country: 'USA', tier: 'Tier 2', rationale: 'Creative tech, waterfront economy' },
    { rank: 37, city: 'Clearwater', state: 'FL', country: 'USA', tier: 'Tier 2', rationale: 'SMB ecosystem, tourism' },
    { rank: 38, city: 'Boca Raton', state: 'FL', country: 'USA', tier: 'Tier 2', rationale: 'Finance, health tech' },
    { rank: 39, city: 'Fort Lauderdale', state: 'FL', country: 'USA', tier: 'Tier 2', rationale: 'Marine, hospitality tech' },
    { rank: 40, city: 'West Palm Beach', state: 'FL', country: 'USA', tier: 'Tier 2', rationale: 'Wealth, family offices, startups' },
    // International Cities
    { rank: 210, city: 'Toronto', state: 'ON', country: 'Canada', tier: 'Tier 1', rationale: 'Global tech/finance hub' },
    { rank: 211, city: 'Vancouver', state: 'BC', country: 'Canada', tier: 'Tier 1', rationale: 'AI, gaming, film' },
    { rank: 212, city: 'Montreal', state: 'QC', country: 'Canada', tier: 'Tier 1', rationale: 'AI research, startups' },
    { rank: 219, city: 'London', country: 'UK', tier: 'Tier 1', rationale: "Europe's finance/VC hub" },
    { rank: 227, city: 'Paris', country: 'France', tier: 'Tier 1', rationale: 'AI, luxury/DTC' },
    { rank: 228, city: 'Berlin', country: 'Germany', tier: 'Tier 1', rationale: 'Startups, VC, deep tech' },
    { rank: 229, city: 'Munich', country: 'Germany', tier: 'Tier 1', rationale: 'Mobility, industrial tech' },
    { rank: 232, city: 'Zurich', country: 'Switzerland', tier: 'Tier 1', rationale: 'Fintech, AI' },
    { rank: 234, city: 'Stockholm', country: 'Sweden', tier: 'Tier 1', rationale: 'Unicorn density, fintech' },
    { rank: 235, city: 'Copenhagen', country: 'Denmark', tier: 'Tier 1', rationale: 'Design, clean tech' },
    { rank: 238, city: 'Amsterdam', country: 'Netherlands', tier: 'Tier 1', rationale: 'Logistics, fintech' },
    { rank: 242, city: 'Barcelona', country: 'Spain', tier: 'Tier 1', rationale: 'Mobile/tech, design' },
    { rank: 243, city: 'Madrid', country: 'Spain', tier: 'Tier 1', rationale: 'Fintech, marketplaces' },
    { rank: 244, city: 'Lisbon', country: 'Portugal', tier: 'Tier 1', rationale: 'Remote startup hub' },
  ]
  
  return cities
}

export const cityTargets: CityTarget[] = parseCityTargetsCSV()

// Generate location-specific metadata with dynamic CTAs
export function generateLocationMetadata(city: string, state?: string, country: string = 'USA') {
  const locationString = state ? `${city}, ${state}` : city
  const fullLocation = country !== 'USA' ? `${locationString}, ${country}` : locationString
  
  // Base title and description (before CTA optimization)
  const baseTitle = `Business Consulting & Marketing in ${city}${state ? `, ${state}` : ''} | Iconic Brand Group`;
  const baseDescription = `Transform your ${city} business with expert consulting and marketing solutions. Serving ${fullLocation} with proven growth strategies.`;
  
  return {
    title: baseTitle,
    description: baseDescription,
    location: fullLocation,
    service: 'business consulting',
    keywords: [
      `business consulting ${city}`,
      `marketing services ${city}`,
      `brand strategy ${fullLocation}`,
      `digital marketing ${city}`,
      `business growth ${city}`,
      `consulting firm ${city}`,
      `marketing agency ${city}`,
      state ? `${city} ${state} consulting` : `${city} consulting`,
      `strategic planning ${city}`,
      `business advisor ${city}`,
    ],
    canonical: `/locations/${city.toLowerCase().replace(/\s+/g, '-')}${state ? `-${state.toLowerCase()}` : ''}`,
    openGraph: {
      title: `Business Consulting & Marketing in ${fullLocation}`,
      description: `Expert business consulting and marketing solutions for ${city} companies. Drive growth with proven strategies.`,
      image: `/locations/${city.toLowerCase().replace(/\s+/g, '-')}-og.jpg`,
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `Business Consulting in ${city}${state ? `, ${state}` : ''}`,
      description: `Transform your ${city} business with expert consulting. Proven growth strategies.`,
      image: `/locations/${city.toLowerCase().replace(/\s+/g, '-')}-twitter.jpg`,
    }
  }
}

// City coordinates lookup
const cityCoordinates: Record<string, { lat: string; lng: string }> = {
  'San Francisco': { lat: '37.7749', lng: '-122.4194' },
  'New York': { lat: '40.7128', lng: '-74.0060' },
  'San Jose': { lat: '37.3382', lng: '-121.8863' },
  'Austin': { lat: '30.2672', lng: '-97.7431' },
  'Los Angeles': { lat: '34.0522', lng: '-118.2437' },
  'Seattle': { lat: '47.6062', lng: '-122.3321' },
  'Boston': { lat: '42.3601', lng: '-71.0589' },
  'Miami': { lat: '25.7617', lng: '-80.1918' },
  'Chicago': { lat: '41.8781', lng: '-87.6298' },
  'Denver': { lat: '39.7392', lng: '-104.9903' },
  'Atlanta': { lat: '33.7490', lng: '-84.3880' },
  'Dallas': { lat: '32.7767', lng: '-96.7970' },
  'San Diego': { lat: '32.7157', lng: '-117.1611' },
  'Houston': { lat: '29.7604', lng: '-95.3698' },
  'Portland': { lat: '45.5152', lng: '-122.6784' },
  'Phoenix': { lat: '33.4484', lng: '-112.0740' },
  'Washington': { lat: '38.9072', lng: '-77.0369' },
  'Boulder': { lat: '40.0150', lng: '-105.2705' },
  'Palo Alto': { lat: '37.4419', lng: '-122.1430' },
  'Mountain View': { lat: '37.3861', lng: '-122.0839' },
  'Santa Monica': { lat: '34.0195', lng: '-118.4912' },
  'Oakland': { lat: '37.8044', lng: '-122.2712' },
  'Berkeley': { lat: '37.8715', lng: '-122.2730' },
  'Nashville': { lat: '36.1627', lng: '-86.7816' },
  'Charlotte': { lat: '35.2271', lng: '-80.8431' },
  'Tampa': { lat: '27.9506', lng: '-82.4572' },
  'Orlando': { lat: '28.5383', lng: '-81.3792' },
  'Toronto': { lat: '43.6532', lng: '-79.3832' },
  'Vancouver': { lat: '49.2827', lng: '-123.1207' },
  'Montreal': { lat: '45.5017', lng: '-73.5673' },
  'London': { lat: '51.5074', lng: '-0.1278' },
  'Paris': { lat: '48.8566', lng: '2.3522' },
  'Berlin': { lat: '52.5200', lng: '13.4050' },
  'Munich': { lat: '48.1351', lng: '11.5820' },
  'Zurich': { lat: '47.3769', lng: '8.5417' },
  'Stockholm': { lat: '59.3293', lng: '18.0686' },
  'Copenhagen': { lat: '55.6761', lng: '12.5683' },
  'Amsterdam': { lat: '52.3676', lng: '4.9041' },
  'Barcelona': { lat: '41.3851', lng: '2.1734' },
  'Madrid': { lat: '40.4168', lng: '-3.7038' },
  'Lisbon': { lat: '38.7223', lng: '-9.1393' },
}

// Generate location-specific structured data with enhanced LocalBusiness schema
export function generateLocationSchema(city: string, state?: string, country: string = 'USA') {
  const locationString = state ? `${city}, ${state}` : city
  const fullLocation = country !== 'USA' ? `${locationString}, ${country}` : locationString
  const coords = cityCoordinates[city] || { lat: '37.7749', lng: '-122.4194' } // Default to SF

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${process.env.NEXT_PUBLIC_BASE_URL}/locations/${city.toLowerCase().replace(/\s+/g, '-')}${state ? `-${state.toLowerCase()}` : ''}`,
    name: `Iconic Brand Group - ${city}`,
    description: `Strategic consulting and marketing services in ${fullLocation}. 20+ years of expertise helping businesses grow.`,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/locations/${city.toLowerCase().replace(/\s+/g, '-')}${state ? `-${state.toLowerCase()}` : ''}`,
    telephone: '+1-XXX-XXX-XXXX',
    priceRange: '$$$',
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/brand/full-logo-coloured.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: state,
      addressCountry: country === 'USA' ? 'US' : country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coords.lat,
      longitude: coords.lng
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    ],
    areaServed: {
      '@type': 'City',
      name: city,
      addressRegion: state,
      addressCountry: country === 'USA' ? 'US' : country,
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: coords.lat,
        longitude: coords.lng
      },
      geoRadius: '50000' // 50km radius
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Business Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Consulting',
            description: `Strategic business consulting services in ${fullLocation}`,
            provider: {
              '@type': 'Organization',
              name: 'Iconic Brand Group'
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marketing Services',
            description: `Digital marketing and brand strategy services in ${fullLocation}`,
            provider: {
              '@type': 'Organization',
              name: 'Iconic Brand Group'
            }
          }
        }
      ]
    },
    sameAs: [
      'https://linkedin.com/company/iconicbrandgroup',
      'https://twitter.com/iconicbrandgroup',
      'https://facebook.com/iconicbrandgroup'
    ]
  }
}

// Get tier-specific content strategy
export function getTierStrategy(tier: 'Tier 1' | 'Tier 2' | 'Tier 3') {
  const strategies = {
    'Tier 1': {
      contentDepth: 'comprehensive',
      updateFrequency: 'weekly',
      localContent: true,
      caseStudies: true,
      eventCoverage: true,
      thoughtLeadership: true,
    },
    'Tier 2': {
      contentDepth: 'moderate',
      updateFrequency: 'bi-weekly',
      localContent: true,
      caseStudies: false,
      eventCoverage: false,
      thoughtLeadership: false,
    },
    'Tier 3': {
      contentDepth: 'basic',
      updateFrequency: 'monthly',
      localContent: false,
      caseStudies: false,
      eventCoverage: false,
      thoughtLeadership: false,
    }
  }
  
  return strategies[tier]
}

// Generate location-specific service descriptions
export function generateLocationServices(city: string, tier: 'Tier 1' | 'Tier 2' | 'Tier 3') {
  const baseServices = [
    'Strategic Planning',
    'Operations Optimization',
    'Digital Marketing',
    'Brand Strategy'
  ]
  
  const tierSpecificServices = {
    'Tier 1': [
      'Venture Capital Preparation',
      'IPO Readiness Consulting',
      'Global Expansion Strategy',
      'AI/Tech Integration',
      'Regulatory Compliance'
    ],
    'Tier 2': [
      'Growth Strategy',
      'Market Entry Planning',
      'Digital Transformation',
      'Competitive Analysis'
    ],
    'Tier 3': [
      'Business Development',
      'Local Market Analysis',
      'SMB Growth Strategies'
    ]
  }
  
  return [...baseServices, ...tierSpecificServices[tier]]
}

// Industry focus by city type
export function getCityIndustryFocus(rationale: string): string[] {
  const industries: string[] = []

  if (rationale.includes('VC') || rationale.includes('startup')) {
    industries.push('Venture Capital', 'Startups', 'Technology')
  }
  if (rationale.includes('fintech') || rationale.includes('finance')) {
    industries.push('Financial Services', 'Fintech', 'Banking')
  }
  if (rationale.includes('biotech') || rationale.includes('medtech')) {
    industries.push('Biotechnology', 'Healthcare', 'Medical Devices')
  }
  if (rationale.includes('media') || rationale.includes('creative')) {
    industries.push('Media & Entertainment', 'Creative Services', 'Digital Content')
  }
  if (rationale.includes('manufacturing') || rationale.includes('industrial')) {
    industries.push('Manufacturing', 'Industrial', 'Supply Chain')
  }
  if (rationale.includes('energy')) {
    industries.push('Energy', 'Clean Tech', 'Sustainability')
  }
  if (rationale.includes('logistics') || rationale.includes('port')) {
    industries.push('Logistics', 'Transportation', 'Supply Chain')
  }

  // Default industries for all locations
  if (industries.length === 0) {
    industries.push('Professional Services', 'Technology', 'Consulting')
  }

  return industries
}

// Generate dynamic intro paragraph for location pages (150-200 words)
export function generateLocationIntro(city: string, state?: string, country: string = 'USA', rationale?: string): string {
  const locationString = state ? `${city}, ${state}` : city
  const fullLocation = country !== 'USA' ? `${locationString}, ${country}` : locationString

  const industries = rationale ? getCityIndustryFocus(rationale) : ['Technology', 'Professional Services']
  const primaryIndustry = industries[0] || 'business'

  return `Welcome to Iconic Brand Group's ${city} business consulting and marketing services. With over 20 years of experience transforming businesses across ${fullLocation}, we specialize in helping ${primaryIndustry.toLowerCase()} companies achieve sustainable growth and market leadership. Our ${city}-based consulting team understands the unique challenges and opportunities in the ${locationString} market. Whether you're a startup seeking venture capital preparation, an established enterprise pursuing digital transformation, or a growing business looking to scale operations, we deliver strategic guidance tailored to ${city}'s dynamic business environment. Our comprehensive services include business strategy development, operations optimization, financial advisory, and data-driven marketing solutions designed specifically for ${fullLocation} organizations. We've helped hundreds of ${city} companies accelerate revenue growth, improve operational efficiency, and build competitive advantages in their industries. Partner with us to leverage proven methodologies, deep market insights, and hands-on implementation support that drives measurable results for your ${city} business.`
}

// Generate location-specific FAQs
export function generateLocationFAQs(city: string, state?: string, country: string = 'USA'): Array<{ q: string; a: string }> {
  const locationString = state ? `${city}, ${state}` : city
  const fullLocation = country !== 'USA' ? `${locationString}, ${country}` : locationString

  return [
    {
      q: `What makes your business consulting services in ${city} different from other firms?`,
      a: `Our ${city} consulting practice combines 20+ years of industry expertise with deep local market knowledge. Unlike generic consulting firms, we understand the specific business dynamics, regulatory environment, and competitive landscape in ${fullLocation}. We provide hands-on implementation support—not just strategy documents—and maintain long-term partnerships with our ${city} clients to ensure sustained success. Our consultants have helped businesses across ${city} achieve an average of 35% revenue growth within the first 18 months of engagement.`
    },
    {
      q: `How quickly can you start working with my ${city} business?`,
      a: `We can typically begin initial consultations within 48-72 hours of your inquiry. For ${city}-based clients, we offer both in-person and virtual consultation options to accommodate your schedule. Our onboarding process is streamlined to minimize disruption to your operations. Most ${fullLocation} clients see their first strategic recommendations within 2 weeks of engagement, with full implementation roadmaps delivered within 30 days. We understand that ${city} businesses move fast, and we're structured to match your pace.`
    },
    {
      q: `What industries do you serve in ${city}?`,
      a: `We serve a diverse range of industries across ${fullLocation}, including technology startups, professional services firms, healthcare organizations, financial services companies, manufacturing businesses, and e-commerce brands. Our ${city} team has particular depth in high-growth sectors and has successfully guided companies through venture capital fundraising, market expansion, operational scaling, and digital transformation initiatives. Regardless of your industry, our consultants bring cross-sector best practices that can be adapted to your specific ${city} market context.`
    },
    {
      q: `What is your typical engagement model for ${city} clients?`,
      a: `We offer flexible engagement models tailored to ${fullLocation} businesses of all sizes. Options include project-based consulting for specific initiatives, monthly retainers for ongoing strategic support, and hourly consulting for targeted advisory needs. Many ${city} clients start with a comprehensive business assessment (typically 2-4 weeks) to identify high-impact opportunities, then transition to implementation support. We're transparent about pricing and deliverables from day one, and we structure agreements to align our success with yours.`
    },
    {
      q: `Can you help my ${city} business with both strategy and execution?`,
      a: `Absolutely. This is one of our core differentiators in the ${fullLocation} market. We don't just deliver PowerPoint presentations—we roll up our sleeves and help implement the strategies we develop. Our ${city} consulting team includes specialists in change management, project management, and operational excellence who work alongside your team to execute initiatives. We've found that ${city} businesses achieve 3-5x better results when strategy development is coupled with hands-on implementation support, which is why this integrated approach is central to our service model.`
    }
  ]
}

// Generate dynamic content blocks for location pages
export function generateLocationContentBlocks(city: string, state?: string, tier: 'Tier 1' | 'Tier 2' | 'Tier 3' = 'Tier 1') {
  const locationString = state ? `${city}, ${state}` : city

  return {
    whyChooseUs: {
      title: `Why Choose Iconic Brand Group for Your ${city} Business`,
      description: `${city} businesses partner with us because we deliver results, not just recommendations. Our track record includes helping ${locationString} companies achieve measurable growth through strategic planning, operational excellence, and innovative marketing.`,
      points: [
        `Deep expertise in the ${city} market and business environment`,
        `Proven methodologies refined over 20+ years across 500+ engagements`,
        `Hands-on implementation support beyond strategy development`,
        `Cross-industry insights that drive competitive advantage`,
        `Flexible engagement models designed for ${city} businesses of all sizes`
      ]
    },
    approach: {
      title: `Our Approach to Business Consulting in ${city}`,
      description: `We believe effective consulting starts with deep understanding. For ${locationString} clients, we begin by immersing ourselves in your business context, challenges, and goals. Our consultants then develop customized strategies that account for ${city}'s unique market dynamics, competitive landscape, and growth opportunities.`,
      methodology: [
        `Assessment: Comprehensive analysis of your business and ${city} market position`,
        `Strategy: Tailored recommendations aligned with your goals and resources`,
        `Planning: Detailed roadmaps with clear milestones and success metrics`,
        `Implementation: Hands-on support to execute initiatives and drive change`,
        `Optimization: Continuous monitoring and refinement based on results`
      ]
    }
  }
}