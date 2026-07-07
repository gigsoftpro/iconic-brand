'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  FaCheckCircle, FaArrowRight, FaArrowLeft,
  FaBriefcase, FaPalette, FaBullhorn, FaGlobe, FaCogs, FaUsers,
} from 'react-icons/fa'

const SERVICE_OPTIONS = [
  { label: 'Business & Go-To-Market Consulting', icon: FaBriefcase },
  { label: 'Branding & Creative Direction', icon: FaPalette },
  { label: 'Digital Marketing & Paid Media', icon: FaBullhorn },
  { label: 'Web, Funnel & Conversion Strategy', icon: FaGlobe },
  { label: 'Systems, Operations & Scale-Up', icon: FaCogs },
  { label: 'Restaurant Management Services', icon: FaUsers },
]

const INDUSTRY_OPTIONS = [
  { slug: 'tech', label: 'Tech & Software' },
  { slug: 'healthcare', label: 'Healthcare & MedTech' },
  { slug: 'finance', label: 'Finance & FinTech' },
  { slug: 'ecommerce', label: 'E-Commerce & DTC' },
  { slug: 'real-estate', label: 'Real Estate' },
  { slug: 'manufacturing', label: 'Manufacturing & Industrial' },
  { slug: 'hospitality', label: 'Hospitality & Travel' },
  { slug: 'fitness-wellness', label: 'Fitness & Wellness' },
  { slug: 'energy', label: 'Energy & Sustainability' },
]

export default function CompanyFitServicesForm() {
  const [ready, setReady] = useState(false)
  const [services_selected, setServices] = useState<string[]>([])
  const [industries_selected, setIndustries] = useState<string[]>([])

  useEffect(() => {
    const saved = sessionStorage.getItem('careers_stage2')
    if (!saved) {
      window.location.href = '/careers/company-fit'
      return
    }
    setReady(true)
  }, [])

  const isValid = services_selected.length >= 2 && industries_selected.length >= 1

  const toggleService = (label: string) => {
    setServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    )
  }

  const toggleIndustry = (slug: string) => {
    setIndustries((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  const handleContinue = () => {
    if (!isValid) return
    sessionStorage.setItem('careers_stage2_services', JSON.stringify({ services_selected, industries_selected }))
    window.location.href = '/careers/company-fit/submit'
  }

  if (!ready) return null

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 shadow-xl space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#D5AF34]/10 rounded-full px-4 py-2 mb-4">
              <span className="text-[#D5AF34] font-bold text-sm">Stage 2 of 4 — Step 2 of 3</span>
            </div>
            <h2 className="text-3xl font-black mb-2">Services &amp; Industries</h2>
            <p className="text-gray-600 text-lg">Select the areas you&apos;d contribute to.</p>
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Select services you&apos;d contribute to (min 2) *
            </label>
            <p className="text-xs text-gray-500 mb-4">
              Explore <Link href="/services/consulting" target="_blank" className="text-[#D5AF34] underline">Consulting</Link> and{' '}
              <Link href="/services/marketing" target="_blank" className="text-[#D5AF34] underline">Marketing</Link> to understand each.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {SERVICE_OPTIONS.map((svc) => {
                const Icon = svc.icon
                const selected = services_selected.includes(svc.label)
                return (
                  <button
                    key={svc.label}
                    type="button"
                    onClick={() => toggleService(svc.label)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      selected ? 'border-[#D5AF34] bg-[#FFF9E6] shadow-md' : 'border-gray-200 hover:border-[#D5AF34]/50'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${selected ? 'text-[#D5AF34]' : 'text-gray-400'}`} />
                    <span className="font-bold text-sm block">{svc.label}</span>
                  </button>
                )
              })}
            </div>
            <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
              <FaCheckCircle className={services_selected.length >= 2 ? 'text-green-500' : 'text-gray-300'} />
              {services_selected.length}/2 minimum selected
            </div>
          </div>

          {/* Industries */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Select industries you have experience in (min 1) *
            </label>
            <p className="text-xs text-gray-500 mb-4">
              Browse our <Link href="/industries" target="_blank" className="text-[#D5AF34] underline">Industries</Link> page.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {INDUSTRY_OPTIONS.map((ind) => {
                const selected = industries_selected.includes(ind.slug)
                return (
                  <button
                    key={ind.slug}
                    type="button"
                    onClick={() => toggleIndustry(ind.slug)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      selected ? 'border-[#D5AF34] bg-[#FFF9E6] shadow-md' : 'border-gray-200 hover:border-[#D5AF34]/50'
                    }`}
                  >
                    <span className="font-bold text-sm">{ind.label}</span>
                    <Link
                      href={`/industries/${ind.slug}`}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="block text-xs text-[#D5AF34] underline mt-1"
                    >
                      Learn more →
                    </Link>
                  </button>
                )
              })}
            </div>
            <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
              <FaCheckCircle className={industries_selected.length >= 1 ? 'text-green-500' : 'text-gray-300'} />
              {industries_selected.length}/1 minimum selected
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Link href="/careers/company-fit" className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900">
              <FaArrowLeft /> Back
            </Link>
            <button
              disabled={!isValid}
              onClick={handleContinue}
              className="inline-flex items-center gap-3 bg-linear-to-r from-[#D5AF34] to-[#5F9EA0] text-white px-10 py-4 rounded-full font-bold text-lg disabled:opacity-40 hover:shadow-xl transition-all"
            >
              Continue <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
