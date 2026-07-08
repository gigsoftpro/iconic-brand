import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CITY_PROFILES, CITIES_BY_STATE } from './city-profiles.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// ===========================================================================
// GENERIC MULTI-CITY CONTENT GENERATOR
//
// Same architecture as the Birmingham generator (service-knowledge packs +
// section-per-dimension so every section does a different job), but every
// city-specific reference is a {{token}} filled from a CityProfile. Two cities
// running the same service get different institutions, industries, suburbs,
// anchors, region, and economic framing — so their pages do not match.
//
// Birmingham is skipped (already hand-tuned in birminghamcontentex.json).
//
// Usage:
//   node scripts/generate-city-content.mjs --state=AL
//   node scripts/generate-city-content.mjs --city=huntsville-al
// ===========================================================================

// --- Category → audience (who the reader is) --------------------------------
const categoryProfiles = {
  primary: { audience: 'operators', audienceTitle: 'Operators', role: 'Multi-Unit Operator' },
  franchisor: { audience: 'franchise brands', audienceTitle: 'Franchise Brands', role: 'Franchise Development Lead' },
  franchisee: { audience: 'local franchise owners', audienceTitle: 'Franchise Owners', role: 'Multi-Unit Franchise Owner' },
  consulting: { audience: 'business owners', audienceTitle: 'Business Owners', role: 'Owner' },
  hybrid: { audience: 'founders', audienceTitle: 'Founders', role: 'Founder' },
  technology: { audience: 'founders and operators', audienceTitle: 'Founders', role: 'Technology Lead' },
  investor: { audience: 'founders', audienceTitle: 'Founders', role: 'Founder & Managing Partner' },
  startup: { audience: 'founders', audienceTitle: 'Founders', role: 'Founder' },
  marketing: { audience: 'business owners', audienceTitle: 'Business Owners', role: 'Marketing Director' },
  operations: { audience: 'owners and operators', audienceTitle: 'Owners', role: 'Operating Partner' },
  funding: { audience: 'founders', audienceTitle: 'Founders', role: 'Founder' },
  entrepreneur: { audience: 'owners and entrepreneurs', audienceTitle: 'Owners', role: 'Owner' },
};

