// Image optimization and alt text utilities

export interface ImageAltConfig {
  context: 'service' | 'location' | 'team' | 'general' | 'logo' | 'hero'
  subject?: string
  location?: string
  serviceName?: string
  action?: string
}

/**
 * Generate SEO-optimized alt text for images dynamically
 * @param config Configuration object for alt text generation
 * @returns SEO-friendly alt text
 */
export function generateAltText(config: ImageAltConfig): string {
  const { context, subject, location, serviceName, action } = config

  switch (context) {
    case 'service':
      if (serviceName && location) {
        return `${serviceName} for businesses in ${location} - Iconic Brand Group`
      }
      if (serviceName) {
        return `${serviceName} services - Iconic Brand Group`
      }
      return 'Business consulting and marketing services - Iconic Brand Group'

    case 'location':
      if (location && serviceName) {
        return `${serviceName} in ${location} - Expert consulting services by Iconic Brand Group`
      }
      if (location) {
        return `Business consulting and marketing in ${location} - Iconic Brand Group`
      }
      return 'Business consulting services - Iconic Brand Group'

    case 'team':
      if (subject) {
        return `${subject} - Business consultant at Iconic Brand Group`
      }
      return 'Expert business consultant - Iconic Brand Group team member'

    case 'logo':
      return 'Iconic Brand Group - Strategic Consulting and Marketing Solutions'

    case 'hero':
      if (serviceName && action) {
        return `${action} with ${serviceName} - Transform your business with Iconic Brand Group`
      }
      if (location && action) {
        return `${action} in ${location} - Business consulting by Iconic Brand Group`
      }
      if (action) {
        return `${action} - Strategic consulting and marketing by Iconic Brand Group`
      }
      return 'Strategic business consulting and marketing solutions - Iconic Brand Group'

    case 'general':
      if (subject) {
        return `${subject} - Business consulting illustration by Iconic Brand Group`
      }
      return 'Business consulting and marketing services - Iconic Brand Group'

    default:
      return 'Iconic Brand Group - Business consulting and marketing'
  }
}

/**
 * Generate title attribute for images
 * @param altText The alt text already generated
 * @param additionalContext Optional additional context
 * @returns Title attribute text
 */
export function generateImageTitle(altText: string, additionalContext?: string): string {
  if (additionalContext) {
    return `${altText} | ${additionalContext}`
  }
  return altText
}

/**
 * Get optimized image sizes for different breakpoints
 * @param type The type of image (hero, thumbnail, etc.)
 * @returns Sizes string for Next.js Image component
 */
export function getImageSizes(type: 'hero' | 'thumbnail' | 'logo' | 'full'): string {
  switch (type) {
    case 'hero':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
    case 'thumbnail':
      return '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
    case 'logo':
      return '(max-width: 768px) 150px, 200px'
    case 'full':
      return '100vw'
    default:
      return '100vw'
  }
}
