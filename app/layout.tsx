import type { Metadata, Viewport } from "next";
import { Lato, Raleway } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { generateMetadata, generateOrganizationSchema } from "@/lib/seo";
import SEODashboard from "@/components/SEODashboard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#D5AF34",
};

export const metadata: Metadata = generateMetadata({
  title: "Iconic Brand Group | Strategic Consulting & Marketing Solutions",
  description:
    "Transform your business into an industry leader with Iconic Brand Group's strategic consulting and innovative marketing solutions. Proven results, premium quality service.",
  keywords: [
    "business consulting",
    "marketing solutions",
    "brand strategy",
    "digital marketing",
    "strategic planning",
    "business growth",
    "consulting services",
    "marketing agency",
    "Iconic Brand Group",
    "Iconic Brand Group consulting",
    "Iconic Brand Group agency",
    "Iconic Brand Group Tampa",
    "startup consulting",
    "entrepreneur consulting",
  ],
  canonical: "/",
  openGraph: {
    title: "Iconic Brand Group | Strategic Consulting & Marketing Solutions",
    description:
      "Transform your business into an industry leader with proven strategies and innovative marketing solutions.",
    image: "/brand/full-logo-coloured.png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iconic Brand Group | Strategic Consulting & Marketing Solutions",
    description:
      "Transform your business into an industry leader with proven strategies and innovative marketing solutions.",
    image: "/brand/full-logo-coloured.png",
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3QHS7Z2X8X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3QHS7Z2X8X');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${lato.variable} ${raleway.variable} antialiased`} suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
        <SEODashboard />
      </body>
    </html>
  );
}