// ===========================================================================
// SERVICE PACKS (city-agnostic; city refs are {{tokens}})
// Each pack: discipline content (problems, 6 deliverables, terms, 5 mistakes,
// approach, insight, value levers, demandDriver) + two short composition hooks
// (marketAngle, buyerAngle) that combine with the city's economyLine /
// buyerCulture in the makers.
// ===========================================================================
const PACKS = {
  seo: {
    disc: 'local SEO', readerGoal: 'getting found by nearby customers the moment they search',
    outcome: 'a steady flow of local search traffic, calls, and direction requests',
    terms: ['the Google map pack', 'Google Business Profile', 'local citations', 'NAP consistency', 'review velocity'],
    problems: [
      'Ranking below national directories and chains for the "near me" searches {{city}} customers actually type',
      'A Google Business Profile that is unverified, thin, or inconsistent across multiple {{county}} locations',
      'No presence in the map pack, where most local buying decisions in the {{metroShort}} begin',
    ],
    deliverables: [
      { title: 'Local Keyword & Map-Pack Audit', icon: '🔍', desc: 'We map the exact neighborhood and "near me" searches {{county}} buyers use and where you rank against {{suburb1}} and {{suburb2}} competitors today.' },
      { title: 'Google Business Profile Optimization', icon: '📍', desc: 'Full profile build-out — categories, services, geo-tagged photos, and Q&A — tuned to win the {{city}} map pack.' },
      { title: 'Local Citation & NAP Cleanup', icon: '🗂️', desc: 'Consistent name, address, and phone across every directory so Google trusts your {{region}} locations.' },
      { title: 'Neighborhood Landing Pages', icon: '📄', desc: 'Unique pages for each service area — from {{suburb1}} to {{suburb2}} — that rank for hyper-local intent.' },
      { title: 'Review Generation System', icon: '⭐', desc: 'A workflow that turns satisfied {{city}} customers into a steady stream of Google reviews that lift rankings.' },
      { title: 'Local Rank & Call Tracking', icon: '📈', desc: 'Map-pack rank tracking and call attribution so you can see search turning into real {{city}} revenue.' },
    ],
    mistakes: [
      { mistake: 'Chasing Broad Keywords Over Local Intent', consequence: 'Budget burns on statewide terms while {{suburb1}} and {{suburb2}} competitors quietly own the "near me" searches that convert.', solution: 'Target neighborhood-level and map-pack intent across {{counties}} first.' },
      { mistake: 'Neglecting the Google Business Profile', consequence: 'An unoptimized profile keeps you out of the map pack no matter how good the website is.', solution: 'Treat the Google Business Profile as your primary {{city}} storefront and optimize it fully.' },
      { mistake: 'Inconsistent NAP Across Directories', consequence: 'Conflicting addresses and phone numbers erode the local trust signals Google uses to rank you.', solution: 'Audit and standardize citations across every directory before building links.' },
      { mistake: 'One Page for Every Service Area', consequence: 'A single page cannot rank for {{suburb1}}, {{suburb2}}, and the rest of the {{metroShort}} at once.', solution: 'Build genuinely unique neighborhood pages, not name-swapped duplicates.' },
      { mistake: 'Ignoring Reviews as a Ranking Factor', consequence: 'Low review volume and slow responses cap map-pack visibility.', solution: 'Run a systematic review-generation and response cadence.' },
    ],
    marketAngle: 'local visibility is won neighborhood by neighborhood across {{suburbList}}, not under one city name',
    buyerAngle: 'they rarely scroll past the three map-pack results and weigh proximity and reviews over brand recognition',
    demandDriver: 'As national directories and chains pour budget into paid search, independent {{region}} businesses increasingly compete on organic map-pack visibility, where proximity and reputation still beat ad spend.',
    approach: 'work outward from the map pack — rank the business by neighborhood first, rebuild the Google Business Profile and citations, then ship a landing page per service area with a review engine behind it',
    insight: 'In a metro spread across many suburbs, a single "we serve {{city}}" page cannot rank everywhere; you hold a different position in every suburb, which is why one-page local strategies quietly stall.',
    value: {
      money: 'Map-pack visibility compounds — once a location ranks, it keeps producing calls without the per-click cost of ads, steadily lowering blended acquisition cost across the {{metroShort}}.',
      time: 'Sequencing the Business Profile and citations before content means most {{city}} locations see map-pack movement in weeks, not the many months a broad SEO push takes.',
      risk: 'Consistent NAP data and a verified profile protect you from the ranking collapses that hit businesses when Google finds conflicting location information across directories.',
      status: 'Owning the map pack for your category signals to {{city}} buyers that you are the established local option, not a new or out-of-town entrant.',
    },
  },

  paidads: {
    disc: 'paid media and performance advertising', readerGoal: 'turning ad spend into measurable, profitable customers',
    outcome: 'a lower cost per acquisition and ad spend you can trace to revenue',
    terms: ['cost per acquisition', 'return on ad spend', 'conversion tracking', 'geo-fencing', 'audience targeting'],
    problems: [
      'Ad spend leaking into clicks that never convert because campaigns target the whole state, not the {{metroShort}}',
      'No conversion tracking, so you cannot tell which campaigns produce real {{county}} customers',
      'A rising cost per acquisition that quietly erodes margin as you scale',
    ],
    deliverables: [
      { title: 'Account & Tracking Audit', icon: '🔍', desc: 'We fix the tracking gaps so every {{city}} lead is attributed from first click to closed deal.' },
      { title: 'Geo-Targeted Campaign Build', icon: '🎯', desc: 'Google and Meta campaigns fenced to the {{metroShort}} and priced to {{region}} media costs.' },
      { title: 'Landing Page & Offer Optimization', icon: '🧲', desc: 'Conversion-focused pages and offers built for how {{county}} buyers actually respond.' },
      { title: 'Audience & Keyword Strategy', icon: '👥', desc: 'Intent-based targeting that reaches {{city}} buyers ready to act, not just cheap impressions.' },
      { title: 'Bid & Budget Management', icon: '💰', desc: 'Ongoing optimization toward a target cost per acquisition instead of vanity clicks.' },
      { title: 'ROAS Reporting Dashboard', icon: '📊', desc: 'A dashboard tying ad spend to {{city}} revenue, refreshed continuously.' },
    ],
    mistakes: [
      { mistake: 'Running Ads Without Conversion Tracking', consequence: 'You scale spend blind and never learn which {{city}} campaigns produce customers.', solution: 'Install full conversion and call tracking before increasing budget.' },
      { mistake: 'Targeting the Whole State', consequence: 'Statewide targeting wastes budget on clicks outside your real {{county}} service area.', solution: 'Geo-fence campaigns tightly to the {{metroShort}} and priority suburbs.' },
      { mistake: 'Sending Paid Traffic to the Homepage', consequence: 'Generic pages tank conversion and inflate cost per acquisition.', solution: 'Build dedicated, offer-matched landing pages for every campaign.' },
      { mistake: 'Optimizing for Clicks, Not Customers', consequence: 'Cheap clicks look good in reports but never reach the close.', solution: 'Optimize toward cost per acquisition and return on ad spend.' },
      { mistake: 'Ignoring Unit Economics Before Scaling', consequence: 'Scaling an unprofitable campaign multiplies losses across the {{metroShort}}.', solution: 'Know your CAC and margin per channel before raising spend.' },
    ],
    marketAngle: 'a disciplined advertiser can win cheaply here, but only inside a service radius tight enough to exclude the areas beyond {{county}}',
    buyerAngle: 'they click cautiously and convert on trust signals, so the landing page does more selling than the ad itself',
    demandDriver: 'As more {{region}} buyers research on mobile before ever calling, paid search and social have become the fastest way to reach in-market customers who never surface through referrals alone.',
    approach: 'fix conversion tracking first, fence campaigns to the real service area, then optimize toward cost per acquisition rather than clicks, moving budget daily toward audiences that book',
    insight: 'The biggest waste in {{city}} ad accounts is not weak creative — it is untracked spend and statewide targeting, which together hide which campaigns produce customers and which just produce clicks.',
    value: {
      money: 'Tight geo-fencing and conversion-based bidding cut the wasted spend that leaks into clicks outside your {{county}} service area, lowering cost per acquisition.',
      time: 'Paid media buys immediate visibility, so it can fill the pipeline within days while slower assets like SEO build underneath.',
      risk: 'Full tracking means you scale on evidence, never pouring budget into a campaign that looks busy but never reaches the close.',
      status: 'Consistent, well-placed local ads keep you top-of-mind in the exact {{city}} areas you serve.',
    },
  },

  social: {
    disc: 'social media marketing', readerGoal: 'building a real local audience that turns into customers',
    outcome: 'an engaged {{city}} following that drives foot traffic and referrals',
    terms: ['content calendar', 'community management', 'organic reach', 'paid social', 'engagement rate'],
    problems: [
      'Posting into the void with no consistent presence in front of {{city}} customers',
      'Followers who never convert because the content speaks to no one in particular',
      'No time or system to keep up with community management across platforms',
    ],
    deliverables: [
      { title: 'Local Social Strategy & Calendar', icon: '🗓️', desc: 'A monthly calendar built around {{city}} seasons, events, and the customers you want.' },
      { title: 'Content Production', icon: '🎨', desc: 'Photo, video, and graphics that showcase your business to the {{county}} community.' },
      { title: 'Community Management', icon: '💬', desc: 'Timely replies and engagement that turn {{city}} followers into customers.' },
      { title: 'Paid Social Campaigns', icon: '📣', desc: 'Geo-targeted campaigns aimed at the {{metroShort}}, not the whole country.' },
      { title: 'Local Partnership & UGC Program', icon: '🤝', desc: 'Collaborations with {{region}} creators and customers that build authentic reach.' },
      { title: 'Engagement Reporting', icon: '📊', desc: 'Reporting on the metrics that predict local revenue, not vanity follower counts.' },
    ],
    mistakes: [
      { mistake: 'Posting Without a Local Angle', consequence: 'Generic content blends in and never connects with the {{city}} community.', solution: 'Anchor content in local events, neighborhoods, and customers.' },
      { mistake: 'Chasing Followers Over Customers', consequence: 'A big vanity following that never buys drains time and budget.', solution: 'Optimize for engagement and conversion from the {{county}} audience.' },
      { mistake: 'Inconsistent Posting', consequence: 'Start-stop activity kills reach and looks unprofessional locally.', solution: 'Run a sustainable, planned content cadence.' },
      { mistake: 'Ignoring Community Management', consequence: 'Unanswered comments and messages quietly cost {{city}} sales.', solution: 'Treat responses as a sales channel with a defined cadence.' },
      { mistake: 'Boosting Posts Statewide', consequence: 'Untargeted boosts waste budget outside your service area.', solution: 'Geo-target paid social to the {{metroShort}}.' },
    ],
    marketAngle: 'content featuring real local people, neighborhoods, and events outperforms the polished-but-generic feeds that work in bigger metros',
    buyerAngle: 'they engage with authenticity and community, and quietly judge responsiveness — an ignored message reads as an ignored customer',
    demandDriver: 'As word-of-mouth increasingly happens in comment sections and messages, {{region}} businesses that stay visible and responsive on social capture referrals that used to travel only in person.',
    approach: 'plan around {{city}} seasons and events, produce content featuring your actual work and people, then treat comments and messages as a sales channel with a real response cadence',
    insight: 'Follower count is the vanity metric that fools {{city}} businesses; a small, engaged local audience that shows up and shares outperforms a large passive one every time.',
    value: {
      money: 'A community-driven feed turns existing customers into unpaid advocates, generating referral reach that would cost far more to buy.',
      time: 'A planned calendar ends the scramble of last-minute posting, giving a lean {{city}} team a consistent presence.',
      risk: 'Active community management catches complaints early, protecting the local reputation that spreads fast in {{city}}.',
      status: 'A steady, authentically local presence positions you as an active part of the {{city}} community, not just a name on a sign.',
    },
  },

  content: {
    disc: 'content marketing', readerGoal: 'becoming the trusted local authority buyers find and believe',
    outcome: 'inbound traffic and leads that compound over time',
    terms: ['topic clusters', 'search intent', 'thought leadership', 'editorial calendar', 'lead magnets'],
    problems: [
      'A website nobody finds because it answers none of the questions {{city}} buyers search',
      'Sporadic blogging with no strategy, so nothing ranks or converts',
      'No content that moves a {{county}} prospect from curious to ready-to-buy',
    ],
    deliverables: [
      { title: 'Content & Keyword Strategy', icon: '🧭', desc: 'A topic-cluster plan mapped to what {{city}} buyers actually search.' },
      { title: 'Editorial Calendar', icon: '🗓️', desc: 'A publishing cadence that builds authority instead of one-off posts.' },
      { title: 'SEO Article & Landing Content', icon: '✍️', desc: 'Search-optimized content that ranks for {{region}} intent and answers real questions.' },
      { title: 'Lead Magnets & Gated Assets', icon: '🧲', desc: 'Guides and tools that convert {{city}} readers into named leads.' },
      { title: 'Thought-Leadership Program', icon: '🎙️', desc: 'Bylined pieces that position your team as the credible {{county}} expert.' },
      { title: 'Content Performance Reporting', icon: '📈', desc: 'Reporting that ties content to rankings, traffic, and pipeline.' },
    ],
    mistakes: [
      { mistake: 'Blogging Without Search Intent', consequence: 'Posts nobody searches for never rank and never convert.', solution: 'Build content around real {{city}} search intent and topic clusters.' },
      { mistake: 'No Bottom-of-Funnel Content', consequence: 'Top-of-funnel traffic never turns into {{county}} customers.', solution: 'Pair thought leadership with comparison and decision-stage content.' },
      { mistake: 'Publishing Sporadically', consequence: 'Stop-start publishing stalls authority and rankings.', solution: 'Commit to a consistent editorial calendar.' },
      { mistake: 'Generic, Non-Local Content', consequence: 'Content that could run in any city earns no local relevance.', solution: 'Ground content in {{region}} context and examples.' },
      { mistake: 'No Lead Capture', consequence: 'Traffic arrives and leaves with nothing captured.', solution: 'Add lead magnets and clear next steps throughout.' },
    ],
    marketAngle: 'the first business to own its topic captures organic visibility that is expensive for latecomers to reclaim',
    buyerAngle: 'they research heavily and privately before reaching out, rewarding substance over hype',
    demandDriver: 'Because {{region}} is underserved by genuinely local, expert content, the first business to own a topic in its niche captures organic visibility competitors struggle to buy back.',
    approach: 'build topic clusters around what {{city}} buyers actually search, publish on a real editorial cadence, and pair thought leadership with decision-stage content that captures leads',
    insight: 'Most {{city}} content fails not because it is badly written but because it targets topics no local buyer searches; intent, not volume, turns content into pipeline.',
    value: {
      money: 'Ranked content is an owned asset that keeps generating leads for years, unlike ads that stop the moment the budget does.',
      time: 'An editorial calendar replaces reactive posting, so authority compounds steadily instead of restarting every few months.',
      risk: 'Publishing genuine local expertise builds a trust moat that shields you from price competition and newer entrants.',
      status: 'Consistently answering your market\'s questions positions your team as the recognized {{region}} authority.',
    },
  },

  website: {
    disc: 'website design and development', readerGoal: 'a site that turns visitors into booked calls and customers',
    outcome: 'a fast, credible site that converts {{city}} traffic',
    terms: ['conversion rate', 'core web vitals', 'mobile-first design', 'calls-to-action', 'page speed'],
    problems: [
      'A slow, dated site that undermines credibility with {{city}} buyers before they call',
      'A design that looks fine but converts almost no {{county}} visitors',
      'No mobile experience, where most local searches actually happen',
    ],
    deliverables: [
      { title: 'UX & Conversion Audit', icon: '🔍', desc: 'We find exactly where {{city}} visitors drop off and why they do not convert.' },
      { title: 'Conversion-First Redesign', icon: '🎨', desc: 'A modern, credible design built around booked calls, not just aesthetics.' },
      { title: 'Mobile & Speed Optimization', icon: '⚡', desc: 'Fast, mobile-first pages that hold {{county}} buyers who search on their phones.' },
      { title: 'Local SEO Foundation', icon: '📍', desc: 'Technical SEO and location structure so the site can rank across the {{metroShort}}.' },
      { title: 'Booking & Lead Capture', icon: '🧲', desc: 'Clear calls-to-action and booking flows tuned to convert local traffic.' },
      { title: 'Analytics & Tracking Setup', icon: '📊', desc: 'Full tracking so every {{city}} lead and its source is measurable.' },
    ],
    mistakes: [
      { mistake: 'Designing for Looks, Not Conversion', consequence: 'A beautiful site that buries the call-to-action loses {{city}} leads.', solution: 'Design around the booking flow and clear next steps.' },
      { mistake: 'Ignoring Mobile', consequence: 'Poor mobile experience loses the majority of local searchers.', solution: 'Build mobile-first with fast load times.' },
      { mistake: 'No SEO Foundation', consequence: 'A new site that cannot rank stays invisible in the {{metroShort}}.', solution: 'Bake in technical and local SEO from the start.' },
      { mistake: 'Slow Page Speed', consequence: 'Every second of load time costs conversions and rankings.', solution: 'Optimize core web vitals and hosting.' },
      { mistake: 'No Tracking', consequence: 'You cannot improve what you cannot measure.', solution: 'Install analytics and lead tracking on day one.' },
    ],
    marketAngle: 'buyers judge credibility in seconds, so a slow or dated site quietly sends business to competitors before the phone rings',
    buyerAngle: 'they decide fast, scanning for proof and an obvious next step, and abandon anything slow or confusing on a phone',
    demandDriver: 'As {{city}} buyers increasingly expect to book and inquire online, businesses still running brochure sites are losing the customers who never call a number they have to hunt for.',
    approach: 'audit where visitors drop off, redesign around the booking action rather than aesthetics, and build in speed, mobile-first layout, and a local SEO foundation from the start',
    insight: 'A beautiful {{city}} site that buries its call-to-action converts worse than a plain one that makes the next step obvious; clarity beats polish on every measure that matters.',
    value: {
      money: 'A conversion-focused site lifts the return on every other marketing dollar, because more of the traffic you already pay for books a call.',
      time: 'Built-in booking and lead capture handle inquiries around the clock, freeing your {{city}} team from chasing every prospect by phone.',
      risk: 'A fast, credible, mobile-first site removes the silent objection that costs you buyers who judge you by your digital front door.',
      status: 'A modern site signals to {{region}} buyers that you are an established operator, leveling the field against larger competitors.',
    },
  },

  branding: {
    disc: 'brand strategy and positioning', readerGoal: 'standing out and commanding trust in a crowded market',
    outcome: 'a distinct brand that earns premium trust across the {{metroShort}}',
    terms: ['brand positioning', 'messaging architecture', 'visual identity', 'value proposition', 'brand voice'],
    problems: [
      'Blending in with every other {{city}} competitor and being forced to compete on price',
      'A message that fails to explain why a {{county}} buyer should choose you',
      'An inconsistent identity that looks different everywhere it appears',
    ],
    deliverables: [
      { title: 'Brand & Competitor Audit', icon: '🔍', desc: 'An honest read on how you show up against {{city}} competitors and where the white space is.' },
      { title: 'Positioning & Value Proposition', icon: '🎯', desc: 'A clear position that tells {{county}} buyers exactly why you are the right choice.' },
      { title: 'Messaging Architecture', icon: '🗣️', desc: 'Core messages and voice that stay consistent across every {{city}} touchpoint.' },
      { title: 'Visual Identity System', icon: '🎨', desc: 'Logo, color, and design that read as credible and premium in this market.' },
      { title: 'Brand Guidelines', icon: '📘', desc: 'A usable guide so your brand looks consistent everywhere across {{region}}.' },
      { title: 'Launch & Rollout Plan', icon: '🚀', desc: 'A plan to roll the brand out to {{city}} customers without losing existing equity.' },
    ],
    mistakes: [
      { mistake: 'Competing on Price, Not Position', consequence: 'Without a clear brand, {{city}} businesses get pulled into a race to the bottom.', solution: 'Define a distinct position that justifies your value.' },
      { mistake: 'Inconsistent Identity', consequence: 'A brand that looks different everywhere erodes trust with local buyers.', solution: 'Build and enforce a single visual and verbal system.' },
      { mistake: 'Feature-First Messaging', consequence: 'Listing features never tells a {{county}} buyer why to choose you.', solution: 'Lead with a value proposition and outcomes.' },
      { mistake: 'Rebranding Without a Rollout', consequence: 'A sudden change confuses existing {{city}} customers and loses equity.', solution: 'Plan a deliberate rollout that carries equity forward.' },
      { mistake: 'Copying Competitors', consequence: 'Looking like everyone else guarantees you are ignored.', solution: 'Position into the white space competitors leave open.' },
    ],
    marketAngle: 'positioning has to earn belief from local buyers rather than simply outspend the competition',
    buyerAngle: 'they choose the option they understand and trust quickest — a clear position beats a clever but confusing one',
    demandDriver: 'As {{region}} sectors crowd with look-alike competitors, businesses that sharpen their positioning stand out fast and escape the price wars that trap the undifferentiated.',
    approach: 'audit how you show up against real {{city}} competitors, define the white-space position only you can own, then build the messaging and identity system to carry it everywhere',
    insight: 'Most {{city}} brands blend in not because their work is average but because their message describes what they do instead of why a local buyer should choose them.',
    value: {
      money: 'Clear positioning lets you compete on value instead of price, protecting margin against local discounting.',
      time: 'A defined brand system speeds every future decision — marketing, sales, and hiring all move faster.',
      risk: 'A consistent identity prevents the trust erosion that happens when a business looks different everywhere.',
      status: 'A sharply positioned brand makes a {{region}} business look established and premium, commanding trust its size alone would not earn.',
    },
  },

  leadgen: {
    disc: 'lead generation and customer acquisition', readerGoal: 'a predictable pipeline of qualified local prospects',
    outcome: 'a repeatable system that fills the pipeline with qualified {{city}} leads',
    terms: ['lead qualification', 'the acquisition funnel', 'cost per lead', 'nurture sequences', 'the sales pipeline'],
    problems: [
      'An inconsistent, feast-or-famine flow of leads that makes planning impossible',
      'Leads that arrive unqualified and waste your team\'s time',
      'No system to follow up, so hard-won {{city}} prospects go cold',
    ],
    deliverables: [
      { title: 'Ideal Customer & Offer Definition', icon: '🎯', desc: 'We define the exact {{county}} customer worth pursuing and the offer that converts them.' },
      { title: 'Multi-Channel Acquisition Plan', icon: '🧭', desc: 'A channel mix — search, social, and local — matched to how {{city}} buyers find services.' },
      { title: 'Lead Capture & Landing Pages', icon: '🧲', desc: 'Conversion pages built to turn {{city}} traffic into named leads.' },
      { title: 'Qualification & Scoring', icon: '✅', desc: 'A framework that filters out tire-kickers so your team works real prospects.' },
      { title: 'Nurture & Follow-Up Sequences', icon: '📧', desc: 'Automated follow-up so no {{county}} lead slips through the cracks.' },
      { title: 'Pipeline & Cost-Per-Lead Reporting', icon: '📊', desc: 'Clear reporting on cost per lead and pipeline so acquisition stays accountable.' },
    ],
    mistakes: [
      { mistake: 'No Follow-Up System', consequence: 'Leads that take weeks to convert go cold without nurture, wasting acquisition spend.', solution: 'Automate a nurture cadence for every {{city}} lead.' },
      { mistake: 'Chasing Volume Over Quality', consequence: 'Unqualified leads swamp your team and slow real deals.', solution: 'Add qualification and scoring to focus on fit.' },
      { mistake: 'Relying on a Single Channel', consequence: 'One channel drying up collapses the whole pipeline.', solution: 'Build a resilient multi-channel acquisition mix.' },
      { mistake: 'Weak or Generic Offers', consequence: 'A vague offer fails to move {{county}} buyers to act.', solution: 'Craft a specific, compelling local offer.' },
      { mistake: 'No Cost-Per-Lead Tracking', consequence: 'Without unit economics you cannot scale profitably.', solution: 'Track cost per lead and conversion by channel.' },
    ],
    marketAngle: 'the strongest systems blend digital capture with the community networks most competitors ignore',
    buyerAngle: 'they rarely buy on first contact and convert after several trust-building touches, so patient follow-up wins',
    demandDriver: 'As referral pipelines prove too unpredictable to plan around, {{region}} businesses increasingly need a repeatable acquisition engine that produces leads on demand instead of by luck.',
    approach: 'define the exact customer worth pursuing, build a multi-channel capture system, then qualify and nurture every lead so your team spends time only on real prospects',
    insight: 'In {{city}}, the pipeline usually leaks at follow-up, not at the top; most businesses generate enough leads and simply lose them to silence.',
    value: {
      money: 'Qualification keeps acquisition spend focused on prospects who fit, lowering cost per customer instead of cost per lead.',
      time: 'Automated nurture does the patient follow-up local deals require, so your team stops chasing cold leads.',
      risk: 'A multi-channel system means no single platform change can collapse the whole pipeline overnight.',
      status: 'A visibly organized, responsive intake process signals professionalism to {{city}} buyers comparing you to slower competitors.',
    },
  },

  funnel: {
    disc: 'sales funnel and conversion consulting', readerGoal: 'plugging the leaks that lose deals between interest and close',
    outcome: 'a measurably higher conversion rate from lead to customer',
    terms: ['funnel stages', 'conversion rate optimization', 'lead nurturing', 'the close rate', 'drop-off points'],
    problems: [
      'Plenty of interest at the top but few deals closing at the bottom',
      'No visibility into where {{city}} prospects drop off in the journey',
      'A funnel held together by the owner\'s memory instead of a real system',
    ],
    deliverables: [
      { title: 'Full Funnel Audit', icon: '🔍', desc: 'We map every stage and pinpoint exactly where {{city}} prospects drop off.' },
      { title: 'Offer & Messaging Alignment', icon: '🎯', desc: 'Aligning the offer to each stage so {{county}} buyers keep moving forward.' },
      { title: 'Landing Page & Conversion Optimization', icon: '🧲', desc: 'Rebuilt pages and CTAs that lift conversion at each step.' },
      { title: 'Lead Nurture Automation', icon: '📧', desc: 'Sequences that warm {{city}} leads until they are ready to buy.' },
      { title: 'Sales Follow-Up Playbook', icon: '📋', desc: 'A documented cadence so no deal stalls in the middle of the funnel.' },
      { title: 'Conversion Reporting', icon: '📊', desc: 'Stage-by-stage reporting so you can see and improve the close rate.' },
    ],
    mistakes: [
      { mistake: 'No Visibility Into Drop-Off', consequence: 'Without stage tracking, you cannot fix where {{city}} deals die.', solution: 'Instrument every funnel stage to find the leaks.' },
      { mistake: 'One-Size Messaging', consequence: 'The same pitch at every stage stalls prospects who need different things.', solution: 'Align messaging to each stage of the journey.' },
      { mistake: 'No Nurture Between Stages', consequence: 'Interested {{county}} leads go cold with no follow-up.', solution: 'Automate nurture that moves leads forward.' },
      { mistake: 'Weak Bottom-of-Funnel Offers', consequence: 'Prospects stall right before the close without a reason to act.', solution: 'Strengthen the decision-stage offer and CTA.' },
      { mistake: 'Relying on Founder Memory', consequence: 'An undocumented funnel breaks the moment the owner is busy.', solution: 'Systematize the funnel with a repeatable playbook.' },
    ],
    marketAngle: 'the biggest gains come from disciplined nurture between stages, not from pouring more prospects into the top',
    buyerAngle: 'they stall when trust or clarity is missing at a specific step, so the fix is a targeted stage, not a bigger audience',
    demandDriver: 'As acquisition costs rise, {{region}} businesses are realizing it is cheaper to convert more of the interest they already generate than to buy more attention.',
    approach: 'map every stage to find exactly where prospects drop, align the offer and message to each step, then automate the nurture that carries {{city}} leads to the close',
    insight: 'Most {{city}} businesses cannot say where their deals die, which is the real problem — you cannot fix a funnel you have never instrumented.',
    value: {
      money: 'Lifting conversion at existing stages turns traffic you already pay for into more customers, without raising spend.',
      time: 'A documented follow-up playbook keeps deals moving without the owner shepherding every one.',
      risk: 'Stage-by-stage visibility catches a stalling funnel early, before a quiet drop becomes a revenue problem.',
      status: 'A smooth buying experience makes your {{city}} business feel more professional than competitors running on memory.',
    },
  },

  techsystems: {
    disc: 'CRM, automation, and systems implementation', readerGoal: 'systems that run the business instead of the business running on memory',
    outcome: 'clean, adopted systems that save hours and stop leads slipping',
    terms: ['CRM implementation', 'workflow automation', 'the tech stack', 'user adoption', 'integrations'],
    problems: [
      'Leads and customer data scattered across spreadsheets, inboxes, and sticky notes',
      'Manual, repetitive work that eats the team\'s time and invites errors',
      'A pile of tools no one fully adopted, so the promised efficiency never arrived',
    ],
    deliverables: [
      { title: 'Systems & Workflow Audit', icon: '🔍', desc: 'We map how work flows and where {{city}} teams lose time and data.' },
      { title: 'CRM Selection & Setup', icon: '🧩', desc: 'The right CRM configured to your business, not a generic install.' },
      { title: 'Workflow Automation', icon: '⚙️', desc: 'Automations that remove repetitive manual work and stop leads from slipping.' },
      { title: 'Integrations & Data Migration', icon: '🔗', desc: 'Connected tools and clean migrated data so everything talks to everything.' },
      { title: 'Team Training & Adoption', icon: '👥', desc: 'Hands-on rollout so your {{county}} team actually uses the system.' },
      { title: 'Dashboards & Reporting', icon: '📊', desc: 'Live dashboards so you manage on real data instead of gut feel.' },
    ],
    mistakes: [
      { mistake: 'Buying Tools Before Mapping Workflow', consequence: 'Software bought without a process just digitizes the chaos.', solution: 'Map the workflow first, then choose tools to fit it.' },
      { mistake: 'Tool Sprawl', consequence: 'Too many disconnected apps create more work, not less.', solution: 'Consolidate into an integrated, minimal stack.' },
      { mistake: 'Ignoring Adoption', consequence: 'A system nobody uses delivers zero return.', solution: 'Invest in training and change management.' },
      { mistake: 'Dirty Data Migration', consequence: 'Migrating messy data poisons the new system from day one.', solution: 'Clean and structure data before migration.' },
      { mistake: 'No Reporting Layer', consequence: 'Without dashboards, leaders still manage on gut feel.', solution: 'Build reporting that surfaces the metrics that matter.' },
    ],
    marketAngle: 'a well-implemented stack creates an outsized edge where few local competitors have modernized',
    buyerAngle: 'a lean team only trusts a system simpler than the workaround it replaces, so usability decides success',
    demandDriver: 'As lean {{county}} teams hit the ceiling of what manual processes can handle, the pressure to systematize is what finally pushes owners to implement real tools.',
    approach: 'map the actual workflow before choosing any tool, configure the CRM to your real process, migrate clean data, then drive adoption with hands-on training',
    insight: 'Software bought before the workflow is mapped just digitizes the chaos; in {{city}}, the win is the system people actually use, not the longest feature list.',
    value: {
      money: 'Automation removes the repetitive manual work that quietly consumes payroll hours.',
      time: 'Connected systems end the daily hunt across spreadsheets and inboxes, giving a lean {{city}} team back hours every week.',
      risk: 'A single source of truth stops leads and follow-ups from slipping through the cracks manual processes leave open.',
      status: 'Clean systems and fast, organized responses make even a small {{region}} business feel enterprise-grade.',
    },
  },

  aimarketing: {
    disc: 'AI-powered marketing', readerGoal: 'using AI to do more with a lean local team',
    outcome: 'AI-assisted marketing that produces more output and better targeting per dollar',
    terms: ['marketing automation', 'AI content workflows', 'predictive targeting', 'personalization', 'lead scoring'],
    problems: [
      'A lean {{city}} team that cannot keep up with the volume modern marketing demands',
      'Generic outreach that ignores what AI-driven personalization could unlock',
      'Curiosity about AI but no practical, safe way to put it to work locally',
    ],
    deliverables: [
      { title: 'AI Opportunity Audit', icon: '🔍', desc: 'We find where AI can save your {{city}} team time and lift results.' },
      { title: 'AI Content & Creative Workflows', icon: '✍️', desc: 'Human-guided AI workflows that multiply output without losing local voice.' },
      { title: 'Predictive Targeting & Lead Scoring', icon: '🎯', desc: 'AI models that focus spend on the {{county}} prospects most likely to convert.' },
      { title: 'Personalization Engine', icon: '🧠', desc: 'Personalized journeys that speak to each {{city}} segment automatically.' },
      { title: 'Automation & Integration', icon: '⚙️', desc: 'AI tools wired into your stack so the whole system compounds.' },
      { title: 'Governance & Reporting', icon: '📊', desc: 'Guardrails and reporting so AI stays on-brand, accurate, and accountable.' },
    ],
    mistakes: [
      { mistake: 'Automating Before Strategy', consequence: 'AI applied to a bad plan just makes bad marketing faster.', solution: 'Fix the strategy, then apply AI to scale it.' },
      { mistake: 'Losing the Local Voice', consequence: 'Unedited AI content reads generic and erodes {{city}} trust.', solution: 'Keep human guidance and local voice in every workflow.' },
      { mistake: 'No Governance', consequence: 'Ungoverned AI risks off-brand or inaccurate output.', solution: 'Set clear guardrails, review, and approval steps.' },
      { mistake: 'Chasing Tools Over Outcomes', consequence: 'Buying AI tools with no use case wastes budget.', solution: 'Start from the outcome and pick tools to fit.' },
      { mistake: 'Ignoring Data Quality', consequence: 'AI on messy data produces unreliable targeting.', solution: 'Clean and structure data before modeling.' },
    ],
    marketAngle: 'AI lets a small local business produce the volume and precision that used to require a much larger staff',
    buyerAngle: 'they still reward authenticity, so AI works only when it amplifies a real local voice rather than replacing it',
    demandDriver: 'Because most {{county}} competitors have not adopted AI thoughtfully yet, businesses applying it now open an early, compounding advantage in their local market.',
    approach: 'find the highest-return places AI saves time, build human-guided content and targeting workflows, then wire them into your stack with clear governance',
    insight: 'AI applied to a weak plan just makes weak marketing faster; the advantage in {{city}} comes from pairing it with real local strategy and a human editor.',
    value: {
      money: 'AI-assisted workflows multiply output per dollar, letting a small {{city}} budget produce volume that once required a full team.',
      time: 'Automating the repetitive parts frees your team for the local judgment and relationships AI cannot replace.',
      risk: 'Clear governance keeps AI on-brand and accurate, avoiding the generic output that erodes {{city}} trust.',
      status: 'Thoughtful early adoption positions you as a forward-looking {{region}} operator while competitors work by hand.',
    },
  },

  analytics: {
    disc: 'marketing analytics and reporting', readerGoal: 'knowing exactly what is working and what to cut',
    outcome: 'clear attribution and decisions driven by data, not guesswork',
    terms: ['attribution', 'KPIs', 'dashboards', 'conversion tracking', 'the data layer'],
    problems: [
      'Spending on marketing with no idea which efforts actually produce customers',
      'Reports full of vanity metrics that never inform a real decision',
      'Data trapped in separate tools that never tells one coherent story',
    ],
    deliverables: [
      { title: 'Measurement & KPI Framework', icon: '🎯', desc: 'We define the metrics that actually predict revenue for your {{city}} business.' },
      { title: 'Tracking & Attribution Setup', icon: '🔗', desc: 'End-to-end tracking so every {{county}} lead is attributed to its source.' },
      { title: 'Unified Dashboard Build', icon: '📊', desc: 'One dashboard that pulls every channel into a single, clear view.' },
      { title: 'Channel Performance Analysis', icon: '🔍', desc: 'Analysis that shows what to scale and what to cut across the {{metroShort}}.' },
      { title: 'Conversion & Funnel Reporting', icon: '📈', desc: 'Stage-by-stage reporting so you see where local revenue is won and lost.' },
      { title: 'Ongoing Insight Reviews', icon: '🧭', desc: 'Regular reviews that turn data into concrete next steps.' },
    ],
    mistakes: [
      { mistake: 'Tracking Vanity Metrics', consequence: 'Impressions and likes never inform a real {{city}} decision.', solution: 'Focus on KPIs tied to revenue and conversion.' },
      { mistake: 'No Attribution', consequence: 'Without attribution you cannot tell which channels produce customers.', solution: 'Build end-to-end tracking and attribution.' },
      { mistake: 'Siloed Data', consequence: 'Disconnected tools never tell one coherent story.', solution: 'Unify data into a single dashboard.' },
      { mistake: 'Reporting Without Action', consequence: 'Dashboards nobody acts on waste everyone\'s time.', solution: 'Pair every report with clear recommendations.' },
      { mistake: 'Ignoring the Full Funnel', consequence: 'Top-line metrics hide where deals actually stall.', solution: 'Report across the entire funnel.' },
    ],
    marketAngle: 'the businesses that instrument attribution double down on what works while competitors keep guessing',
    buyerAngle: 'internally, leaders act on numbers they trust — a clean dashboard changes decisions a pile of reports never could',
    demandDriver: 'As marketing budgets tighten, {{county}} owners increasingly demand proof of what each channel returns before they will keep funding it.',
    approach: 'define the metrics that actually predict revenue, wire up end-to-end tracking, then unify everything into one dashboard tied to clear next steps',
    insight: 'The costliest analytics mistake in {{city}} is measuring vanity metrics well — impressions reported precisely still never tell you which channel produced a customer.',
    value: {
      money: 'Real attribution shows which channels pay off, so budget shifts to what works and stops funding what looks busy.',
      time: 'A single automated dashboard ends the monthly scramble of stitching numbers together.',
      risk: 'Seeing the full funnel means you spot a declining channel before it drags down a quarter.',
      status: 'Data-backed decisions signal a disciplined operation to partners and lenders evaluating a {{region}} business.',
    },
  },

  reputation: {
    disc: 'reputation and review management', readerGoal: 'a strong, trusted reputation that wins local buyers',
    outcome: 'a steady stream of positive reviews and a reputation that converts',
    terms: ['review velocity', 'star rating', 'review response', 'online reputation', 'social proof'],
    problems: [
      'A thin or dated review profile that costs you {{city}} buyers to competitors',
      'The occasional negative review with no system to respond or recover',
      'No process to turn happy {{county}} customers into public proof',
    ],
    deliverables: [
      { title: 'Reputation Audit', icon: '🔍', desc: 'A full read on how your business appears across review sites in the {{city}} market.' },
      { title: 'Review Generation System', icon: '⭐', desc: 'A workflow that turns satisfied {{county}} customers into reviews.' },
      { title: 'Response & Recovery Playbook', icon: '💬', desc: 'A cadence for responding to every review and recovering from negatives.' },
      { title: 'Monitoring & Alerts', icon: '🔔', desc: 'Real-time monitoring so no {{city}} review goes unnoticed.' },
      { title: 'Social Proof Deployment', icon: '📣', desc: 'Putting reviews to work on your site, ads, and profiles where buyers decide.' },
      { title: 'Reputation Reporting', icon: '📊', desc: 'Tracking rating, velocity, and sentiment over time.' },
    ],
    mistakes: [
      { mistake: 'No System for Generating Reviews', consequence: 'A stagnant profile falls behind {{city}} competitors.', solution: 'Run a consistent review-request workflow.' },
      { mistake: 'Ignoring Negative Reviews', consequence: 'Unanswered negatives scare off {{county}} buyers.', solution: 'Respond and recover within 24 hours.' },
      { mistake: 'Not Monitoring Mentions', consequence: 'Problems fester unseen across review sites.', solution: 'Set up real-time monitoring and alerts.' },
      { mistake: 'Hiding Reviews', consequence: 'Failing to showcase proof wastes hard-won credibility.', solution: 'Deploy social proof where buyers decide.' },
      { mistake: 'Faking Reviews', consequence: 'Fake reviews risk penalties and destroy trust.', solution: 'Generate authentic reviews from real customers.' },
    ],
    marketAngle: 'a strong, active review profile often decides which local business a buyer calls first',
    buyerAngle: 'they read recent reviews as a proxy for reliability and notice whether owners respond',
    demandDriver: 'As buyers increasingly vet local businesses by star rating before making contact, a thin or dated review profile quietly costs {{county}} companies customers every week.',
    approach: 'turn satisfied customers into a steady review stream, respond to and recover from negatives quickly, then deploy that social proof where local buyers actually decide',
    insight: 'A single ignored negative review in {{city}} does more damage than five positive ones do good, because buyers here read the response as much as the rating.',
    value: {
      money: 'A higher, more active rating measurably lifts the share of local searchers who choose you.',
      time: 'A systematic workflow makes reputation self-sustaining instead of something the owner has to chase.',
      risk: 'Fast monitoring and response contain problems before they spread through a connected local market.',
      status: 'A wall of recent, well-handled reviews positions you as the trusted, established choice in your {{city}} category.',
    },
  },

  funding: {
    disc: 'fundraising and capital strategy', readerGoal: 'raising the right capital on the right terms',
    outcome: 'a credible raise on terms that reflect real value',
    terms: ['the raise', 'the cap table', 'the financial model', 'the data room', 'the term sheet'],
    problems: [
      'A pitch that fails to convince investors your business is fundable',
      'No financial model or data room, so promising conversations stall in diligence',
      'Unclear which capital source actually fits your stage and {{region}} business',
    ],
    deliverables: [
      { title: 'Fundraising Readiness Assessment', icon: '✅', desc: 'An honest read on whether your business is ready to raise and what to fix first.' },
      { title: 'Financial Model & Projections', icon: '💰', desc: 'A defensible model with unit economics that holds up under diligence.' },
      { title: 'Investor Narrative & Pitch', icon: '📊', desc: 'A story and deck that make {{region}} investors understand your value.' },
      { title: 'Capital Strategy & Targeting', icon: '🗺️', desc: 'The right funding path for your stage, mapped to {{region}} capital sources.' },
      { title: 'Data Room & Diligence Prep', icon: '📋', desc: 'A complete data room so a {{city}} raise does not stall on paperwork.' },
      { title: 'Investor Outreach Support', icon: '🤝', desc: 'Warm introductions and outreach into the regional investor community.' },
    ],
    mistakes: [
      { mistake: 'Pitching Before Readiness', consequence: 'A premature raise burns investor relationships you cannot get back.', solution: 'Assess readiness and fix gaps before pitching.' },
      { mistake: 'A Model That Fails Diligence', consequence: 'Weak numbers collapse promising {{city}} conversations.', solution: 'Build a defensible model with real unit economics.' },
      { mistake: 'Chasing the Wrong Capital', consequence: 'Pursuing a fit-poor source wastes months of runway.', solution: 'Match the capital path to your stage and model.' },
      { mistake: 'No Data Room', consequence: 'Disorganized diligence stalls or kills the raise.', solution: 'Prepare a complete data room before outreach.' },
      { mistake: 'A Vague Investor Narrative', consequence: 'Investors who do not grasp the value do not commit.', solution: 'Craft a clear, evidence-backed narrative.' },
    ],
    marketAngle: 'regional capital rewards demonstrated traction and sound unit economics over hype, so proving the model matters most',
    buyerAngle: 'investors here reward traction over hockey-stick projections and lean heavily on local references and reputation',
    demandDriver: 'As more {{city}} founders emerge from {{univ}} and the region\'s research and startup networks, demand is rising for help navigating a capital scene that rewards traction over hype.',
    approach: 'run readiness first, fix the model and data room, shape a narrative that fits regional investors, then open warm doors into the right {{region}} capital — in that order',
    insight: 'Most {{city}} raises are lost in diligence, not in the pitch — the deck opens the door, but the data room and the model are what close the round.',
    value: {
      money: 'Raising on the right terms with a defensible model preserves founder equity and prevents costly down-rounds.',
      time: 'A complete data room and a targeted investor list compress a raise that otherwise drags on for months.',
      risk: 'Fixing readiness before outreach protects the finite pool of {{city}} investor relationships you cannot afford to burn.',
      status: 'Walking into regional investor meetings fully prepared signals a fundable operator and earns the next introduction.',
    },
  },

  pitchdeck: {
    disc: 'pitch deck and investor storytelling', readerGoal: 'a deck that makes investors lean in',
    outcome: 'a deck and narrative that move investors to a meeting',
    terms: ['the narrative arc', 'the ask', 'the traction slide', 'market sizing', 'investor Q&A'],
    problems: [
      'A deck that buries the story and loses investors by slide three',
      'No clear traction or market story that makes the opportunity obvious',
      'Slides that trigger tough questions instead of answering them',
    ],
    deliverables: [
      { title: 'Narrative & Story Architecture', icon: '📖', desc: 'A compelling arc that makes your opportunity obvious to {{region}} investors.' },
      { title: 'Deck Design & Build', icon: '🎨', desc: 'A clean, investor-grade deck that carries the story visually.' },
      { title: 'Traction & Market Slides', icon: '📈', desc: 'Traction and market sizing framed to make the case undeniable.' },
      { title: 'Financial Summary Slides', icon: '💰', desc: 'Clear financials that align with your model and survive scrutiny.' },
      { title: 'The Ask & Use of Funds', icon: '🎯', desc: 'A crisp ask and use-of-funds that answers the investor\'s first question.' },
      { title: 'Q&A & Appendix Prep', icon: '📋', desc: 'An appendix and Q&A prep so you handle diligence with confidence.' },
    ],
    mistakes: [
      { mistake: 'Burying the Story', consequence: 'Investors tune out before the opportunity lands.', solution: 'Lead with a clear, compelling narrative arc.' },
      { mistake: 'Weak Traction Framing', consequence: 'Real progress looks unimpressive when framed poorly.', solution: 'Frame traction to make momentum undeniable.' },
      { mistake: 'A Vague Ask', consequence: 'Investors cannot act on an unclear request.', solution: 'State the ask and use of funds plainly.' },
      { mistake: 'Overloaded Slides', consequence: 'Dense slides drown the message.', solution: 'Simplify to one idea per slide.' },
      { mistake: 'No Q&A Prep', consequence: 'Fumbled questions undo a strong deck.', solution: 'Prepare an appendix and rehearse Q&A.' },
    ],
    marketAngle: 'a pitch that leads with traction and sound economics outperforms a flashier coastal-style deck',
    buyerAngle: 'investors here skim for the story, the traction, and the ask, and lose interest if those are not immediately clear',
    demandDriver: 'As regional founders compete for a limited pool of local capital, a deck that makes the opportunity obvious in the first minutes has become the price of entry.',
    approach: 'build the narrative arc first, frame traction to make momentum undeniable, then design a clean, investor-grade deck with the ask and use of funds up front',
    insight: 'A great {{city}} deck is not the one with the most slides but the one an investor can retell after a single read — memorability, not density, wins the meeting.',
    value: {
      money: 'A deck that frames traction well can shift the valuation conversation and the terms of the round.',
      time: 'A tight narrative shortens the path to a yes, so founders spend fewer weeks in clarifying meetings.',
      risk: 'A clear ask and diligence-ready appendix prevent the fumbled questions that kill strong {{city}} pitches.',
      status: 'An investor-grade deck signals a founder who understands the room, earning seriousness few receive.',
    },
  },

  investor: {
    disc: 'investor relations and communications', readerGoal: 'keeping investors confident and engaged',
    outcome: 'investors who stay confident, engaged, and ready to re-invest',
    terms: ['investor updates', 'the board deck', 'KPI reporting', 'stakeholder communications', 'reporting cadence'],
    problems: [
      'Investors kept in the dark between rounds, eroding confidence',
      'Board meetings that feel like scrambles instead of strategic reviews',
      'No consistent reporting, so bad news lands as a surprise',
    ],
    deliverables: [
      { title: 'IR Strategy & Cadence', icon: '🗓️', desc: 'A communication rhythm that keeps investors informed and confident.' },
      { title: 'Investor Update Templates', icon: '📧', desc: 'Clear, consistent updates that build trust between rounds.' },
      { title: 'Board Deck & Reporting', icon: '📊', desc: 'Board materials that turn meetings into strategic conversations.' },
      { title: 'KPI Dashboard', icon: '📈', desc: 'A live view of the metrics investors care about most.' },
      { title: 'Stakeholder Messaging', icon: '🗣️', desc: 'Messaging for good news and hard news alike, handled with credibility.' },
      { title: 'Cap Table & Data Hygiene', icon: '📋', desc: 'Clean records so your next raise or diligence runs smoothly.' },
    ],
    mistakes: [
      { mistake: 'Going Dark Between Rounds', consequence: 'Silence erodes investor confidence and future support.', solution: 'Send consistent, scheduled updates.' },
      { mistake: 'Surprising the Board', consequence: 'Bad news that lands cold damages trust.', solution: 'Report continuously so nothing is a surprise.' },
      { mistake: 'Vanity Metrics in Updates', consequence: 'Fluffy metrics undermine credibility with investors.', solution: 'Report the KPIs that actually matter.' },
      { mistake: 'Messy Cap Table', consequence: 'Disorganized records stall the next raise.', solution: 'Keep the cap table and data room clean.' },
      { mistake: 'No Cadence', consequence: 'Ad hoc communication reads as disorganized.', solution: 'Establish a reliable reporting rhythm.' },
    ],
    marketAngle: 'in a tight-knit regional investor community, a founder\'s reputation for clear updates travels quickly',
    buyerAngle: 'investors here read consistency as competence and extend latitude to founders who report reliably',
    demandDriver: 'As regional portfolios mature, investors increasingly expect the steady, professional reporting that signals a company worth their next check.',
    approach: 'set a reporting cadence, build clear update and board templates, then keep the KPI dashboard and cap table clean so every raise and review runs smoothly',
    insight: 'The fastest way to lose a {{city}} investor\'s confidence is to go quiet between rounds; steady, honest reporting is what earns the follow-on.',
    value: {
      money: 'Confident, well-informed investors are far more likely to fund the next round, lowering the cost of future capital.',
      time: 'Reusable templates and a live dashboard turn board prep from a quarterly scramble into a routine.',
      risk: 'Continuous reporting means hard news is never a surprise, protecting trust a single blindsided meeting can destroy.',
      status: 'A reputation for clear communication travels through the {{region}} investor community and shapes future access to capital.',
    },
  },

  franchisegrowth: {
    disc: 'franchise growth and expansion strategy', readerGoal: 'expanding into new territory without breaking operations',
    outcome: 'sequenced expansion that scales revenue without operational chaos',
    terms: ['territory strategy', 'unit economics', 'the expansion roadmap', 'site selection', 'multi-unit scaling'],
    problems: [
      'Expanding into new {{region}} territory without the data to time it right',
      'Operations that buckle every time you try to add a location',
      'Unit economics that are not strong enough to scale profitably',
    ],
    deliverables: [
      { title: 'Growth Readiness Assessment', icon: '✅', desc: 'An honest read on whether operations and unit economics can support new {{city}} locations.' },
      { title: 'Territory & Market Analysis', icon: '🗺️', desc: '{{region}} demographic and competitive data to time and place expansion right.' },
      { title: 'Expansion Roadmap', icon: '📈', desc: 'A sequenced plan that scales along {{corridor}} without overextension.' },
      { title: 'Unit Economics Optimization', icon: '💰', desc: 'Strengthening margin and payback so scale amplifies a profitable model.' },
      { title: 'Operational Playbooks', icon: '⚙️', desc: 'Repeatable systems so each new {{county}} unit opens cleaner and ramps faster.' },
      { title: 'Milestone & Accountability Structure', icon: '📋', desc: 'Milestone reviews that keep expansion on its execution timeline.' },
    ],
    mistakes: [
      { mistake: 'Expanding Before Operations Are Ready', consequence: 'New locations overload systems and pull the business backward.', solution: 'Assess readiness before committing to expansion.' },
      { mistake: 'Scaling Weak Unit Economics', consequence: 'Growth multiplies losses when the model is not yet profitable.', solution: 'Optimize unit economics before scaling.' },
      { mistake: 'No Territory Data', consequence: 'Guessing on new markets wastes capital on the wrong corridors.', solution: 'Use {{region}} market data to time and place growth.' },
      { mistake: 'Hiring Too Slowly for Growth', consequence: 'Understaffed expansion breaks service and momentum.', solution: 'Sequence hiring ahead of demand in key roles.' },
      { mistake: 'No Milestone Accountability', consequence: 'Expansion drifts off plan when daily operations take over.', solution: 'Run structured milestone reviews.' },
    ],
    marketAngle: 'timing and site selection depend on genuinely local market intelligence, not a national playbook',
    buyerAngle: 'this market rewards patient, community-connected growth over aggressive capture',
    demandDriver: 'As {{region}} keeps developing along {{corridor}}, established operators face real windows to add territory — but only those ready operationally can seize them profitably.',
    approach: 'assess whether operations and unit economics can support new units, map territory with local data, then sequence expansion so each location opens cleaner than the last',
    insight: 'Most failed {{city}} expansions were operationally doomed before opening day — the model could not support a second location, and no amount of marketing fixes that.',
    value: {
      money: 'Sequencing against proven unit economics ensures new capital amplifies a profitable model, not a hidden loss.',
      time: 'Repeatable playbooks let each new {{county}} unit open and ramp faster than the improvised launch before it.',
      risk: 'A readiness assessment catches the staffing and cash-flow breakpoints that collapse businesses growing too fast.',
      status: 'Disciplined expansion builds the track record that earns lender and franchisor confidence for the next stage.',
    },
  },

  localfranchise: {
    disc: 'local and multi-unit franchise marketing', readerGoal: 'driving store-level demand across every location',
    outcome: 'each location generating its own steady local demand',
    terms: ['local store marketing', 'co-op ad funds', 'multi-unit budgeting', 'grand-opening campaigns', 'brand standards'],
    problems: [
      'Corporate campaigns that never translate into foot traffic at the local {{city}} unit',
      'Marketing budget split evenly across locations regardless of real demand',
      'Local execution that drifts from brand standards or stalls entirely',
    ],
    deliverables: [
      { title: 'Local Market Assessment', icon: '🔍', desc: 'A read on demand and competition around each {{county}} location.' },
      { title: 'Location Pages & Local SEO', icon: '📍', desc: 'Each unit ranks for the {{city}}-area searches that bring in nearby customers.' },
      { title: 'Territory Budget Allocation', icon: '💰', desc: 'Budget split across locations by real demand signals, not equal shares.' },
      { title: 'Local Campaign Execution', icon: '📣', desc: 'Store-level campaigns that stay on-brand while feeling native to {{city}}.' },
      { title: 'Grand-Opening Playbook', icon: '🚀', desc: 'Launch campaigns that get a new {{region}} location profitable faster.' },
      { title: 'Co-op Fund Management', icon: '🤝', desc: 'Making co-op and brand-fund dollars work harder across the {{metroShort}}.' },
    ],
    mistakes: [
      { mistake: 'Relying on Corporate Marketing Alone', consequence: 'National campaigns rarely fill a specific {{city}} store.', solution: 'Add local store marketing tuned to each unit.' },
      { mistake: 'Equal Budget Splits', consequence: 'Even splits starve the strongest unit and prop up the weakest.', solution: 'Allocate budget by real local demand signals.' },
      { mistake: 'Off-Brand Local Execution', consequence: 'Inconsistent local marketing erodes the brand.', solution: 'Keep execution inside brand standards.' },
      { mistake: 'Weak Grand Openings', consequence: 'A soft launch leaves a new location slow to ramp.', solution: 'Run a structured grand-opening campaign.' },
      { mistake: 'Wasting Co-op Funds', consequence: 'Unused or misused co-op dollars leave growth on the table.', solution: 'Actively manage co-op funds for local return.' },
    ],
    marketAngle: 'you have to win at the individual store level in each suburb, not just at the brand level',
    buyerAngle: 'customers choose by neighborhood and community connection, treating each store as a local business',
    demandDriver: 'As demand varies sharply across {{countyTrade}}, operators increasingly need location-level marketing rather than one-size corporate campaigns that starve individual stores.',
    approach: 'assess demand around each location, rank every unit locally, then allocate budget by real store-level signals and launch new sites with a grand-opening playbook',
    insight: 'Splitting a franchise budget evenly across {{city}} locations feels fair but quietly starves your strongest unit and props up your weakest — demand, not equality, should set the split.',
    value: {
      money: 'Allocating budget by real local demand puts every dollar where it produces the most store-level traffic.',
      time: 'A repeatable grand-opening playbook gets each new {{region}} location to profitability faster.',
      risk: 'On-brand local execution keeps store-level marketing consistent, protecting the brand while winning each neighborhood.',
      status: 'Strong presence in each community positions every unit as the local option, not a distant chain outpost.',
    },
  },

  operations: {
    disc: 'operations and process consulting', readerGoal: 'fixing the operational leaks quietly costing you money',
    outcome: 'leaner operations, protected margin, and capacity to grow',
    terms: ['process mapping', 'bottlenecks', 'standard operating procedures', 'margin leaks', 'capacity planning'],
    problems: [
      'Revenue leaking inside operations — not the market — through inefficiency and rework',
      'Bottlenecks and staffing gaps that cap how much the business can handle',
      'No documented processes, so quality depends on who happens to be working',
    ],
    deliverables: [
      { title: 'Operations & Process Audit', icon: '🔍', desc: 'We map how work flows and pinpoint the bottlenecks costing your {{city}} business margin.' },
      { title: 'Workflow Redesign', icon: '⚙️', desc: 'Streamlined workflows that remove rework and speed up delivery.' },
      { title: 'SOPs & Documentation', icon: '📘', desc: 'Standard operating procedures so quality no longer depends on individuals.' },
      { title: 'Margin & Cost Analysis', icon: '💰', desc: 'Finding the pricing and cost leaks quietly eroding {{county}} profitability.' },
      { title: 'Capacity & Staffing Plan', icon: '👥', desc: 'A staffing model that supports growth without premature overhead.' },
      { title: 'Performance Dashboards', icon: '📊', desc: 'Operational metrics so leaders manage on data, not gut feel.' },
    ],
    mistakes: [
      { mistake: 'Chasing Growth Before Fixing Operations', consequence: 'Scaling a leaky operation multiplies the losses.', solution: 'Fix operational gaps before investing in growth.' },
      { mistake: 'No Documented Processes', consequence: 'Quality swings with whoever is working that day.', solution: 'Document SOPs for repeatable results.' },
      { mistake: 'Ignoring Margin Leaks', consequence: 'Small inefficiencies compound into real lost profit.', solution: 'Analyze and close pricing and cost leaks.' },
      { mistake: 'Overstaffing or Understaffing', consequence: 'The wrong staffing level either burns cash or breaks service.', solution: 'Plan capacity against real demand.' },
      { mistake: 'Managing Without Metrics', consequence: 'Gut-feel management hides the real problems.', solution: 'Stand up operational dashboards.' },
    ],
    marketAngle: 'in a competitive local market, closing operational leaks often returns faster than any new marketing spend',
    buyerAngle: 'owners feel the symptoms — rework, missed jobs, thin margins — long before they can name the cause',
    demandDriver: 'As labor costs rise and lean {{county}} teams stretch thin, owners increasingly turn to operational fixes for the fastest available return on their money.',
    approach: 'map how work actually flows, pinpoint the bottlenecks and margin leaks, document repeatable procedures, then build the dashboards that let you manage on data',
    insight: 'For most established {{city}} businesses, the lost revenue is hiding inside operations, not the market — and closing those leaks usually pays back faster than more marketing.',
    value: {
      money: 'Closing the pricing and process leaks buried in operations recovers margin no amount of extra sales would have produced.',
      time: 'Documented procedures and streamlined workflows give owners back the hours spent firefighting the same problems.',
      risk: 'Standard operating procedures make quality independent of who is working, protecting the business from key-person dependence.',
      status: 'A visibly well-run operation earns the confidence of the lenders, partners, and large customers {{region}} businesses depend on.',
    },
  },

  advisory: {
    disc: 'business advisory, coaching, and mentorship', readerGoal: 'an experienced outside perspective on the decisions that matter',
    outcome: 'faster, more confident decisions with an experienced partner in your corner',
    terms: ['decision support', 'accountability', 'a strategic sounding board', 'operating cadence', 'the growth plan'],
    problems: [
      'Making high-stakes decisions alone, without the experience to weigh them confidently',
      'Knowing the business needs to change but lacking an objective outside perspective',
      'Drifting from the plan when daily operations take over',
    ],
    deliverables: [
      { title: 'Business & Goal Assessment', icon: '🔍', desc: 'A clear read on where your {{city}} business stands and where you want it to go.' },
      { title: 'Strategic Advisory Sessions', icon: '🧭', desc: 'Regular working sessions that bring experience to your biggest decisions.' },
      { title: 'Decision Support Framework', icon: '⚖️', desc: 'Market data and structured thinking behind hiring, pricing, and growth calls.' },
      { title: 'Accountability Structure', icon: '📋', desc: 'Milestones and check-ins that keep you moving through the plan.' },
      { title: 'Leadership & Team Coaching', icon: '👥', desc: 'Coaching that strengthens how you and your {{county}} team operate.' },
      { title: 'Network & Resource Access', icon: '🤝', desc: 'Connections into {{city}} institutions and the right local resources at the right time.' },
    ],
    mistakes: [
      { mistake: 'Deciding Alone', consequence: 'Solo decisions on major calls carry unnecessary risk.', solution: 'Bring an experienced sounding board to key decisions.' },
      { mistake: 'No Accountability', consequence: 'Good plans drift when daily work takes over.', solution: 'Add milestones and regular check-ins.' },
      { mistake: 'Hiring Out-of-Market Advisors', consequence: 'Credentials without {{region}} context miss what matters locally.', solution: 'Work with advisors who know this market.' },
      { mistake: 'Avoiding Hard Feedback', consequence: 'Comfortable advice never changes the business.', solution: 'Seek an honest outside perspective.' },
      { mistake: 'Waiting for a Crisis', consequence: 'Engaging only under pressure leaves fewer options.', solution: 'Build the advisory relationship proactively.' },
    ],
    marketAngle: 'an advisor plugged into local institutions opens doors as much as they guide decisions',
    buyerAngle: 'trust is personal here, so owners open up to an advisor who knows the market far faster than to a distant stranger',
    demandDriver: 'As owners hit decisions bigger than any they have faced before, demand rises for a seasoned outside perspective that national coaches without local context cannot provide.',
    approach: 'meet regularly as a strategic sounding board, bring market data to your biggest calls, hold you accountable to milestones, and open doors into {{city}} institutions',
    insight: 'The most expensive decisions {{city}} owners make are the ones they make alone at speed; an experienced local advisor is cheap insurance against a costly, avoidable misstep.',
    value: {
      money: 'One well-timed piece of advice on a major decision can save or make more than the entire engagement costs.',
      time: 'A trusted sounding board shortens the deliberation on hard calls, so owners decide instead of circling for weeks.',
      risk: 'An objective outside perspective catches the blind spots founders inside the business consistently miss.',
      status: 'Working with a respected {{region}} advisor opens doors — to partners, capital, and talent — a solo owner rarely reaches.',
    },
  },

  growth: {
    disc: 'growth and scaling consulting', readerGoal: 'scaling what works without breaking what you built',
    outcome: 'sustainable, sequenced growth that does not outrun operations',
    terms: ['unit economics', 'the growth engine', 'customer acquisition', 'retention', 'operational readiness'],
    problems: [
      'Early traction that keeps stalling every time you push for growth',
      'Scaling spend before the unit economics can support it',
      'Growth that outruns operations and creates chaos instead of profit',
    ],
    deliverables: [
      { title: 'Growth Readiness Diagnosis', icon: '✅', desc: 'We diagnose whether operations and unit economics can actually support scale.' },
      { title: 'Unit Economics Optimization', icon: '💰', desc: 'Fixing margin, retention, and acquisition cost so scale amplifies a sound model.' },
      { title: 'Customer Acquisition System', icon: '🎯', desc: 'Repeatable acquisition beyond founder-led sales, tuned to the {{city}} market.' },
      { title: 'Scaling Roadmap', icon: '📈', desc: 'A sequenced plan that grows revenue without breaking operations.' },
      { title: 'Team & Org Structure', icon: '👥', desc: 'Hiring sequence and structure that support scale while staying lean.' },
      { title: 'Growth Metrics & Reporting', icon: '📊', desc: 'The metrics that predict sustainable scale, tracked continuously.' },
    ],
    mistakes: [
      { mistake: 'Scaling Before Fixing Unit Economics', consequence: 'Growth capital amplifies losses when the model leaks.', solution: 'Fix unit economics before pushing growth.' },
      { mistake: 'Mistaking Traction for Scalability', consequence: 'Early wins can mask a model that will not scale.', solution: 'Diagnose readiness before deploying growth spend.' },
      { mistake: 'Growth Outrunning Operations', consequence: 'Ops break at exactly the wrong moment.', solution: 'Sequence growth against operational readiness.' },
      { mistake: 'Founder-Dependent Sales', consequence: 'Growth stalls when it all runs through the founder.', solution: 'Build repeatable acquisition systems.' },
      { mistake: 'Tracking Vanity Metrics', consequence: 'Vanity numbers hide stalling growth.', solution: 'Track the metrics that predict sustainable scale.' },
    ],
    marketAngle: 'the local talent pool and capital environment reward disciplined, sequenced growth over growth-at-all-costs',
    buyerAngle: 'customers scale with businesses they trust to keep delivering, so growth that outruns quality quietly reverses',
    demandDriver: 'As more {{county}} companies reach the post-traction stage, demand grows for scaling support that fits this market\'s talent and capital realities rather than a Silicon Valley playbook.',
    approach: 'diagnose whether operations and unit economics can support scale, fix the leaks first, then build repeatable acquisition and the org structure to grow without breaking',
    insight: 'Early traction fools {{city}} founders into scaling a model that was never built for volume; growth amplifies whatever is already there, including the cracks.',
    value: {
      money: 'Fixing unit economics before scaling ensures growth capital multiplies profit rather than accelerating a loss.',
      time: 'Repeatable acquisition systems move growth off the founder\'s personal effort, so the business scales without the owner as bottleneck.',
      risk: 'A readiness diagnosis prevents the operational collapse that hits companies that mistake early traction for scalability.',
      status: 'Disciplined, documented scaling builds the metrics credibility regional investors and partners look for.',
    },
  },

  startup: {
    disc: 'startup strategy and go-to-market consulting', readerGoal: 'building and launching something that actually gains traction',
    outcome: 'a validated, launch-ready business with early traction',
    terms: ['product-market fit', 'go-to-market', 'the business model', 'validation', 'the launch plan'],
    problems: [
      'A promising idea with no structure around how to actually build the business',
      'Building against national assumptions instead of how the {{city}} market behaves',
      'Burning early runway on the wrong activities before reaching traction',
    ],
    deliverables: [
      { title: 'Business Model Stress Test', icon: '🔍', desc: 'We pressure-test your assumptions against {{region}} cost and demand realities.' },
      { title: 'Market Validation', icon: '✅', desc: 'Structured discovery with real {{county}} prospects before you overbuild.' },
      { title: 'Go-To-Market Plan', icon: '🎯', desc: 'A launch plan calibrated to how {{city}} buyers actually make decisions.' },
      { title: 'Operational Setup', icon: '⚙️', desc: 'The systems a young business needs so early growth does not create chaos.' },
      { title: 'Brand & Positioning', icon: '✨', desc: 'Identity and messaging that make an early-stage company credible from day one.' },
      { title: 'Ecosystem Navigation', icon: '🧭', desc: 'Connections into {{univ}}, {{smallBizOrg}}, and the right local resources.' },
    ],
    mistakes: [
      { mistake: 'Building Before Validating', consequence: 'Months and runway vanish building something the market never wanted.', solution: 'Validate demand with real {{city}} prospects first.' },
      { mistake: 'National Assumptions', consequence: 'Pricing and positioning built for other markets miss how {{county}} buys.', solution: 'Ground the plan in {{region}} market reality.' },
      { mistake: 'Premature Scaling', consequence: 'Scaling before fit burns cash and morale.', solution: 'Reach traction before pushing growth.' },
      { mistake: 'No Operational Foundation', consequence: 'Early growth turns into chaos without systems.', solution: 'Set up lightweight operations early.' },
      { mistake: 'Ignoring the Local Ecosystem', consequence: 'Founders miss {{city}} resources built to help them.', solution: 'Plug into {{univ}} and {{smallBizOrg}}.' },
    ],
    marketAngle: 'a go-to-market plan here is built for traction and community, not a blitz-scale narrative',
    buyerAngle: 'customers reward trust and community connection over aggressive marketing, so traction is earned through proof',
    demandDriver: 'As the {{region}} founder community grows faster than its formal support, demand rises for guidance connecting early-stage businesses to local resources and market reality.',
    approach: 'stress-test the model against local cost and demand, validate with real {{county}} prospects, then build a lean go-to-market and plug founders into the ecosystem',
    insight: 'The {{city}} startups that stall usually built against national assumptions the local market never shared; validating here first is cheaper than discovering the mismatch at launch.',
    value: {
      money: 'Validating demand before building keeps scarce early runway from funding a product or a market that was never there.',
      time: 'A local go-to-market plan skips the months of trial and error founders lose guessing at how the {{city}} market behaves.',
      risk: 'Grounding the plan in {{region}} reality avoids the pricing and positioning mistakes that sink first-time founders.',
      status: 'A structured, validated launch and ecosystem ties give a young company the credibility that opens customers and capital.',
    },
  },

  bizdev: {
    disc: 'business development consulting', readerGoal: 'turning relationships into signed revenue',
    outcome: 'a structured pipeline that converts relationships into agreements',
    terms: ['the development pipeline', 'partnership strategy', 'revenue channels', 'proposal development', 'deal conversion'],
    problems: [
      'Endless networking that never converts into actual {{city}} business',
      'One new revenue channel away from growth but no plan to open it',
      'No pipeline structure, so relationships stall in indefinite relationship-building',
    ],
    deliverables: [
      { title: 'Partnership Identification', icon: '🎯', desc: 'We identify the {{city}} partnerships worth pursuing by fit, overlap, and accessibility.' },
      { title: 'Revenue Channel Strategy', icon: '🧭', desc: 'Adjacent channels that fit your capabilities and {{region}} market position.' },
      { title: 'Development Pipeline Build', icon: '📊', desc: 'A documented pipeline with tracking, cadence, and conversion benchmarks.' },
      { title: 'Network Activation', icon: '🤝', desc: 'Strategic activation of {{chamber}} and {{univ}} networks.' },
      { title: 'Proposal & Pitch Development', icon: '📋', desc: 'Materials calibrated to how {{county}} buyers evaluate new partners.' },
      { title: 'Follow-Up System', icon: '📧', desc: 'A follow-up cadence that moves relationships to signed agreements.' },
    ],
    mistakes: [
      { mistake: 'Confusing Networking With Development', consequence: 'Relationships pile up but never convert to {{city}} revenue.', solution: 'Build a structured pipeline with conversion benchmarks.' },
      { mistake: 'Pursuing Every Opportunity', consequence: 'Spreading thin produces mediocre results everywhere.', solution: 'Concentrate on the highest-fit partnerships.' },
      { mistake: 'No Follow-Up Discipline', consequence: 'Warm {{county}} relationships go cold.', solution: 'Run a documented follow-up cadence.' },
      { mistake: 'Weak Proposals', consequence: 'Poor materials stall deals at the decision point.', solution: 'Build proposals tuned to local buyers.' },
      { mistake: 'No Pipeline Visibility', consequence: 'Without tracking, development stalls unseen.', solution: 'Track the pipeline stage by stage.' },
    ],
    marketAngle: 'the partnerships worth building require local knowledge and credible, structured outreach over cold volume',
    buyerAngle: 'partners move on trust and referral, so a warm, credible introduction outperforms the best cold pitch',
    demandDriver: 'As {{region}} sectors grow more interconnected, businesses with strong capabilities increasingly need help converting local relationships into consistent new revenue.',
    approach: 'identify the partnerships worth pursuing, activate the right {{city}} networks, then run a documented pipeline with follow-up discipline through to signed agreements',
    insight: 'Most {{city}} businesses confuse networking with development — they accumulate relationships without the pipeline and follow-up that turn them into revenue.',
    value: {
      money: 'Concentrating on the highest-fit partnerships channels effort into the relationships most likely to close.',
      time: 'A structured pipeline replaces scattered networking, so development stops depending on the owner\'s spare evenings.',
      risk: 'Disciplined follow-up keeps warm {{county}} relationships from going cold, protecting deals unstructured effort lets slip.',
      status: 'Consistent, credible outreach builds a reputation that attracts inbound partnership interest across {{city}}.',
    },
  },

  smallbiz: {
    disc: 'small business consulting', readerGoal: 'high-ROI help that fits a real small-business budget',
    outcome: 'practical, affordable strategy that moves the numbers',
    terms: ['high-ROI strategy', 'the growth plan', 'operational efficiency', 'local competition', 'cash flow'],
    problems: [
      'A limited budget that demands every marketing and strategy dollar works hard',
      'Competing against larger brands for the same {{city}} customers',
      'Wearing every hat with no outside perspective on what to prioritize',
    ],
    deliverables: [
      { title: 'Business Health Assessment', icon: '🔍', desc: 'A clear read on where your {{city}} small business stands and what to prioritize.' },
      { title: 'High-ROI Growth Plan', icon: '📈', desc: 'A focused plan that concentrates a limited budget on what moves revenue.' },
      { title: 'Local Marketing Strategy', icon: '📣', desc: 'Affordable, high-impact marketing tuned to how {{county}} customers buy.' },
      { title: 'Operational Efficiency Review', icon: '⚙️', desc: 'Finding the process and cost fixes that protect margin.' },
      { title: 'Competitive Positioning', icon: '🎯', desc: 'A position that lets you compete with larger brands on more than price.' },
      { title: 'Ongoing Advisory', icon: '🤝', desc: 'A practical sounding board for the decisions that matter as you grow.' },
    ],
    mistakes: [
      { mistake: 'Spreading a Thin Budget Everywhere', consequence: 'A little of everything produces nothing for a small {{city}} business.', solution: 'Concentrate budget on the highest-ROI moves.' },
      { mistake: 'Competing Only on Price', consequence: 'A race to the bottom against larger brands you cannot win.', solution: 'Differentiate on value and local trust.' },
      { mistake: 'Doing Everything In-House', consequence: 'Owner burnout and subpar execution across the board.', solution: 'Focus on your strengths and get help on the rest.' },
      { mistake: 'Ignoring the Numbers', consequence: 'Gut-feel decisions miss what data would reveal.', solution: 'Track a few key metrics weekly.' },
      { mistake: 'Inconsistent Effort', consequence: 'Start-stop marketing creates boom-and-bust revenue.', solution: 'Commit to a steady, sustainable cadence.' },
    ],
    marketAngle: 'the winning strategy concentrates a limited budget on local trust and the highest-ROI moves',
    buyerAngle: 'customers value community and consistency, so showing up reliably beats outspending bigger competitors',
    demandDriver: 'As larger competitors professionalize their marketing, {{region}} small businesses increasingly need affordable, focused help to keep pace without an in-house team.',
    approach: 'assess the whole business, concentrate a limited budget on the few highest-ROI moves, and pair affordable local marketing with the operational fixes that protect margin',
    insight: 'The most common small-business mistake in {{city}} is doing a little of everything; a focused budget on two moves that fit this market beats a thin spread across ten.',
    value: {
      money: 'Concentrating limited budget on the highest-return moves stretches every dollar further than scattered spending.',
      time: 'Outside help frees an owner-operator from wearing every hat and doing each one halfway.',
      risk: 'A steady, sustainable plan smooths the boom-and-bust cycles that start-stop marketing creates.',
      status: 'A consistent local presence and clear differentiation let a small business compete on trust rather than price.',
    },
  },

  entrepreneur: {
    disc: 'consulting for entrepreneurs', readerGoal: 'turning a vision into a real, structured business',
    outcome: 'a clear path from idea to a running, growing business',
    terms: ['the business plan', 'go-to-market', 'operational setup', 'the growth roadmap', 'brand building'],
    problems: [
      'A strong vision but no structure to turn it into an operating business',
      'Wearing every hat with no roadmap for what comes next',
      'Building in {{city}} without knowing how this market actually behaves',
    ],
    deliverables: [
      { title: 'Vision & Business Plan', icon: '🧭', desc: 'Turning your idea into a concrete plan grounded in {{region}} reality.' },
      { title: 'Go-To-Market Strategy', icon: '🎯', desc: 'A launch plan built for how {{city}} customers actually buy.' },
      { title: 'Operational Setup', icon: '⚙️', desc: 'The systems and workflows to run the business from day one.' },
      { title: 'Brand Building', icon: '✨', desc: 'A brand identity that attracts {{county}} customers and talent.' },
      { title: 'Growth Roadmap', icon: '📈', desc: 'Market analysis and a sequenced path to sustainable growth.' },
      { title: 'Ongoing Mentorship', icon: '🤝', desc: 'Experienced guidance from operators who have built businesses in this market.' },
    ],
    mistakes: [
      { mistake: 'No Written Plan', consequence: 'A vision in your head cannot be executed or funded.', solution: 'Turn the vision into a concrete business plan.' },
      { mistake: 'Skipping Market Reality', consequence: 'Plans built on assumptions miss how {{city}} buys.', solution: 'Ground the plan in {{region}} market reality.' },
      { mistake: 'No Operational Foundation', consequence: 'Early chaos without systems stalls momentum.', solution: 'Set up lightweight operations early.' },
      { mistake: 'Weak Brand From the Start', consequence: 'A forgettable brand makes every sale harder.', solution: 'Build a clear brand identity from day one.' },
      { mistake: 'Going It Alone', consequence: 'Solo founders repeat avoidable, costly mistakes.', solution: 'Work with a mentor who knows this market.' },
    ],
    marketAngle: 'this market rewards community connection and realistic growth over a move-fast approach',
    buyerAngle: 'customers back founders they know and trust, so early traction is built on relationships and reputation',
    demandDriver: 'As more {{region}} professionals leave corporate roles to start businesses, demand grows for structured guidance that turns a vision into an operating company.',
    approach: 'turn the vision into a concrete plan grounded in local reality, set up lightweight operations, build the brand, then mentor through the first stage of growth',
    insight: 'A vision that lives only in the founder\'s head cannot be executed or funded; the first real step in {{city}} is turning it into a plan the market can respond to.',
    value: {
      money: 'A grounded plan keeps early capital from funding assumptions the {{city}} market would never have supported.',
      time: 'Lightweight systems from day one prevent the early chaos that stalls first-time founders.',
      risk: 'Validating against {{region}} reality avoids the costly pricing and positioning mistakes solo founders repeat.',
      status: 'A clear brand and structured plan make a new venture credible to the customers, partners, and lenders it needs.',
    },
  },

  marketing: {
    disc: 'full-service marketing', readerGoal: 'a marketing engine that reliably produces customers',
    outcome: 'a coordinated marketing engine that produces measurable local demand',
    terms: ['the marketing engine', 'multi-channel campaigns', 'brand and demand', 'the customer journey', 'return on marketing'],
    problems: [
      'Disconnected marketing tactics that never add up to a reliable customer flow',
      'Spending on marketing with no clear line to {{city}} revenue',
      'A brand and message that fail to stand out in the {{region}} market',
    ],
    deliverables: [
      { title: 'Marketing Audit & Strategy', icon: '🧭', desc: 'A coordinated strategy across channels, built for how {{city}} customers buy.' },
      { title: 'Brand & Messaging', icon: '🎯', desc: 'Positioning and messaging that stand out in the {{region}} market.' },
      { title: 'Digital Marketing Execution', icon: '💻', desc: 'SEO, paid media, and social run as one system, not disconnected tactics.' },
      { title: 'Content & Creative', icon: '🎨', desc: 'Content and creative that carry the brand across every {{county}} touchpoint.' },
      { title: 'Lead Generation & Nurture', icon: '🧲', desc: 'Capture and follow-up that turn attention into {{city}} customers.' },
      { title: 'Reporting & Optimization', icon: '📊', desc: 'Attribution and reporting that tie marketing to real local revenue.' },
    ],
    mistakes: [
      { mistake: 'Disconnected Tactics', consequence: 'One-off tactics never add up to a reliable {{city}} customer flow.', solution: 'Run channels as one coordinated engine.' },
      { mistake: 'No Attribution', consequence: 'Marketing spend with no line to revenue cannot be optimized.', solution: 'Track attribution from click to customer.' },
      { mistake: 'Generic, Non-Local Messaging', consequence: 'Messaging that ignores this market fails to stand out.', solution: 'Ground brand and message in {{region}} context.' },
      { mistake: 'Chasing Every Channel', consequence: 'Spreading thin dilutes results everywhere.', solution: 'Prioritize the channels that fit your buyers.' },
      { mistake: 'No Follow-Up', consequence: 'Attention arrives and leaves without capture.', solution: 'Add lead capture and nurture throughout.' },
    ],
    marketAngle: 'consistent local presence and follow-up outperform scattered tactics or pure ad volume',
    buyerAngle: 'they weigh community credibility heavily and move across several touchpoints, so brand and demand build together',
    demandDriver: 'As buyers spread across more channels, {{county}} businesses increasingly need marketing that works as a connected system rather than a set of disconnected one-off efforts.',
    approach: 'align brand, search, paid, social, and content into one system, tie every channel to attribution, then optimize the whole engine toward booked customers',
    insight: 'Most {{city}} marketing underperforms not for lack of effort but for lack of coordination — disconnected tactics never compound into a reliable flow of customers.',
    value: {
      money: 'A coordinated engine with real attribution moves budget toward what works, ending the waste of unmeasured channels.',
      time: 'One integrated system replaces the churn of managing disconnected vendors and tactics that never add up.',
      risk: 'Building brand and demand together protects you from over-reliance on any single channel or short-term tactic.',
      status: 'Consistent, professional presence across every {{city}} touchpoint positions you as an established leader.',
    },
  },

  consulting: {
    disc: 'business consulting', readerGoal: 'an experienced outside perspective that moves the business forward',
    outcome: 'clearer strategy, tighter operations, and confident decisions',
    terms: ['strategic planning', 'operational assessment', 'the growth strategy', 'decision support', 'competitive positioning'],
    problems: [
      'Knowing something is off but being unable to see it from inside the business',
      'Making major strategic decisions without objective outside perspective',
      'Strategy that never translates into operational results',
    ],
    deliverables: [
      { title: 'Business & Market Assessment', icon: '🔍', desc: 'An honest read on where your {{city}} business stands against its market and competition.' },
      { title: 'Strategic Plan', icon: '🧭', desc: 'A clear plan with priorities and benchmarks tuned to {{region}} conditions.' },
      { title: 'Operational Review', icon: '⚙️', desc: 'Finding the gaps and inefficiencies costing your {{county}} business.' },
      { title: 'Growth Strategy', icon: '📈', desc: 'A sequenced growth plan built for how the {{city}} market behaves.' },
      { title: 'Competitive Positioning', icon: '🎯', desc: 'Positioning against the real competitors you face in {{counties}}.' },
      { title: 'Implementation Support', icon: '🤝', desc: 'Staying engaged through execution so strategy becomes operational results.' },
    ],
    mistakes: [
      { mistake: 'Waiting for a Crisis', consequence: 'Engaging only under pressure leaves fewer {{city}} options.', solution: 'Bring in outside perspective proactively.' },
      { mistake: 'Strategy Without Implementation', consequence: 'A strategy deck that gathers dust changes nothing.', solution: 'Stay engaged through execution.' },
      { mistake: 'Hiring Out-of-Market Firms', consequence: 'Generic recommendations miss {{region}} dynamics.', solution: 'Work with advisors who know this market.' },
      { mistake: 'Ignoring Operations', consequence: 'Growth plans fail when operations cannot support them.', solution: 'Assess operational readiness alongside strategy.' },
      { mistake: 'Deciding Without Data', consequence: 'Gut-feel calls miss what local market data reveals.', solution: 'Bring market data to major decisions.' },
    ],
    marketAngle: 'consulting that combines genuine local intelligence with implementation support fills a real gap here',
    buyerAngle: 'owners value practical, implementable advice from someone who knows the local market, and distrust strategy without a path to execution',
    demandDriver: 'As {{county}} businesses reach the growth stage where outside perspective pays off, demand rises for advisors who deliver results here rather than generic frameworks.',
    approach: 'assess the business against its real market, build a prioritized plan, then stay engaged through implementation so strategy becomes operational results',
    insight: 'A strategy deck that gathers dust is the most common consulting failure in {{city}}; the value is not the plan but the change it drives when someone stays to execute it.',
    value: {
      money: 'Identifying the few highest-leverage moves focuses investment where it produces return instead of spreading thin.',
      time: 'An experienced partner handles the market analysis and planning that would otherwise pull the owner off the business.',
      risk: 'Objective assessment surfaces the operational and strategic blind spots owners inside the business overlook.',
      status: 'A recognized local consulting relationship lends the strategic credibility owner-operated {{region}} businesses struggle to project alone.',
    },
  },
};

