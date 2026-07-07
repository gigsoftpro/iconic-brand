'use client';

import Image from "next/image";
import Link from "next/link";
import { FaClipboardList, FaCogs, FaDollarSign, FaExchangeAlt, FaShieldAlt, FaChartLine, FaSearch, FaUsers, FaQuoteLeft, FaCheckCircle, FaArrowRight, FaLightbulb, FaRocket, FaHandshake } from 'react-icons/fa';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi';
import { useState } from 'react';

export default function ConsultingServicesPage() {
  const services = [
    {
      title: 'Business Strategy & Planning',
      slug: 'business-strategy',
      description: 'Comprehensive strategic planning, market analysis, and competitive positioning',
      items: [
        'Strategic planning & roadmaps',
        'Market analysis & research',
        'Competitive positioning',
        'Growth strategy development',
        'Business model optimization'
      ],
      icon: FaClipboardList,
      gradient: 'from-[#D5AF34] to-[#C19A2E]'
    },
    {
      title: 'Operations Management',
      slug: 'operations-management',
      description: 'Streamline processes, optimize workflows, and enhance operational efficiency',
      items: [
        'Process optimization',
        'Workflow automation',
        'Supply chain management',
        'Quality assurance systems',
        'Performance metrics & KPIs'
      ],
      icon: FaCogs,
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    },
    {
      title: 'Financial Advisory',
      slug: 'financial-advisory',
      description: 'Expert guidance on financial planning, budgeting, and investment strategies',
      items: [
        'Financial planning & analysis',
        'Budget optimization',
        'Investment strategies',
        'Risk management',
        'Cash flow forecasting'
      ],
      icon: FaDollarSign,
      gradient: 'from-[#D5AF34] via-[#FFD700] to-[#5F9EA0]'
    },
    {
      title: 'Change Management',
      slug: 'change-management',
      description: 'Navigate organizational transformation with structured approaches',
      items: [
        'Change readiness assessment',
        'Stakeholder engagement',
        'Communication strategies',
        'Training & development',
        'Post-implementation support'
      ],
      icon: FaExchangeAlt,
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    },
    {
      title: 'Risk Assessment & Mitigation',
      slug: 'risk-assessment',
      description: 'Identify, analyze, and develop strategies to manage business risks',
      items: [
        'Risk identification & analysis',
        'Compliance management',
        'Business continuity planning',
        'Crisis management',
        'Insurance optimization'
      ],
      icon: FaShieldAlt,
      gradient: 'from-[#D5AF34] to-[#C19A2E]'
    },
    {
      title: 'Performance Analytics',
      slug: 'performance-analytics',
      description: 'Data-driven insights and KPI tracking to measure success',
      items: [
        'KPI development & tracking',
        'Dashboard creation',
        'Predictive analytics',
        'Benchmarking analysis',
        'Performance reporting'
      ],
      icon: FaChartLine,
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    },
    {
      title: 'Market Analysis',
      slug: 'market-analysis',
      description: 'Deep market research and competitive intelligence',
      items: [
        'Market research & sizing',
        'Competitive analysis',
        'Customer insights',
        'Trend analysis',
        'Opportunity identification'
      ],
      icon: FaSearch,
      gradient: 'from-[#D5AF34] via-[#FFD700] to-[#5F9EA0]'
    },
    {
      title: 'Organizational Development',
      slug: 'organizational-development',
      description: 'Build high-performing teams and optimize organizational structure',
      items: [
        'Organizational design',
        'Leadership development',
        'Team building',
        'Culture transformation',
        'Talent management'
      ],
      icon: FaUsers,
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[7.25rem]">
        <div className="absolute inset-0">
          <Image
            src="/general/4073.jpg"
            fill
            className="object-cover"
            alt="Consulting Services"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-6xl lg:text-8xl font-black mb-6 text-white leading-tight">
            Consulting{" "}
            <span className="bg-gradient-to-r from-[#5F9EA0] via-[#6AAFB1] to-[#D5AF34] text-transparent bg-clip-text">
              Services
            </span>
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your business with strategic guidance from industry
            experts
          </p>
          <a
            href="#services"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5F9EA0] via-[#6AAFB1] to-[#5F9EA0] bg-[length:200%_auto] text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 animate-gradient"
          >
            Explore Services
            <HiArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section
        id="services"
        className="py-24 px-6 bg-gradient-to-b from-white via-[#F0F9FA] to-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link
                  href={`/services/consulting/${service.slug}`}
                  key={index}
                  className="group bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-[#5F9EA0] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block"
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-black mb-3 text-gray-900">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <HiCheckCircle className="w-5 h-5 text-[#5F9EA0] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-2 text-[#5F9EA0] font-bold group-hover:gap-3 transition-all">
                    Learn More <HiArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Our Proven{" "}
              <span className="bg-gradient-to-r from-[#5F9EA0] to-[#D5AF34] text-transparent bg-clip-text">
                Process
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach that delivers consistent, measurable results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "Deep dive into your business, challenges, and goals",
                icon: FaSearch,
              },
              {
                step: "02",
                title: "Strategy",
                desc: "Develop customized roadmap aligned with your objectives",
                icon: FaLightbulb,
              },
              {
                step: "03",
                title: "Implementation",
                desc: "Execute with precision and agility",
                icon: FaRocket,
              },
              {
                step: "04",
                title: "Optimization",
                desc: "Continuous improvement and scaling",
                icon: FaChartLine,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative group">
                  <div className="bg-gradient-to-br from-[#F0F9FA] to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#5F9EA0] transition-all duration-300 hover:shadow-xl">
                    <div className="text-6xl font-black text-[#5F9EA0]/10 mb-4">
                      {item.step}
                    </div>
                    <Icon className="w-12 h-12 text-[#5F9EA0] mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <FaArrowRight className="w-6 h-6 text-[#5F9EA0]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Highlight */}
      <section className="py-24 px-6 bg-gradient-to-b from-white via-[#F0F9FA] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/general/Joshua Paul Hooks Denago EV copy000.jpg"
                fill
                className="object-cover"
                alt="Success Story"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-5xl font-black text-white mb-2">
                    250%
                  </div>
                  <div className="text-white/90">
                    Revenue Growth in 18 Months
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-[#5F9EA0]/10 rounded-full px-6 py-3 mb-6">
                <span className="text-[#5F9EA0] font-bold text-sm tracking-wider uppercase">
                  Success Story
                </span>
              </div>

              <h2 className="text-5xl font-black mb-6">
                Transforming a Regional Player into a{" "}
                <span className="bg-gradient-to-r from-[#5F9EA0] to-[#D5AF34] text-transparent bg-clip-text">
                  Market Leader
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                A mid-sized manufacturing company approached us with stagnant
                growth and operational inefficiencies. Through strategic
                planning and operational optimization, we helped them achieve
                remarkable results.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Streamlined operations reducing costs by 35%",
                  "Implemented data-driven decision making framework",
                  "Expanded into 3 new markets successfully",
                  "Built high-performing leadership team",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="w-6 h-6 text-[#5F9EA0] flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Start Your Success Story
                <HiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <FaQuoteLeft className="w-16 h-16 text-[#5F9EA0] mx-auto mb-8" />
          <blockquote className="text-3xl font-bold mb-8 leading-relaxed">
            "The strategic insights and hands-on support from Iconic Brand Group
            transformed our entire business model. Their team didn't just
            consult—they became true partners in our success."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#5F9EA0] to-[#D5AF34] rounded-full"></div>
            <div className="text-left">
              <div className="font-bold text-lg">Michael Chen</div>
              <div className="text-gray-400">CEO, TechVentures Inc.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#5F9EA0] to-[#D5AF34] text-transparent bg-clip-text">
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How long does a typical consulting engagement last?",
                a: "Engagements typically range from 3-12 months depending on scope and complexity. We offer flexible arrangements from project-based to ongoing retainer relationships.",
              },
              {
                q: "What industries do you specialize in?",
                a: "We work across diverse industries including technology, manufacturing, healthcare, retail, and professional services. Our methodologies are adaptable to any sector.",
              },
              {
                q: "How do you measure success?",
                a: "We establish clear KPIs at the outset aligned with your business objectives. Success metrics typically include revenue growth, cost reduction, efficiency gains, and market share expansion.",
              },
              {
                q: "What makes your approach different?",
                a: "We combine strategic thinking with hands-on implementation. Our consultants don't just deliver recommendations—we work alongside your team to ensure successful execution.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-gradient-to-br from-[#F0F9FA] to-white rounded-2xl border-2 border-gray-200 hover:border-[#5F9EA0] transition-all duration-300"
              >
                <summary className="cursor-pointer p-8 font-bold text-xl text-gray-900 flex items-center justify-between">
                  {faq.q}
                  <span className="text-[#5F9EA0] group-open:rotate-180 transition-transform duration-300">
                    ▼
                  </span>
                </summary>
                <div className="px-8 pb-8 text-gray-600 text-lg leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Explore More Services */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-[#F0F9FA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                Marketing Services
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Combine consulting with expert marketing to accelerate your growth
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Brand Strategy', slug: 'brand-strategy', desc: 'Build a brand that resonates and stands out' },
              { title: 'Content Creation', slug: 'content-creation', desc: 'Captivating content that drives engagement' },
              { title: 'SEO + Awareness', slug: 'seo', desc: 'Dominate search rankings with organic visibility' },
            ].map((item) => (
              <Link key={item.slug} href={`/services/marketing/${item.slug}`} className="group bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#D5AF34] hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#D5AF34] transition-colors">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                <span className="text-[#D5AF34] font-semibold text-sm flex items-center gap-1">Learn More <HiArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/industries" className="inline-flex items-center gap-2 border-2 border-[#5F9EA0] text-[#5F9EA0] px-6 py-3 rounded-full font-bold hover:bg-[#5F9EA0] hover:text-white transition-all">
              Industries We Serve <HiArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/blog" className="inline-flex items-center gap-2 border-2 border-[#D5AF34] text-[#D5AF34] px-6 py-3 rounded-full font-bold hover:bg-[#D5AF34] hover:text-black transition-all">
              Read Our Insights <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#5F9EA0] to-[#4A7D7F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_1px,transparent_1px),linear-gradient(-45deg,#000_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's develop a strategic roadmap that drives sustainable growth
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#5F9EA0] px-12 py-6 rounded-full font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started Today
            <HiArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </>
  );
}
