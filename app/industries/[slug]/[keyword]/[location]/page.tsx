import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getKeywordBySlug } from '@/lib/franchise-keywords';
import {
  getLocationBySlug,
  getNearbyLocations,
} from '@/lib/target-locations';
import { getIndustryServiceCombo } from '@/lib/industry-service-combos';
import { getIndustryBySlug } from '@/lib/industry-data';
import { getHeroImage } from '@/lib/hero-images';
import TrustedBy from '@/components/TrustedBy';
import WhyIBGIsDifferent from '@/components/WhyIBGIsDifferent';
import IBGCarousel from '@/components/IBGCarousel';
import TransformCTA from '@/components/TransformCTA';

// ISR — generate on demand, cache 7 days
export const revalidate = 604800;
export const dynamicParams = true;

// Return empty array — all pages generated on-demand via ISR
export async function generateStaticParams() {
  return [];
}

// ── Metadata ───────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; keyword: string; location: string }>;
}): Promise<Metadata> {
  const { slug: industrySlug, keyword, location } = await params;
  const kw = getKeywordBySlug(keyword);
  const loc = getLocationBySlug(location);
  const comboData = getIndustryServiceCombo(industrySlug, keyword);
  if (!kw || !loc || !comboData) return { title: 'Page Not Found' };

  const { combo } = comboData;
  const title = `${kw.title} for ${combo.industryName} in ${loc.city}, ${loc.stateCode} | Iconic Brand Group`;
  const description = `Expert ${kw.title.toLowerCase()} for ${combo.industryName.toLowerCase()} companies in ${loc.city}, ${loc.stateCode}. Industry-specialized strategies that drive measurable growth. Free consultation.`;
  const url = `https://www.iconicbrandgroup.com/industries/${industrySlug}/${keyword}/${location}`;

  return {
    title,
    description,
    keywords: [
      `${kw.title.toLowerCase()} for ${combo.industryName.toLowerCase()}`,
      `${combo.industryName.toLowerCase()} ${kw.title.toLowerCase()} ${loc.city.toLowerCase()}`,
      `${kw.title.toLowerCase()} ${loc.city.toLowerCase()}`,
      `${combo.industryName.toLowerCase()} consulting ${loc.city.toLowerCase()}`,
    ],
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', siteName: 'Iconic Brand Group' },
    robots: { index: true, follow: true },
  };
}

