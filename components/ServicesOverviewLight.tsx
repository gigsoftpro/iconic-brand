import Image from "next/image";

export default function ServicesOverviewLight() {
  const services = [
    {
      title: 'Consulting Services',
      description: 'Strategic guidance to optimize operations and drive sustainable growth',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: 'from-[#D5AF34] to-[#C19A2E]',
      accentColor: '#D5AF34',
      link: '#consulting',
      features: ['Strategic Planning', 'Operations', 'Financial Advisory', 'Risk Management']
    },
    {
      title: 'Marketing Services',
      description: 'Data-driven campaigns that amplify your brand and engage your audience',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]',
      accentColor: '#5F9EA0',
      link: '#marketing',
      features: ['Digital Marketing', 'Brand Strategy', 'Social Media', 'Content Creation']
    }
  ];

  return (
    <section id="services-light" className="py-32 px-6 bg-gradient-to-b from-white via-[#FFF9E6] to-white relative overflow-hidden">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(213,175,52,0.08),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(95,158,160,0.08),transparent_50%)]"></div>
        <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_80%,rgba(255,215,0,0.05),transparent_50%)]"></div>
      </div>

      {/* Diagonal Lines Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#D5AF34_1px,transparent_1px),linear-gradient(-45deg,#5F9EA0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20"></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-[3px] bg-gradient-to-r from-[#D5AF34] to-transparent"></div>
            <span className="text-[#D5AF34] font-bold text-sm tracking-[0.3em] uppercase">
              What We Offer
            </span>
          </div>
          <h2 className="text-7xl lg:text-8xl font-black mb-6 leading-[0.9] text-black">
            Our <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">Services</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-2xl leading-relaxed">
            Comprehensive solutions designed to elevate your business to new heights
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              style={{
                clipPath: index === 0 ? 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)' : 'polygon(5% 0, 100% 0, 100% 100%, 0 100%, 0 5%)'
              }}
            >
              {/* Accent Border */}
              <div 
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient}`}
                style={{
                  clipPath: index === 0 ? 'polygon(0 0, 95% 0, 100% 100%, 0 100%)' : 'polygon(5% 0, 100% 0, 100% 100%, 0 100%)'
                }}
              ></div>

              {/* Background Image */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                <Image 
                  src="/general/Joshua Paul Hooks Denago EV copy000.jpg" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={service.title} 
                />
              </div>

              {/* Content */}
              <div className="relative z-10 p-12 lg:p-16 min-h-[600px] flex flex-col justify-between">
                <div>
                  {/* Number Badge */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className={`text-8xl font-black bg-gradient-to-r ${service.gradient} text-transparent bg-clip-text`}>
                      0{index + 1}
                    </div>
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      {service.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-5xl lg:text-6xl font-black mb-6 text-black leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features - Horizontal Pills */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {service.features.map((feature, i) => (
                      <div 
                        key={i}
                        className="group/pill relative bg-gray-50 border border-gray-200 hover:border-gray-300 hover:bg-white px-5 py-3 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
                        style={{
                          clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
                        }}
                      >
                        <span className="text-sm font-bold text-gray-800">{feature}</span>
                        {/* Hover Accent */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover/pill:opacity-5 transition-opacity`}></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                  <a 
                    href={service.link}
                    className="group/btn relative inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Button Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left rounded-full`}></div>
                    
                    <span className="relative z-10">Explore Services</span>
                    <svg className="relative z-10 w-6 h-6 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>

                  {/* Decorative Arrow */}
                  <div className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-gray-400 transition-colors">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div className={`absolute ${index === 0 ? 'bottom-0 right-0' : 'top-0 left-0'} w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
