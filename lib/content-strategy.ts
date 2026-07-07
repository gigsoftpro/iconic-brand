// Content strategy system for programmatic SEO
export interface ContentTemplate {
  type: 'service' | 'location' | 'industry' | 'comparison'
  title: string
  description: string
  keywords: string[]
  contentBlocks: ContentBlock[]
}

export interface ContentBlock {
  type: 'hero' | 'services' | 'benefits' | 'process' | 'testimonial' | 'faq' | 'cta'
  title: string
  content: string
  variables?: string[]
}

// Service-specific content templates
export const serviceTemplates: Record<string, ContentTemplate> = {
  consulting: {
    type: 'service',
    title: 'Business Consulting Services in {city} | {company}',
    description: 'Expert business consulting services in {city}. Strategic planning, operations optimization, and growth strategies for {city} businesses.',
    keywords: ['business consulting {city}', 'strategic planning {city}', 'management consulting {city}'],
    contentBlocks: [
      {
        type: 'hero',
        title: 'Transform Your {city} Business with Expert Consulting',
        content: 'Strategic consulting services designed to accelerate growth and optimize operations for businesses in {city}, {state}.',
        variables: ['city', 'state']
      },
      {
        type: 'services',
        title: 'Our Consulting Services in {city}',
        content: 'Comprehensive business consulting solutions tailored for the {city} market, including strategic planning, operations optimization, and growth strategies.',
        variables: ['city']
      }
    ]
  },
  marketing: {
    type: 'service',
    title: 'Digital Marketing Services in {city} | {company}',
    description: 'Data-driven digital marketing services in {city}. SEO, social media, content marketing, and brand strategy for {city} businesses.',
    keywords: ['digital marketing {city}', 'SEO services {city}', 'marketing agency {city}'],
    contentBlocks: [
      {
        type: 'hero',
        title: 'Amplify Your {city} Brand with Digital Marketing',
        content: 'Comprehensive digital marketing services that drive growth and engagement for businesses in {city}, {state}.',
        variables: ['city', 'state']
      }
    ]
  }
}

// Industry-specific content
export const industryTemplates: Record<string, ContentTemplate> = {
  fintech: {
    type: 'industry',
    title: 'Fintech Consulting & Marketing Services in {city} | {company}',
    description: 'Specialized consulting and marketing services for fintech companies in {city}. Regulatory compliance, growth strategies, and digital marketing.',
    keywords: ['fintech consulting {city}', 'financial services marketing {city}', 'fintech growth {city}'],
    contentBlocks: [
      {
        type: 'hero',
        title: 'Accelerate Your Fintech Growth in {city}',
        content: 'Specialized consulting and marketing services for fintech companies navigating the {city} market.',
        variables: ['city']
      }
    ]
  },
  saas: {
    type: 'industry',
    title: 'SaaS Consulting & Marketing Services in {city} | {company}',
    description: 'Expert SaaS consulting and marketing services in {city}. Product-market fit, growth strategies, and customer acquisition.',
    keywords: ['SaaS consulting {city}', 'software marketing {city}', 'SaaS growth {city}'],
    contentBlocks: [
      {
        type: 'hero',
        title: 'Scale Your SaaS Business in {city}',
        content: 'Proven strategies for SaaS companies looking to accelerate growth in the competitive {city} market.',
        variables: ['city']
      }
    ]
  }
}

