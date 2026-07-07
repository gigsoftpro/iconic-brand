import Navbar from "@/components/Navbar";
import ConsultingServicesPage from "@/components/pages/ConsultingServicesPage";
import Breadcrumb from "@/components/Breadcrumb";
import ContextualLinks from "@/components/ContextualLinks";
import GovernmentResources from "@/components/GovernmentResources";
import { generateMetadata, generateServiceSchema, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Business Consulting Services | Strategic Planning & Growth",
  description: "Transform your business with expert consulting services. Strategic planning, operations optimization, financial advisory, and change management.",
  service: "business consulting",
  keywords: [
    "business consulting",
    "strategic planning",
    "operations management", 
    "financial advisory",
    "change management",
    "business transformation",
    "management consulting",
    "growth strategy",
    "business optimization",
    "consulting firm"
  ],
  canonical: "/services/consulting",
  openGraph: {
    title: "Business Consulting Services | Strategic Planning & Growth",
    description: "Expert business consulting services to drive sustainable growth and operational excellence. Proven results for 500+ clients.",
    image: "/services/consulting-og.jpg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Consulting Services | Strategic Planning",
    description: "Transform your business with expert consulting. Strategic planning, operations optimization, and proven growth strategies.",
    image: "/services/consulting-twitter.jpg",
  },
});

export default function ConsultingPage() {
  const consultingSchema = generateServiceSchema({
    name: "Business Consulting Services",
    description: "Strategic consulting services including business planning, operations optimization, financial advisory, and change management to drive sustainable growth.",
    provider: "Iconic Brand Group",
    areaServed: "Worldwide"
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does a typical consulting engagement last?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Engagements typically range from 3-12 months depending on scope and complexity. We offer flexible arrangements from project-based to ongoing retainer relationships."
        }
      },
      {
        "@type": "Question", 
        "name": "What industries do you specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We work across diverse industries including technology, manufacturing, healthcare, retail, and professional services. Our methodologies are adaptable to any sector."
        }
      },
      {
        "@type": "Question",
        "name": "How do you measure success?", 
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We establish clear KPIs at the outset aligned with your business objectives. Success metrics typically include revenue growth, cost reduction, efficiency gains, and market share expansion."
        }
      }
    ]
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Business Consulting", url: "/services/consulting" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([consultingSchema, faqSchema, breadcrumbSchema]),
        }}
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Business Consulting", current: true },
              ]}
            />
          </div>
        </div>
        
        <ConsultingServicesPage />
        
        {/* Contextual Internal Links */}
        <ContextualLinks 
          currentPath="/services/consulting"
          title="Related Services & Locations"
          count={8}
        />
        
        {/* Government Resources */}
        <GovernmentResources count={4} />
      </div>
    </>
  );
}