// Ordered detection: first matching rule wins (specific → generic).
const topicRules = [
  [/local-seo|(^|-)seo(-|$)|seo-services/, 'seo'],
  [/google-ads|(^|-)ppc(-|$)|performance-marketing|advertising/, 'paidads'],
  [/social-media/, 'social'],
  [/content-marketing/, 'content'],
  [/website|web-development/, 'website'],
  [/reputation/, 'reputation'],
  [/pitch-deck/, 'pitchdeck'],
  [/investor-relations|investor-marketing/, 'investor'],
  [/capital|fundraising|funding|capital-raise|growth-investment/, 'funding'],
  [/sales-funnel|deal-flow/, 'funnel'],
  [/ai-marketing|ai-marketing-solutions/, 'aimarketing'],
  [/lead-generation|customer-acquisition|franchisee-acquisition|recruitment-marketing|development-marketing/, 'leadgen'],
  [/crm|automation|software-implementation|digital-transformation|marketing-systems|tech-consulting/, 'techsystems'],
  [/analytics/, 'analytics'],
  [/rebrand|brand-positioning|brand-strategy|brand-development|brand-consulting|brand-marketing|brand-growth|branding|creative-marketing/, 'branding'],
  [/territory|expansion|franchise-scaling|scaling-consulting|franchise-launch|franchise-startup|franchise-development|franchise-growth/, 'franchisegrowth'],
  [/multi-unit|location-marketing|local-marketing|franchisee-marketing|marketing-for-franchise-owners|corporate-marketing-support/, 'localfranchise'],
  [/operations|operational|process|efficiency|profitability|systems-consulting|organizational-development|management-consulting/, 'operations'],
  [/coaching|mentor|mentorship|advisor|advisory|leadership/, 'advisory'],
  [/business-development/, 'bizdev'],
  [/growth|scaling/, 'growth'],
  [/startup|accelerator|venture/, 'startup'],
  [/small-business/, 'smallbiz'],
  [/entrepreneur/, 'entrepreneur'],
  [/marketing/, 'marketing'],
  [/consulting|strategy|business|firm|advisor/, 'consulting'],
];

