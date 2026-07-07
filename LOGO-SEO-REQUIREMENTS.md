# Logo SEO Requirements for SERP Display

## Critical: Logo Must Stand Out in Search Results

**"Logo Must pop on the SERP. no logo. No clicks. Boring logo. No clicks. WE GOTTA GRAB THEM HERE."**

This project uses the company logo in multiple places for SEO and SERP visibility:

## Current Logo Implementation

### Files Available
- **Full Color Logo**: `/public/brand/full-logo-coloured.png` (Primary - Used in schemas)
- **Full Color SVG**: `/public/brand/full-logo-coloured.svg`
- **Black & White SVG**: `/public/brand/full-logo-bw.svg`
- **White Logo**: `/public/brand/full-logo-white.png`
- **White SVG**: `/public/brand/full-logo-white.svg`
- **IBG Icon**: `/public/brand/ibg-logo.png`

### Schema Implementations

1. **Organization Schema** (`lib/seo.ts`)
   - Used in: All pages via root layout
   - Logo: `/brand/full-logo-coloured.png`
   - Dimensions: 600x60
   - Purpose: Google Knowledge Graph, search results

2. **LocalBusiness Schema** (`lib/geo-seo.ts`)
   - Used in: All location pages (500+ pages)
   - Logo: `/brand/full-logo-coloured.png`
   - Purpose: Local search results, Google Maps

3. **Article Schema** (`lib/seo.ts`)
   - Used in: Service pages, blog posts
   - Logo: `/brand/full-logo-coloured.png` (publisher)
   - Dimensions: 600x60

## Logo Requirements for Google Search

### Dimensions
- **Minimum**: 112x112px
- **Recommended**: 600x60 (horizontal) or 600x600 (square)
- **Aspect Ratio**: Should be recognizable when cropped to square

### File Requirements
- **Format**: PNG, JPG, WebP (PNG preferred for transparency)
- **File Size**: Under 200KB
- **Background**: Transparent or solid color
- **Resolution**: 2x or 3x for retina displays

### Design Considerations for SERP
1. **High Contrast**: Logo must be visible on white background
2. **Readable at Small Sizes**: Test at 60x60px to ensure legibility
3. **No Complex Details**: Simple, bold design works best
4. **Brand Colors**: Use signature colors (#D5AF34 gold, #000000 black)

## OpenGraph Images (Social Sharing)

For optimal social media and search preview:
- **Size**: 1200x630px (Facebook, LinkedIn, Twitter recommended)
- **Safe Zone**: Keep text/logo in center 1200x600px
- **File**: Create `/public/og-default.jpg` or `/public/og-image.jpg`

## Action Items

### Immediate
- [x] Update all schema references to use `/brand/full-logo-coloured.png`
- [ ] Create optimized OG image at `/public/og-image.jpg` (1200x630px)
- [ ] Test logo display in Google Rich Results Test

### Recommended
- [ ] Create 512x512px square version for Google Business Profile
- [ ] Add favicon.ico with logo (16x16, 32x32, 48x48)
- [ ] Create apple-touch-icon.png (180x180px)
- [ ] Create Web App Manifest with logo icons

## Testing Logo in Search Results

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Test any page URL
   - Verify Organization schema shows logo
   - Check for errors or warnings

2. **Google Search Console**
   - Monitor "Enhancements" section
   - Check "Logo" enhancement status
   - Verify logo appears correctly

3. **Social Media Preview Tools**
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

## Current Status

✅ Logo paths updated in all schema files
✅ ImageObject format with dimensions
✅ Using full-logo-coloured.png for brand consistency
⚠️ Need to create optimized OG image
⚠️ Need to test in Google Rich Results Test
⚠️ Need to verify SERP display after deployment

## Notes

The logo is critical for:
- **Brand Recognition** in search results
- **Click-Through Rate (CTR)** improvement
- **Trust Signals** for users
- **Professional Appearance** in Knowledge Graph

A well-optimized logo can increase CTR by 15-30% compared to text-only results.