// Generate content from template
export function generateContent(template: ContentTemplate, variables: Record<string, string>): string {
  let content = ''
  
  template.contentBlocks.forEach(block => {
    let blockContent = block.content
    
    // Replace variables in content
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{${key}}`, 'g')
      blockContent = blockContent.replace(regex, value)
    })
    
    content += `<section class="content-block ${block.type}">
      <h2>${block.title.replace(/{(\w+)}/g, (match, key) => variables[key] || match)}</h2>
      <p>${blockContent}</p>
    </section>\n`
  })
  
  return content
}

// SEO-optimized FAQ generation
export function generateLocationFAQs(city: string, state?: string): Array<{question: string, answer: string}> {
  const locationString = state ? `${city}, ${state}` : city
  
  return [
    {
      question: `What business consulting services do you offer in ${city}?`,
      answer: `We provide comprehensive business consulting services in ${locationString}, including strategic planning, operations optimization, financial advisory, and growth strategies tailored to the local market.`
    },
    {
      question: `How can digital marketing help my ${city} business?`,
      answer: `Our digital marketing services help ${city} businesses increase online visibility, generate qualified leads, and build strong brand presence through SEO, social media marketing, content creation, and targeted advertising campaigns.`
    },
    {
      question: `Do you work with startups in ${city}?`,
      answer: `Yes, we specialize in helping startups and growing businesses in ${locationString}. Our services include venture capital preparation, go-to-market strategies, and scalable marketing systems.`
    },
    {
      question: `What industries do you serve in ${city}?`,
      answer: `We serve diverse industries in ${locationString}, including technology, fintech, healthcare, manufacturing, professional services, and e-commerce, with specialized expertise for each sector.`
    },
    {
      question: `How do I get started with your services in ${city}?`,
      answer: `Getting started is easy. Contact us for a free consultation where we'll discuss your business goals and create a customized strategy for your ${city} company.`
    }
  ]
}

// Generate schema markup for FAQs
export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// Content calendar for programmatic updates
export interface ContentCalendarItem {
  date: Date
  type: 'blog' | 'case-study' | 'location-update' | 'industry-insight'
  title: string
  targetKeywords: string[]
  locations?: string[]
  priority: 'high' | 'medium' | 'low'
}

export function generateContentCalendar(months: number = 6): ContentCalendarItem[] {
  const calendar: ContentCalendarItem[] = []
  const startDate = new Date()
  
  // Generate monthly content for top cities
  for (let month = 0; month < months; month++) {
    const date = new Date(startDate.getFullYear(), startDate.getMonth() + month, 1)
    
    // Tier 1 city spotlight
    calendar.push({
      date: new Date(date.getFullYear(), date.getMonth(), 5),
      type: 'location-update',
      title: `Business Growth Trends in {city} - ${date.getFullYear()}`,
      targetKeywords: ['business trends {city}', 'market analysis {city}', 'growth opportunities {city}'],
      locations: ['san-francisco-ca', 'new-york-ny', 'austin-tx'],
      priority: 'high'
    })
    
    // Industry insights
    calendar.push({
      date: new Date(date.getFullYear(), date.getMonth(), 15),
      type: 'industry-insight',
      title: `{industry} Market Outlook for {city} Businesses`,
      targetKeywords: ['{industry} trends', '{industry} consulting', 'market analysis'],
      priority: 'medium'
    })
    
    // Case studies
    calendar.push({
      date: new Date(date.getFullYear(), date.getMonth(), 25),
      type: 'case-study',
      title: `How We Helped a {city} {industry} Company Achieve {result}`,
      targetKeywords: ['success story {city}', '{industry} case study', 'business results'],
      priority: 'high'
    })
  }
  
  return calendar
}

// Performance tracking for programmatic content
export interface ContentPerformance {
  url: string
  title: string
  impressions: number
  clicks: number
  ctr: number
  averagePosition: number
  conversions: number
  lastUpdated: Date
}

export function analyzeContentPerformance(data: ContentPerformance[]): {
  topPerforming: ContentPerformance[]
  needsOptimization: ContentPerformance[]
  recommendations: string[]
} {
  const sorted = data.sort((a, b) => b.clicks - a.clicks)
  const topPerforming = sorted.slice(0, 10)
  const needsOptimization = data.filter(item => 
    item.ctr < 0.02 || item.averagePosition > 10
  )
  
  const recommendations = []
  
  if (needsOptimization.length > 0) {
    recommendations.push('Update meta descriptions for low CTR pages')
    recommendations.push('Improve content quality for pages ranking below position 10')
  }
  
  const oldContent = data.filter(item => {
    const daysSinceUpdate = (Date.now() - item.lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
    return daysSinceUpdate > 90
  })
  
  if (oldContent.length > 0) {
    recommendations.push('Refresh content that hasn\'t been updated in 90+ days')
  }
  
  return {
    topPerforming,
    needsOptimization,
    recommendations
  }
}