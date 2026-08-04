import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaChartBar,
  FaChartLine,
  FaBolt,
  FaExclamationTriangle,
  FaArrowRight,
  FaChevronDown,
  FaCircle,
  FaBuilding,
  FaLandmark,
  FaHandshake,
} from "react-icons/fa";
import {
  allFranchiseKeywords,
  getKeywordBySlug,
  isStartupKeyword,
} from "@/lib/franchise-keywords";
import { getLocationBySlug, getNearbyLocations } from "@/lib/target-locations";
import {
  getCityContext,
  getCityFAQs,
  getCategoryServices,
} from "@/lib/city-context";
import {
  getMarketData,
  getExpertQuote,
  getServiceDefinition,
  getIndustryMistakes,
  getTestimonial,
  getCitationsForPage,
} from "@/lib/geo-content";
import { getHeroImage } from "@/lib/hero-images";
import { getCityServiceContent } from "@/lib/city-service-content";
import { getCityResourceLinks, SBA_LINKS } from "@/lib/city-resource-links";
import TrustedBy from "@/components/TrustedBy";
import WhyIBGIsDifferent from "@/components/WhyIBGIsDifferent";
import IBGCarousel from "@/components/IBGCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";
import ResourceLinkCard from "@/components/ResourceLinkCard";

// ISR Configuration: Generate pages on-demand and revalidate every 7 days
export const revalidate = 604800; // 7 days in seconds
export const dynamicParams = true; // Allow pages not in generateStaticParams to be generated on-demand

// Pre-render only a small subset at build time - rest will be generated on-demand via ISR
export async function generateStaticParams() {
  // Only pre-render a small subset to keep build times fast
  // The rest will be generated on first request and cached
  // Return empty array to generate ALL pages on-demand (fastest build)
  return [];
}

