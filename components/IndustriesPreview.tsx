import Link from "next/link";
import { industries } from "@/lib/industry-data";
import { HiArrowRight } from "react-icons/hi";

const industryIcons: Record<string, string> = {
  tech: "💻",
  healthcare: "🏥",
  finance: "💰",
  ecommerce: "🛒",
  "real-estate": "🏠",
  hospitality: "🏨",
  "fitness-wellness": "💪",
  energy: "⚡",
  education: "🎓",
};

export default function IndustriesPreview() {
  const featured = industries.slice(0, 6);

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white via-[#F0F9FA] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#5F9EA0]/10 rounded-full px-6 py-3 mb-6">
            <span className="text-[#5F9EA0] font-bold text-sm tracking-wider uppercase">
              Industry Expertise
            </span>
          </div>
          <h2 className="text-5xl font-black mb-6">
            Industries We{" "}
            <span className="bg-gradient-to-r from-[#5F9EA0] to-[#D5AF34] text-transparent bg-clip-text">
              Serve
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized consulting and marketing solutions tailored to your
            industry&apos;s unique challenges
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-[#5F9EA0] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">
                {industryIcons[industry.slug] || "🏢"}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[#5F9EA0] transition-colors">
                {industry.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {industry.description}
              </p>
              <span className="text-[#5F9EA0] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More <HiArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/industries"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#5F9EA0] to-[#4A7D7F] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            View All Industries
            <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
