import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaLaptopCode, FaHeartbeat, FaDollarSign, FaShoppingCart,
  FaHome, FaIndustry, FaHotel, FaDumbbell, FaBolt, FaBuilding,
  FaArrowRight
} from 'react-icons/fa';
import { industries } from '@/lib/industry-data';

export const metadata: Metadata = {
  title: 'Industries We Serve | Iconic Brand Group',
  description:
    'Iconic Brand Group provides consulting and marketing for tech, healthcare, fintech, eCommerce, real estate, manufacturing, hospitality, fitness, and energy companies.',
  keywords: [
    'startup consulting by industry',
    'marketing for tech startups',
    'consulting for healthcare companies',
    'fintech marketing agency',
    'ecommerce marketing agency',
    'real estate consulting',
    'manufacturing business consulting',
    'hospitality marketing',
    'fitness brand consulting',
    'green energy startup consulting',
    'Iconic Brand Group industries',
  ],
  alternates: { canonical: 'https://www.iconicbrandgroup.com/industries' },
  openGraph: {
    title: 'Industries We Serve | Iconic Brand Group',
    description:
      'Tailored consulting and marketing for startups and businesses across 9+ industries. Explore how Iconic Brand Group drives growth in your industry.',
    url: 'https://www.iconicbrandgroup.com/industries',
    type: 'website',
  },
};

const iconMap: Record<string, React.ElementType> = {
  tech: FaLaptopCode,
  healthcare: FaHeartbeat,
  finance: FaDollarSign,
  ecommerce: FaShoppingCart,
  'real-estate': FaHome,
  manufacturing: FaIndustry,
  hospitality: FaHotel,
  'fitness-wellness': FaDumbbell,
  energy: FaBolt,
};



const stats = [
  { value: '9+', label: 'Industries Served' },
  { value: '200+', label: 'Clients Worldwide' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '20+', label: 'Years Experience' },
];

export default function IndustriesPage() {
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/general/joshua-golf-cart-consult.png"
          fill
          className="object-cover object-center"
          alt="Joshua Paul Hooks consulting in the field"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#002244]/90 via-[#003366]/80 to-[#004488]/75" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center py-24">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <span className="text-blue-300 font-bold text-xs tracking-widest uppercase">Industries We Serve</span>
          </div>
          <h1 className="text-5xl font-black text-white md:text-6xl lg:text-7xl leading-tight mb-6">
            Your Industry,{' '}
            <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">
              Our Expertise
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-blue-100 md:text-xl leading-relaxed">
            Every industry has unique challenges and opportunities. Iconic Brand
            Group delivers tailored consulting and marketing strategies for
            startups and businesses across the sectors that matter most.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-[#002244] border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((s, i) => (
              <div key={i} className="py-8 px-6 text-center">
                <div className="text-3xl font-black text-[#D5AF34]">{s.value}</div>
                <div className="text-sm text-blue-200 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Grid */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D5AF34] mb-3">What We Cover</p>
            <h2 className="text-4xl font-black text-gray-900 md:text-5xl">
              Explore Our{' '}
              <span className="bg-gradient-to-r from-[#002244] to-[#5F9EA0] text-transparent bg-clip-text">
                Industries
              </span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => {
              const Icon = iconMap[ind.slug] ?? FaBuilding;
              return (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  {/* Top accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0]" />

                  <div className="p-8">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#002244] to-[#004488] flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-[#D5AF34]" />
                    </div>

                    <h2 className="text-xl font-black text-gray-900 mb-2 group-hover:text-[#002244] transition-colors">
                      {ind.name}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                      {ind.description}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#D5AF34] group-hover:gap-3 transition-all duration-200">
                      Explore <FaArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#002244] py-24">
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
          <Image
            src="/general/joshua-florist.png"
            fill
            className="object-cover object-center"
            alt="Joshua Paul Hooks consulting a florist"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002244] via-[#002244]/70 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D5AF34] mb-4">Work With Us</p>
            <h2 className="text-4xl font-black text-white md:text-5xl leading-tight mb-4">
              Don&apos;t See Your Industry?
            </h2>
            <p className="text-lg text-blue-100 leading-relaxed mb-8">
              We work with startups and businesses across dozens of industries.
              Schedule a free consultation and we&apos;ll build a strategy
              tailored to your market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D5AF34] px-8 py-4 text-sm font-bold text-[#002244] shadow-lg transition hover:bg-[#FFD700]"
              >
                Book a Free Consultation <FaArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Industries We Serve',
            description: metadata.description,
            url: 'https://www.iconicbrandgroup.com/industries',
            publisher: {
              '@type': 'Organization',
              name: 'Iconic Brand Group',
              url: 'https://www.iconicbrandgroup.com',
            },
            mainEntity: industries.map((ind) => ({
              '@type': 'WebPage',
              name: ind.name,
              url: `https://www.iconicbrandgroup.com/industries/${ind.slug}`,
              description: ind.description,
            })),
          }),
        }}
      />
    </main>
  );
}