// Generate metadata for each page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ keyword: string; location: string }>;
}): Promise<Metadata> {
  const { keyword, location } = await params;
  const keywordData = getKeywordBySlug(keyword);
  const locationData = getLocationBySlug(location);

  if (!keywordData || !locationData) {
    return { title: "Page Not Found" };
  }

  const cityServiceContent = await getCityServiceContent(keyword, location);

  const title = keywordData.metaTitle
    .replace("{city}", locationData.city)
    .replace("{stateCode}", locationData.stateCode)
    .replace("{state}", locationData.state);

  // MCP On-Page SEO: meta description should include primary keyword naturally,
  // use [Hook]. [Supporting Detail]. [CTA]. format
  const isStartupCategory = [
    "startup",
    "marketing",
    "operations",
    "funding",
    "entrepreneur",
  ].includes(keywordData.category);
  const serviceType = isStartupCategory
    ? "business consulting and marketing"
    : "marketing and consulting";
  const description =
    cityServiceContent?.hero.subtext ??
    `${keywordData.description} Serving ${locationData.city}, ${locationData.stateCode} and the ${locationData.market} area. Contact us for a free consultation.`;

  const canonicalUrl = `http://localhost:3000/${keyword}/${location}`;

  // MCP On-Page SEO: keywords should be contextually relevant, not stuffed
  const keywordsArray = [
    keywordData.title.toLowerCase(),
    `${keywordData.title.toLowerCase()} ${locationData.city.toLowerCase()}`,
    `${locationData.city.toLowerCase()} ${isStartupCategory ? "business consulting" : "marketing agency"}`,
    `${serviceType} ${locationData.city.toLowerCase()}`,
    `${locationData.market.toLowerCase()} ${isStartupCategory ? "consulting" : "marketing agency"}`,
  ];

  return {
    title,
    description,
    keywords: keywordsArray,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Iconic Brand Group",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

// Service offerings are now dynamically loaded from city-context.ts
// based on keyword category (startup, marketing, operations, funding, entrepreneur, default)
// This ensures content differentiation per MCP requirements

// Industries are now dynamically derived from city context
// Each city gets its own industry list based on the SEO Goals CSV rationale column

// Common mistakes are now industry-specific via geo-content.ts
// Each industry gets unique mistakes with real citations (not just startup vs franchise toggle)

// Mini case studies (rotated based on location tier/region)
const caseStudies = {
  Southeast: {
    headline: "Multi-Unit Business Growth",
    result: "340% increase in qualified leads",
    description:
      "Helped a QSR brand expand from 12 to 28 locations across the Southeast through targeted digital marketing and strategic growth campaigns.",
    industry: "Food & Beverage",
  },
  Southwest: {
    headline: "Market Entry Success",
    result: "180% ROI in first 6 months",
    description:
      "Launched a home services brand into 5 new Southwest markets with localized SEO, paid media, and community partnerships.",
    industry: "Home Services",
  },
  Midwest: {
    headline: "Brand Revitalization",
    result: "67% increase in same-store sales",
    description:
      "Repositioned a legacy fitness brand for modern consumers through rebranding, social media, and influencer partnerships.",
    industry: "Fitness & Wellness",
  },
  Northeast: {
    headline: "Digital Transformation",
    result: "425% increase in online bookings",
    description:
      "Modernized a professional services company with new website, booking system, and automated marketing funnels.",
    industry: "Professional Services",
  },
  West: {
    headline: "Competitive Market Dominance",
    result: "#1 local search ranking in 90 days",
    description:
      "Outranked established competitors in saturated West Coast markets through aggressive local SEO and reputation management.",
    industry: "Healthcare",
  },
};

// Market characteristics by tier (KB: location-specific unique context)
const marketCharacteristics = {
  primary: {
    marketType: "Major Metropolitan Market",
    opportunity: "High-volume consumer base with significant business density",
    challenge: "Competitive saturation requiring differentiated positioning",
    strategy: "Premium brand positioning with multi-channel dominance",
  },
  suburban: {
    marketType: "Growth Suburban Market",
    opportunity: "Expanding population with increasing disposable income",
    challenge: "Emerging competition and fragmented local awareness",
    strategy: "Community-focused marketing with rapid local SEO capture",
  },
  secondary: {
    marketType: "Secondary Market",
    opportunity: "Lower competition with untapped growth potential",
    challenge: "Smaller audience requiring efficient marketing spend",
    strategy: "Targeted digital campaigns with strong ROI focus",
  },
};

export default async function KeywordLocationPage({
  params,
}: {
  params: Promise<{ keyword: string; location: string }>;
}) {
  const { keyword, location } = await params;
  const keywordData = getKeywordBySlug(keyword);
  const locationData = getLocationBySlug(location);

  if (!keywordData || !locationData) {
    notFound();
  }

  const cityServiceContent = await getCityServiceContent(keyword, location);
  const nearbyLocations = getNearbyLocations(location, 6);
  const cityResourceLinks = getCityResourceLinks(location);
  const h1 = keywordData.h1Template
    .replace("{city}", locationData.city)
    .replace("{stateCode}", locationData.stateCode)
    .replace("{state}", locationData.state);

  // ── MCP: City-specific context for content differentiation ──
  const cityContext = getCityContext(
    locationData.slug || location,
    locationData.city,
    locationData.state,
    locationData.market,
    locationData.tier,
  );
  const isStartup = isStartupKeyword(keyword);
  const coreServices =
    cityServiceContent?.services.items ??
    getCategoryServices(keywordData.category);

  // ── MCP GEO: Industry-specific mistakes (not generic startup vs franchise) ──
  const primaryIndustry = cityContext.industries[0] || "smb";
  const commonMistakes =
    cityServiceContent?.commonMistakes.items ??
    getIndustryMistakes(primaryIndustry);

  // ── MCP GEO: Expert quote, market data, definition, testimonial, citations ──
  // When a compound-key content record exists (e.g. Birmingham services), every
  // section below is driven by fully-generated, per-service unique content.
  // Otherwise we fall back to the shared tier/industry/category helpers so all
  // other cities keep working exactly as before.
  const expertQuote =
    cityServiceContent?.expertQuote ??
    getExpertQuote(primaryIndustry, locationData.city);
  const marketData =
    cityServiceContent?.marketData ?? getMarketData(locationData.tier);
  const serviceDefinition =
    cityServiceContent?.definition ??
    getServiceDefinition(keywordData.category);
  const testimonial =
    cityServiceContent?.trustedPartner.testimonial ??
    getTestimonial(locationData.city);
  const citations =
    cityServiceContent?.sources ??
    getCitationsForPage(locationData.city, locationData.tier);

  // Service label: "consulting" for startup/ops, "marketing" for marketing, etc.
  const serviceLabel = isStartup
    ? "consulting and growth strategy"
    : keywordData.category === "marketing"
      ? "marketing and brand strategy"
      : "marketing and consulting";

  const heroHeading = cityServiceContent?.hero.headline ?? h1;
  const heroHeadingParts = heroHeading.split(locationData.city);
  const heroSubtext =
    cityServiceContent?.hero.subtext ??
    `${keywordData.description} Iconic Brand Group brings proven ${serviceLabel} expertise to ${locationData.city} and the greater ${locationData.market} area.`;
  const heroTrustBadges = cityServiceContent?.hero.trustBadges ?? [
    "500+ Businesses Served",
    "15+ Years Experience",
    `${cityContext.industries
      .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
      .slice(0, 2)
      .join(" & ")} Expertise`,
  ];
  const whyDifferent = cityServiceContent?.whyDifferent;
  const valuePillars = cityServiceContent
    ? [
        { title: "Money", description: cityServiceContent.valuePillars.money },
        { title: "Time", description: cityServiceContent.valuePillars.time },
        { title: "Risk", description: cityServiceContent.valuePillars.risk },
        {
          title: "Status",
          description: cityServiceContent.valuePillars.status,
        },
      ]
    : undefined;
  const overviewHeading =
    cityServiceContent?.trustedPartner.heading ??
    `Trusted ${keywordData.title} Partner in ${locationData.city}`;
  const overviewBody =
    cityServiceContent?.trustedPartner.body80Words ??
    cityContext.uniqueParagraph;
  const quickFacts = cityServiceContent?.trustedPartner.fiveQuickFacts ?? [
    `Serving ${locationData.city} & ${locationData.market} Area`,
    `Full-Service ${isStartup ? "Consulting & Growth Strategy" : "Marketing & Consulting"}`,
    `Proven Track Record with ${cityContext.industries[0] ? cityContext.industries[0].charAt(0).toUpperCase() + cityContext.industries[0].slice(1) : "Business"} Companies`,
    "Data-Driven Strategies & Measurable Results",
    "Free Initial Consultation Available",
  ];
  const tierMarketCharacteristics =
    marketCharacteristics[
      locationData.tier as keyof typeof marketCharacteristics
    ] ?? marketCharacteristics.secondary;
  const marketAnalysis = cityServiceContent?.marketAnalysis;
  const marketAnalysisLabel =
    marketAnalysis?.snapshot.marketClassification ??
    tierMarketCharacteristics.marketType;
  const marketAnalysisHeading =
    marketAnalysis?.heading ??
    `${locationData.city} Market Analysis for ${isStartup ? "Startups & Growing Businesses" : "Business Growth"}`;
  const marketAnalysisBody =
    marketAnalysis?.body40Words ??
    `Understanding the unique dynamics of the ${locationData.market} market is essential for success. ${locationData.city} is known for ${cityContext.rationale.toLowerCase()}, creating both opportunity and competitive pressure. Our team analyzes local competition, consumer behavior, and growth opportunities to create strategies that work specifically for ${locationData.city}.`;
  const marketAnalysisBullets = {
    marketOpportunity:
      marketAnalysis?.bullets.marketOpportunity ??
      tierMarketCharacteristics.opportunity,
    keyChallenge:
      marketAnalysis?.bullets.keyChallenge ??
      tierMarketCharacteristics.challenge,
    ourStrategy:
      marketAnalysis?.bullets.ourStrategy ?? tierMarketCharacteristics.strategy,
  };
  const marketSnapshot = {
    marketRegion: marketAnalysis?.snapshot.marketRegion ?? locationData.region,
    metroArea: marketAnalysis?.snapshot.metroArea ?? locationData.market,
    marketClassification:
      marketAnalysis?.snapshot.marketClassification ?? locationData.tier,
    state: marketAnalysis?.snapshot.state ?? locationData.state,
  };

  // ── Full-page override content (unique per service when available) ──
  const primaryIndustryLabel = cityContext.industries[0]
    ? cityContext.industries[0].charAt(0).toUpperCase() +
      cityContext.industries[0].slice(1)
    : "Diversified";
  const primaryIndustryFocus =
    cityServiceContent?.marketData.primaryIndustryFocus ?? primaryIndustryLabel;

  const servicesHeading =
    cityServiceContent?.services.heading ??
    `Our ${keywordData.title} Services in ${locationData.city}`;
  const servicesSubtext =
    cityServiceContent?.services.subtext ??
    `Comprehensive ${serviceLabel} solutions to help your business thrive in the competitive ${locationData.market} market.`;

  const industriesHeading =
    cityServiceContent?.industries.heading ??
    `Industries We Serve in ${locationData.city}`;
  const industriesIntro =
    cityServiceContent?.industries.intro ??
    `${locationData.city} is known for ${cityContext.rationale.toLowerCase()}. We deliver specialized strategies for the industries driving the ${locationData.market} economy.`;
  const industryTags =
    cityServiceContent?.industries.tags ??
    cityContext.industries.map((i) => i.charAt(0).toUpperCase() + i.slice(1));
  const industryPainPoints =
    cityServiceContent?.industries.painPoints ?? cityContext.painPoints;

  const mistakesHeading =
    cityServiceContent?.commonMistakes.heading ??
    `5 Costly ${primaryIndustryLabel} Marketing Mistakes in ${locationData.city}`;
  const mistakesSubtext =
    cityServiceContent?.commonMistakes.subtext ??
    `Avoid these common pitfalls that cost businesses in the ${locationData.market} market thousands in lost revenue.`;
  // Normalize mistake shape (generated uses {mistake,consequence,solution}; helper matches)
  const mistakeItems = commonMistakes;

  const regionCaseStudy =
    caseStudies[locationData.region as keyof typeof caseStudies] ??
    caseStudies.Southeast;
  const caseStudy = {
    badge:
      cityServiceContent?.caseStudy.badge ??
      `${locationData.region} Success Story`,
    headline:
      cityServiceContent?.caseStudy.headline ?? regionCaseStudy.headline,
    result: cityServiceContent?.caseStudy.result ?? regionCaseStudy.result,
    description:
      cityServiceContent?.caseStudy.description ?? regionCaseStudy.description,
    industry:
      cityServiceContent?.caseStudy.industry ?? regionCaseStudy.industry,
    delivered: cityServiceContent?.caseStudy.delivered ?? [
      `Comprehensive market analysis for ${locationData.market}`,
      "Custom multi-channel marketing strategy",
      "Local SEO & Google Business Profile optimization",
      "Ongoing performance tracking & optimization",
    ],
  };

  const defaultProcessSteps = [
    {
      title: "Discovery & Audit",
      description: `Deep dive into your business, ${locationData.market} market dynamics, and competitive landscape.`,
    },
    {
      title: "Strategy Development",
      description: `Custom growth roadmap with specific KPIs, timelines, and tactics for ${locationData.city}.`,
    },
    {
      title: "Implementation",
      description:
        "Execute marketing campaigns, optimize operations, and build local market presence.",
    },
    {
      title: "Optimize & Scale",
      description:
        "Continuous optimization, monthly reporting, and scaling successful strategies across your system.",
    },
  ];
  const processHeading =
    cityServiceContent?.process.heading ??
    `Our Proven Process for ${locationData.city} Business Success`;
  const processSubtext =
    cityServiceContent?.process.subtext ??
    "A systematic approach refined through 500+ successful engagements.";
  const processSteps = cityServiceContent?.process.steps ?? defaultProcessSteps;

  const tldrOverride = cityServiceContent?.tldr;
  const overviewSecondary = cityServiceContent?.overview.secondaryParagraph;

  // Generate JSON-LD Schema — per MCP Local SEO: use ProfessionalService,
  // remove fabricated aggregateRating (Google Structured Data policy)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `https://www.iconicbrandgroup.com/${keyword}/${location}#business`,
    name: `Iconic Brand Group - ${locationData.city}`,
    description: keywordData.description,
    url: `https://www.iconicbrandgroup.com/${keyword}/${location}`,
    telephone: "+1-813-263-6762",
    email: "grow@iconicbrandgroup.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: locationData.city,
      addressRegion: locationData.stateCode,
      addressCountry: "US",
    },
    geo:
      locationData.latitude && locationData.longitude
        ? {
            "@type": "GeoCoordinates",
            latitude: locationData.latitude,
            longitude: locationData.longitude,
          }
        : undefined,
    areaServed: {
      "@type": "City",
      name: locationData.city,
      containedInPlace: {
        "@type": "State",
        name: locationData.state,
      },
    },
    priceRange: "$$",
    // NOTE: aggregateRating removed per MCP OOPSEO guidance
    // "Fabricated ratings without real review data violate Google Rich Results policy"
    // Add back when connected to a verified review platform (Google, Clutch, etc.)
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://www.iconicbrandgroup.com/${keyword}/${location}#service`,
    name: keywordData.title,
    description: keywordData.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Iconic Brand Group",
    },
    areaServed: {
      "@type": "City",
      name: locationData.city,
    },
    serviceType: keywordData.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.iconicbrandgroup.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: keywordData.title,
        item: `https://www.iconicbrandgroup.com/${keyword}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: locationData.city,
        item: `https://www.iconicbrandgroup.com/${keyword}/${location}`,
      },
    ],
  };

  // FAQ data from city context (per MCP: unique per city + service, not just name swaps)
  const faqs = getCityFAQs(
    locationData.city,
    locationData.state,
    locationData.market,
    cityContext,
    keywordData.title,
  );

  // FAQPage schema for AIO/GEO optimization
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const heroImage = getHeroImage(`${keyword}-${location}`);
  const videoSrc = "https://www.youtube.com/embed/f_n0oT1FeMk?autoplay=1&mute=1&loop=1&playlist=f_n0oT1FeMk&controls=0&rel=0&playsinline=1";

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden bg-black text-white px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black to-black/95 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-16 lg:gap-y-8 items-center">
            <div className="space-y-6 text-left lg:col-start-1 lg:row-start-1">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-[#D5AF34] transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="text-gray-600">/</li>
                  <li>
                    <Link
                      href="/services"
                      className="hover:text-[#D5AF34] transition-colors"
                    >
                      Services
                    </Link>
                  </li>
                  <li className="text-gray-600">/</li>
                  <li className="text-[#D5AF34] font-medium">
                    {locationData.city}
                  </li>
                </ol>
              </nav>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {heroHeadingParts.length > 1 ? (
                  <>
                    {heroHeadingParts[0]}
                    <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">
                      {locationData.city}
                    </span>
                    {heroHeadingParts.slice(1).join(locationData.city)}
                  </>
                ) : (
                  heroHeading
                )}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                {heroSubtext}
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                {heroTrustBadges.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-300 font-medium"
                  >
                    <FaCheckCircle className="text-[#D5AF34] w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full aspect-video sm:h-[350px] md:h-[400px] lg:h-[480px] max-h-[550px] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-black/60 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
              <iframe
                className="w-full h-full rounded-2xl object-cover"
                src={videoSrc}
                title="Background Video"
                frameBorder="0"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pt-2 lg:col-start-1 lg:row-start-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-black font-bold text-base sm:text-lg rounded-xl hover:opacity-95 shadow-lg shadow-[#D5AF34]/20 transition-all transform hover:-translate-y-0.5"
              >
                Schedule Free Consultation
              </Link>
              <a
                href="tel:+18132636762"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-[#D5AF34] text-[#D5AF34] font-bold text-base sm:text-lg rounded-xl hover:bg-[#D5AF34] hover:text-black transition-all transform hover:-translate-y-0.5"
              >
                Call (813) 263-6762
              </a>
            </div>
          </div>
        </div>
      </section>

      <WhyIBGIsDifferent
        differentiators={whyDifferent}
        valuePillars={valuePillars}
        copy={cityServiceContent?.differentiation}
      />

      {/* Intro Section with Snippet-Ready Answer (E-E-A-T requirement) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* TL;DR — Per MCP GEO: labeled summary at top for AI extraction */}
          <div className="bg-gradient-to-r from-[#D5AF34]/10 to-[#5F9EA0]/10 border-l-4 border-[#D5AF34] rounded-r-xl p-6 mb-8">
            <p className="text-xs font-bold text-[#D5AF34] uppercase tracking-wider mb-2">
              TL;DR — At a Glance
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              {tldrOverride ? (
                tldrOverride
              ) : (
                <>
                  <strong>
                    {keywordData.title} in {locationData.city},{" "}
                    {locationData.stateCode}
                  </strong>
                  : Iconic Brand Group provides {serviceLabel} services
                  throughout the {locationData.market} area. Specializing in{" "}
                  {cityContext.industries.slice(0, 2).join(" and ")}, our
                  data-driven strategies help businesses increase revenue,
                  expand their footprint, and build market dominance. Call (813)
                  263-6762 for a free consultation.
                </>
              )}
            </p>
          </div>

          {/* Table of Contents — Per MCP GEO: TOC for AI extraction & UX */}
          <nav
            className="bg-gray-50 rounded-xl p-6 mb-12 border border-gray-200"
            aria-label="Page contents"
          >
            <p className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
              On This Page
            </p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm">
              <li>
                <a
                  href="#overview"
                  className="flex items-center gap-1 text-[#5F9EA0] hover:text-[#D5AF34] transition-colors"
                >
                  <FaArrowRight className="w-3 h-3" /> Overview & Expertise
                </a>
              </li>
              <li>
                <a
                  href="#definition"
                  className="flex items-center gap-1 text-[#5F9EA0] hover:text-[#D5AF34] transition-colors"
                >
                  <FaArrowRight className="w-3 h-3" /> What Is{" "}
                  {serviceDefinition.term}?
                </a>
              </li>
              <li>
                <a
                  href="#market-data"
                  className="flex items-center gap-1 text-[#5F9EA0] hover:text-[#D5AF34] transition-colors"
                >
                  <FaArrowRight className="w-3 h-3" /> {locationData.city}{" "}
                  Market Data
                </a>
              </li>
              <li>
                <a
                  href="#market-analysis"
                  className="flex items-center gap-1 text-[#5F9EA0] hover:text-[#D5AF34] transition-colors"
                >
                  <FaArrowRight className="w-3 h-3" /> Market Analysis
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="flex items-center gap-1 text-[#5F9EA0] hover:text-[#D5AF34] transition-colors"
                >
                  <FaArrowRight className="w-3 h-3" /> Services
                </a>
              </li>
              <li>
                <a
                  href="#industries"
                  className="flex items-center gap-1 text-[#5F9EA0] hover:text-[#D5AF34] transition-colors"
                >
                  <FaArrowRight className="w-3 h-3" /> Industries We Serve
                </a>
              </li>
              <li>
                <a
                  href="#mistakes"
                  className="flex items-center gap-1 text-[#5F9EA0] hover:text-[#D5AF34] transition-colors"
                >
                  <FaArrowRight className="w-3 h-3" /> Common Mistakes
                </a>
              </li>
              <li>
                <a
                  href="#case-study"
                  className="flex items-center gap-1 text-[#5F9EA0] hover:text-[#D5AF34] transition-colors"
                >
                  <FaArrowRight className="w-3 h-3" /> Case Study
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="flex items-center gap-1 text-[#5F9EA0] hover:text-[#D5AF34] transition-colors"
                >
                  <FaArrowRight className="w-3 h-3" /> Our Process
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="flex items-center gap-1 text-[#5F9EA0] hover:text-[#D5AF34] transition-colors"
                >
                  <FaArrowRight className="w-3 h-3" /> FAQ
                </a>
              </li>
            </ul>
          </nav>

          <div
            id="overview"
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {overviewHeading}
              </h2>
              {/* MCP Content Differentiation: unique paragraph per city from city-context.ts */}
              <p className="text-gray-600 mb-4">{overviewBody}</p>
              {overviewSecondary ? (
                <p className="text-gray-600 mb-6">{overviewSecondary}</p>
              ) : (
                <p className="text-gray-600 mb-6">
                  Whether you&apos;re a startup navigating {locationData.city}
                  &apos;s competitive landscape or an established business
                  seeking to scale, our team delivers customized solutions that
                  drive real results in the {locationData.market} market.
                </p>
              )}

              {/* Rotating Testimonial (E-E-A-T: Social Proof — unique per city) */}
              <blockquote className="border-l-4 border-[#D5AF34] pl-4 italic text-gray-700">
                &ldquo;{testimonial.quote}&rdquo;
                <footer className="mt-2 text-sm text-gray-500 not-italic">
                  — {testimonial.name}, {testimonial.role} (
                  {testimonial.industry})
                </footer>
              </blockquote>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Facts
              </h3>
              <ul className="space-y-3">
                {quickFacts.map((fact) => (
                  <li key={fact} className="flex items-start">
                    <FaCheckCircle className="text-[#D5AF34] w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <TrustedBy />

      <IBGCarousel />

      {/* Definition Box (GEO: structured definition for AI extraction) */}
      <section id="definition" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#D5AF34]/20 text-[#D5AF34] text-xs font-bold uppercase rounded-full tracking-wider">
                Definition
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What Is {serviceDefinition.term}?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {serviceDefinition.definition}
            </p>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">
                Key Components:
              </p>
              <ul className="grid md:grid-cols-2 gap-2">
                {serviceDefinition.keyComponents.map((component, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span className="w-5 h-5 bg-[#5F9EA0]/20 text-[#5F9EA0] rounded-full flex items-center justify-center text-xs flex-shrink-0">
                      ✓
                    </span>
                    {component}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Quote (GEO: expert quotes with credentials for E-E-A-T) */}
      <section className="py-12 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="relative">
            <span className="text-6xl text-[#D5AF34]/30 absolute -top-4 -left-2 font-serif">
              &ldquo;
            </span>
            <blockquote className="pl-8">
              <p className="text-lg md:text-xl text-white leading-relaxed italic mb-4">
                {expertQuote.quote}
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D5AF34] rounded-full flex items-center justify-center text-black font-bold text-sm">
                  {expertQuote.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {expertQuote.name}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {expertQuote.title} — {expertQuote.context}
                  </p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Local Market Data Table (GEO: real data with source citations) */}
      <section
        id="market-data"
        className="py-12 bg-gradient-to-r from-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {locationData.city} Market Data
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Key business metrics for the {locationData.market} area
            </p>
          </div>

          {/* Data Table — GEO-optimized for AI extraction */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-gray-400 text-sm font-medium">
                    Metric
                  </th>
                  <th className="py-3 px-4 text-gray-400 text-sm font-medium text-right">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-sm">Metro Population Range</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                    {marketData.populationRange}
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-sm">
                    Estimated Business Establishments
                  </td>
                  <td className="py-3 px-4 text-sm text-right font-semibold bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                    {marketData.businessCount}
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-sm">Median Household Income</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                    {marketData.medianHouseholdIncome}
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-sm">Year-Over-Year Growth</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                    {marketData.yearOverYearGrowth}
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-sm">Small Business Share</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                    {marketData.smallBusinessShare}
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-sm">Primary Industry Focus</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                    {primaryIndustryFocus}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">Market Classification</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                    {marketSnapshot.marketClassification}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-xs mt-4 text-center">
            Source: {marketData.source}
          </p>
        </div>
      </section>

      {/* Market Analysis Section (KB: tier-specific unique context) */}
      <section id="market-analysis" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D5AF34]/10 rounded-full px-4 py-2 mb-6">
                <FaChartBar className="text-[#D5AF34] w-4 h-4" />
                <span className="text-[#D5AF34] font-semibold text-sm">
                  {marketAnalysisLabel}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {marketAnalysisHeading}
              </h2>
              <p className="text-gray-600 mb-6">{marketAnalysisBody}</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCheckCircle className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Market Opportunity
                    </p>
                    <p className="text-gray-600 text-sm">
                      {marketAnalysisBullets.marketOpportunity}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaBolt className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">Key Challenge</p>
                    <p className="text-gray-600 text-sm">
                      {marketAnalysisBullets.keyChallenge}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-[#D5AF34]/20 text-[#D5AF34] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaArrowRight className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">Our Strategy</p>
                    <p className="text-gray-600 text-sm">
                      {marketAnalysisBullets.ourStrategy}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gray-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {locationData.city} Market Snapshot
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Market Region</span>
                    <span className="font-semibold text-gray-900">
                      {marketSnapshot.marketRegion}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Metro Area</span>
                    <span className="font-semibold text-gray-900">
                      {marketSnapshot.metroArea}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Market Classification</span>
                    <span className="font-semibold text-gray-900">
                      {marketSnapshot.marketClassification}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">State</span>
                    <span className="font-semibold text-gray-900">
                      {marketSnapshot.state}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {servicesHeading}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{servicesSubtext}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section — City-Specific (MCP: unique per page, not static list) */}
      <section id="industries" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {industriesHeading}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{industriesIntro}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {industryTags.map((industry, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-gray-100 text-gray-800 rounded-full font-medium hover:bg-[#D5AF34] hover:text-black transition-colors cursor-default"
              >
                {industry}
              </span>
            ))}
          </div>

          {/* City-specific pain points (MCP: unique value per page) */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {industryPainPoints.map((painPoint, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
              >
                <div className="w-8 h-8 bg-[#D5AF34]/20 text-[#D5AF34] rounded-full flex items-center justify-center font-bold text-sm mb-3">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {painPoint}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes Section (GEO: industry-specific educational content with citations) */}
      <section id="mistakes" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {mistakesHeading}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{mistakesSubtext}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mistakeItems.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#D5AF34]/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {item.mistake}
                  </h3>
                </div>
                <p className="text-red-400 text-sm mb-3 flex items-center gap-1">
                  <FaExclamationTriangle className="w-3 h-3 flex-shrink-0" />{" "}
                  {item.consequence}
                </p>
                <p className="text-gray-300 text-sm">
                  <span className="text-[#D5AF34] font-semibold">Fix:</span>{" "}
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section (KB: examples/case studies) */}
      <section
        id="case-study"
        className="py-16 bg-gradient-to-br from-[#D5AF34]/10 to-[#5F9EA0]/10"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D5AF34]/20 rounded-full px-4 py-2 mb-6">
                <FaChartLine className="text-[#D5AF34] w-4 h-4" />
                <span className="text-[#D5AF34] font-semibold text-sm">
                  {caseStudy.badge}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {caseStudy.headline}
              </h2>
              <p className="text-4xl font-bold bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text mb-4">
                {caseStudy.result}
              </p>
              <p className="text-gray-600 mb-6">{caseStudy.description}</p>
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {caseStudy.industry}
                </span>
                <span className="text-gray-500 text-sm">
                  Similar results possible in {locationData.city}
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                What We Delivered
              </h3>
              <ul className="space-y-4">
                {caseStudy.delivered.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#D5AF34] w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Similar Results in {locationData.city}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section (E-E-A-T: Demonstrates Expertise & Experience) */}
      <section id="process" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {processHeading}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{processSubtext}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#D5AF34] rounded-full flex items-center justify-center text-2xl font-bold text-black mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      {/* FAQ Section (CRO: Address objections, AIO/GEO: Snippet-ready answers) */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions About {keywordData.title} in{" "}
              {locationData.city}
            </h2>
            <p className="text-gray-600">
              Get answers to common questions about our {serviceLabel} services.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-xl p-6 cursor-pointer"
              >
                <summary className="flex justify-between items-center font-semibold text-gray-900 list-none">
                  <span className="pr-6">{faq.question}</span>
                  <FaChevronDown className="text-[#D5AF34] w-4 h-4 flex-shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* NAP Block - Prominent Contact Info (Local SEO requirement) */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-12 h-12 bg-[#D5AF34] rounded-full flex items-center justify-center">
                <FaMapMarkerAlt className="text-black w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Service Area</p>
                <p className="text-white font-semibold">
                  {locationData.city}, {locationData.stateCode} &{" "}
                  {locationData.market}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-12 h-12 bg-[#D5AF34] rounded-full flex items-center justify-center">
                <FaPhone className="text-black w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Call Us</p>
                <a
                  href="tel:+18132636762"
                  className="text-white font-semibold hover:text-[#D5AF34] transition-colors"
                >
                  (813) 263-6762
                </a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-12 h-12 bg-[#D5AF34] rounded-full flex items-center justify-center">
                <FaEnvelope className="text-black w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email Us</p>
                <a
                  href="mailto:grow@iconicbrandgroup.com"
                  className="text-white font-semibold hover:text-[#D5AF34] transition-colors"
                >
                  grow@iconicbrandgroup.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Nearby Service Areas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              In addition to {locationData.city}, we proudly serve businesses
              throughout the {locationData.market} area.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {nearbyLocations.map((nearby) => (
              <Link
                key={nearby.slug}
                href={`/${keyword}/${nearby.slug}`}
                className="bg-white rounded-lg p-4 text-center shadow hover:shadow-lg transition-shadow hover:border-[#D5AF34] border border-transparent"
              >
                <span className="text-gray-800 font-medium">{nearby.city}</span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/locations"
              className="inline-flex items-center gap-1 text-[#D5AF34] font-medium hover:underline"
            >
              View All Service Areas <FaArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section with Urgency (CRO requirement) */}
      <section className="py-16 bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 bg-black/10 rounded-full px-4 py-2 mb-6">
            <FaCircle className="w-2 h-2 text-red-500 animate-pulse" />
            <span className="text-black font-semibold text-sm">
              Limited Availability: Only accepting 3 new clients in{" "}
              {locationData.market} this month
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            Ready to Grow Your Business in {locationData.city}?
          </h2>
          <p className="text-black/80 mb-6 max-w-2xl mx-auto">
            Schedule a free consultation with our {serviceLabel} experts.
            Let&apos;s discuss how we can help your business thrive in the{" "}
            {locationData.market} market.
          </p>

          {/* Risk Reducer (CRO requirement) */}
          <p className="text-black/60 text-sm mb-8 flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <FaCheckCircle className="w-3 h-3" /> No obligation
            </span>
            <span className="flex items-center gap-1">
              <FaCheckCircle className="w-3 h-3" /> 30-minute strategy call
            </span>
            <span className="flex items-center gap-1">
              <FaCheckCircle className="w-3 h-3" /> Custom growth roadmap
              included
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
            >
              Schedule Free Consultation
            </Link>
            <a
              href="tel:+18132636762"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Call (813) 263-6762
            </a>
          </div>
        </div>
      </section>

      {/* <TransformCTA /> */}

      {/* Local Business Resources + City Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Local Business Resources in {locationData.city},{" "}
              {locationData.stateCode}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Official links and guides for businesses operating in{" "}
              {locationData.city}.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {typeof locationData.latitude === "number" &&
              typeof locationData.longitude === "number" && (
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-80 lg:h-full min-h-[320px]">
                  <iframe
                    title={`Map of ${locationData.city}, ${locationData.stateCode}`}
                    src={`https://maps.google.com/maps?q=${locationData.latitude},${locationData.longitude}&z=12&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cityResourceLinks?.chamberUrl && (
                <ResourceLinkCard
                  label="Chamber of Commerce"
                  url={cityResourceLinks.chamberUrl}
                  icon={FaBuilding}
                />
              )}
              {cityResourceLinks?.citySiteUrl && (
                <ResourceLinkCard
                  label="City / County Government"
                  url={cityResourceLinks.citySiteUrl}
                  icon={FaLandmark}
                />
              )}
              {cityResourceLinks?.stateCommerceUrl && (
                <ResourceLinkCard
                  label={`${locationData.state} Dept. of Commerce`}
                  url={cityResourceLinks.stateCommerceUrl}
                  icon={FaChartLine}
                />
              )}
              {SBA_LINKS.map((l) => (
                <ResourceLinkCard
                  key={l.url}
                  label={l.label}
                  url={l.url}
                  icon={FaHandshake}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sources & References (GEO: data credibility + citation-worthy) */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
            Sources & References
          </h3>
          <ul className="space-y-2">
            {citations.map((citation, index) => (
              <li
                key={index}
                className="text-xs text-gray-500 flex items-start gap-2"
              >
                <span className="text-[#D5AF34] flex-shrink-0">
                  [{index + 1}]
                </span>
                <span>
                  {citation.text} — <em>{citation.source}</em>
                </span>
              </li>
            ))}
            <li className="text-xs text-gray-500 flex items-start gap-2">
              <span className="text-[#D5AF34] flex-shrink-0">
                [{citations.length + 1}]
              </span>
              <span>Market data ranges based on {marketData.source}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Related Services Links (Internal Linking) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Related Services in {locationData.city}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allFranchiseKeywords
              .filter((k) => k.slug !== keyword)
              .slice(0, 8)
              .map((relatedKeyword) => (
                <Link
                  key={relatedKeyword.slug}
                  href={`/${relatedKeyword.slug}/${location}`}
                  className="text-gray-600 hover:text-[#D5AF34] text-sm transition-colors"
                >
                  {relatedKeyword.title} in {locationData.city}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
