"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [consultingSubmenuOpen, setConsultingSubmenuOpen] = useState(false);
  const [marketingSubmenuOpen, setMarketingSubmenuOpen] = useState(false);
  const [mobileConsultingOpen, setMobileConsultingOpen] = useState(false);
  const [mobileMarketingOpen, setMobileMarketingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const consultingServices = [
    {
      href: "/services/consulting/business-strategy",
      label: "Business Strategy & Planning",
    },
    {
      href: "/services/consulting/operations-management",
      label: "Operations Management",
    },
    {
      href: "/services/consulting/financial-advisory",
      label: "Financial Advisory",
    },
    {
      href: "/services/consulting/change-management",
      label: "Change Management",
    },
    {
      href: "/services/consulting/risk-assessment",
      label: "Risk Assessment & Mitigation",
    },
    {
      href: "/services/consulting/performance-analytics",
      label: "Performance Analytics",
    },
    { href: "/services/consulting/market-analysis", label: "Market Analysis" },
    {
      href: "/services/consulting/organizational-development",
      label: "Organizational Development",
    },
  ];

  const marketingServices = [
    {
      href: "/services/marketing/brand-strategy",
      label: "Brand Strategy & Positioning",
    },
    {
      href: "/services/marketing/content-creation",
      label: "Content Creation & Production",
    },
    { href: "/services/marketing/paid-media", label: "Paid Media Management" },
    { href: "/services/marketing/email-crm", label: "Email + CRM Management" },
    {
      href: "/services/marketing/website-funnels",
      label: "Website + Funnel Systems",
    },
    { href: "/services/marketing/seo", label: "SEO + Awareness Growth" },
    {
      href: "/services/marketing/lead-generation",
      label: "Lead Generation & Revenue",
    },
    {
      href: "/services/marketing/ecommerce",
      label: "eCommerce Marketplace Growth",
    },
    { href: "/services/marketing/analytics", label: "Analytics + Reporting" },
  ];

  const navLinks = [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Industries",
      href: "/industries",
    },
    {
      label: "Media",
      href: "/blog",
    },
    // {
    //   label: "Locations",
    //   href: "/locations",
    // },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Careers",
      href: "/careers",
    },
  ];

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Top Bar */}
      <div className="bg-black text-white text-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-9">
          <div className="flex items-center gap-6">
            <a
              href="tel:+18133018706"
              className="hover:text-[#D5AF34] transition-colors duration-200 flex items-center gap-1.5"
            >
              <span>📞</span> (813) 263-6762
            </a>
            <a
              href="mailto:grow@iconicbrandgroup.com"
              className="hover:text-[#D5AF34] transition-colors duration-200 hidden sm:flex items-center gap-1.5"
            >
              <span>✉️</span> grow@iconicbrandgroup.com
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://iconicbrandgroup.com/support"
              className="hover:text-[#D5AF34] transition-colors duration-200 font-medium"
            >
              Support
            </a>
            <Link
              href="/contact"
              className="hover:text-[#D5AF34] transition-colors duration-200 font-medium hidden sm:block"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-2xl shadow-2xl border-b border-gray-200"
            : "bg-white/80 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href={"/"}>
              <div className="relative z-10">
                <Image
                  src="/brand/full-logo-coloured.png"
                  alt="Iconic Brand Group"
                  width={180}
                  height={50}
                  priority
                  className="transition-all duration-300 hover:scale-105"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => {
                  setServicesDropdownOpen(false);
                  setConsultingSubmenuOpen(false);
                  setMarketingSubmenuOpen(false);
                }}
              >
                <button className="relative px-5 py-2 text-gray-700 font-medium transition-all duration-300 hover:text-black group flex items-center gap-1">
                  Services
                  <HiChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${servicesDropdownOpen ? "rotate-180" : ""}`}
                  />
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] transition-all duration-300 group-hover:w-3/4"></span>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200 overflow-visible transition-all duration-300 ${
                    servicesDropdownOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  {/* Consulting Services with Submenu */}
                  <div
                    className="relative"
                    onMouseEnter={() => setConsultingSubmenuOpen(true)}
                    onMouseLeave={() => setConsultingSubmenuOpen(false)}
                  >
                    <Link
                      href="/services/consulting"
                      className="flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#5F9EA0]/10 hover:to-[#4A7D7F]/10 hover:text-black transition-all duration-300"
                    >
                      <span className="font-medium">Consulting Services</span>
                      <HiChevronRight className="w-4 h-4" />
                    </Link>
                    {/* Consulting Submenu */}
                    <div
                      className={`absolute left-full top-0 ml-2 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${consultingSubmenuOpen ? "opacity-100 translate-x-0 visible" : "opacity-0 -translate-x-2 invisible"}`}
                    >
                      {consultingServices.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="flex items-center px-6 py-3 text-gray-600 hover:bg-gradient-to-r hover:from-[#5F9EA0]/10 hover:to-[#4A7D7F]/10 hover:text-black transition-all duration-300 text-sm first:rounded-t-2xl last:rounded-b-2xl"
                        >
                          <span>{service.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Marketing Services with Submenu */}
                  <div
                    className="relative"
                    onMouseEnter={() => setMarketingSubmenuOpen(true)}
                    onMouseLeave={() => setMarketingSubmenuOpen(false)}
                  >
                    <Link
                      href="/services/marketing"
                      className="flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#D5AF34]/10 hover:to-[#C19A2E]/10 hover:text-black transition-all duration-300"
                    >
                      <span className="font-medium">Marketing Services</span>
                      <HiChevronRight className="w-4 h-4" />
                    </Link>
                    {/* Marketing Submenu */}
                    <div
                      className={`absolute left-full top-0 ml-2 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${marketingSubmenuOpen ? "opacity-100 translate-x-0 visible" : "opacity-0 -translate-x-2 invisible"}`}
                    >
                      {marketingServices.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="flex items-center px-6 py-3 text-gray-600 hover:bg-gradient-to-r hover:from-[#D5AF34]/10 hover:to-[#C19A2E]/10 hover:text-black transition-all duration-300 text-sm first:rounded-t-2xl last:rounded-b-2xl"
                        >
                          <span>{service.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-5 py-2 text-gray-700 font-medium transition-all duration-300 hover:text-black group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] transition-all duration-300 group-hover:w-3/4"></span>
                </Link>
              ))}

              <Link
                href="/contact"
                className="ml-4 bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#D5AF34] bg-[length:200%_auto] text-black px-8 py-3 rounded-full font-bold shadow-lg shadow-[#D5AF34]/30 hover:shadow-[#D5AF34]/60 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 animate-gradient"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 text-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"}`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"}`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 ${
            mobileMenuOpen
              ? "max-h-[80vh] opacity-100 overflow-y-auto"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-2xl border-t border-gray-200 px-6 py-8">
            {/* Services Section */}
            <div className="mb-4">
              <div className="text-gray-700 font-bold mb-2">Services</div>

              {/* Consulting Services Accordion */}
              <div className="mb-2">
                <button
                  onClick={() => setMobileConsultingOpen(!mobileConsultingOpen)}
                  className="flex items-center justify-between w-full py-3 pl-4 text-gray-600 hover:text-black transition-all duration-300"
                >
                  <span className="font-medium">Consulting Services</span>
                  <HiChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${mobileConsultingOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${mobileConsultingOpen ? "max-h-96" : "max-h-0"}`}
                >
                  <Link
                    href="/services/consulting"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 pl-8 text-sm text-[#5F9EA0] font-medium hover:text-black transition-all duration-300"
                  >
                    View All Consulting →
                  </Link>
                  {consultingServices.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 pl-8 text-sm text-gray-500 hover:text-black transition-all duration-300"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Marketing Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileMarketingOpen(!mobileMarketingOpen)}
                  className="flex items-center justify-between w-full py-3 pl-4 text-gray-600 hover:text-black transition-all duration-300"
                >
                  <span className="font-medium">Marketing Services</span>
                  <HiChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${mobileMarketingOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${mobileMarketingOpen ? "max-h-[500px]" : "max-h-0"}`}
                >
                  <Link
                    href="/services/marketing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 pl-8 text-sm text-[#D5AF34] font-medium hover:text-black transition-all duration-300"
                  >
                    View All Marketing →
                  </Link>
                  {marketingServices.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 pl-8 text-sm text-gray-500 hover:text-black transition-all duration-300"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-4 text-gray-700 font-medium hover:text-black hover:translate-x-2 transition-all duration-300"
            >
              About
            </Link>

            <Link
              href="/industries"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-4 text-gray-700 font-medium hover:text-black hover:translate-x-2 transition-all duration-300"
            >
              Industries
            </Link>

            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-4 text-gray-700 font-medium hover:text-black hover:translate-x-2 transition-all duration-300"
            >
              Blog
            </Link>

            {/* <Link
              href="/locations"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-4 text-gray-700 font-medium hover:text-black hover:translate-x-2 transition-all duration-300"
            >
              Locations
            </Link> */}

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-4 text-gray-700 font-medium hover:text-black hover:translate-x-2 transition-all duration-300"
            >
              Contact
            </Link>

            <Link
              href="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-4 text-gray-700 font-medium hover:text-black hover:translate-x-2 transition-all duration-300"
            >
              Careers
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-6 bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-black text-center px-8 py-4 rounded-full font-bold"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
