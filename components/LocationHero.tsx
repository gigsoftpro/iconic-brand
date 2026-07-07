'use client'

import { useState } from 'react'
import { trackLocationConversion, trackServiceInterest } from '@/lib/analytics'
import Breadcrumb from "@/components/Breadcrumb";

interface LocationHeroProps {
  city: string;
  state?: string;
  country: string;
  tier: "Tier 1" | "Tier 2" | "Tier 3";
  rationale: string;
  useVideo?: boolean;
  videoSrc?: string;
}

export default function LocationHero({
  city,
  state,
  country,
  tier,
  rationale,
  useVideo = false,
  videoSrc = "/videos/business-city-hero.mp4",
}: LocationHeroProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const locationString = state ? `${city}, ${state}` : city;
  const fullLocation =
    country !== "USA" ? `${locationString}, ${country}` : locationString;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track the conversion
      trackLocationConversion("contact_form", city, state, 100);

      // Track service interest
      if (formData.service) {
        trackServiceInterest(formData.service, city, state);
      }

      // Fire API call with keepalive so it survives navigation
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          city,
          state,
          source: 'location_hero',
        }),
        keepalive: true,
      }).catch((err) => console.error('API submit error:', err));

      setIsSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "Tier 1":
        return "from-[#D5AF34] to-[#FFD700]";
      case "Tier 2":
        return "from-[#5F9EA0] to-[#4A7D7F]";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getTierDescription = (tier: string) => {
    switch (tier) {
      case "Tier 1":
        return "Premier Market - Full Service Portfolio";
      case "Tier 2":
        return "Growth Market - Specialized Services";
      default:
        return "Emerging Market - Core Services";
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {useVideo ? (
        <>
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
              <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
            </video>
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-[#FFF9E6]/85 to-white/90"></div>
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Subtle Gradient Orbs for video */}
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#D5AF34]/10 to-[#FFD700]/5 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#5F9EA0]/8 to-[#4A7D7F]/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </>
      ) : (
        <>
          {/* Static Background */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-[#FFF9E6] to-white">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
          </div>

          {/* Full Gradient Orbs for static */}
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#D5AF34]/20 to-[#FFD700]/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#5F9EA0]/15 to-[#4A7D7F]/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-[450px] h-[450px] bg-gradient-to-br from-[#E6D5B8]/30 to-[#D5AF34]/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-6 py-32 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Locations", href: "/locations" },
                { name: `${city}${state ? `, ${state}` : ""}`, current: true },
              ]}
            />
            {/* Tier Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D5AF34]/10 to-[#5F9EA0]/10 backdrop-blur-sm border border-[#D5AF34]/20 rounded-full px-6 py-3 shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D5AF34] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D5AF34]"></span>
              </span>
              <span
                className={`bg-gradient-to-r ${getTierBadgeColor(
                  tier
                )} text-transparent bg-clip-text font-bold text-sm tracking-wide uppercase`}
              >
                {getTierDescription(tier)}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl lg:text-7xl font-black leading-[0.9] text-black">
              Transform Your{" "}
              <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#C19A2E] text-transparent bg-clip-text animate-gradient bg-[length:200%_auto]">
                {city}
              </span>{" "}
              Business
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-700 leading-relaxed max-w-xl">
              Strategic consulting and innovative marketing solutions designed
              specifically for {fullLocation} businesses. We help companies
              achieve sustainable growth and market leadership in the
              competitive {city} market.
            </p>

            {/* Key Points */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#D5AF34] to-[#FFD700] rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-lg text-gray-700 font-medium">
                  Local {city} market expertise
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#D5AF34] to-[#FFD700] rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-lg text-gray-700 font-medium">
                  Proven growth strategies
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#D5AF34] to-[#FFD700] rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-lg text-gray-700 font-medium">
                  Industry-leading results
                </span>
              </div>
            </div>

            {/* Market Insight */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-black mb-2">Why {city}?</h3>
              <p className="text-gray-600">{rationale}</p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="relative">
            {isSubmitted ? (
              <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-2xl p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We've received your message and will contact you within 24
                    hours to discuss your {city} business goals.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        service: "",
                        message: "",
                      });
                    }}
                    className="text-[#D5AF34] font-medium hover:underline"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-2xl p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    Get Your Free {city} Business Consultation
                  </h3>
                  <p className="text-gray-600">
                    Ready to accelerate your growth in {fullLocation}? Let's
                    create a winning strategy for your business.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D5AF34] focus:border-transparent transition-colors"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D5AF34] focus:border-transparent transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D5AF34] focus:border-transparent transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D5AF34] focus:border-transparent transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D5AF34] focus:border-transparent transition-colors"
                    >
                      <option value="">Select a service...</option>
                      <option value="business-consulting">
                        Business Consulting
                      </option>
                      <option value="digital-marketing">
                        Digital Marketing
                      </option>
                      <option value="brand-strategy">Brand Strategy</option>
                      <option value="strategic-planning">
                        Strategic Planning
                      </option>
                      <option value="operations-optimization">
                        Operations Optimization
                      </option>
                      <option value="growth-strategy">Growth Strategy</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tell us about your {city} business goals
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D5AF34] focus:border-transparent transition-colors resize-none"
                      placeholder={`Describe your ${city} business challenges and growth objectives...`}
                    />
                  </div>

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
                      <p className="text-sm">Something went wrong. Please try again.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        Get Free {city} Consultation
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
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our privacy policy.
                    We'll only use your information to contact you about your{" "}
                    {city} business consultation.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">
            Explore our {city} services
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
      