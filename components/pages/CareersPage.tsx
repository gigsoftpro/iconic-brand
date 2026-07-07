'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaCheckCircle, FaArrowRight, FaLinkedin } from 'react-icons/fa'

export default function CareersPage() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
  })

  const isValid =
    form.full_name.trim().length > 0 &&
    form.email.includes('@') &&
    form.phone.trim().length >= 7

  const handleContinue = () => {
    if (!isValid) return
    sessionStorage.setItem('careers_stage1', JSON.stringify(form))
    window.location.href = '/careers/apply/details'
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-29">
        <div className="absolute inset-0">
          <Image
            src="/general/pexels-startup-stock-photos-7075.jpg"
            fill
            className="object-cover"
            alt="Careers at Iconic Brand Group"
          />
          <div className="absolute inset-0 bg-linear-to-br from-black/85 via-black/75 to-black/85" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
            <span className="text-[#D5AF34] font-bold text-sm tracking-wider uppercase">Join Our Team</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black mb-4 text-white leading-tight">
            Careers at <span className="bg-linear-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">Iconic</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We hire people who do their homework. Our 4-stage process finds the best.
          </p>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">How Our Process Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: 1, title: 'Application', desc: 'Share your info and background', active: true },
              { num: 2, title: 'Company Fit', desc: 'Show you\'ve done your research', active: false },
              { num: 3, title: 'Assessment', desc: 'Demonstrate your skills', active: false },
              { num: 4, title: 'Interview Prep', desc: 'Record your intro & pick a slot', active: false },
            ].map((step) => (
              <div
                key={step.num}
                className={`p-6 rounded-2xl border-2 text-center ${
                  step.active
                    ? 'border-[#D5AF34] bg-[#FFF9E6] shadow-lg'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-4 ${
                  step.active
                    ? 'bg-[#D5AF34] text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {step.num}
                </div>
                <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">
            Only candidates who complete all 4 stages are reviewed for interviews.
          </p>
        </div>
      </section>

      {/* Culture / Why IBG */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black mb-6">Why Work at Iconic?</h2>
            <ul className="space-y-4">
              {[
                'Work with ambitious brands across restaurants, real estate, healthcare, tech, and more',
                'High-impact consulting and marketing — not busywork',
                'Remote-friendly with a results-over-hours culture',
                'Collaborate with a tight team that moves fast and ships real work',
                'Growth paths in consulting, marketing, operations, and strategy',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FaCheckCircle className="text-[#D5AF34] mt-1 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-4 text-sm">
              <Link href="/about" className="text-[#D5AF34] font-bold underline hover:text-[#C19A2E]">About Us</Link>
              <Link href="/services" className="text-[#D5AF34] font-bold underline hover:text-[#C19A2E]">Our Services</Link>
              <Link href="/industries" className="text-[#D5AF34] font-bold underline hover:text-[#C19A2E]">Industries</Link>
            </div>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden">
            <Image
              src="/general/pexels-startup-stock-photos-7075.jpg"
              fill
              className="object-cover"
              alt="Team at Iconic Brand Group"
            />
          </div>
        </div>
      </section>

      {/* Stage 1 Step 1: Basic Info */}
      <section className="py-16 px-6 bg-white" id="apply">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12 shadow-xl">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-[#D5AF34]/10 rounded-full px-4 py-2 mb-4">
                <span className="text-[#D5AF34] font-bold text-sm">Stage 1 of 4 — Step 1 of 3</span>
              </div>
              <h2 className="text-3xl font-black mb-2">Let&apos;s Start With the Basics</h2>
              <p className="text-gray-600 text-lg">Tell us who you are.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none"
                  placeholder="john@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D5AF34] focus:outline-none"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="mt-10 flex justify-end">
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
