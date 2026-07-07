// Google Analytics 4
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    })
  }
}

// Track events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track conversions
export const trackConversion = (conversionId: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: 'USD',
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  event({
    action: 'form_submit',
    category: 'engagement',
    label: formName,
  })
}

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  event({
    action: 'click',
    category: 'engagement',
    label: `${buttonName} - ${location}`,
  })
}

// Track location page views
export const trackLocationView = (city: string, state?: string, tier?: string) => {
  const locationString = state ? `${city}, ${state}` : city
  
  event({
    action: 'location_view',
    category: 'geographic',
    label: locationString,
    value: tier === 'Tier 1' ? 3 : tier === 'Tier 2' ? 2 : 1,
  })
}

// Track service interest by location
export const trackServiceInterest = (service: string, city: string, state?: string) => {
  const locationString = state ? `${city}, ${state}` : city
  
  event({
    action: 'service_interest',
    category: 'lead_generation',
    label: `${service} - ${locationString}`,
  })
}

// Track search queries (for internal site search)
export const trackSiteSearch = (query: string, results: number) => {
  event({
    action: 'site_search',
    category: 'engagement',
    label: query,
    value: results,
  })
}

// Enhanced conversion tracking with location data
export const trackLocationConversion = (
  conversionType: 'contact_form' | 'phone_call' | 'consultation_request',
  city: string,
  state?: string,
  value?: number
) => {
  const locationString = state ? `${city}, ${state}` : city
  
  // Track the conversion
  event({
    action: 'conversion',
    category: 'lead_generation',
    label: `${conversionType} - ${locationString}`,
    value: value || 1,
  })
  
  // Track location-specific conversion
  event({
    action: conversionType,
    category: 'geographic_conversion',
    label: locationString,
    value: value || 1,
  })
}

// Track user engagement with location content
export const trackLocationEngagement = (
  engagementType: 'scroll_depth' | 'time_on_page' | 'cta_click',
  city: string,
  value: number
) => {
  event({
    action: engagementType,
    category: 'location_engagement',
    label: city,
    value: value,
  })
}

// SEO-specific tracking
export const trackSEOMetrics = (
  page: string,
  source: 'organic' | 'direct' | 'referral' | 'social',
  keyword?: string
) => {
  event({
    action: 'seo_traffic',
    category: 'acquisition',
    label: `${page} - ${source}${keyword ? ` - ${keyword}` : ''}`,
  })
}

// Track programmatic content performance
export const trackProgrammaticContent = (
  contentType: 'location_page' | 'service_page' | 'industry_page',
  template: string,
  performance: 'high' | 'medium' | 'low'
) => {
  event({
    action: 'programmatic_content',
    category: 'content_performance',
    label: `${contentType} - ${template}`,
    value: performance === 'high' ? 3 : performance === 'medium' ? 2 : 1,
  })
}

// Enhanced ecommerce tracking for service inquiries
export const trackServiceInquiry = (
  service: string,
  city: string,
  tier: string,
  estimatedValue: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: estimatedValue,
      items: [{
        item_id: `${service}-${city}`,
        item_name: `${service} - ${city}`,
        category: 'consulting_services',
        quantity: 1,
        price: estimatedValue,
        item_variant: tier,
      }]
    })
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}