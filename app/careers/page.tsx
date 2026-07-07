import CareersPage from "@/components/pages/CareersPage";
import Breadcrumb from "@/components/Breadcrumb";
import ContextualLinks from "@/components/ContextualLinks";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Careers | Iconic Brand Group",
  description: "Join the Iconic Brand Group team. We're looking for talented individuals who are passionate about building and accelerating iconic brands.",
  keywords: [
    "careers",
    "jobs",
    "employment",
    "iconic brand group",
    "marketing jobs",
    "consulting jobs",
    "tampa jobs",
    "remote jobs"
  ],
  canonical: "/careers",
  openGraph: {
    title: "Careers | Iconic Brand Group",
    description: "Join the Iconic Brand Group team. We're looking for talented individuals who are passionate about building and accelerating iconic brands.",
    image: "/og-image.jpg",
    type: "website",
  },
});

export default function Careers() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
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
                { name: "Careers", current: true },
              ]}
            />
          </div>
        </div>

        <CareersPage />

        <ContextualLinks
          currentPath="/careers"
          title="Explore Our Services & Solutions"
          count={6}
        />
      </div>
    </>
  );
}
