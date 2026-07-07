import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { HiArrowRight } from "react-icons/hi";

export default function BlogPreview() {
  const featured = blogPosts.filter((post) => post.featured).slice(0, 3);
  // If less than 3 featured, fill with latest
  const posts =
    featured.length >= 3
      ? featured
      : [...featured, ...blogPosts.filter((p) => !p.featured)].slice(0, 3);

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white via-[#FFF9E6] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#D5AF34]/10 rounded-full px-6 py-3 mb-6">
            <span className="text-[#D5AF34] font-bold text-sm tracking-wider uppercase">
              Insights & Resources
            </span>
          </div>
          <h2 className="text-5xl font-black mb-6">
            Latest from Our{" "}
            <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
              Blog
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, guides, and strategies to help grow your business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#D5AF34] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      post.category === "educational"
                        ? "bg-[#5F9EA0]/10 text-[#5F9EA0]"
                        : post.category === "transactional"
                        ? "bg-[#D5AF34]/10 text-[#D5AF34]"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {post.category === "educational"
                      ? "Guide"
                      : post.category === "transactional"
                      ? "Strategy"
                      : "Thought Leadership"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {post.readTime} min read
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-[#D5AF34] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>
                <span className="text-[#D5AF34] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Article <HiArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            View All Articles
            <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
