import type { NextConfig } from "next";

// Legacy URLs reported as 404 in Google Search Console (crawled Feb-Jun 2026,
// predate the current /{keyword}/{location} and /locations/{state} routing).
// NOTE: /cdn-cgi/l/email-protection is deliberately excluded — that path is
// generated and served by Cloudflare's email-obfuscation feature at the edge,
// not by this app, so a Next.js redirect here would have no effect on it.
const LEGACY_404_PATHS = [
  "/franchise-rebranding-services",
  "/franchise-marketing-agency",
  "/franchise-lead-generation-agency",
  "/done-for-you-franchise-marketing",
  "/process-optimization-consulting",
  "/franchise-expansion-strategy",
  "/franchise-website-development",
  "/business-mentor-for-startups",
  "/franchise-content-marketing-agency",
  "/franchise-local-seo-services",
  "/consulting-firm-for-small-business-owners",
  "/consulting-firm-for-startups",
  "/franchise-location-marketing",
  "/franchise-system-marketing-agency",
  "/franchise-growth-consulting",
  "/business-development-for-founders",
  "/investor-relations-consulting",
  "/franchise-business-consulting",
  "/multimedia-marketing-agency",
  "/business-advisor",
  "/franchise-brand-development",
  "/franchise-growth-investment-consulting",
  "/capital-raising-consulting",
  "/franchise-brand-growth-partner",
  "/fundraising-strategy-consulting",
  "/franchisee-business-coaching",
  "/franchise-operational-efficiency-consulting",
  "/digital-marketing-agency",
  "/organizational-development-consulting",
  "/crm-for-franchise-systems",
  "/small-business-efficiency-consultants",
  "/franchise-brand-consulting-firm",
  "/ai-lead-generation-for-franchises",
  "/small-business-consulting",
  "/startup-mentorship-programs",
  "/franchise-marketing-strategy",
  "/business-strategy-firm",
  "/startup-accelerator-services",
  "/franchise-brand-positioning",
  "/business-consulting-services",
  "/franchisee-growth-consulting",
  "/franchise-sales-funnel-consulting",
  "/business-consulting",
  "/business-development-consulting",
  "/startup-consulting",
  "/business-growth-consulting",
  "/branding-agency",
  "/performance-marketing-agency",
  "/marketing-agency",
  "/content-marketing-agency",
  "/franchise-pitch-deck-agency",
  "/social-media-marketing-company",
  "/business-operations-consulting",
  "/franchise-launch-consulting",
  "/startup-funding-consulting",
  "/locations/los-angeles-ca",
  "/locations/san-francisco-ca",
  "/locations/miami-fl",
  "/locations/austin-tx",
  "/locations/new-york-ny",
];

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression
  compress: true,

  // Headers for SEO and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },

    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      // Redirect old singular /sitemap/:id.xml to new plural /sitemaps/:id.xml
      {
        source: "/sitemap/:id(\\d+\\.xml)",
        destination: "/sitemaps/:id",
        permanent: true,
      },
      // Legacy URLs from before the site's IA moved to /{keyword}/{location}
      // (bare service-keyword pages) and /locations/{state} (was
      // /locations/{city}). Google Search Console still has these indexed
      // from Feb-Jun 2026 crawls; they currently 404 since no route matches
      // a single-segment keyword or a city slug under /locations. Redirected
      // to the homepage per explicit request rather than left as 404s.
      ...LEGACY_404_PATHS.map((source) => ({
        source,
        destination: "/",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
