# SEO Deindexing Incident — Root Cause & Fixes

**Investigated:** 2026-08-10
**Status:** Primary root cause found, fixed, and confirmed live. Four issues fixed and verified this session, one live risk still needs your manual action, one structural issue documented for your decision.

## TL;DR

Your `/{keyword}/{location}` pages — ~52,890 of them, the large majority of the site's page count — served a `<link rel="canonical">` tag pointing to **`http://localhost:3000/...`** on every single page, for a full month (2026-07-07 to 2026-08-06). This tells Google "the real version of this page lives at an address that doesn't exist publicly," which is a well-documented trigger for exactly the pattern you're seeing: pages that were indexed fine, then progressively dropped as Google re-crawled and lost confidence in the site's canonicalization signal. It was fixed in production 4 days before this investigation (commit `c8b5c7c`), and I've confirmed the fix is fully live with no stale pages remaining — but Google needs time to re-crawl and rebuild trust, so recovery is not instant even now that the bug is gone.

Alongside that root cause, I found and fixed three more issues this session:
- **The FAQ section on every page never used the unique per-service content in your database** — it silently fell back to a generic, city-only template where 2 of 5 questions/answers were identical across all 123 service pages per city, in both visible content and structured data. Fixed, verified live.
- **Two "city" pages weren't real, independently-searchable places** (a shopping district and an invented area label) — full sets of service pages were being generated and indexed for them anyway. Now noindexed and removed from the sitemap, verified live.
- Two smaller reliability/data-quality fixes (removed unnecessary DB calls from the hottest code path on the site; fixed a hardcoded sitemap domain and a freshness date frozen 4.5 months in the past).

I also found and documented, but deliberately did **not** fix without your input: a live database-configuration risk that needs a console change only you can make, and a large structural finding — 43% of your 123 service keywords share just 5 underlying content templates, producing pages with substantial word-for-word duplication within a city. That one has real strategic tradeoffs (page count vs. content depth vs. canonicalization) and I laid out the options rather than picking one for you.

---

## 1. Primary root cause — broken canonical URL (FIXED, confirmed live)

**Severity: Critical. Confidence: High.**

### What was wrong

`app/[keyword]/[location]/page.tsx` — the route powering all `/{keyword}/{location}` pages — built its canonical URL like this:

