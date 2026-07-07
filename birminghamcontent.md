# Birmingham, Alabama — Whole-Page Content Generation System

Grounded in the live codebase and in the 8 reference pages in `/docs`
(`17 june - Startup Consulting (Aakritee) (1–8).docx`), whose voice, local
specificity, and SEO structure this system reproduces.

- Route: `app/[keyword]/[location]/page.tsx`
- Data: `lib/franchise-keywords.ts`, `lib/target-locations.ts`, `lib/city-context.ts`, `lib/geo-content.ts`
- Content lookup: `lib/city-service-content.ts`
- Shared section component: `components/WhyIBGIsDifferent.tsx`
- Generated content file: `json/birminghamcontentex.json`
- Generator: `scripts/generate-birmingham-content.mjs` (`npm run generate:birmingham-content`)

---

## 1. What This System Does

Birmingham (`birmingham-al`) has **123 live service pages** — one per hardcoded slug in `lib/franchise-keywords.ts` (`/{service-slug}/birmingham-al`).

The system generates the **entire page** per service from a single **compound-key content record** (`{serviceSlug}::birmingham-al`), 123 distinct records total. Every heading, paragraph, list item, card, testimonial, FAQ, and section label on a Birmingham service page comes from that record. Each record is:

- **Reader-first and problem-driven.** It is written for a buyer actively looking for the service. It leads with the problem the reader is trying to solve, then shows how we solve it and the concrete deliverables they get — not vague "consulting" language.
- **Genuinely service-specific.** Each service resolves to a **service-knowledge pack** (§2) carrying that discipline's real problems, six concrete deliverables, its own terminology, and five service-specific mistakes. So `franchise-local-seo-services` talks about the Google map pack, NAP consistency, and neighborhood landing pages, while `startup-funding-consulting` talks about the data room, financial model, and capital strategy. The pages share almost no language.
- **Locally expert.** Every section explains how the **Central Alabama market specifically impacts this service** (map-pack competition in Homewood/Hoover, a capital environment that rewards proven unit economics, relationship-driven business development, corridor-based expansion along Highway 280/I-459, etc.) — real practical insight, no fabricated statistics.
- **SEO-structured.** Service name + city + **state** appear in the H1 and every location-naming heading (ending with "Birmingham, Alabama"); county, metro, sector, and discipline keywords appear naturally throughout.
- **Non-reusable.** Because the copy is built from the service's own problems/deliverables/terminology *and* Birmingham-specific market insight, it cannot be reused for another city or another service without a major rewrite.
- **Backward-compatible.** The page falls back to the original category/tier/industry helpers for every other city, so all 349 non-Birmingham cities render exactly as before. Zero risk.

### The core mechanism: service-knowledge packs

`scripts/generate-birmingham-content.mjs` defines ~26 **topic packs** (local SEO, paid media, social, content, website, branding, lead generation, sales funnel, CRM/automation, AI marketing, analytics, reputation, fundraising, pitch deck, investor relations, franchise growth/expansion, local/multi-unit franchise marketing, operations, advisory/coaching, growth/scaling, startup GTM, business development, small business, entrepreneur, generic marketing, generic consulting). Each service is matched to exactly one pack by slug keywords. A pack carries:

```
{
  discipline, readerGoal, outcome,
  problems:      [3]  // the reader's real pain points (drive hero, pain points, mistakes, market analysis)
  deliverables:  [6]  // concrete {title, icon, desc} work products (drive the Services section, definition, FAQ, case study)
  terms:         [~6] // service-specific terminology (drive expertise cards)
  mistakes:      [5]  // service-specific {mistake, consequence, solution}
  localAngle:    [2]  // how the Central Alabama market specifically impacts THIS service
}
```

The generator weaves the pack fields with a rotating institution/industry anchor and the Birmingham vocabulary, so content is problem-first, deliverable-driven, locally expert, and unique per service.

---

## 2. House Style (learned from `/docs`)

