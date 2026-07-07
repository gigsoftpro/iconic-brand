import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  industries,
  getAllIndustrySlugs,
  getIndustryBySlug,
} from '@/lib/industry-data';

// ── Static params for SSG ──────────────────────────────────────────
export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

// ── Dynamic metadata ───────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  return {
    title: industry.metaTitle,
    description: industry.description,
    keywords: industry.keywords,
    alternates: {
      canonical: `https://www.iconicbrandgroup.com/industries/${industry.slug}`,
    },
    openGraph: {
      title: industry.metaTitle,
      description: industry.description,
      url: `https://www.iconicbrandgroup.com/industries/${industry.slug}`,
      type: 'website',
    },
  };
}

// ── Page component ─────────────────────────────────────────────────
export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  // Related industries (exclude current)
  const related = industries
    .filter((i) => i.slug !== industry.slug)
    .slice(0, 3);

  return (
    <main className="bg-white">
      {/* ─── Breadcrumbs ─────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="bg-gray-50 border-b border-gray-200"
      >
        <div className="mx-auto max-w-7xl px-6 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/industries" className="hover:text-blue-600">
                Industries
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-900">{industry.name}</li>
          </ol>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-[#002244] via-[#003366] to-[#004488] py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-300">
            Industry Focus
          </p>
          <h1 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
            {industry.name}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100 md:text-xl">
            {industry.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[#002244] shadow-lg transition hover:bg-blue-50"
            >
              Get a Free Consultation
            </Link>
            <Link
              href="/services"
              className="rounded-full border-2 border-white px-8 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Overview ────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Why {industry.name}?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            {industry.overview}
          </p>
        </div>
      </section>

      {/* ─── Challenges ──────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Key Challenges in {industry.name}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            We understand what keeps {industry.name.toLowerCase()} leaders up at
            night. Here's how we help.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {industry.challenges.map((c, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-lg font-bold text-blue-600">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-gray-600">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services ────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            How We Help {industry.name} Companies
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {industry.services.map((s, i) => (
              <Link
                key={i}
                href={s.link}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{s.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-blue-600 group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats ───────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-[#002244] to-[#004488] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {industry.stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-extrabold text-white">{s.value}</p>
                <p className="mt-2 text-blue-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQs ────────────────────────────────────────────────── */}
      {industry.faqs.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-12 space-y-8">
              {industry.faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Related Industries ──────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Explore More Industries
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/industries/${r.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                  {r.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{r.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-[#002244] to-[#004488] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            Ready to Grow Your {industry.name} Business?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Schedule a free strategy call with our team. We&apos;ll analyze your
            market, identify opportunities, and build a custom growth plan.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-10 py-4 text-sm font-bold text-[#002244] shadow-lg transition hover:bg-blue-50"
          >
            Book Your Free Consultation
          </Link>
        </div>
      </section>

      {/* ─── Structured Data ─────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: industry.metaTitle,
              description: industry.description,
              url: `https://www.iconicbrandgroup.com/industries/${industry.slug}`,
              publisher: {
                '@type': 'Organization',
                name: 'Iconic Brand Group',
                url: 'https://www.iconicbrandgroup.com',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.iconicbrandgroup.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Industries',
                  item: 'https://www.iconicbrandgroup.com/industries',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: industry.name,
                  item: `https://www.iconicbrandgroup.com/industries/${industry.slug}`,
                },
              ],
            },
            ...(industry.faqs.length > 0
              ? [
                  {
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: industry.faqs.map((faq) => ({
                      '@type': 'Question',
                      name: faq.question,
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: faq.answer,
                      },
                    })),
                  },
                ]
              : []),
          ]),
        }}
      />
    </main>
  );
}
