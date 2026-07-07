import ApplySubmitForm from './ApplySubmitForm'
import Breadcrumb from '@/components/Breadcrumb'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'Submit Application | Careers | Iconic Brand Group',
  description: 'Review and submit your Stage 1 application to Iconic Brand Group.',
  keywords: ['careers', 'iconic brand group', 'application', 'submit'],
  canonical: '/careers/apply/submit',
  openGraph: {
    title: 'Submit Application | Careers | Iconic Brand Group',
    description: 'Review and submit your Stage 1 application to Iconic Brand Group.',
    image: '/og-image.jpg',
    type: 'website',
  },
})

export default function ApplySubmitPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: 'Submit Application', url: '/careers/apply/submit' },
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
              { name: 'Submit', current: true },
            ]} />
          </div>
        </div>
        <ApplySubmitForm />
      </div>
    </>
  )
}
