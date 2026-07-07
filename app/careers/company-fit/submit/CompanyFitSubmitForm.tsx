'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa'

export default function CompanyFitSubmitForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [what_makes_different, setWhatMakesDifferent] = useState('')
  const [industry_resonated, setIndustryResonated] = useState('')

  useEffect(() => {
    const s1 = sessionStorage.getItem('careers_stage2')
    const s2 = sessionStorage.getItem('careers_stage2_services')
    if (!s1 || !s2) {
      window.location.href = '/careers/company-fit'
      return
    }
    const parsed = JSON.parse(s1)
    setEmail(parsed.email)
  }, [])

  const isValid =
    what_makes_different.length >= 40 &&
    industry_resonated.length >= 30

  const handleSubmit = async () => {
    if (!isValid || loading) return
    setLoading(true)
    try {
      const s1 = JSON.parse(sessionStorage.getItem('careers_stage2') || '{}')
      const s2 = JSON.parse(sessionStorage.getItem('careers_stage2_services') || '{}')

      const fullData = {
        what_we_do: s1.what_we_do,
        ...s2,
        what_makes_different,
        industry_resonated,
      }

      await fetch('/api/careers/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: s1.email, stage: 2, data: fullData }),
      })

      fetch('/api/engagement/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: s1.email, name: '', stage: 2 }),
        keepalive: true,
      }).catch(() => {})

      sessionStorage.removeItem('careers_stage2')
      sessionStorage.removeItem('careers_stage2_services')

      setSubmitted(true)
    } catch (err) {
      console.error('Stage 2 submission failed:', err)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-green-50 border-2 border-green-500 rounded-3xl p-12 text-center">
            <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-green-900 mb-4">Stage 2 Complete!</h2>
            <p className="text-xl text-green-700 mb-4">
              You&apos;ve proven you know Iconic Brand Group. Check your email for Stage 3 details.
            </p>
            <p className="text-gray-600 mb-4">
              Stage 3 is the <strong>Skills Assessment</strong> — you&apos;ll work through a real scenario and share your portfolio.
            </p>
            <div className="bg-white border-2 border-[#D5AF34]/30 rounded-2xl px-8 py-6 inline-block">
              <p className="text-lg font-bold text-gray-800 mb-1">📧 Check Your Email</p>
              <p className="text-gray-500 text-sm">We&apos;ll send your Stage 3 invitation shortly.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 shadow-xl space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#D5AF34]/10 rounded-full px-4 py-2 mb-4">
              <span className="text-[#D5AF34] font-bold text-sm">Stage 2 of 4 — Step 3 of 3</span>
            </div>
            <h2 className="text-3xl font-black mb-2">Final Thoughts</h2>
            <p className="text-gray-600 text-lg">What makes us different — and what resonated with you?</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              What makes Iconic Brand Group different from other agencies? *
            </label>
            <p className="text-xs text-gray-500 mb-2">Minimum 40 characters.</p>
            <textarea
              rows={3}
              value={what_makes_different}
              onChange={(e) => setWhatMakesDifferent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none resize-none"
              placeholder="Based on what you've read, what sets IBG apart?"
            />
            <span className={`text-xs ${what_makes_different.length >= 40 ? 'text-green-600' : 'text-gray-400'}`}>
              {what_makes_different.length}/40 min
            </span>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Which industry page resonated with you most, and why? *
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Pick one from <Link href="/industries" target="_blank" className="text-[#D5AF34] underline">Industries</Link>. Minimum 30 characters.
            </p>
            <textarea
              rows={3}
              value={industry_resonated}
              onChange={(e) => setIndustryResonated(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none resize-none"
              placeholder="E.g., 'The restaurant industry page stood out because...'"
            />
            <span className={`text-xs ${industry_resonated.length >= 30 ? 'text-green-600' : 'text-gray-400'}`}>
              {industry_resonated.length}/30 min
            </span>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Link href="/careers/company-fit/services" className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900">
              <FaArrowLeft /> Back
            </Link>
            <button
              disabled={!isValid || loading}
              onClick={handleSubmit}
              className="inline-flex items-center gap-3 bg-linear-to-r from-[#D5AF34] to-[#5F9EA0] text-white px-10 py-4 rounded-full font-bold text-lg disabled:opacity-40 hover:shadow-xl transition-all"
            >
              {loading ? 'Submitting...' : 'Submit Stage 2'} <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
