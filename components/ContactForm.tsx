'use client'

import { useState } from 'react'
import { trackFormSubmission, trackLocationConversion } from '@/lib/analytics'

interface ContactFormProps {
  city?: string
  state?: string
  source?: string
  className?: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  company?: string
  service?: string
  message?: string
}

// Validation utilities
const validateFullName = (name: string): string | null => {
  const trimmed = name.trim()
  if (!trimmed) return 'Name is required'

  const words = trimmed.split(/\s+/)

  // Check minimum 2 words, maximum 3 words
  if (words.length < 2) {
    return 'Please enter your first and last name'
  }
  if (words.length > 3) {
    return 'Name should be maximum 3 words (e.g., Dr John Doe)'
  }

  // Check if each word contains only letters (and common prefixes like Dr., Mr., Mrs.)
  const validNamePattern = /^[A-Za-z.'-]+$/
  for (const word of words) {
    if (!validNamePattern.test(word)) {
      return 'Name should contain only letters'
    }
  }

  // Check for repeated characters (prevents "aaaa" or "qwerty")
  const hasRepeatedChars = /(.)\1{3,}/.test(trimmed.replace(/\s/g, ''))
  if (hasRepeatedChars) {
    return 'Please enter a valid name'
  }

  // Check for keyboard sequences like "qwerty", "asdfgh", etc.
  const lowerName = trimmed.toLowerCase().replace(/\s/g, '')
  const keyboardSequences = ['qwerty', 'asdfgh', 'zxcvbn', 'qwertyuiop', 'asdfghjkl']
  for (const seq of keyboardSequences) {
    if (lowerName.includes(seq)) {
      return 'Please enter a valid name'
    }
  }

  return null
}

const validatePhone = (phone: string, state?: string): string | null => {
  if (!phone) return null // Phone is optional

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')

  // Check if it's a valid US phone number (10 digits)
  if (digits.length !== 10) {
    return 'Please enter a valid 10-digit phone number'
  }

  // Extract area code (first 3 digits)
  const areaCode = digits.substring(0, 3)

  // Validate area code is not invalid (no area codes starting with 0 or 1)
  if (areaCode[0] === '0' || areaCode[0] === '1') {
    return 'Invalid area code'
  }

  // State-specific area code validation (optional enhancement)
  // This is a basic check - could be expanded with full area code mapping
  if (state) {
    const stateAreaCodes: Record<string, string[]> = {
      'CA': ['209', '213', '310', '323', '408', '415', '510', '562', '619', '626', '650', '661', '707', '714', '760', '805', '818', '831', '858', '909', '916', '925', '949', '951'],
      'NY': ['212', '315', '347', '516', '518', '585', '607', '631', '646', '716', '718', '845', '914', '917'],
      'TX': ['210', '214', '254', '281', '325', '361', '409', '430', '432', '469', '512', '682', '713', '737', '806', '817', '830', '832', '903', '915', '936', '940', '956', '972', '979'],
      'FL': ['239', '305', '321', '352', '386', '407', '561', '727', '754', '772', '786', '813', '850', '863', '904', '941', '954'],
      // Add more states as needed
    }

    if (stateAreaCodes[state] && !stateAreaCodes[state].includes(areaCode)) {
      return `Area code ${areaCode} may not be valid for ${state}. Please verify.`
    }
  }

  return null
}

export default function ContactForm({ city, state, source = 'location_page', className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate name
    const nameError = validateFullName(formData.name)
    if (nameError) {
      newErrors.name = nameError
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Validate phone
    const phoneError = validatePhone(formData.phone, state)
    if (phoneError) {
      newErrors.phone = phoneError
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Track form submission
      trackFormSubmission(`contact_form_${source}`)

      // Track location-specific conversion if city is provided
      if (city) {
        trackLocationConversion('contact_form', city, state, 100)
      }

      // Submit form data to API — keepalive ensures request completes even after redirect
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          city,
          state,
          source
        }),
        keepalive: true,
      }).catch((err) => console.error('API submit error:', err))

      setIsSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors(prev => ({ ...prev, message: 'Something went wrong. Please try again.' }))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`bg-white rounded-3xl border-2 border-gray-200 shadow-2xl p-8 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-black mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            We've received your message and will get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                service: '',
                message: ''
              })
            }}
            className="text-[#D5AF34] font-medium hover:underline"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-3xl border-2 border-gray-200 shadow-2xl p-8 ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-black mb-2">
          Get Your Free Consultation
        </h3>
        <p className="text-gray-600">
          {city ? `Ready to grow your ${city} business?` : 'Ready to transform your business?'} 
          {' '}Let's discuss your goals and create a winning strategy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.message && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
            <p className="text-sm">{errors.message}</p>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-colors ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-[#D5AF34]'
              }`}
              placeholder="John Smith"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-colors ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-[#D5AF34]'
              }`}
              placeholder="john@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-colors ${
                errors.phone
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-[#D5AF34]'
              }`}
              placeholder="(555) 123-4567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D5AF34] focus:border-transparent transition-colors"
              placeholder="Your Company"
            />
          </div>
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
            Service Interest
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D5AF34] focus:border-transparent transition-colors"
          >
            <option value="">Select a service...</option>
            <option value="business-consulting">Business Consulting</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="brand-strategy">Brand Strategy</option>
            <option value="strategic-planning">Strategic Planning</option>
            <option value="operations-optimization">Operations Optimization</option>
            <option value="growth-strategy">Growth Strategy</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Tell us about your project
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D5AF34] focus:border-transparent transition-colors resize-none"
            placeholder={city ? `Describe your ${city} business goals and challenges...` : 'Describe your business goals and challenges...'}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#D5AF34] to-[#C19A2E] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Sending...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              Get Free Consultation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </div>
  )
}