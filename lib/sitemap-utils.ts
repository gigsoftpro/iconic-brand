// Sitemap utilities for programmatic SEO
// 10,000 URLs per sitemap, 0-indexed, /sitemaps/ path

import { getAllKeywordSlugs, getKeywordBySlug } from './franchise-keywords';
import { getAllLocationSlugs, allTargetLocations, getLocationsByState } from './target-locations';
import { getAllBlogSlugs } from './blog-data';
import { getAllIndustrySlugs } from './industry-data';
import { getAllIndustryServiceSlugs } from './industry-service-combos';

const BASE_URL = 'https://www.iconicbrandgroup.com';
const URLS_PER_SITEMAP = 10000;

// Stable build-time date — update when content actually changes
const BUILD_DATE = new Date('2026-03-23T00:00:00Z');
const LASTMOD = BUILD_DATE.toISOString().split('T')[0];

export interface SitemapUrl {
  url: string;
  lastModified: Date;
}

// ─── Counts (no array allocation) ───

function getStaticPageCount(): number {
  return 26 + getAllBlogSlugs().length + getAllIndustrySlugs().length + Object.keys(getLocationsByState()).length;
}

function getProgrammaticPageCount(): number {
  return getAllKeywordSlugs().length * getAllLocationSlugs().length;
}

function getIndustryServiceCityPageCount(): number {
  const combos = getAllIndustryServiceSlugs();
  const eligibleLocations = allTargetLocations.filter(l => ['primary', 'suburban'].includes(l.tier));
  return combos.length * eligibleLocations.length;
}

// Total URL count (cheap — no arrays built)
export function getTotalUrlCount(): number {
  return getStaticPageCount() + getProgrammaticPageCount() + getIndustryServiceCityPageCount();
}

// Total sitemap count
export function getTotalSitemapCount(): number {
  return Math.ceil(getTotalUrlCount() / URLS_PER_SITEMAP);
}

// ─── Direct XML generation per sitemap (no full array) ───

// Generate only the URL strings for a specific range [start, end)
function getUrlStringsForRange(globalStart: number, globalEnd: number): string[] {
  const results: string[] = [];
  let offset = 0;

  // --- Static pages ---
  const staticUrls = getStaticUrlStrings();
  const staticEnd = offset + staticUrls.length;
  if (globalStart < staticEnd && globalEnd > offset) {
    const sliceStart = Math.max(0, globalStart - offset);
    const sliceEnd = Math.min(staticUrls.length, globalEnd - offset);
    for (let i = sliceStart; i < sliceEnd; i++) {
      results.push(staticUrls[i]);
    }
  }
  offset = staticEnd;
  if (results.length >= (globalEnd - globalStart)) return results;

  // --- Programmatic pages ---
  const keywords = getAllKeywordSlugs();
  const locations = getAllLocationSlugs();
  const progCount = keywords.length * locations.length;
  const progEnd = offset + progCount;
  if (globalStart < progEnd && globalEnd > offset) {
    const sliceStart = Math.max(0, globalStart - offset);
    const sliceEnd = Math.min(progCount, globalEnd - offset);
    for (let idx = sliceStart; idx < sliceEnd; idx++) {
      const kIdx = Math.floor(idx / locations.length);
      const lIdx = idx % locations.length;
      results.push(`  <url>\n    <loc>${BASE_URL}/${keywords[kIdx]}/${locations[lIdx]}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n  </url>`);
    }
  }
  offset = progEnd;
  if (results.length >= (globalEnd - globalStart)) return results;

  // --- Industry-Service-City pages ---
  const combos = getAllIndustryServiceSlugs();
  const eligibleLocations = allTargetLocations.filter(l => ['primary', 'suburban'].includes(l.tier));
  const eligibleSlugs = eligibleLocations.map(l => l.slug);
  const indCount = combos.length * eligibleSlugs.length;
  const indEnd = offset + indCount;
  if (globalStart < indEnd && globalEnd > offset) {
    const sliceStart = Math.max(0, globalStart - offset);
    const sliceEnd = Math.min(indCount, globalEnd - offset);
    for (let idx = sliceStart; idx < sliceEnd; idx++) {
      const cIdx = Math.floor(idx / eligibleSlugs.length);
      const lIdx = idx % eligibleSlugs.length;
      results.push(`  <url>\n    <loc>${BASE_URL}/industries/${combos[cIdx].industry}/${combos[cIdx].keyword}/${eligibleSlugs[lIdx]}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n  </url>`);
    }
  }

  return results;
}

