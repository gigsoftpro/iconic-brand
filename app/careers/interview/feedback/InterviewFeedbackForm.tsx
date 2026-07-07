'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

export default function InterviewFeedbackForm() {
  const [ready, setReady] = useState(false)
  const [site_critique, setSiteCritique] = useState('')
  const [availability, setAvailability] = useState('')
  const [salary_range, setSalaryRange] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('careers_stage4')
    if (!saved) {
      window.location.href = '/careers/interview'
      return
    }
    setReady(true)
  }, [])

  const isValid =
    site_critique.length >= 50 &&
    availability.length > 0 &&
    salary_range.length > 0

  const handleContinue = () => {
    if (!isValid) return
    sessionStorage.setItem('careers_stage4_feedback', JSON.stringify({ site_critique, availability, salary_range }))
    window.location.href = '/careers/interview/submit'
  }

  if (!ready) return null

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 shadow-xl space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#D5AF34]/10 rounded-full px-4 py-2 mb-4">
              <span className="text-[#D5AF34] font-bold text-sm">Stage 4 of 4 — Step 2 of 3</span>
            </div>
            <h2 className="text-3xl font-black mb-2">Site Feedback &amp; Availability</h2>
            <p className="text-gray-600 text-lg">Tell us what you&apos;d improve and when you can start.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              What&apos;s one thing you&apos;d change about our website? *
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Browse the <Link href="/" target="_blank" className="text-[#D5AF34] underline">entire site</Link> — services, industries, blog, locations. Minimum 50 characters.
            </p>
            <textarea
              rows={4}
              value={site_critique}
              onChange={(e) => setSiteCritique(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none resize-none"
              placeholder="I would change... because..."
            />
            <span className={`text-xs ${site_critique.length >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
              {site_critique.length}/50 min
            </span>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Availability *</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none"
            >
              <option value="">When can you start?</option>
              <option value="immediately">Immediately</option>
              <option value="2-weeks">Within 2 weeks</option>
              <option value="1-month">Within 1 month</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Salary / Rate Expectations *</label>
            <p className="text-xs text-gray-500 mb-2">Annual salary or hourly rate — we need alignment before an interview.</p>
            <input
              type="text"
              value={salary_range}
              onChange={(e) => setSalaryRange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none"
              placeholder="e.g., $60K-$80K/year or $35-$50/hour"
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <Link href="/careers/interview" className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900">
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
