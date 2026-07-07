'use client';

import Image from "next/image";
import { HiArrowRight, HiLightningBolt, HiCheckCircle, HiGift, HiLightBulb, HiChevronDown } from 'react-icons/hi';
import { FaStar } from 'react-icons/fa';

export default function HeroLight() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#FFF9E6] to-white">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#D5AF34]/20 to-[#FFD700]/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#5F9EA0]/15 to-[#4A7D7F]/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-[450px] h-[450px] bg-gradient-to-br from-[#E6D5B8]/30 to-[#D5AF34]/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AF34]/10 to-[#5F9EA0]/10 backdrop-blur-sm border border-[#D5AF34]/20 rounded-full px-6 py-3 shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D5AF34] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D5AF34]"></span>
              </span>
              <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text font-bold text-sm tracking-wide">
                PREMIUM BUSINESS SOLUTIONS
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-7xl lg:text-8xl font-black leading-[0.9] text-black">
              Elevate Your
              <br />
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#C19A2E] text-transparent bg-clip-text animate-gradient bg-[length:200%_auto]">
                  Brand
                </span>
                {/* Animated Underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50 2 100 2 150 10C200 2 250 2 298 10"
                    stroke="url(#gradient-light)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient-light"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#D5AF34" />
                      <stop offset="50%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#D5AF34" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />
              to Iconic Status
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-700 leading-relaxed max-w-xl">
              Strategic consulting and innovative marketing solutions that
              transform businesses into industry leaders. We don't just build
              brands—
              <span className="text-[#D5AF34] font-bold">
                {" "}
                we create legacies
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#services"
                className="group relative bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#D5AF34] bg-[length:200%_auto] text-black px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-[#D5AF34]/30 hover:shadow-[#D5AF34]/60 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 animate-gradient"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Services
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </a>

              <a
                href="/contact"
                className="group relative bg-white border-2 border-black text-black px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Get Started
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
            </div>

            {/* Mini Stats */}
            {/* <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              {[
                { number: '500+', label: 'Clients', icon: '👥', color: 'from-[#D5AF34] to-[#C19A2E]' },
                { number: '98%', label: 'Satisfaction', icon: '⭐', color: 'from-[#5F9EA0] to-[#4A7D7F]' },
                { number: '20+', label: 'Years', icon: '🏆', color: 'from-[#D5AF34] to-[#5F9EA0]' }
              ].map((stat, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} text-transparent bg-clip-text group-hover:scale-110 transition-transform`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Right Visual - Premium Cards */}
          <div className="relative h-[700px] hidden lg:block">
            {/* Main Feature Card */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px]">
              <div className="relative w-full h-full group">
                <div className="absolute inset-0 bg-white backdrop-blur-2xl rounded-3xl border-2 border-gray-200 shadow-2xl hover:shadow-[#D5AF34]/20 transition-all duration-700 p-8">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Icon */}
                      <div className="w-20 h-20 bg-gradient-to-br from-[#D5AF34] to-[#FFD700] rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <svg
                          className="w-10 h-10 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-black text-black mb-3">
                        Startup Specialists
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Accelerate your startup with data-driven strategies and
                        proven methodologies
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[#D5AF34] font-bold group-hover:gap-4 transition-all">
                      <span>Learn More</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 1 - Top Right */}
            <div className="absolute top-10 right-0 w-72 h-56 bg-gradient-to-br from-white to-[#5F9EA0]/5 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-xl p-6 transform rotate-6 hover:rotate-3 transition-all duration-500 animate-float">
              <div className="w-14 h-14 bg-gradient-to-br from-[#5F9EA0] to-[#4A7D7F] rounded-xl mb-4 flex items-center justify-center shadow-md">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-black mb-2">
                Proven Results
              </h4>
              <p className="text-sm text-gray-600">
                Track record of success across industries
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-[98%] bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] rounded-full"></div>
                </div>
                <span className="text-xs font-bold text-[#5F9EA0]">98%</span>
              </div>
            </div>

            {/* Floating Card 2 - Bottom Left */}
            <div className="absolute bottom-10 left-0 w-72 h-56 bg-gradient-to-br from-white to-[#D5AF34]/5 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-xl p-6 transform -rotate-6 hover:-rotate-3 transition-all duration-500 animate-float animation-delay-2000">
              <div className="w-14 h-14 bg-gradient-to-br from-[#D5AF34] to-[#C19A2E] rounded-xl mb-4 flex items-center justify-center shadow-md">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-black mb-2">
                Attention To Detail
              </h4>
              <p className="text-sm text-gray-600">
                Excellence in every detail we deliver
              </p>
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-[#D5AF34]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Decorative Dots */}
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#D5AF34] rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-[#5F9EA0] rounded-full animate-ping animation-delay-1000"></div>

            {/* Small Accent Cards */}
            <div className="absolute top-1/4 left-10 w-16 h-16 bg-gradient-to-br from-[#D5AF34]/20 to-[#FFD700]/10 rounded-xl backdrop-blur-sm border border-[#D5AF34]/20 flex items-center justify-center animate-float animation-delay-1000">
              <svg
                className="w-8 h-8 text-[#D5AF34]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-gradient-to-br from-[#5F9EA0]/20 to-[#4A7D7F]/10 rounded-xl backdrop-blur-sm border border-[#5F9EA0]/20 flex items-center justify-center animate-float animation-delay-3000">
              <svg
                className="w-8 h-8 text-[#5F9EA0]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">
            Scroll to explore
          </span>
          <svg
            className="w-6 h-6 text-[#D5AF34]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
