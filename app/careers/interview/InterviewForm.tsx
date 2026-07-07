'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'

export default function InterviewForm() {
  const [email, setEmail] = useState('')
  const [needsEmail, setNeedsEmail] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const e = params.get('email')
    if (e) {
      setEmail(e)
      setNeedsEmail(false)
    }
  }, [])

  const isValid =
    email.includes('@')

  const handleContinue = () => {
    if (!isValid) return
    sessionStorage.setItem('careers_stage4', JSON.stringify({ email }))
    window.location.href = '/careers/interview/feedback'
  }

  return (
    <>
      {/* Header */}
      <section className="py-12 px-6 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#D5AF34]/10 rounded-full px-4 py-2 mb-4">
            <span className="text-[#D5AF34] font-bold text-sm">Stage 4 of 4 — Step 1 of 3</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Interview Prep</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Give us site feedback and confirm you&apos;re ready.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 shadow-xl space-y-10">

            {needsEmail && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Email (from Stage 1) *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none"
                  placeholder="The email from your application"
                />
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <Link
                href="/careers/assessment"
                className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900"
              >
                ← Back to Stage 3
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
    </>
  )
}