function detectTopic(service) {
  const text = `${service.slug}`.toLowerCase();
  for (const [re, key] of topicRules) if (re.test(text)) return key;
  return 'consulting';
}

// --- CLI + IO ---------------------------------------------------------------
function getArgValue(name) {
  const prefix = `--${name}=`;
  return process.argv.find((a) => a.startsWith(prefix))?.slice(prefix.length);
}
function hasArg(name) { return process.argv.includes(`--${name}`); }
async function readText(rel) { return fs.readFile(path.join(rootDir, rel), 'utf8'); }
async function loadServices() {
  const raw = await readText('lib/franchise-keywords.ts');
  const re = /slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*description:\s*"([^"]+)"/g;
  const services = [];
  let m;
  while ((m = re.exec(raw))) services.push({ slug: m[1], title: m[2], category: m[3], description: m[4] });
  return services;
}
async function loadExisting(p) { try { return JSON.parse(await fs.readFile(p, 'utf8')); } catch { return {}; } }
function titleCase(v) { return v.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()); }
// Title-case a natural phrase: keep hyphens, lowercase small connecting words
// (except the first word). "aerospace and defense" -> "Aerospace and Defense".
const SMALL_WORDS = new Set(['and', 'or', 'for', 'to', 'the', 'of', 'a', 'an', 'in', 'on', 'with']);
function phraseTitle(s) {
  return s.split(' ').map((w, i) => (i > 0 && SMALL_WORDS.has(w.toLowerCase()) ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1))).join(' ');
}
const ACRONYMS = ['SEO', 'PPC', 'CRM', 'AI', 'ROI', 'B2B'];
function serviceLower(title) {
  let s = title.toLowerCase();
  for (const a of ACRONYMS) s = s.replace(new RegExp(`\\b${a.toLowerCase()}\\b`, 'g'), a);
  return s;
}
function lowerFirst(s) { return s ? s.charAt(0).toLowerCase() + s.slice(1) : s; }
// Lowercase the first letter unless the sentence opens with an acronym (AI, SEO…).
function lcFirstSafe(s) { if (!s) return s; if (/^[A-Z]{2,}/.test(s)) return s; return s.charAt(0).toLowerCase() + s.slice(1); }
function aOrAn(w) { return /^[aeiou]/i.test(w) ? 'an' : 'a'; }

