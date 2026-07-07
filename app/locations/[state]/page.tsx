import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { getLocationsByState, TOTAL_LOCATIONS } from '@/lib/target-locations'
import { allFranchiseKeywords, keywordCategories, TOTAL_KEYWORDS } from '@/lib/franchise-keywords'
import { getHeroImage } from '@/lib/hero-images'
import Breadcrumb from "@/components/Breadcrumb"
import Navbar from '@/components/Navbar'
import ContextualLinks from '@/components/ContextualLinks'
import GovernmentResources from '@/components/GovernmentResources'

// ── State slug ↔ full name maps ────────────────────────────────────────────────
const STATE_SLUG_TO_NAME: Record<string, string> = {
  'alabama': 'Alabama', 'alaska': 'Alaska', 'arizona': 'Arizona', 'arkansas': 'Arkansas',
  'california': 'California', 'colorado': 'Colorado', 'connecticut': 'Connecticut',
  'delaware': 'Delaware', 'district-of-columbia': 'District of Columbia', 'florida': 'Florida',
  'georgia': 'Georgia', 'hawaii': 'Hawaii', 'idaho': 'Idaho', 'illinois': 'Illinois',
  'indiana': 'Indiana', 'iowa': 'Iowa', 'kansas': 'Kansas', 'kentucky': 'Kentucky',
  'louisiana': 'Louisiana', 'maine': 'Maine', 'maryland': 'Maryland', 'massachusetts': 'Massachusetts',
  'michigan': 'Michigan', 'minnesota': 'Minnesota', 'mississippi': 'Mississippi', 'missouri': 'Missouri',
  'montana': 'Montana', 'nebraska': 'Nebraska', 'nevada': 'Nevada', 'new-hampshire': 'New Hampshire',
  'new-jersey': 'New Jersey', 'new-mexico': 'New Mexico', 'new-york': 'New York',
  'north-carolina': 'North Carolina', 'north-dakota': 'North Dakota', 'ohio': 'Ohio',
  'oklahoma': 'Oklahoma', 'oregon': 'Oregon', 'pennsylvania': 'Pennsylvania',
  'rhode-island': 'Rhode Island', 'south-carolina': 'South Carolina', 'south-dakota': 'South Dakota',
  'tennessee': 'Tennessee', 'texas': 'Texas', 'utah': 'Utah', 'vermont': 'Vermont',
  'virginia': 'Virginia', 'washington': 'Washington', 'west-virginia': 'West Virginia',
  'wisconsin': 'Wisconsin', 'wyoming': 'Wyoming',
};

const STATE_ABBREVIATIONS: Record<string, string> = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
  'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
  'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
  'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
  'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
  'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
  'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
  'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
  'District of Columbia': 'DC',
};

// Category display labels
const categoryLabels: Record<string, string> = {
  primary: 'Franchise Marketing & Growth',
  franchisor: 'Franchisor Solutions',
  franchisee: 'Franchisee Services',
  consulting: 'Strategic Consulting',
  hybrid: 'Integrated Marketing & Consulting',
  technology: 'Technology & Innovation',
  investor: 'Investor & Capital',
  startup: 'Startup Consulting',
  marketing: 'Marketing Agency Services',
  operations: 'Operations & Management',
  funding: 'Funding & Capital Strategy',
  entrepreneur: 'Entrepreneur Services',
};

function stateNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

// ── Static params for all states that have locations ───────────────────────────
export function generateStaticParams() {
  const locationsByState = getLocationsByState();
  return Object.keys(locationsByState).map((stateName) => ({
    state: stateNameToSlug(stateName),
  }));
}

// ── Dynamic metadata ──────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateName = STATE_SLUG_TO_NAME[stateSlug];
  if (!stateName) return {};

  const locationsByState = getLocationsByState();
  const cities = locationsByState[stateName] || [];
  const stateAbbr = STATE_ABBREVIATIONS[stateName] || stateSlug.toUpperCase();

  return generateSEOMetadata({
    title: `Business Consulting & Marketing Services in ${stateName} (${stateAbbr}) | ${cities.length} Cities | Iconic Brand Group`,
    description: `Find all ${TOTAL_KEYWORDS}+ consulting and marketing services in ${cities.length} cities across ${stateName}. Iconic Brand Group provides strategic growth solutions for startups and businesses in ${stateAbbr}.`,
    keywords: [
      `business consulting ${stateName}`,
      `marketing agency ${stateName}`,
      `startup consulting ${stateAbbr}`,
      `business consulting ${cities[0]?.city || stateName}`,
      `franchise marketing ${stateName}`,
    ],
    canonical: `/locations/${stateSlug}`,
    openGraph: {
      title: `${stateName} Business Consulting & Marketing Services | Iconic Brand Group`,
      description: `All ${TOTAL_KEYWORDS}+ services across ${cities.length} cities in ${stateName}. Find consulting and marketing expertise near you.`,
    },
  });
}

