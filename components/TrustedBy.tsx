import Image from "next/image";

export default function TrustedBy() {
  const logos = [
     {
      name: 'Boeing',
      src: '/logos/Boeing_full_logo.svg.png'
    },
    {
      name: 'Denago EV',
      src: '/logos/denago-ev-logo-white.webp'
    },
    {
      name: 'ReadyPool',
      src: '/logos/Blue Logo-ReadyPool copy.png'
    },
    {
      name: 'Sunburn Drink',
      src: '/logos/Logo Sunburn Drink TRANSPARENT.png'
    },
    {
      name: 'Station House BBQ',
      src: '/logos/Station-House-BBQ_HORIZONTAL-01-light-grey.png'
    },
    {
      name: 'SH Golf Carts',
      src: '/logos/SH GOLF CARTS.webp',
      scale: 1.4
    },
    {
      name: 'Charge Rigs',
      src: '/logos/logo-charge-rigs-white-CgBwa4ql.png'
    },
    {
      name: 'Evolution Electric Vehicle',
      src: '/logos/evolution_electric_vehicle_logo-300x208-1.png'
    },
    {
      name: 'Vudu',
      src: '/logos/Vudu-Green-with-White-Background.png'
    },
    {
      name: 'The Sterling',
      src: '/logos/The Sterling Horizontal  V2 copy.png',
      scale: 2.0
    },
    {
      name: 'Chargex',
      src: '/logos/Chargex_Aerospace_and_Defense_Logo1.avif'
    },
    {
      name: 'Hive Outdoor',
      src: '/logos/Hive_Outdoor_Logo.avif',
      scale: 2.5
    },
    {
      name: 'Harrington Foundation',
      src: '/logos/Harrington-Fopundation-Logo.webp'
    },
    {
      name: 'LINEX',
      src: '/logos/LINEX.avif'
    },
    {
      name: 'TARA',
      src: '/logos/TARA-WEB-LOGO.png'
    }
  ];

  const stats = [
    {
      value: '200+',
      label: 'Global Clients',
      description: 'Across 12 Countries'
    },
    {
      value: '20+',
      label: 'Industry Awards',
      description: 'Recognition & excellence'
    },
    {
      value: '75+',
      label: 'Startups Launched',
      description: 'Proven track record'
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-zinc-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/general/2149631018.jpg"
          fill
          className="object-cover opacity-20"
          alt="Trusted By Background"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/65 via-zinc-900/35 to-zinc-900/80"></div>
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#D5AF34_1px,transparent_1px),linear-gradient(to_bottom,#D5AF34_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AF34]/10 to-[#C19A2E]/10 backdrop-blur-sm border border-[#D5AF34]/20 rounded-full px-6 py-3 mb-6">
            <svg
              className="w-5 h-5 text-[#D5AF34]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-transparent bg-clip-text font-bold text-sm tracking-wider uppercase">
              Trusted Worldwide
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 leading-[0.95] lg:leading-[0.9] text-white">
            WE MAKE BRANDS{" "}
            <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">
              ICONIC
            </span>
          </h2>
          <p className="text-2xl text-gray-400 max-w-4xl leading-relaxed mx-auto">
            Join the world's leading brands who trust us to deliver exceptional
            results
          </p>
        </div>

        {/* Logo Carousel */}
        <div className="mb-20">
          <div className="relative overflow-hidden">
            <div
              className="flex w-max gap-6 py-2 animate-scroll pause-animation"
              style={{ animationDuration: "80s" }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="group relative w-[236px] shrink-0 bg-white/[0.10] backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-xl p-8 transition-all duration-500 hover:bg-white/[0.16]"
                >
                  <div
                    className="relative w-full h-20"
                    style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      fill
                      className="object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 [filter:brightness(1.2)_contrast(1.15)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="relative mb-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-black px-6">
              <div className="w-2 h-2 bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Stats - Professional Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/[0.02] backdrop-blur-sm border border-white/5 hover:border-[#D5AF34]/20 rounded-2xl p-8 transition-all duration-500 hover:bg-white/[0.04]"
            >
              {/* Subtle Top Border Accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D5AF34]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative">
                {/* Number */}
                <div className="text-5xl font-black text-white mb-2 group-hover:text-[#D5AF34] transition-colors">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-base font-semibold text-gray-300 mb-1">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>

              {/* Subtle Corner Accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#D5AF34]/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