Follow these rules for every field. They are what make the copy read as valuable to a real buyer, service-specific, and locally authored rather than templated:

0. **Write for the reader, problem-first.** Assume the reader is actively looking for this exact service. Open by naming the problem they feel, then show how the service solves it and the concrete deliverables they get. Value the reader's time — every section should teach or reassure, not just describe the agency.
0b. **Show real deliverables, not vague retainers.** The Services section must list specific, nameable work products (e.g. "Google Business Profile Optimization", "Data Room & Diligence Prep", "Full Funnel Audit") with a one-line description of what each produces — never generic "strategy" and "consulting" cards.
0c. **Use the discipline's own terminology.** Speak the language of the specific service (map pack, NAP, cost per acquisition, cap table, unit economics, funnel drop-off, review velocity…), applied to Birmingham — not interchangeable consulting language.
0d. **Explain how the local market impacts THIS service**, not just that we serve the city (e.g. "Birmingham local search is crowded with Homewood and Hoover competitors, so ranking here means winning neighborhood-level intent"). This is the practical-expertise signal.
0e. **Every section does a DIFFERENT job — no concept repeats across the page.** This is the single most important rule. The page should move problem → economy → buyer behavior → method → deliverables → insight → demand → outcome, with each section carrying a *different* idea. Never restate the same pain point, outcome, or "we deliver real work" message in reworded form across multiple sections. Give each distinctive sentence exactly **one home** (see the section→dimension map below) and do not reuse it — not even paraphrased — anywhere else on the page. Vary sentence openers and structure section to section.
1. **Voice.** Long, flowing, confident sentences. Consulting register. Address the reader's real situation, then show local understanding.
2. **No fabricated statistics.** Never invent percentages, dollar figures, or counts. Establish authority through named institutions and geography instead (the only hard numbers allowed are the fixed, sourced city-level figures in §3's `marketData`).
3. **Ground every section in Central Alabama specifics** — rotate through the vocabulary below so no two pages name-drop the same things:
   - **Region term:** *Central Alabama* (this is the Market Region — **not** "Southeast").
   - **Counties:** Jefferson County, Shelby County, "Jefferson and Shelby Counties".
   - **Metro:** Birmingham-Hoover Metropolitan Statistical Area / "Birmingham metro".
   - **Institutions:** Innovation Depot, UAB (University of Alabama at Birmingham), the Birmingham Business Alliance, SCORE Birmingham.
   - **Talent pipeline:** UAB, Samford, Jefferson State.
   - **Employers/anchors:** Regions, Protective Life.
   - **Corridors:** Highway 280, I-459.
   - **Suburbs (for testimonials + color):** Homewood, Vestavia Hills, Mountain Brook, Hoover, Pelham, Trussville, Bessemer, Gardendale.
   - **Capital sources:** local angel networks, SBA programs through Alabama banking partners, the regional investor community, revenue-based financing.
   - **Sectors:** healthcare, financial services, advanced manufacturing, logistics, professional services, construction.
4. **Headings carry city + state, with the state at the end.** Every heading that names the location ends with **"Birmingham, Alabama"** (city immediately followed by state, at the end of the heading). This applies to the hero H1 and the Services, Industries, Common Mistakes, Process, and Market Analysis headings. (The "Why We're Different / How We Provide Value" section headers keep the docs' native phrasing, e.g. "Why Birmingham Founders Choose Iconic Brand Group for {Service}".)
5. **Testimonials** end with: `— {Full Name}, {Role}, {Company Type}, {Suburb}, Alabama`.
6. **Market Classification** is a descriptive phrase, not a bare tier — e.g. "Tier 2 Regional Metro with a Strong Healthcare Base", "Emerging Tier 2 Market with Growing Financial Services Demand".

---

## 3. Birmingham Reference Profile (fixed for all 123 runs)

```json
{
  "citySlug": "birmingham-al",
  "city": "Birmingham",
  "state": "Alabama",
  "stateAbbr": "AL",
  "cityState": "Birmingham, Alabama",
  "county": "Jefferson County",
  "secondaryCounty": "Shelby County",
  "metro": "Birmingham-Hoover Metropolitan Statistical Area",
  "marketRegion": "Central Alabama",
  "tier": "Tier 2 Regional Metro",
  "localInstitutions": ["Innovation Depot", "UAB (University of Alabama at Birmingham)", "the Birmingham Business Alliance", "SCORE Birmingham"],
  "talentPipeline": ["UAB", "Samford", "Jefferson State"],
  "anchors": ["Regions", "Protective Life"],
  "corridors": ["Highway 280", "I-459"],
  "suburbs": ["Homewood", "Vestavia Hills", "Mountain Brook", "Hoover", "Pelham", "Trussville", "Bessemer", "Gardendale"],
  "industries": ["healthcare and biotech", "banking and financial services", "advanced manufacturing", "logistics"],
  "marketData": {
    "populationRange": "1.1M+ (Birmingham-Hoover MSA)",
    "businessCount": "30,000+ establishments",
    "medianHouseholdIncome": "$58,000–$64,000",
    "yearOverYearGrowth": "1.8–2.6%",
    "smallBusinessShare": "99.4% of Alabama businesses",
    "source": "U.S. Census Bureau ACS, BLS QCEW, SBA Alabama Small Business Profile"
  }
}
```

### Anchor rule (the core of per-service uniqueness)

For each service, pick **ONE** institution and **ONE** industry to anchor that page:

| If the service is about… | Anchor institution | Anchor industry |
|---|---|---|
| funding / capital / investors / advisory | Innovation Depot **or** UAB **or** the Birmingham Business Alliance | healthcare & biotech / financial services |
| SEO / digital / tech / data / content | UAB **or** Innovation Depot | advanced manufacturing / healthcare & biotech |
| operations / process / territory / development / growth | the Birmingham Business Alliance **or** SCORE Birmingham | logistics / advanced manufacturing |
| small business / entrepreneur / owner / marketing / brand | SCORE Birmingham **or** the Birmingham Business Alliance | banking & financial services |

Rotate the lead anchor across the 123 pages; never use all four institutions/industries in one run.

---

## 4. The Per-Service Prompt (generates the WHOLE page)

Run once per service slug (123 runs). Only `SERVICE_SLUG`, `SERVICE_NAME`, `SERVICE_CATEGORY`, `SERVICE_DESCRIPTION` change; everything else is fixed.

```
You are writing web copy for Iconic Brand Group for exactly one page:
/{{SERVICE_SLUG}}/birmingham-al

This is one of 123 Birmingham service pages, all generated the same way. Match
the voice of the reference pages: long, confident, consulting-register
sentences grounded in real Central Alabama specifics, with NO fabricated
statistics. Your output for THIS service must be distinguishable from all 122
others on first read.

FIXED BIRMINGHAM PROFILE (see section 3): city Birmingham, Alabama; counties
Jefferson and Shelby; metro Birmingham-Hoover MSA; region CENTRAL ALABAMA;
institutions Innovation Depot, UAB, Birmingham Business Alliance, SCORE
Birmingham; talent pipeline UAB / Samford / Jefferson State; anchors Regions
and Protective Life; corridors Highway 280 and I-459; suburbs Homewood,
Vestavia Hills, Mountain Brook, Hoover, Pelham, Trussville, Bessemer,
Gardendale; sectors healthcare, financial services, advanced manufacturing,
logistics, professional services, construction. Fixed market-data figures as
listed in section 3 (the ONLY hard numbers you may use).

THIS SERVICE: slug {{SERVICE_SLUG}}, name {{SERVICE_NAME}}, category
{{SERVICE_CATEGORY}}, description (context only) {{SERVICE_DESCRIPTION}}.

ANCHOR RULE: pick ONE institution + ONE industry per the section-3 mapping and
lead with them; rotate across services.

HEADING RULE: every heading that names the location ends with
"Birmingham, Alabama" (city then state, at the end). Applies to the hero H1 and
the Services, Industries, Common Mistakes, Process, and Market Analysis
headings.

STEP 0 — BUILD THE SERVICE KNOWLEDGE PACK FIRST (do this before writing any
section). For THIS specific service, write each of the following ONCE, as a
distinct, self-contained sentence. Each has exactly one section home (see the
map below); do not repeat or paraphrase it anywhere else on the page.
  - readerGoal: the outcome the buyer is searching for.               [→ Hero]
  - outcome: the concrete result the service produces.        [→ Hero / value]
  - problems: 3 real pain points a buyer of THIS service feels.  [→ Pain points]
  - deliverables: 6 nameable work products + one-line descriptions.
                                       [→ Services, and woven into a few others]
  - terms: 5–6 pieces of the discipline's own terminology.     [→ Expertise card]
  - mistakes: 5 service-specific {mistake, consequence, solution}.  [→ Mistakes]
  - marketDynamics: how Birmingham's economy/industry structure shapes demand
    for THIS service.                                        [→ Overview body]
  - demandDriver: what is CHANGING in the local market that drives demand now.
                                                        [→ Market Analysis body]
  - buyerBehavior: how Birmingham buyers of this service actually evaluate and
    decide.                                            [→ Overview 2nd paragraph]
  - approach: the distinctive method/sequence — how we actually do the work.
                                                          [→ "How We Work" card]
  - insight: one non-obvious, expert POV about this service.     [→ Expert quote]
  - value: four DISTINCT levers (money, time, risk, status), each a different
    economic mechanism specific to the service — never a restated problem.
                                                              [→ Value pillars]

Because each dimension has a single home, no section repeats another. The page
is problem-first, deliverable-driven, and impossible to reuse for another
service or city.

SECTION → DIMENSION MAP (each section does a different job):
  Hero              → readerGoal + outcome (the promise)
  TL;DR             → who + outcome + first deliverables (a one-line recap)
  Overview body     → marketDynamics (the local economy)
  Overview 2nd      → buyerBehavior (how buyers decide)
  Why We're Diff #1 → approach (our method)
  Why We're Diff #2 → deliverables (name two)
  Why We're Diff #3 → local institution/ecosystem tie
  Why We're Diff #4 → engagement model (senior-led / sized-for-Birmingham / we stay)
  Why We're Diff #5 → discipline expertise (terms)
  Why We're Diff #6 → accountability to the outcome
  Value pillars     → the four distinct value levers
  Definition        → what the service IS + what it combines (deliverables)
  Expert quote      → insight (the POV)
  Market body       → demandDriver (what's changing)
  Market opportunity→ the opening for a provider who does it right
  Market challenge  → the "commodity/imported playbook" trap
  Market strategy   → localization + named deliverables
  Services          → the 6 deliverables verbatim
  Industries        → how the service differs by sector
  Pain points       → the 3 problems
  Mistakes          → the 5 service-specific mistakes
  Case study        → a problem→method→outcome narrative
  Process           → 4 steps anchored to the deliverables (audit→prioritize→build→measure)
  FAQ               → 5 different buyer questions (included / vs national / cost / timeline / why local / results)

GENERATE EVERY SECTION BELOW. Output valid JSON only, matching section 5.

=== HERO (top <section>) ===
- hero.headline: "{{SERVICE_NAME}}" + a natural connector, ENDING with
  "Birmingham, Alabama" (e.g. "{{SERVICE_NAME}} in Birmingham, Alabama",
  "Trusted {{SERVICE_NAME}} in Birmingham, Alabama"). The page highlights the
  word "Birmingham" in gradient and shows ", Alabama" after it.
- hero.subtext: 30–45 words. Lead with the reader's PROBLEM (pack.problems[0])
  or goal (pack.readerGoal), then say we solve it and the outcome; name
  Birmingham + Central Alabama; contrast with "national playbooks."
- hero.trustBadges: exactly 3, doc-style phrases (e.g. "{{SERVICE_NAME}}
  Serving Birmingham's {Audience} Community", "Strategy Rooted in Central
  Alabama Market Intelligence", "{{SERVICE_NAME}} for Jefferson and Shelby
  County Businesses").

=== WHY IBG IS DIFFERENT — header (WhyIBGIsDifferent.tsx, row 1) ===
- differentiation.differentLabel: short eyebrow (e.g. "Our Difference",
  "Central Alabama Expertise").
- differentiation.differentHeadingLead + differentHeadingHighlight: rendered as
  "{lead} {highlight}" with {highlight} in gradient. Use the docs' phrasing,
  e.g. lead "Why Birmingham {Audience} Choose Iconic Brand Group for",
  highlight "{{SERVICE_NAME}}".
- differentiation.differentIntro: 2 sentences, doc voice, anchored.

=== WHY IBG IS DIFFERENT — 6 cards ===
- whyDifferent: exactly 6 {title, description}, 35–55 words each, covering:
  (1) "we start with your actual problem" — name pack.problems[0];
  (2) "real deliverables, not slide decks" — name 2 pack.deliverables;
  (3) how the local market works for this service — pack.localAngle;
  (4) connection to the anchored institution; (5) genuine discipline expertise —
  use pack.terms; (6) accountability to the outcome.

=== HOW IBG PROVIDES VALUE — header (row 2) ===
- differentiation.valueLabel; valueHeadingLead + valueHeadingHighlight
  (e.g. lead "The Value {{SERVICE_NAME}} Delivers for", highlight "Birmingham
  {Audience}"); valueIntro (names money, time, risk, status);
  valueClosing (one italic closing line).

=== HOW IBG PROVIDES VALUE — 4 pillars ===
- valuePillars.money / time / risk / status: 35–50 words each. MONEY = capital
  mistakes avoided. TIME = compressed learning curve / local knowledge. RISK =
  open with "We help mitigate risk by providing strategic guidance,
  experienced oversight, and advisory support that helps Birmingham clients
  avoid costly {{service}} mistakes." then a category-specific failure mode.
  STATUS = credibility with lenders/investors/partners.

=== TL;DR (intro "At a Glance") ===
- tldr: 40–60 words, opens "{{SERVICE_NAME}} in Birmingham, Alabama:", names
  the anchored industry + institution, ends "Call (813) 263-6762 for a free
  consultation."

=== OVERVIEW (id="overview") ===
- trustedPartner.heading: names {{SERVICE_NAME}} + Birmingham (doc phrasing).
- trustedPartner.body80Words: ~80 words; name Jefferson County or the metro,
  reference the anchored industry, and at least one of {Regions / Protective
  Life / the UAB–Samford–Jefferson State pipeline / Highway 280 / I-459}.
- overview.secondaryParagraph: 30–45 words (launch vs. scale framing).
- trustedPartner.testimonial: {quote, name, role, industry}. Role formatted
  "{Role}, {Company Type}, {Suburb}, Alabama". New persona per service.
- trustedPartner.fiveQuickFacts: exactly 5, under ~16 words, no repeated
  opener.

=== DEFINITION (id="definition") ===
- definition.term ({{SERVICE_NAME}}); definition (40–60 words) that defines the
  service by the PROBLEM it solves and the outcome it produces in Birmingham;
  keyComponents = the first 5 pack.deliverables titles.

=== EXPERT QUOTE ===
- expertQuote {quote (30–45 words), name, title (advisor-style, e.g. "Central
  Alabama Business Advisor"), context ("On …")}.

=== MARKET DATA (id="market-data") ===
- marketData: the fixed section-3 figures verbatim + primaryIndustryFocus =
  anchored industry (title case). NEVER invent new numbers.

=== MARKET ANALYSIS (id="market-analysis") ===
- marketAnalysis.heading (ends "Birmingham, Alabama" or "Birmingham {{SERVICE}}
  Landscape"); body40Words (~40 words, anchored); bullets {marketOpportunity,
  keyChallenge, ourStrategy} 35–60 words each. Frame them from the reader:
  marketOpportunity = demand for solving pack.problems[0]; keyChallenge =
  pack.problems[1] and the trap of generic/imported solutions; ourStrategy =
  how we solve it with real deliverables. snapshot {marketRegion "Central
  Alabama", metroArea "Birmingham-Hoover Metropolitan Statistical Area",
  marketClassification (descriptive, unique per service), state "Alabama"}.

=== SERVICES (id="services") — THE DELIVERABLES SECTION ===
- services.heading (ends "Birmingham, Alabama"); subtext; items = the 6
  pack.deliverables verbatim: {title (a real, nameable work product),
  description (15–25 words on what it produces), icon (single emoji)}. These
  MUST be concrete deliverables, not generic "strategy/consulting" cards.

=== INDUSTRIES (id="industries") ===
- industries.heading (ends "Birmingham, Alabama"); intro (names the sector list,
  leads with the anchored industry, ties to the service's problem); tags (the 6
  sectors, title case); painPoints = the 3 pack.problems (the reader's real
  pain points for THIS service).

=== COMMON MISTAKES (id="mistakes") ===
- commonMistakes.heading; subtext; items = the 5 pack.mistakes {mistake,
  consequence, solution}, each specific to THIS service in Birmingham (not
  generic marketing mistakes).

=== CASE STUDY (id="case-study") ===
- caseStudy {badge (e.g. "Central Alabama Success Story"), headline, result
  (a QUALITATIVE outcome, not an invented %), description (2–3 sentences,
  anchored), industry (anchored industry, title case), delivered (exactly 4
  bullets)}.

=== PROCESS (id="process") ===
- process.heading (ends "Birmingham, Alabama"); subtext; steps = exactly 4
  {title, description} (Discovery/Audit → Strategy → Implementation → Measure/
  Scale), Birmingham-flavored.

=== FAQ (id="faq") ===
- faqs = exactly 5 {question, answer}, chosen from: "what does this service
  actually include" (answer lists real deliverables), "how is this different
  from a national firm", "what does it cost", "how quickly will I see results",
  "do you work with new and established businesses", "why does local Birmingham
  experience matter for this service" (answer uses pack.localAngle). Answers
  reference the anchored industry/institution + the metro.

=== SOURCES ===
- sources = exactly 4 {text, source}. Real Alabama/Birmingham + national
  sources (SBA Alabama, Birmingham Business Alliance, UAB, Innovation Depot,
  Google/Census). No fabricated organizations.

HARD RULES:
1. No fabricated statistics or organizations beyond the fixed profile.
2. No reused sentence, lead-in, testimonial persona, heading, or
   marketClassification across services in this run.
3. NO CONCEPT REPEATS ACROSS SECTIONS on the same page. Each STEP-0 dimension
   appears in exactly one section (its home). Do not restate the same problem,
   outcome, or "we deliver real work" message — even paraphrased — in a second
   section. Every section must add new information and do a different job.
4. Respect every exact count (3 badges, 6 diff cards, 4 pillars, 5 quick
   facts, 5 key components, 6 service cards, 3 pain points, 5 mistakes, 4
   delivered, 4 process steps, 5 FAQs, 4 sources).
5. Every location-naming heading ends with "Birmingham, Alabama".
6. Output valid JSON only, matching section 5.
```

---

## 5. Output Schema (matches `CityServiceContent` in `lib/city-service-content.ts`)

```json
{
  "key": "{{SERVICE_SLUG}}::birmingham-al",
  "hero": { "headline": "… Birmingham, Alabama", "subtext": "", "trustBadges": ["", "", ""] },
  "tldr": "",
  "overview": { "secondaryParagraph": "" },
  "whyDifferent": [ { "title": "", "description": "" } ],
  "differentiation": {
    "differentLabel": "", "differentHeadingLead": "", "differentHeadingHighlight": "", "differentIntro": "",
    "valueLabel": "", "valueHeadingLead": "", "valueHeadingHighlight": "", "valueIntro": "", "valueClosing": ""
  },
  "valuePillars": { "money": "", "time": "", "risk": "", "status": "" },
  "trustedPartner": {
    "heading": "", "body80Words": "",
    "testimonial": { "quote": "", "name": "", "role": "{Role}, {Company Type}, {Suburb}, Alabama", "industry": "" },
    "fiveQuickFacts": ["", "", "", "", ""]
  },
  "definition": { "term": "", "definition": "", "keyComponents": ["", "", "", "", ""] },
  "expertQuote": { "quote": "", "name": "", "title": "", "context": "" },
  "marketData": {
    "populationRange": "1.1M+ (Birmingham-Hoover MSA)",
    "businessCount": "30,000+ establishments",
    "medianHouseholdIncome": "$58,000–$64,000",
    "yearOverYearGrowth": "1.8–2.6%",
    "smallBusinessShare": "99.4% of Alabama businesses",
    "primaryIndustryFocus": "",
    "source": "U.S. Census Bureau ACS, BLS QCEW, SBA Alabama Small Business Profile"
  },
  "marketAnalysis": {
    "heading": "", "body40Words": "",
    "bullets": { "marketOpportunity": "", "keyChallenge": "", "ourStrategy": "" },
    "snapshot": { "marketRegion": "Central Alabama", "metroArea": "Birmingham-Hoover Metropolitan Statistical Area", "marketClassification": "", "state": "Alabama" }
  },
  "services": { "heading": "… Birmingham, Alabama", "subtext": "", "items": [ { "title": "", "description": "", "icon": "" } ] },
  "industries": { "heading": "… Birmingham, Alabama", "intro": "", "tags": ["", "", "", "", "", ""], "painPoints": ["", "", ""] },
  "commonMistakes": { "heading": "", "subtext": "", "items": [ { "mistake": "", "consequence": "", "solution": "" } ] },
  "caseStudy": { "badge": "", "headline": "", "result": "", "description": "", "industry": "", "delivered": ["", "", "", ""] },
  "process": { "heading": "… Birmingham, Alabama", "subtext": "", "steps": [ { "title": "", "description": "" } ] },
  "faqs": [ { "question": "", "answer": "" } ],
  "sources": [ { "text": "", "source": "" } ]
}
```

Required counts (enforced by the generator's validator): `whyDifferent` = 6, `trustBadges` = 3, `fiveQuickFacts` = 5, `keyComponents` = 5, `services.items` = 6, `industries.painPoints` = 3, `commonMistakes.items` = 5, `caseStudy.delivered` = 4, `process.steps` = 4, `faqs` = 5, `sources` = 4. The validator also asserts `hero.headline` ends with `Birmingham, Alabama`.

### Page section → record field map

| Page location | Record field(s) |
|---|---|
| Hero `<section>` (H1 highlights the city) | `hero.headline / subtext / trustBadges` |
| `WhyIBGIsDifferent.tsx` row 1 header | `differentiation.differentLabel / differentHeadingLead / differentHeadingHighlight / differentIntro` |
| `WhyIBGIsDifferent.tsx` row 1 cards | `whyDifferent[]` |
| `WhyIBGIsDifferent.tsx` row 2 header | `differentiation.valueLabel / valueHeadingLead / valueHeadingHighlight / valueIntro / valueClosing` |
| `WhyIBGIsDifferent.tsx` row 2 pillars | `valuePillars.money / time / risk / status` |
| TL;DR "At a Glance" | `tldr` |
| `#overview` | `trustedPartner.*`, `overview.secondaryParagraph` |
| `#definition` | `definition.*` |
| Expert quote band | `expertQuote.*` |
| `#market-data` | `marketData.*` (+ `marketAnalysis.snapshot.marketClassification`) |
| `#market-analysis` | `marketAnalysis.*` (Market Region renders **Central Alabama**) |
| `#services` | `services.*` |
| `#industries` | `industries.*` |
| `#mistakes` | `commonMistakes.*` |
| `#case-study` | `caseStudy.*` |
| `#process` | `process.*` |
| `#faq` | `faqs[]` |
| Sources & References | `sources[]` (+ `marketData.source`) |

Static/structural blocks intentionally NOT generated (identical by design): breadcrumb, CTA buttons + phone/email (real NAP), Table of Contents, `TrustedBy`, `IBGCarousel`, `WhyChooseUs`, Nearby Service Areas, Related Services.

---

## 6. Wiring Into the Code

1. **`lib/city-service-content.ts`** — `getCityServiceContent(serviceSlug, citySlug)` looks up `{serviceSlug}::{citySlug}` in `json/birminghamcontentex.json`; returns a typed `CityServiceContent` or `undefined`.
2. **`app/[keyword]/[location]/page.tsx`** — reads `cityServiceContent?.<field> ?? <original helper>` for every section, so Birmingham renders generated content and every other city is byte-for-byte unchanged. The hero splits the headline on the city name to gradient-highlight `Birmingham`, so an H1 ending `… Birmingham, Alabama` renders `… [Birmingham], Alabama`.
3. **`components/WhyIBGIsDifferent.tsx`** — accepts `copy={cityServiceContent?.differentiation}` (labels, heading lead + gradient highlight, intros, closing line) with the original hardcoded copy as the fallback.

---

## 7. Batch Generator

`scripts/generate-birmingham-content.mjs` (run via `npm run generate:birmingham-content`) produces `json/birminghamcontentex.json`. It reads the 123 slugs from `lib/franchise-keywords.ts`, seeds a deterministic per-record RNG from each compound key (so output is stable/diffable yet varied), selects the institution/industry anchor, fills every field from doc-voice variant banks, validates the counts + the heading rule, and writes atomically.

```bash
# Full deterministic regenerate (recommended after edits)
npm run generate:birmingham-content -- --no-preserve-existing

# Preview without writing
node scripts/generate-birmingham-content.mjs --dry-run

# First N services to a scratch file
node scripts/generate-birmingham-content.mjs --no-preserve-existing --limit=3 --output=json/_sample.json
```

> Using an LLM instead of the deterministic banks? Feed the §4 prompt per service, append a running "DO NOT REUSE" list of prior testimonial names / headings / marketClassification strings, and write each returned object under `{{SERVICE_SLUG}}::birmingham-al`. Validate against §5 before saving.

---

## 8. Verification Checklist

- `npx tsc --noEmit` — no type errors.
- Every `hero.headline` ends with `Birmingham, Alabama`; Services/Industries/Mistakes/Process/Market-Analysis headings end with it too.
- Market Analysis snapshot renders **Central Alabama** as the region and a descriptive Market Classification.
- Testimonials read `— Name, Role, Company Type, Suburb, Alabama`.
- No `undefined` appears anywhere in `json/birminghamcontentex.json`.
- A Birmingham page renders unique content in every section; a non-Birmingham page (e.g. `/…/austin-tx`) renders the original defaults.
- The **Services** section lists real, nameable deliverables specific to the discipline (a local-SEO page shows "Google Business Profile Optimization"; a fundraising page shows "Data Room & Diligence Prep") — never generic strategy/consulting cards.
- **Pain points** and **common mistakes** are specific to the service (the discipline's own failure modes), not generic marketing mistakes.
- Deliverable sets are distinct per topic pack (≈26 signatures across the 123), and every hero subtext is unique.
- Side-by-side, two different services (e.g. `franchise-local-seo-services` vs `startup-funding-consulting`) share almost no language — the copy cannot be reused across services or cities without a major rewrite.
- **No sentence or concept repeats across sections within a single page.** Each section does a different job (economy, buyer behavior, method, deliverables, insight, demand, value levers, outcome). The generator enforces this; a quick audit that splits every section into sentences and checks for cross-section duplicates should return zero.
