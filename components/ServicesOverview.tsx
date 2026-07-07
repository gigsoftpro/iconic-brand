import Image from "next/image";
import { HiChartBar, HiChartPie, HiArrowRight, HiBriefcase } from 'react-icons/hi';

export default function ServicesOverview() {
  const services = [
    {
      title: 'Consulting Services',
      description: 'Strategic guidance to optimize operations and drive sustainable growth',
      icon: HiChartBar,
      gradient: 'from-[#D5AF34] to-[#C19A2E]',
      accentColor: '#D5AF34',
      link: '/services/consulting',
      image: '/general/pexels-startup-stock-photos-7075.jpg',
      features: ['Strategic Planning', 'Operations', 'Financial Advisory', 'Risk Management']
    },
    {
      title: 'Marketing Services',
      description: 'Data-driven campaigns that amplify your brand and engage your audience',
      icon: HiChartPie,
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]',
      accentColor: '#5F9EA0',
      link: '/services/marketing',
      image: '/general/Joshua Paul Hooks Denago EV copy000.jpg',
      features: ['Digital Marketing', 'Brand Strategy', 'Social Media', 'Content Creation']
    }
  ];

  return (
    <section id="services" className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(213,175,52,0.15),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(95,158,160,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_80%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      </div>

      {/* Diagonal Lines Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#D5AF34_1px,transparent_1px),linear-gradient(-45deg,#5F9EA0_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AF34]/10 to-[#C19A2E]/10 backdrop-blur-sm border border-[#D5AF34]/20 rounded-full px-6 py-3 mb-6">
            <HiBriefcase className="w-5 h-5 text-[#D5AF34]" />
            <span className="bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-transparent bg-clip-text font-bold text-sm tracking-wider uppercase">
              What We Offer
            </span>
          </div>
          <h2 className="text-7xl lg:text-8xl font-black mb-6 leading-[0.9] text-white">
            Our <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">Services</span>
          </h2>
          <p className="text-2xl text-gray-400 max-w-4xl leading-relaxed mx-auto">
            Comprehensive solutions designed to elevate your business to new heights
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
            <div 
              key={index}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
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
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                <Image 
                  src={service.image} 
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
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      <IconComponent className="w-10 h-10" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features - Horizontal Pills */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {service.features.map((feature, i) => (
                      <div 
                        key={i}
                        className="group/pill relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 px-5 py-3 transition-all duration-300 hover:-translate-y-1"
                        style={{
                          clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
                        }}
                      >
                        <span className="text-sm font-bold text-white">{feature}</span>
                        {/* Hover Accent */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover/pill:opacity-10 transition-opacity`}></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                  <a 
                    href={service.link}
                    className="group/btn relative inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-[#D5AF34]/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Button Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left rounded-full`}></div>
                    
                    <span className="relative z-10">Explore Services</span>
                    <HiArrowRight className="relative z-10 w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                  </a>

                  {/* Decorative Arrow */}
                  {/* <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                    <svg className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div> */}
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div className={`absolute ${index === 0 ? 'bottom-0 right-0' : 'top-0 left-0'} w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
