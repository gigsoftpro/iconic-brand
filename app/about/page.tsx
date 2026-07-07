import AboutPage from "@/components/pages/AboutPage";
import Breadcrumb from "@/components/Breadcrumb";
import ContextualLinks from "@/components/ContextualLinks";
import GovernmentResources from "@/components/GovernmentResources";
import { generateMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "About Iconic Brand Group | 20+ Years of Excellence",
  description: "Learn about our mission, vision, and expert team. 20+ years of experience, 500+ clients worldwide, 98% satisfaction rate. Building iconic brands since 2004.",
  keywords: [
    "about iconic brand group",
    "Iconic Brand Group consulting",
    "Iconic Brand Group agency",
    "Iconic Brand Group Tampa",
    "Iconic startup consulting",
    "Iconic marketing agency",
    "Iconic business accelerator",
    "Iconic business growth services",
    "business consulting company",
    "marketing agency team",
    "company history",
    "leadership team",
    "business expertise",
    "consulting experience",
    "startup consulting agency",
  ],
  canonical: "/about",
  openGraph: {
    title: "About Iconic Brand Group | 20+ Years of Excellence",
    description: "Meet the expert team behind 500+ successful business transformations worldwide. Building iconic brands since 2004.",
    image: "/about/team-og.jpg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Iconic Brand Group | 20+ Years of Excellence",
    description: "Expert team behind 500+ successful business transformations. 20+ years of experience, 98% satisfaction rate.",
    image: "/about/team-twitter.jpg",
  },
});

export default function About() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "About", current: true },
              ]}
            />
          </div>
        </div>
        
        <AboutPage />
        
        {/* Contextual Internal Links */}
        <ContextualLinks 
          currentPath="/about"
          title="Our Services & Global Presence"
          count={6}
        />
        
        {/* Government Resources */}
        <GovernmentResources count={3} />
      </div>
    </>
  );
}