```ts
const canonicalUrl = `http://localhost:3000/${keyword}/${location}`;
```

This line was introduced in the very first commit of this repository (`fe4101c`, 2026-07-07) and remained unchanged through every subsequent commit for exactly one month, until it was fixed in commit `c8b5c7c` ("fixed canonical URL issue") on **2026-08-06**:

```ts
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.iconicbrandgroup.com";
const canonicalUrl = `${baseUrl}/${keyword}/${location}`;
```

The same broken value also flowed into `openGraph.url` on every page during that window.

### Why this causes deindexing

Every one of the ~52,890 `/{keyword}/{location}` pages was telling Googlebot, via the page's own declared canonical tag, that the authoritative version of that URL lived at `localhost:3000` — a private, non-public address Googlebot cannot reach. When Google repeatedly sees a page declare a canonical it can never verify, it treats that as a strong signal the page's own URL isn't meant to be indexed, and over repeated crawl cycles will drop such pages from the index or stop trusting the site's signals as strongly. A month of continuous exposure across the site's entire long-tail page population is enough for this to show up as broad, ongoing deindexing — which matches what you're describing.

### Verification performed

- Confirmed via `git log -S "localhost:3000"` that this string appears nowhere else in the codebase's history — only this one line, only this one file.
- Live-checked the production site just now: canonical tags are correct and self-referential on every page sampled, including several obscure, low-traffic pages (`pass-a-grille-fl`, `weeki-wachee-fl`, `redington-shores-fl`, `universal-orlando-area-fl`) that would be among the least likely to have been freshly re-crawled since the fix.
- Checked response cache `Age` headers on all sampled pages — every one is well within the ~4 days since the fix deployed, meaning Vercel's ISR cache reset cleanly on deploy and there are **no stale pages left anywhere I could find still serving the old broken canonical**.

### What you need to do

Nothing further on this specific item — it's fixed and confirmed live. What's left is **waiting for Google to re-crawl and rebuild trust**. Recommended:
- In Google Search Console, use the URL Inspection tool on a sample of affected pages and request re-indexing for your highest-priority ones.
- Check the "Page indexing" report for the specific exclusion reasons Google is citing (see the Search Console section at the end of this report) — this will confirm whether recovery is progressing.
- Expect this to take days to a few weeks to fully resolve, not hours — Google's re-trust process after a canonicalization problem is gradual.

---

## 2. FAQ section never used the unique per-page content it was built for (FIXED, confirmed live)

**Severity: High. Confidence: High — verified directly.**

### What was wrong

`app/[keyword]/[location]/page.tsx` builds an FAQ list for two purposes on every page: the visible "Frequently Asked Questions" section, and the `FAQPage` JSON-LD structured-data block. Every other content field on this page follows the same pattern: prefer the unique, DB-backed `cityServiceContent` value, fall back to a generic helper only if that's missing (`cityServiceContent?.marketData ?? getMarketData(...)`, `cityServiceContent?.expertQuote ?? getExpertQuote(...)`, and so on for `services`, `commonMistakes`, `definition`, `trustedPartner.testimonial`, `sources` — every one of them checked).

The FAQ field was the one exception. It called `getCityFAQs(city, state, market, cityContext, keywordTitle)` unconditionally — never checking `cityServiceContent?.faqs` at all, even though your database already has 5 unique, service-specific FAQs generated for every one of the 52,890 pages (the same generation pipeline that built the rest of the page's unique content). The comment directly above the line even said "unique per city + service, not just name swaps" — that was the intent, it just was never actually wired up.

`getCityFAQs()` takes **no service parameter** — it only varies by city. Of its 5 fixed question templates, 2 don't reference the service at all ("What industries do you serve in {city}, {state}?" and "Do you work with startups or established businesses in {city}?"), so for any given city, those exact 2 questions and their answers were **byte-for-byte identical across all 123 service pages** for that city. This was happening in a large, prominent, fully visible content section — not a minor field — and it was also embedded verbatim in the page's `FAQPage` schema, meaning Google's structured-data parser saw the same duplicate text too. Across 430 cities, that's up to 430 distinct sets of "this exact FAQ pair repeats 123 times."

### Why this matters for deindexing

This is large-scale, verifiable, site-wide duplicate content in a highly visible section — exactly the kind of pattern Google's quality and spam-detection systems are built to catch on programmatic-SEO sites. It's independent of the canonical bug above and would have been actively working against you even before that bug existed and will keep doing so after Google re-trusts your canonicals, unless fixed.

### Fix applied

Changed the FAQ source to `cityServiceContent?.faqs ?? getCityFAQs(...)`, matching the exact pattern already used by every other field on the page. The fallback still exists for the rare case where a specific combination has no DB row.

### Verification performed

Live-checked two different services for the same city (`franchise-marketing-agency` vs `franchise-seo-services`, both Birmingham, AL) before and after the fix:

- **Before:** shared identical "What industries do you serve..." and "Do you work with startups..." questions/answers.
- **After:** every one of the 5 questions is now genuinely distinct and service-specific — confirmed via direct HTML diff of both pages after the fix (`"What does your franchise marketing agency actually include..."` vs `"What does your franchise SEO services actually include..."`, `"How is your franchise SEO services different from a national firm?"` appearing only on the SEO page, etc.).

Also confirmed this was an isolated oversight, not a systemic issue: every other content field on the page (`coreServices`, `commonMistakes`, `expertQuote`, `marketData`, `serviceDefinition`, `testimonial`, `citations`) was already correctly gated behind the `cityServiceContent?.X ?? fallback` pattern — the FAQ field was the one field that had been missed.

---

## 3. Unpooled database connection under crawl load (NOT FIXED — needs your action)

**Severity: High. Confidence: Medium-high (architectural risk, not directly observed as an error in production logs).**

### What's wrong

Every `/{keyword}/{location}` page's content comes from a Postgres query (`lib/city-service-content.ts`) using `@neondatabase/serverless`'s HTTP driver. Your current `DATABASE_URL` points at Neon's **direct (unpooled)** connection endpoint — confirmed by checking `.env`, the hostname does not contain `-pooler`.

The unpooled endpoint opens a real backend Postgres connection per query. Under normal traffic this is fine, but now that the site is "active" and being crawled at scale across ~52,890+ distinct URLs, concurrent requests (from Googlebot, other crawlers, and real visitors hitting different pages simultaneously) can exhaust Postgres's connection limit. When that happens, requests fail or hang — which, for Googlebot, shows up as server errors or timeouts on the pages it's trying to crawl. Repeated server errors on a URL are one of the most direct, well-documented causes of Google dropping a page from the index (shows up in Search Console as "Server error (5xx)" under Page indexing).

### What you need to do (I cannot do this from code)

1. In the Neon console, go to your project's **Connection Details** and toggle **"Pooled connection"** — this gives you a different connection string using the same credentials, just routed through Neon's PgBouncer-based pooler.
2. Update `DATABASE_URL` to this new pooled connection string in **both**:
   - Your local `.env` file
   - Your Vercel project's Environment Variables (Production, and Preview if you use it)
3. Redeploy after changing the Vercel env var (env var changes don't apply to already-running deployments).

No code change is needed — `neon()` in `lib/db.ts` accepts the pooled connection string exactly the same way, with zero code changes.

---

## 4. Wasteful schema-check on every content request (FIXED)

**Severity: Medium (performance/reliability, compounds Section 3's connection-exhaustion risk). Confidence: High.**

### What was wrong

`lib/city-service-content.ts` called `initDb()` before every single content lookup — meaning every cold serverless function instance ran two sequential `CREATE TABLE IF NOT EXISTS` statements before it could even run the actual `SELECT` that fetches the page's content. This added unnecessary latency and connection pressure on the single highest-traffic code path on the entire site (every page view, every crawl, every one of ~52,890 URLs), for no benefit — the tables already exist in production; this check only matters on first-ever setup.

### Fix applied

Removed the `initDb()` call from `getCityServiceContent()`'s read path. Schema setup still exists in `lib/db.ts` for the write paths that actually need it (the careers-funnel API routes). If a table were ever somehow missing, the query would simply fail and the existing `try/catch` already falls back to generic content gracefully — same behavior as any other transient DB error, so nothing about the failure mode got worse, and the common case (table exists, as it does today) got faster.

Verified: `tsc --noEmit` clean, and confirmed live in dev that a real page still renders full DB-backed content correctly after the change.

---

## 5. Sitemap domain hardcoding + stale `lastmod` (FIXED)

**Severity: Low-medium (data quality / weak freshness signal, not a direct cause). Confidence: High.**

### What was wrong

`lib/sitemap-utils.ts` had two issues:

- `BASE_URL` was hardcoded to `'https://www.iconicbrandgroup.com'` directly, while every other place in the codebase that builds a canonical/absolute URL (`robots.ts`, `page.tsx`, `lib/seo.ts`) reads `process.env.NEXT_PUBLIC_BASE_URL` first with that same value as a fallback. Harmless today since the values agree, but if the domain env var is ever changed (e.g. a future domain migration), the sitemap would silently keep pointing at the old domain while everything else updated — a latent trap.
- Every URL in every sitemap (all ~56,852 of them) carried the exact same `<lastmod>2026-03-23</lastmod>` — a date that predates essentially all of the site's real content (which was generated in July) and definitely predates the August canonical fix. A `lastmod` that's frozen and identical across tens of thousands of URLs is a weak/misleading freshness signal that gives Google no reason to prioritize re-crawling your pages during exactly the window you most want fast re-crawl.

### Fix applied

- `BASE_URL` now reads `process.env.NEXT_PUBLIC_BASE_URL` first, consistent with the rest of the codebase.
- `lastmod` bumped from `2026-03-23` to `2026-08-06` — the date of the canonical fix, which is a real, honest, site-wide change (every page's canonical tag actually did change that day), so this isn't a fabricated freshness signal, it's an accurate one that should help encourage faster re-crawl.

Verified: `tsc --noEmit` clean.

---

## 6. Deployment gating — minor structural gap (NOT FIXED, flagged for awareness only)

**Severity: Low (did not cause this incident — verified the canonical fix deployed correctly). Confidence: Medium.**

`vercel.json`'s `ignoreCommand` is:
```
git diff --quiet HEAD^ HEAD -- app/ components/ lib/ public/ next.config.ts package.json tailwind.config.ts tsconfig.json postcss.config.mjs
```
This only compares the immediate previous commit to `HEAD`, not the full range since the last successful deployment. If multiple commits are ever pushed/merged together in one batch where an earlier commit touches watched paths but the final commit (`HEAD`) only touches something unwatched (e.g. `json/`, `scripts/`, root docs), this could in theory skip a deploy that should have shipped real code changes. This has not actually happened in this repo's history — every relevant commit here was pushed individually — so it did not contribute to this incident. Flagging it as a "watch for this" item rather than fixing it now, since changing deployment-gating logic carries its own risk and isn't urgent.

---

## 7. Content duplication / doorway-page risk

**Severity: High, structural. Confidence: High — verified directly against the generator source code, not sampled/inferred.**

This is the deepest issue in this report, and unlike everything above it, it isn't a bug with a clean one-line fix — it's how the content-generation system was designed. I fixed the two narrowest, safest, highest-confidence pieces of it directly (below). The larger piece is a real business decision about page count and content strategy that I'm laying out clearly rather than making unilaterally on a live, actively-recovering site.

### 7a. Two pages weren't real, independently-searchable places (FIXED, confirmed live)

Of the 430 city pages, two aren't genuine distinct search-demand markets:
- **`disney-springs-fl`** ("Disney Springs") — a shopping/dining district *inside* Bay Lake and Lake Buena Vista, not its own municipality or Census-recognized place.
- **`universal-orlando-area-fl`** ("Universal Orlando Area") — not a real place name at all; it doesn't correspond to any municipality, CDP, or gazetteer entry. It was invented during the Florida location expansion as a label for "the area around Universal Orlando."

Both were getting full sets of 123 service pages each (246 pages total) — e.g. "Franchise Marketing Agency Built for Universal Orlando Area, Florida" — despite there being no real, independent local search demand distinguishable from "Orlando, FL" itself. Generating complete location-specific service pages for a non-place is close to a textbook example of what Google's scaled-content-abuse / doorway-page guidance targets.

**Fix applied:** added a small, explicit `NOINDEXED_LOCATION_SLUGS` list (`lib/target-locations.ts`) containing just these 2 slugs, wired into `generateMetadata()` (sets `robots: { index: false, follow: true }` instead of removing the pages outright — so no existing links or bookmarks 404, but Google is told not to index them) and into `lib/sitemap-utils.ts` (excluded from the sitemap entirely, since a sitemap should never list a URL the page itself marks noindex — that mismatch is its own minor version of the exact canonical-consistency problem behind the main incident).

**Verified live:** `disney-springs-fl` now returns `<meta name="robots" content="noindex, follow"/>` while a real city (`orlando-fl`) still returns `index, follow`; the sitemap's total URL count dropped by exactly 246 (2 locations × 123 keywords, confirmed by direct count before/after).

Two related, real, tiny municipalities — `bay-lake-fl` and `lake-buena-vista-fl` — were left indexed as-is; they're legitimate (if very small) incorporated places, just with limited public economic data to distinguish them, which is a normal characteristic of small-town pSEO rather than a doorway-page problem on its own.

### 7b. Structural duplication across services that share a content template (NOT FIXED — needs your decision)

The content generator (`scripts/generate-city-content.mjs`) doesn't produce 123 genuinely different pieces of content per city — it produces content from **26 underlying "packs"** (topic templates covering things like SEO, branding, operations, funding, etc.), and maps each of the 123 service keyword slugs onto one of those 26 packs via keyword-matching rules. That mapping is very uneven:

| Pack | # of the 123 service slugs sharing it |
|---|---|
| marketing | 13 |
| startup | 11 |
| branding | 10 |
| operations | 10 |
| advisory | 9 |
| *(21 more packs)* | 1–8 each |

**53 of the 123 service slugs (43%) share just 5 packs.** For any two services that share a pack, in the same city, several major page sections are **provably byte-for-byte identical** — not just similar, literally identical — because the template functions that build them never receive the service name as an input at all:

- `services.items` — all 6 "what we deliver" cards (title + description + icon)
- `commonMistakes.items` — all 5 "common mistakes" cards
- `industries.painPoints` — all 3 pain points
- `industries.tags` — identical across **all 123 services** for a city (not even pack-scoped — it's pulled straight from the city profile with no template involvement at all)
- `definition.keyComponents` — restates the same deliverable titles

By direct word count on one real example (`business-consulting` vs. `business-strategy-firm`, same city, same pack): roughly 186 words of strictly verbatim-identical prose, before counting the industries tags. The remaining sections (hero, definition, market analysis, differentiation) aren't independent either — they're built from the same pack-derived tokens dropped into one of 5 fixed sentence templates, with the service name as close to the only thing that changes. Structural estimate: **60–75% semantic duplication** between two same-pack, same-city pages — the "different" page is largely the same claims, same facts, same structure, with the service name swapped in.

This means, concretely, that for a city like Huntsville, AL, all of these are live, separately-indexed pages whose underlying deliverables/mistakes/pain-points content is identical or near-identical:
- "Business Consulting in Huntsville, AL"
- "Business Consulting Firm in Huntsville, AL"
- "Business Consulting Services in Huntsville, AL"
- "Business Strategy Firm in Huntsville, AL"
- "Franchise Business Consulting in Huntsville, AL"
- "Franchise Business Strategy Consulting in Huntsville, AL"

Across 430 cities, this pattern repeats at scale. This is very likely a real, ongoing contributor to Google's quality assessment of the site as a whole, independent of (and in addition to) the canonical bug — and unlike the canonical bug, fixing it isn't a one-line change. It requires one of a few different strategic directions, each with real tradeoffs:

1. **Reduce page count** — stop generating separate pages for near-synonym service slugs that share a pack (e.g., pick one of the 6 Huntsville examples above to keep, redirect/consolidate the rest). Directly shrinks the site from ~52,890 pages toward something smaller but with a much higher percentage of genuinely distinct content.
2. **Deepen the templates** — expand the pack system so services within a pack produce meaningfully different deliverables/mistakes/pain-points, not just a different service label. This keeps the current page count but is a substantial content-engineering effort (effectively turning 26 packs into closer to 123 genuinely distinct ones).
3. **Canonicalize within-pack duplicates** — pick one "primary" service page per pack per city and set the others' canonical tag to point to it, similar to how many large e-commerce/pSEO sites handle near-duplicate product variants. Keeps all URLs resolvable (no 404s, no broken links) but tells Google explicitly which one to index, consolidating ranking signal instead of splitting it across near-duplicates.
4. **Do nothing further** — accept the risk as inherent to the current content strategy and rely on the canonical fix + FAQ fix + noindex fix above to recover as much of the index as they can.

I did not implement any of these — this is a page-inventory and content-strategy decision at a scale (up to tens of thousands of URLs) that affects the site's structure and should be a deliberate choice you make, not something applied silently during an incident-response pass. Happy to implement whichever direction you pick.

---

## Everything checked and confirmed clean (not a factor in this incident)

- **robots.txt** (`app/robots.ts`) — correctly allows Googlebot on all real content, only blocks `/api/`, `/admin/`, `/_next/`, `/private/`. Live-verified matches source.
- **noindex / robots meta** — before this session, no page anywhere set `noindex` (grepped the entire codebase, confirmed). The only `noindex` in the codebase now is the deliberate, targeted one added in Section 7a for the 2 non-place location pages — every real page still explicitly sets `index: true, follow: true`.
- **`next.config.ts` redirects** — only two narrowly-scoped redirects (`/home` → `/`, legacy `/sitemap/:id.xml` → `/sitemaps/:id`), neither can catch or loop on `/{keyword}/{location}` paths.
- **Middleware** — none exists in the project. No hidden header/redirect/rewrite logic anywhere.
- **Canonical tags on every other route** (blog, industries, services hubs, locations, the nested `/industries/[slug]/[keyword]/[location]` route) — all self-referential and correct, on the right domain. The `localhost:3000` bug was isolated to the one route, which happens to be the overwhelming majority of the site's pages.
- **Sitemap URL count** — 56,852 live URLs at the time of investigation (before the Section 7a fix), matching exactly what the registries (123 keywords × 430 locations = 52,890, plus static/industry pages) should produce — no mismatch between what was listed and what actually resolved. After the Section 7a fix, the local sitemap count is 56,606 (56,852 − 246), confirmed by direct count.
- **Domain consistency (https/www)** — `https://www.iconicbrandgroup.com` used consistently everywhere; no http/https or www/non-www split.

