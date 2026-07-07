import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blog-data';

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found | Iconic Brand Group' };
  }

  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: `https://www.iconicbrandgroup.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.iconicbrandgroup.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Related posts (same category, different slug)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishDate,
    dateModified: post.updatedDate,
    author: {
      '@type': 'Organization',
      name: 'Iconic Brand Group',
      url: 'https://www.iconicbrandgroup.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Iconic Brand Group',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.iconicbrandgroup.com/brand/full-logo-coloured.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.iconicbrandgroup.com/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.iconicbrandgroup.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.iconicbrandgroup.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.iconicbrandgroup.com/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-[#D5AF34] transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-[#D5AF34] transition-colors">Blog</Link></li>
              <li>/</li>
              <li className="text-[#D5AF34] truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-[#D5AF34]/20 text-[#D5AF34] text-xs font-semibold rounded-full uppercase">
              {post.category}
            </span>
            <span className="text-gray-400 text-sm">{post.readTime} min read</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>By {post.author.name}</span>
            <span>•</span>
            <span>{post.author.role}</span>
            <span>•</span>
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="prose prose-lg max-w-none">
            {post.sections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {section.heading}
                </h2>
                {section.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Author Box (E-E-A-T) */}
          <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D5AF34] to-[#5F9EA0] rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                IBG
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{post.author.name}</h3>
                <p className="text-[#D5AF34] font-medium text-sm mb-2">{post.author.role}</p>
                <p className="text-gray-600 text-sm">
                  Iconic Brand Group is a strategic consulting and marketing firm with 20+ years of experience
                  helping startups, entrepreneurs, and growing businesses achieve measurable results. We&apos;ve
                  served over 500 clients and raised over $300 million in funding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Article CTA */}
      <section className="py-16 bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            {post.cta.headline}
          </h2>
          <p className="text-black/80 mb-8 max-w-2xl mx-auto">
            {post.cta.description}
          </p>
          <Link
            href={post.cta.buttonLink}
            className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
          >
            {post.cta.buttonText}
          </Link>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-[#D5AF34]/10 text-[#D5AF34] text-xs font-semibold rounded-full uppercase">
                    {related.category}
                  </span>
                  <span className="text-gray-400 text-xs">{related.readTime} min</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#D5AF34] transition-colors mb-2">
                  {related.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">{related.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="text-[#D5AF34] font-medium hover:underline">
              ← Back to All Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
