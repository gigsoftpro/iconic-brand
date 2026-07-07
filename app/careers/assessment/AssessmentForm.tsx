'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowRight, FaBookOpen } from 'react-icons/fa'

const SCENARIOS: Record<string, { label: string; prompt: string }> = {
  marketing: {
    label: 'Marketing Track',
    prompt: 'A restaurant franchise client in Tampa has 3 locations, no social media presence, and $5K/month budget. Outline your 90-day plan.',
  },
  consulting: {
    label: 'Consulting Track',
    prompt: 'A SaaS startup just raised $2M seed and needs to go from 0 to first 100 customers. What\'s your recommended go-to-market strategy?',
  },
  operations: {
    label: 'Operations Track',
    prompt: 'A home services company is doing $3M/year but the owner is working 80-hour weeks. What systems and processes would you implement first?',
  },
}

export default function AssessmentForm() {
  const [email, setEmail] = useState('')
  const [needsEmail, setNeedsEmail] = useState(true)
  const [track, setTrack] = useState<string>('marketing')
  const [scenario_response, setScenarioResponse] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const e = params.get('email')
    if (e) {
      setEmail(e)
      setNeedsEmail(false)
    }
  }, [])

  const isValid =
    email.includes('@') &&
    scenario_response.length >= 150

  const handleContinue = () => {
    if (!isValid) return
    sessionStorage.setItem('careers_stage3', JSON.stringify({ email, track, scenario_response }))
    window.location.href = '/careers/assessment/portfolio'
  }

  return (
    <>
      {/* Header */}
      <section className="py-12 px-6 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#D5AF34]/10 rounded-full px-4 py-2 mb-4">
            <span className="text-[#D5AF34] font-bold text-sm">Stage 3 of 4 — Step 1 of 3</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Skills Assessment</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This is the hardest stage — and that&apos;s by design. Show us what you can do.
          </p>
        </div>
      </section>

      {/* Research Prompt */}
      <section className="px-6 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#FFF9E6] border-2 border-[#D5AF34]/30 rounded-2xl p-6 flex items-start gap-4">
            <FaBookOpen className="w-6 h-6 text-[#D5AF34] mt-1 shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Preparation Required</h3>
              <p className="text-gray-700 mb-3">
                You&apos;ll reference our blog and locations pages for later questions.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/blog" target="_blank" className="inline-flex items-center gap-1 text-[#D5AF34] font-bold underline text-sm">
                  Blog & Insights →
                </Link>
                <Link href="/blog/brand-strategy-essentials" target="_blank" className="inline-flex items-center gap-1 text-[#D5AF34] font-bold underline text-sm">
                  Brand Strategy Essentials →
                </Link>
                <Link href="/locations" target="_blank" className="inline-flex items-center gap-1 text-[#D5AF34] font-bold underline text-sm">
                  Markets We Serve →
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
                  placeholder="The email from your application"
                />
              </div>
            )}

            {/* Role Track Selector */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Select your role track *</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(SCENARIOS).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTrack(key)}
                    className={`p-4 rounded-xl border-2 text-center font-bold text-sm transition-all ${
                      track === key
                        ? 'border-[#D5AF34] bg-[#FFF9E6] text-[#D5AF34]'
                        : 'border-gray-200 text-gray-600 hover:border-[#D5AF34]/50'
                    }`}
                  >
                    {val.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenario */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Scenario Response *</label>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-3">
                <p className="text-gray-700 italic">&ldquo;{SCENARIOS[track].prompt}&rdquo;</p>
              </div>
              <p className="text-xs text-gray-500 mb-2">Minimum 150 characters. Be specific and strategic.</p>
              <textarea
                rows={6}
                value={scenario_response}
                onChange={(e) => setScenarioResponse(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none resize-none"
                placeholder="Outline your approach, timeline, and expected outcomes..."
              />
              <span className={`text-xs ${scenario_response.length >= 150 ? 'text-green-600' : 'text-gray-400'}`}>
                {scenario_response.length}/150 min
              </span>
            </div>

            <div className="flex justify-between items-center pt-4">
              <Link
                href="/careers/company-fit"
                className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900"
              >
                ← Back to Stage 2
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
