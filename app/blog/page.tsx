import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { blogPosts, getFeaturedPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Blog | Startup & Business Growth Insights | Iconic Brand Group',
  description: 'Expert insights on startup growth, marketing strategy, business consulting, and entrepreneurship. Actionable advice from 20+ years of experience helping 500+ businesses grow.',
  keywords: [
    'startup marketing tips',
    'how to grow a startup business',
    'business consulting advice',
    'startup growth strategy',
    'entrepreneur consulting tips',
    'marketing agency insights',
    'brand building for entrepreneurs',
    'Iconic Brand Group blog',
  ],
  alternates: { canonical: 'https://www.iconicbrandgroup.com/blog' },
  openGraph: {
    title: 'Blog | Startup & Business Growth Insights',
    description: 'Expert insights on startup growth, marketing strategy, and business consulting from the Iconic Brand Group team.',
    url: 'https://www.iconicbrandgroup.com/blog',
    type: 'website',
  },
};

const postImages: Record<string, string> = {
  'how-to-grow-a-startup-business': '/blog/Startup Consultant Joshua Paul Hooks copy.png',
  'startup-marketing-tips': '/blog/Joshua Paul Hooks Marketing Strategy copy.png',
  'how-to-find-a-business-consultant': '/blog/Small Business Consultant Joshua Paul Hooks copy.png',
  'what-does-a-startup-consulting-agency-do': '/blog/Business meeting in a modern office.png',
  'scaling-your-startup-from-idea-to-profit': '/blog/Joshua Paul Hooks Raise Capital copy.png',
  'brand-building-for-entrepreneurs': '/blog/Joshua Paul Hooks Mentor copy.png',
  'how-to-choose-a-marketing-agency': '/blog/Joshua Paul Hooks Marketing Strategy copy.png',
  'hire-a-startup-consulting-firm': '/blog/Board Of Advisors Joshua Paul Hooks copy.png',
  'book-a-business-consultation': '/blog/20260303_1209_Business Consultation Restaurant Scene_remix_01kjtas3dtftx8zn5008kpdytm copy.png',
};

const fallbackImages = [
  '/blog/Joshua Paul Hooks Golf Cart Consulting.png',
  '/blog/Florist Consultant Joshua Paul Hooks.png',
  '/blog/Restaraunt Consultant Joshua Paul Hooks copy.png',
  '/blog/JT Bakery copy.png',
  '/blog/JT Floral copy.png',
  '/blog/Joshua Paul Hooks China copy.png',
  '/blog/Joshua Paul Hooks BBQ copy.png',
  '/blog/20260303_1210_Image Generation_remix_01kjtarabtfm2rcqyzmdb5ektk copy.png',
  '/blog/20260303_1211_Image Generation_remix_01kjtav04vftxsxm4d6xhjswrc copy.png',
  '/blog/20260303_1212_Image Generation_remix_01kjtaw9jnf4tt3249xvcmh1bk copy.png',
];

function getPostImage(slug: string, index: number): string {
  return postImages[slug] ?? fallbackImages[index % fallbackImages.length];
}

export default function BlogPage() {
  const featured = getFeaturedPosts();
  const allPosts = blogPosts;
  // Use a dedicated hero asset so the image is always visible and consistent
  const heroImage = '/hero/Startup Consultant Joshua Paul Hooks copy.png';

  return (
    <>
      {/* Hero */}
      <section className="relative bg-black py-20 md:py-28 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Iconic Brand Group blog hero"
            fill
            priority
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-gray-900/80" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
            <span className="text-[#D5AF34] font-bold text-sm tracking-wider uppercase">Blog</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Insights for{' '}
            <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
              Growth
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Expert strategies on startup growth, marketing, and business consulting — backed by 20+ years of
            experience and 500+ successful engagements.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={getPostImage(post.slug, i)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={post.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-[#D5AF34]/10 text-[#D5AF34] text-xs font-semibold rounded-full uppercase">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.readTime} min read</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#D5AF34] transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">All Articles</h2>
          <div className="space-y-6">
            {allPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row gap-6 bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="md:w-40 flex-shrink-0">
                  <div className="relative h-28 md:h-full rounded-lg overflow-hidden">
                    <Image
                      src={getPostImage(post.slug, i)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={post.title}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-[#D5AF34]/10 text-[#D5AF34] text-xs font-semibold rounded-full uppercase">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.readTime} min read</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-400 text-sm">{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#D5AF34] transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            Want Personalized Growth Advice?
          </h2>
          <p className="text-black/80 mb-8 max-w-2xl mx-auto">
            Our blog shares general insights, but your business deserves a custom strategy. Schedule a free consultation to discuss your specific challenges and goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
          >
            Schedule Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
