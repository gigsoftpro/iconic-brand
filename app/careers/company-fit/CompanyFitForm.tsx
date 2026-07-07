'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowRight, FaBookOpen } from 'react-icons/fa'

export default function CompanyFitForm() {
  const [email, setEmail] = useState('')
  const [needsEmail, setNeedsEmail] = useState(true)
  const [what_we_do, setWhatWeDo] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const e = params.get('email')
    if (e) {
      setEmail(e)
      setNeedsEmail(false)
    }
  }, [])

  const isValid = email.includes('@') && what_we_do.length >= 50

  const handleContinue = () => {
    if (!isValid) return
    sessionStorage.setItem('careers_stage2', JSON.stringify({ email, what_we_do }))
    window.location.href = '/careers/company-fit/services'
  }

  return (
    <>
      {/* Header */}
      <section className="py-12 px-6 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#D5AF34]/10 rounded-full px-4 py-2 mb-4">
            <span className="text-[#D5AF34] font-bold text-sm">Stage 2 of 4 — Step 1 of 3</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Company Fit</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Before we go further, show us you&apos;ve done your homework on Iconic Brand Group.
          </p>
        </div>
      </section>

      {/* Research Prompt */}
      <section className="px-6 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#FFF9E6] border-2 border-[#D5AF34]/30 rounded-2xl p-6 flex items-start gap-4">
            <FaBookOpen className="w-6 h-6 text-[#D5AF34] mt-1 shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Research Required</h3>
              <p className="text-gray-700 mb-3">
                You&apos;ll need to spend time on our site to answer these questions. Start here:
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/about" target="_blank" className="inline-flex items-center gap-1 text-[#D5AF34] font-bold underline hover:text-[#C19A2E] text-sm">
                  About Us →
                </Link>
                <Link href="/services" target="_blank" className="inline-flex items-center gap-1 text-[#D5AF34] font-bold underline hover:text-[#C19A2E] text-sm">
                  Services →
                </Link>
                <Link href="/services/consulting" target="_blank" className="inline-flex items-center gap-1 text-[#D5AF34] font-bold underline hover:text-[#C19A2E] text-sm">
                  Consulting →
                </Link>
                <Link href="/services/marketing" target="_blank" className="inline-flex items-center gap-1 text-[#D5AF34] font-bold underline hover:text-[#C19A2E] text-sm">
                  Marketing →
                </Link>
                <Link href="/industries" target="_blank" className="inline-flex items-center gap-1 text-[#D5AF34] font-bold underline hover:text-[#C19A2E] text-sm">
                  Industries →
                </Link>
              </div>
            </div>
          </div>
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
                  placeholder="The email you used in Stage 1"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                In your own words, what does Iconic Brand Group do? *
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Hint: Read our <Link href="/about" target="_blank" className="text-[#D5AF34] underline">About</Link> and{' '}
                <Link href="/services" target="_blank" className="text-[#D5AF34] underline">Services</Link> pages. Minimum 50 characters.
              </p>
              <textarea
                rows={4}
                value={what_we_do}
                onChange={(e) => setWhatWeDo(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none resize-none"
                placeholder="Describe what Iconic Brand Group does, who they serve, and how they help clients..."
              />
              <span className={`text-xs ${what_we_do.length >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
                {what_we_do.length}/50 min
              </span>
            </div>

            <div className="flex justify-between items-center pt-4">
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900"
              >
                ← Back to Stage 1
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
