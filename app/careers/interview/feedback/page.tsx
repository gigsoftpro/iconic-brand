import InterviewFeedbackForm from './InterviewFeedbackForm'
import Breadcrumb from '@/components/Breadcrumb'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'Site Feedback & Availability | Interview Prep | Careers | Iconic Brand Group',
  description: 'Share your site critique, availability, and salary expectations as part of Interview Prep.',
  keywords: ['careers', 'interview prep', 'feedback', 'iconic brand group'],
  canonical: '/careers/interview/feedback',
  openGraph: {
    title: 'Site Feedback & Availability | Interview Prep | Careers | Iconic Brand Group',
    description: 'Share your site critique and availability.',
    image: '/og-image.jpg',
    type: 'website',
  },
})

export default function InterviewFeedbackPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: 'Interview Prep', url: '/careers/interview' },
    { name: 'Feedback', url: '/careers/interview/feedback' },
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
              { name: 'Feedback', current: true },
            ]} />
          </div>
        </div>
        <InterviewFeedbackForm />
      </div>
    </>
  )
}
