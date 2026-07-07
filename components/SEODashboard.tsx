'use client'

import { useState, useEffect } from 'react'
import { auditPageSEO, generateSEOReport, type SEOAudit } from '@/lib/seo-monitoring'

interface SEODashboardProps {
  showInDevelopment?: boolean
}

export default function SEODashboard({ showInDevelopment = true }: SEODashboardProps) {
  const [audit, setAudit] = useState<SEOAudit | null>(null)
  const [report, setReport] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development' && showInDevelopment) {
      setIsVisible(true)
      
      // Run audit after page loads
      const timer = setTimeout(() => {
        try {
          const auditResult = auditPageSEO()
          setAudit(auditResult)
          setReport(generateSEOReport(auditResult))
        } catch (error) {
          console.error('SEO audit failed:', error)
        }
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [showInDevelopment])

  if (!isVisible || !audit) {
    return null
  }

  const getScoreColor = (score: number, max: number) => {
    const percentage = (score / max) * 100
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusIcon = (isOptimal: boolean) => {
    return isOptimal ? '✅' : '⚠️'
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white border-2 border-gray-200 rounded-lg shadow-2xl p-4 max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">SEO Audit</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-3 text-sm">
          {/* Title Audit */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Title</span>
            <div className="flex items-center gap-2">
              <span className={getScoreColor(audit.title.length, 60)}>
                {audit.title.length} chars
              </span>
              <span>{getStatusIcon(audit.title.optimal)}</span>
            </div>
          </div>
          
          {/* Description Audit */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Description</span>
            <div className="flex items-center gap-2">
              <span className={getScoreColor(audit.description.length, 160)}>
                {audit.description.length} chars
              </span>
              <span>{getStatusIcon(audit.description.optimal)}</span>
            </div>
          </div>
          
          {/* Headings Audit */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">H1 Tags</span>
            <div className="flex items-center gap-2">
              <span className={audit.headings.h1Count === 1 ? 'text-green-600' : 'text-red-600'}>
                {audit.headings.h1Count}
              </span>
              <span>{getStatusIcon(audit.headings.h1Count === 1)}</span>
            </div>
          </div>
          
          {/* Images Audit */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Images with Alt</span>
            <div className="flex items-center gap-2">
              <span className={getScoreColor(audit.images.withAlt, audit.images.total)}>
                {audit.images.withAlt}/{audit.images.total}
              </span>
              <span>{getStatusIcon(audit.images.missingAlt === 0)}</span>
            </div>
          </div>
          
          {/* Links Audit */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Internal Links</span>
            <div className="flex items-center gap-2">
              <span className="text-blue-600">{audit.links.internal}</span>
              <span>🔗</span>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => console.log(report)}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Full Report (Console)
          </button>
        </div>
        
        {/* Performance Hints */}
        <div className="mt-3 text-xs text-gray-500">
          <div>💡 Tips:</div>
          {!audit.title.optimal && (
            <div>• Optimize title length (30-60 chars)</div>
          )}
          {!audit.description.optimal && (
            <div>• Optimize description (120-160 chars)</div>
          )}
          {audit.headings.h1Count !== 1 && (
            <div>• Use exactly one H1 tag</div>
          )}
          {audit.images.missingAlt > 0 && (
            <div>• Add alt text to {audit.images.missingAlt} images</div>
          )}
        </div>
      </div>
    </div>
  )
}