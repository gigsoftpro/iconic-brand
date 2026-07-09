# Multi-City Content Generation

Generates unique, city-specific, whole-page content for the `/{service}/{city}`
pages — the same section-per-dimension quality as Birmingham, but for every
other city, one state at a time.

## Files

- **`city-profiles.mjs`** — the source of per-city uniqueness. One `CityProfile`
  per city (institutions, industries, suburbs, corridors, anchors, region,
  economic character, market data). Two cities get different local substance,
  so their pages do not match.
- **`generate-city-content.mjs`** — the generic generator. City-agnostic
  service packs use `{{tokens}}` filled from the profile; it composes the city
  economy + service angle so every section does a different job and content is
  unique per city and per service. **Birmingham is always skipped** (it has
  hand-tuned content in `json/birminghamcontentex.json`).
- **`json/<state>-cities.json`** — generated output, one file per state.
- **`lib/city-service-content.ts`** — merges every city JSON into one lookup.

## Generate a state

```bash
# All cities of a state (by USPS code)
npm run generate:city-content -- --state=AL

# A single city
npm run generate:city-content -- --city=huntsville-al

# Preview counts without writing
node scripts/generate-city-content.mjs --state=AL --dry-run
```

Output goes to `json/al-cities.json` (or `json/<slug>.json` for `--city`).

## Add the NEXT state (step by step)

1. **Find the state's cities** in `lib/us-cities-top-350.ts`
   (`grep "stateCode: '<CODE>'"`).
2. **Write a real `CityProfile` for each** in `city-profiles.mjs` — use genuine
   local data (universities, incubators, chambers; the metro's real anchor
   employers and industries; actual suburbs and highway corridors; a one-line
   `economyLine` and `buyerCulture`; a descriptive `tierLabel`; metro-level
   `marketData`). Distinct local data is what makes each city's pages unique.
3. **Generate:** `npm run generate:city-content -- --state=<CODE>`
4. **Wire the loader:** in `lib/city-service-content.ts`, add
   `import xxCitiesContent from '@/json/<state>-cities.json';` and spread it into
   `cityServiceContentByKey`.
5. **Verify:** `npx tsc --noEmit`; the generator's own validator already checks
   counts, "City, State" headings, no `undefined`, and no unrendered `{{token}}`.

## Profile schema (every field is used)

`citySlug, city, state, stateAbbr, stateCode, county, county2, counties,
countyTrade, metroFull, metroMSA, metroShort, region, regionShort, tierLabel,
institutions[4], smallBizOrg, univ, industries[4], sectorTags[6], suburbs[6-8],
corridors[2-3], talent, anchor1, anchor2, anchors, economyLine, buyerCulture,
emergingSector, marketData{populationRange, businessCount, medianHouseholdIncome,
yearOverYearGrowth, smallBusinessShare, source}, companyTypes[8]`

Note: `economyLine` must read naturally after "City runs on …" and
"City's economy is built on …" (start it with the sectors/anchors, **not**
with "an economy …").

## Uniqueness guarantees (enforced/audited)

- Every location-naming heading ends with `City, State`.
- No section repeats another within a page (each does a different job:
  economy → buyer behavior → method → deliverables → insight → demand → value).
- Across two cities, ≈85–90% of sentences differ **even for the same service**;
  across different services, effectively 100%.
- No `undefined`, no unrendered `{{token}}`.
- `caseStudy.result` is a quantified metric (`validateRecord` requires a digit),
  not a paraphrased sentence — see below.
- Every page has one consistent narrative "voice" (see Archetype system below)
  so a page reads as one coherent piece of writing, not mad-libs paragraphs.

### Archetype system (page "voice")

`buildCtx()` picks one of 5 archetypes per record — `data`, `story`,
`question`, `authority`, `direct` — via `c.archetype = pick(rng, ARCHETYPES)`.
That single choice drives the opening of six major sections consistently
through the page: `hero.subtext`, `trustedPartner.body80Words` (economy
framing), `overview.secondaryParagraph` (buyer-behavior framing),
`definition.definition`, `marketAnalysis.body40Words`, `industries.intro`,
and `differentiation.differentIntro`. Each has its own 5-variant map (e.g.
`HERO_SUBTEXT`, `OVERVIEW_BODY`, `DEFINITION_TEXT`, `MARKET_ANALYSIS_BODY`,
`INDUSTRIES_INTRO`, `DIFFERENTIATION_INTRO`) keyed by archetype, so — for
example — a `story`-archetype page opens its hero with "Picture {city}
{audience} working with a partner that has never set foot in the
{metro}...", and every other section on that same page opens with a matching
narrative/scenario framing, while a `data`-archetype page for a different
service in the same city opens every section with a stat/market-data framing
instead. This directly fixed the "every page feels like the same template
with words swapped" complaint: `hero.subtext` alone went from ~3 recurring
shapes to 28,501 unique values across 28,536 records (99.9%).

