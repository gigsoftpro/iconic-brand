'use client';

import Image from "next/image";
import Link from "next/link";
import { FaBullseye, FaVideo, FaBolt, FaEnvelope, FaGlobe, FaSearch, FaDollarSign, FaShoppingCart, FaChartLine, FaQuoteLeft, FaCheckCircle, FaArrowRight, FaLightbulb, FaRocket, FaHandshake, FaPencilRuler } from 'react-icons/fa';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi';
import { useState } from 'react';

export default function MarketingServicesPage() {
  const services = [
    {
      title: 'Brand Strategy & Positioning',
      slug: 'brand-strategy',
      description: 'Build a brand that resonates and stands out in your market',
      items: [
        'Brand identity + tone of voice development',
        'Market + competitive analysis',
        'Offer positioning + pricing strategy',
        'Buyer profiling + customer journey mapping',
        'Brand audit + strategic growth roadmap'
      ],
      icon: FaBullseye,
      image: '/general/Joshua Paul Hooks Denago EV copy000.jpg',
      gradient: 'from-[#D5AF34] to-[#C19A2E]'
    },
    {
      title: 'Content Creation & Creative Production',
      slug: 'content-creation',
      description: 'Captivating content that tells your story and drives engagement',
      items: [
        'Social media content creation (reels, posts, carousels)',
        'Scripted video production + editing',
        'Product + lifestyle photography',
        'Brand storytelling and campaign creative',
        'Landing page and brand copywriting'
      ],
      icon: FaVideo,
      image: '/general/9319.jpg',
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    },
    {
      title: 'Paid Media Management',
      slug: 'paid-media',
      description: 'Strategic ad campaigns that maximize ROI across all platforms',
      items: [
        'Meta + Instagram ads',
        'TikTok paid campaigns',
        'Google Search, Display, Shopping',
        'Retargeting + conversion funnels',
        'Multivariate A/B testing + budget allocation strategy'
      ],
      icon: FaBolt,
      image: '/general/pexels-startup-stock-photos-7075.jpg',
      gradient: 'from-[#D5AF34] via-[#FFD700] to-[#5F9EA0]'
    },
    {
      title: 'Email + CRM Management',
      slug: 'email-crm',
      description: 'Automated systems that nurture leads and drive repeat business',
      items: [
        'Automated email flows + nurture sequences',
        'Promotional campaign design + execution',
        'SMS marketing + text automation',
        'Segmentation, A/B testing, engagement optimization',
        'CRM setup, lead scoring, retention workflows'
      ],
      icon: FaEnvelope,
      image: '/general/2149631018.jpg',
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    },
    {
      title: 'Website + Funnel Systems',
      slug: 'website-funnels',
      description: 'High-converting websites and funnels that turn visitors into customers',
      items: [
        'Shopify, WooCommerce, BigCommerce buildouts',
        'Landing page + sales funnel creation',
        'Conversion Rate Optimization (CRO)',
        'Subscription models + recurring revenue setup',
        'Split testing + heat map UX improvements'
      ],
      icon: FaGlobe,
      image: '/general/Joshua Paul Hooks Denago EV copy000.jpg',
      gradient: 'from-[#D5AF34] to-[#C19A2E]'
    },
    {
      title: 'SEO + Awareness Growth',
      slug: 'seo',
      description: 'Dominate search rankings and build lasting organic visibility',
      items: [
        'Keyword mapping + content planning',
        'Programmatic SEO deployment for scale',
        'On-page SEO, schema, blog building',
        'Local SEO, directory placement, NAP alignment',
        'Backlink + authority acquisition strategies'
      ],
      icon: FaSearch,
      image: '/general/9319.jpg',
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    },
    {
      title: 'Lead Generation + Revenue Optimization',
      slug: 'lead-generation',
      description: 'Complete funnel systems that generate and convert high-quality leads',
      items: [
        'Full funnel design (cold → nurture → convert)',
        'High-ticket appointment funnels',
        'Upsell, downsell, cross-sell system development',
        'Offer structuring and omni-channel acquisition playbooks',
        'Audience growth + retention architecture'
      ],
      icon: FaDollarSign,
      image: '/general/pexels-startup-stock-photos-7075.jpg',
      gradient: 'from-[#D5AF34] via-[#FFD700] to-[#5F9EA0]'
    },
    {
      title: 'eCommerce Marketplace Growth',
      slug: 'ecommerce',
      description: 'Scale your products across Amazon, Walmart, and major marketplaces',
      items: [
        'Amazon Seller Central setup + A+ Content buildout',
        'Amazon PPC advertising + ranking strategy',
        'Walmart, eBay, Etsy, TikTok Shop store setup + scaling',
        'Marketplace keyword ranking + organic visibility growth',
        'Multi-marketplace analytics + profitability reporting'
      ],
      icon: FaShoppingCart,
      image: '/general/2149631018.jpg',
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    },
    {
      title: 'Analytics + Reporting',
      slug: 'analytics',
      description: 'Data-driven insights that guide strategy and maximize performance',
      items: [
        'Weekly KPI reporting + insights',
        'CAC, ROAS, LTV, AOV tracking',
        'Marketplace performance dashboards',
        'Heat mapping, session tracking, customer flow analytics',
        'Quarterly strategy recalibration & future opportunity mapping'
      ],
      icon: FaChartLine,
      image: '/general/Joshua Paul Hooks Denago EV copy000.jpg',
      gradient: 'from-[#D5AF34] to-[#C19A2E]'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-[7.25rem]">
        <div className="absolute inset-0">
          <Image
            src="/general/121143.jpg"
            fill
            className="object-cover"
            alt="Marketing Services"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-6xl lg:text-8xl font-black mb-6 text-white leading-tight">
            Marketing{" "}
            <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">
              Services
            </span>
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Data-driven campaigns that amplify your brand and captivate your
            audience
          </p>
          <a
            href="#services"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#D5AF34] bg-[length:200%_auto] text-black px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 animate-gradient"
          >
            Explore Services
            <HiArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section
        id="services"
        className="py-24 px-6 bg-gradient-to-b from-white via-[#FFF9E6] to-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link
                  href={`/services/marketing/${service.slug}`}
                  key={index}
                  className="group bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-[#D5AF34] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block"
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
                        <HiCheckCircle className="w-5 h-5 text-[#D5AF34] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-2 text-[#D5AF34] font-bold group-hover:gap-3 transition-all">
                    Learn More <HiArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Our Marketing{" "}
              <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                Approach
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Data-driven strategies combined with creative excellence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Research",
                desc: "Analyze market, competitors, and audience insights",
                icon: FaSearch,
              },
              {
                step: "02",
                title: "Strategy",
                desc: "Craft comprehensive marketing roadmap",
                icon: FaPencilRuler,
              },
              {
                step: "03",
                title: "Execute",
                desc: "Launch campaigns across all channels",
                icon: FaRocket,
              },
              {
                step: "04",
                title: "Optimize",
                desc: "Continuous testing and improvement",
                icon: FaChartLine,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative group">
                  <div className="bg-gradient-to-br from-[#FFF9E6] to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D5AF34] transition-all duration-300 hover:shadow-xl">
                    <div className="text-6xl font-black text-[#D5AF34]/10 mb-4">
                      {item.step}
                    </div>
                    <Icon className="w-12 h-12 text-[#D5AF34] mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <FaArrowRight className="w-6 h-6 text-[#D5AF34]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Showcase */}
      <section className="py-24 px-6 bg-gradient-to-b from-white via-[#FFF9E6] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Real Results,{" "}
              <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                Real Impact
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                metric: "450%",
                label: "Average ROAS",
                desc: "Return on ad spend across campaigns",
              },
              {
                metric: "2.8M+",
                label: "Leads Generated",
                desc: "For clients in the past year",
              },
              {
                metric: "95%",
                label: "Client Retention",
                desc: "Long-term partnerships",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D5AF34] hover:shadow-xl transition-all duration-300"
              >
                <div className="text-6xl font-black bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text mb-3">
                  {stat.metric}
                </div>
                <div className="text-2xl font-bold mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D5AF34]/10 rounded-full px-6 py-3 mb-6">
                <span className="text-[#D5AF34] font-bold text-sm tracking-wider uppercase">
                  Case Study
                </span>
              </div>

              <h3 className="text-4xl font-black mb-6">
                From Zero to{" "}
                <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                  $5M Revenue
                </span>
              </h3>

              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                An e-commerce startup came to us with a great product but no
                market presence. We built their brand from the ground up and
                scaled them to 7 figures in 14 months.
              </p>

              <div className="space-y-4">
                {[
                  "Built brand identity and positioning strategy",
                  "Launched multi-channel paid media campaigns",
                  "Created high-converting sales funnels",
                  "Scaled to $5M annual revenue",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="w-6 h-6 text-[#D5AF34] flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/general/127112.jpg"
                fill
                className="object-cover"
                alt="Marketing Success"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl font-black text-white mb-1">
                        850%
                      </div>
                      <div className="text-white/90 text-sm">
                        Revenue Growth
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white mb-1">
                        4.2x
                      </div>
                      <div className="text-white/90 text-sm">ROAS Achieved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <FaQuoteLeft className="w-16 h-16 text-[#D5AF34] mx-auto mb-8" />
          <blockquote className="text-3xl font-bold mb-8 leading-relaxed">
            "Iconic Brand Group didn't just run our marketing—they became an
            extension of our team. Their strategic approach and creative
            execution took us from unknown to industry leader."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D5AF34] to-[#5F9EA0] rounded-full"></div>
            <div className="text-left">
              <div className="font-bold text-lg">Sarah Martinez</div>
              <div className="text-gray-400">Founder, Luxe Beauty Co.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Common{" "}
              <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "What's your typical timeline to see results?",
                a: "Initial results typically appear within 30-60 days, with significant momentum building by month 3-4. Long-term strategies like SEO take 6-12 months for full impact.",
              },
              {
                q: "Do you work with businesses of all sizes?",
                a: "Yes! We serve everyone from startups to enterprise brands. Our strategies scale based on your budget, goals, and growth stage.",
              },
              {
                q: "What's included in your monthly retainer?",
                a: "Retainers are customized but typically include strategy, campaign management, content creation, reporting, and ongoing optimization across agreed channels.",
              },
              {
                q: "How do you measure campaign success?",
                a: "We track KPIs aligned with your goals: ROAS, CAC, conversion rates, engagement metrics, and ultimately revenue impact. You'll receive detailed monthly reports.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-gradient-to-br from-[#FFF9E6] to-white rounded-2xl border-2 border-gray-200 hover:border-[#D5AF34] transition-all duration-300"
              >
                <summary className="cursor-pointer p-8 font-bold text-xl text-gray-900 flex items-center justify-between">
                  {faq.q}
                  <span className="text-[#D5AF34] group-open:rotate-180 transition-transform duration-300">
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
      <section className="py-20 px-6 bg-gradient-to-b from-white to-[#FFF9E6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-[#5F9EA0] to-[#D5AF34] text-transparent bg-clip-text">
                Consulting Services
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pair marketing with strategic consulting for accelerated results
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Business Strategy', slug: 'business-strategy', desc: 'Comprehensive strategic planning and positioning' },
              { title: 'Operations Management', slug: 'operations-management', desc: 'Streamline processes and optimize efficiency' },
              { title: 'Performance Analytics', slug: 'performance-analytics', desc: 'Data-driven insights and KPI tracking' },
            ].map((item) => (
              <Link key={item.slug} href={`/services/consulting/${item.slug}`} className="group bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#5F9EA0] hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#5F9EA0] transition-colors">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                <span className="text-[#5F9EA0] font-semibold text-sm flex items-center gap-1">Learn More <HiArrowRight className="w-4 h-4" /></span>
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
      <section className="py-24 px-6 bg-gradient-to-br from-[#D5AF34] to-[#5F9EA0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#000_1px,transparent_1px),linear-gradient(-45deg,#000_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Amplify Your Brand?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's create a marketing strategy that delivers real, measurable
            results
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#D5AF34] px-12 py-6 rounded-full font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started Today
            <HiArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </>
  );
}
