import ApplyDetailsForm from './ApplyDetailsForm'
import Breadcrumb from '@/components/Breadcrumb'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'Application Details | Careers | Iconic Brand Group',
  description: 'Tell us about your location, role interest, and professional background.',
  keywords: ['careers', 'iconic brand group', 'application', 'jobs'],
  canonical: '/careers/apply/details',
  openGraph: {
    title: 'Application Details | Careers | Iconic Brand Group',
    description: 'Tell us about your location, role interest, and professional background.',
    image: '/og-image.jpg',
    type: 'website',
  },
})

export default function ApplyDetailsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: 'Details', url: '/careers/apply/details' },
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
              { name: 'Details', current: true },
            ]} />
          </div>
        </div>
        <ApplyDetailsForm />
      </div>
    </>
  )
}