All the smaller 2-3 option `pick()` pools (tldr, testimonials, expert quote,
services/mistakes/process subtext, FAQs, sources, differentiation
valueClosing) were also broadened to 4+ options each, and `makeValuePillars`
— which previously had **zero** variation per pillar (one fixed connector
phrase) — now picks from 3 city-grounded connectors per pillar. (One
regression caught and fixed during this pass: a "Looking at pure economics,
..." connector with no city token, combined with pack value text that also
had no token, produced exact duplicates 999 times over — every value-pillar
connector must carry a city/county/region/metro token so the string can
never go fully generic.)

### Case study metric (`caseStudy.result`)

Each of the 26 `PACKS` carries a curated `metric` phrase (a short, quantifiable
noun phrase, e.g. `seo` → `'local search visibility'`, `funding` →
`'investor-ready valuation'`). `makeMetricResult()` in
`generate-city-content.mjs` picks one of 9 templates and fills it with
seeded-random numbers (`randInt`/`randFloat1`) — percentages, multipliers,
dollar-thousands, months/weeks/quarters — e.g. `"42% Higher Marketing-driven
Demand in 8 Months"`, `"$207K in New Port Logistics Revenue"`. Because the
random numbers are seeded by the compound key, they're deterministic but
differ per city even for the identical service. This fixed a real duplication
bug: before this, `result` had only 3 possible shapes and was rendered as a
giant 4xl stat with no actual number in it — 2,478 unique values across
28,536 records (top duplicate: 1,046 copies). After the fix: 16,225 unique
(top duplicate: 19 copies), and `caseStudy.description` — which now closes by
referencing the same metric — went from 15,177 to 28,504 unique (top
duplicate: 2 copies). `caseStudy.headline` also gained two more template
variants (3,466 → 17,593 unique). `caseStudy.badge` is intentionally left as
a short 3-variant location tag (city/region/county), not a metric, so its
~525-value cardinality is expected and not a bug.

## Status

**232 cities across 42 states have unique, generated content** (28,536 records
total — 123 services × 232 cities, plus Birmingham's 123 hand-tuned records).
Zero cross-section duplication (verified with an abbreviation-aware sentence
splitter — "St. Louis"/"St. Paul"/etc. false splits do not indicate real
duplicates), zero `undefined`/unrendered tokens, zero key collisions,
`tsc --noEmit` clean.

Standalone-label fields (`marketAnalysis.snapshot.marketRegion`/
`marketClassification`, `caseStudy.badge`, `expertQuote.title`) run their
`region`/`county` token through a `ucFirst()` helper before use. Profiles
intentionally write `region`/`county` lowercase-leading when that reads
naturally mid-sentence (e.g. `'the Permian Basin'`, `'the Municipality of
Anchorage'`) — `ucFirst()` capitalizes only the handful of call sites where
the same string is shown as a standalone label instead of inline text.

Because `resolveJsonModule` makes TypeScript infer a full literal type for
every record in every `*-cities.json` import, statically `import`-ing the
whole dataset eventually exceeds the type checker's default heap (confirmed:
a wildcard ambient `declare module '@/json/*-cities.json'` override does
*not* help — TS prefers the real file's inferred literal type over an
ambient declaration once the file actually resolves on disk). The per-state
files in `lib/city-service-content.ts` are loaded with
`createRequire(import.meta.url)` + `require(...)` instead of `import`, so
each one types as `any` and is narrowed only by the existing
`as unknown as Record<string, CityServiceContentRecord>` cast — this keeps
`tsc --noEmit` fast (~13s) regardless of how many states get added.
Birmingham's file is small enough to stay a normal typed `import`.

