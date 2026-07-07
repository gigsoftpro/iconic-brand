import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FaBullseye, FaVideo, FaBolt, FaEnvelope, FaGlobe, FaSearch, FaDollarSign, FaShoppingCart, FaChartLine, FaArrowRight } from 'react-icons/fa';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi';
import Navbar from "@/components/Navbar";

const marketingServicesData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  features: string[];
  benefits: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  faqs: { q: string; a: string }[];
}> = {
  'brand-strategy': {
    title: 'Brand Strategy & Positioning',
    subtitle: 'Build a Brand That Resonates',
    description: 'Develop a powerful brand identity and positioning strategy that sets you apart and connects with your ideal customers.',
    heroImage: '/general/Joshua Paul Hooks Denago EV copy000.jpg',
    icon: FaBullseye,
    gradient: 'from-[#D5AF34] to-[#C19A2E]',
    features: [
      'Brand identity + tone of voice development',
      'Market + competitive analysis',
      'Offer positioning + pricing strategy',
      'Buyer profiling + customer journey mapping',
      'Brand audit + strategic growth roadmap',
      'Visual identity guidelines',
      'Brand messaging framework',
      'Competitive differentiation strategy'
    ],
    benefits: [
      { title: 'Clear Identity', description: 'A distinctive brand that stands out in crowded markets' },
      { title: 'Customer Connection', description: 'Messaging that resonates with your ideal audience' },
      { title: 'Premium Positioning', description: 'Position your brand to command higher prices' },
      { title: 'Consistent Experience', description: 'Unified brand expression across all touchpoints' }
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Deep dive into your business, market, and competition' },
      { step: '02', title: 'Strategy', description: 'Develop positioning and messaging framework' },
      { step: '03', title: 'Identity', description: 'Create visual and verbal brand elements' },
      { step: '04', title: 'Activation', description: 'Launch and implement across all channels' }
    ],
    faqs: [
      { q: 'How long does brand strategy development take?', a: 'A comprehensive brand strategy typically takes 6-10 weeks to develop.' },
      { q: 'Do you help with implementation?', a: 'Yes, we support rollout across all marketing channels and touchpoints.' },
      { q: 'Can you rebrand an existing business?', a: 'Absolutely. We specialize in both new brand development and strategic rebrands.' }
    ]
  },
  'content-creation': {
    title: 'Content Creation & Production',
    subtitle: 'Captivating Content That Converts',
    description: 'High-quality content creation that tells your story, engages your audience, and drives measurable results.',
    heroImage: '/general/consulting/content.jpg',
    icon: FaVideo,
    gradient: 'from-[#5F9EA0] to-[#4A7D7F]',
    features: [
      'Social media content creation (reels, posts, carousels)',
      'Scripted video production + editing',
      'Product + lifestyle photography',
      'Brand storytelling and campaign creative',
      'Landing page and brand copywriting',
      'Podcast production',
      'Infographic design',
      'User-generated content strategy'
    ],
    benefits: [
      { title: 'Engagement Growth', description: 'Content that captures attention and drives interaction' },
      { title: 'Brand Authority', description: 'Establish thought leadership in your industry' },
      { title: 'Conversion Focus', description: 'Content designed to move prospects through your funnel' },
      { title: 'Scalable Production', description: 'Consistent content output without straining your team' }
    ],
    process: [
      { step: '01', title: 'Strategy', description: 'Develop content strategy aligned with business goals' },
      { step: '02', title: 'Planning', description: 'Create content calendar and production schedule' },
      { step: '03', title: 'Production', description: 'Create high-quality content across formats' },
      { step: '04', title: 'Optimization', description: 'Analyze performance and refine approach' }
    ],
    faqs: [
      { q: 'What platforms do you create content for?', a: 'We create content for all major platforms including Instagram, TikTok, YouTube, LinkedIn, and websites.' },
      { q: 'Do you handle video production?', a: 'Yes, we offer full-service video production from concept to final edit.' },
      { q: 'How much content can you produce monthly?', a: 'Output depends on your needs - we can scale from a few pieces to dozens per month.' }
    ]
  },
  'paid-media': {
    title: 'Paid Media Management',
    subtitle: 'Maximize Your Ad Spend',
    description: 'Strategic paid advertising campaigns across all platforms that deliver measurable ROI and scalable growth.',
    heroImage: '/general/consulting/media.jpg',
    icon: FaBolt,
    gradient: 'from-[#D5AF34] via-[#FFD700] to-[#5F9EA0]',
    features: [
      'Meta + Instagram ads',
      'TikTok paid campaigns',
      'Google Search, Display, Shopping',
      'Retargeting + conversion funnels',
      'Multivariate A/B testing + budget allocation',
      'LinkedIn advertising',
      'YouTube pre-roll ads',
      'Programmatic display advertising'
    ],
    benefits: [
      { title: 'Higher ROAS', description: 'Optimized campaigns that maximize return on ad spend' },
      { title: 'Precise Targeting', description: 'Reach your ideal customers at the right moment' },
      { title: 'Scalable Growth', description: 'Campaigns designed to scale profitably' },
      { title: 'Full Transparency', description: 'Clear reporting on spend and performance' }
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Analyze current performance and identify opportunities' },
      { step: '02', title: 'Strategy', description: 'Develop multi-channel paid media strategy' },
      { step: '03', title: 'Launch', description: 'Build and launch optimized campaigns' },
      { step: '04', title: 'Scale', description: 'Continuous optimization and scaling' }
    ],
    faqs: [
      { q: 'What ad platforms do you manage?', a: 'We manage ads on Meta, Google, TikTok, LinkedIn, YouTube, and programmatic networks.' },
      { q: 'What budget do you recommend starting with?', a: 'We recommend a minimum of $3,000-5,000/month for meaningful results and data.' },
      { q: 'How quickly will we see results?', a: 'Initial results typically appear within 2-4 weeks, with optimization improving performance over time.' }
    ]
  },
  'email-crm': {
    title: 'Email + CRM Management',
    subtitle: 'Nurture Leads, Drive Revenue',
    description: 'Automated email and CRM systems that nurture leads, drive repeat purchases, and maximize customer lifetime value.',
    heroImage: '/general/1768.jpg',
    icon: FaEnvelope,
    gradient: 'from-[#5F9EA0] to-[#4A7D7F]',
    features: [
      'Automated email flows + nurture sequences',
      'Promotional campaign design + execution',
      'SMS marketing + text automation',
      'Segmentation, A/B testing, engagement optimization',
      'CRM setup, lead scoring, retention workflows',
      'Win-back campaigns',
      'Loyalty program integration',
      'Personalization at scale'
    ],
    benefits: [
      { title: 'Higher Conversions', description: 'Automated sequences that convert leads into customers' },
      { title: 'Increased LTV', description: 'Nurture campaigns that drive repeat purchases' },
      { title: 'Time Savings', description: 'Automation that works while you sleep' },
      { title: 'Personalization', description: 'Relevant messages that resonate with each segment' }
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Review current email and CRM performance' },
      { step: '02', title: 'Strategy', description: 'Map customer journey and automation flows' },
      { step: '03', title: 'Build', description: 'Create and implement email sequences and CRM workflows' },
      { step: '04', title: 'Optimize', description: 'Test, refine, and scale successful campaigns' }
    ],
    faqs: [
      { q: 'What email platforms do you work with?', a: 'We work with Klaviyo, HubSpot, Mailchimp, ActiveCampaign, and most major platforms.' },
      { q: 'Can you migrate from our current platform?', a: 'Yes, we handle full migrations including list segmentation and automation rebuilds.' },
      { q: 'How do you improve email deliverability?', a: 'We implement best practices for list hygiene, authentication, and engagement optimization.' }
    ]
  },
  'website-funnels': {
    title: 'Website + Funnel Systems',
    subtitle: 'Convert Visitors Into Customers',
    description: 'High-converting websites and sales funnels designed to turn traffic into revenue and maximize your customer acquisition.',
    heroImage: '/general/4073.jpg',
    icon: FaGlobe,
    gradient: 'from-[#D5AF34] to-[#C19A2E]',
    features: [
      'Shopify, WooCommerce, BigCommerce buildouts',
      'Landing page + sales funnel creation',
      'Conversion Rate Optimization (CRO)',
      'Subscription models + recurring revenue setup',
      'Split testing + heat map UX improvements',
      'Checkout optimization',
      'Mobile-first design',
      'Speed optimization'
    ],
    benefits: [
      { title: 'Higher Conversions', description: 'Websites designed with conversion psychology in mind' },
      { title: 'Better UX', description: 'Intuitive experiences that guide visitors to action' },
      { title: 'Increased AOV', description: 'Upsell and cross-sell strategies built into the flow' },
      { title: 'Reduced Friction', description: 'Streamlined checkout that minimizes cart abandonment' }
    ],
    process: [
      { step: '01', title: 'Analysis', description: 'Audit current site performance and identify gaps' },
      { step: '02', title: 'Strategy', description: 'Design conversion-optimized user flows' },
      { step: '03', title: 'Build', description: 'Develop high-converting pages and funnels' },
      { step: '04', title: 'Test', description: 'Continuous A/B testing and optimization' }
    ],
    faqs: [
      { q: 'What platforms do you build on?', a: 'We specialize in Shopify, WooCommerce, and custom builds using modern frameworks.' },
      { q: 'How long does a website build take?', a: 'Typical builds range from 4-12 weeks depending on complexity.' },
      { q: 'Do you provide ongoing optimization?', a: 'Yes, we offer CRO retainers for continuous testing and improvement.' }
    ]
  },
  'seo': {
    title: 'SEO + Awareness Growth',
    subtitle: 'Dominate Search Rankings',
    description: 'Comprehensive SEO strategies that drive organic visibility, traffic, and authority in your market.',
    heroImage: '/general/826.jpg',
    icon: FaSearch,
    gradient: 'from-[#5F9EA0] to-[#4A7D7F]',
    features: [
      'Keyword mapping + content planning',
      'Programmatic SEO deployment for scale',
      'On-page SEO, schema, blog building',
      'Local SEO, directory placement, NAP alignment',
      'Backlink + authority acquisition strategies',
      'Technical SEO audits',
      'Core Web Vitals optimization',
      'International SEO'
    ],
    benefits: [
      { title: 'Organic Growth', description: 'Sustainable traffic that doesnt require ad spend' },
      { title: 'Brand Authority', description: 'Top rankings establish credibility and trust' },
      { title: 'Compounding Returns', description: 'SEO investments continue to pay dividends over time' },
      { title: 'Lower CAC', description: 'Reduce customer acquisition costs with organic traffic' }
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Comprehensive technical and content SEO analysis' },
      { step: '02', title: 'Strategy', description: 'Develop keyword and content roadmap' },
      { step: '03', title: 'Optimize', description: 'Implement on-page and technical improvements' },
      { step: '04', title: 'Build', description: 'Create content and acquire quality backlinks' }
    ],
    faqs: [
      { q: 'How long until we see SEO results?', a: 'Initial improvements appear in 3-4 months, with significant results in 6-12 months.' },
      { q: 'Do you guarantee rankings?', a: 'We dont guarantee specific rankings (no one legitimately can), but we commit to measurable organic growth.' },
      { q: 'What about local SEO?', a: 'We offer comprehensive local SEO including Google Business Profile optimization and local link building.' }
    ]
  },
  'lead-generation': {
    title: 'Lead Generation & Revenue',
    subtitle: 'Fill Your Pipeline',
    description: 'Complete funnel systems that generate high-quality leads and optimize your path to revenue.',
    heroImage: '/general/97.jpg',
    icon: FaDollarSign,
    gradient: 'from-[#D5AF34] via-[#FFD700] to-[#5F9EA0]',
    features: [
      'Full funnel design (cold → nurture → convert)',
      'High-ticket appointment funnels',
      'Upsell, downsell, cross-sell system development',
      'Offer structuring and omni-channel acquisition',
      'Audience growth + retention architecture',
      'Lead scoring and qualification',
      'Sales enablement content',
      'Pipeline analytics'
    ],
    benefits: [
      { title: 'Quality Leads', description: 'Attract and qualify leads ready to buy' },
      { title: 'Higher Close Rates', description: 'Warm leads that are pre-sold on your value' },
      { title: 'Predictable Pipeline', description: 'Consistent flow of opportunities' },
      { title: 'Revenue Growth', description: 'Systems that scale your revenue predictably' }
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Analyze current lead generation and conversion' },
      { step: '02', title: 'Design', description: 'Map complete funnel strategy' },
      { step: '03', title: 'Build', description: 'Create lead magnets, landing pages, and nurture sequences' },
      { step: '04', title: 'Scale', description: 'Optimize and scale winning funnels' }
    ],
    faqs: [
      { q: 'What industries do you work with?', a: 'We work with B2B services, SaaS, e-commerce, and high-ticket consumer businesses.' },
      { q: 'What cost per lead can we expect?', a: 'CPL varies by industry and offer, but we optimize for qualified lead cost and revenue, not just volume.' },
      { q: 'Do you integrate with our CRM?', a: 'Yes, we integrate with all major CRMs and marketing automation platforms.' }
    ]
  },
  'ecommerce': {
    title: 'eCommerce Marketplace Growth',
    subtitle: 'Scale Across Marketplaces',
    description: 'Expand your reach and revenue across Amazon, Walmart, and major marketplaces with expert management.',
    heroImage: '/general/pexels-silverkblack-22046227.jpg',
    icon: FaShoppingCart,
    gradient: 'from-[#5F9EA0] to-[#4A7D7F]',
    features: [
      'Amazon Seller Central setup + A+ Content',
      'Amazon PPC advertising + ranking strategy',
      'Walmart, eBay, Etsy, TikTok Shop setup + scaling',
      'Marketplace keyword ranking + visibility growth',
      'Multi-marketplace analytics + profitability reporting',
      'Inventory management',
      'Review and rating optimization',
      'Brand protection strategies'
    ],
    benefits: [
      { title: 'Revenue Expansion', description: 'Access millions of ready-to-buy customers' },
      { title: 'Diversified Sales', description: 'Reduce dependency on a single channel' },
      { title: 'Increased Visibility', description: 'Top rankings on competitive marketplaces' },
      { title: 'Operational Efficiency', description: 'Streamlined multi-marketplace management' }
    ],
    process: [
      { step: '01', title: 'Setup', description: 'Optimize listings and store presence' },
      { step: '02', title: 'Launch', description: 'Strategic product launches with ranking campaigns' },
      { step: '03', title: 'Advertise', description: 'Implement profitable PPC strategies' },
      { step: '04', title: 'Scale', description: 'Expand to additional marketplaces and products' }
    ],
    faqs: [
      { q: 'Which marketplaces do you manage?', a: 'We manage Amazon, Walmart, eBay, Etsy, TikTok Shop, and other major platforms.' },
      { q: 'Can you help launch new products?', a: 'Yes, we specialize in strategic product launches that achieve strong initial rankings.' },
      { q: 'How do you handle negative reviews?', a: 'We implement proactive review strategies and help address customer issues appropriately.' }
    ]
  },
  'analytics': {
    title: 'Analytics + Reporting',
    subtitle: 'Data-Driven Insights',
    description: 'Comprehensive analytics and reporting that guide strategy, demonstrate ROI, and uncover growth opportunities.',
    heroImage: '/general/121143.jpg',
    icon: FaChartLine,
    gradient: 'from-[#D5AF34] to-[#C19A2E]',
    features: [
      'Weekly KPI reporting + insights',
      'CAC, ROAS, LTV, AOV tracking',
      'Marketplace performance dashboards',
      'Heat mapping, session tracking, customer flow',
      'Quarterly strategy recalibration',
      'Attribution modeling',
      'Cohort analysis',
      'Predictive analytics'
    ],
    benefits: [
      { title: 'Clear Visibility', description: 'Understand exactly whats working and what isnt' },
      { title: 'Better Decisions', description: 'Data-driven insights for confident choices' },
      { title: 'ROI Clarity', description: 'Know the true return on every marketing dollar' },
      { title: 'Continuous Improvement', description: 'Identify opportunities for ongoing optimization' }
    ],
    process: [
      { step: '01', title: 'Setup', description: 'Implement tracking and data collection' },
      { step: '02', title: 'Dashboard', description: 'Build custom reporting dashboards' },
      { step: '03', title: 'Analysis', description: 'Regular deep-dive analysis and insights' },
      { step: '04', title: 'Action', description: 'Translate insights into strategic recommendations' }
    ],
    faqs: [
      { q: 'What analytics platforms do you use?', a: 'We work with Google Analytics, Mixpanel, Amplitude, and platform-specific analytics.' },
      { q: 'How often do we receive reports?', a: 'We provide weekly performance snapshots and monthly deep-dive analyses.' },
      { q: 'Can you build custom dashboards?', a: 'Yes, we create custom dashboards tailored to your specific KPIs and needs.' }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(marketingServicesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = marketingServicesData[slug];

  if (!service) {
    return {
      title: 'Service Not Found | Iconic Brand Group',
    };
  }

  return {
    title: `${service.title} | Marketing Services | Iconic Brand Group`,
    description: service.description,
    alternates: {
      canonical: `https://www.iconicbrandgroup.com/services/marketing/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Iconic Brand Group`,
      description: service.description,
      images: [service.heroImage],
    },
  };
}

export default async function MarketingServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = marketingServicesData[slug];

  if (!service) {
    notFound();
  }

  const IconComponent = service.icon;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden mt-[7.25rem]">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            fill
            className="object-cover object-top"
            alt={service.title}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D5AF34]/20 backdrop-blur-sm border border-[#D5AF34]/30 rounded-full px-6 py-3 mb-6">
            <span className="text-[#D5AF34] font-bold text-sm tracking-wider uppercase">
              Marketing Services
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black mb-6 text-white leading-tight">
            {service.title}
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {service.subtitle}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started
            <HiArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-black mb-6 text-gray-900">
                {service.description}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Our marketing experts leverage cutting-edge strategies and proven methodologies to help you achieve measurable results and sustainable growth.
              </p>
            </div>
            <div className={`w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
              <IconComponent className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white via-[#FFF9E6] to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">
            What We <span className="bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-transparent bg-clip-text">Deliver</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#D5AF34] hover:shadow-lg transition-all duration-300">
                <HiCheckCircle className="w-8 h-8 text-[#D5AF34] mb-3" />
                <span className="font-semibold text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">
            Key <span className="bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-transparent bg-clip-text">Benefits</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D5AF34] to-[#C19A2E] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-black text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white via-[#FFF9E6] to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">
            Our <span className="bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-transparent bg-clip-text">Process</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D5AF34] transition-all duration-300 hover:shadow-xl">
                  <div className="text-6xl font-black text-[#D5AF34]/10 mb-4">{step.step}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <FaArrowRight className="w-6 h-6 text-[#D5AF34]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">
            Frequently Asked <span className="bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-transparent bg-clip-text">Questions</span>
          </h2>
          <div className="space-y-6">
            {service.faqs.map((faq, index) => (
              <details key={index} className="group bg-gradient-to-br from-[#FFF9E6] to-white rounded-2xl border-2 border-gray-200 hover:border-[#D5AF34] transition-all duration-300">
                <summary className="cursor-pointer p-6 font-bold text-lg text-gray-900 flex items-center justify-between">
                  {faq.q}
                  <span className="text-[#D5AF34] group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-[#FFF9E6]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-4 text-center">
            Related <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">Services</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Explore more ways we can help your business grow</p>

          {/* Sibling Marketing Services */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {Object.entries(marketingServicesData)
              .filter(([s]) => s !== slug)
              .slice(0, 3)
              .map(([s, svc]) => (
                <Link key={s} href={`/services/marketing/${s}`} className="group bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#D5AF34] hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#D5AF34] transition-colors">{svc.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{svc.description.slice(0, 100)}...</p>
                  <span className="text-[#D5AF34] font-semibold text-sm flex items-center gap-1">
                    Learn More <HiArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
          </div>

          {/* Cross-links to Consulting */}
          <div className="bg-gradient-to-br from-[#F0F9FA] to-white rounded-2xl border-2 border-[#5F9EA0]/20 p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Strengthen Your Foundation with Consulting</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Business Strategy', slug: 'business-strategy', desc: 'Strategic planning & positioning' },
                { title: 'Operations Management', slug: 'operations-management', desc: 'Optimize workflows & efficiency' },
                { title: 'Financial Advisory', slug: 'financial-advisory', desc: 'Expert financial guidance' },
              ].map((item) => (
                <Link key={item.slug} href={`/services/consulting/${item.slug}`} className="group flex items-center gap-3 p-4 rounded-lg hover:bg-[#5F9EA0]/10 transition-all">
                  <HiArrowRight className="w-5 h-5 text-[#5F9EA0] flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm group-hover:text-[#5F9EA0] transition-colors">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/industries" className="inline-flex items-center gap-2 text-[#5F9EA0] font-bold hover:underline">
              Industries We Serve <HiArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#D5AF34] font-bold hover:underline">
              Read Our Blog <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#D5AF34] to-[#C19A2E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_1px,transparent_1px),linear-gradient(-45deg,#000_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let&apos;s discuss how our {service.title.toLowerCase()} services can help grow your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#D5AF34] px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Schedule a Consultation
            <HiArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

    </div>
  );
}
