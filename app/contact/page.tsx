import ContactPage from "@/components/pages/ContactPage";
import Breadcrumb from "@/components/Breadcrumb";
import ContextualLinks from "@/components/ContextualLinks";
import GovernmentResources from "@/components/GovernmentResources";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Contact Iconic Brand Group | Free Business Consultation",
  description: "Ready to transform your business? Contact Iconic Brand Group for a free consultation. Strategic consulting and marketing solutions for 500+ clients worldwide.",
  keywords: [
    "contact business consultant",
    "free business consultation",
    "strategic consulting contact",
    "marketing services contact",
    "business transformation consultation",
    "iconic brand group contact"
  ],
  canonical: "/contact",
  openGraph: {
    title: "Contact Iconic Brand Group | Free Business Consultation",
    description: "Ready to transform your business? Get your free consultation today.",
    image: "/contact/contact-hero-og.jpg",
    type: "website",
  },
});

export default function Contact() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="min-h-screen bg-white pt-[7.25rem]">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Contact", current: true },
              ]}
            />
          </div>
        </div>

        <ContactPage />

        {/* Contextual Internal Links */}
        <ContextualLinks
          currentPath="/contact"
          title="Our Services & Locations"
          count={6}
        />

        {/* Government Resources */}
        <GovernmentResources count={3} />
      </div>
    </>
  );
}