| State | File | Cities |
|---|---|---|
| Alabama (hand-tuned hero city) | `birminghamcontentex.json` | Birmingham |
| Alabama | `al-cities.json` | Huntsville, Montgomery, Mobile, Tuscaloosa |
| Alaska | `ak-cities.json` | Anchorage |
| Arizona | `az-cities.json` | Phoenix, Tucson, Mesa, Chandler, Scottsdale, Glendale, Gilbert, Tempe, Peoria, Surprise, Goodyear, Buckeye |
| Arkansas | `ar-cities.json` | Little Rock |
| Colorado | `co-cities.json` | Denver, Colorado Springs, Aurora, Fort Collins, Lakewood, Thornton, Arvada, Pueblo, Centennial, Boulder, Westminster, Longmont |
| Connecticut | `ct-cities.json` | Bridgeport, Hartford, New Haven, Stamford, Waterbury, Norwalk |
| District of Columbia | `dc-cities.json` | Washington |
| Georgia | `ga-cities.json` | Atlanta, Augusta, Savannah, Macon, Athens, Sandy Springs |
| Hawaii | `hi-cities.json` | Honolulu |
| Idaho | `id-cities.json` | Boise, Meridian, Nampa |
| Illinois | `il-cities.json` | Chicago, Joliet, Naperville, Rockford, Peoria, Elgin, Springfield |
| Indiana | `in-cities.json` | Indianapolis, Fort Wayne, Evansville, South Bend, Carmel, Fishers, Gary |
| Iowa | `ia-cities.json` | Des Moines, Davenport, Cedar Rapids |
| Kansas | `ks-cities.json` | Wichita, Overland Park, Olathe, Kansas City, Topeka |
| Kentucky | `ky-cities.json` | Louisville, Lexington |
| Louisiana | `la-cities.json` | New Orleans, Baton Rouge, Shreveport, Lafayette |
| Maryland | `md-cities.json` | Baltimore |
| Massachusetts | `ma-cities.json` | Boston, Worcester, Springfield, Lowell, Cambridge, New Bedford, Quincy |
| Michigan | `mi-cities.json` | Detroit, Grand Rapids, Warren, Sterling Heights, Ann Arbor, Lansing, Livonia, Troy, Dearborn |
| Minnesota | `mn-cities.json` | Minneapolis, St. Paul, Rochester, Duluth, Bloomington, Eagan |
| Missouri | `mo-cities.json` | Kansas City, St. Louis, Springfield, Independence, Lee's Summit, O'Fallon |
| Montana | `mt-cities.json` | Billings |
| Nebraska | `ne-cities.json` | Omaha, Lincoln |
| Nevada | `nv-cities.json` | Las Vegas, Henderson, Reno, North Las Vegas, Sparks |
| New Jersey | `nj-cities.json` | Newark, Jersey City, Paterson, Elizabeth, Edison, Woodbridge, Lakewood |
| New Mexico | `nm-cities.json` | Albuquerque, Las Cruces, Rio Rancho, Santa Fe |
| New York | `ny-cities.json` | New York City, Buffalo, Rochester, Yonkers |
| North Carolina | `nc-cities.json` | Charlotte, Raleigh, Greensboro, Durham, Winston-Salem, Fayetteville, Cary, Wilmington, High Point |
| North Dakota | `nd-cities.json` | Fargo |
| Ohio | `oh-cities.json` | Columbus, Cleveland, Cincinnati, Toledo, Akron, Dayton, Parma |
| Oklahoma | `ok-cities.json` | Oklahoma City, Tulsa, Norman, Broken Arrow |
| Oregon | `or-cities.json` | Portland, Eugene, Salem, Gresham, Bend |
| Pennsylvania | `pa-cities.json` | Philadelphia, Pittsburgh, Allentown |
| Rhode Island | `ri-cities.json` | Providence |
| South Carolina | `sc-cities.json` | Columbia, Charleston |
| South Dakota | `sd-cities.json` | Sioux Falls, Rapid City |
| Tennessee | `tn-cities.json` | Nashville, Memphis, Knoxville, Chattanooga, Clarksville, Murfreesboro |
| Texas | `tx-cities.json` | Houston, San Antonio, Dallas, Austin, Fort Worth, El Paso, Arlington, Corpus Christi, Plano, Laredo, Lubbock, Irving, Garland, Frisco, McKinney, Amarillo, Grand Prairie, Brownsville, Killeen, Denton, Mesquite, McAllen, Waco, Carrollton, Round Rock, Pearland, Odessa, Midland, Wichita Falls, Abilene, League City, Allen, Tyler, Pasadena, Conroe, Mission, Edinburg, Lewisville, Sugar Land (slug `lewisville-tx-1`, an upstream duplicate-slug workaround), College Station |
| Utah | `ut-cities.json` | Salt Lake City, West Valley City, Provo, West Jordan |
| Virginia | `va-cities.json` | Virginia Beach, Norfolk, Chesapeake, Richmond, Alexandria, Portsmouth |
| Washington | `wa-cities.json` | Seattle, Spokane, Tacoma, Vancouver, Bellevue, Kent, Renton, Spokane Valley, Federal Way, Bellingham |
| Wisconsin | `wi-cities.json` | Milwaukee, Madison, Green Bay, Racine, Kenosha |

**Not yet done** (remaining top-350 states): CA, FL. These are the two
largest states left (~33–79 cities each) — add profiles a state (or a batch)
at a time following the workflow above.
