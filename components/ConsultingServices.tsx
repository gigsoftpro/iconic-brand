'use client';

import Image from "next/image";
import Link from "next/link";
import { FaClipboardList, FaCogs, FaDollarSign } from 'react-icons/fa';
import { HiBriefcase, HiArrowRight } from 'react-icons/hi';

export default function ConsultingServices() {
  const services = [
    {
      title: 'Business Strategy & Planning',
      description: 'Comprehensive strategic planning, market analysis, and competitive positioning to drive sustainable growth',
      items: ['Strategic planning & roadmaps', 'Market analysis & research', 'Competitive positioning', 'Growth strategy development', 'Business model optimization'],
      icon: FaClipboardList,
      image: '/general/consulting/business.jpg',
      gradient: 'from-[#D5AF34] to-[#C19A2E]'
    },
    {
      title: 'Operations Management',
      description: 'Streamline processes, optimize workflows, and enhance operational efficiency across your organization',
      items: ['Process optimization', 'Workflow automation', 'Supply chain management', 'Quality assurance systems', 'Performance metrics'],
      icon: FaCogs,
      image: '/general/consulting/operations.jpg',
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    },
    {
      title: 'Financial Advisory',
      description: 'Expert guidance on financial planning, budgeting, forecasting, and investment strategies',
      items: ['Financial planning & analysis', 'Budget optimization', 'Investment strategies', 'Risk management', 'Cash flow forecasting'],
      icon: FaDollarSign,
      image: '/general/consulting/finance1.jpg',
      gradient: 'from-[#D5AF34] via-[#FFD700] to-[#5F9EA0]'
    }
  ];

  return (
    <section id="consulting" className="relative py-16 md:py-32 px-4 md:px-6 bg-gradient-to-b from-white via-[#F0F9FA] to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5F9EA0_1px,transparent_1px),linear-gradient(to_bottom,#5F9EA0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Light Gradient Orbs */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#5F9EA0]/10 to-[#4A7D7F]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#D5AF34]/10 to-[#C19A2E]/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5F9EA0]/10 to-[#4A7D7F]/10 backdrop-blur-sm border border-[#5F9EA0]/20 rounded-full px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-6">
            <HiBriefcase className="w-4 h-4 md:w-5 md:h-5 text-[#5F9EA0]" />
            <span className="bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] text-transparent bg-clip-text font-bold text-xs md:text-sm tracking-wider uppercase">
              Strategic Excellence
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black mb-4 md:mb-6 leading-[0.9] text-gray-900">
            Consulting <span className="bg-gradient-to-r from-[#5F9EA0] via-[#6AAFB1] to-[#D5AF34] text-transparent bg-clip-text">Services</span>
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-gray-600 max-w-4xl leading-relaxed mx-auto px-4">
            Transform your business with strategic guidance from industry experts
          </p>
        </div>

        {/* Services Grid - Image Hover Reveal - Only 3 Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="group relative h-[450px] md:h-[550px] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500"
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
                <div className="relative h-full p-6 md:p-10 flex flex-col justify-between">
                  {/* Top Section - Always Visible */}
                  <div>
                    <div className={`w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <IconComponent className="w-7 h-7 md:w-10 md:h-10 text-white" />
                    </div>
                    <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-3 md:mb-4 leading-tight tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-[15px]">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Section - Hover Reveal */}
                  <div>
                    {/* Key Services - Fade in on hover */}
                    <ul className="space-y-2 mb-4 md:mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      {service.items.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <span className="text-[#5F9EA0] font-bold text-base md:text-lg leading-none">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn More - Clickable Link */}
                    <Link 
                      href="/services/consulting"
                      className="inline-flex items-center gap-2 text-[#5F9EA0] font-bold hover:gap-4 transition-all duration-300 text-sm md:text-base"
                    >
                      <span>Learn More</span>
                      <HiArrowRight className="w-4 h-4 md:w-5 md:h-5 hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Number Badge */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-gray-900/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-900/20 group-hover:bg-gray-900/20 transition-colors">
                    <span className="text-gray-900 font-black text-base md:text-lg">0{index + 1}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-24 text-center">
          <Link 
            href="/services/consulting"
            className="group inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-[#5F9EA0] via-[#6AAFB1] to-[#5F9EA0] bg-[length:200%_auto] text-white px-8 py-4 md:px-12 md:py-6 rounded-full font-black text-base md:text-lg lg:text-xl shadow-2xl shadow-[#5F9EA0]/30 hover:shadow-[#5F9EA0]/60 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 animate-gradient"
          >
            <span>View Full Service Menu</span>
            <HiArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
