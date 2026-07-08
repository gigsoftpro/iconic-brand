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

## Status

- ✅ Alabama (`al-cities.json`): Huntsville, Montgomery, Mobile, Tuscaloosa
  (Birmingham handled separately).
- ⏭️ Next states: add profiles + generate + wire, one state at a time.
