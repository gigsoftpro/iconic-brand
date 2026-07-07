'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa'

const REFERRAL_OPTIONS = [
  'LinkedIn',
  'Indeed',
  'Google Search',
  'Friend / Colleague',
  'Social Media',
  'Other',
]

export default function ApplySubmitForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [referral_source, setReferralSource] = useState('')
  const [basicInfo, setBasicInfo] = useState<{ full_name: string; email: string; phone: string } | null>(null)
  const [detailsInfo, setDetailsInfo] = useState<{ location: string; role_interest: string; linkedin_url: string } | null>(null)

  useEffect(() => {
    const s1 = sessionStorage.getItem('careers_stage1')
    const s2 = sessionStorage.getItem('careers_stage1_details')
    if (!s1 || !s2) {
      window.location.href = '/careers'
      return
    }
    setBasicInfo(JSON.parse(s1))
    setDetailsInfo(JSON.parse(s2))
  }, [])

  const handleSubmit = async () => {
    if (!basicInfo || !detailsInfo || !referral_source || loading) return
    setLoading(true)
    try {
      const payload = {
        ...basicInfo,
        ...detailsInfo,
        referral_source,
      }

      await fetch('/api/careers/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: basicInfo.email,
          name: basicInfo.full_name,
          phone: basicInfo.phone,
          location: detailsInfo.location,
          role_interest: detailsInfo.role_interest,
          linkedin_url: detailsInfo.linkedin_url,
          referral_source,
          stage: 1,
          data: payload,
        }),
      })

      fetch('/api/engagement/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: basicInfo.email, name: basicInfo.full_name, stage: 1 }),
        keepalive: true,
      }).catch(() => {})

      fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, source: 'careers_funnel_stage1' }),
        keepalive: true,
      }).catch(() => {})

      // Clear stage 1 sessionStorage
      sessionStorage.removeItem('careers_stage1')
      sessionStorage.removeItem('careers_stage1_details')

      setSubmitted(true)
    } catch (err) {
      console.error('Stage 1 submission failed:', err)
    }
    setLoading(false)
  }

  if (submitted && basicInfo) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-green-50 border-2 border-green-500 rounded-3xl p-12 text-center">
            <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-green-900 mb-4">Stage 1 Complete!</h2>
            <p className="text-xl text-green-700 mb-4">
              Application submitted. Check your email for Stage 2 instructions.
            </p>
            <p className="text-gray-600 mb-4">
              Stage 2 is <strong>Company Fit</strong> — you&apos;ll need to research Iconic Brand Group and answer questions about our services and industries.
            </p>
            <div className="bg-white border-2 border-[#D5AF34]/30 rounded-2xl px-8 py-6 inline-block">
              <p className="text-lg font-bold text-gray-800 mb-1">📧 Check Your Email</p>
              <p className="text-gray-500 text-sm">We&apos;ll send your Stage 2 invitation shortly.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!basicInfo || !detailsInfo) return null

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 shadow-xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#D5AF34]/10 rounded-full px-4 py-2 mb-4">
              <span className="text-[#D5AF34] font-bold text-sm">Stage 1 of 4 — Step 3 of 3</span>
            </div>
            <h2 className="text-3xl font-black mb-2">Review &amp; Submit</h2>
            <p className="text-gray-600 text-lg">Confirm your details and tell us how you found us.</p>
          </div>

          {/* Review summary */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 space-y-3">
            <h3 className="font-bold text-lg mb-4">Your Application</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 block">Name</span>
                <span className="font-bold">{basicInfo.full_name}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Email</span>
                <span className="font-bold">{basicInfo.email}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Phone</span>
                <span className="font-bold">{basicInfo.phone}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Location</span>
                <span className="font-bold">{detailsInfo.location}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Role Interest</span>
                <span className="font-bold">{detailsInfo.role_interest}</span>
              </div>
              <div>
                <span className="text-gray-500 block">LinkedIn</span>
                <span className="font-bold text-[#D5AF34] break-all">{detailsInfo.linkedin_url}</span>
              </div>
            </div>
          </div>

          {/* Referral source */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-2">How did you hear about us? *</label>
            <select
              value={referral_source}
              onChange={(e) => setReferralSource(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none"
            >
              <option value="">Select...</option>
              {REFERRAL_OPTIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center">
            <Link href="/careers/apply/details" className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900">
              <FaArrowLeft /> Back
            </Link>
            <button
              disabled={!referral_source || loading}
              onClick={handleSubmit}
              className="inline-flex items-center gap-3 bg-linear-to-r from-[#D5AF34] to-[#5F9EA0] text-white px-10 py-4 rounded-full font-bold text-lg disabled:opacity-40 hover:shadow-xl transition-all"
            >
              {loading ? 'Submitting...' : 'Submit Application'} <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
