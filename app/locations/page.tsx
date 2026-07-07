import { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { getLocationsByState, getUniqueStatesCount, TOTAL_LOCATIONS } from '@/lib/target-locations'
import { allFranchiseKeywords, keywordCategories, TOTAL_KEYWORDS } from '@/lib/franchise-keywords'
import Breadcrumb from "@/components/Breadcrumb"
import Navbar from '@/components/Navbar'
import ContextualLinks from '@/components/ContextualLinks'
import GovernmentResources from '@/components/GovernmentResources'

export const metadata: Metadata = generateSEOMetadata({
  title: "Business Consulting & Marketing Services Locations | All 50 States | Iconic Brand Group",
  description: `Find Iconic Brand Group's business consulting and marketing services in ${TOTAL_LOCATIONS}+ cities across the United States. Strategic growth solutions for startups and businesses nationwide.`,
  keywords: [
    "business consulting locations",
    "startup consulting cities",
    "marketing agency near me",
    "business consulting locations USA",
    "small business marketing services nationwide",
    "business consulting all states",
  ],
  canonical: "/locations",
  openGraph: {
    title: "Our Locations | Business Consulting & Marketing Services Nationwide",
    description: `Iconic Brand Group serves startups and businesses in ${TOTAL_LOCATIONS}+ cities across the United States with strategic consulting and marketing solutions.`,
    image: "/locations/global-presence-og.jpg",
  },
});

// State abbreviation lookup
const stateAbbreviations: Record<string, string> = {
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
  'District of Columbia': 'DC'
};

// Category display labels for the service directory
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

export default function LocationsPage() {
  const locationsByState = getLocationsByState();
  const states = Object.keys(locationsByState);
  const statesCount = getUniqueStatesCount();

  // All category entries
  const categories = Object.entries(keywordCategories) as [string, typeof allFranchiseKeywords][];
  const totalProgrammatic = TOTAL_LOCATIONS * allFranchiseKeywords.length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="/videos/4514359-uhd_2560_1440_24fps.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-[#FFF9E6]/90 to-white/95" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="mb-8">
              <Breadcrumb
                items={[
                  { name: "Home", href: "/" },
                  { name: "Locations", current: true },
                ]}
                className="flex justify-start"
              />
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AF34]/10 to-[#5F9EA0]/10 backdrop-blur-sm border border-[#D5AF34]/20 rounded-full px-6 py-3 mb-8">
                <svg className="w-5 h-5 text-[#D5AF34]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text font-bold text-sm tracking-wide uppercase">
                  Nationwide Coverage
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-black leading-[0.9] text-black mb-8">
                Service{" "}
                <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">
                  Locations
                </span>
              </h1>

              <p className="text-xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
                Strategic business consulting and marketing services across the
                United States. Browse every state hub below for full service
                coverage&mdash;{totalProgrammatic.toLocaleString()} dedicated pages across
                all cities and services.
              </p>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-5xl font-black bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-transparent bg-clip-text mb-2">
                    {TOTAL_LOCATIONS}+
                  </div>
                  <div className="text-gray-600 font-medium">Cities Served</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] text-transparent bg-clip-text mb-2">
                    {statesCount}
                  </div>
                  <div className="text-gray-600 font-medium">States</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-black bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text mb-2">
                    {TOTAL_KEYWORDS}+
                  </div>
                  <div className="text-gray-600 font-medium">Services</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ STICKY STATE NAV ═══════════════ */}
        <nav
          aria-label="Jump to state"
          className="py-4 px-6 bg-gray-50 border-y border-gray-200 sticky top-0 z-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {states.map((state) => (
                <Link
                  key={state}
                  href={`/locations/${stateNameToSlug(state)}`}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-[#D5AF34] hover:text-[#D5AF34] transition-colors"
                >
                  {stateAbbreviations[state] || state}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* ═══════════════ STATE HUB DIRECTORY ═══════════════
            Each state links to /locations/[state] where ALL keywords × ALL
            cities are rendered as flat crawlable links. This is the main
            entry-point structure for 100% coverage of 52 000+ pages.
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 px-6" id="states">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 text-black">
                Browse by{" "}
                <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                  State
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Each state page contains every service &times; every city &mdash;
                {totalProgrammatic.toLocaleString()} total service pages with 100%
                link coverage.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {states.map((state) => {
                const cities = locationsByState[state];
                const stateAbbr = stateAbbreviations[state] || state;
                const stateLinks = cities.length * allFranchiseKeywords.length;

                return (
                  <Link
                    key={state}
                    href={`/locations/${stateNameToSlug(state)}`}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#D5AF34] hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#D5AF34] to-[#5F9EA0] rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {stateAbbr}
                      </div>
                      <h3 className="font-bold text-black group-hover:text-[#D5AF34] transition-colors">
                        {state}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500">
                      {cities.length} {cities.length === 1 ? 'city' : 'cities'} &middot;{' '}
                      {stateLinks.toLocaleString()} service pages
                    </p>
                    {/* Top city names as secondary context */}
                    <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">
                      {cities.slice(0, 4).map(c => c.city).join(', ')}
                      {cities.length > 4 ? ` +${cities.length - 4} more` : ''}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════ KEYWORD / SERVICE DIRECTORY ═══════════════
            All 123 keywords listed by category. Each keyword links to its
            page in every state's top city, giving crawlers keyword-axis
            entry points in addition to the state-axis above.
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 px-6 bg-gray-50" id="services">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 text-black">
                Complete Service{" "}
                <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                  Directory
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                All {TOTAL_KEYWORDS}+ services available in every city we serve.
                Each service links to pages in major markets across multiple states.
              </p>
            </div>

            <div className="space-y-12">
              {categories.map(([categoryKey, keywords]) => (
                <div key={categoryKey}>
                  <h3 className="text-2xl font-bold mb-5 text-black border-l-4 border-[#D5AF34] pl-4">
                    {categoryLabels[categoryKey] || categoryKey}
                    <span className="text-gray-400 font-normal text-base ml-3">
                      ({keywords.length} services)
                    </span>
                  </h3>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {keywords.map((keyword) => {
                      // Pick first city from 5 different states for geographic spread
                      const seenStates = new Set<string>();
                      const sampleCities = [];
                      for (const s of states) {
                        if (sampleCities.length >= 5) break;
                        const firstCity = locationsByState[s][0];
                        if (firstCity && !seenStates.has(s)) {
                          seenStates.add(s);
                          sampleCities.push(firstCity);
                        }
                      }

                      return (
                        <div
                          key={keyword.slug}
                          className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#D5AF34]/40 transition-colors"
                        >
                          <h4 className="font-bold text-black mb-1 text-sm">
                            {keyword.title}
                          </h4>
                          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                            {keyword.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {sampleCities.map((city) => (
                              <Link
                                key={city.slug}
                                href={`/${keyword.slug}/${city.slug}`}
                                className="text-xs bg-gray-50 border border-gray-200 px-2 py-1 rounded text-gray-600 hover:border-[#D5AF34] hover:text-[#D5AF34] transition-colors"
                              >
                                {city.city}, {city.stateCode}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-[#D5AF34] font-bold hover:underline"
              >
                View All Service Pages
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════ CONTEXTUAL INTERNAL LINKS ═══════════════ */}
        <ContextualLinks
          currentPath="/locations"
          title="Explore Our Business Solutions"
          count={6}
        />

        {/* ═══════════════ CTA ═══════════════ */}
        <section className="py-24 px-6 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-6 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Contact us to discuss how we can help grow your business in any market.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-white px-12 py-6 rounded-full font-bold text-xl shadow-2xl hover:shadow-[#D5AF34]/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact Us
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GovernmentResources count={4} />
    </>
  );
}