// ── Page ───────────────────────────────────────────────────────────
export default async function IndustryServiceCityPage({
  params,
}: {
  params: Promise<{ slug: string; keyword: string; location: string }>;
}) {
  const { slug: industrySlug, keyword, location } = await params;
  const kw = getKeywordBySlug(keyword);
  const loc = getLocationBySlug(location);
  const comboData = getIndustryServiceCombo(industrySlug, keyword);
  const industry = getIndustryBySlug(industrySlug);
  if (!kw || !loc || !comboData || !industry) notFound();

  const { combo, introTemplate, valueProps } = comboData;
  const nearby = getNearbyLocations(location, 4);

  // Fill template placeholders
  const intro = introTemplate
    .replace(/\{keyword\}/g, kw.title.toLowerCase())
    .replace(/\{city\}/g, loc.city)
    .replace(/\{stateCode\}/g, loc.stateCode)
    .replace(/\{state\}/g, loc.state);

  const pageTitle = `${kw.title} for ${combo.industryName} in ${loc.city}, ${loc.state}`;

  const heroImage = getHeroImage(`${industrySlug}-${keyword}-${location}`);

  return (
    <main className="bg-white">
      {/* ─── Breadcrumbs ─────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-gray-200 bg-gray-50"
      >
        <div className="mx-auto max-w-7xl px-6 py-3">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/industries" className="hover:text-blue-600">Industries</Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/industries/${industrySlug}`} className="hover:text-blue-600">
                {combo.industryName}
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-900">
              {kw.title} in {loc.city}
            </li>
          </ol>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <Image
          src={heroImage}
          fill
          className="object-cover object-center"
          alt={pageTitle}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#002244]/90 via-[#003366]/80 to-[#004488]/75" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-300">
            {combo.industryName} · {loc.city}, {loc.stateCode}
          </p>
          <h1 className="text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
            {pageTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
            Industry-specialized {kw.title.toLowerCase()} tailored for{' '}
            {combo.industryName.toLowerCase()} companies in the{' '}
            {loc.market} market.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[#002244] shadow-lg transition hover:bg-blue-50"
            >
              Get a Free Strategy Call
            </Link>
            <Link
              href={`/industries/${industrySlug}`}
              className="rounded-full border-2 border-white px-8 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              {combo.industryName} Overview
            </Link>
          </div>
        </div>
      </section>

      <WhyIBGIsDifferent />

      {/* ─── Intro / Overview ────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Why {combo.industryName} Companies in {loc.city} Choose Us
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            {intro}
          </p>
        </div>
      </section>

      {/* ─── Value Propositions ──────────────────────────────────── */}
      {valueProps.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              What You Get
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
              Our {kw.title.toLowerCase()} for{' '}
              {combo.industryName.toLowerCase()} companies includes:
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {valueProps.map((vp, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-600">
                    {i + 1}
                  </span>
                  <p className="text-gray-700">{vp}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Industry Challenges ─────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Challenges Facing {combo.industryName} in {loc.city}
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {industry.challenges.slice(0, 4).map((c, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 p-8">
                <h3 className="text-lg font-bold text-gray-900">{c.title}</h3>
                <p className="mt-2 text-gray-600">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trusted By ──────────────────────────────────────────── */}
      <TrustedBy />

      <IBGCarousel />

      {/* ─── Other Services for this Industry ────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            More Services for {combo.industryName}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {combo.keywordSlugs
              .filter((s) => s !== keyword)
              .map((kwSlug) => {
                const kwData = getKeywordBySlug(kwSlug);
                if (!kwData) return null;
                return (
                  <Link
                    key={kwSlug}
                    href={`/industries/${industrySlug}/${kwSlug}/${location}`}
                    className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-lg"
                  >
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600">
                      {kwData.title} for {combo.industryName}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {kwData.description}
                    </p>
                    <span className="mt-3 inline-block text-sm font-semibold text-blue-600">
                      Learn more →
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* ─── Nearby Cities ───────────────────────────────────────── */}
      {nearby.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Also Serving Nearby Cities
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/industries/${industrySlug}/${keyword}/${n.slug}`}
                  className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:border-blue-500 hover:shadow-lg"
                >
                  <p className="font-bold text-gray-900">
                    {n.city}, {n.stateCode}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {kw.title} for {combo.industryName}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─────────────────────────────────────────────────── */}
      <TransformCTA />

      {/* ─── Structured Data ─────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: `Iconic Brand Group – ${kw.title} for ${combo.industryName}`,
              description: `${kw.title} for ${combo.industryName.toLowerCase()} companies in ${loc.city}, ${loc.stateCode}`,
              url: `https://www.iconicbrandgroup.com/industries/${industrySlug}/${keyword}/${location}`,
              areaServed: {
                '@type': 'City',
                name: loc.city,
                containedInPlace: {
                  '@type': 'State',
                  name: loc.state,
                },
              },
              provider: {
                '@type': 'Organization',
                name: 'Iconic Brand Group',
                url: 'https://www.iconicbrandgroup.com',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.iconicbrandgroup.com' },
                { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.iconicbrandgroup.com/industries' },
                { '@type': 'ListItem', position: 3, name: combo.industryName, item: `https://www.iconicbrandgroup.com/industries/${industrySlug}` },
                { '@type': 'ListItem', position: 4, name: `${kw.title} in ${loc.city}`, item: `https://www.iconicbrandgroup.com/industries/${industrySlug}/${keyword}/${location}` },
              ],
            },
          ]),
        }}
      />
    </main>
  );
}
