'use client';

import Image from "next/image";
import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaClock, FaCheckCircle, FaRocket, FaUsers, FaChartLine, FaGlobe, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiArrowRight } from 'react-icons/hi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    annualRevenue: '',
    marketingBudget: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Fire API call with keepalive so it survives navigation
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        source: 'contact_page'
      }),
      keepalive: true,
    }).catch((err) => console.error('API submit error:', err));

    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      details: ['+1 (813) 263-6762'],
      gradient: 'from-[#D5AF34] to-[#C19A2E]'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['Grow@IconicBrandgroup.com'],
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Headquarters',
      details: ['Tampa, Florida USA'],
      gradient: 'from-[#D5AF34] via-[#FFD700] to-[#5F9EA0]'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9am-6pm EST', 'Sat-Sun: Closed'],
      gradient: 'from-[#5F9EA0] to-[#4A7D7F]'
    }
  ];

  const reasons = [
    {
      icon: FaRocket,
      title: 'Fast Response',
      desc: 'We respond to all inquiries within 24 hours'
    },
    {
      icon: FaUsers,
      title: 'Expert Team',
      desc: 'Connect with industry-leading professionals'
    },
    {
      icon: FaChartLine,
      title: 'Proven Results',
      desc: '200+ successful client partnerships'
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, link: 'https://www.facebook.com/IconicBrandGroup', color: 'hover:bg-[#1877F2]', label: 'Facebook' },
    { icon: FaInstagram, link: 'https://www.instagram.com/iconicbrandgroup/', color: 'hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]', label: 'Instagram' },
    { icon: FaLinkedin, link: 'https://www.linkedin.com/company/iconic-brand-group/', color: 'hover:bg-[#0077B5]', label: 'LinkedIn' },
    { icon: FaYoutube, link: 'https://www.youtube.com/@IconicBrandGroup', color: 'hover:bg-[#FF0000]', label: 'YouTube' },
    { icon: FaXTwitter, link: 'https://x.com/groupbrand25036', color: 'hover:bg-black', label: 'X' },
    { icon: FaTiktok, link: 'http://www.tiktok.com/@iconicbrandgroup', color: 'hover:bg-black', label: 'TikTok' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-[7.25rem]">
        <div className="absolute inset-0">
          <Image
            src="/general/pexels-silverkblack-22046227.jpg"
            fill
            className="object-cover"
            alt="Contact Us"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/85"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
            <span className="text-[#D5AF34] font-bold text-sm tracking-wider uppercase">
              Let's Connect
            </span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-black mb-6 text-white leading-tight">
            Get in <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">Touch</span>
          </h1>

          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Ready to transform your business? Let's start the conversation
          </p>
        </div>
      </section>

      {/* Why Partner With Us + Form Section - Moved to top */}
      <section className="py-24 px-6 bg-gradient-to-b from-white via-[#FFF9E6] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Why Contact Us */}
            <div>
              <h2 className="text-5xl font-black mb-6">
                Why <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">Partner</span> With Us?
              </h2>

              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                We're not just service providers—we're strategic partners invested in your success. Here's what you can expect when you reach out:
              </p>

              <div className="space-y-8 mb-12">
                {reasons.map((reason, i) => {
                  const Icon = reason.icon;
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#D5AF34] to-[#5F9EA0] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{reason.title}</h3>
                        <p className="text-gray-600 text-lg">{reason.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, i) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={i}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center ${social.color} text-gray-700 hover:text-white transition-all duration-300 hover:scale-110`}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-10 shadow-2xl">
              <h3 className="text-3xl font-black mb-2">Send Us a Message</h3>
              <p className="text-gray-600 mb-8">Fill out the form and we'll get back to you within 24 hours</p>

              {submitted && (
                <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 mb-8 flex items-center gap-4">
                  <FaCheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-green-900 mb-1">Message Sent!</h4>
                    <p className="text-green-700">We'll be in touch soon.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none transition-colors"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none transition-colors"
                      placeholder="+1 (813) 263-6762"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Service Interested In *
                  </label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="consulting">Consulting Services</option>
                    <option value="marketing">Marketing Services</option>
                    <option value="both">Both Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Annual Revenue
                    </label>
                    <select
                      name="annualRevenue"
                      value={formData.annualRevenue}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none transition-colors"
                    >
                      <option value="">Select revenue range</option>
                      <option value="<100k">Less than $100,000</option>
                      <option value="100k-500k">$100,000 - $500,000</option>
                      <option value="500k-1m">$500,000 - $1M</option>
                      <option value="1m-5m">$1M - $5M</option>
                      <option value="5m-10m">$5M - $10M</option>
                      <option value="10m+">$10M+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Current Marketing Budget
                    </label>
                    <select
                      name="marketingBudget"
                      value={formData.marketingBudget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="<5k">Less than $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k+">$100,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project and goals..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Send Message
                  <HiArrowRight className="w-6 h-6" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Contact <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">Information</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach our team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-[#D5AF34] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-black mb-4 text-gray-900">
                    {info.title}
                  </h3>

                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 mb-1">
                      {detail}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Reach Section - Replaced Our Offices */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                Global
              </span>{" "}
              Reach, Local Expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Offices and partners across the world to serve you better
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                city: "Tampa",
                country: "USA",
                desc: "Global Headquarters",
              },
              {
                city: "London",
                country: "UK",
                desc: "European Operations",
              },
              {
                city: "Shenzhen",
                country: "China",
                desc: "Asia-Pacific Hub",
              },
            ].map((office, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <FaGlobe className="w-12 h-12 text-[#D5AF34] mb-4" />
                <h3 className="text-3xl font-black mb-2">{office.city}</h3>
                <p className="text-gray-400 mb-2">{office.country}</p>
                <p className="text-sm text-gray-500">{office.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#D5AF34] to-[#5F9EA0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Prefer to Talk Directly?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Schedule a free 30-minute consultation with our team
          </p>
          <a
            href="tel:+18132636762"
            className="inline-flex items-center gap-3 bg-white text-[#D5AF34] px-12 py-6 rounded-full font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <FaPhone className="w-6 h-6" />
            Call Us Now
          </a>
        </div>
      </section>
    </>
  );
}