// --- Seeded RNG (deterministic per compound key) ----------------------------
function hashString(str) {
  let h1 = 0xdeadbeef ^ 0, h2 = 0x41c6ce57 ^ 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h1 >>> 0) + (h2 >>> 0) * 4294967296;
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function createRng(key) { return mulberry32(Number(hashString(key) % 2 ** 31)); }
function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
function pickN(rng, arr, n) {
  const copy = arr.slice(); const out = [];
  for (let i = 0; i < n && copy.length; i++) out.push(copy.splice(Math.floor(rng() * copy.length), 1)[0]);
  return out;
}

function profileFor(service) { return categoryProfiles[service.category] ?? categoryProfiles.consulting; }
function familyDefault() { return 'consulting'; }

// --- Token rendering --------------------------------------------------------
function render(str, tokens) {
  return String(str).replace(/\{\{(\w+)\}\}/g, (_, k) => (k in tokens ? tokens[k] : `{{${k}}}`));
}
function renderPack(pack, tokens) {
  const r = (s) => render(s, tokens);
  return {
    disc: r(pack.disc),
    readerGoal: r(pack.readerGoal),
    outcome: r(pack.outcome),
    terms: pack.terms.map(r),
    problems: pack.problems.map(r),
    deliverables: pack.deliverables.map((d) => ({ title: d.title, icon: d.icon, desc: r(d.desc) })),
    mistakes: pack.mistakes.map((m) => ({ mistake: m.mistake, consequence: r(m.consequence), solution: r(m.solution) })),
    marketAngle: r(pack.marketAngle),
    buyerAngle: r(pack.buyerAngle),
    demandDriver: r(pack.demandDriver),
    approach: r(pack.approach),
    insight: r(pack.insight),
    value: { money: r(pack.value.money), time: r(pack.value.time), risk: r(pack.value.risk), status: r(pack.value.status) },
  };
}

