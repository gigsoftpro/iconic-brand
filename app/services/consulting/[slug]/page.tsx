import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FaClipboardList, FaCogs, FaDollarSign, FaExchangeAlt, FaShieldAlt, FaChartLine, FaSearch, FaUsers, FaCheckCircle, FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi';
import Navbar from "@/components/Navbar";
import { generateFAQSchema, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { generateAltText, generateImageTitle } from "@/lib/image-utils";

const consultingServicesData: Record<string, {
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
  'business-strategy': {
    title: 'Business Strategy & Planning',
    subtitle: 'Chart Your Path to Success',
    description: 'Comprehensive strategic planning, market analysis, and competitive positioning to drive sustainable growth and market leadership.',
    heroImage: '/general/consulting/strategy.jpg',
    icon: FaClipboardList,
    gradient: 'from-[#5F9EA0] to-[#4A7D7F]',
    features: [
      'Strategic planning & roadmaps',
      'Market analysis & research',
      'Competitive positioning',
      'Growth strategy development',
      'Business model optimization',
      'Vision & mission alignment',
      'Strategic partnership development',
      'Market entry strategies'
    ],
    benefits: [
      { title: 'Clear Direction', description: 'A well-defined roadmap that aligns your entire organization toward common goals' },
      { title: 'Competitive Edge', description: 'Deep market insights that position you ahead of competitors' },
      { title: 'Sustainable Growth', description: 'Strategies designed for long-term success, not just quick wins' },
      { title: 'Resource Optimization', description: 'Focus resources on high-impact initiatives that drive results' }
    ],
    process: [
      { step: '01', title: 'Assessment', description: 'Comprehensive analysis of your current position, capabilities, and market landscape' },
      { step: '02', title: 'Strategy Design', description: 'Develop tailored strategies aligned with your vision and market opportunities' },
      { step: '03', title: 'Roadmap Creation', description: 'Build actionable plans with clear milestones and success metrics' },
      { step: '04', title: 'Implementation Support', description: 'Hands-on guidance to execute strategy and adapt to market changes' }
    ],
    faqs: [
      { q: 'How long does strategic planning take?', a: 'A comprehensive strategic plan typically takes 6-12 weeks to develop, depending on organizational complexity and scope.' },
      { q: 'How often should we update our strategy?', a: 'We recommend annual strategic reviews with quarterly check-ins to ensure alignment with market conditions.' },
      { q: 'What makes your approach different?', a: 'We combine data-driven analysis with hands-on implementation support, ensuring strategies translate into real results.' }
    ]
  },
  'operations-management': {
    title: 'Operations Management',
    subtitle: 'Optimize Your Operations',
    description: 'Streamline processes, optimize workflows, and enhance operational efficiency to reduce costs and improve performance.',
    heroImage: '/general/consulting/operations.jpg',
    icon: FaCogs,
    gradient: 'from-[#5F9EA0] to-[#4A7D7F]',
    features: [
      'Process optimization',
      'Workflow automation',
      'Supply chain management',
      'Quality assurance systems',
      'Performance metrics & KPIs',
      'Lean methodology implementation',
      'Capacity planning',
      'Operational excellence programs'
    ],
    benefits: [
      { title: 'Cost Reduction', description: 'Eliminate waste and inefficiencies to significantly reduce operational costs' },
      { title: 'Improved Quality', description: 'Implement systems that ensure consistent, high-quality outputs' },
      { title: 'Faster Delivery', description: 'Streamlined processes that accelerate time-to-market' },
      { title: 'Scalability', description: 'Operations designed to scale efficiently with your growth' }
    ],
    process: [
      { step: '01', title: 'Process Mapping', description: 'Document and analyze current workflows to identify bottlenecks' },
      { step: '02', title: 'Gap Analysis', description: 'Identify inefficiencies and opportunities for improvement' },
      { step: '03', title: 'Solution Design', description: 'Develop optimized processes and automation strategies' },
      { step: '04', title: 'Implementation', description: 'Execute changes with minimal disruption to ongoing operations' }
    ],
    faqs: [
      { q: 'Will optimization disrupt current operations?', a: 'We implement changes incrementally to minimize disruption while maximizing impact.' },
      { q: 'How do you measure success?', a: 'We establish clear KPIs upfront including cost savings, efficiency gains, and quality improvements.' },
      { q: 'Do you provide ongoing support?', a: 'Yes, we offer continuous improvement programs to maintain and enhance operational excellence.' }
    ]
  },
  'financial-advisory': {
    title: 'Financial Advisory',
    subtitle: 'Maximize Financial Performance',
    description: 'Expert guidance on financial planning, budgeting, and investment strategies to optimize your financial health and growth potential.',
    heroImage: '/general/consulting/finance1.jpg',
    icon: FaDollarSign,
    gradient: 'from-[#D5AF34] to-[#C19A2E]',
    features: [
      'Financial planning & analysis',
      'Budget optimization',
      'Investment strategies',
      'Risk management',
      'Cash flow forecasting',
      'Capital structure optimization',
      'M&A advisory',
      'Financial modeling'
    ],
    benefits: [
      { title: 'Improved Profitability', description: 'Identify opportunities to increase margins and reduce unnecessary costs' },
      { title: 'Better Decision Making', description: 'Data-driven insights for confident financial decisions' },
      { title: 'Risk Mitigation', description: 'Proactive strategies to protect against financial risks' },
      { title: 'Growth Capital', description: 'Optimize capital structure to fund growth initiatives' }
    ],
    process: [
      { step: '01', title: 'Financial Assessment', description: 'Comprehensive review of financial statements, metrics, and performance' },
      { step: '02', title: 'Analysis & Insights', description: 'Deep-dive analysis to identify opportunities and risks' },
      { step: '03', title: 'Strategy Development', description: 'Create tailored financial strategies aligned with business goals' },
      { step: '04', title: 'Implementation', description: 'Execute strategies with ongoing monitoring and adjustment' }
    ],
    faqs: [
      { q: 'What size companies do you work with?', a: 'We serve businesses from growth-stage startups to established enterprises across various industries.' },
      { q: 'How do you charge for services?', a: 'We offer flexible engagement models including project-based fees and retainer arrangements.' },
      { q: 'Can you help with fundraising?', a: 'Yes, we provide support for fundraising including pitch preparation, financial modeling, and investor introductions.' }
    ]
  },
  'change-management': {
    title: 'Change Management',
    subtitle: 'Navigate Transformation Successfully',
    description: 'Navigate organizational transformation with structured approaches that ensure adoption, minimize resistance, and maximize success.',
    heroImage: '/general/9319.jpg',
    icon: FaExchangeAlt,
    gradient: 'from-[#5F9EA0] to-[#4A7D7F]',
    features: [
      'Change readiness assessment',
      'Stakeholder engagement',
      'Communication strategies',
      'Training & development',
      'Post-implementation support',
      'Culture transformation',
      'Leadership alignment',
      'Resistance management'
    ],
    benefits: [
      { title: 'Higher Adoption', description: 'Structured approach ensures changes are embraced across the organization' },
      { title: 'Reduced Resistance', description: 'Proactive engagement minimizes pushback and accelerates acceptance' },
      { title: 'Faster ROI', description: 'Effective change management accelerates time to value' },
      { title: 'Sustained Results', description: 'Changes that stick and become part of organizational DNA' }
    ],
    process: [
      { step: '01', title: 'Readiness Assessment', description: 'Evaluate organizational capacity and appetite for change' },
      { step: '02', title: 'Strategy Development', description: 'Create comprehensive change management plan' },
      { step: '03', title: 'Engagement & Training', description: 'Prepare stakeholders and build capabilities' },
      { step: '04', title: 'Reinforcement', description: 'Monitor adoption and sustain momentum' }
    ],
    faqs: [
      { q: 'How do you handle resistance to change?', a: 'We identify potential resistors early and address concerns through targeted communication and involvement.' },
      { q: 'What role do leaders play?', a: 'Leadership alignment is critical. We work closely with executives to ensure visible sponsorship and support.' },
      { q: 'How long does change management take?', a: 'Duration depends on scope, but typically ranges from 3-12 months for significant transformations.' }
    ]
  },
  'risk-assessment': {
    title: 'Risk Assessment & Mitigation',
    subtitle: 'Protect Your Business',
    description: 'Identify, analyze, and develop strategies to manage business risks, ensuring resilience and protecting your organization.',
    heroImage: '/general/146187.jpg',
    icon: FaShieldAlt,
    gradient: 'from-[#D5AF34] to-[#C19A2E]',
    features: [
      'Risk identification & analysis',
      'Compliance management',
      'Business continuity planning',
      'Crisis management',
      'Insurance optimization',
      'Cybersecurity assessment',
      'Regulatory compliance',
      'Enterprise risk management'
    ],
    benefits: [
      { title: 'Risk Visibility', description: 'Complete understanding of risks facing your organization' },
      { title: 'Proactive Protection', description: 'Strategies to prevent issues before they become crises' },
      { title: 'Business Continuity', description: 'Plans to maintain operations through disruptions' },
      { title: 'Stakeholder Confidence', description: 'Demonstrate robust risk management to investors and partners' }
    ],
    process: [
      { step: '01', title: 'Risk Identification', description: 'Comprehensive assessment of potential risks across all areas' },
      { step: '02', title: 'Risk Analysis', description: 'Evaluate probability and impact of identified risks' },
      { step: '03', title: 'Mitigation Planning', description: 'Develop strategies to prevent, reduce, or transfer risks' },
      { step: '04', title: 'Monitoring', description: 'Ongoing surveillance and response protocols' }
    ],
    faqs: [
      { q: 'What types of risks do you assess?', a: 'We cover strategic, operational, financial, compliance, and reputational risks.' },
      { q: 'Do you help with regulatory compliance?', a: 'Yes, we assist with identifying requirements and implementing compliance programs.' },
      { q: 'How often should risk assessments be updated?', a: 'We recommend annual comprehensive reviews with quarterly monitoring of key risks.' }
    ]
  },
  'performance-analytics': {
    title: 'Performance Analytics',
    subtitle: 'Data-Driven Decisions',
    description: 'Leverage data-driven insights and KPI tracking to measure success, optimize performance, and drive continuous improvement.',
    heroImage: '/general/127112.jpg',
    icon: FaChartLine,
    gradient: 'from-[#5F9EA0] to-[#4A7D7F]',
    features: [
      'KPI development & tracking',
      'Dashboard creation',
      'Predictive analytics',
      'Benchmarking analysis',
      'Performance reporting',
      'Data visualization',
      'Business intelligence',
      'Real-time monitoring'
    ],
    benefits: [
      { title: 'Clear Visibility', description: 'Real-time dashboards showing performance across all key metrics' },
      { title: 'Faster Decisions', description: 'Data at your fingertips enables quick, informed decisions' },
      { title: 'Predictive Insights', description: 'Anticipate trends and issues before they impact performance' },
      { title: 'Accountability', description: 'Clear metrics create ownership and drive results' }
    ],
    process: [
      { step: '01', title: 'KPI Design', description: 'Define metrics that matter most for your business success' },
      { step: '02', title: 'Data Integration', description: 'Connect data sources and establish automated collection' },
      { step: '03', title: 'Dashboard Development', description: 'Build intuitive visualizations for different stakeholders' },
      { step: '04', title: 'Insights & Action', description: 'Translate data into actionable recommendations' }
    ],
    faqs: [
      { q: 'What tools do you use?', a: 'We work with leading platforms including Tableau, Power BI, and custom solutions based on your needs.' },
      { q: 'How long until we see results?', a: 'Initial dashboards can be deployed within 4-6 weeks, with continuous refinement thereafter.' },
      { q: 'Do you provide training?', a: 'Yes, we ensure your team can effectively use and maintain analytics tools.' }
    ]
  },
  'market-analysis': {
    title: 'Market Analysis',
    subtitle: 'Understand Your Market',
    description: 'Deep market research and competitive intelligence to identify opportunities, understand customers, and inform strategic decisions.',
    heroImage: '/general/2149631019.jpg',
    icon: FaSearch,
    gradient: 'from-[#D5AF34] to-[#C19A2E]',
    features: [
      'Market research & sizing',
      'Competitive analysis',
      'Customer insights',
      'Trend analysis',
      'Opportunity identification',
      'Industry benchmarking',
      'Market segmentation',
      'Growth opportunity mapping'
    ],
    benefits: [
      { title: 'Market Understanding', description: 'Deep insights into market dynamics, trends, and opportunities' },
      { title: 'Competitive Intelligence', description: 'Know your competitors strategies, strengths, and weaknesses' },
      { title: 'Customer Clarity', description: 'Understand what drives your customers decisions' },
      { title: 'Strategic Confidence', description: 'Make decisions backed by solid market data' }
    ],
    process: [
      { step: '01', title: 'Research Design', description: 'Define objectives and methodology for market research' },
      { step: '02', title: 'Data Collection', description: 'Gather primary and secondary market data' },
      { step: '03', title: 'Analysis', description: 'Synthesize data into actionable insights' },
      { step: '04', title: 'Recommendations', description: 'Strategic recommendations based on findings' }
    ],
    faqs: [
      { q: 'What research methods do you use?', a: 'We combine quantitative surveys, qualitative interviews, secondary research, and data analytics.' },
      { q: 'How long does market research take?', a: 'Typical projects range from 4-12 weeks depending on scope and depth required.' },
      { q: 'Do you provide ongoing market monitoring?', a: 'Yes, we offer continuous market intelligence services for ongoing strategic support.' }
    ]
  },
  'organizational-development': {
    title: 'Organizational Development',
    subtitle: 'Build High-Performing Teams',
    description: 'Build high-performing teams and optimize organizational structure to maximize talent, culture, and leadership effectiveness.',
    heroImage: '/general/pexels-goumbik-577210.jpg',
    icon: FaUsers,
    gradient: 'from-[#5F9EA0] to-[#4A7D7F]',
    features: [
      'Organizational design',
      'Leadership development',
      'Team building',
      'Culture transformation',
      'Talent management',
      'Succession planning',
      'Employee engagement',
      'Performance management systems'
    ],
    benefits: [
      { title: 'Stronger Leadership', description: 'Develop leaders who inspire and drive results' },
      { title: 'Engaged Teams', description: 'Create an environment where talent thrives' },
      { title: 'Cultural Alignment', description: 'Build a culture that supports your strategy' },
      { title: 'Talent Retention', description: 'Keep your best people engaged and growing' }
    ],
    process: [
      { step: '01', title: 'Assessment', description: 'Evaluate current organizational effectiveness and culture' },
      { step: '02', title: 'Design', description: 'Create optimal structure and development programs' },
      { step: '03', title: 'Implementation', description: 'Roll out changes with comprehensive support' },
      { step: '04', title: 'Sustainment', description: 'Embed changes into organizational fabric' }
    ],
    faqs: [
      { q: 'How do you assess organizational culture?', a: 'We use surveys, interviews, and observation to understand your current culture and aspirational state.' },
      { q: 'What leadership development approaches do you use?', a: 'We combine coaching, workshops, experiential learning, and 360-degree feedback.' },
      { q: 'How long does culture transformation take?', a: 'Meaningful culture change typically requires 12-24 months of sustained effort.' }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(consultingServicesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = consultingServicesData[slug];

  if (!service) {
    return {
      title: 'Service Not Found | Iconic Brand Group',
    };
  }

  return {
    title: `${service.title} | Consulting Services | Iconic Brand Group`,
    description: service.description,
    alternates: {
      canonical: `https://www.iconicbrandgroup.com/services/consulting/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Iconic Brand Group`,
      description: service.description,
      images: [service.heroImage],
    },
  };
}

export default async function ConsultingServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = consultingServicesData[slug];

  if (!service) {
    notFound();
  }

  const IconComponent = service.icon;

  // Generate schemas
  const faqSchema = generateFAQSchema(service.faqs);
  const webPageSchema = generateWebPageSchema({
    name: service.title,
    description: service.description,
    url: `/services/consulting/${slug}`
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Consulting', url: '/services/consulting' },
    { name: service.title, url: `/services/consulting/${slug}` }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, webPageSchema, breadcrumbSchema]),
        }}
      />
      <div className="min-h-screen bg-white">
        <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden mt-[7.25rem]">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            fill
            className="object-cover object-top"
            alt={generateAltText({
              context: 'service',
              serviceName: service.title,
              action: service.subtitle
            })}
            title={generateImageTitle(service.title, 'Consulting Services')}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#5F9EA0]/20 backdrop-blur-sm border border-[#5F9EA0]/30 rounded-full px-6 py-3 mb-6">
            <span className="text-[#5F9EA0] font-bold text-sm tracking-wider uppercase">
              Consulting Services
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started
            <HiArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-7 lg:py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl lg:text-4xl font-black mb-6 text-gray-900">
                {service.description}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Our expert consultants bring decades of experience to help you navigate complex challenges and unlock new opportunities for growth.
              </p>
            </div>
            <div className={`w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
              <IconComponent className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-2 lg:py-20 px-6 bg-gradient-to-b from-white via-[#F0F9FA] to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">
            What We <span className="bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] text-transparent bg-clip-text">Deliver</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#5F9EA0] hover:shadow-lg transition-all duration-300">
                <HiCheckCircle className="w-8 h-8 text-[#5F9EA0] mb-3" />
                <span className="font-semibold text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-2 lg:py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">
            Key <span className="bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] text-transparent bg-clip-text">Benefits</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5F9EA0] to-[#4A7D7F] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
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
      <section className="py-20 px-6 bg-gradient-to-b from-white via-[#F0F9FA] to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">
            Our <span className="bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] text-transparent bg-clip-text">Process</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#5F9EA0] transition-all duration-300 hover:shadow-xl">
                  <div className="text-6xl font-black text-[#5F9EA0]/10 mb-4">{step.step}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <FaArrowRight className="w-6 h-6 text-[#5F9EA0]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-2 lg:py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center">
            Frequently Asked <span className="bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] text-transparent bg-clip-text">Questions</span>
          </h2>
          <div className="space-y-6">
            {service.faqs.map((faq, index) => (
              <details key={index} className="group bg-gradient-to-br from-[#F0F9FA] to-white rounded-2xl border-2 border-gray-200 hover:border-[#5F9EA0] transition-all duration-300">
                <summary className="cursor-pointer p-6 font-bold text-lg text-gray-900 flex items-center justify-between">
                  {faq.q}
                  <span className="text-[#5F9EA0] group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-[#F0F9FA]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-4 text-center">
            Related <span className="bg-gradient-to-r from-[#5F9EA0] to-[#D5AF34] text-transparent bg-clip-text">Services</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Explore more ways we can help your business grow</p>

          {/* Sibling Consulting Services */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {Object.entries(consultingServicesData)
              .filter(([s]) => s !== slug)
              .slice(0, 3)
              .map(([s, svc]) => (
                <Link key={s} href={`/services/consulting/${s}`} className="group bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#5F9EA0] hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#5F9EA0] transition-colors">{svc.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{svc.description.slice(0, 100)}...</p>
                  <span className="text-[#5F9EA0] font-semibold text-sm flex items-center gap-1">
                    Learn More <HiArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
          </div>

          {/* Cross-links to Marketing */}
          <div className="bg-gradient-to-br from-[#FFF9E6] to-white rounded-2xl border-2 border-[#D5AF34]/20 p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Amplify Your Results with Marketing</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Brand Strategy', slug: 'brand-strategy', desc: 'Build a brand that resonates' },
                { title: 'SEO + Awareness', slug: 'seo', desc: 'Dominate search rankings' },
                { title: 'Lead Generation', slug: 'lead-generation', desc: 'Convert leads into revenue' },
              ].map((item) => (
                <Link key={item.slug} href={`/services/marketing/${item.slug}`} className="group flex items-center gap-3 p-4 rounded-lg hover:bg-[#D5AF34]/10 transition-all">
                  <HiArrowRight className="w-5 h-5 text-[#D5AF34] flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm group-hover:text-[#D5AF34] transition-colors">{item.title}</div>
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
      <section className="py-20 px-6 bg-gradient-to-br from-[#5F9EA0] to-[#4A7D7F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_1px,transparent_1px),linear-gradient(-45deg,#000_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let&apos;s discuss how our {service.title.toLowerCase()} services can help transform your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#5F9EA0] px-12 py-5 rounded-full font-bold text-lg lg:text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Schedule a Consultation
            <HiArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      </div>
    </>
  );
}
