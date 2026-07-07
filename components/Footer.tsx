import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const services = [
    { name: "All Services", href: "/services" },
    { name: "Business Consulting", href: "/services/consulting" },
    { name: "Digital Marketing", href: "/services/marketing" },
    { name: "View Locations", href: "/locations" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Industries", href: "/industries" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
  ];

  const locations = [
    { name: "San Francisco, CA", href: "/startup-consulting-services/san-francisco-ca" },
    { name: "New York, NY", href: "/startup-consulting-services/new-york-ny" },
    { name: "Austin, TX", href: "/startup-consulting-services/austin-tx" },
    { name: "Los Angeles, CA", href: "/startup-consulting-services/los-angeles-ca" },
    { name: "All Locations", href: "/locations" },
  ];

  const social = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/IconicBrandGroup",
      icon: FaFacebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/iconicbrandgroup/",
      icon: FaInstagram,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/iconic-brand-group/",
      icon: FaLinkedin,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@IconicBrandGroup",
      icon: FaYoutube,
    },
    {
      name: "X",
      href: "https://x.com/groupbrand25036",
      icon: FaXTwitter,
    },
    {
      name: "TikTok",
      href: "http://www.tiktok.com/@iconicbrandgroup",
      icon: FaTiktok,
    },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/general/2149631018.jpg"
          fill
          className="object-cover opacity-10"
          alt="Footer Background"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/95 to-black"></div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D5AF34]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5F9EA0]/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Image
              src="/brand/full-logo-white.png"
              alt="Iconic Brand Group"
              width={180}
              height={50}
              className="mb-6 brightness-0 invert"
            />
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              Elevating brands to iconic status through strategic excellence and
              innovative solutions. Serving clients worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <p className="text-gray-400 text-sm">
                <span className="text-[#D5AF34]">Phone:</span> +1 (813) 263-6762
              </p>
              <p className="text-gray-400 text-sm">
                <span className="text-[#D5AF34]">Email:</span> Grow@IconicBrandgroup.com
              </p>
              <p className="text-gray-400 text-sm">
                <span className="text-[#D5AF34]">HQ:</span> Tampa, Florida USA
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-bold text-white">Stay Updated</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#D5AF34] transition-colors"
                />
                <button className="bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-black px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-[#D5AF34]/50 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-[#D5AF34] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#D5AF34] group-hover:w-4 transition-all duration-300"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
              Top Locations
            </h4>
            <ul className="space-y-3">
              {locations.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-[#D5AF34] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#D5AF34] group-hover:w-4 transition-all duration-300"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-[#D5AF34] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#D5AF34] group-hover:w-4 transition-all duration-300"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              &copy; 2026 Iconic Brand Group. All rights reserved. Crafted with
              <span className="text-[#D5AF34]"> passion </span>
              for excellence.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 hover:bg-gradient-to-r hover:from-[#D5AF34] hover:to-[#5F9EA0] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                    aria-label={item.name}
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
