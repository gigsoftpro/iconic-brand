'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

export default function AssessmentPortfolioForm() {
  const [ready, setReady] = useState(false)
  const [portfolio_url, setPortfolioUrl] = useState('')
  const [blog_critique, setBlogCritique] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('careers_stage3')
    if (!saved) {
      window.location.href = '/careers/assessment'
      return
    }
    setReady(true)
  }, [])

  const isValid =
    portfolio_url.trim().length > 0 &&
    blog_critique.length >= 80

  const handleContinue = () => {
    if (!isValid) return
    sessionStorage.setItem('careers_stage3_portfolio', JSON.stringify({ portfolio_url, blog_critique }))
    window.location.href = '/careers/assessment/submit'
  }

  if (!ready) return null

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 shadow-xl space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#D5AF34]/10 rounded-full px-4 py-2 mb-4">
              <span className="text-[#D5AF34] font-bold text-sm">Stage 3 of 4 — Step 2 of 3</span>
            </div>
            <h2 className="text-3xl font-black mb-2">Portfolio &amp; Blog Review</h2>
            <p className="text-gray-600 text-lg">Share your work and show us your critical eye.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Portfolio URL or Work Sample Link *</label>
            <p className="text-xs text-gray-500 mb-2">Share a link to your portfolio, Behance, Dribbble, GitHub, or any relevant work.</p>
            <input
              type="url"
              value={portfolio_url}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Read a blog post — what would you do differently? *
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Read <Link href="/blog/brand-strategy-essentials" target="_blank" className="text-[#D5AF34] underline">Brand Strategy Essentials</Link> or any{' '}
              <Link href="/blog" target="_blank" className="text-[#D5AF34] underline">blog post</Link>. Minimum 80 characters.
            </p>
            <textarea
              rows={4}
              value={blog_critique}
              onChange={(e) => setBlogCritique(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none resize-none"
              placeholder="What did the article cover well? What angle would you add or change?"
            />
            <span className={`text-xs ${blog_critique.length >= 80 ? 'text-green-600' : 'text-gray-400'}`}>
              {blog_critique.length}/80 min
            </span>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Link href="/careers/assessment" className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900">
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
