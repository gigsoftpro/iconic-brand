import CompanyFitForm from './CompanyFitForm'
import Breadcrumb from '@/components/Breadcrumb'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'Stage 2: Company Fit | Careers | Iconic Brand Group',
  description: 'Show us you\'ve done your homework. Answer questions about Iconic Brand Group\'s services, industries, and culture.',
  keywords: ['careers', 'company fit', 'iconic brand group', 'application stage 2'],
  canonical: '/careers/company-fit',
  openGraph: {
    title: 'Stage 2: Company Fit | Careers | Iconic Brand Group',
    description: 'Show us you\'ve done your homework on Iconic Brand Group.',
    image: '/og-image.jpg',
    type: 'website',
  },
})

export default function CompanyFitPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: 'Company Fit', url: '/careers/company-fit' },
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
              { name: 'Company Fit', current: true },
            ]} />
          </div>
        </div>
        <CompanyFitForm />
      </div>
    </>
  )
}
