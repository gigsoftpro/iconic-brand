// ===========================================================================
// CITY PROFILES — the source of per-city uniqueness.
//
// Each profile supplies the real, local specifics (institutions, industries,
// suburbs, corridors, anchor employers, region term, economic character) that
// the generic generator (scripts/generate-city-content.mjs) weaves into every
// section. Two cities running the same service therefore get different
// institutions, industries, geography, and economic framing — so their pages
// do not match each other.
//
// Birmingham is intentionally NOT here — it already has hand-tuned content in
// json/birminghamcontentex.json and must not be regenerated.
//
// Adding a state = add its cities' profiles below (real data), then run:
//   node scripts/generate-city-content.mjs --state=<CODE>
// ===========================================================================

/**
 * @typedef {Object} CityProfile
 * Every field is used by the generator's token system.
 */

export const CITY_PROFILES = {
  // ─── ALABAMA (Birmingham excluded — already generated) ───────────────────
  'huntsville-al': {
    citySlug: 'huntsville-al',
    city: 'Huntsville',
    state: 'Alabama',
    stateAbbr: 'AL',
    stateCode: 'AL',
    county: 'Madison County',
    county2: 'Limestone County',
    counties: 'Madison and Limestone Counties',
    countyTrade: 'Madison and Limestone County trade areas',
    metroFull: 'Huntsville Metropolitan Statistical Area',
    metroMSA: 'Huntsville MSA',
    metroShort: 'Huntsville metro',
    region: 'North Alabama',
    regionShort: 'the Tennessee Valley',
    tierLabel: 'Aerospace & Defense-Anchored Tech Metro',
    // Institutions used as rotating "anchors" (research park, university, chamber, incubator).
    institutions: [
      'Cummings Research Park',
      'the University of Alabama in Huntsville',
      'the Huntsville/Madison County Chamber',
      'the HudsonAlpha Institute for Biotechnology',
    ],
    smallBizOrg: 'SCORE North Alabama',
    univ: 'the University of Alabama in Huntsville',
    // Anchor industries rotated per record.
    industries: ['aerospace and defense', 'engineering and R&D', 'advanced manufacturing', 'biotech'],
    sectorTags: ['Aerospace & Defense', 'Engineering & R&D', 'Advanced Manufacturing', 'Biotech', 'Government Contracting', 'Professional Services'],
    suburbs: ['Madison', 'Athens', 'Decatur', 'Hampton Cove', 'Meridianville', 'Harvest', 'Owens Cross Roads', 'Gurley'],
    corridors: ['Interstate 565', 'Research Park Boulevard', 'Memorial Parkway'],
    talent: 'UAH, Alabama A&M, and Calhoun Community College',
    anchor1: 'Redstone Arsenal',
    anchor2: "NASA's Marshall Space Flight Center",
    anchors: "Redstone Arsenal, NASA's Marshall Space Flight Center, Boeing, and Blue Origin",
    economyLine: "aerospace, defense, and research anchored by Redstone Arsenal, NASA's Marshall Space Flight Center, and the 300-plus firms of Cummings Research Park",
    buyerCulture: 'a highly technical, credential-driven buyer base of engineers, program managers, and government contractors who reward precision and proof over polish',
    emergingSector: 'biotech and commercial space',
    marketData: {
      populationRange: '500K+ (Huntsville MSA)',
      businessCount: '15,000+ establishments',
      medianHouseholdIncome: '$62,000–$74,000',
      yearOverYearGrowth: '2.5–3.6%',
      smallBusinessShare: '99.4% of Alabama businesses',
      source: 'U.S. Census Bureau ACS, BLS QCEW, SBA Alabama Small Business Profile',
    },
    companyTypes: ['Engineering Services Firm', 'Government Contractor', 'Aerospace Supplier', 'Advanced Manufacturing Company', 'Biotech Startup', 'Professional Services Firm', 'Technology Company', 'Defense Services Firm'],
  },

  'montgomery-al': {
    citySlug: 'montgomery-al',
    city: 'Montgomery',
    state: 'Alabama',
    stateAbbr: 'AL',
    stateCode: 'AL',
    county: 'Montgomery County',
    county2: 'Elmore County',
    counties: 'Montgomery and Elmore Counties',
    countyTrade: 'Montgomery, Elmore, and Autauga County trade areas',
    metroFull: 'Montgomery Metropolitan Statistical Area',
    metroMSA: 'Montgomery MSA',
    metroShort: 'Montgomery metro',
    region: 'the River Region',
    regionShort: 'the River Region',
    tierLabel: 'Government & Automotive Manufacturing Hub',
    institutions: [
      'the Montgomery Area Chamber of Commerce',
      'Auburn University at Montgomery',
      'Alabama State University',
      'the Montgomery TechLab accelerator',
    ],
    smallBizOrg: 'SCORE Montgomery',
    univ: 'Auburn University at Montgomery',
    industries: ['automotive manufacturing', 'government and public administration', 'defense and aerospace', 'healthcare'],
    sectorTags: ['Automotive Manufacturing', 'Government', 'Defense & Aerospace', 'Healthcare', 'Logistics', 'Professional Services'],
    suburbs: ['Prattville', 'Wetumpka', 'Millbrook', 'Pike Road', 'Cloverdale', 'Deatsville', 'Coosada'],
    corridors: ['Interstate 85', 'Interstate 65', 'the East Boulevard'],
    talent: 'Alabama State University, Auburn University at Montgomery, and Trenholm State',
    anchor1: 'Hyundai Motor Manufacturing Alabama',
    anchor2: 'Maxwell Air Force Base',
    anchors: 'Hyundai Motor Manufacturing Alabama, Maxwell Air Force Base, and Alabama state government',
    economyLine: "state government, Maxwell-Gunter Air Force Base, and Hyundai's manufacturing footprint and its supplier network",
    buyerCulture: 'a relationship-first, institutionally-rooted buyer base shaped by state agencies, the military community, and long-established local businesses',
    emergingSector: 'automotive suppliers and cyber/defense services',
    marketData: {
      populationRange: '370K+ (Montgomery MSA)',
      businessCount: '12,000+ establishments',
      medianHouseholdIncome: '$52,000–$60,000',
      yearOverYearGrowth: '1.2–2.2%',
      smallBusinessShare: '99.4% of Alabama businesses',
      source: 'U.S. Census Bureau ACS, BLS QCEW, SBA Alabama Small Business Profile',
    },
    companyTypes: ['Automotive Supplier', 'Government Services Firm', 'Healthcare Support Services', 'Professional Services Firm', 'Logistics Company', 'Defense Contractor', 'Home Services Company', 'Financial Services Firm'],
  },

  'mobile-al': {
    citySlug: 'mobile-al',
    city: 'Mobile',
    state: 'Alabama',
    stateAbbr: 'AL',
    stateCode: 'AL',
    county: 'Mobile County',
    county2: 'Baldwin County',
    counties: 'Mobile and Baldwin Counties',
    countyTrade: 'Mobile and Baldwin County trade areas',
    metroFull: 'Mobile Metropolitan Statistical Area',
    metroMSA: 'Mobile MSA',
    metroShort: 'Mobile metro',
    region: 'the Alabama Gulf Coast',
    regionShort: 'the Gulf Coast',
    tierLabel: 'Gulf Coast Port & Aerospace Economy',
    institutions: [
      'the Port of Mobile',
      'the University of South Alabama',
      'the Mobile Area Chamber of Commerce',
      'Innovation PortAL',
    ],
    smallBizOrg: 'SCORE Mobile',
    univ: 'the University of South Alabama',
    industries: ['shipbuilding and maritime', 'aerospace', 'logistics and the port', 'chemical manufacturing'],
    sectorTags: ['Shipbuilding & Maritime', 'Aerospace', 'Logistics & Port', 'Chemical Manufacturing', 'Healthcare', 'Hospitality & Tourism'],
    suburbs: ['Daphne', 'Fairhope', 'Spanish Fort', 'Saraland', 'Tillmans Corner', 'Theodore', 'Semmes'],
    corridors: ['Interstate 10', 'Interstate 65', 'the U.S. 98 corridor'],
    talent: 'the University of South Alabama, Bishop State Community College, and Spring Hill College',
    anchor1: 'Airbus',
    anchor2: 'Austal USA',
    anchors: 'Airbus, Austal USA, and the Alabama State Port Authority',
    economyLine: "the Port of Mobile, shipbuilding at Austal USA, and Airbus's Final Assembly Line at the Brookley Aeroplex",
    buyerCulture: 'a trade-and-logistics buyer base that values reliability, long relationships, and Gulf Coast community ties over flashy pitches',
    emergingSector: 'aerospace assembly and port logistics',
    marketData: {
      populationRange: '430K+ (Mobile MSA)',
      businessCount: '13,000+ establishments',
      medianHouseholdIncome: '$50,000–$58,000',
      yearOverYearGrowth: '1.0–1.9%',
      smallBusinessShare: '99.4% of Alabama businesses',
      source: 'U.S. Census Bureau ACS, BLS QCEW, SBA Alabama Small Business Profile',
    },
    companyTypes: ['Maritime Services Firm', 'Aerospace Supplier', 'Logistics Company', 'Chemical Manufacturer', 'Healthcare Support Services', 'Hospitality Business', 'Professional Services Firm', 'Home Services Company'],
  },

  'tuscaloosa-al': {
    citySlug: 'tuscaloosa-al',
    city: 'Tuscaloosa',
    state: 'Alabama',
    stateAbbr: 'AL',
    stateCode: 'AL',
    county: 'Tuscaloosa County',
    county2: 'Hale County',
    counties: 'Tuscaloosa and Hale Counties',
    countyTrade: 'Tuscaloosa and Hale County trade areas',
    metroFull: 'Tuscaloosa Metropolitan Statistical Area',
    metroMSA: 'Tuscaloosa MSA',
    metroShort: 'Tuscaloosa metro',
    region: 'West Alabama',
    regionShort: 'West Alabama',
    tierLabel: 'University & Automotive Manufacturing Market',
    institutions: [
      'the University of Alabama',
      'the Chamber of Commerce of West Alabama',
      'Shelton State Community College',
      'The Edge business incubator',
    ],
    smallBizOrg: 'SCORE West Alabama',
    univ: 'the University of Alabama',
    industries: ['automotive manufacturing', 'higher education', 'healthcare', 'advanced manufacturing'],
    sectorTags: ['Automotive Manufacturing', 'Higher Education', 'Healthcare', 'Advanced Manufacturing', 'Hospitality & Retail', 'Professional Services'],
    suburbs: ['Northport', 'Cottondale', 'Vance', 'Brookwood', 'Moundville', 'Coaling', 'Holt'],
    corridors: ['Interstate 20/59', 'McFarland Boulevard', 'the Highway 82 corridor'],
    talent: 'the University of Alabama, Stillman College, and Shelton State',
    anchor1: 'the University of Alabama',
    anchor2: 'Mercedes-Benz U.S. International',
    anchors: 'the University of Alabama, Mercedes-Benz U.S. International, and DCH Health System',
    economyLine: "the University of Alabama, Mercedes-Benz's Vance assembly plant and its suppliers, and DCH Health System",
    buyerCulture: 'a buyer base split between a game-day-driven consumer economy and steady institutional buyers in education, healthcare, and manufacturing',
    emergingSector: 'automotive suppliers and university research spinouts',
    marketData: {
      populationRange: '270K+ (Tuscaloosa MSA)',
      businessCount: '8,000+ establishments',
      medianHouseholdIncome: '$50,000–$58,000',
      yearOverYearGrowth: '1.5–2.6%',
      smallBusinessShare: '99.4% of Alabama businesses',
      source: 'U.S. Census Bureau ACS, BLS QCEW, SBA Alabama Small Business Profile',
    },
    companyTypes: ['Automotive Supplier', 'Higher-Education Services Firm', 'Healthcare Support Services', 'Advanced Manufacturing Company', 'Retail & Hospitality Business', 'Professional Services Firm', 'Home Services Company', 'Construction Company'],
  },
};

// Cities grouped by state code, for `--state=<CODE>` generation.
export const CITIES_BY_STATE = Object.values(CITY_PROFILES).reduce((acc, p) => {
  (acc[p.stateCode] = acc[p.stateCode] || []).push(p.citySlug);
  return acc;
}, /** @type {Record<string,string[]>} */ ({}));