// Static page URL XML strings
function getStaticUrlStrings(): string[] {
  const paths = [
    '', '/about', '/services', '/services/consulting', '/services/marketing',
    '/services/consulting/business-strategy', '/services/consulting/operations-management',
    '/services/consulting/financial-advisory', '/services/consulting/change-management',
    '/services/consulting/risk-assessment', '/services/consulting/performance-analytics',
    '/services/consulting/market-analysis', '/services/consulting/organizational-development',
    '/services/marketing/brand-strategy', '/services/marketing/content-creation',
    '/services/marketing/paid-media', '/services/marketing/email-crm',
    '/services/marketing/website-funnels', '/services/marketing/seo',
    '/services/marketing/lead-generation', '/services/marketing/ecommerce',
    '/services/marketing/analytics',
    '/contact', '/locations', '/careers', '/blog',
    ...getAllBlogSlugs().map(s => `/blog/${s}`),
    '/industries',
    ...getAllIndustrySlugs().map(s => `/industries/${s}`),
    ...Object.keys(getLocationsByState()).map(s => `/locations/${s.toLowerCase().replace(/\s+/g, '-')}`),
  ];
  return paths.map(p => `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n  </url>`);
}

// Generate sitemap XML for a specific sitemap ID (0-indexed)
export function generateSitemapXmlById(sitemapId: number): string {
  const globalStart = sitemapId * URLS_PER_SITEMAP;
  const globalEnd = Math.min(globalStart + URLS_PER_SITEMAP, getTotalUrlCount());
  const urlXmls = getUrlStringsForRange(globalStart, globalEnd);

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlXmls.join('\n')}\n</urlset>`;
}

// Generate sitemap index XML string
export function generateSitemapIndexXml(): string {
  const totalSitemaps = getTotalSitemapCount();

  const sitemapsXml = Array.from({ length: totalSitemaps }, (_, i) => i)
    .map(
      (id) => `  <sitemap>\n    <loc>${BASE_URL}/sitemaps/${id}.xml</loc>\n    <lastmod>${LASTMOD}</lastmod>\n  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapsXml}\n</sitemapindex>`;
}

// ─── Legacy exports (for stats/debugging) ───

export function getStaticPages(): SitemapUrl[] {
  const now = BUILD_DATE;
  const paths = [
    '', '/about', '/services', '/services/consulting', '/services/marketing',
    '/services/consulting/business-strategy', '/services/consulting/operations-management',
    '/services/consulting/financial-advisory', '/services/consulting/change-management',
    '/services/consulting/risk-assessment', '/services/consulting/performance-analytics',
    '/services/consulting/market-analysis', '/services/consulting/organizational-development',
    '/services/marketing/brand-strategy', '/services/marketing/content-creation',
    '/services/marketing/paid-media', '/services/marketing/email-crm',
    '/services/marketing/website-funnels', '/services/marketing/seo',
    '/services/marketing/lead-generation', '/services/marketing/ecommerce',
    '/services/marketing/analytics',
    '/contact', '/locations', '/careers', '/blog',
    ...getAllBlogSlugs().map(s => `/blog/${s}`),
    '/industries',
    ...getAllIndustrySlugs().map(s => `/industries/${s}`),
    ...Object.keys(getLocationsByState()).map(s => `/locations/${s.toLowerCase().replace(/\s+/g, '-')}`),
  ];
  return paths.map(p => ({ url: `${BASE_URL}${p}`, lastModified: now }));
}

export function getSitemapStats() {
  return {
    staticPages: getStaticPageCount(),
    programmaticPages: getProgrammaticPageCount(),
    industryServiceCityPages: getIndustryServiceCityPageCount(),
    totalUrls: getTotalUrlCount(),
    totalSitemaps: getTotalSitemapCount(),
    urlsPerSitemap: URLS_PER_SITEMAP,
  };
}
