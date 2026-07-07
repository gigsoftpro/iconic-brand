'use client';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D5AF34] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#5F9EA0] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#C19A2E] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AF34]/20 to-[#5F9EA0]/20 backdrop-blur-sm border border-[#D5AF34]/30 rounded-full px-6 py-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D5AF34] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D5AF34]"></span>
              </span>
              <span className="text-white font-semibold text-sm tracking-wide">
                PREMIUM BUSINESS SOLUTIONS
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-7xl lg:text-8xl font-black leading-[0.9] text-white">
              Elevate Your
              <br />
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#D5AF34] text-transparent bg-clip-text animate-gradient bg-[length:200%_auto]">
                  Brand
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50 2 100 2 150 10C200 2 250 2 298 10"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
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
            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
              Strategic consulting and innovative marketing solutions that
              transform businesses into industry leaders. We don't just build
              brands—
              <span className="text-[#D5AF34] font-semibold">
                {" "}
                we create legacies
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#services"
                className="group relative bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#D5AF34] bg-[length:200%_auto] text-black px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-[#D5AF34]/50 hover:shadow-[#D5AF34]/80 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 animate-gradient"
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
                className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-2">
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
              </a>
            </div>

            {/* Mini Stats */}
            {/* <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              {[
                { number: '500+', label: 'Clients', icon: '👥' },
                { number: '98%', label: 'Satisfaction', icon: '⭐' },
                { number: '20+', label: 'Years', icon: '🏆' }
              ].map((stat, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="text-sm text-gray-500 mb-1">{stat.icon}</div>
                  <div className="text-4xl font-black bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Right Visual - 3D Cards */}
          <div className="relative h-[700px] hidden lg:block">
            {/* Main Feature Card */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px]">
              <div className="relative w-full h-full group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D5AF34]/20 to-[#5F9EA0]/20 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl transform group-hover:rotate-y-12 transition-transform duration-700 p-8">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="w-20 h-20 bg-gradient-to-br from-[#D5AF34] to-[#FFD700] rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-10 h-10 text-black"
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
                      <h3 className="text-3xl font-black text-white mb-3">
                        Startup Specialists
                      </h3>
                      <p className="text-gray-400">
                        Accelerate your startup with data-driven strategies and proven methodologies
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[#D5AF34] font-bold">
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

            {/* Floating Card 1 */}
            <div className="absolute top-10 right-0 w-64 h-48 bg-gradient-to-br from-white/10 to-[#5F9EA0]/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl p-6 transform rotate-6 hover:rotate-3 transition-all duration-500 animate-float">
              <div className="w-12 h-12 bg-gradient-to-br from-[#5F9EA0] to-[#4A7D7F] rounded-xl mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              <h4 className="text-xl font-bold text-white mb-2">
                Proven Results
              </h4>
              <p className="text-sm text-gray-400">Track record of success</p>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute bottom-10 left-0 w-64 h-48 bg-gradient-to-br from-white/10 to-[#D5AF34]/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl p-6 transform -rotate-6 hover:-rotate-3 transition-all duration-500 animate-float animation-delay-2000">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D5AF34] to-[#C19A2E] rounded-xl mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              <h4 className="text-xl font-bold text-white mb-2">
                Attention To Detail
              </h4>
              <p className="text-sm text-gray-400">
                Excellence in every detail we deliver
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#D5AF34] rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-[#5F9EA0] rounded-full animate-ping animation-delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
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
    </section>
  );
}