// --- Context ----------------------------------------------------------------
function buildCtx(profile, service, rng) {
  const pack = PACKS[detectTopic(service)] ?? PACKS[familyDefault()];
  const prof = profileFor(service);
  const anchorInst = pick(rng, profile.institutions);
  const anchorInd = pick(rng, profile.industries);
  const [suburb1, suburb2] = pickN(rng, profile.suburbs, 2);
  const suburbList = profile.suburbs.slice(0, 3).map((s, i, a) => (i === a.length - 1 ? `and ${s}` : s)).join(', ');
  const corridor = pick(rng, profile.corridors);
  const indShort = anchorInd;
  const indTitle = phraseTitle(anchorInd);

  const tokens = {
    city: profile.city, state: profile.state, region: profile.region, regionShort: profile.regionShort,
    county: profile.county, county2: profile.county2, counties: profile.counties, countyTrade: profile.countyTrade,
    metroFull: profile.metroFull, metroMSA: profile.metroMSA, metroShort: profile.metroShort,
    univ: profile.univ, chamber: profile.institutions[0], smallBizOrg: profile.smallBizOrg, talent: profile.talent,
    anchor1: profile.anchor1, anchor2: profile.anchor2, anchors: profile.anchors,
    economyLine: profile.economyLine, buyerCulture: profile.buyerCulture, emergingSector: profile.emergingSector,
    inst: anchorInst, ind: indShort, indTitle,
    suburb1, suburb2, suburbList, corridor,
  };

  const rp = renderPack(pack, tokens);
  return {
    profile, service, rng, pack: rp, tokens,
    svc: service.title, svcLower: serviceLower(service.title),
    disc: rp.disc, discTitle: phraseTitle(rp.disc), outcome: rp.outcome, readerGoal: rp.readerGoal,
    audience: prof.audience, audienceTitle: prof.audienceTitle, role: prof.role,
    inst: anchorInst, ind: indShort, indTitle,
    city: profile.city, cityState: `${profile.city}, ${profile.state}`, state: profile.state,
    region: profile.region, regionShort: profile.regionShort,
    county: profile.county, counties: profile.counties, countyTrade: profile.countyTrade,
    metroFull: profile.metroFull, metroShort: profile.metroShort,
    suburb: suburb1, suburb2, corridor, univ: profile.univ, anchors: profile.anchors,
    economyLine: profile.economyLine, buyerCulture: profile.buyerCulture,
    problem0: rp.problems[0], problemLow0: lowerFirst(rp.problems[0]),
    approach: rp.approach, approachLow: lowerFirst(rp.approach),
    insight: rp.insight, demandDriver: rp.demandDriver,
    marketAngle: rp.marketAngle, buyerAngle: rp.buyerAngle, buyerCultureLow: lowerFirst(profile.buyerCulture),
    term0: rp.terms[0], term1: rp.terms[1] ?? rp.terms[0], term2: rp.terms[2] ?? rp.terms[0],
    deliv0Title: rp.deliverables[0].title, deliv1Title: rp.deliverables[1].title, deliv2Title: rp.deliverables[2].title,
    delivLastTitle: rp.deliverables[rp.deliverables.length - 1].title,
  };
}

