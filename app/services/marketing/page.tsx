import MarketingServicesPage from "@/components/pages/MarketingServicesPage";
import Breadcrumb from "@/components/Breadcrumb";
import ContextualLinks from "@/components/ContextualLinks";
import GovernmentResources from "@/components/GovernmentResources";
import TrustedBy from "@/components/TrustedBy";
import WhyChooseUs from "@/components/WhyChooseUs";
import TransformCTA from "@/components/TransformCTA";
import { generateMetadata, generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Digital Marketing Services | Brand Strategy & Growth",
  description: "Comprehensive marketing solutions that drive growth. Brand strategy, content creation, paid media, email marketing, SEO, and lead generation.",
  service: "digital marketing",
  keywords: [
    "digital marketing",
    "brand strategy",
    "content creation",
    "paid media management",
    "email marketing",
    "SEO services",
    "lead generation",
    "marketing agency",
    "social media marketing",
    "conversion optimization"
  ],
  canonical: "/services/marketing",
  openGraph: {
    title: "Digital Marketing Services | Brand Strategy & Growth",
    description: "Data-driven marketing solutions that amplify your brand and drive measurable results. 450% average ROAS.",
    image: "/services/marketing-og.jpg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Services | Brand Strategy",
    description: "Comprehensive marketing solutions that drive growth. Brand strategy, content creation, paid media, and lead generation.",
    image: "/services/marketing-twitter.jpg",
  },
});

export default function MarketingPage() {
  const marketingSchema = generateServiceSchema({
    name: "Digital Marketing Services",
    description: "Comprehensive marketing solutions including brand strategy, content creation, paid media management, email marketing, SEO, and lead generation to drive business growth.",
    provider: "Iconic Brand Group",
    areaServed: "Worldwide"
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What's your typical timeline to see results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Initial results typically appear within 30-60 days, with significant momentum building by month 3-4. Long-term strategies like SEO take 6-12 months for full impact."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with businesses of all sizes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We serve everyone from startups to enterprise brands. Our strategies scale based on your budget, goals, and growth stage."
        }
      },
      {
        "@type": "Question",
        "name": "How do you measure campaign success?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We track KPIs aligned with your goals: ROAS, CAC, conversion rates, engagement metrics, and ultimately revenue impact. You'll receive detailed monthly reports."
        }
      }
    ]
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Digital Marketing", url: "/services/marketing" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([marketingSchema, faqSchema, breadcrumbSchema]),
        }}
      />
      <div className="min-h-screen bg-white pt-[7.25rem]">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Digital Marketing", current: true },
              ]}
            />
          </div>
        </div>

        <MarketingServicesPage />

        {/* Contextual Internal Links */}
        <ContextualLinks
          currentPath="/services/marketing"
          title="Related Services & Locations"
          count={8}
        />

        {/* Government Resources */}
        <GovernmentResources count={4} />
      </div>
    </>
  );
}
