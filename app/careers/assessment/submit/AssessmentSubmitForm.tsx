'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa'

export default function AssessmentSubmitForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [campaign_pitch, setCampaignPitch] = useState('')
  const [strengths_weaknesses, setStrengthsWeaknesses] = useState('')

  useEffect(() => {
    const s1 = sessionStorage.getItem('careers_stage3')
    const s2 = sessionStorage.getItem('careers_stage3_portfolio')
    if (!s1 || !s2) {
      window.location.href = '/careers/assessment'
      return
    }
    const parsed = JSON.parse(s1)
    setEmail(parsed.email)
  }, [])

  const isValid =
    campaign_pitch.length >= 100 &&
    strengths_weaknesses.length >= 50

  const handleSubmit = async () => {
    if (!isValid || loading) return
    setLoading(true)
    try {
      const s1 = JSON.parse(sessionStorage.getItem('careers_stage3') || '{}')
      const s2 = JSON.parse(sessionStorage.getItem('careers_stage3_portfolio') || '{}')

      const fullData = {
        track: s1.track,
        scenario_response: s1.scenario_response,
        ...s2,
        campaign_pitch,
        strengths_weaknesses,
      }

      await fetch('/api/careers/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: s1.email, stage: 3, data: fullData }),
      })

      fetch('/api/engagement/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: s1.email, name: '', stage: 3 }),
        keepalive: true,
      }).catch(() => {})

      sessionStorage.removeItem('careers_stage3')
      sessionStorage.removeItem('careers_stage3_portfolio')

      setSubmitted(true)
    } catch (err) {
      console.error('Stage 3 submission failed:', err)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-green-50 border-2 border-green-500 rounded-3xl p-12 text-center">
            <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-green-900 mb-4">Stage 3 Complete!</h2>
            <p className="text-xl text-green-700 mb-4">
              Your assessment has been submitted. You&apos;re one step away from an interview.
            </p>
            <p className="text-gray-600 mb-4">
              Stage 4 is <strong>Interview Prep</strong> — give us site feedback and confirm your availability.
            </p>
            <div className="bg-white border-2 border-[#D5AF34]/30 rounded-2xl px-8 py-6 inline-block">
              <p className="text-lg font-bold text-gray-800 mb-1">📧 Check Your Email</p>
              <p className="text-gray-500 text-sm">We&apos;ll send your Stage 4 invitation shortly.</p>
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
              <span className="text-[#D5AF34] font-bold text-sm">Stage 3 of 4 — Step 3 of 3</span>
            </div>
            <h2 className="text-3xl font-black mb-2">Campaign &amp; Self-Assessment</h2>
            <p className="text-gray-600 text-lg">Pitch a campaign and reflect on your skills.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Pick a location we serve — pitch a campaign for a client there *
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Browse <Link href="/locations" target="_blank" className="text-[#D5AF34] underline">Locations</Link>. Pick a city and pitch a campaign idea. Minimum 100 characters.
            </p>
            <textarea
              rows={5}
              value={campaign_pitch}
              onChange={(e) => setCampaignPitch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none resize-none"
              placeholder="E.g., 'For a Tampa-based restaurant client, I would...'"
            />
            <span className={`text-xs ${campaign_pitch.length >= 100 ? 'text-green-600' : 'text-gray-400'}`}>
              {campaign_pitch.length}/100 min
            </span>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              What are your biggest strengths and weaknesses? *
            </label>
            <p className="text-xs text-gray-500 mb-2">Be honest. Self-awareness matters. Minimum 50 characters.</p>
            <textarea
              rows={4}
              value={strengths_weaknesses}
              onChange={(e) => setStrengthsWeaknesses(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none resize-none"
              placeholder="Be specific — generic answers won't cut it."
            />
            <span className={`text-xs ${strengths_weaknesses.length >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
              {strengths_weaknesses.length}/50 min
            </span>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Link href="/careers/assessment/portfolio" className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900">
              <FaArrowLeft /> Back
            </Link>
            <button
              disabled={!isValid || loading}
              onClick={handleSubmit}
              className="inline-flex items-center gap-3 bg-linear-to-r from-[#D5AF34] to-[#5F9EA0] text-white px-10 py-4 rounded-full font-bold text-lg disabled:opacity-40 hover:shadow-xl transition-all"
            >
              {loading ? 'Submitting...' : 'Submit Assessment'} <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
