import CompanyFitServicesForm from './CompanyFitServicesForm'
import Breadcrumb from '@/components/Breadcrumb'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'Services & Industries | Company Fit | Careers | Iconic Brand Group',
  description: 'Select the services and industries you have experience with at Iconic Brand Group.',
  keywords: ['careers', 'company fit', 'services', 'industries', 'iconic brand group'],
  canonical: '/careers/company-fit/services',
  openGraph: {
    title: 'Services & Industries | Company Fit | Careers | Iconic Brand Group',
    description: 'Select the services and industries you have experience with.',
    image: '/og-image.jpg',
    type: 'website',
  },
})

export default function CompanyFitServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: 'Company Fit', url: '/careers/company-fit' },
    { name: 'Services', url: '/careers/company-fit/services' },
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
              { name: 'Company Fit', href: '/careers/company-fit' },
              { name: 'Services', current: true },
            ]} />
          </div>
        </div>
        <CompanyFitServicesForm />
      </div>
    </>
  )
}