// ===========================================================================
// SECTION MAKERS — each section does a different job (no concept repeats).
// ===========================================================================
function makeHero(c) {
  const headline = pick(c.rng, [
    () => `${c.svc} in ${c.cityState}`,
    () => `${c.svc} for ${c.audienceTitle} in ${c.cityState}`,
    () => `Trusted ${c.svc} in ${c.cityState}`,
    () => `${c.svc} Built for ${c.cityState}`,
  ])();
  const subtext = pick(c.rng, [
    () => `For ${c.city} ${c.audience} focused on ${c.readerGoal}, Iconic Brand Group delivers ${c.svcLower} that produces ${c.outcome} — built around how the ${c.metroShort} economy and its buyers actually behave, not a national template.`,
    () => `Iconic Brand Group is the ${c.region} team ${c.audience} turn to for ${c.svcLower}. We pair genuine ${c.disc} expertise with real ${c.city} market knowledge to move you toward ${c.outcome}.`,
    () => `${c.svc} should do one thing: deliver ${c.outcome}. That is what we build for ${c.county} ${c.audience} — hands-on ${c.disc} shaped by the specific dynamics of the ${c.city} market.`,
  ])();
  const trustBadges = [
    pick(c.rng, [`${c.svc} Serving ${c.city}'s ${c.audienceTitle} Community`, `${c.svc} for ${c.counties} Businesses`, `${c.svc} Serving the ${c.metroShort}`]),
    pick(c.rng, [`Real Deliverables, Not Generic ${c.discTitle} Advice`, `${c.discTitle} Rooted in ${c.region} Market Reality`, `Focused on the Problems ${c.audienceTitle} Actually Face`]),
    pick(c.rng, [`Grounded in Real ${c.city} Market Insight`, `Connected to ${c.inst}`, `Accountable to Measurable Results`]),
  ];
  return { headline, subtext, trustBadges };
}

function makeTldr(c) {
  return pick(c.rng, [
    () => `${c.svc} in ${c.cityState}: Iconic Brand Group gives ${c.region} ${c.audience} a clear path to ${c.outcome}, from ${c.deliv0Title.toLowerCase()} through ${c.deliv1Title.toLowerCase()}. Call (813) 263-6762 for a free consultation.`,
    () => `${c.svc} in ${c.cityState}: hands-on ${c.disc} for ${c.county} ${c.audience} — real deliverables, deep local market knowledge, and accountability to ${c.outcome}. Call (813) 263-6762 to start.`,
  ])();
}

const whyDiffAltCards = [
  (c) => ({ title: 'Senior-Led, No Handoffs', description: `The people who scope your ${c.disc} are the people who execute it. ${c.city} engagements stay with experienced hands from kickoff to results, never passed to junior staff after the sale.` }),
  (c) => ({ title: `Engagements Sized for ${c.city}`, description: `We structure ${c.disc} for the real budgets and stage of ${c.region} businesses, not the enterprise minimums national firms impose — senior work scoped to what fits ${c.county}.` }),
  (c) => ({ title: 'We Deliver, Then Stay', description: `Plenty of firms hand over a ${c.disc} plan and vanish. We produce the work and stay through implementation across ${c.county}, because a strategy nobody executes changes nothing.` }),
];

function makeWhyDifferent(c) {
  const [d0, d1] = pickN(c.rng, c.pack.deliverables, 2);
  return [
    { title: 'How We Actually Work', description: `In ${c.city}, we ${c.approach}.` },
    { title: 'Real Deliverables, Not Slide Decks', description: `You leave with concrete work — ${d0.title.toLowerCase()} and ${d1.title.toLowerCase()} among them — and we stay engaged through implementation across ${c.county} rather than handing over a document and disappearing.` },
    { title: `Wired Into ${c.inst}`, description: `${c.inst}, ${c.univ}, and local business networks are resources most competitors underuse. We connect your ${c.disc} into that ${c.county} network, so the work builds local credibility and referrals, not just output.` },
    pick(c.rng, whyDiffAltCards)(c),
    { title: `Genuine ${c.discTitle} Expertise`, description: `We work fluently in ${c.term0}, ${c.term1}, and ${c.term2} — the craft of ${c.disc} — and apply it to the ${c.indTitle} realities of the ${c.metroShort} instead of a template borrowed from another market.` },
    { title: 'Accountable to the Result', description: `Everything is measured against the outcome you came for: ${c.outcome}. Clear milestones and honest reporting keep ${c.county} work moving when your daily operations get loud.` },
  ];
}

function makeOverview(c) {
  const heading = pick(c.rng, [
    `${c.svc} Built to Solve Real Problems in ${c.cityState}`,
    `${c.svc} Built Around ${c.region} Business Realities`,
    `A ${c.svc} Partner Built for ${c.cityState}`,
  ]);
  // Body = the local economy (marketDynamics), composed from the city profile.
  const body = pick(c.rng, [
    `${c.city} runs on ${c.economyLine}. For ${c.disc}, that means ${c.marketAngle} — which is exactly where Iconic Brand Group starts, turning that local read into work you can act on rather than a plan that never ships.`,
    `${c.city}'s economy is built on ${c.economyLine}. We build ${c.disc} to fit that landscape instead of fighting it, so ${c.county} ${c.audience} get a plan matched to how this market actually moves.`,
  ]);
  // Secondary = how local buyers decide (buyerBehavior).
  const secondary = pick(c.rng, [
    `It helps to know how buyers here decide: they are ${c.buyerCultureLow}, which for ${c.disc} means ${c.buyerAngle}. We build that into every recommendation.`,
    `${c.city} businesses sell into ${c.buyerCulture}. For ${c.disc}, that means ${c.buyerAngle} — and our work is shaped around it from the first conversation.`,
  ]);
  const quickFacts = [
    `Deliverables you can point to: ${c.deliv0Title.toLowerCase()}, ${c.deliv1Title.toLowerCase()}, and more`,
    `${c.discTitle} fluency: ${c.term0}, ${c.term1}, ${c.term2}`,
    `Deep ${c.indTitle} market knowledge across ${c.counties}`,
    `Wired into ${c.inst} and ${c.city} business networks`,
    `Every engagement measured against ${c.outcome}`,
  ];
  const testimonial = {
    quote: pick(c.rng, [
      `We had tried the generic, out-of-market route before and it never fit how ${c.city} works. Iconic Brand Group actually understood ${c.disc} and our ${c.indShort ?? c.ind} market, delivered real work instead of a deck, and it finally moved the numbers.`,
      `They diagnosed exactly what was holding us back and rebuilt our ${c.disc} around how customers in ${c.suburb} actually behave. Within two quarters we were seeing ${c.outcome}.`,
    ]),
    name: `${pick(c.rng, FIRST_NAMES)} ${pick(c.rng, LAST_NAMES)}`,
    role: `${c.role}, ${pick(c.rng, c.profile.companyTypes)}, ${c.suburb}, ${c.state}`,
    industry: c.indTitle,
  };
  return { heading, body, secondary, quickFacts, testimonial };
}

function makeDefinition(c) {
  const definition = pick(c.rng, [
    `${c.svc} is the discipline of ${c.readerGoal}. For ${c.region} businesses, it combines ${c.deliv0Title.toLowerCase()}, ${c.deliv1Title.toLowerCase()}, and the fundamentals of ${c.term0} into one program aimed at ${c.outcome} — defined by deliverables, not advice on a slide.`,
    `For ${c.city} businesses, ${c.svcLower} is the practice of turning ${c.disc} into measurable results: a hands-on engagement spanning ${c.deliv0Title.toLowerCase()} through ${c.delivLastTitle.toLowerCase()}, built for how the ${c.metroShort} actually operates.`,
  ]);
  return { term: c.svc, definition, keyComponents: c.pack.deliverables.slice(0, 5).map((d) => d.title) };
}

function makeExpertQuote(c) {
  const quote = pick(c.rng, [`${c.insight}`, `${c.insight} That is the lens we bring to every ${c.disc} engagement in the ${c.metroShort}.`]);
  return { quote, name: `${pick(c.rng, FIRST_NAMES)} ${pick(c.rng, LAST_NAMES)}`, title: `${pick(c.rng, [c.city + ' ', c.region + ' ', 'Regional '])}${c.discTitle} Advisor`, context: `On ${c.disc} in the ${c.metroFull}` };
}

function makeMarketData(c) {
  return { ...c.profile.marketData, primaryIndustryFocus: c.indTitle };
}

function makeMarketAnalysis(c) {
  const heading = pick(c.rng, [`The ${c.svc} Market in ${c.cityState}`, `${c.svc} Across the ${c.metroShort}`, `${c.city} ${c.svc} Landscape`]);
  const body = pick(c.rng, [
    `${c.demandDriver} It is a shift Iconic Brand Group sees firsthand across the ${c.metroFull}, and it is reshaping what ${c.disc} has to deliver for ${c.county} ${c.audience}.`,
    `${c.demandDriver} For ${c.audience} weighing ${c.svcLower}, that trend is the reason local, market-aware execution now outperforms the imported national approach.`,
  ]);
  return {
    heading, body40Words: body,
    bullets: {
      marketOpportunity: `Few ${c.region} providers do ${c.disc} well, so the ${c.counties} market leaves real room for ${c.audience} who pair genuine ${c.indTitle} knowledge with deliverables like ${c.deliv0Title.toLowerCase()} — an opening for the businesses that move first.`,
      keyChallenge: `In ${c.region}, the trap is treating ${c.disc} as a commodity. ${c.audienceTitle} who buy a generic package — or a playbook built for another metro — spend real money before discovering it never fit the ${c.metroShort}, and by then the budget is gone.`,
      ourStrategy: `We localize the entire engagement to ${c.county} — ${c.deliv1Title.toLowerCase()} and ${c.delivLastTitle.toLowerCase()} tuned to conditions here — and stay hands-on through execution so ${c.outcome} actually lands.`,
    },
    snapshot: {
      marketRegion: c.region,
      metroArea: c.metroFull,
      marketClassification: pick(c.rng, [c.profile.tierLabel, `${c.profile.tierLabel} (${c.region})`, `${c.region} Growth Market`]),
      state: c.state,
    },
  };
}

function makeServices(c) {
  return {
    heading: pick(c.rng, [`What Our ${c.svc} Delivers in ${c.cityState}`, `${c.svc} Deliverables for Businesses in ${c.cityState}`, `Our ${c.svc} Services in ${c.cityState}`]),
    subtext: pick(c.rng, [
      `Concrete ${c.disc} deliverables built to produce ${c.outcome} across the ${c.metroFull}.`,
      `No vague retainers — here is the actual ${c.disc} work we do for ${c.county} ${c.audience}.`,
    ]),
    items: c.pack.deliverables.map((d) => ({ title: d.title, description: d.desc, icon: d.icon })),
  };
}

