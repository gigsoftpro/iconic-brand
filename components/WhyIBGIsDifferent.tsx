import type { ReactNode } from 'react';
import Link from 'next/link';

type WhyIBGFeature = {
  title: string;
  description: string;
  icon?: ReactNode;
};

type WhyIBGCopy = {
  differentLabel?: string;
  differentHeadingLead?: string;
  differentHeadingHighlight?: string;
  differentIntro?: string;
  valueLabel?: string;
  valueHeadingLead?: string;
  valueHeadingHighlight?: string;
  valueIntro?: string;
  valueClosing?: string;
};

type WhyIBGIsDifferentProps = {
  differentiators?: WhyIBGFeature[];
  valuePillars?: WhyIBGFeature[];
  copy?: WhyIBGCopy;
};

export default function WhyIBGIsDifferent({
  differentiators: differentiatorsProp,
  valuePillars: valuePillarsProp,
  copy: copyProp,
}: WhyIBGIsDifferentProps = {}) {
  // Section labels, headings, intros, and the closing line default to the
  // original hardcoded copy; a compound-key page (e.g. Birmingham services)
  // passes unique per-service copy via `copy`.
  const copy = copyProp ?? {};
  const differentLabel = copy.differentLabel ?? 'Our Difference';
  const differentHeadingLead = copy.differentHeadingLead ?? 'Why Iconic Brand Group';
  const differentHeadingHighlight = copy.differentHeadingHighlight ?? 'Is Different';
  const differentIntro =
    copy.differentIntro ??
    'Iconic Brand Group is more than a marketing agency. We are a business consulting firm first, with specialized full-service marketing capabilities built to support real business growth.';
  const valueLabel = copy.valueLabel ?? 'Our Value';
  const valueHeadingLead = copy.valueHeadingLead ?? 'How Iconic Brand Group';
  const valueHeadingHighlight = copy.valueHeadingHighlight ?? 'Provides Value';
  const valueIntro =
    copy.valueIntro ??
    'We help clients grow smarter and faster by delivering value in four core areas: money, time, risk, and status.';
  const valueClosing =
    copy.valueClosing ??
    'We don’t just provide mentoring. We leverage our network and experience to build stronger, smarter, more valuable businesses.';
  const defaultDifferentiators: WhyIBGFeature[] = [
    {
      title: "Operators First",
      description:
        "We have started, built, scaled, and sold businesses ourselves. Our advice comes from real-world experience, not theory.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Business First Mindset",
      description:
        "Every recommendation is made with the protection, strength, and long-term growth of the business in mind — not just marketing activity.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: "Specialized Leadership",
      description:
        "Our leadership team and strategic advisors bring deep operational, growth, and fundraising experience across multiple industries.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Network Advantage",
      description:
        "We offer access to a powerful network of operators, advisors, investors, and strategic relationships that most agencies cannot provide.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
    {
      title: "Boutique Partnership Model",
      description:
        "We focus on results, not client volume. We work shoulder to shoulder with our clients as a true strategic partner.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: "Data + Experience, Not Guesswork",
      description:
        "Our recommendations are grounded in real business wisdom, tested strategy, and informed decision-making.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  const defaultValuePillars: WhyIBGFeature[] = [
    {
      title: "Money",
      description:
        "We help businesses save money by reducing waste, avoiding poor decisions, and implementing strategic marketing and growth systems that drive revenue. We also help create opportunities through our advisory and investor networks.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Time",
      description:
        "We save clients time by leveraging our experience, leadership, and network so they can make faster, smarter decisions and avoid unnecessary trial and error.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Risk",
      description:
        "We help mitigate risk by providing strategic guidance, experienced oversight, and access to advisory support that helps clients avoid costly mistakes.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Status",
      description:
        "We elevate our clients' credibility through our leadership team, strategic advisory network, and strong positioning — which can help in fundraising, partnerships, negotiations, and brand perception.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
  ];

  const differentiators = (differentiatorsProp ?? defaultDifferentiators).map((item, index) => ({
    ...item,
    icon: item.icon ?? defaultDifferentiators[index % defaultDifferentiators.length]?.icon,
  }));

  const valuePillars = (valuePillarsProp ?? defaultValuePillars).map((pillar, index) => ({
    ...pillar,
    icon: pillar.icon ?? defaultValuePillars[index % defaultValuePillars.length]?.icon,
  }));

  return (
    <>
      {/* Row 1 — Why We're Different */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.025]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#D5AF34_1px,transparent_1px),linear-gradient(to_bottom,#D5AF34_1px,transparent_1px)] bg-size-[5rem_5rem]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Label */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-[#D5AF34]/10 to-[#C19A2E]/10 border border-[#D5AF34]/25 rounded-full px-6 py-3 mb-6">
              <svg className="w-4 h-4 text-[#D5AF34]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span className="text-[#C19A2E] font-bold text-sm tracking-widest uppercase">
                {differentLabel}
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-5 leading-tight text-black">
              {differentHeadingLead}{" "}
              <span className="bg-linear-to-r from-[#D5AF34] via-[#C19A2E] to-[#5F9EA0] text-transparent bg-clip-text">
                {differentHeadingHighlight}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {differentIntro}
            </p>
          </div>

          {/* Differentiator Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white border border-gray-100 hover:border-[#D5AF34]/40 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-400"
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-[#D5AF34] to-[#5F9EA0] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-[#D5AF34]/10 to-[#5F9EA0]/10 flex items-center justify-center text-[#D5AF34] group-hover:from-[#D5AF34]/20 group-hover:to-[#5F9EA0]/20 transition-all duration-400">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#C19A2E] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Row 2 — How We Provide Value */}
      <section className="py-24 px-6 bg-black relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D5AF34]/8 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5F9EA0]/8 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Label */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-6 py-3 mb-6">
              <svg className="w-4 h-4 text-[#D5AF34]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="bg-linear-to-r from-[#D5AF34] to-[#C19A2E] text-transparent bg-clip-text font-bold text-sm tracking-widest uppercase">
                {valueLabel}
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-5 leading-tight text-white">
              {valueHeadingLead}{" "}
              <span className="bg-linear-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">
                {valueHeadingHighlight}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {valueIntro}
            </p>
          </div>

          {/* Value Pillar Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {valuePillars.map((pillar, index) => (
              <div
                key={index}
                className="group relative bg-white/3 backdrop-blur-sm border border-white/8 hover:border-[#D5AF34]/30 rounded-2xl p-8 transition-all duration-400 hover:bg-white/6"
              >
                {/* Hover top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-[#D5AF34] to-[#5F9EA0] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#D5AF34]/15 to-[#5F9EA0]/15 flex items-center justify-center text-[#D5AF34] mb-5 group-hover:from-[#D5AF34]/25 group-hover:to-[#5F9EA0]/25 transition-all duration-400">
                  {pillar.icon}
                </div>

                {/* Label pill */}
                <div className="inline-block bg-linear-to-r from-[#D5AF34] to-[#C19A2E] text-black text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                  {pillar.title}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {pillar.description}
                </p>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-linear-to-tl from-[#D5AF34]/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>

          {/* Closing Statement + CTA */}
          <div className="text-center border-t border-white/8 pt-14">
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed italic">
              &ldquo;{valueClosing}&rdquo;
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-linear-to-r from-[#D5AF34] to-[#C19A2E] text-black font-bold px-10 py-4 rounded-full text-sm tracking-wide uppercase hover:shadow-[0_0_30px_rgba(213,175,52,0.35)] hover:scale-[1.02] transition-all duration-300"
            >
              Partner With Iconic Brand Group
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
