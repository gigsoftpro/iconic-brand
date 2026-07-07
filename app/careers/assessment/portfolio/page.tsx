import AssessmentPortfolioForm from './AssessmentPortfolioForm'
import Breadcrumb from '@/components/Breadcrumb'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'Portfolio & Blog Review | Skills Assessment | Careers | Iconic Brand Group',
  description: 'Share your portfolio and critique one of our blog posts as part of the Skills Assessment.',
  keywords: ['careers', 'skills assessment', 'portfolio', 'iconic brand group'],
  canonical: '/careers/assessment/portfolio',
  openGraph: {
    title: 'Portfolio & Blog Review | Skills Assessment | Careers | Iconic Brand Group',
    description: 'Share your portfolio and critique one of our blog posts.',
    image: '/og-image.jpg',
    type: 'website',
  },
})

export default function AssessmentPortfolioPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: 'Assessment', url: '/careers/assessment' },
    { name: 'Portfolio', url: '/careers/assessment/portfolio' },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen bg-white pt-[7.25rem]">
        <div className="bg-gray-50 py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb items={[
              { name: 'Home', href: '/' },
              { name: 'Careers', href: '/careers' },
              { name: 'Assessment', href: '/careers/assessment' },
              { name: 'Portfolio', current: true },
            ]} />
          </div>
        </div>
        <AssessmentPortfolioForm />
      </div>
    </>
  )
}
