import CompanyFitSubmitForm from './CompanyFitSubmitForm'
import Breadcrumb from '@/components/Breadcrumb'
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'Submit Company Fit | Careers | Iconic Brand Group',
  description: 'Complete and submit Stage 2 of your Iconic Brand Group career application.',
  keywords: ['careers', 'company fit', 'submit', 'iconic brand group'],
  canonical: '/careers/company-fit/submit',
  openGraph: {
    title: 'Submit Company Fit | Careers | Iconic Brand Group',
    description: 'Complete and submit Stage 2 of your career application.',
    image: '/og-image.jpg',
    type: 'website',
  },
})

export default function CompanyFitSubmitPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: 'Company Fit', url: '/careers/company-fit' },
    { name: 'Submit', url: '/careers/company-fit/submit' },
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
              { name: 'Submit', current: true },
            ]} />
          </div>
        </div>
        <CompanyFitSubmitForm />
      </div>
    </>
  )
}
