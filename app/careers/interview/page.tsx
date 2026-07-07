import InterviewForm from './InterviewForm'
import Breadcrumb from '@/components/Breadcrumb'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'Stage 4: Interview Prep | Careers | Iconic Brand Group',
  description: 'Final stage — record your introduction, share your site feedback, and confirm your availability.',
  keywords: ['careers', 'interview prep', 'iconic brand group', 'application stage 4'],
  canonical: '/careers/interview',
  openGraph: {
    title: 'Stage 4: Interview Prep | Careers | Iconic Brand Group',
    description: 'Complete the final stage of your Iconic Brand Group application.',
    image: '/og-image.jpg',
    type: 'website',
  },
})

export default function InterviewPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: 'Interview Prep', url: '/careers/interview' },
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
              { name: 'Interview Prep', current: true },
            ]} />
          </div>
        </div>
        <InterviewForm />
      </div>
    </>
  )
}
