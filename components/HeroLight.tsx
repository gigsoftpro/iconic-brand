"use client";

import React from "react";
import Link from "next/link";
import {
  HiArrowRight,
  HiLightningBolt,
  HiCheckCircle,
  HiGift,
  HiLightBulb,
  HiChevronDown,
} from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import {
  HiOutlineCog8Tooth,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

export default function HeroLight() {
  const videoSrc = "https://www.youtube.com/embed/Q-PWuHqt6PI?controls=1&mute=0&loop=1&playlist=Q-PWuHqt6PI&rel=0&playsinline=1";

  const services = [
    {
      icon: HiOutlineRocketLaunch,
      title: (
        <>
          Startup and <br />
          Business Consulting
        </>
      ),
      description: "Turn your vision into a scalable, successful business.",
      border: true,
    },
    {
      icon: HiOutlineCog8Tooth,
      title: (
        <>
          Business Process <br />
          Optimization
        </>
      ),
      description:
        "Streamline operations, reduce costs, and maximize efficiency.",
      border: true,
    },
    {
      icon: GoGoal,
      title: (
        <>
          Customer Acquisition <br />
          Specialists
        </>
      ),
      description:
        "Attract, convert, and retain your ideal customers with proven strategies.",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#FFF9E6] to-white px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:4rem_4rem] opacity-30" />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-10 sm:top-20 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-1/4 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-gradient-to-br from-[#D5AF34]/20 to-[#FFD700]/10 rounded-full blur-2xl sm:blur-3xl animate-blob pointer-events-none" />
      <div className="absolute top-40 right-5 lg:right-1/4 w-60 sm:w-[400px] h-60 sm:h-[400px] bg-gradient-to-br from-[#5F9EA0]/15 to-[#4A7D7F]/10 rounded-full blur-2xl sm:blur-3xl animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-10 sm:bottom-20 left-10 lg:left-1/3 w-64 sm:w-[450px] h-64 sm:h-[450px] bg-gradient-to-br from-[#E6D5B8]/30 to-[#D5AF34]/10 rounded-full blur-2xl sm:blur-3xl animate-blob animation-delay-4000 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full z-10">
        {/*
          Responsive Grid:
          - Mobile & Tablet (< lg): 1 column. Order: Header -> Video (below paragraph) -> CTA Buttons.
          - Desktop (>= lg): 2 columns. Left: Header + CTA Buttons. Right: Video.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-16 lg:gap-y-8 items-center">
          {/* Block 1: Header (Badge, Headline, Paragraph) */}
          <div className="space-y-6 text-center lg:text-left lg:col-start-1 lg:row-start-1">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AF34]/10 to-[#5F9EA0]/10 backdrop-blur-sm border border-[#D5AF34]/20 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-lg mx-auto lg:mx-0">
              <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D5AF34] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#D5AF34]" />
              </span>
              <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text font-bold text-xs sm:text-sm tracking-wide uppercase">
                Premium Business Solutions
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] sm:leading-[1] lg:leading-[0.9] text-black tracking-tight">
              Elevate Your{" "}
              <span className="relative inline-block mt-1 sm:mt-2">
                <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#C19A2E] text-transparent bg-clip-text animate-gradient bg-[length:200%_auto]">
                  Brand
                </span>
                <svg
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3"
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
              </span>{" "}
              <br className="hidden sm:inline" />
              to Iconic Status
            </h1>

            {/* Paragraph Text */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Strategic consulting and innovative marketing solutions that
              transform businesses into industry leaders. We don&apos;t just
              build brands—
              <span className="text-[#D5AF34] font-bold">
                {" "}
                we create legacies
              </span>
              .
            </p>
          </div>

          {/* Block 2: Video Player Container */}
          {/*
            On Mobile/Tablet: Displays right below paragraph (Block 1).
            On Desktop (lg+): Occupies the Right Column (col 2, span 2 rows).
          */}
          <div className="w-full aspect-video sm:h-[350px] md:h-[400px] lg:h-[480px] max-h-[550px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-black/5 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
            <iframe
              className="w-full h-full rounded-2xl object-cover"
              src={videoSrc}
              title="YouTube Video"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>

          <div className="w-full lg:col-span-2">
            <div className="flex flex-col md:flex-row items-start lg:items-start justify-center lg:justify-start">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className={`group flex flex-row items-center sm:items-start lg:items-center justify-center lg:justify-start gap-4 ${service.border ? `border-b lg:border-b-0 lg:border-r-[3px] border-gray-500/35 lg:border-[#F2B900] ${index != 0 ? 'py-4 lg:py-0 lg:px-5' : 'pb-4 lg:pb-0 lg:pr-5'}` : "pt-4 lg:pt-0 lg:pl-4"}`}
                  >
                    <div className="shrink-0 h-16 w-16 lg:w-10 lg:h-10 flex items-center justify-center rounded-full text-[#F2B900] bg-[radial-gradient(circle_at_center,#FFFDF8_0%,#FAF4E7_55%,#F4EAD5_100%)] shadow-[0_0_30px_rgba(213,175,52,0.08)] lg:bg-transparent lg:shadow-none group-hover:text-[#D5A900] group-hover:shadow-[0_0_40px_rgba(213,175,52,0.14)] lg:group-hover:shadow-none transition-all duration-300">
                      <Icon className="w-10 h-10" />
                    </div>

                    <div className="text-left">
                      <span className="text-black font-bold text-lg leading-tight block mb-1.5 ">
                        {service.title}
                      </span>

                      <p className="text-base text-gray-700 leading-relaxed max-w-xl mx-auto sm:mx-0 block md:hidden">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Block 3: CTA Buttons */}
          {/*
            On Mobile/Tablet: Displays below Video (Block 2).
            On Desktop (lg+): Displays below Paragraph in Left Column (col 1, row 2).
          */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 lg:col-start-1 lg:row-start-2">
            <a
              href="#services"
              className="group relative bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#D5AF34] bg-[length:200%_auto] text-black px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 rounded-full font-bold text-base sm:text-lg shadow-2xl shadow-[#D5AF34]/30 hover:shadow-[#D5AF34]/60 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 animate-gradient flex items-center justify-center gap-2"
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

            <Link
              href="/contact"
              className="group relative bg-white border-2 border-black text-black px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex items-center justify-center gap-2"
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
              <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-xs text-gray-500 font-medium">
          Scroll to explore
        </span>
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-[#D5AF34]"
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
    </section>
  );
}