// ── Page component ─────────────────────────────────────────────────────────────
export default async function StateLocationPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state: stateSlug } = await params;
  const stateName = STATE_SLUG_TO_NAME[stateSlug];
  if (!stateName) notFound();

  const locationsByState = getLocationsByState();
  const cities = locationsByState[stateName];
  if (!cities || cities.length === 0) notFound();

  const stateAbbr = STATE_ABBREVIATIONS[stateName] || stateSlug.toUpperCase();
  const categories = Object.entries(keywordCategories) as [string, typeof allFranchiseKeywords][];
  const totalLinks = cities.length * allFranchiseKeywords.length;

  // Get all other states for cross-linking
  const allStates = Object.keys(locationsByState).filter(s => s !== stateName).sort();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative py-24 px-6 overflow-hidden min-h-[420px] flex items-center">
          <Image
            src={getHeroImage(stateSlug)}
            fill
            className="object-cover object-center"
            alt={`Business consulting in ${stateName}`}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-[#FFF9E6]/88 to-white/95" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="mb-8">
              <Breadcrumb
                items={[
                  { name: "Home", href: "/" },
                  { name: "Locations", href: "/locations" },
                  { name: stateName, current: true },
                ]}
                className="flex justify-start"
              />
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AF34]/10 to-[#5F9EA0]/10 border border-[#D5AF34]/20 rounded-full px-6 py-3 mb-6">
                <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text font-bold text-sm tracking-wide uppercase">
                  {stateAbbr} &middot; {cities.length} Cities &middot; {TOTAL_KEYWORDS}+ Services
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black leading-[0.9] text-black mb-6">
                Consulting &amp; Marketing in{" "}
                <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">
                  {stateName}
                </span>
              </h1>

              <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                Every service we offer is available in every city below.
                Browse {totalLinks.toLocaleString()} service&ndash;city combinations
                across {cities.length} {stateName} locations.
              </p>

              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-transparent bg-clip-text mb-1">
                    {cities.length}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] text-transparent bg-clip-text mb-1">
                    {TOTAL_KEYWORDS}+
                  </div>
                  <div className="text-gray-600 text-sm font-medium">Services</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text mb-1">
                    {totalLinks.toLocaleString()}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">Total Pages</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ QUICK CITY NAV ═══════════════ */}
        <nav
          aria-label="Jump to city"
          className="py-3 px-6 bg-gray-50 border-y border-gray-200 sticky top-0 z-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-1.5">
              {cities.map((city) => (
                <a
                  key={city.slug}
                  href={`#city-${city.slug}`}
                  className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-700 hover:border-[#D5AF34] hover:text-[#D5AF34] transition-colors"
                >
                  {city.city}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* ═══════════════ FULL COVERAGE: EVERY CITY × EVERY KEYWORD ═══════════════
            This is the 100% coverage section. For each city in this state,
            ALL 123 keywords are rendered as flat, crawlable <Link> elements.
            No accordions, no hidden content.
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black mb-3 text-black">
                All Services in{" "}
                <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                  {stateName}
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every keyword below links to a dedicated page for that service in
                that city &mdash; {totalLinks.toLocaleString()} total links on this page.
              </p>
            </div>

            <div className="space-y-16">
              {cities.map((city) => (
                <div
                  key={city.slug}
                  id={`city-${city.slug}`}
                  className="scroll-mt-[7.25rem]"
                >
                  {/* City heading */}
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-[#D5AF34]/20">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#D5AF34] to-[#5F9EA0] rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {stateAbbr}
                    </div>
                    <h3 className="text-2xl font-bold text-black">
                      {city.city}, {city.stateCode}
                    </h3>
                    <span className="text-gray-400 text-sm">
                      {allFranchiseKeywords.length} services
                    </span>
                  </div>

                  {/* All keywords grouped by category */}
                  <div className="space-y-6">
                    {categories.map(([catKey, keywords]) => (
                      <div key={catKey}>
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">
                          {categoryLabels[catKey] || catKey}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {keywords.map((kw) => (
                            <Link
                              key={kw.slug}
                              href={`/${kw.slug}/${city.slug}`}
                              className="text-xs bg-white border border-gray-200 px-2.5 py-1.5 rounded-md text-gray-700 hover:border-[#D5AF34] hover:text-[#D5AF34] hover:bg-[#D5AF34]/5 transition-colors"
                              title={`${kw.title} in ${city.city}, ${city.stateCode}`}
                            >
                              {kw.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ OTHER STATES NAV ═══════════════ */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-3 text-black">
                Browse Other{" "}
                <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                  States
                </span>
              </h2>
              <p className="text-gray-600">
                Full service coverage in every state we serve
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {allStates.map((otherState) => {
                const abbr = STATE_ABBREVIATIONS[otherState] || otherState;
                return (
                  <Link
                    key={otherState}
                    href={`/locations/${stateNameToSlug(otherState)}`}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-[#D5AF34] hover:text-[#D5AF34] transition-colors"
                  >
                    {abbr}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════ CONTEXTUAL INTERNAL LINKS ═══════════════ */}
        <ContextualLinks
          currentPath={`/locations/${stateSlug}`}
          title="Explore Our Business Solutions"
          count={6}
        />

        {/* ═══════════════ CTA ═══════════════ */}
        <section className="py-20 px-6 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-6 text-white">
              Ready to Grow in {stateName}?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Contact us to discuss how we can help your business thrive in {stateAbbr}.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-[#D5AF34]/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              Contact Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <GovernmentResources count={4} />
    </>
  );
}
