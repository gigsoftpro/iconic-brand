import Hero from "@/components/Hero";
import HeroLight from "@/components/HeroLight";
import TrustedBy from "@/components/TrustedBy";
import WhyIBGIsDifferent from "@/components/WhyIBGIsDifferent";
import ServicesOverview from "@/components/ServicesOverview";
import ConsultingServices from "@/components/ConsultingServices";
import MarketingServices from "@/components/MarketingServices";
import ProcessSection from "@/components/ProcessSection";
import IBGCarousel from "@/components/IBGCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import ContextualLinks from "@/components/ContextualLinks";
import GovernmentResources from "@/components/GovernmentResources";
import IndustriesPreview from "@/components/IndustriesPreview";
import BlogPreview from "@/components/BlogPreview";
import { generateServiceSchema, generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Iconic Brand Group | Strategic Consulting & Marketing",
  description: "Transform your business into an industry leader with strategic consulting and innovative marketing solutions. Proven results for 500+ clients worldwide.",
  service: "strategic consulting",
  keywords: [
    "business consulting",
    "marketing solutions",
    "brand strategy",
    "digital marketing",
    "strategic planning",
    "business growth",
    "consulting services",
    "marketing agency",
    "business transformation",
    "growth strategy",
    "Iconic Brand Group",
    "Iconic Brand Group consulting",
    "Iconic Brand Group agency",
    "Iconic Brand Group Tampa",
    "Iconic startup consulting",
    "Iconic marketing agency",
    "Iconic business growth services",
    "startup consulting",
    "entrepreneur consulting",
    "small business consulting",
  ],
  canonical: "/",
  openGraph: {
    title: "Strategic Business Consulting & Marketing Solutions",
    description: "Transform your business with expert consulting and marketing. Serving 500+ clients worldwide with proven growth strategies.",
    image: "/brand/full-logo-coloured.png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategic Business Consulting & Marketing",
    description: "Transform your business with expert consulting and marketing solutions. Proven results for 500+ clients.",
    image: "/brand/full-logo-coloured.png",
  },
});

export default function Home() {
  // Switch between Hero (dark) and HeroLight (light) by changing the component below
  const HeroComponent = HeroLight; // Change to Hero for dark version

  // Structured data for services
  const consultingSchema = generateServiceSchema({
    name: "Business Consulting Services",
    description:
      "Strategic guidance to optimize operations and drive sustainable growth",
    provider: "Iconic Brand Group",
  });

  const marketingSchema = generateServiceSchema({
    name: "Marketing Services",
    description:
      "Data-driven campaigns that amplify your brand and engage your audience",
    provider: "Iconic Brand Group",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([consultingSchema, marketingSchema]),
        }}
      />
      <div className="min-h-screen bg-white overflow-x-hidden pt-[7.25rem]">
        <main>
          <HeroComponent />
          <TrustedBy />
          <WhyIBGIsDifferent />
          <ServicesOverview />
          <ConsultingServices />
          <MarketingServices />
          <ProcessSection />
          <IBGCarousel />
          <WhyChooseUs />
          {/* <Stats /> */}
          <Testimonials />

          {/* Industries We Serve */}
          <IndustriesPreview />

          {/* Latest Insights */}
          <BlogPreview />

          {/* Contextual Internal Links */}
          <ContextualLinks
            currentPath="/"
            title="Explore Our Services & Locations"
            count={8}
          />

          <CTA />
        </main>

        {/* Government Resources */}
        <GovernmentResources count={4} />
      </div>
    </>
  );
}
