'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowRight, FaArrowLeft, FaLinkedin } from 'react-icons/fa'

const ROLE_OPTIONS = [
  'Marketing Manager',
  'Digital Marketing Specialist',
  'SEO Specialist',
  'Content Strategist',
  'Social Media Manager',
  'Business Consultant',
  'Operations Manager',
  'Brand Strategist',
  'Web Developer',
  'Graphic Designer',
  'Account Manager',
  'Sales Representative',
  'General Interest / Other',
]

export default function ApplyDetailsForm() {
  const [form, setForm] = useState({
    location: '',
    role_interest: '',
    linkedin_url: '',
  })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('careers_stage1')
    if (!saved) {
      window.location.href = '/careers'
      return
    }
    setReady(true)
  }, [])

  const isValid =
    form.location.trim().length > 0 &&
    form.role_interest.length > 0 &&
    form.linkedin_url.trim().length > 0

  const handleContinue = () => {
    if (!isValid) return
    sessionStorage.setItem('careers_stage1_details', JSON.stringify(form))
    window.location.href = '/careers/apply/submit'
  }

  if (!ready) return null

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 shadow-xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#D5AF34]/10 rounded-full px-4 py-2 mb-4">
              <span className="text-[#D5AF34] font-bold text-sm">Stage 1 of 4 — Step 2 of 3</span>
            </div>
            <h2 className="text-3xl font-black mb-2">Your Background</h2>
            <p className="text-gray-600 text-lg">Where are you based and what role interests you?</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Location (City, State) *</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none"
                placeholder="Tampa, FL"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Role Interested In *</label>
              <select
                value={form.role_interest}
                onChange={(e) => setForm({ ...form, role_interest: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none"
              >
                <option value="">Select a role...</option>
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <FaLinkedin className="inline text-[#0077B5] mr-1" /> LinkedIn Profile URL *
              </label>
              <p className="text-xs text-gray-500 mb-2">
                We use LinkedIn as a first-pass filter. No profile = no review.
              </p>
              <input
                type="url"
                value={form.linkedin_url}
                onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none"
                placeholder="https://linkedin.com/in/yourname"
              />
            </div>
          </div>

          <div className="mt-10 flex justify-between items-center">
            <Link href="/careers" className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900">
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
