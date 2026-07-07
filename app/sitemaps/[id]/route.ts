// Individual Sitemap - 10,000 URLs per file
// SSG: all sitemaps pre-rendered at build time
// Each sitemap generates only its own slice — no full URL array in memory

import { NextResponse } from 'next/server';
import { generateSitemapXmlById, getTotalSitemapCount } from '@/lib/sitemap-utils';

// Pre-render all child sitemaps at build time
export function generateStaticParams() {
  const total = getTotalSitemapCount();
  return Array.from({ length: total }, (_, i) => ({ id: `${i}.xml` }));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const sitemapId = parseInt(id.replace('.xml', ''), 10);
  const totalSitemaps = getTotalSitemapCount();

  if (isNaN(sitemapId) || sitemapId < 0 || sitemapId >= totalSitemaps) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const xml = generateSitemapXmlById(sitemapId);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
