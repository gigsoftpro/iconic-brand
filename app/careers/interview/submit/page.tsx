import InterviewSubmitForm from './InterviewSubmitForm'
import Breadcrumb from '@/components/Breadcrumb'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'Complete Application | Interview Prep | Careers | Iconic Brand Group',
  description: 'Final step — review and submit your complete Iconic Brand Group career application.',
  keywords: ['careers', 'interview prep', 'complete application', 'iconic brand group'],
  canonical: '/careers/interview/submit',
  openGraph: {
    title: 'Complete Application | Interview Prep | Careers | Iconic Brand Group',
    description: 'Review and submit your complete career application.',
    image: '/og-image.jpg',
    type: 'website',
  },
})

export default function InterviewSubmitPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: 'Interview Prep', url: '/careers/interview' },
    { name: 'Submit', url: '/careers/interview/submit' },
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
              { name: 'Interview Prep', href: '/careers/interview' },
              { name: 'Submit', current: true },
            ]} />
          </div>
        </div>
        <InterviewSubmitForm />
      </div>
    </>
  )
}
