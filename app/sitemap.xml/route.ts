// Sitemap Index - Points to all child sitemaps
// Force static: pre-rendered at build time for instant Google crawls

import { NextResponse } from 'next/server';
import { generateSitemapIndexXml } from '@/lib/sitemap-utils';

export const dynamic = 'force-static';

export async function GET() {
  const xml = generateSitemapIndexXml();

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