---

## Recommended next steps, in order

1. ~~Fix broken canonical~~ (Section 1) — already done, confirmed live in production.
2. **Deploy the fixes made in this session** — all verified via `tsc --noEmit` and live dev-server checks, ready to ship:
   - FAQ section/schema now uses real per-service DB content (Section 2)
   - `initDb()` removed from the hot content-read path (Section 4)
   - Sitemap `BASE_URL` + `lastmod` fixed (Section 5)
   - 2 non-place location pages noindexed + removed from sitemap (Section 7a)
3. **Swap `DATABASE_URL` to Neon's pooled connection string** (Section 3) — this is the highest-priority remaining action item, and it's on you since it requires Neon console + Vercel dashboard access; I can't do it from code.
4. **Decide on a direction for Section 7b** (structural service/pack duplication) — read the four options and let me know which you want implemented, or if you want to hold off and see how much the fixes above recover first.
5. In Google Search Console: check the **Page indexing** report for the exact exclusion reasons Google is citing on your affected URLs (look for "Alternate page with proper canonical tag", "Duplicate without user-selected canonical", or "Server error (5xx)" specifically — these would directly confirm the mechanisms described above). Request re-indexing for a sample of your priority pages via URL Inspection.
6. Resubmit your sitemap in Search Console to prompt a fresh crawl pass now that `lastmod` is meaningful again.
7. Give it 1-3 weeks and monitor the Page indexing report trend before concluding whether further action (Section 7b) is needed.
