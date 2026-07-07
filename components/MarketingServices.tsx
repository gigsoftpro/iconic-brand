'use client';

import Image from "next/image";
import Link from "next/link";
import { FaBullseye, FaVideo, FaBolt, FaEnvelope, FaGlobe, FaSearch, FaDollarSign, FaShoppingCart, FaChartLine } from 'react-icons/fa';
import { HiLightningBolt, HiArrowRight } from 'react-icons/hi';

export default function MarketingServices() {
  const services = [
    {
      title: 'Brand Strategy & Positioning',
      description: 'Build a brand that resonates and stands out in your market',
      items: ['Brand identity + tone of voice', 'Market + competitive analysis', 'Offer positioning + pricing', 'Buyer profiling + journey mapping', 'Strategic growth roadmap'],
      icon: FaBullseye,
      image: '/general/consulting/strategy.jpg',
      gradient: 'from-[#D5AF34] to-[#C19A2E]'
    },
    {
      title: 'Content Creation & Creative Production',
      description: 'Captivating content that tells your story and drives engagement',
      items: ['Social media content (reels, posts, carousels)', 'Scripted video production + editing', 'Product + lifestyle photography', 'Brand storytelling + campaign creative', 'Landing page + brand copywriting'],
      icon: FaVideo,
      image: '/general/consulting/content.jpg',
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    },
    {
      title: 'Paid Media Management',
      description: 'Strategic ad campaigns that maximize ROI across all platforms',
      items: ['Meta + Instagram ads', 'TikTok paid campaigns', 'Google Search, Display, Shopping', 'Retargeting + conversion funnels', 'A/B testing + budget optimization'],
      icon: FaBolt,
      image: '/general/consulting/media.jpg',
      gradient: 'from-[#D5AF34] via-[#FFD700] to-[#5F9EA0]'
    },
    {
      title: 'Email + CRM Management',
      description: 'Automated systems that nurture leads and drive repeat business',
      items: ['Automated email flows + nurture sequences', 'Promotional campaign design', 'SMS marketing + text automation', 'Segmentation + engagement optimization', 'CRM setup + retention workflows'],
      icon: FaEnvelope,
      image: '/general/2149631018.jpg',
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    },
    {
      title: 'Website + Funnel Systems',
      description: 'High-converting websites and funnels that turn visitors into customers',
      items: ['Shopify, WooCommerce, BigCommerce builds', 'Landing page + sales funnel creation', 'Conversion Rate Optimization (CRO)', 'Subscription + recurring revenue setup', 'Split testing + UX improvements'],
      icon: FaGlobe,
      image: '/general/Joshua Paul Hooks Denago EV copy000.jpg',
      gradient: 'from-[#D5AF34] to-[#C19A2E]'
    },
    {
      title: 'SEO + Awareness Growth',
      description: 'Dominate search rankings and build lasting organic visibility',
      items: ['Keyword mapping + content planning', 'Programmatic SEO for scale', 'On-page SEO, schema, blog building', 'Local SEO + directory placement', 'Backlink + authority strategies'],
      icon: FaSearch,
      image: '/general/9319.jpg',
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    },
    {
      title: 'Lead Generation + Revenue Optimization',
      description: 'Complete funnel systems that generate and convert high-quality leads',
      items: ['Full funnel design (cold → convert)', 'High-ticket appointment funnels', 'Upsell, downsell, cross-sell systems', 'Offer structuring + acquisition playbooks', 'Audience growth + retention architecture'],
      icon: FaDollarSign,
      image: '/general/pexels-startup-stock-photos-7075.jpg',
      gradient: 'from-[#D5AF34] via-[#FFD700] to-[#5F9EA0]'
    },
    {
      title: 'eCommerce Marketplace Growth',
      description: 'Scale your products across Amazon, Walmart, and major marketplaces',
      items: ['Amazon Seller Central + A+ Content', 'Amazon PPC + ranking strategy', 'Walmart, eBay, Etsy, TikTok Shop setup', 'Marketplace SEO + visibility growth', 'Multi-marketplace analytics + reporting'],
      icon: FaShoppingCart,
      image: '/general/2149631018.jpg',
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    },
    {
      title: 'Analytics + Reporting',
      description: 'Data-driven insights that guide strategy and maximize performance',
      items: ['Weekly KPI reporting + insights', 'CAC, ROAS, LTV, AOV tracking', 'Marketplace performance dashboards', 'Heat mapping + customer flow analytics', 'Quarterly strategy recalibration'],
      icon: FaChartLine,
      image: '/general/Joshua Paul Hooks Denago EV copy000.jpg',
      gradient: 'from-[#D5AF34] to-[#C19A2E]'
    }
  ];

  return (
    <section id="marketing" className="relative py-32 px-6 bg-gradient-to-b from-white via-[#FFF9E6] to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#D5AF34_1px,transparent_1px),linear-gradient(to_bottom,#D5AF34_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Light Gradient Orbs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#D5AF34]/10 to-[#FFD700]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#5F9EA0]/10 to-[#4A7D7F]/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AF34]/10 to-[#5F9EA0]/10 backdrop-blur-sm border border-[#D5AF34]/20 rounded-full px-6 py-3 mb-6">
            <HiLightningBolt className="w-5 h-5 text-[#D5AF34]" />
            <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text font-bold text-sm tracking-wider uppercase">
              Marketing Excellence
            </span>
          </div>
          <h2 className="text-7xl lg:text-8xl font-black mb-6 leading-[0.9] text-gray-900">
            Marketing <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">Services</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl leading-relaxed mx-auto">
            Comprehensive marketing solutions that drive measurable growth and lasting impact
          </p>
        </div>

        {/* Services Grid - Image Hover Reveal - Only 3 Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link 
                key={index}
                href="/services/marketing"
                className="group relative h-[550px] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image 
                    src={service.image}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={service.title}
                  />
                  {/* Light Overlay - lighter on hover to reveal image */}
                  <div className="absolute inset-0 bg-white/85 group-hover:bg-white/60 transition-all duration-500"></div>
                </div>

                {/* Gradient Border on Hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${service.gradient} p-[2px] rounded-2xl`}>
                  <div className="w-full h-full bg-white rounded-2xl"></div>
                </div>

                {/* Content */}
                <div className="relative h-full p-10 flex flex-col justify-between">
                  {/* Top Section - Always Visible */}
                  <div>
                    <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Section - Hover Reveal */}
                  <div>
                    {/* Key Services - Fade in on hover */}
                    <ul className="space-y-2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      {service.items.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-[#D5AF34] font-bold text-lg leading-none">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn More - Always visible, animates on hover */}
                    <div className="flex items-center gap-2 text-[#D5AF34] font-bold group-hover:gap-4 transition-all duration-300">
                      <span>Learn More</span>
                      <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Number Badge */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-gray-900/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-900/20 group-hover:bg-gray-900/20 transition-colors">
                    <span className="text-gray-900 font-black text-lg">0{index + 1}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <Link 
            href="/services/marketing"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#D5AF34] bg-[length:200%_auto] text-black px-12 py-6 rounded-full font-black text-xl shadow-2xl shadow-[#D5AF34]/30 hover:shadow-[#D5AF34]/60 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 animate-gradient"
          >
            <span>View Full Service Menu</span>
            <HiArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
