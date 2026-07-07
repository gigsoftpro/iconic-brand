// SEO Monitoring and Testing Utilities

export interface SEOAudit {
  title: {
    exists: boolean
    length: number
    optimal: boolean
  }
  description: {
    exists: boolean
    length: number
    optimal: boolean
  }
  headings: {
    h1Count: number
    hasH1: boolean
    structure: string[]
  }
  images: {
    total: number
    withAlt: number
    missingAlt: number
  }
  links: {
    internal: number
    external: number
    nofollow: number
  }
  performance: {
    loadTime?: number
    lcp?: number
    fid?: number
    cls?: number
  }
}

export function auditPageSEO(): SEOAudit {
  if (typeof window === 'undefined') {
    throw new Error('SEO audit can only be run in the browser')
  }

  const doc = document

  // Title audit
  const titleElement = doc.querySelector('title')
  const title = titleElement?.textContent || ''
  const titleAudit = {
    exists: !!titleElement,
    length: title.length,
    optimal: title.length >= 30 && title.length <= 60
  }

  // Description audit
  const descElement = doc.querySelector('meta[name="description"]') as HTMLMetaElement
  const description = descElement?.content || ''
  const descriptionAudit = {
    exists: !!descElement,
    length: description.length,
    optimal: description.length >= 120 && description.length <= 160
  }

  // Headings audit
  const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  const h1Elements = doc.querySelectorAll('h1')
  const headingsAudit = {
    h1Count: h1Elements.length,
    hasH1: h1Elements.length > 0,
    structure: headings.map(h => h.tagName.toLowerCase())
  }

  // Images audit
  const images = Array.from(doc.querySelectorAll('img'))
  const imagesWithAlt = images.filter(img => img.alt && img.alt.trim() !== '')
  const imagesAudit = {
    total: images.length,
    withAlt: imagesWithAlt.length,
    missingAlt: images.length - imagesWithAlt.length
  }

  // Links audit
  const links = Array.from(doc.querySelectorAll('a[href]'))
  const internalLinks = links.filter(link => {
    const href = link.getAttribute('href') || ''
    return href.startsWith('/') || href.includes(window.location.hostname)
  })
  const externalLinks = links.filter(link => {
    const href = link.getAttribute('href') || ''
    return href.startsWith('http') && !href.includes(window.location.hostname)
  })
  const nofollowLinks = links.filter(link => 
    link.getAttribute('rel')?.includes('nofollow')
  )

  const linksAudit = {
    internal: internalLinks.length,
    external: externalLinks.length,
    nofollow: nofollowLinks.length
  }

  return {
    title: titleAudit,
    description: descriptionAudit,
    headings: headingsAudit,
    images: imagesAudit,
    links: linksAudit,
    performance: {} // Will be populated by performance monitoring
  }
}

export function generateSEOReport(audit: SEOAudit): string {
  const issues: string[] = []
  const recommendations: string[] = []

  // Title issues
  if (!audit.title.exists) {
    issues.push('Missing page title')
  } else if (!audit.title.optimal) {
    if (audit.title.length < 30) {
      recommendations.push('Title is too short (< 30 characters)')
    }
    if (audit.title.length > 60) {
      recommendations.push('Title is too long (> 60 characters)')
    }
  }

  // Description issues
  if (!audit.description.exists) {
    issues.push('Missing meta description')
  } else if (!audit.description.optimal) {
    if (audit.description.length < 120) {
      recommendations.push('Meta description is too short (< 120 characters)')
    }
    if (audit.description.length > 160) {
      recommendations.push('Meta description is too long (> 160 characters)')
    }
  }

  // Heading issues
  if (!audit.headings.hasH1) {
    issues.push('Missing H1 tag')
  } else if (audit.headings.h1Count > 1) {
    issues.push('Multiple H1 tags found')
  }

  // Image issues
  if (audit.images.missingAlt > 0) {
    issues.push(`${audit.images.missingAlt} images missing alt text`)
  }

  let report = '=== SEO Audit Report ===\n\n'
  
  if (issues.length > 0) {
    report += 'CRITICAL ISSUES:\n'
    issues.forEach(issue => report += `❌ ${issue}\n`)
    report += '\n'
  }

  if (recommendations.length > 0) {
    report += 'RECOMMENDATIONS:\n'
    recommendations.forEach(rec => report += `⚠️ ${rec}\n`)
    report += '\n'
  }

  report += 'SUMMARY:\n'
  report += `✅ Title: ${audit.title.length} characters\n`
  report += `✅ Description: ${audit.description.length} characters\n`
  report += `✅ H1 tags: ${audit.headings.h1Count}\n`
  report += `✅ Images with alt text: ${audit.images.withAlt}/${audit.images.total}\n`
  report += `✅ Internal links: ${audit.links.internal}\n`
  report += `✅ External links: ${audit.links.external}\n`

  return report
}

// Development helper to run SEO audit
export function runSEOAudit() {
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => {
      const audit = auditPageSEO()
      const report = generateSEOReport(audit)
      console.log(report)
    }, 2000)
  }
}