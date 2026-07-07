'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowLeft, FaStar } from 'react-icons/fa'

export default function InterviewSubmitForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [anything_else, setAnythingElse] = useState('')
  const [consent, setConsent] = useState(false)

  useEffect(() => {
    const s1 = sessionStorage.getItem('careers_stage4')
    const s2 = sessionStorage.getItem('careers_stage4_feedback')
    if (!s1 || !s2) {
      window.location.href = '/careers/interview'
      return
    }
    const parsed = JSON.parse(s1)
    setEmail(parsed.email)
  }, [])

  const handleSubmit = async () => {
    if (!consent || loading) return
    setLoading(true)
    try {
      const s1 = JSON.parse(sessionStorage.getItem('careers_stage4') || '{}')
      const s2 = JSON.parse(sessionStorage.getItem('careers_stage4_feedback') || '{}')

      const fullData = {
        ...s2,
        anything_else,
        consent,
      }

      await fetch('/api/careers/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: s1.email, stage: 4, data: fullData }),
      })

      fetch('/api/engagement/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: s1.email, name: '', stage: 4 }),
        keepalive: true,
      }).catch(() => {})

      fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: s1.email,
          full_name: 'See DB record',
          site_critique: s2.site_critique,
          availability: s2.availability,
          salary_range: s2.salary_range,
          source: 'careers_funnel_stage4_qualified',
        }),
        keepalive: true,
      }).catch(() => {})

      sessionStorage.removeItem('careers_stage4')
      sessionStorage.removeItem('careers_stage4_feedback')

      setSubmitted(true)
    } catch (err) {
      console.error('Stage 4 submission failed:', err)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-linear-to-br from-[#FFF9E6] to-green-50 border-2 border-[#D5AF34] rounded-3xl p-12 text-center">
            <FaStar className="w-20 h-20 text-[#D5AF34] mx-auto mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">You&apos;re Qualified!</h2>
            <p className="text-xl text-gray-700 mb-4">
              Congratulations — you&apos;ve completed all 4 stages. That puts you ahead of most candidates.
            </p>
            <p className="text-gray-600 mb-8">
              Our team will review your full application — every response and your portfolio. 
              If there&apos;s a fit, we&apos;ll reach out within <strong>5 business days</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-linear-to-r from-[#D5AF34] to-[#5F9EA0] text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all"
              >
                Meet Our Team
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold border-2 border-gray-200 hover:border-[#D5AF34] transition-colors"
              >
                Read Our Blog
              </Link>
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
              <span className="text-[#D5AF34] font-bold text-sm">Stage 4 of 4 — Step 3 of 3 — Final Step</span>
            </div>
            <h2 className="text-3xl font-black mb-2">Review &amp; Complete</h2>
            <p className="text-gray-600 text-lg">Last step. Add any final notes and submit.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Anything else you want us to know?</label>
            <textarea
              rows={3}
              value={anything_else}
              onChange={(e) => setAnythingElse(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none resize-none"
              placeholder="Optional — anything you want to add."
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-5 h-5 mt-1 accent-[#D5AF34]"
            />
            <span className="text-gray-700 text-sm">
              I consent to Iconic Brand Group storing and reviewing my application data. I understand my data will be handled per IBG&apos;s Privacy Policy. *
            </span>
          </label>

          <div className="flex justify-between items-center pt-4">
            <Link href="/careers/interview/feedback" className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900">
              <FaArrowLeft /> Back
            </Link>
            <button
              disabled={!consent || loading}
              onClick={handleSubmit}
              className="inline-flex items-center gap-3 bg-linear-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-white px-12 py-5 rounded-full font-bold text-xl disabled:opacity-40 hover:shadow-2xl hover:scale-105 transition-all"
            >
              {loading ? 'Submitting...' : 'Complete Application'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
