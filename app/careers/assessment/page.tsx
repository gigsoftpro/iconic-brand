import AssessmentForm from './AssessmentForm'
import Breadcrumb from '@/components/Breadcrumb'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'Stage 3: Skills Assessment | Careers | Iconic Brand Group',
  description: 'Demonstrate your skills with a real-world scenario, portfolio, and critical thinking assessment.',
  keywords: ['careers', 'skills assessment', 'iconic brand group', 'application stage 3'],
  canonical: '/careers/assessment',
  openGraph: {
    title: 'Stage 3: Skills Assessment | Careers | Iconic Brand Group',
    description: 'Show us what you can do with a real-world scenario assessment.',
    image: '/og-image.jpg',
    type: 'website',
  },
})

export default function AssessmentPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: 'Skills Assessment', url: '/careers/assessment' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-white pt-[7.25rem]">
        <div className="bg-gray-50 py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb items={[
              { name: 'Home', href: '/' },
              { name: 'Careers', href: '/careers' },
              { name: 'Skills Assessment', current: true },
            ]} />
          </div>
        </div>
        <AssessmentForm />
      </div>
    </>
  )
}
