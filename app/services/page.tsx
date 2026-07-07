import { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'
import ContextualLinks from '@/components/ContextualLinks'
import GovernmentResources from '@/components/GovernmentResources'


export const metadata: Metadata = generateSEOMetadata({
  title:
    "Business Services | Consulting & Marketing Solutions | Iconic Brand Group",
  description:
    "Comprehensive business consulting and digital marketing services across 500+ locations worldwide. Strategic planning, operations optimization, brand strategy, and growth solutions.",
  keywords: [
    "business services",
    "consulting services",
    "marketing services",
    "strategic planning",
    "digital marketing",
    "business growth",
    "brand strategy",
    "operations consulting",
  ],
  canonical: "/services",
  openGraph: {
    title: "Business Services | Consulting & Marketing Solutions",
    description:
      "Comprehensive business consulting and digital marketing services across 500+ locations worldwide.",
    image: "/services/services-overview-og.jpg",
    type: "website",
  },
});

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="min-h-screen bg-white overflow-x-hidden pt-[7.25rem]">
        <main>
          {/* Hero Section */}
          <section className="py-32 px-6 bg-gradient-to-br from-white via-[#FFF9E6] to-white">
            <div className="max-w-6xl mx-auto text-center">
              <nav className="mb-8 text-sm">
                <ol className="flex items-center justify-center space-x-2 text-gray-600">
                  <li>
                    <a href="/" className="hover:text-[#D5AF34]">
                      Home
                    </a>
                  </li>
                  <li>/</li>
                  <li className="text-[#D5AF34]">Services</li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AF34]/10 to-[#5F9EA0]/10 backdrop-blur-sm border border-[#D5AF34]/20 rounded-full px-6 py-3 mb-8">
                <svg
                  className="w-5 h-5 text-[#D5AF34]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                  />
                </svg>
                <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text font-bold text-sm tracking-wide uppercase">
                  Professional Services
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-black leading-[0.9] text-black mb-8">
                Business Services{" "}
                <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">
                  Worldwide
                </span>
              </h1>

              <p className="text-xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
                Comprehensive consulting and marketing solutions designed to
                transform businesses into industry leaders. Serving 500+
                locations across major business hubs globally.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="/services/consulting"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-[#D5AF34]/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Business Consulting
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>

                <a
                  href="/services/marketing"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-[#5F9EA0]/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Digital Marketing
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* Services Overview */}
          <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16">
                {/* Business Consulting */}
                <div className="bg-gradient-to-br from-white to-[#FFF9E6] rounded-3xl border-2 border-gray-200 p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D5AF34] to-[#C19A2E] rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>

                  <h2 className="text-4xl font-black mb-6 text-black">
                    Business{" "}
                    <span className="bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-transparent bg-clip-text">
                      Consulting
                    </span>
                  </h2>

                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Strategic guidance to optimize operations, drive growth, and
                    transform your company into an industry leader.
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      "Strategic Planning & Execution",
                      "Operations Optimization",
                      "Financial Advisory & Planning",
                      "Risk Management & Compliance",
                      "Change Management",
                      "Performance Improvement",
                    ].map((service, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#D5AF34] rounded-full"></div>
                        <span className="text-gray-700 font-medium">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="/services/consulting"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Learn More
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>

                {/* Digital Marketing */}
                <div className="bg-gradient-to-br from-white to-[#F0F8FF] rounded-3xl border-2 border-gray-200 p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#5F9EA0] to-[#4A7D7F] rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                      />
                    </svg>
                  </div>

                  <h2 className="text-4xl font-black mb-6 text-black">
                    Digital{" "}
                    <span className="bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] text-transparent bg-clip-text">
                      Marketing
                    </span>
                  </h2>

                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Data-driven campaigns that amplify your brand and engage
                    your audience through innovative digital strategies.
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      "Search Engine Optimization (SEO)",
                      "Social Media Marketing",
                      "Content Strategy & Creation",
                      "Brand Strategy & Design",
                      "Paid Advertising (PPC)",
                      "Analytics & Reporting",
                    ].map((service, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#D5AF34] rounded-full"></div>
                        <span className="text-gray-700 font-medium">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="/services/marketing"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Learn More
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Contextual Internal Links */}
          <ContextualLinks
            currentPath="/services"
            title="Explore Our Locations & Expertise"
            count={8}
          />

          {/* CTA Section */}
          <section className="py-24 px-6 bg-black">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl font-black mb-6 text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Get started with a free consultation and discover how we can
                accelerate your growth.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-white px-12 py-6 rounded-full font-bold text-xl shadow-2xl hover:shadow-[#D5AF34]/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Free Consultation
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                    />
                  </svg>
                </a>

                <a
                  href="tel:+1-XXX-XXX-XXXX"
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-white hover:text-black transition-all duration-300"
                >
                  Call Now
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Government Resources */}
        <GovernmentResources count={4} />
      </div>
    </>
  );
}