import AssessmentSubmitForm from './AssessmentSubmitForm'
import Breadcrumb from '@/components/Breadcrumb'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'Submit Assessment | Skills Assessment | Careers | Iconic Brand Group',
  description: 'Complete and submit Stage 3 of your Iconic Brand Group career application.',
  keywords: ['careers', 'skills assessment', 'submit', 'iconic brand group'],
  canonical: '/careers/assessment/submit',
  openGraph: {
    title: 'Submit Assessment | Skills Assessment | Careers | Iconic Brand Group',
    description: 'Complete and submit Stage 3 of your career application.',
    image: '/og-image.jpg',
    type: 'website',
  },
})

export default function AssessmentSubmitPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: 'Assessment', url: '/careers/assessment' },
    { name: 'Submit', url: '/careers/assessment/submit' },
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
              { name: 'Submit', current: true },
            ]} />
          </div>
        </div>
        <AssessmentSubmitForm />
      </div>
    </>
  )
}