function makeIndustries(c) {
  return {
    heading: pick(c.rng, [`Industries We Serve in ${c.cityState}`, `Industries Driving Business in ${c.cityState}`, `Where Our ${c.svc} Work Lands in ${c.cityState}`]),
    intro: pick(c.rng, [
      `${c.discTitle} looks different across ${c.city}'s core sectors — ${c.profile.sectorTags.slice(0, 4).join(', ').toLowerCase()}, and more each buy and evaluate it their own way. We adapt the work to your industry, with the deepest bench in ${c.indTitle}.`,
      `The way ${c.disc} succeeds shifts by industry: what wins a ${c.indTitle} client in the ${c.metroShort} differs from what moves another sector. We tailor the work to the industry you compete in.`,
    ]),
    tags: c.profile.sectorTags,
    painPoints: c.pack.problems.slice(0, 3),
  };
}

function makeCommonMistakes(c) {
  return {
    heading: pick(c.rng, [`Common ${c.svc} Mistakes ${c.city} ${c.audienceTitle} Make`, `Where Businesses Go Wrong With ${c.svc} in ${c.cityState}`, `${c.svc} Pitfalls to Avoid in ${c.cityState}`]),
    subtext: pick(c.rng, [
      `These are the ${c.disc} mistakes that quietly cost ${c.county} ${c.audience} time, money, and ${c.outcome}.`,
      `We see these ${c.disc} errors constantly in ${c.region} — here is how to avoid each one.`,
    ]),
    items: c.pack.mistakes.slice(0, 5),
  };
}

function makeCaseStudy(c) {
  const delivered = pickN(c.rng, c.pack.deliverables, 4).map((d) => d.title);
  return {
    badge: pick(c.rng, [`${c.region} Success Story`, `${c.cityState} Client Result`, `${c.county} Case Study`]),
    headline: `How ${c.discTitle} Moved the Numbers for ${aOrAn(c.indTitle)} ${c.indTitle} Business`,
    result: pick(c.rng, [`Turned ${c.problemLow0} into ${c.outcome}`, `Reached ${c.outcome} within two quarters`, `Fixed the ${c.disc} gap that had stalled growth`]),
    description: `${titleCase(aOrAn(c.ind))} ${c.ind} client in the ${c.metroShort} came to us with ${c.problemLow0}. We rebuilt their ${c.disc} for ${c.city} from the ground up — ${c.deliv0Title.toLowerCase()}, ${c.deliv1Title.toLowerCase()}, and the follow-through most firms skip. Two quarters later, ${c.outcome} had gone from a goal to a number the ${c.county} team could point to.`,
    industry: c.indTitle,
    delivered,
  };
}

function makeProcess(c) {
  return {
    heading: pick(c.rng, [`How Our ${c.svc} Process Works in ${c.cityState}`, `Our ${c.svc} Process for Businesses in ${c.cityState}`, `A Structured ${c.svc} Approach for ${c.cityState}`]),
    subtext: pick(c.rng, [`A clear, four-step ${c.disc} process built to produce ${c.outcome}.`, `Structured, transparent, and accountable from first call to measurable results.`]),
    steps: [
      { title: 'Audit & Local Diagnosis', description: `We open with ${c.deliv0Title.toLowerCase()} to see exactly where your ${c.disc} stands against ${c.county} market conditions and competitors.` },
      { title: `Prioritize for ${c.city}`, description: `We map the ${c.disc} moves that fit the ${c.metroShort} and your goals, sequencing them by return rather than doing everything at once.` },
      { title: 'Build & Implement', description: `We produce the work — ${c.deliv1Title.toLowerCase()}, ${c.deliv2Title.toLowerCase()} — and implement alongside your ${c.city} team, not from a distance.` },
      { title: 'Measure Against Results', description: `We track progress toward ${c.outcome} using ${c.delivLastTitle.toLowerCase()}, then cut what underperforms across ${c.county} and double down on what works.` },
    ],
  };
}

function makeFaqs(c) {
  const d = c.pack.deliverables;
  const all = [
    { question: `What does your ${c.svcLower} actually include in ${c.cityState}?`, answer: `Concrete ${c.disc} deliverables — ${d[0].title.toLowerCase()}, ${d[1].title.toLowerCase()}, ${d[2].title.toLowerCase()}, and more — all built to produce ${c.outcome} across the ${c.metroFull}.` },
    { question: `How is your ${c.svcLower} different from a national firm?`, answer: `National firms rarely understand ${c.county}'s market or the ${c.indTitle} sector. We combine real ${c.disc} expertise with local insight and ${c.inst} context, and we deliver actual work rather than a strategy deck.` },
    { question: `What does ${c.svcLower} cost in ${c.cityState}?`, answer: `It depends on scope and goals. We offer flexible engagements sized for ${c.region} businesses — from focused ${c.disc} sprints to ongoing retainers. Schedule a free consultation for a custom proposal.` },
    { question: `How quickly will I see results?`, answer: `Timelines depend on your starting point and the ${c.county} competitive landscape. Some ${c.disc} deliverables show impact within 30-60 days, while ${c.term0} and durable positioning compound over three to six months.` },
    { question: `Do you work with both new and established businesses in ${c.city}?`, answer: `Yes. We support early-stage ${c.audience} and established ${c.indTitle} companies scaling across the ${c.metroShort}. Our ${c.disc} approach adapts to your stage rather than forcing one template.` },
    { question: `Why does local ${c.city} experience matter for ${c.svcLower}?`, answer: `Because ${c.disc} results here depend on local specifics — how ${c.metroShort} buyers decide, which channels and institutions carry weight, and how ${c.indTitle} competition really works. An out-of-market firm optimizes for the wrong things.` },
    { question: `What results should I expect from ${c.svcLower}?`, answer: `The goal is ${c.outcome}. We set clear benchmarks at the start — tied to ${c.deliv0Title.toLowerCase()} and ${c.delivLastTitle.toLowerCase()} — and report against them, so progress is something you can see.` },
  ];
  return pickN(c.rng, all, 5);
}

function makeSources(c) {
  const pool = [
    { text: `Small businesses make up 99%+ of ${c.state} employers and nearly half of private-sector jobs`, source: `U.S. Small Business Administration, ${c.state} Small Business Profile` },
    { text: `The ${c.metroFull} economy is anchored by ${c.anchors}`, source: 'Regional economic development reporting' },
    { text: `${c.univ} is a major driver of talent and research in ${c.region}`, source: `${c.univ}, economic impact reporting` },
    { text: `46% of Google searches carry local intent, underscoring the value of local visibility in ${c.city}`, source: 'Google Search / GoGulf statistics' },
    { text: 'Companies with documented strategies are significantly more likely to report growth', source: 'CoSchedule State of Marketing Strategy Report' },
    { text: `${c.city} sits within ${c.region}, a distinct market inside ${c.state}`, source: 'U.S. Census Bureau ACS, BLS QCEW' },
  ];
  return pickN(c.rng, pool, 4);
}

// Value pillars — anchored to the city (each lever uses a different connector,
// so no pillar reads the same across cities and none repeats within the page).
function makeValuePillars(c) {
  const v = c.pack.value;
  return {
    money: `For ${c.city} ${c.audience}, ${lcFirstSafe(v.money)}`,
    time: `In the ${c.metroShort}, ${lcFirstSafe(v.time)}`,
    risk: `Across ${c.county}, ${lcFirstSafe(v.risk)}`,
    status: `Within ${c.region}, ${lcFirstSafe(v.status)}`,
  };
}

function makeDifferentiation(c) {
  const dh = pick(c.rng, [
    () => ({ lead: `Why ${c.city} ${c.audienceTitle} Choose Iconic Brand Group for`, highlight: c.svc }),
    () => ({ lead: `Why ${c.city} ${c.audienceTitle} Trust Us With`, highlight: c.svc }),
    () => ({ lead: `What Makes Our`, highlight: `${c.svc} Different` }),
  ])();
  const vh = pick(c.rng, [
    () => ({ lead: `The Value ${c.svc} Delivers for`, highlight: `${c.city} ${c.audienceTitle}` }),
    () => ({ lead: `What ${c.svc} Actually`, highlight: 'Delivers' }),
    () => ({ lead: 'The Value of Working With', highlight: `${c.city}'s Iconic Brand Group` }),
  ])();
  return {
    differentLabel: pick(c.rng, ['Our Difference', 'Why It Works', 'The Local Difference', `Built for ${c.city}`]),
    differentHeadingLead: dh.lead, differentHeadingHighlight: dh.highlight,
    differentIntro: pick(c.rng, [
      `Plenty of firms will sell you ${c.disc} in ${c.city}. Few understand the ${c.metroShort} well enough to make it work, and fewer still stay to deliver it. Here is what sets our approach apart.`,
      `Choosing a ${c.disc} partner in ${c.region} comes down to two things: real local market knowledge and follow-through. On both counts, this is where we differ.`,
    ]),
    valueLabel: pick(c.rng, ['Our Value', 'The Value We Deliver', 'Why It Pays Off']),
    valueHeadingLead: vh.lead, valueHeadingHighlight: vh.highlight,
    valueIntro: pick(c.rng, [
      `Good ${c.disc} pays off in four ways for ${c.city} ${c.audience}: it protects money, saves time, cuts risk, and builds status — all pointed at one outcome, ${c.outcome}.`,
      `For ${c.county} businesses, our ${c.disc} work delivers value across money, time, risk, and status — measured against ${c.outcome}, not activity.`,
    ]),
    valueClosing: pick(c.rng, [
      `We don't just advise. We deliver the work and stay accountable to the result.`,
      `This is how we help ${c.county} businesses turn ${c.disc} into ${c.outcome} — real deliverables, real local insight, real results.`,
    ]),
  };
}

const FIRST_NAMES = ['Tanya', 'Marcus', 'Carla', 'Devon', 'Patricia', 'Rashida', 'Gerald', 'Aaron', 'Nadia', 'Caleb', 'Elliot', 'Priya', 'Maya', 'Julian', 'Serena', 'Damon', 'Leah', 'Victor', 'Camille', 'Owen', 'Bianca', 'Malcolm', 'Elena', 'Preston', 'Kendra', 'Adrian', 'Simone', 'Wesley', 'Marisol', 'Trevor', 'Jasmine', 'Bryce', 'Noelle', 'Isaiah', 'Renee', 'Dominic', 'Chantelle', 'Andre', 'Sabrina', 'Xavier'];
const LAST_NAMES = ['Osei', 'Webb', 'Hutchinson', 'Ashford', 'Stanhope', 'Bynum', 'Simmons', 'Whitlock', 'Bennett', 'Coleman', 'Rivers', 'Ellis', 'Monroe', 'Hale', 'Gaines', 'Foster', 'Langford', 'Sutton', 'Whitaker', 'Bradford', 'Manning', 'Hughes', 'Carver', 'Lawson', 'Sterling', 'Hayes', 'Davenport', 'Mercer', 'Warren', 'Hampton', 'Vaughn', 'Sinclair', 'Holloway', 'Clayton', 'Banks', 'Whitfield', 'Prentiss', 'Kearney', 'Nash', 'Rutledge'];

function makeRecord(profile, service) {
  const key = `${service.slug}::${profile.citySlug}`;
  const c = buildCtx(profile, service, createRng(key));
  const ov = makeOverview(c);
  return {
    key,
    hero: makeHero(c),
    tldr: makeTldr(c),
    overview: { secondaryParagraph: ov.secondary },
    whyDifferent: makeWhyDifferent(c),
    differentiation: makeDifferentiation(c),
    valuePillars: makeValuePillars(c),
    trustedPartner: { heading: ov.heading, body80Words: ov.body, testimonial: ov.testimonial, fiveQuickFacts: ov.quickFacts },
    definition: makeDefinition(c),
    expertQuote: makeExpertQuote(c),
    marketData: makeMarketData(c),
    marketAnalysis: makeMarketAnalysis(c),
    services: makeServices(c),
    industries: makeIndustries(c),
    commonMistakes: makeCommonMistakes(c),
    caseStudy: makeCaseStudy(c),
    process: makeProcess(c),
    faqs: makeFaqs(c),
    sources: makeSources(c),
  };
}

// --- Validation -------------------------------------------------------------
function validateRecord(record, profile) {
  const errors = [];
  const req = (cond, msg) => { if (!cond) errors.push(`${record.key}: ${msg}`); };
  req(record.hero.trustBadges.length === 3, 'expected 3 trust badges');
  req(record.whyDifferent.length === 6, 'expected 6 why-different cards');
  req(record.trustedPartner.fiveQuickFacts.length === 5, 'expected 5 quick facts');
  req(record.definition.keyComponents.length === 5, 'expected 5 key components');
  req(record.services.items.length === 6, 'expected 6 service cards');
  req(record.industries.painPoints.length === 3, 'expected 3 pain points');
  req(record.commonMistakes.items.length === 5, 'expected 5 mistakes');
  req(record.caseStudy.delivered.length === 4, 'expected 4 delivered');
  req(record.process.steps.length === 4, 'expected 4 process steps');
  req(record.faqs.length === 5, 'expected 5 faqs');
  req(record.sources.length === 4, 'expected 4 sources');
  req(Boolean(record.differentiation.differentIntro && record.differentiation.valueIntro), 'missing differentiation copy');
  const endsWithCityState = new RegExp(`${profile.city}, ${profile.state}$`);
  req(endsWithCityState.test(record.hero.headline), 'headline must end with "City, State"');
  const json = JSON.stringify(record);
  req(!json.includes('undefined'), 'record contains "undefined"');
  req(!json.includes('{{'), 'record contains an unrendered {{token}}');
  return errors;
}

// --- Main -------------------------------------------------------------------
async function main() {
  const dryRun = hasArg('dry-run');
  const stateCode = getArgValue('state');
  const citySlug = getArgValue('city');

  let citySlugs;
  if (citySlug) citySlugs = [citySlug];
  else if (stateCode) citySlugs = CITIES_BY_STATE[stateCode.toUpperCase()] ?? [];
  else { console.error('Pass --state=<CODE> or --city=<slug>.'); process.exitCode = 1; return; }

  citySlugs = citySlugs.filter((s) => s !== 'birmingham-al'); // never regenerate Birmingham
  if (citySlugs.length === 0) { console.error('No cities to generate (Birmingham is excluded).'); process.exitCode = 1; return; }

  const services = await loadServices();
  const outName = citySlug ? `${citySlug}.json` : `${(stateCode || 'cities').toLowerCase()}-cities.json`;
  const outputPath = path.resolve(rootDir, getArgValue('output') ?? `json/${outName}`);
  const existing = await loadExisting(outputPath);
  const results = { ...existing };
  const errors = [];

  for (const slug of citySlugs) {
    const profile = CITY_PROFILES[slug];
    if (!profile) { console.warn(`No profile for ${slug}, skipping.`); continue; }
    for (const service of services) {
      const record = makeRecord(profile, service);
      results[record.key] = record;
      errors.push(...validateRecord(record, profile));
    }
    console.log(`  ✓ ${profile.city} (${services.length} services)`);
  }

  if (errors.length) throw new Error(errors.slice(0, 25).join('\n'));

  if (dryRun) {
    console.log(`Dry run: ${citySlugs.length} cities × ${services.length} services = ${citySlugs.length * services.length} records. Output would be ${outputPath}`);
    return;
  }

  const tmp = `${outputPath}.tmp`;
  await fs.writeFile(tmp, `${JSON.stringify(results, null, 2)}\n`);
  await fs.rename(tmp, outputPath);
  console.log(`Done. Wrote ${Object.keys(results).length} records to ${outputPath}`);
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
