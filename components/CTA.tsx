import Image from "next/image";
import { HiCheckCircle, HiStar, HiGift, HiArrowRight, HiEye } from 'react-icons/hi';

export default function CTA() {
  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400">
        <Image 
          src="/general/pexels-goumbik-577210.jpg" 
          fill 
          className="object-cover" 
          alt="Team" 
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 border-4 border-[#D5AF34]/20 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-40 left-10 w-40 h-40 bg-[#5F9EA0]/10 rotate-45 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-[#D5AF34] rounded-full animate-ping"></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-32 text-center z-10">
        {/* Overline */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#D5AF34] to-transparent"></div>
          <span className="text-sm font-bold tracking-[0.3em] text-[#D5AF34] uppercase">
            Transform Your Business
          </span>
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#D5AF34] to-transparent"></div>
        </div>

        {/* Main Headline */}
        <h2 className="text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-[1.1] text-white">
          Let's Build Your{' '}
          <span className="relative inline-block mt-2">
            <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#C19A2E] text-transparent bg-clip-text animate-gradient bg-[length:200%_auto]">
              Legacy
            </span>
            {/* Animated Underline - Same as Hero */}
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
              <path d="M2 10C50 2 100 2 150 10C200 2 250 2 298 10" stroke="url(#gradient-cta)" strokeWidth="4" strokeLinecap="round"/>
              <defs>
                <linearGradient id="gradient-cta" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D5AF34" />
                  <stop offset="50%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#D5AF34" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h2>

        <p className="text-2xl text-gray-300 mb-16 leading-relaxed max-w-3xl mx-auto">
          Strategic consulting and innovative marketing that transforms businesses into{' '}
          <span className="font-bold text-white">industry leaders</span>.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 max-w-4xl mx-auto">
          {[
            { 
              number: '500+', 
              label: 'Successful Projects',
              icon: HiCheckCircle
            },
            { 
              number: '98%', 
              label: 'Client Satisfaction',
              icon: HiStar
            },
            { 
              number: '20+', 
              label: 'Years Experience',
              icon: HiGift
            }
          ].map((stat, i) => {
            const IconComponent = stat.icon;
            return (
            <div key={i} className="group">
              <div className="text-[#D5AF34] mb-4 flex justify-center group-hover:scale-110 transition-transform">
                <IconComponent className="w-8 h-8" />
              </div>
              <div className="text-6xl font-black text-white mb-3 group-hover:text-[#D5AF34] transition-colors">
                {stat.number}
              </div>
              <div className="text-base text-gray-400 font-medium leading-tight">
                {stat.label}
              </div>
            </div>
          );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-6 justify-center">
          <a 
            href="mailto:info@iconicbrandgroup.com" 
            className="group relative bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#D5AF34] bg-[length:200%_auto] text-black px-12 py-6 rounded-full font-bold text-lg shadow-2xl shadow-[#D5AF34]/30 hover:shadow-[#D5AF34]/60 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 animate-gradient"
          >
            <span className="relative z-10 flex items-center gap-3">
              Get Started Today
              <HiArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </a>
          
          <a 
            href="#services" 
            className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="flex items-center gap-3">
              View Our Work
              <HiEye className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
