'use client'

import { useEffect } from 'react'

export function usePerformance() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload hero images
      const heroImage = new Image()
      heroImage.src = '/general/pexels-startup-stock-photos-7075.jpg'
      
      // Preload fonts (already handled by next/font but good to be explicit)
      const fontPreload = document.createElement('link')
      fontPreload.rel = 'preload'
      fontPreload.href = 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Raleway:wght@300;400;500;600;700;800;900&display=swap'
      fontPreload.as = 'style'
      document.head.appendChild(fontPreload)
    }

    // Lazy load non-critical resources
    const lazyLoadResources = () => {
      // Intersection Observer for images
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.classList.remove('blur-sm')
              imageObserver.unobserve(img)
            }
          }
        })
      })

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img)
      })
    }

    // Web Vitals tracking
    const trackWebVitals = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        // Track LCP (Largest Contentful Paint)
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          console.log('LCP:', lastEntry.startTime)
        }).observe({ entryTypes: ['largest-contentful-paint'] })

        // Track FID (First Input Delay)
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            const eventEntry = entry as PerformanceEventTiming;
            if (eventEntry.processingStart) {
              console.log(
                "FID:",
                eventEntry.processingStart - eventEntry.startTime
              );
            }
          })
        }).observe({ entryTypes: ['first-input'] })

        // Track CLS (Cumulative Layout Shift)
        new PerformanceObserver((list) => {
          let clsValue = 0
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          console.log('CLS:', clsValue)
        }).observe({ entryTypes: ['layout-shift'] })
      }
    }

    preloadCriticalResources()
    lazyLoadResources()
    trackWebVitals()
  }, [])
}