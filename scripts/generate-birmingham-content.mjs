import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// ===========================================================================
// Birmingham, Alabama — whole-page, service-specific content generator
//
// Design goals (per client direction):
//  - Speak to the READER's real problem and show real DELIVERABLES.
//  - Make each page service-specific via a topic "knowledge pack" (below),
//    not a swapped-noun template.
//  - Explain how the Central Alabama market specifically impacts THIS service.
//  - Use service-specific terminology, demonstrate practical local expertise.
//  - Ground everything in real Birmingham institutions/geography (no invented
//    statistics), so content cannot be reused for another city or service
//    without a major rewrite.
//  - Every location-naming heading ends with "Birmingham, Alabama".
// ===========================================================================

const BIRMINGHAM = {
  citySlug: 'birmingham-al',
  city: 'Birmingham',
  state: 'Alabama',
  stateAbbr: 'AL',
  cityState: 'Birmingham, Alabama',
  county: 'Jefferson County',
  secondaryCounty: 'Shelby County',
  counties: 'Jefferson and Shelby Counties',
  countyTrade: 'Jefferson and Shelby County trade areas',
  metro: 'Birmingham-Hoover Metropolitan Statistical Area',
  metroShort: 'Birmingham metro',
  marketRegion: 'Central Alabama',
  region: 'Southeast',
};

const BIRMINGHAM_MARKET_DATA = {
  populationRange: '1.1M+ (Birmingham-Hoover MSA)',
  businessCount: '30,000+ establishments',
  medianHouseholdIncome: '$58,000–$64,000',
  yearOverYearGrowth: '1.8–2.6%',
  smallBusinessShare: '99.4% of Alabama businesses',
  source: 'U.S. Census Bureau ACS, BLS QCEW, SBA Alabama Small Business Profile',
};

const institutions = [
  'Innovation Depot',
  'UAB (University of Alabama at Birmingham)',
  'the Birmingham Business Alliance',
  'SCORE Birmingham',
];

const anchorIndustries = [
  'healthcare and biotech',
  'banking and financial services',
  'advanced manufacturing',
  'logistics',
];

const sectorTags = ['Healthcare', 'Financial Services', 'Advanced Manufacturing', 'Logistics', 'Professional Services', 'Construction'];
const suburbs = ['Homewood', 'Vestavia Hills', 'Mountain Brook', 'Hoover', 'Pelham', 'Trussville', 'Bessemer', 'Gardendale'];
const corridors = ['the Highway 280 corridor', 'the I-459 corridor', 'the commercial corridors along Highway 280 and I-459'];
const TALENT_PIPELINE = 'UAB, Samford, and Jefferson State';
const companyTypes = ['Professional Services Firm', 'Healthcare Support Services', 'Home Services Company', 'B2B Services Company', 'Consumer Products Company', 'Technology Services Startup', 'Construction Company', 'Financial Services Firm'];

// ===========================================================================
// SERVICE KNOWLEDGE PACKS
// The core of service-specificity. Each service resolves (by slug keywords) to
// exactly one pack. A pack carries the reader's problems, six real
// deliverables, the discipline's own terminology, five service-specific
// mistakes, and how Birmingham's market shapes THIS service.
// ===========================================================================

const PACKS = {
  seo: {
    discipline: 'local SEO',
    readerGoal: 'getting found by nearby customers the moment they search',
    outcome: 'a steady flow of local search traffic, calls, and direction requests',
    terms: ['the Google map pack', 'Google Business Profile', 'local citations', 'NAP consistency', 'review velocity', '"near me" intent'],
    problems: [
      'Ranking below national directories and franchise chains for the "near me" searches your Birmingham customers actually type',
      'A Google Business Profile that is unverified, thin, or inconsistent across multiple Jefferson County locations',
      'No presence in the map pack, where most local buying decisions in the Birmingham metro begin',
    ],
    deliverables: [
      { title: 'Local Keyword & Map-Pack Audit', icon: '🔍', desc: 'We map the exact neighborhood and "near me" searches Jefferson County buyers use and where you rank against Homewood and Hoover competitors today.' },
      { title: 'Google Business Profile Optimization', icon: '📍', desc: 'Full GBP build-out — categories, services, geo-tagged photos, and Q&A — tuned to win the Birmingham map pack.' },
      { title: 'Local Citation & NAP Cleanup', icon: '🗂️', desc: 'Consistent name, address, and phone across every directory so Google trusts your Central Alabama locations.' },
      { title: 'Location & Neighborhood Landing Pages', icon: '📄', desc: 'Unique pages for each service area — from Vestavia Hills to Trussville — that rank for hyper-local intent.' },
      { title: 'Review Generation System', icon: '⭐', desc: 'A workflow that turns satisfied Birmingham customers into a steady stream of Google reviews that lift rankings.' },
      { title: 'Local Rank & Call Tracking', icon: '📈', desc: 'Map-pack rank tracking and call attribution so you can see search turning into real Birmingham revenue.' },
    ],
    mistakes: [
      { mistake: 'Chasing Broad Keywords Over Local Intent', consequence: 'Budget burns on statewide terms while Homewood and Hoover competitors quietly own the "near me" searches that actually convert.', solution: 'Target neighborhood-level and map-pack intent across Jefferson and Shelby Counties first.' },
      { mistake: 'Neglecting the Google Business Profile', consequence: 'An unoptimized GBP keeps you out of the map pack no matter how good the website is.', solution: 'Treat the Google Business Profile as your primary Birmingham storefront and optimize it fully.' },
      { mistake: 'Inconsistent NAP Across Directories', consequence: 'Conflicting addresses and phone numbers erode the local trust signals Google uses to rank you.', solution: 'Audit and standardize citations across every directory before building links.' },
      { mistake: 'One Page for Every Service Area', consequence: 'A single page cannot rank for Vestavia Hills, Pelham, and Bessemer at once.', solution: 'Build genuinely unique neighborhood landing pages, not name-swapped duplicates.' },
      { mistake: 'Ignoring Reviews as a Ranking Factor', consequence: 'Low review volume and slow response times cap map-pack visibility.', solution: 'Run a systematic review-generation and response cadence.' },
    ],
    localAngle: [
      'Birmingham local search is crowded with national directories and a handful of entrenched Homewood, Hoover, and Vestavia Hills competitors, so ranking here means winning neighborhood-level intent rather than broad statewide terms.',
      'Because so many Jefferson County buyers start in the Google map pack, an unoptimized Business Profile quietly costs Birmingham businesses calls every day — which is exactly where we start.',
    ],
  },

  paidads: {
    discipline: 'paid media and performance advertising',
    readerGoal: 'turning ad spend into measurable, profitable customers',
    outcome: 'a lower cost per acquisition and ad spend you can actually trace to revenue',
    terms: ['cost per acquisition', 'return on ad spend', 'conversion tracking', 'audience targeting', 'geo-fencing', 'the click-to-close path'],
    problems: [
      'Ad spend leaking into clicks that never convert because campaigns target the whole state instead of the Birmingham metro',
      'No conversion tracking, so you cannot tell which campaigns produce real Jefferson County customers',
      'Rising cost per acquisition that quietly erodes margin as you scale',
    ],
    deliverables: [
      { title: 'Account & Conversion-Tracking Audit', icon: '🔍', desc: 'We fix the tracking gaps so every Birmingham lead is attributed from first click to closed deal.' },
      { title: 'Geo-Targeted Campaign Build', icon: '🎯', desc: 'Google and Meta campaigns fenced to the Birmingham metro and priced to Central Alabama media costs.' },
      { title: 'Landing Page & Offer Optimization', icon: '🧲', desc: 'Conversion-focused pages and offers built for how Jefferson County buyers actually respond.' },
      { title: 'Audience & Keyword Strategy', icon: '👥', desc: 'Intent-based targeting that reaches Birmingham buyers ready to act, not just cheap impressions.' },
      { title: 'Bid & Budget Management', icon: '💰', desc: 'Ongoing optimization toward a target cost per acquisition instead of vanity clicks.' },
      { title: 'ROAS Reporting Dashboard', icon: '📊', desc: 'A clear dashboard tying ad spend to Birmingham revenue, refreshed continuously.' },
    ],
    mistakes: [
      { mistake: 'Running Ads Without Conversion Tracking', consequence: 'You scale spend blind and never learn which Birmingham campaigns actually produce customers.', solution: 'Install full conversion and call tracking before increasing budget.' },
      { mistake: 'Targeting the Whole State', consequence: 'Statewide targeting wastes budget on clicks outside your real Jefferson County service area.', solution: 'Geo-fence campaigns tightly to the Birmingham metro and priority suburbs.' },
      { mistake: 'Sending Paid Traffic to the Homepage', consequence: 'Generic pages tank conversion and inflate cost per acquisition.', solution: 'Build dedicated, offer-matched landing pages for every campaign.' },
      { mistake: 'Optimizing for Clicks, Not Customers', consequence: 'Cheap clicks look good in reports but never reach the click-to-close path.', solution: 'Optimize toward cost per acquisition and return on ad spend.' },
      { mistake: 'Ignoring Unit Economics Before Scaling', consequence: 'Scaling an unprofitable campaign multiplies losses across the metro.', solution: 'Know your CAC and margin per channel before raising spend.' },
    ],
    localAngle: [
      'Media costs and competition in the Birmingham metro sit well below coastal markets, so disciplined, geo-fenced campaigns can win profitably here — but only when tracking ties every click to a real Jefferson County customer.',
      'Because Central Alabama buyers respond to trust and locality over flashy creative, paid media in Birmingham performs best when the offer and landing page speak to this market specifically.',
    ],
  },

  social: {
    discipline: 'social media marketing',
    readerGoal: 'building a real local audience that turns into customers',
    outcome: 'an engaged Birmingham following that drives foot traffic and referrals',
    terms: ['content calendar', 'community management', 'organic reach', 'paid social', 'user-generated content', 'engagement rate'],
    problems: [
      'Posting into the void with no consistent presence in front of Birmingham customers',
      'Followers who never convert because the content speaks to no one in particular',
      'No time or system to keep up with community management across platforms',
    ],
    deliverables: [
      { title: 'Local Social Strategy & Calendar', icon: '🗓️', desc: 'A monthly content calendar built around Birmingham seasons, events, and the customers you want.' },
      { title: 'Content Production', icon: '🎨', desc: 'Photo, video, and graphics that showcase your business to the Jefferson County community.' },
      { title: 'Community Management', icon: '💬', desc: 'Timely replies, DMs, and engagement that turn Birmingham followers into customers.' },
      { title: 'Paid Social Campaigns', icon: '📣', desc: 'Geo-targeted boosts and lead campaigns aimed at the Birmingham metro, not the whole country.' },
      { title: 'Local Partnership & UGC Program', icon: '🤝', desc: 'Collaborations with Central Alabama creators and customers that build authentic reach.' },
      { title: 'Engagement & Growth Reporting', icon: '📊', desc: 'Reporting on the metrics that actually predict local revenue, not vanity follower counts.' },
    ],
    mistakes: [
      { mistake: 'Posting Without a Local Angle', consequence: 'Generic content blends in and never connects with the Birmingham community.', solution: 'Anchor content in local events, neighborhoods, and customers.' },
      { mistake: 'Chasing Followers Over Customers', consequence: 'A big vanity following that never buys drains time and budget.', solution: 'Optimize for engagement and conversion from the Jefferson County audience.' },
      { mistake: 'Inconsistent Posting', consequence: 'Start-stop activity kills reach and looks unprofessional to local buyers.', solution: 'Run a sustainable, planned content cadence.' },
      { mistake: 'Ignoring Community Management', consequence: 'Unanswered comments and DMs quietly cost Birmingham sales.', solution: 'Treat responses as a sales channel with a defined cadence.' },
      { mistake: 'Boosting Posts Statewide', consequence: 'Untargeted boosts waste budget outside your service area.', solution: 'Geo-target paid social to the Birmingham metro.' },
    ],
    localAngle: [
      'Birmingham is a relationship-driven, community-first market — social content that features real local people, neighborhoods, and events outperforms the polished-but-generic feeds that work in bigger metros.',
      'Because word-of-mouth still drives so much Jefferson County business, social media here works best as a community-building engine, not a broadcast channel.',
    ],
  },

  content: {
    discipline: 'content marketing',
    readerGoal: 'becoming the trusted local authority buyers find and believe',
    outcome: 'inbound traffic and leads that compound over time',
    terms: ['topic clusters', 'search intent', 'thought leadership', 'editorial calendar', 'lead magnets', 'the buyer journey'],
    problems: [
      'A website that no one finds because it answers none of the questions Birmingham buyers search',
      'Sporadic blogging with no strategy, so nothing ranks or converts',
      'No content that moves a Jefferson County prospect from curious to ready-to-buy',
    ],
    deliverables: [
      { title: 'Content & Keyword Strategy', icon: '🧭', desc: 'A topic-cluster plan mapped to what Birmingham buyers actually search across their journey.' },
      { title: 'Editorial Calendar', icon: '🗓️', desc: 'A publishing cadence that builds authority instead of sporadic one-off posts.' },
      { title: 'SEO Article & Landing Content', icon: '✍️', desc: 'Search-optimized articles and pages that rank for Central Alabama intent and answer real questions.' },
      { title: 'Lead Magnets & Gated Assets', icon: '🧲', desc: 'Guides and tools that convert Birmingham readers into named leads.' },
      { title: 'Thought-Leadership Program', icon: '🎙️', desc: 'Bylined pieces that position your team as the credible Jefferson County expert.' },
      { title: 'Content Performance Reporting', icon: '📈', desc: 'Reporting that ties content to rankings, traffic, and pipeline.' },
    ],
    mistakes: [
      { mistake: 'Blogging Without Search Intent', consequence: 'Posts nobody searches for never rank and never convert.', solution: 'Build content around real Birmingham search intent and topic clusters.' },
      { mistake: 'No Bottom-of-Funnel Content', consequence: 'Top-of-funnel traffic never turns into Jefferson County customers.', solution: 'Pair thought leadership with comparison and decision-stage content.' },
      { mistake: 'Publishing Sporadically', consequence: 'Stop-start publishing stalls authority and rankings.', solution: 'Commit to a consistent editorial calendar.' },
      { mistake: 'Generic, Non-Local Content', consequence: 'Content that could run in any city earns no local relevance.', solution: 'Ground content in Central Alabama context and examples.' },
      { mistake: 'No Lead Capture', consequence: 'Traffic arrives and leaves with nothing captured.', solution: 'Add lead magnets and clear next steps throughout.' },
    ],
    localAngle: [
      'Birmingham buyers across healthcare, financial services, and professional services research heavily before they commit, so content that answers their real questions earns trust faster than any ad in this market.',
      'Because Central Alabama is underserved by genuinely local content, the first business to own the topic in its niche captures outsized organic visibility.',
    ],
  },

  website: {
    discipline: 'website design and development',
    readerGoal: 'a site that turns visitors into booked calls and customers',
    outcome: 'a fast, credible site that converts Birmingham traffic',
    terms: ['conversion rate', 'core web vitals', 'mobile-first design', 'calls-to-action', 'page speed', 'the booking flow'],
    problems: [
      'A slow, dated site that undermines credibility with Birmingham buyers before they ever call',
      'A design that looks fine but converts almost no Jefferson County visitors',
      'No mobile experience, where most local searches actually happen',
    ],
    deliverables: [
      { title: 'UX & Conversion Audit', icon: '🔍', desc: 'We find exactly where Birmingham visitors drop off and why they do not convert.' },
      { title: 'Conversion-First Redesign', icon: '🎨', desc: 'A modern, credible design built around booked calls and form fills, not just aesthetics.' },
      { title: 'Mobile & Speed Optimization', icon: '⚡', desc: 'Fast, mobile-first pages that hold Jefferson County buyers who search on their phones.' },
      { title: 'Local SEO Foundation', icon: '📍', desc: 'Technical SEO and location structure so the site can rank across the Birmingham metro.' },
      { title: 'Booking & Lead Capture', icon: '🧲', desc: 'Clear calls-to-action, forms, and booking flows tuned to convert local traffic.' },
      { title: 'Analytics & Tracking Setup', icon: '📊', desc: 'Full tracking so every Birmingham lead and its source is measurable.' },
    ],
    mistakes: [
      { mistake: 'Designing for Looks, Not Conversion', consequence: 'A beautiful site that buries the call-to-action loses Birmingham leads.', solution: 'Design around the booking flow and clear next steps.' },
      { mistake: 'Ignoring Mobile', consequence: 'Poor mobile experience loses the majority of local searchers.', solution: 'Build mobile-first with fast load times.' },
      { mistake: 'No SEO Foundation', consequence: 'A new site that cannot rank stays invisible in the metro.', solution: 'Bake in technical and local SEO from the start.' },
      { mistake: 'Slow Page Speed', consequence: 'Every second of load time costs conversions and rankings.', solution: 'Optimize core web vitals and hosting.' },
      { mistake: 'No Tracking', consequence: 'You cannot improve what you cannot measure.', solution: 'Install analytics and lead tracking on day one.' },
    ],
    localAngle: [
      'Birmingham buyers judge credibility fast, and in a trust-driven Central Alabama market a slow or dated site quietly sends business to competitors before the phone ever rings.',
      'With most Jefferson County searches happening on mobile, a site that is not fast and mobile-first is leaving local revenue on the table every day.',
    ],
  },

  branding: {
    discipline: 'brand strategy and positioning',
    readerGoal: 'standing out and commanding trust in a crowded market',
    outcome: 'a distinct brand that earns premium trust across the metro',
    terms: ['brand positioning', 'messaging architecture', 'visual identity', 'brand voice', 'value proposition', 'brand equity'],
    problems: [
      'Blending in with every other Birmingham competitor and being forced to compete on price',
      'A message that fails to explain why a Jefferson County buyer should choose you',
      'An inconsistent identity that looks different everywhere it appears',
    ],
    deliverables: [
      { title: 'Brand & Competitor Audit', icon: '🔍', desc: 'An honest read on how you show up against Birmingham competitors and where the white space is.' },
      { title: 'Positioning & Value Proposition', icon: '🎯', desc: 'A clear position that tells Jefferson County buyers exactly why you are the right choice.' },
      { title: 'Messaging Architecture', icon: '🗣️', desc: 'Core messages and voice that stay consistent across every Birmingham touchpoint.' },
      { title: 'Visual Identity System', icon: '🎨', desc: 'Logo, color, and design system that reads as credible and premium in this market.' },
      { title: 'Brand Guidelines', icon: '📘', desc: 'A usable guide so your brand looks consistent everywhere it appears across Central Alabama.' },
      { title: 'Launch & Rollout Plan', icon: '🚀', desc: 'A plan to roll the brand out to Birmingham customers without losing existing equity.' },
    ],
    mistakes: [
      { mistake: 'Competing on Price, Not Position', consequence: 'Without a clear brand, Birmingham businesses get pulled into a race to the bottom.', solution: 'Define a distinct position that justifies your value.' },
      { mistake: 'Inconsistent Identity', consequence: 'A brand that looks different everywhere erodes trust with local buyers.', solution: 'Build and enforce a single visual and verbal system.' },
      { mistake: 'Feature-First Messaging', consequence: 'Listing features never tells a Jefferson County buyer why to choose you.', solution: 'Lead with a value proposition and outcomes.' },
      { mistake: 'Rebranding Without a Rollout', consequence: 'A sudden change confuses existing Birmingham customers and loses equity.', solution: 'Plan a deliberate rollout that carries equity forward.' },
      { mistake: 'Copying Competitors', consequence: 'Looking like everyone else guarantees you are ignored.', solution: 'Position into the white space competitors leave open.' },
    ],
    localAngle: [
      'The Birmingham market rewards community trust and credibility over brand size, so positioning here has to earn belief from Jefferson County buyers rather than simply outspending competitors.',
      'Because so many Central Alabama businesses look and sound alike, a sharply positioned brand stands out fast and can command premium pricing in this metro.',
    ],
  },

  leadgen: {
    discipline: 'lead generation and customer acquisition',
    readerGoal: 'a predictable pipeline of qualified local prospects',
    outcome: 'a repeatable system that fills the pipeline with qualified Birmingham leads',
    terms: ['lead qualification', 'the acquisition funnel', 'cost per lead', 'nurture sequences', 'conversion rate', 'the sales pipeline'],
    problems: [
      'An inconsistent, feast-or-famine flow of leads that makes planning impossible',
      'Leads that arrive unqualified and waste your team\'s time',
      'No system to follow up, so hard-won Birmingham prospects go cold',
    ],
    deliverables: [
      { title: 'Ideal Customer & Offer Definition', icon: '🎯', desc: 'We define the exact Jefferson County customer worth pursuing and the offer that converts them.' },
      { title: 'Multi-Channel Acquisition Plan', icon: '🧭', desc: 'A channel mix — search, social, and local — matched to how Birmingham buyers find services.' },
      { title: 'Lead Capture & Landing Pages', icon: '🧲', desc: 'Conversion pages and forms built to turn Birmingham traffic into named leads.' },
      { title: 'Qualification & Scoring', icon: '✅', desc: 'A framework that filters out tire-kickers so your team works real prospects.' },
      { title: 'Nurture & Follow-Up Sequences', icon: '📧', desc: 'Automated follow-up so no Jefferson County lead slips through the cracks.' },
      { title: 'Pipeline & Cost-Per-Lead Reporting', icon: '📊', desc: 'Clear reporting on cost per lead and pipeline so acquisition stays accountable.' },
    ],
    mistakes: [
      { mistake: 'No Follow-Up System', consequence: 'Leads that take weeks to convert go cold without nurture, wasting acquisition spend.', solution: 'Automate a nurture and follow-up cadence for every Birmingham lead.' },
      { mistake: 'Chasing Volume Over Quality', consequence: 'Unqualified leads swamp your team and slow real deals.', solution: 'Add qualification and scoring to focus on fit.' },
      { mistake: 'Relying on a Single Channel', consequence: 'One channel drying up collapses the whole pipeline.', solution: 'Build a resilient multi-channel acquisition mix.' },
      { mistake: 'Weak or Generic Offers', consequence: 'A vague offer fails to move Jefferson County buyers to act.', solution: 'Craft a specific, compelling local offer.' },
      { mistake: 'No Cost-Per-Lead Tracking', consequence: 'Without unit economics you cannot scale profitably.', solution: 'Track cost per lead and conversion by channel.' },
    ],
    localAngle: [
      'Lead generation in Birmingham works differently than in high-volume metros: Jefferson County buyers respond to local credibility and follow-up, so the system that wins here is built on trust and nurture, not sheer outreach volume.',
      'Because referral and relationship networks run deep in Central Alabama, the strongest acquisition systems here blend digital capture with the local community networks most competitors ignore.',
    ],
  },

  funnel: {
    discipline: 'sales funnel and conversion consulting',
    readerGoal: 'plugging the leaks that lose deals between interest and close',
    outcome: 'a measurably higher conversion rate from lead to customer',
    terms: ['funnel stages', 'conversion rate optimization', 'lead nurturing', 'the close rate', 'drop-off points', 'the buyer journey'],
    problems: [
      'Plenty of interest at the top but few deals closing at the bottom',
      'No visibility into where Birmingham prospects drop off in the journey',
      'A funnel held together by the owner\'s memory instead of a real system',
    ],
    deliverables: [
      { title: 'Full Funnel Audit', icon: '🔍', desc: 'We map every stage and pinpoint exactly where Birmingham prospects drop off.' },
      { title: 'Offer & Messaging Alignment', icon: '🎯', desc: 'Aligning the offer to each stage so Jefferson County buyers keep moving forward.' },
      { title: 'Landing Page & Conversion Optimization', icon: '🧲', desc: 'Rebuilt pages and CTAs that lift conversion at each step.' },
      { title: 'Lead Nurture Automation', icon: '📧', desc: 'Sequences that warm Birmingham leads until they are ready to buy.' },
      { title: 'Sales Follow-Up Playbook', icon: '📋', desc: 'A documented follow-up cadence so no deal stalls in the middle of the funnel.' },
      { title: 'Conversion Reporting', icon: '📊', desc: 'Stage-by-stage reporting so you can see and improve the close rate.' },
    ],
    mistakes: [
      { mistake: 'No Visibility Into Drop-Off', consequence: 'Without stage tracking, you cannot fix where Birmingham deals die.', solution: 'Instrument every funnel stage to find the leaks.' },
      { mistake: 'One-Size Messaging', consequence: 'The same pitch at every stage stalls prospects who need different things.', solution: 'Align messaging to each stage of the buyer journey.' },
      { mistake: 'No Nurture Between Stages', consequence: 'Interested Jefferson County leads go cold with no follow-up.', solution: 'Automate nurture that moves leads forward.' },
      { mistake: 'Weak Bottom-of-Funnel Offers', consequence: 'Prospects stall right before the close without a compelling reason to act.', solution: 'Strengthen the decision-stage offer and CTA.' },
      { mistake: 'Relying on Founder Memory', consequence: 'An undocumented funnel breaks the moment the owner is busy.', solution: 'Systematize the funnel with a repeatable playbook.' },
    ],
    localAngle: [
      'Birmingham deals often move through longer, relationship-driven cycles, so the biggest conversion gains here come from disciplined nurture and follow-up rather than more top-of-funnel volume.',
      'Because Jefferson County buyers weigh trust heavily before committing, a funnel tuned to this market front-loads credibility and social proof at each stage.',
    ],
  },

  techsystems: {
    discipline: 'CRM, automation, and systems implementation',
    readerGoal: 'systems that run the business instead of the business running on memory',
    outcome: 'clean, adopted systems that save hours and stop leads slipping',
    terms: ['CRM implementation', 'workflow automation', 'the tech stack', 'user adoption', 'data hygiene', 'integrations'],
    problems: [
      'Leads and customer data scattered across spreadsheets, inboxes, and sticky notes',
      'Manual, repetitive work that eats the team\'s time and invites errors',
      'A pile of tools no one fully adopted, so the promised efficiency never arrived',
    ],
    deliverables: [
      { title: 'Systems & Workflow Audit', icon: '🔍', desc: 'We map how work actually flows and where Birmingham teams lose time and data.' },
      { title: 'CRM Selection & Setup', icon: '🧩', desc: 'The right CRM configured to your business, not a generic out-of-the-box install.' },
      { title: 'Workflow Automation', icon: '⚙️', desc: 'Automations that remove repetitive manual work and stop leads from slipping.' },
      { title: 'Integrations & Data Migration', icon: '🔗', desc: 'Connected tools and clean migrated data so everything talks to everything.' },
      { title: 'Team Training & Adoption', icon: '👥', desc: 'Hands-on rollout so your Jefferson County team actually uses the system.' },
      { title: 'Dashboards & Reporting', icon: '📊', desc: 'Live dashboards so you manage on real data instead of gut feel.' },
    ],
    mistakes: [
      { mistake: 'Buying Tools Before Mapping Workflow', consequence: 'Software bought without a process just digitizes the chaos.', solution: 'Map the workflow first, then choose tools to fit it.' },
      { mistake: 'Tool Sprawl', consequence: 'Too many disconnected apps create more work, not less.', solution: 'Consolidate into an integrated, minimal stack.' },
      { mistake: 'Ignoring Adoption', consequence: 'A system nobody uses delivers zero return.', solution: 'Invest in training and change management for the team.' },
      { mistake: 'Dirty Data Migration', consequence: 'Migrating messy data poisons the new system from day one.', solution: 'Clean and structure data before migration.' },
      { mistake: 'No Reporting Layer', consequence: 'Without dashboards, leaders still manage on gut feel.', solution: 'Build reporting that surfaces the metrics that matter.' },
    ],
    localAngle: [
      'Many established Birmingham businesses still run on manual processes and memory, so a well-implemented CRM and automation stack creates an outsized advantage in a Central Alabama market where few competitors have modernized.',
      'Because Jefferson County teams are lean, adoption is everything here — the win comes from systems people actually use, not the longest feature list.',
    ],
  },

  aimarketing: {
    discipline: 'AI-powered marketing',
    readerGoal: 'using AI to do more with a lean local team',
    outcome: 'AI-assisted marketing that produces more output and better targeting per dollar',
    terms: ['marketing automation', 'AI content workflows', 'predictive targeting', 'personalization', 'lead scoring', 'the AI stack'],
    problems: [
      'A lean Birmingham team that cannot keep up with the volume modern marketing demands',
      'Generic outreach that ignores what AI-driven personalization could unlock',
      'Curiosity about AI but no practical, safe way to put it to work locally',
    ],
    deliverables: [
      { title: 'AI Marketing Opportunity Audit', icon: '🔍', desc: 'We find the highest-return places AI can save your Birmingham team time and lift results.' },
      { title: 'AI Content & Creative Workflows', icon: '✍️', desc: 'Human-guided AI workflows that multiply content output without losing local voice.' },
      { title: 'Predictive Targeting & Lead Scoring', icon: '🎯', desc: 'AI models that focus spend on the Jefferson County prospects most likely to convert.' },
      { title: 'Personalization Engine', icon: '🧠', desc: 'Personalized journeys that speak to each Birmingham segment automatically.' },
      { title: 'Automation & Integration', icon: '⚙️', desc: 'AI tools wired into your stack so the whole system compounds.' },
      { title: 'Governance & Performance Reporting', icon: '📊', desc: 'Guardrails and reporting so AI stays on-brand, accurate, and accountable.' },
    ],
    mistakes: [
      { mistake: 'Automating Before Strategy', consequence: 'AI applied to a bad plan just makes bad marketing faster.', solution: 'Fix the strategy, then apply AI to scale it.' },
      { mistake: 'Losing the Local Voice', consequence: 'Unedited AI content reads generic and erodes Birmingham trust.', solution: 'Keep human guidance and local voice in every workflow.' },
      { mistake: 'No Governance', consequence: 'Ungoverned AI risks off-brand or inaccurate output.', solution: 'Set clear guardrails, review, and approval steps.' },
      { mistake: 'Chasing Tools Over Outcomes', consequence: 'Buying AI tools with no use case wastes budget.', solution: 'Start from the outcome and pick tools to fit.' },
      { mistake: 'Ignoring Data Quality', consequence: 'AI on messy data produces unreliable targeting.', solution: 'Clean and structure data before modeling.' },
    ],
    localAngle: [
      'For lean Central Alabama teams, AI is a genuine force-multiplier — it lets a small Birmingham business produce the marketing volume and targeting precision that used to require a much larger staff.',
      'Because most Jefferson County competitors have not adopted AI yet, businesses that apply it thoughtfully now open a real, early advantage in this market.',
    ],
  },

  analytics: {
    discipline: 'marketing analytics and reporting',
    readerGoal: 'knowing exactly what is working and what to cut',
    outcome: 'clear attribution and decisions driven by data, not guesswork',
    terms: ['attribution', 'KPIs', 'dashboards', 'conversion tracking', 'cohort analysis', 'the data layer'],
    problems: [
      'Spending on marketing with no idea which efforts actually produce customers',
      'Reports full of vanity metrics that never inform a real decision',
      'Data trapped in separate tools that never tells one coherent story',
    ],
    deliverables: [
      { title: 'Measurement & KPI Framework', icon: '🎯', desc: 'We define the metrics that actually predict revenue for your Birmingham business.' },
      { title: 'Tracking & Attribution Setup', icon: '🔗', desc: 'End-to-end tracking so every Jefferson County lead is attributed to its source.' },
      { title: 'Unified Dashboard Build', icon: '📊', desc: 'One dashboard that pulls every channel into a single, clear view.' },
      { title: 'Channel Performance Analysis', icon: '🔍', desc: 'Analysis that shows what to scale and what to cut across the metro.' },
      { title: 'Conversion & Funnel Reporting', icon: '📈', desc: 'Stage-by-stage reporting so you can see where local revenue is won and lost.' },
      { title: 'Ongoing Insight Reviews', icon: '🧭', desc: 'Regular reviews that turn data into concrete next steps.' },
    ],
    mistakes: [
      { mistake: 'Tracking Vanity Metrics', consequence: 'Impressions and likes never inform a real Birmingham decision.', solution: 'Focus on KPIs tied to revenue and conversion.' },
      { mistake: 'No Attribution', consequence: 'Without attribution you cannot tell which channels produce customers.', solution: 'Build end-to-end tracking and attribution.' },
      { mistake: 'Siloed Data', consequence: 'Disconnected tools never tell one coherent story.', solution: 'Unify data into a single dashboard.' },
      { mistake: 'Reporting Without Action', consequence: 'Dashboards nobody acts on waste everyone\'s time.', solution: 'Pair every report with clear recommendations.' },
      { mistake: 'Ignoring the Full Funnel', consequence: 'Top-line metrics hide where deals actually stall.', solution: 'Report across the entire funnel.' },
    ],
    localAngle: [
      'Many Birmingham businesses invest in marketing on instinct; the ones that instrument attribution gain a decisive edge because they can double down on what works while Central Alabama competitors keep guessing.',
      'Because marketing budgets are lean in this market, knowing exactly which Jefferson County channels pay off is often the difference between profitable growth and wasted spend.',
    ],
  },

  reputation: {
    discipline: 'reputation and review management',
    readerGoal: 'a strong, trusted reputation that wins local buyers',
    outcome: 'a steady stream of positive reviews and a reputation that converts',
    terms: ['review velocity', 'star rating', 'review response', 'sentiment', 'online reputation', 'social proof'],
    problems: [
      'A thin or dated review profile that costs you Birmingham buyers to competitors',
      'The occasional negative review with no system to respond or recover',
      'No process to turn happy Jefferson County customers into public proof',
    ],
    deliverables: [
      { title: 'Reputation Audit', icon: '🔍', desc: 'A full read on how your business appears across review sites in the Birmingham market.' },
      { title: 'Review Generation System', icon: '⭐', desc: 'A workflow that consistently turns satisfied Jefferson County customers into reviews.' },
      { title: 'Response & Recovery Playbook', icon: '💬', desc: 'A cadence for responding to every review and recovering from negatives professionally.' },
      { title: 'Monitoring & Alerts', icon: '🔔', desc: 'Real-time monitoring so no Birmingham review goes unnoticed.' },
      { title: 'Social Proof Deployment', icon: '📣', desc: 'Putting reviews to work on your site, ads, and profiles where local buyers decide.' },
      { title: 'Reputation Reporting', icon: '📊', desc: 'Tracking rating, velocity, and sentiment over time.' },
    ],
    mistakes: [
      { mistake: 'No System for Generating Reviews', consequence: 'A stagnant profile falls behind Birmingham competitors.', solution: 'Run a consistent review-request workflow.' },
      { mistake: 'Ignoring Negative Reviews', consequence: 'Unanswered negatives scare off Jefferson County buyers.', solution: 'Respond and recover within 24 hours.' },
      { mistake: 'Not Monitoring Mentions', consequence: 'Problems fester unseen across review sites.', solution: 'Set up real-time monitoring and alerts.' },
      { mistake: 'Hiding Reviews', consequence: 'Failing to showcase proof wastes hard-won credibility.', solution: 'Deploy social proof where buyers decide.' },
      { mistake: 'Faking Reviews', consequence: 'Fake reviews risk penalties and destroy trust.', solution: 'Generate authentic reviews from real customers.' },
    ],
    localAngle: [
      'In a trust-driven Central Alabama market, reviews carry outsized weight — a strong, active review profile often decides which Birmingham business a buyer calls first.',
      'Because Jefferson County word-of-mouth travels fast both ways, a disciplined reputation system protects and compounds the local credibility that drives referrals.',
    ],
  },

  funding: {
    discipline: 'fundraising and capital strategy',
    readerGoal: 'raising the right capital on the right terms',
    outcome: 'a credible raise on terms that reflect real value',
    terms: ['the raise', 'the cap table', 'financial model', 'the data room', 'term sheet', 'runway'],
    problems: [
      'A pitch that fails to convince investors your business is fundable',
      'No financial model or data room, so promising conversations stall in diligence',
      'Unclear which capital source actually fits your stage and Central Alabama business',
    ],
    deliverables: [
      { title: 'Fundraising Readiness Assessment', icon: '✅', desc: 'An honest read on whether your business is ready to raise and what to fix first.' },
      { title: 'Financial Model & Projections', icon: '💰', desc: 'A defensible model with unit economics that holds up under investor diligence.' },
      { title: 'Investor Narrative & Pitch', icon: '📊', desc: 'A story and deck that make Central Alabama investors understand your value.' },
      { title: 'Capital Strategy & Targeting', icon: '🗺️', desc: 'The right funding path — angel, SBA-backed, revenue-based, or regional capital — for your stage.' },
      { title: 'Data Room & Diligence Prep', icon: '📋', desc: 'A complete data room so a Birmingham raise does not stall on paperwork.' },
      { title: 'Investor Outreach Support', icon: '🤝', desc: 'Warm introductions and outreach into the regional investor community.' },
    ],
    mistakes: [
      { mistake: 'Pitching Before Readiness', consequence: 'A premature raise burns investor relationships you cannot get back.', solution: 'Assess readiness and fix gaps before pitching.' },
      { mistake: 'A Model That Fails Diligence', consequence: 'Weak numbers collapse promising Birmingham conversations.', solution: 'Build a defensible model with real unit economics.' },
      { mistake: 'Chasing the Wrong Capital', consequence: 'Pursuing a fit-poor source wastes months of runway.', solution: 'Match the capital path to your stage and model.' },
      { mistake: 'No Data Room', consequence: 'Disorganized diligence stalls or kills the raise.', solution: 'Prepare a complete data room before outreach.' },
      { mistake: 'A Vague Investor Narrative', consequence: 'Investors who do not grasp the value do not commit.', solution: 'Craft a clear, evidence-backed narrative.' },
    ],
    localAngle: [
      'Central Alabama capital rewards demonstrated traction and sound unit economics over growth-at-all-costs narratives, so a Birmingham raise is won by proving the model works, not by projecting hypergrowth.',
      'Because Birmingham\'s capital is concentrated in specific angel and regional networks — accessible through hubs like Innovation Depot — knowing which door to knock on matters as much as the pitch itself.',
    ],
  },

  pitchdeck: {
    discipline: 'pitch deck and investor storytelling',
    readerGoal: 'a deck that makes investors lean in',
    outcome: 'a deck and narrative that move investors to a meeting',
    terms: ['the narrative arc', 'the ask', 'traction slide', 'market sizing', 'the appendix', 'investor Q&A'],
    problems: [
      'A deck that buries the story and loses investors by slide three',
      'No clear traction or market story that makes the opportunity obvious',
      'Slides that trigger tough questions instead of answering them',
    ],
    deliverables: [
      { title: 'Narrative & Story Architecture', icon: '📖', desc: 'A compelling arc that makes your opportunity obvious to Central Alabama investors.' },
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
    localAngle: [
      'Central Alabama investors reward clarity and evidence over hype, so a Birmingham pitch that leads with traction and sound economics outperforms a flashier coastal-style deck.',
      'Because regional investors often evaluate on fit and fundamentals, a deck tuned to this market emphasizes durable value and a credible path over speculative upside.',
    ],
  },

  investor: {
    discipline: 'investor relations and communications',
    readerGoal: 'keeping investors confident and engaged',
    outcome: 'investors who stay confident, engaged, and ready to re-invest',
    terms: ['investor updates', 'the board deck', 'KPI reporting', 'stakeholder communications', 'the cap table', 'reporting cadence'],
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
    localAngle: [
      'For Birmingham companies backed by regional investors, disciplined communication carries extra weight — Central Alabama capital is relationship-driven, and steady, honest reporting is what earns the next check.',
      'Because the regional investor community is tight-knit, a Birmingham founder\'s reputation for clear communication travels quickly and shapes future access to capital.',
    ],
  },

  franchisegrowth: {
    discipline: 'franchise growth and expansion strategy',
    readerGoal: 'expanding into new territory without breaking operations',
    outcome: 'sequenced expansion that scales revenue without operational chaos',
    terms: ['territory strategy', 'unit economics', 'the expansion roadmap', 'site selection', 'franchise development', 'multi-unit scaling'],
    problems: [
      'Expanding into new Central Alabama territory without the data to time it right',
      'Operations that buckle every time you try to add a location',
      'Unit economics that are not strong enough to scale profitably',
    ],
    deliverables: [
      { title: 'Growth Readiness Assessment', icon: '✅', desc: 'An honest read on whether operations and unit economics can support new Birmingham locations.' },
      { title: 'Territory & Market Analysis', icon: '🗺️', desc: 'Central Alabama demographic and competitive data to time and place expansion right.' },
      { title: 'Expansion Roadmap', icon: '📈', desc: 'A sequenced plan that scales along the Highway 280 and I-459 corridors without overextension.' },
      { title: 'Unit Economics Optimization', icon: '💰', desc: 'Strengthening margin and payback so scale amplifies a profitable model.' },
      { title: 'Operational Playbooks', icon: '⚙️', desc: 'Repeatable systems so each new Jefferson County unit opens cleaner and ramps faster.' },
      { title: 'Milestone & Accountability Structure', icon: '📋', desc: 'Milestone reviews that keep expansion on its execution timeline.' },
    ],
    mistakes: [
      { mistake: 'Expanding Before Operations Are Ready', consequence: 'New locations overload systems and pull the whole business backward.', solution: 'Assess readiness before committing to expansion.' },
      { mistake: 'Scaling Weak Unit Economics', consequence: 'Growth multiplies losses when the model is not yet profitable.', solution: 'Optimize unit economics before scaling.' },
      { mistake: 'No Territory Data', consequence: 'Guessing on new markets wastes capital on the wrong corridors.', solution: 'Use Central Alabama market data to time and place growth.' },
      { mistake: 'Hiring Too Slowly for Growth', consequence: 'Understaffed expansion breaks service and momentum.', solution: 'Sequence hiring ahead of demand in key roles.' },
      { mistake: 'No Milestone Accountability', consequence: 'Expansion drifts off plan when daily operations take over.', solution: 'Run structured milestone reviews.' },
    ],
    localAngle: [
      'Birmingham expansion runs along specific commercial corridors like Highway 280 and I-459 and a Shelby County suburban growth pattern, so timing and site selection here depend on genuinely local market intelligence, not a national playbook.',
      'Because Central Alabama rewards patient, community-connected growth over aggressive market capture, the businesses that scale successfully here sequence expansion against real operational readiness.',
    ],
  },

  localfranchise: {
    discipline: 'local and multi-unit franchise marketing',
    readerGoal: 'driving store-level demand across every location',
    outcome: 'each location generating its own steady local demand',
    terms: ['local store marketing', 'co-op ad funds', 'multi-unit budgeting', 'grand-opening campaigns', 'territory-level demand', 'brand standards'],
    problems: [
      'Corporate campaigns that never translate into foot traffic at the local Birmingham unit',
      'Marketing budget split evenly across locations regardless of real demand',
      'Local execution that drifts from brand standards or stalls entirely',
    ],
    deliverables: [
      { title: 'Local Market Assessment', icon: '🔍', desc: 'A read on demand and competition around each Jefferson County location.' },
      { title: 'Location Landing Pages & Local SEO', icon: '📍', desc: 'Each unit ranks for the Birmingham-area searches that bring in nearby customers.' },
      { title: 'Territory Budget Allocation', icon: '💰', desc: 'Budget split across locations by real demand signals, not equal shares.' },
      { title: 'Local Campaign Execution', icon: '📣', desc: 'Store-level campaigns that stay inside brand standards while feeling native to Birmingham.' },
      { title: 'Grand-Opening Playbook', icon: '🚀', desc: 'Launch campaigns that get a new Central Alabama location profitable faster.' },
      { title: 'Co-op Fund Management', icon: '🤝', desc: 'Making co-op and brand-fund dollars work harder across the metro.' },
    ],
    mistakes: [
      { mistake: 'Relying on Corporate Marketing Alone', consequence: 'National campaigns rarely fill a specific Birmingham store.', solution: 'Add local store marketing tuned to each unit.' },
      { mistake: 'Equal Budget Splits', consequence: 'Even splits starve the strongest unit and prop up the weakest.', solution: 'Allocate budget by real local demand signals.' },
      { mistake: 'Off-Brand Local Execution', consequence: 'Inconsistent local marketing erodes the brand.', solution: 'Keep execution inside brand standards.' },
      { mistake: 'Weak Grand Openings', consequence: 'A soft launch leaves a new location slow to ramp.', solution: 'Run a structured grand-opening campaign.' },
      { mistake: 'Wasting Co-op Funds', consequence: 'Unused or misused co-op dollars leave growth on the table.', solution: 'Actively manage co-op funds for local return.' },
    ],
    localAngle: [
      'Birmingham buyers choose by neighborhood and community connection, so multi-unit marketing here has to win at the Vestavia Hills or Trussville store level, not just at the brand level.',
      'Because demand varies sharply across Jefferson and Shelby County trade areas, allocating budget by real local signals beats the even-split approach most franchise systems default to.',
    ],
  },

  operations: {
    discipline: 'operations and process consulting',
    readerGoal: 'fixing the operational leaks quietly costing you money',
    outcome: 'leaner operations, protected margin, and capacity to grow',
    terms: ['process mapping', 'bottlenecks', 'standard operating procedures', 'margin leaks', 'capacity planning', 'workflow design'],
    problems: [
      'Revenue leaking inside operations — not the market — through inefficiency and rework',
      'Bottlenecks and staffing gaps that cap how much the business can handle',
      'No documented processes, so quality depends on who happens to be working',
    ],
    deliverables: [
      { title: 'Operations & Process Audit', icon: '🔍', desc: 'We map how work flows and pinpoint the bottlenecks costing your Birmingham business margin.' },
      { title: 'Workflow Redesign', icon: '⚙️', desc: 'Streamlined workflows that remove rework and speed up delivery.' },
      { title: 'SOPs & Documentation', icon: '📘', desc: 'Standard operating procedures so quality no longer depends on individuals.' },
      { title: 'Margin & Cost Analysis', icon: '💰', desc: 'Finding the pricing and cost leaks quietly eroding Jefferson County profitability.' },
      { title: 'Capacity & Staffing Plan', icon: '👥', desc: 'A staffing and capacity model that supports growth without premature overhead.' },
      { title: 'Performance Dashboards', icon: '📊', desc: 'Operational metrics so leaders manage on data, not gut feel.' },
    ],
    mistakes: [
      { mistake: 'Chasing Growth Before Fixing Operations', consequence: 'Scaling a leaky operation multiplies the losses.', solution: 'Fix operational gaps before investing in growth.' },
      { mistake: 'No Documented Processes', consequence: 'Quality swings with whoever is working that day.', solution: 'Document SOPs for repeatable results.' },
      { mistake: 'Ignoring Margin Leaks', consequence: 'Small inefficiencies compound into real lost profit.', solution: 'Analyze and close pricing and cost leaks.' },
      { mistake: 'Overstaffing or Understaffing', consequence: 'The wrong staffing level either burns cash or breaks service.', solution: 'Plan capacity against real demand.' },
      { mistake: 'Managing Without Metrics', consequence: 'Gut-feel management hides the real problems.', solution: 'Stand up operational dashboards.' },
    ],
    localAngle: [
      'For established Birmingham businesses, most lost revenue hides inside operations rather than the market — and in a competitive Central Alabama landscape, closing those leaks often produces a faster return than any new marketing spend.',
      'Because Jefferson County businesses run lean, disciplined processes and clear SOPs create capacity to grow without the overhead that sinks less-organized competitors.',
    ],
  },

  advisory: {
    discipline: 'business advisory, coaching, and mentorship',
    readerGoal: 'an experienced outside perspective on the decisions that matter',
    outcome: 'faster, more confident decisions with an experienced partner in your corner',
    terms: ['decision support', 'accountability', 'strategic sounding board', 'operating cadence', 'leadership coaching', 'the growth plan'],
    problems: [
      'Making high-stakes decisions alone, without the experience to weigh them confidently',
      'Knowing the business needs to change but lacking an objective outside perspective',
      'Drifting from the plan when daily operations take over',
    ],
    deliverables: [
      { title: 'Business & Goal Assessment', icon: '🔍', desc: 'A clear read on where your Birmingham business stands and where you want it to go.' },
      { title: 'Strategic Advisory Sessions', icon: '🧭', desc: 'Regular working sessions that bring experience to your biggest decisions.' },
      { title: 'Decision Support Framework', icon: '⚖️', desc: 'Market data and structured thinking behind hiring, pricing, and growth calls.' },
      { title: 'Accountability Structure', icon: '📋', desc: 'Milestones and check-ins that keep you moving through the plan.' },
      { title: 'Leadership & Team Coaching', icon: '👥', desc: 'Coaching that strengthens how you and your Jefferson County team operate.' },
      { title: 'Network & Resource Access', icon: '🤝', desc: 'Connections into Birmingham institutions and the right local resources at the right time.' },
    ],
    mistakes: [
      { mistake: 'Deciding Alone', consequence: 'Solo decisions on major calls carry unnecessary risk.', solution: 'Bring an experienced sounding board to key decisions.' },
      { mistake: 'No Accountability', consequence: 'Good plans drift when daily work takes over.', solution: 'Add milestones and regular check-ins.' },
      { mistake: 'Hiring Out-of-Market Advisors', consequence: 'Credentials without Central Alabama context miss what matters locally.', solution: 'Work with advisors who know this market.' },
      { mistake: 'Avoiding Hard Feedback', consequence: 'Comfortable advice never changes the business.', solution: 'Seek an honest outside perspective.' },
      { mistake: 'Waiting for a Crisis', consequence: 'Engaging only under pressure leaves fewer options.', solution: 'Build the advisory relationship proactively.' },
    ],
    localAngle: [
      'Birmingham founders and owners often lack a peer network of experienced operators, so an advisor who genuinely knows the Central Alabama market — its capital, talent, and buyer behavior — fills a real gap.',
      'Because so much of Jefferson County business runs through relationships, an advisor plugged into local institutions like the Birmingham Business Alliance and SCORE Birmingham opens doors as much as they guide decisions.',
    ],
  },

  growth: {
    discipline: 'growth and scaling consulting',
    readerGoal: 'scaling what works without breaking what you built',
    outcome: 'sustainable, sequenced growth that does not outrun operations',
    terms: ['unit economics', 'the growth engine', 'customer acquisition', 'retention', 'the scaling roadmap', 'operational readiness'],
    problems: [
      'Early traction that keeps stalling every time you push for growth',
      'Scaling spend before the unit economics can support it',
      'Growth that outruns operations and creates chaos instead of profit',
    ],
    deliverables: [
      { title: 'Growth Readiness Diagnosis', icon: '✅', desc: 'We diagnose whether operations and unit economics can actually support scale.' },
      { title: 'Unit Economics Optimization', icon: '💰', desc: 'Fixing margin, retention, and acquisition cost so scale amplifies a sound model.' },
      { title: 'Customer Acquisition System', icon: '🎯', desc: 'Repeatable acquisition beyond founder-led sales, tuned to the Birmingham market.' },
      { title: 'Scaling Roadmap', icon: '📈', desc: 'A sequenced plan that grows revenue without breaking operations.' },
      { title: 'Team & Org Structure', icon: '👥', desc: 'Hiring sequence and structure that support scale while staying lean.' },
      { title: 'Growth Metrics & Reporting', icon: '📊', desc: 'The metrics that actually predict sustainable scale, tracked continuously.' },
    ],
    mistakes: [
      { mistake: 'Scaling Before Fixing Unit Economics', consequence: 'Growth capital amplifies losses when the model leaks.', solution: 'Fix unit economics before pushing growth.' },
      { mistake: 'Mistaking Traction for Scalability', consequence: 'Early wins can mask a model that will not scale.', solution: 'Diagnose readiness before deploying growth spend.' },
      { mistake: 'Growth Outrunning Operations', consequence: 'Ops break at exactly the wrong moment.', solution: 'Sequence growth against operational readiness.' },
      { mistake: 'Founder-Dependent Sales', consequence: 'Growth stalls when it all runs through the founder.', solution: 'Build repeatable acquisition systems.' },
      { mistake: 'Tracking Vanity Metrics', consequence: 'Vanity numbers hide stalling growth.', solution: 'Track the metrics that predict sustainable scale.' },
    ],
    localAngle: [
      'Scaling a Birmingham business means navigating a smaller talent pool than coastal metros and a Central Alabama capital environment that rewards proven unit economics — so disciplined, sequenced growth beats growth-at-all-costs here.',
      'Because Jefferson County customers respond to trust over marketing volume, the acquisition systems that scale in this market are built on credibility and retention, not just spend.',
    ],
  },

  startup: {
    discipline: 'startup strategy and go-to-market consulting',
    readerGoal: 'building and launching something that actually gains traction',
    outcome: 'a validated, launch-ready business with early traction',
    terms: ['product-market fit', 'go-to-market', 'the business model', 'validation', 'early traction', 'the launch plan'],
    problems: [
      'A promising idea with no structure around how to actually build the business',
      'Building against national assumptions instead of how the Birmingham market behaves',
      'Burning early runway on the wrong activities before reaching traction',
    ],
    deliverables: [
      { title: 'Business Model Stress Test', icon: '🔍', desc: 'We pressure-test your assumptions against Central Alabama cost and demand realities.' },
      { title: 'Market Validation', icon: '✅', desc: 'Structured discovery with real Jefferson County prospects before you overbuild.' },
      { title: 'Go-To-Market Plan', icon: '🎯', desc: 'A launch plan calibrated to how Birmingham buyers actually make decisions.' },
      { title: 'Operational Setup', icon: '⚙️', desc: 'The systems and workflows a young business needs so early growth does not create chaos.' },
      { title: 'Brand & Positioning', icon: '✨', desc: 'Identity and messaging that make an early-stage company credible from day one.' },
      { title: 'Ecosystem Navigation', icon: '🧭', desc: 'Connections into Innovation Depot, the Birmingham Business Alliance, and the right local resources.' },
    ],
    mistakes: [
      { mistake: 'Building Before Validating', consequence: 'Months and runway vanish building something the market never wanted.', solution: 'Validate demand with real Birmingham prospects first.' },
      { mistake: 'National Assumptions', consequence: 'Pricing and positioning built for other markets miss how Jefferson County buys.', solution: 'Ground the plan in Central Alabama market reality.' },
      { mistake: 'Premature Scaling', consequence: 'Scaling before fit burns cash and morale.', solution: 'Reach traction before pushing growth.' },
      { mistake: 'No Operational Foundation', consequence: 'Early growth turns into chaos without systems.', solution: 'Set up lightweight operations early.' },
      { mistake: 'Ignoring the Local Ecosystem', consequence: 'Founders miss Birmingham resources built to help them.', solution: 'Plug into Innovation Depot, UAB, and the BBA.' },
    ],
    localAngle: [
      'Birmingham\'s startup ecosystem runs through Innovation Depot, UAB\'s commercialization pipeline, and founders who build real businesses without coastal venture backing — so a go-to-market plan here is built for traction and community, not a blitz-scale narrative.',
      'Because Central Alabama buyers reward trust and community connection over aggressive marketing, launching in Birmingham means validating against how this market actually decides.',
    ],
  },

  bizdev: {
    discipline: 'business development consulting',
    readerGoal: 'turning relationships into signed revenue',
    outcome: 'a structured pipeline that converts relationships into agreements',
    terms: ['the development pipeline', 'partnership strategy', 'revenue channels', 'proposal development', 'the follow-up cadence', 'deal conversion'],
    problems: [
      'Endless networking that never converts into actual Birmingham business',
      'One new revenue channel away from growth but no plan to open it',
      'No pipeline structure, so relationships stall in indefinite relationship-building',
    ],
    deliverables: [
      { title: 'Partnership Identification', icon: '🎯', desc: 'We identify the Birmingham partnerships worth pursuing by fit, overlap, and accessibility.' },
      { title: 'Revenue Channel Strategy', icon: '🧭', desc: 'Adjacent channels that fit your capabilities and Central Alabama market position.' },
      { title: 'Development Pipeline Build', icon: '📊', desc: 'A documented pipeline with tracking, cadence, and conversion benchmarks.' },
      { title: 'Network Activation', icon: '🤝', desc: 'Strategic activation of the Birmingham Business Alliance, Chambers, and UAB networks.' },
      { title: 'Proposal & Pitch Development', icon: '📋', desc: 'Materials calibrated to how Jefferson County buyers evaluate new partners.' },
      { title: 'Follow-Up System', icon: '📧', desc: 'A follow-up cadence that moves relationships to signed agreements.' },
    ],
    mistakes: [
      { mistake: 'Confusing Networking With Development', consequence: 'Relationships pile up but never convert to Birmingham revenue.', solution: 'Build a structured pipeline with conversion benchmarks.' },
      { mistake: 'Pursuing Every Opportunity', consequence: 'Spreading thin produces mediocre results everywhere.', solution: 'Concentrate on the highest-fit partnerships.' },
      { mistake: 'No Follow-Up Discipline', consequence: 'Warm Jefferson County relationships go cold.', solution: 'Run a documented follow-up cadence.' },
      { mistake: 'Weak Proposals', consequence: 'Poor materials stall deals at the decision point.', solution: 'Build proposals tuned to local buyers.' },
      { mistake: 'No Pipeline Visibility', consequence: 'Without tracking, development stalls unseen.', solution: 'Track the pipeline stage by stage.' },
    ],
    localAngle: [
      'Business development in Birmingham is relationship-driven and runs through specific community networks, so the partnerships worth building here require local knowledge and credible, structured outreach rather than high-volume cold approaches.',
      'Because Central Alabama business communities across healthcare, financial services, and construction are tightly interconnected, activating the right Jefferson County networks converts far faster than broad outreach.',
    ],
  },

  smallbiz: {
    discipline: 'small business consulting',
    readerGoal: 'high-ROI help that fits a real small-business budget',
    outcome: 'practical, affordable strategy that moves the numbers',
    terms: ['high-ROI strategy', 'the growth plan', 'operational efficiency', 'local competition', 'cash flow', 'the marketing budget'],
    problems: [
      'A limited budget that demands every marketing and strategy dollar works hard',
      'Competing against larger brands for the same Birmingham customers',
      'Wearing every hat with no outside perspective on what to prioritize',
    ],
    deliverables: [
      { title: 'Business Health Assessment', icon: '🔍', desc: 'A clear read on where your Birmingham small business stands and what to prioritize.' },
      { title: 'High-ROI Growth Plan', icon: '📈', desc: 'A focused plan that concentrates a limited budget on what actually moves revenue.' },
      { title: 'Local Marketing Strategy', icon: '📣', desc: 'Affordable, high-impact marketing tuned to how Jefferson County customers buy.' },
      { title: 'Operational Efficiency Review', icon: '⚙️', desc: 'Finding the process and cost fixes that protect margin.' },
      { title: 'Competitive Positioning', icon: '🎯', desc: 'A position that lets you compete with larger brands on more than price.' },
      { title: 'Ongoing Advisory', icon: '🤝', desc: 'A practical sounding board for the decisions that matter as you grow.' },
    ],
    mistakes: [
      { mistake: 'Spreading a Thin Budget Everywhere', consequence: 'A little of everything produces nothing for a small Birmingham business.', solution: 'Concentrate budget on the highest-ROI moves.' },
      { mistake: 'Competing Only on Price', consequence: 'A race to the bottom against larger brands you cannot win.', solution: 'Differentiate on value and local trust.' },
      { mistake: 'Doing Everything In-House', consequence: 'Owner burnout and subpar execution across the board.', solution: 'Focus on your strengths and get help on the rest.' },
      { mistake: 'Ignoring the Numbers', consequence: 'Gut-feel decisions miss what data would reveal.', solution: 'Track a few key metrics weekly.' },
      { mistake: 'Inconsistent Effort', consequence: 'Start-stop marketing creates boom-and-bust revenue.', solution: 'Commit to a steady, sustainable cadence.' },
    ],
    localAngle: [
      'Birmingham small businesses compete against larger regional brands for the same Jefferson County customers, so the winning strategy here concentrates a limited budget on local trust and the highest-ROI moves rather than trying to do everything.',
      'Because Central Alabama customers value community and consistency, a small business that shows up reliably and locally can out-position bigger competitors without outspending them.',
    ],
  },

  entrepreneur: {
    discipline: 'consulting for entrepreneurs',
    readerGoal: 'turning a vision into a real, structured business',
    outcome: 'a clear path from idea to a running, growing business',
    terms: ['the business plan', 'go-to-market', 'operational setup', 'the growth roadmap', 'brand building', 'bootstrapping'],
    problems: [
      'A strong vision but no structure to turn it into an operating business',
      'Wearing every hat with no roadmap for what comes next',
      'Building in Birmingham without knowing how this market actually behaves',
    ],
    deliverables: [
      { title: 'Vision & Business Plan', icon: '🧭', desc: 'Turning your idea into a concrete plan grounded in Central Alabama reality.' },
      { title: 'Go-To-Market Strategy', icon: '🎯', desc: 'A launch plan built for how Birmingham customers actually buy.' },
      { title: 'Operational Setup', icon: '⚙️', desc: 'The systems and workflows to run the business from day one.' },
      { title: 'Brand Building', icon: '✨', desc: 'A brand identity that attracts Jefferson County customers and talent.' },
      { title: 'Growth Roadmap', icon: '📈', desc: 'Market analysis and a sequenced path to sustainable growth.' },
      { title: 'Ongoing Mentorship', icon: '🤝', desc: 'Experienced guidance from operators who have built businesses in this market.' },
    ],
    mistakes: [
      { mistake: 'No Written Plan', consequence: 'A vision in your head cannot be executed or funded.', solution: 'Turn the vision into a concrete business plan.' },
      { mistake: 'Skipping Market Reality', consequence: 'Plans built on assumptions miss how Birmingham buys.', solution: 'Ground the plan in Central Alabama market reality.' },
      { mistake: 'No Operational Foundation', consequence: 'Early chaos without systems stalls momentum.', solution: 'Set up lightweight operations early.' },
      { mistake: 'Weak Brand From the Start', consequence: 'A forgettable brand makes every sale harder.', solution: 'Build a clear brand identity from day one.' },
      { mistake: 'Going It Alone', consequence: 'Solo founders repeat avoidable, costly mistakes.', solution: 'Work with a mentor who knows this market.' },
    ],
    localAngle: [
      'Birmingham entrepreneurs build inside a market that rewards community connection and realistic growth over the move-fast approach of coastal cities, so the path from idea to business here is built on local validation and relationships.',
      'Because Central Alabama offers real resources — Innovation Depot, SCORE Birmingham, the Birmingham Business Alliance — the entrepreneurs who move fastest are the ones who plug into the local ecosystem early.',
    ],
  },

  marketing: {
    discipline: 'full-service marketing',
    readerGoal: 'a marketing engine that reliably produces customers',
    outcome: 'a coordinated marketing engine that produces measurable local demand',
    terms: ['the marketing engine', 'multi-channel campaigns', 'brand and demand', 'the customer journey', 'return on marketing', 'lead flow'],
    problems: [
      'Disconnected marketing tactics that never add up to a reliable customer flow',
      'Spending on marketing with no clear line to Birmingham revenue',
      'A brand and message that fail to stand out in the Central Alabama market',
    ],
    deliverables: [
      { title: 'Marketing Audit & Strategy', icon: '🧭', desc: 'A coordinated strategy across channels, built for how Birmingham customers buy.' },
      { title: 'Brand & Messaging', icon: '🎯', desc: 'Positioning and messaging that stand out in the Central Alabama market.' },
      { title: 'Digital Marketing Execution', icon: '💻', desc: 'SEO, paid media, and social run as one system, not disconnected tactics.' },
      { title: 'Content & Creative', icon: '🎨', desc: 'Content and creative that carry the brand across every Jefferson County touchpoint.' },
      { title: 'Lead Generation & Nurture', icon: '🧲', desc: 'Capture and follow-up that turn attention into Birmingham customers.' },
      { title: 'Reporting & Optimization', icon: '📊', desc: 'Attribution and reporting that tie marketing to real local revenue.' },
    ],
    mistakes: [
      { mistake: 'Disconnected Tactics', consequence: 'One-off tactics never add up to a reliable Birmingham customer flow.', solution: 'Run channels as one coordinated engine.' },
      { mistake: 'No Attribution', consequence: 'Marketing spend with no line to revenue cannot be optimized.', solution: 'Track attribution from click to customer.' },
      { mistake: 'Generic, Non-Local Messaging', consequence: 'Messaging that ignores this market fails to stand out.', solution: 'Ground brand and message in Central Alabama context.' },
      { mistake: 'Chasing Every Channel', consequence: 'Spreading thin dilutes results everywhere.', solution: 'Prioritize the channels that fit your buyers.' },
      { mistake: 'No Follow-Up', consequence: 'Attention arrives and leaves without capture.', solution: 'Add lead capture and nurture throughout.' },
    ],
    localAngle: [
      'Marketing in Birmingham works best as one coordinated engine tuned to a trust-driven Central Alabama market, where consistent local presence and follow-up outperform scattered tactics or pure ad volume.',
      'Because Jefferson County buyers weigh community credibility heavily, marketing here has to build brand and demand together rather than chasing quick clicks.',
    ],
  },

  consulting: {
    discipline: 'business consulting',
    readerGoal: 'an experienced outside perspective that moves the business forward',
    outcome: 'clearer strategy, tighter operations, and confident decisions',
    terms: ['strategic planning', 'operational assessment', 'the growth strategy', 'decision support', 'competitive positioning', 'implementation'],
    problems: [
      'Knowing something is off but being unable to see it from inside the business',
      'Making major strategic decisions without objective outside perspective',
      'Strategy that never translates into operational results',
    ],
    deliverables: [
      { title: 'Business & Market Assessment', icon: '🔍', desc: 'An honest read on where your Birmingham business stands against its market and competition.' },
      { title: 'Strategic Plan', icon: '🧭', desc: 'A clear plan with priorities and benchmarks tuned to Central Alabama conditions.' },
      { title: 'Operational Review', icon: '⚙️', desc: 'Finding the gaps and inefficiencies costing your Jefferson County business.' },
      { title: 'Growth Strategy', icon: '📈', desc: 'A sequenced growth plan built for how the Birmingham market actually behaves.' },
      { title: 'Competitive Positioning', icon: '🎯', desc: 'Positioning against the real competitors you face in Jefferson and Shelby Counties.' },
      { title: 'Implementation Support', icon: '🤝', desc: 'Staying engaged through execution so strategy becomes operational results.' },
    ],
    mistakes: [
      { mistake: 'Waiting for a Crisis', consequence: 'Engaging only under pressure leaves fewer Birmingham options.', solution: 'Bring in outside perspective proactively.' },
      { mistake: 'Strategy Without Implementation', consequence: 'A strategy deck that gathers dust changes nothing.', solution: 'Stay engaged through execution.' },
      { mistake: 'Hiring Out-of-Market Firms', consequence: 'Generic recommendations miss Central Alabama dynamics.', solution: 'Work with advisors who know this market.' },
      { mistake: 'Ignoring Operations', consequence: 'Growth plans fail when operations cannot support them.', solution: 'Assess operational readiness alongside strategy.' },
      { mistake: 'Deciding Without Data', consequence: 'Gut-feel calls miss what local market data reveals.', solution: 'Bring market data to major decisions.' },
    ],
    localAngle: [
      'Birmingham business owners are frequently underserved by national firms with credentials but no Central Alabama market knowledge, so consulting that combines genuine local intelligence with implementation support fills a real gap in this metro.',
      'Because Jefferson County businesses often reach a growth stage where outside perspective produces measurable returns, structured consulting here consistently outperforms deciding alone.',
    ],
  },
};

// ---------------------------------------------------------------------------
// PACK DEPTH — extra dimensions so every SECTION says something new.
// Each field is a self-contained, service- and city-specific sentence, given
// its own home in exactly one section (no rephrasing pain points/outcomes):
//   marketDynamics -> Overview body (how Birmingham's economy shapes demand)
//   demandDriver   -> Market Analysis body (what is changing locally now)
//   buyerBehavior  -> Overview secondary + how-Birmingham-buys card
//   approach       -> "how we work" card + definition
//   insight        -> Expert quote (a non-obvious POV)
//   value.{money,time,risk,status} -> the four value pillars, distinct levers
// ---------------------------------------------------------------------------
const PACK_DEPTH = {
  seo: {
    marketDynamics: 'The Birmingham metro is split across dozens of distinct municipalities — Homewood, Hoover, Vestavia Hills, Mountain Brook, Trussville — and each behaves as its own micro-market, so local visibility is won neighborhood by neighborhood rather than under one city name.',
    demandDriver: 'As national directories and franchise chains pour budget into paid search, independent Central Alabama businesses increasingly compete on organic map-pack visibility, where proximity and reputation still beat ad spend.',
    buyerBehavior: 'Local buyers here rarely scroll past the three map-pack results, and they weigh distance and review count far more heavily than brand recognition.',
    approach: 'We work outward from the map pack — rank the business by neighborhood first, rebuild the Google Business Profile and citations, then ship a landing page per service area with a review engine running behind it.',
    insight: 'In a metro this fragmented, a single "we serve Birmingham" page cannot rank everywhere; you hold a different position in every suburb, which is exactly why one-page local strategies quietly stall.',
    value: {
      money: 'Map-pack visibility compounds — once a location ranks, it keeps producing calls without the per-click cost of ads, steadily lowering blended acquisition cost across the metro.',
      time: 'Because we sequence the Google Business Profile and citations before content, most Birmingham locations see map-pack movement in weeks rather than the many months a broad SEO push takes to register.',
      risk: 'Consistent NAP data and a verified profile protect you from the ranking collapses that hit businesses when Google finds conflicting location information across directories.',
      status: 'Owning the map pack for your category signals to Birmingham buyers that you are the established local option, not a new or out-of-town entrant.',
    },
  },
  paidads: {
    marketDynamics: 'Media costs across the Birmingham metro run well below Atlanta or Nashville, so a disciplined local advertiser can buy meaningful reach cheaply — but only inside a service radius tight enough to exclude the rural counties surrounding Jefferson.',
    demandDriver: 'As more Central Alabama buyers research on mobile before ever calling, paid search and social have become the fastest way to reach in-market customers who would never surface through referrals alone.',
    buyerBehavior: 'Birmingham buyers click cautiously and convert on trust signals — reviews, a local address, clear pricing — so the landing page does more of the selling here than the ad itself.',
    approach: 'We fix conversion tracking first, fence campaigns to the real service area, then optimize toward cost per acquisition instead of clicks, moving budget daily toward the audiences that actually book.',
    insight: 'The biggest waste in Birmingham ad accounts is not weak creative — it is untracked spend and statewide targeting, which together hide which campaigns produce customers and which just produce clicks.',
    value: {
      money: 'Tight geo-fencing and conversion-based bidding cut the wasted spend that leaks into clicks outside your service area, lowering cost per acquisition without lowering volume.',
      time: 'Paid media buys immediate visibility, so unlike organic channels it can fill the pipeline within days while slower assets like SEO and reputation build underneath.',
      risk: 'Full tracking means you scale on evidence, not hope — you never pour budget into a campaign that looks busy but never reaches the click-to-close path.',
      status: 'Consistent, well-placed local ads keep your business top-of-mind in the exact Birmingham zip codes you serve, reinforcing that you are the active, available choice.',
    },
  },
  social: {
    marketDynamics: 'Birmingham is a relationship-first market where neighborhood identity runs deep, so social content that features real local people, places, and events carries more weight than the polished-but-generic feeds that work in larger metros.',
    demandDriver: 'As word-of-mouth increasingly happens in comment sections and DMs, Central Alabama businesses that stay visible and responsive on social capture referrals that used to travel only in person.',
    buyerBehavior: 'Local followers here engage with authenticity and community, not corporate polish, and they quietly judge responsiveness — an ignored message reads as an ignored customer.',
    approach: 'We plan around Birmingham seasons and events, produce content featuring your actual work and people, then treat comments and DMs as a sales channel with a real response cadence.',
    insight: 'Follower count is the vanity metric that fools Birmingham businesses; a small, engaged local audience that shows up and shares outperforms a large passive one every time.',
    value: {
      money: 'A community-driven feed turns existing customers into unpaid advocates, generating referral reach that would cost far more to buy through advertising.',
      time: 'A planned content calendar ends the scramble of last-minute posting, giving a lean Birmingham team a consistent presence without daily improvisation.',
      risk: 'Active community management catches complaints and questions early, protecting the local reputation that spreads fast in a connected market like Birmingham.',
      status: 'A steady, authentically local presence positions your business as an active part of the Birmingham community rather than a name people only see on a sign.',
    },
  },
  content: {
    marketDynamics: 'Birmingham buyers in healthcare, financial services, and professional services research heavily and privately before they ever reach out, so the businesses that answer their questions online earn trust long before the first conversation.',
    demandDriver: 'Because Central Alabama is underserved by genuinely local, expert content, the first business to own a topic in its niche captures organic visibility that is expensive for latecomers to reclaim.',
    buyerBehavior: 'Local decision-makers reward substance over hype — content that demonstrates real expertise moves them, while thin promotional posts are ignored.',
    approach: 'We build topic clusters around what Birmingham buyers actually search, publish on a real editorial cadence, and pair thought leadership with decision-stage content that captures leads.',
    insight: 'Most Birmingham content fails not because it is badly written but because it targets topics no local buyer searches; intent, not volume, is what turns content into pipeline.',
    value: {
      money: 'Search-ranked content is an owned asset that keeps generating leads for years, unlike ads that stop the moment the budget does — the lowest long-run cost per lead available.',
      time: 'An editorial calendar and topic plan replace sporadic, reactive posting, so authority compounds steadily instead of restarting every few months.',
      risk: 'Publishing genuine local expertise builds a trust moat that shields you from price competition and from newer entrants trying to buy attention.',
      status: 'Consistently answering your market\'s questions positions your team as the recognized Central Alabama authority, the name buyers cite when they explain their choice.',
    },
  },
  website: {
    marketDynamics: 'With most Birmingham searches happening on mobile and buyers judging credibility in seconds, a slow or dated site quietly diverts business to competitors before the phone ever rings.',
    demandDriver: 'As local buyers increasingly expect to book and inquire online, Central Alabama businesses still running brochure sites are losing the customers who never call a number they have to hunt for.',
    buyerBehavior: 'Birmingham visitors decide fast — they scan for proof, pricing clarity, and an obvious next step, and they abandon anything slow or confusing on a phone.',
    approach: 'We audit where visitors drop off, redesign around the booking action rather than aesthetics, and build in speed, mobile-first layout, and a local SEO foundation from the start.',
    insight: 'A beautiful Birmingham site that buries its call-to-action converts worse than a plain one that makes the next step obvious; clarity beats polish on every measure that matters.',
    value: {
      money: 'A conversion-focused site lifts the return on every other marketing dollar, because more of the traffic you already pay for turns into booked calls.',
      time: 'Built-in booking and lead capture handle inquiries around the clock, freeing your Birmingham team from chasing every prospect by phone.',
      risk: 'A fast, credible, mobile-first site removes the silent objection that costs you buyers who judge your business by its digital front door.',
      status: 'A modern site signals to Central Alabama buyers that you are an established, trustworthy operator, leveling the field against much larger competitors.',
    },
  },
  branding: {
    marketDynamics: 'The Birmingham market rewards community trust and credibility over sheer size, so a brand here has to earn belief from Jefferson County buyers rather than simply outspend the competition.',
    demandDriver: 'As Central Alabama sectors crowd with look-alike competitors, businesses that sharpen their positioning stand out fast and escape the price wars that trap the undifferentiated.',
    buyerBehavior: 'Local buyers choose the option they understand and trust quickest — a clear, credible position beats a clever but confusing one every time.',
    approach: 'We audit how you show up against real Birmingham competitors, define the white-space position only you can own, then build the messaging and identity system to carry it everywhere.',
    insight: 'Most Birmingham brands blend in not because their work is average but because their message describes what they do instead of why a local buyer should choose them.',
    value: {
      money: 'Clear positioning lets you compete on value instead of price, protecting margin against the discounting that undifferentiated Birmingham competitors fall into.',
      time: 'A defined brand and message system speeds every future decision — marketing, sales, and hiring all move faster when everyone knows what you stand for.',
      risk: 'A consistent identity across every touchpoint prevents the trust erosion that happens when a business looks and sounds different everywhere buyers encounter it.',
      status: 'A sharply positioned brand makes a Central Alabama business look established and premium, commanding trust that its size alone would not earn.',
    },
  },
  leadgen: {
    marketDynamics: 'Lead generation in Birmingham runs on trust and follow-up more than raw volume — Jefferson County buyers respond to local credibility, so the systems that win here blend digital capture with the community networks most competitors ignore.',
    demandDriver: 'As referral pipelines prove too unpredictable to plan around, Central Alabama businesses increasingly need a repeatable acquisition engine that produces leads on demand instead of by luck.',
    buyerBehavior: 'Local prospects rarely buy on first contact; they convert after several trust-building touches, so the businesses that follow up patiently win the deals others let go cold.',
    approach: 'We define the exact customer worth pursuing, build a multi-channel capture system, then qualify and nurture every lead so your team spends time only on real prospects.',
    insight: 'In Birmingham, the pipeline usually leaks at follow-up, not at the top; most businesses generate enough leads and simply lose them to silence.',
    value: {
      money: 'Qualification and scoring keep acquisition spend focused on prospects who actually fit, lowering cost per customer instead of cost per lead.',
      time: 'Automated nurture does the patient follow-up local deals require, so your team stops manually chasing leads that take weeks to warm up.',
      risk: 'A multi-channel system means no single platform outage or algorithm change can collapse the whole pipeline overnight.',
      status: 'A visibly organized, responsive intake process signals professionalism to Birmingham buyers comparing you against slower, less structured competitors.',
    },
  },
  funnel: {
    marketDynamics: 'Birmingham deals often move through longer, relationship-driven cycles, so the largest gains here come from disciplined nurture between stages rather than from pouring more prospects into the top.',
    demandDriver: 'As acquisition costs rise, Central Alabama businesses are realizing it is cheaper to convert more of the interest they already generate than to buy more attention.',
    buyerBehavior: 'Local buyers stall when trust or clarity is missing at a specific step, so the fix is almost always a targeted stage, not a bigger audience.',
    approach: 'We map every stage to find exactly where prospects drop, align the offer and message to each step, then automate the nurture that carries Birmingham leads to the close.',
    insight: 'Most Birmingham businesses cannot say where their deals die, which is the real problem — you cannot fix a funnel you have never instrumented.',
    value: {
      money: 'Lifting conversion at existing stages turns traffic you already pay for into more customers, raising revenue without raising acquisition spend.',
      time: 'A documented follow-up playbook keeps deals moving without the owner personally shepherding every one, freeing the founder from the middle of the funnel.',
      risk: 'Stage-by-stage visibility means you catch a stalling funnel early, before a quiet drop in conversion becomes an obvious revenue problem.',
      status: 'A smooth, responsive buying experience makes your Birmingham business feel more professional than competitors whose process depends on memory and luck.',
    },
  },
  techsystems: {
    marketDynamics: 'Many established Birmingham businesses still run on spreadsheets, inboxes, and memory, so a well-implemented CRM and automation stack creates an outsized edge in a Central Alabama market where few competitors have modernized.',
    demandDriver: 'As lean Jefferson County teams hit the ceiling of what manual processes can handle, the pressure to systematize is what pushes owners to finally implement real tools.',
    buyerBehavior: 'Here adoption is everything — a Birmingham team will only trust a system that is simpler than the workaround it replaces, so usability decides success more than features.',
    approach: 'We map the actual workflow before choosing any tool, configure the CRM to your real process, migrate clean data, then drive adoption with hands-on training.',
    insight: 'Software bought before the workflow is mapped just digitizes the chaos; in Birmingham, the win comes from the system people actually use, not the longest feature list.',
    value: {
      money: 'Automation removes the repetitive manual work that quietly consumes payroll hours, so your team\'s time goes to revenue instead of data entry.',
      time: 'Connected systems end the daily hunt across spreadsheets and inboxes, giving a lean Birmingham team back hours every week.',
      risk: 'A single source of truth stops leads and follow-ups from slipping through the cracks that manual, memory-based processes always leave open.',
      status: 'Clean systems and fast, organized responses make even a small Central Alabama business feel enterprise-grade to its customers and partners.',
    },
  },
  aimarketing: {
    marketDynamics: 'For the lean teams that run most Central Alabama businesses, AI is a genuine force-multiplier — it lets a small Birmingham operation produce the marketing volume and targeting precision that used to require a much larger staff.',
    demandDriver: 'Because most Jefferson County competitors have not adopted AI thoughtfully yet, the businesses applying it now open an early, compounding advantage in their local market.',
    buyerBehavior: 'Birmingham buyers still reward authenticity, so AI works here only when it amplifies a real local voice rather than replacing it with generic output.',
    approach: 'We find the highest-return places AI saves time, build human-guided content and targeting workflows, then wire them into your stack with clear governance and review.',
    insight: 'AI applied to a weak plan just makes weak marketing faster; the advantage in Birmingham comes from pairing it with real local strategy and a human editor, not from the tools alone.',
    value: {
      money: 'AI-assisted workflows multiply output per dollar, letting a small Birmingham budget produce the volume and personalization that once required a full team.',
      time: 'Automating the repetitive parts of content and targeting frees your team to focus on the local judgment and relationships AI cannot replace.',
      risk: 'Clear governance and human review keep AI on-brand and accurate, avoiding the generic, error-prone output that erodes Birmingham trust.',
      status: 'Thoughtful early adoption positions your business as a forward-looking Central Alabama operator while competitors are still doing everything by hand.',
    },
  },
  analytics: {
    marketDynamics: 'Many Birmingham businesses still invest in marketing on instinct, so the ones that instrument real attribution gain a decisive edge — they double down on what works while Central Alabama competitors keep guessing.',
    demandDriver: 'As marketing budgets tighten, Jefferson County owners increasingly demand proof of what each channel returns before they will keep funding it.',
    buyerBehavior: 'Internally, Birmingham leaders act on numbers they trust; a clean dashboard changes decisions that a pile of disconnected reports never could.',
    approach: 'We define the metrics that actually predict revenue, wire up end-to-end tracking, then unify everything into one dashboard tied to clear next steps.',
    insight: 'The costliest analytics mistake in Birmingham is measuring vanity metrics well — impressions and likes reported precisely still never tell you which channel produced a customer.',
    value: {
      money: 'Real attribution shows exactly which channels pay off, so budget shifts to what works and stops funding what merely looks busy.',
      time: 'A single automated dashboard ends the manual, monthly scramble of stitching numbers together from separate tools.',
      risk: 'Seeing the full funnel means you spot a declining channel before it quietly drags down revenue for a quarter.',
      status: 'Data-backed decisions signal a disciplined operation to partners, lenders, and investors evaluating a Central Alabama business.',
    },
  },
  reputation: {
    marketDynamics: 'In a trust-driven Central Alabama market, reviews carry outsized weight — a strong, active review profile often decides which Birmingham business a buyer calls first, and word-of-mouth travels both ways fast.',
    demandDriver: 'As buyers increasingly vet local businesses by their star rating before making contact, a thin or dated review profile quietly costs Jefferson County companies customers every week.',
    buyerBehavior: 'Local buyers read recent reviews as a proxy for reliability and notice whether owners respond, treating an unanswered complaint as a warning sign.',
    approach: 'We turn satisfied customers into a steady review stream, respond to and recover from negatives quickly, then deploy that social proof where local buyers actually decide.',
    insight: 'A single ignored negative review in Birmingham does more damage than five positive ones do good, because buyers here read the response as much as the rating.',
    value: {
      money: 'A higher, more active rating measurably lifts the share of local searchers who choose you, turning reputation directly into calls.',
      time: 'A systematic review workflow makes reputation self-sustaining instead of a task the owner has to remember and chase.',
      risk: 'Fast monitoring and response contain problems before they spread through a connected market where word travels quickly.',
      status: 'A visible wall of recent, well-handled reviews positions you as the trusted, established choice in your Birmingham category.',
    },
  },
  funding: {
    marketDynamics: 'Central Alabama capital is concentrated among a handful of Birmingham angel groups, family offices tied to the region\'s banking and insurance base, and UAB-linked healthcare investors, so who you pitch matters as much as the numbers you bring.',
    demandDriver: 'As more Birmingham founders emerge from Innovation Depot and UAB\'s commercialization pipeline, demand is rising for help navigating a regional capital scene that rewards traction over hype.',
    buyerBehavior: 'Birmingham investors reward demonstrated traction and sober unit economics over hockey-stick projections, and they lean heavily on local references and reputation.',
    approach: 'We run readiness first, fix the model and data room, shape a narrative that fits regional investors, then open warm doors into the right Central Alabama capital — in that order.',
    insight: 'Most Birmingham raises are lost in diligence, not in the pitch — the deck opens the door, but the data room and the model are what actually close the round.',
    value: {
      money: 'Raising on the right terms with a defensible model preserves founder equity and prevents the costly down-rounds that follow a rushed, underprepared raise.',
      time: 'A complete data room and a targeted investor list compress a raise that otherwise drags on for months of scattered, unfocused conversations.',
      risk: 'Fixing readiness before outreach protects the finite pool of Birmingham investor relationships you cannot afford to burn on a premature pitch.',
      status: 'Walking into regional investor meetings fully prepared signals a fundable operator and earns the credibility that opens the next introduction.',
    },
  },
  pitchdeck: {
    marketDynamics: 'Central Alabama investors reward clarity and evidence over spectacle, so a Birmingham pitch that leads with traction and sound economics outperforms a flashier coastal-style deck.',
    demandDriver: 'As regional founders compete for a limited pool of local capital, a deck that makes the opportunity obvious in the first minutes has become the price of entry.',
    buyerBehavior: 'Birmingham investors skim for the story, the traction, and the ask; if those are not immediately clear, the deck loses them before the details ever land.',
    approach: 'We build the narrative arc first, frame traction to make momentum undeniable, then design a clean, investor-grade deck with the ask and use of funds up front.',
    insight: 'A great Birmingham deck is not the one with the most slides but the one an investor can retell after a single read — memorability, not density, is what wins the meeting.',
    value: {
      money: 'A deck that frames traction well can shift the valuation conversation, directly affecting the terms of the round.',
      time: 'A tight, well-sequenced narrative shortens the path to a yes, so founders spend fewer weeks in repeated clarifying meetings.',
      risk: 'A clear ask and a diligence-ready appendix prevent the fumbled questions that quietly kill otherwise-strong Birmingham pitches.',
      status: 'An investor-grade deck signals a founder who understands the room, earning the seriousness that regional capital extends to few.',
    },
  },
  investor: {
    marketDynamics: 'For Birmingham companies backed by a tight-knit regional investor community, disciplined communication carries extra weight — Central Alabama capital is relationship-driven, and a founder\'s reputation for clear updates travels quickly.',
    demandDriver: 'As regional portfolios mature, investors increasingly expect the steady, professional reporting that signals a company worth their next check.',
    buyerBehavior: 'Local investors read consistency as competence; a founder who reports reliably, in good news and bad, earns latitude that a silent one never does.',
    approach: 'We set a reporting cadence, build clear update and board templates, then keep the KPI dashboard and cap table clean so every raise and review runs smoothly.',
    insight: 'The fastest way to lose a Birmingham investor\'s confidence is to go quiet between rounds; steady, honest reporting is what actually earns the follow-on.',
    value: {
      money: 'Confident, well-informed investors are far more likely to fund the next round, lowering the cost and friction of future capital.',
      time: 'Reusable templates and a live dashboard turn board prep from a quarterly scramble into a routine that runs itself.',
      risk: 'Continuous reporting means hard news is never a surprise, protecting the trust that a single blindsided board meeting can destroy.',
      status: 'A reputation for clear communication travels through Birmingham\'s connected investor community and shapes your access to future capital.',
    },
  },
  franchisegrowth: {
    marketDynamics: 'Birmingham expansion runs along specific commercial corridors like Highway 280 and I-459 and a Shelby County suburban growth pattern, so timing and site selection here depend on genuinely local market intelligence, not a national playbook.',
    demandDriver: 'As Central Alabama\'s suburbs and corridors keep developing, established operators face real windows to add territory — but only those ready operationally can seize them profitably.',
    buyerBehavior: 'This market rewards patient, community-connected growth over aggressive capture, so locations that build local trust before scaling outperform those that expand on ambition alone.',
    approach: 'We assess whether operations and unit economics can support new units, map territory with local data, then sequence expansion so each location opens cleaner than the last.',
    insight: 'Most failed Birmingham expansions were operationally doomed before opening day — the model could not support a second location, and no amount of marketing fixes that.',
    value: {
      money: 'Sequencing expansion against proven unit economics ensures new capital amplifies a profitable model instead of multiplying a hidden loss.',
      time: 'Repeatable operational playbooks let each new Jefferson County unit open and ramp faster than the improvised launch before it.',
      risk: 'A readiness assessment catches the staffing and cash-flow breakpoints that collapse businesses trying to grow before they are ready.',
      status: 'Disciplined, well-run expansion builds the track record that earns lender and franchisor confidence for the next stage of growth.',
    },
  },
  localfranchise: {
    marketDynamics: 'Birmingham buyers choose by neighborhood and community connection, so multi-unit marketing here has to win at the Vestavia Hills or Trussville store level, not just at the brand level.',
    demandDriver: 'As demand varies sharply across Jefferson and Shelby County trade areas, operators increasingly need location-level marketing rather than the one-size corporate campaigns that leave individual stores starved.',
    buyerBehavior: 'Local customers respond to the nearest, most visible location and to community presence, treating each store as a neighborhood business regardless of the brand behind it.',
    approach: 'We assess demand around each location, rank every unit locally, then allocate budget by real store-level signals and launch new sites with a grand-opening playbook.',
    insight: 'Splitting a franchise budget evenly across Birmingham locations feels fair but quietly starves your strongest unit and props up your weakest — demand, not equality, should set the split.',
    value: {
      money: 'Allocating budget by real local demand puts every marketing dollar where it produces the most store-level traffic instead of averaging it away.',
      time: 'A repeatable grand-opening playbook gets each new Central Alabama location to profitability faster than a one-off launch.',
      risk: 'On-brand local execution keeps store-level marketing consistent, protecting the brand while still winning each neighborhood.',
      status: 'Strong, visible presence in each Birmingham community positions every unit as the local option rather than a distant chain outpost.',
    },
  },
  operations: {
    marketDynamics: 'Birmingham\'s economy skews toward established, service-heavy, owner-operated businesses in healthcare, construction, and professional services, where margins are made or lost inside operations far more than in the market.',
    demandDriver: 'As labor costs rise and lean Jefferson County teams stretch thin, owners increasingly turn to operational fixes for the fastest available return on their money.',
    buyerBehavior: 'Owners here feel the symptoms — rework, missed jobs, thin margins — long before they can name the cause, so the value is in the diagnosis as much as the fix.',
    approach: 'We map how work actually flows, pinpoint the bottlenecks and margin leaks, document repeatable procedures, then build the dashboards that let you manage on data.',
    insight: 'For most established Birmingham businesses, the lost revenue is hiding inside operations, not the market — and closing those leaks usually pays back faster than any new marketing spend.',
    value: {
      money: 'Closing the pricing and process leaks buried in operations recovers margin that no amount of additional sales volume would have produced.',
      time: 'Documented procedures and streamlined workflows give owners back the hours currently spent firefighting the same recurring problems.',
      risk: 'Standard operating procedures make quality independent of who is working, protecting the business from the chaos of key-person dependence.',
      status: 'A visibly well-run operation earns the confidence of the lenders, partners, and large customers that Central Alabama businesses depend on.',
    },
  },
  advisory: {
    marketDynamics: 'Birmingham founders and owners often lack a peer network of experienced operators, so an advisor who genuinely knows the Central Alabama market — its capital, talent, and buyer behavior — fills a gap the local ecosystem leaves open.',
    demandDriver: 'As owners hit decisions bigger than any they have faced before, demand rises for a seasoned outside perspective that national coaches without local context cannot provide.',
    buyerBehavior: 'Here trust is personal and relationship-based, so owners open up to an advisor plugged into local institutions far faster than to a distant, credentialed stranger.',
    approach: 'We meet regularly as a strategic sounding board, bring market data to your biggest calls, hold you accountable to milestones, and open doors into Birmingham institutions.',
    insight: 'The most expensive decisions Birmingham owners make are the ones they make alone at speed; an experienced local advisor is cheap insurance against a costly, avoidable misstep.',
    value: {
      money: 'One well-timed piece of advice on a major hiring, pricing, or expansion decision can save or make more than the entire engagement costs.',
      time: 'A trusted sounding board shortens the deliberation on hard calls, so owners decide with confidence instead of circling for weeks.',
      risk: 'An objective outside perspective catches the blind spots and warning signs that founders inside the business consistently miss.',
      status: 'Working with a respected Central Alabama advisor opens doors — to partners, capital, and talent — that a solo owner rarely reaches.',
    },
  },
  growth: {
    marketDynamics: 'Scaling a Birmingham business means navigating a smaller talent pool than coastal metros and a Central Alabama capital environment that rewards proven unit economics, so disciplined, sequenced growth beats growth-at-all-costs here.',
    demandDriver: 'As more Jefferson County companies reach the post-traction stage, demand grows for scaling support that fits this market\'s talent and capital realities rather than a Silicon Valley playbook.',
    buyerBehavior: 'Local customers scale with businesses they trust to keep delivering, so growth that outruns service quality quietly reverses in a connected market like Birmingham.',
    approach: 'We diagnose whether operations and unit economics can support scale, fix the leaks first, then build repeatable acquisition and the org structure to grow without breaking.',
    insight: 'Early traction fools Birmingham founders into scaling a model that was never built for volume; growth amplifies whatever is already there, including the cracks.',
    value: {
      money: 'Fixing unit economics before scaling ensures growth capital multiplies profit rather than accelerating a loss you cannot yet see.',
      time: 'Repeatable acquisition systems move growth off the founder\'s personal effort, so the business scales without the owner as the bottleneck.',
      risk: 'A readiness diagnosis prevents the operational collapse that hits promising Birmingham companies that mistake early traction for scalability.',
      status: 'Disciplined, well-documented scaling builds the metrics credibility that regional investors and partners look for before backing the next stage.',
    },
  },
  startup: {
    marketDynamics: 'Birmingham\'s startup ecosystem runs through Innovation Depot, UAB\'s commercialization pipeline, and founders who build real businesses without coastal venture backing, so a go-to-market plan here is built for traction and community, not a blitz-scale narrative.',
    demandDriver: 'As the Central Alabama founder community grows faster than its formal support, demand rises for guidance that connects early-stage businesses to local resources and market reality.',
    buyerBehavior: 'Birmingham customers reward trust and community connection over aggressive marketing, so early traction here is earned through proof and relationships, not spend.',
    approach: 'We stress-test the model against local cost and demand, validate with real Jefferson County prospects, then build a lean go-to-market and plug founders into the ecosystem.',
    insight: 'The Birmingham startups that stall usually built against national assumptions the local market never shared; validating here first is cheaper than discovering the mismatch at launch.',
    value: {
      money: 'Validating demand before building keeps scarce early runway from funding a product or a market that was never really there.',
      time: 'A local go-to-market plan skips the months of trial and error founders lose guessing at how the Birmingham market behaves.',
      risk: 'Grounding the plan in Central Alabama reality avoids the pricing and positioning mistakes that quietly sink first-time founders here.',
      status: 'A structured, validated launch and ecosystem ties give a young company the credibility that opens local customers, partners, and capital.',
    },
  },
  bizdev: {
    marketDynamics: 'Business development in Birmingham is relationship-driven and runs through specific community networks, so the partnerships worth building here require local knowledge and credible, structured outreach rather than high-volume cold approaches.',
    demandDriver: 'As Central Alabama\'s sectors grow more interconnected, businesses with strong service capabilities increasingly need help converting local relationships into consistent new revenue.',
    buyerBehavior: 'Local partners and buyers move on trust and referral, so a warm, credible introduction outperforms even the most polished cold pitch in this market.',
    approach: 'We identify the partnerships worth pursuing, activate the right Birmingham networks, then run a documented pipeline with follow-up discipline through to signed agreements.',
    insight: 'Most Birmingham businesses confuse networking with development — they accumulate relationships without the pipeline and follow-up that turn them into revenue.',
    value: {
      money: 'Concentrating on the highest-fit partnerships channels effort into the relationships most likely to close, raising return on every hour of outreach.',
      time: 'A structured pipeline and cadence replace scattered networking, so business development stops depending on the owner\'s spare evenings.',
      risk: 'Disciplined follow-up keeps warm Jefferson County relationships from going cold, protecting the deals that unstructured effort lets slip.',
      status: 'Consistent, credible outreach builds a reputation that attracts inbound partnership interest across Birmingham\'s connected business community.',
    },
  },
  smallbiz: {
    marketDynamics: 'Birmingham small businesses compete against larger regional brands for the same Jefferson County customers, so the winning strategy concentrates a limited budget on local trust and the highest-return moves rather than trying to do everything.',
    demandDriver: 'As larger competitors professionalize their marketing, Central Alabama small businesses increasingly need affordable, focused help to keep pace without an in-house team.',
    buyerBehavior: 'Local customers value community, consistency, and a familiar face, so a small business that shows up reliably can out-position a bigger, more distant competitor.',
    approach: 'We assess the whole business, concentrate a limited budget on the few highest-ROI moves, and pair affordable local marketing with the operational fixes that protect margin.',
    insight: 'The most common small-business mistake in Birmingham is doing a little of everything; a focused budget on two moves that fit this market beats a thin spread across ten.',
    value: {
      money: 'Concentrating limited budget on the highest-return moves stretches every dollar further than the scattered spending that drains small businesses.',
      time: 'Outside help on marketing and strategy frees an owner-operator from wearing every hat and doing each one halfway.',
      risk: 'A steady, sustainable plan smooths the boom-and-bust revenue cycles that start-stop marketing creates for small Birmingham businesses.',
      status: 'A consistent local presence and clear differentiation let a small business compete with larger brands on trust rather than price.',
    },
  },
  entrepreneur: {
    marketDynamics: 'Birmingham entrepreneurs build inside a market that rewards community connection and realistic growth over the move-fast approach of coastal cities, and it offers real resources — Innovation Depot, SCORE Birmingham, the Birmingham Business Alliance — for those who plug in early.',
    demandDriver: 'As more Central Alabama professionals leave corporate roles to start businesses, demand grows for structured guidance that turns a vision into an operating company.',
    buyerBehavior: 'Local customers back founders they know and trust, so an entrepreneur\'s early traction here is built on relationships and reputation as much as on the product.',
    approach: 'We turn the vision into a concrete plan grounded in local reality, set up lightweight operations, build the brand, then mentor through the first stage of growth.',
    insight: 'A vision that lives only in the founder\'s head cannot be executed or funded; the first real step in Birmingham is turning it into a plan the market can respond to.',
    value: {
      money: 'A grounded plan keeps early capital from funding assumptions the Birmingham market would never have supported.',
      time: 'Lightweight systems from day one prevent the early chaos that stalls first-time founders and costs months to untangle.',
      risk: 'Validating against Central Alabama reality avoids the costly pricing and positioning mistakes solo founders repeat.',
      status: 'A clear brand and a structured plan make a new venture credible to the customers, partners, and lenders it needs early.',
    },
  },
  marketing: {
    marketDynamics: 'Marketing in Birmingham works best as one coordinated engine tuned to a trust-driven Central Alabama market, where consistent local presence and follow-up outperform scattered tactics or pure ad volume.',
    demandDriver: 'As buyers spread across more channels, Jefferson County businesses increasingly need marketing that works as a connected system rather than a set of disconnected one-off efforts.',
    buyerBehavior: 'Local buyers weigh community credibility heavily and move across several touchpoints before acting, so brand and demand have to be built together here.',
    approach: 'We align brand, search, paid, social, and content into one system, tie every channel to attribution, then optimize the whole engine toward booked customers.',
    insight: 'Most Birmingham marketing underperforms not for lack of effort but for lack of coordination — disconnected tactics never compound into a reliable flow of customers.',
    value: {
      money: 'A coordinated engine with real attribution moves budget toward what works, ending the waste of channels no one can tie to revenue.',
      time: 'One integrated system replaces the churn of managing disconnected vendors and tactics that never quite add up.',
      risk: 'Building brand and demand together protects you from over-reliance on any single channel or short-term tactic.',
      status: 'Consistent, professional presence across every Birmingham touchpoint positions you as an established leader rather than an occasional advertiser.',
    },
  },
  consulting: {
    marketDynamics: 'Birmingham business owners are frequently underserved by national firms with credentials but no Central Alabama market knowledge, so consulting that combines genuine local intelligence with implementation support fills a real gap in this metro.',
    demandDriver: 'As Jefferson County businesses reach the growth stage where outside perspective pays off, demand rises for advisors who deliver results here rather than generic frameworks.',
    buyerBehavior: 'Owners here value practical, implementable advice from someone who knows the local market, and they distrust strategy that arrives without a path to execution.',
    approach: 'We assess the business against its real market, build a prioritized plan, then stay engaged through implementation so strategy becomes operational results.',
    insight: 'A strategy deck that gathers dust is the most common consulting failure in Birmingham; the value is not the plan but the change it drives when someone stays to execute it.',
    value: {
      money: 'Identifying the few highest-leverage moves focuses investment where it produces measurable return instead of spreading effort thin.',
      time: 'An experienced outside partner handles the market analysis and planning that would otherwise pull the owner off the business for weeks.',
      risk: 'Objective assessment surfaces the operational and strategic blind spots that owners inside the business consistently overlook.',
      status: 'A recognized local consulting relationship lends the strategic credibility that owner-operated Central Alabama businesses often struggle to project alone.',
    },
  },
};

for (const key of Object.keys(PACKS)) {
  Object.assign(PACKS[key], PACK_DEPTH[key] ?? {});
}

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
  [/lead-generation|customer-acquisition|franchisee-acquisition|recruitment-marketing|development-marketing|deal-flow/, 'leadgen'],
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
  for (const [re, key] of topicRules) {
    if (re.test(text)) return key;
  }
  return 'consulting';
}

// --- Category profiles (audience / role) ------------------------------------

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

// --- CLI + IO ---------------------------------------------------------------

function getArgValue(name) {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}
function hasArg(name) {
  return process.argv.includes(`--${name}`);
}
async function readText(relativePath) {
  return fs.readFile(path.join(rootDir, relativePath), 'utf8');
}
async function loadServices() {
  const raw = await readText('lib/franchise-keywords.ts');
  const servicePattern = /slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*description:\s*"([^"]+)"/g;
  const services = [];
  let match;
  while ((match = servicePattern.exec(raw))) {
    services.push({ slug: match[1], title: match[2], category: match[3], description: match[4] });
  }
  return services;
}
async function loadExistingContent(outputPath) {
  try {
    return JSON.parse(await fs.readFile(outputPath, 'utf8'));
  } catch {
    return {};
  }
}
function titleCase(value) {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

// Lowercase a service title for mid-sentence use, but keep known acronyms
// uppercase so "Franchise Local SEO Services" reads as "franchise local SEO
// services", not "... seo ...".
const ACRONYMS = ['SEO', 'PPC', 'CRM', 'AI', 'ROI', 'B2B'];
function serviceLower(title) {
  let s = title.toLowerCase();
  for (const a of ACRONYMS) s = s.replace(new RegExp(`\\b${a.toLowerCase()}\\b`, 'g'), a);
  return s;
}

// --- Seeded RNG -------------------------------------------------------------

function hashString(str) {
  let h1 = 0xdeadbeef ^ 0;
  let h2 = 0x41c6ce57 ^ 0;
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
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function createRng(key) {
  return mulberry32(Number(hashString(key) % 2 ** 31));
}
function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}
function pickN(rng, arr, n) {
  const copy = arr.slice();
  const out = [];
  for (let i = 0; i < n && copy.length > 0; i++) out.push(copy.splice(Math.floor(rng() * copy.length), 1)[0]);
  return out;
}

// --- Anchor selection -------------------------------------------------------

function candidatesFor(text) {
  if (/(fund|capital|investor|venture|raise|pitch|relations|advisor|advisory)/.test(text)) {
    return [
      { institution: 'Innovation Depot', industry: 'healthcare and biotech' },
      { institution: 'UAB (University of Alabama at Birmingham)', industry: 'healthcare and biotech' },
      { institution: 'the Birmingham Business Alliance', industry: 'banking and financial services' },
    ];
  }
  if (/(seo|digital|website|crm|automation|ai|tech|data|content|social|google|software)/.test(text)) {
    return [
      { institution: 'UAB (University of Alabama at Birmingham)', industry: 'advanced manufacturing' },
      { institution: 'Innovation Depot', industry: 'advanced manufacturing' },
      { institution: 'Innovation Depot', industry: 'healthcare and biotech' },
    ];
  }
  if (/(operation|process|system|efficien|supply|location|territory|scale|scaling|develop|growth)/.test(text)) {
    return [
      { institution: 'the Birmingham Business Alliance', industry: 'logistics' },
      { institution: 'SCORE Birmingham', industry: 'logistics' },
      { institution: 'the Birmingham Business Alliance', industry: 'advanced manufacturing' },
    ];
  }
  if (/(small|entrepreneur|mentor|owner|coaching|marketing|brand)/.test(text)) {
    return [
      { institution: 'SCORE Birmingham', industry: 'banking and financial services' },
      { institution: 'the Birmingham Business Alliance', industry: 'banking and financial services' },
    ];
  }
  const all = [];
  for (const institution of institutions) for (const industry of anchorIndustries) all.push({ institution, industry });
  return all;
}
function selectAnchor(service, rng) {
  return pick(rng, candidatesFor(`${service.slug} ${service.title} ${service.category}`.toLowerCase()));
}
function profileFor(service) {
  return categoryProfiles[service.category] ?? categoryProfiles.consulting;
}
function industryShort(industry) {
  return industry.replace('banking and financial services', 'financial services');
}

// --- Context ----------------------------------------------------------------

function buildCtx(service, profile, anchor, pack, rng) {
  const pickedSuburbs = pickN(rng, suburbs, 2);
  return {
    service, profile, anchor, pack, rng,
    svc: service.title,
    svcLower: serviceLower(service.title),
    disc: pack.discipline,
    outcome: pack.outcome,
    readerGoal: pack.readerGoal,
    inst: anchor.institution,
    ind: anchor.industry,
    indShort: industryShort(anchor.industry),
    indTitle: titleCase(industryShort(anchor.industry)),
    audience: profile.audience,
    audienceTitle: profile.audienceTitle,
    role: profile.role,
    county: BIRMINGHAM.county,
    secondaryCounty: BIRMINGHAM.secondaryCounty,
    counties: BIRMINGHAM.counties,
    countyTrade: BIRMINGHAM.countyTrade,
    metro: BIRMINGHAM.metro,
    metroShort: BIRMINGHAM.metroShort,
    marketRegion: BIRMINGHAM.marketRegion,
    cityState: BIRMINGHAM.cityState,
    suburb: pickedSuburbs[0],
    suburb2: pickedSuburbs[1],
    corridor: pick(rng, corridors),
    talent: TALENT_PIPELINE,
    problem0: pack.problems[0],
    problemLow0: lowerFirst(pack.problems[0]),
    problemLow1: lowerFirst(pack.problems[1]),
    problemLow2: lowerFirst(pack.problems[2]),
    localAngle: pick(rng, pack.localAngle),
    localAngle2: pack.localAngle[pack.localAngle.length - 1],
    term0: pack.terms[0],
    term1: pack.terms[1] ?? pack.terms[0],
    term2: pack.terms[2] ?? pack.terms[0],
    // Depth dimensions — each has one section home (see PACK_DEPTH comment).
    marketDynamics: pack.marketDynamics,
    demandDriver: pack.demandDriver,
    buyerBehavior: pack.buyerBehavior,
    buyerBehaviorLow: lowerFirst(pack.buyerBehavior),
    approach: pack.approach,
    approachLow: lowerFirst(pack.approach),
    insight: pack.insight,
    value: pack.value,
    // Deliverable shortcuts (titles for weaving into copy).
    deliv0Title: pack.deliverables[0].title,
    deliv1Title: pack.deliverables[1].title,
    deliv2Title: pack.deliverables[2].title,
    delivLastTitle: pack.deliverables[pack.deliverables.length - 1].title,
  };
}

function lowerFirst(s) {
  return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}

function aOrAn(word) {
  return /^[aeiou]/i.test(word) ? 'an' : 'a';
}

// ===========================================================================
// SECTION MAKERS (problem-first, deliverable-driven, service-specific)
// ===========================================================================

// Hero -----------------------------------------------------------------------
const heroHeadlineVariants = [
  (c) => `${c.svc} in Birmingham, Alabama`,
  (c) => `${c.svc} for ${c.audienceTitle} in Birmingham, Alabama`,
  (c) => `Trusted ${c.svc} in Birmingham, Alabama`,
  (c) => `${c.svc} Built for Birmingham, Alabama`,
];
const heroSubtextVariants = [
  (c) => `For Birmingham ${c.audience} focused on ${c.readerGoal}, Iconic Brand Group delivers ${c.svcLower} that produces ${c.outcome} — built around how the ${c.metroShort} economy and its buyers actually behave, not a national template.`,
  (c) => `Iconic Brand Group is the ${c.marketRegion} team ${c.audience} turn to for ${c.svcLower}. We pair genuine ${c.disc} expertise with real local market knowledge to move you toward ${c.outcome}.`,
  (c) => `${c.svc} should do one thing: deliver ${c.outcome}. That is what we build for ${c.county} ${c.audience} — hands-on ${c.disc} shaped by the specific dynamics of the Birmingham market.`,
];
const trustBadgeSlots = [
  [
    (c) => `${c.svc} Serving Birmingham's ${c.audienceTitle} Community`,
    (c) => `${c.svc} for Jefferson and Shelby County Businesses`,
    (c) => `${c.svc} Serving the ${c.metroShort}`,
  ],
  [
    (c) => `Real Deliverables, Not Generic ${titleCase(c.disc)} Advice`,
    (c) => `${titleCase(c.disc)} Rooted in ${c.marketRegion} Market Reality`,
    (c) => `Focused on the Problems ${c.audienceTitle} Actually Face`,
  ],
  [
    (c) => `Grounded in Real Birmingham Market Insight`,
    (c) => `Connected to ${c.inst}`,
    (c) => `Built to Deliver ${titleCase(c.outcome)}`,
  ],
];

// TL;DR + overview -----------------------------------------------------------
const tldrVariants = [
  (c) => `${c.svc} in Birmingham, Alabama: Iconic Brand Group gives ${c.marketRegion} ${c.audience} a clear path to ${c.outcome}, from ${c.deliv0Title.toLowerCase()} through ${c.deliv1Title.toLowerCase()}. Call (813) 263-6762 for a free consultation.`,
  (c) => `${c.svc} in Birmingham, Alabama: hands-on ${c.disc} for ${c.county} ${c.audience} — real deliverables, deep local market knowledge, and accountability to ${c.outcome}. Call (813) 263-6762 to start.`,
];
// Overview secondary paragraph = HOW BIRMINGHAM BUYERS DECIDE (buyerBehavior).
const overviewSecondaryVariants = [
  (c) => `It helps to know how buyers here actually decide: ${c.buyerBehaviorLow} We build that into every recommendation, so the work fits the way ${c.county} customers respond rather than how a national playbook assumes they will.`,
  (c) => `${c.buyerBehavior} Understanding that is half the job — our ${c.disc} is shaped around it, because in ${c.marketRegion} how you are evaluated often matters more than how loudly you market.`,
];

// Why Different (6 cards, problem + deliverable + local + expertise) ----------
// A rotating "how we engage" differentiator (card 4) — distinct from the other
// five cards so nothing repeats.
const whyDiffAltCards = [
  (c) => ({ title: 'Senior-Led, No Handoffs', description: `The people who scope your ${c.disc} are the people who execute it. Birmingham engagements stay with experienced hands from kickoff to results, never passed down to junior staff after the sale.` }),
  (c) => ({ title: 'Engagements Sized for Birmingham', description: `We structure ${c.disc} for the real budgets and stage of ${c.marketRegion} businesses, not the enterprise minimums national firms impose — senior work scoped to what actually fits ${c.county}.` }),
  (c) => ({ title: 'We Deliver, Then Stay', description: `Plenty of firms hand over a ${c.disc} plan and vanish. We produce the work and stay through implementation across ${c.county}, because a strategy nobody executes changes nothing.` }),
];

// Six cards, each doing a DIFFERENT job: method, deliverables, local ecosystem,
// engagement model, discipline expertise, accountability. No shared concept.
function makeWhyDifferent(c) {
  const [d0, d1] = pickN(c.rng, c.pack.deliverables, 2);
  return [
    {
      title: 'How We Actually Work',
      description: `${c.approach}`,
    },
    {
      title: 'Real Deliverables, Not Slide Decks',
      description: `You leave with concrete work — ${d0.title.toLowerCase()} and ${d1.title.toLowerCase()} among them — and we stay engaged through implementation across ${c.county} rather than handing over a document and disappearing.`,
    },
    {
      title: `Wired Into ${c.inst}`,
      description: `${c.inst}, the Birmingham Business Alliance, and UAB's programs are resources most competitors underuse. We connect your ${c.disc} into that ${c.county} network, so the work builds local credibility and referrals, not just output.`,
    },
    pick(c.rng, whyDiffAltCards)(c),
    {
      title: `Genuine ${titleCase(c.disc)} Expertise`,
      description: `We work fluently in ${c.term0}, ${c.term1}, and ${c.term2} — the craft of ${c.disc} — and apply it to the ${c.indShort} realities of the ${c.metroShort} instead of a template borrowed from another market.`,
    },
    {
      title: 'Accountable to the Result',
      description: `Everything is measured against the outcome you came for: ${c.outcome}. Clear milestones and honest reporting keep the work moving when your daily operations get loud.`,
    },
  ];
}

// Value pillars — each a DISTINCT service-specific lever (money/time/risk/status).
const valuePillarVariants = {
  money: [(c) => c.value.money],
  time: [(c) => c.value.time],
  risk: [(c) => c.value.risk],
  status: [(c) => c.value.status],
};

// Trusted partner ------------------------------------------------------------
const trustedPartnerHeadingVariants = [
  (c) => `${c.svc} Built to Solve Real Problems in Birmingham, Alabama`,
  (c) => `${c.svc} Built Around ${c.marketRegion} Business Realities`,
  (c) => `A ${c.svc} Partner Built for Birmingham, Alabama`,
];
// Overview body = HOW THE BIRMINGHAM ECONOMY SHAPES THIS SERVICE (marketDynamics).
const trustedPartnerBodyVariants = [
  (c) => `${c.marketDynamics} That local reality is where Iconic Brand Group starts every ${c.disc} engagement — reading how the ${c.indShort} economy, ${c.inst}, and Birmingham buyers shape demand, then turning that read into work you can act on rather than a plan that never ships.`,
  (c) => `${c.marketDynamics} We build ${c.disc} to fit that landscape instead of fighting it, which is why ${c.county} ${c.audience} get a plan matched to how the ${c.metroShort} actually moves — anchored by the ${c.talent} talent pipeline and a base of Regions- and Protective Life-anchored employers.`,
];
const testimonialQuoteVariants = [
  (c) => `We had tried the generic, out-of-market route before and it never fit how Birmingham works. Iconic Brand Group actually understood ${c.disc} and our ${c.indShort} market, delivered real work instead of a deck, and it finally moved the numbers.`,
  (c) => `They diagnosed exactly what was holding us back and rebuilt our ${c.disc} around how customers in ${c.suburb} actually behave. Within two quarters we were seeing ${c.outcome}.`,
];
const firstNames = ['Tanya', 'Marcus', 'Carla', 'Devon', 'Patricia', 'Rashida', 'Gerald', 'Aaron', 'Nadia', 'Caleb', 'Elliot', 'Priya', 'Maya', 'Julian', 'Serena', 'Damon', 'Leah', 'Victor', 'Camille', 'Owen', 'Bianca', 'Malcolm', 'Elena', 'Preston', 'Kendra', 'Adrian', 'Simone', 'Wesley', 'Marisol', 'Trevor', 'Jasmine', 'Bryce', 'Noelle', 'Isaiah', 'Renee', 'Dominic', 'Chantelle', 'Andre', 'Sabrina', 'Xavier'];
const lastNames = ['Osei', 'Webb', 'Hutchinson', 'Ashford', 'Stanhope', 'Bynum', 'Simmons', 'Whitlock', 'Bennett', 'Coleman', 'Rivers', 'Ellis', 'Monroe', 'Hale', 'Gaines', 'Foster', 'Langford', 'Sutton', 'Whitaker', 'Bradford', 'Manning', 'Hughes', 'Carver', 'Lawson', 'Sterling', 'Hayes', 'Davenport', 'Mercer', 'Warren', 'Hampton', 'Vaughn', 'Sinclair', 'Holloway', 'Clayton', 'Banks', 'Whitfield', 'Prentiss', 'Kearney', 'Nash', 'Rutledge'];

function makeTrustedPartner(c) {
  const quickFacts = [
    `Deliverables you can point to: ${c.deliv0Title.toLowerCase()}, ${c.deliv1Title.toLowerCase()}, and more`,
    `${titleCase(c.disc)} fluency: ${c.term0}, ${c.term1}, ${c.term2}`,
    `Deep ${c.indShort} market knowledge across ${c.counties}`,
    `Wired into ${c.inst} and Birmingham business networks`,
    `Every engagement measured against ${c.outcome}`,
  ];
  return {
    heading: pick(c.rng, trustedPartnerHeadingVariants)(c),
    body80Words: pick(c.rng, trustedPartnerBodyVariants)(c),
    testimonial: {
      quote: pick(c.rng, testimonialQuoteVariants)(c),
      name: `${pick(c.rng, firstNames)} ${pick(c.rng, lastNames)}`,
      role: `${c.role}, ${pick(c.rng, companyTypes)}, ${c.suburb}, Alabama`,
      industry: c.indTitle,
    },
    fiveQuickFacts: quickFacts,
  };
}

// Definition -----------------------------------------------------------------
// Definition = WHAT THE SERVICE IS + WHAT IT COMBINES (teaching the reader).
// Distinct from the "how we work" card, which owns the method.
const definitionTextVariants = [
  (c) => `${c.svc} is the discipline of ${c.readerGoal}. For ${c.marketRegion} businesses, it combines ${c.deliv0Title.toLowerCase()}, ${c.deliv1Title.toLowerCase()}, and the fundamentals of ${c.term0} into one program aimed at ${c.outcome} — defined by deliverables, not advice on a slide.`,
  (c) => `For Birmingham businesses, ${c.svcLower} is the practice of turning ${c.disc} into measurable results: a hands-on engagement spanning ${c.deliv0Title.toLowerCase()} through ${c.delivLastTitle.toLowerCase()}, built for how the ${c.metroShort} actually operates.`,
];
function makeDefinition(c) {
  return {
    term: c.svc,
    definition: pick(c.rng, definitionTextVariants)(c),
    keyComponents: c.pack.deliverables.slice(0, 5).map((d) => d.title),
  };
}

// Expert quote ---------------------------------------------------------------
const expertTitlePools = ['Birmingham ' , 'Central Alabama ', 'Regional '];
// Expert quote = A NON-OBVIOUS POV about this service (insight).
const expertQuoteVariants = [
  (c) => `${c.insight}`,
  (c) => `${c.insight} That is the lens we bring to every ${c.disc} engagement in the ${c.metroShort}.`,
];
function makeExpertQuote(c) {
  return {
    quote: pick(c.rng, expertQuoteVariants)(c),
    name: `${pick(c.rng, firstNames)} ${pick(c.rng, lastNames)}`,
    title: `${pick(c.rng, expertTitlePools)}${titleCase(c.disc)} Advisor`,
    context: `On ${c.disc} in the ${c.metro}`,
  };
}

// Market data ----------------------------------------------------------------
function makeMarketData(c) {
  return { ...BIRMINGHAM_MARKET_DATA, primaryIndustryFocus: c.indTitle };
}

// Market analysis (how the local market shapes demand for THIS service) ------
const marketHeadingVariants = [
  (c) => `The ${c.svc} Market in Birmingham, Alabama`,
  (c) => `${c.svc} Across the ${c.metroShort}`,
  (c) => `Birmingham ${c.svc} Landscape`,
];
// Market analysis body = WHAT IS CHANGING LOCALLY that drives demand (demandDriver).
const marketBodyVariants = [
  (c) => `${c.demandDriver} It is a shift Iconic Brand Group sees firsthand across the ${c.metro}, and it is reshaping what ${c.disc} has to deliver for ${c.county} ${c.audience}.`,
  (c) => `${c.demandDriver} For ${c.audience} weighing ${c.svcLower}, that trend is the reason local, market-aware execution now outperforms the imported national approach.`,
];
const marketClassificationVariants = [
  (c) => `Tier 2 Regional Metro with Growing ${titleCase(c.disc)} Demand`,
  (c) => `Underserved ${titleCase(c.disc)} Market in ${c.marketRegion}`,
  (c) => `${c.marketRegion} Metro Anchored in ${c.indTitle}`,
];
function makeMarketAnalysis(c) {
  return {
    heading: pick(c.rng, marketHeadingVariants)(c),
    body40Words: pick(c.rng, marketBodyVariants)(c),
    bullets: {
      marketOpportunity: `Few Central Alabama providers do ${c.disc} well, so the ${c.counties} market leaves real room for ${c.audience} who pair genuine ${c.indShort} knowledge with deliverables like ${c.deliv0Title.toLowerCase()} — an opening for the businesses that move first.`,
      keyChallenge: `The trap is treating ${c.disc} as a commodity. ${c.audienceTitle} who buy a generic package — or a playbook built for another metro — spend real money before discovering it never fit the ${c.metroShort}, and by then the budget is gone.`,
      ourStrategy: `We localize the entire engagement to ${c.county} — ${c.deliv1Title.toLowerCase()} and ${c.delivLastTitle.toLowerCase()} tuned to conditions here — and stay hands-on through execution so ${c.outcome} actually lands.`,
    },
    snapshot: {
      marketRegion: BIRMINGHAM.marketRegion,
      metroArea: BIRMINGHAM.metro,
      marketClassification: pick(c.rng, marketClassificationVariants)(c),
      state: BIRMINGHAM.state,
    },
  };
}

// Services = the pack's real deliverables ------------------------------------
const servicesHeadingVariants = [
  (c) => `What Our ${c.svc} Delivers in Birmingham, Alabama`,
  (c) => `${c.svc} Deliverables for Businesses in Birmingham, Alabama`,
  (c) => `Our ${c.svc} Services in Birmingham, Alabama`,
];
const servicesSubtextVariants = [
  (c) => `Concrete ${c.disc} deliverables built to solve ${c.problemLow0.replace(/^./, (m) => m.toLowerCase())} and produce ${c.outcome} across the ${c.metro}.`,
  (c) => `No vague retainers — here is the actual ${c.disc} work we do for ${c.county} ${c.audience}.`,
];
function makeServices(c) {
  return {
    heading: pick(c.rng, servicesHeadingVariants)(c),
    subtext: pick(c.rng, servicesSubtextVariants)(c),
    items: c.pack.deliverables.map((d) => ({ title: d.title, description: d.desc, icon: d.icon })),
  };
}

// Industries + pain points (pain points = the pack's problems) ---------------
const industriesHeadingVariants = [
  () => `Industries We Serve in Birmingham, Alabama`,
  () => `Industries Driving Business in Birmingham, Alabama`,
  (c) => `Where Our ${c.svc} Work Lands in Birmingham, Alabama`,
];
// Industries intro = HOW THE SERVICE APPLIES DIFFERENTLY ACROSS SECTORS.
const industriesIntroVariants = [
  (c) => `${c.disc} looks different across Birmingham's core sectors — healthcare, financial services, manufacturing, logistics, professional services, and construction each buy and evaluate it their own way. We adapt the workflow to your industry, with the deepest bench in ${c.indShort}.`,
  (c) => `The way ${c.disc} succeeds shifts by industry: what wins a ${c.indShort} client in the ${c.metroShort} differs from what moves a construction or professional-services buyer. We tailor the work to the sector you compete in.`,
];
function makeIndustries(c) {
  return {
    heading: pick(c.rng, industriesHeadingVariants)(c),
    intro: pick(c.rng, industriesIntroVariants)(c),
    tags: sectorTags,
    painPoints: c.pack.problems.slice(0, 3),
  };
}

// Common mistakes = the pack's service-specific mistakes ---------------------
const mistakesHeadingVariants = [
  (c) => `Common ${c.svc} Mistakes Birmingham ${c.audienceTitle} Make`,
  (c) => `Where Businesses Go Wrong With ${c.svc} in Birmingham, Alabama`,
  (c) => `${c.svc} Pitfalls to Avoid in Birmingham, Alabama`,
];
const mistakesSubtextVariants = [
  (c) => `These are the ${c.disc} mistakes that quietly cost ${c.county} ${c.audience} time, money, and ${c.outcome}.`,
  (c) => `We see these ${c.disc} errors constantly in ${c.marketRegion} — here is how to avoid each one.`,
];
function makeCommonMistakes(c) {
  return {
    heading: pick(c.rng, mistakesHeadingVariants)(c),
    subtext: pick(c.rng, mistakesSubtextVariants)(c),
    items: c.pack.mistakes.slice(0, 5),
  };
}

// Case study -----------------------------------------------------------------
const caseBadgeVariants = [() => `Central Alabama Success Story`, () => `Birmingham, Alabama Client Result`, () => `Jefferson County Case Study`];
const caseResultVariants = [
  (c) => `Turned ${c.problemLow0.replace(/^./, (m) => m.toLowerCase())} into ${c.outcome}`,
  (c) => `Reached ${c.outcome} within two quarters`,
  (c) => `Fixed the ${c.disc} gap that had stalled growth`,
];
function makeCaseStudy(c) {
  const delivered = pickN(c.rng, c.pack.deliverables, 4).map((d) => d.title);
  return {
    badge: pick(c.rng, caseBadgeVariants)(),
    headline: `How ${titleCase(c.disc)} Moved the Numbers for a ${c.indTitle} Business`,
    result: pick(c.rng, caseResultVariants)(c),
    description: `${titleCase(aOrAn(c.indShort))} ${c.indShort} client in the ${c.metroShort} came to us with ${c.problemLow0}. We rebuilt their ${c.disc} from the ground up — ${c.deliv0Title.toLowerCase()}, ${c.deliv1Title.toLowerCase()}, and the follow-through most firms skip. Two quarters later, ${c.outcome} had gone from a goal to a number they could point to.`,
    industry: c.indTitle,
    delivered,
  };
}

// Process --------------------------------------------------------------------
const processHeadingVariants = [
  (c) => `How Our ${c.svc} Process Works in Birmingham, Alabama`,
  (c) => `Our ${c.svc} Process for Businesses in Birmingham, Alabama`,
  (c) => `A Structured ${c.svc} Approach for Birmingham, Alabama`,
];
const processSubtextVariants = [
  (c) => `A clear, four-step ${c.disc} process built to produce ${c.outcome}.`,
  () => `Structured, transparent, and accountable from first call to measurable results.`,
];
function makeProcess(c) {
  return {
    heading: pick(c.rng, processHeadingVariants)(c),
    subtext: pick(c.rng, processSubtextVariants)(c),
    steps: [
      { title: 'Audit & Local Diagnosis', description: `We open with ${c.deliv0Title.toLowerCase()} to see exactly where your ${c.disc} stands against ${c.county} market conditions and competitors.` },
      { title: 'Prioritize for Birmingham', description: `We map the ${c.disc} moves that fit the ${c.metroShort} and your goals, sequencing them by return rather than doing everything at once.` },
      { title: 'Build & Implement', description: `We produce the work — ${c.deliv1Title.toLowerCase()}, ${c.deliv2Title.toLowerCase()} — and implement alongside your team, not from a distance.` },
      { title: 'Measure Against Results', description: `We track progress toward ${c.outcome} using ${c.delivLastTitle.toLowerCase()}, then cut what underperforms and double down on what works.` },
    ],
  };
}

// FAQs (service-specific) ----------------------------------------------------
function makeFaqs(c) {
  const d = c.pack.deliverables;
  const all = [
    {
      question: `What does your ${c.svcLower} actually include in Birmingham, Alabama?`,
      answer: `Concrete ${c.disc} deliverables — ${d[0].title.toLowerCase()}, ${d[1].title.toLowerCase()}, ${d[2].title.toLowerCase()}, and more — all built to solve ${c.problemLow0.replace(/^./, (m) => m.toLowerCase())} and produce ${c.outcome} across the ${c.metro}.`,
    },
    {
      question: `How is your ${c.svcLower} different from a national firm?`,
      answer: `National firms rarely understand ${c.county}'s market or the ${c.indShort} sector. We combine real ${c.disc} expertise with local insight and ${c.inst} context, and we deliver actual work rather than a strategy deck.`,
    },
    {
      question: `What does ${c.svcLower} cost in Birmingham, Alabama?`,
      answer: `It depends on scope and goals. We offer flexible engagements sized for ${c.marketRegion} businesses — from focused ${c.disc} sprints to ongoing retainers. Schedule a free consultation for a custom proposal.`,
    },
    {
      question: `How quickly will I see results?`,
      answer: `Timelines depend on your starting point and the ${c.county} competitive landscape. Some ${c.disc} deliverables show impact within 30-60 days, while ${c.term0} and durable positioning compound over three to six months.`,
    },
    {
      question: `Do you work with both new and established businesses in Birmingham?`,
      answer: `Yes. We support early-stage ${c.audience} and established ${c.indShort} companies scaling across the ${c.metro}. Our ${c.disc} approach adapts to your stage rather than forcing one template.`,
    },
    {
      question: `Why does local Birmingham experience matter for ${c.svcLower}?`,
      answer: `Because ${c.disc} results here depend on local specifics — how ${c.metroShort} buyers decide, which channels and institutions carry weight, and how ${c.indShort} competition really works. An out-of-market firm optimizes for the wrong things.`,
    },
    {
      question: `What results should I expect from ${c.svcLower}?`,
      answer: `The goal is ${c.outcome}. We set clear benchmarks at the start — tied to ${c.deliv0Title.toLowerCase()} and ${c.delivLastTitle.toLowerCase()} — and report against them, so progress is something you can see rather than take on faith.`,
    },
  ];
  return pickN(c.rng, all, 5);
}

// Sources --------------------------------------------------------------------
const sourcePool = [
  { text: '99.4% of Alabama businesses are small businesses, employing roughly half the state private workforce', source: 'U.S. Small Business Administration, Alabama Small Business Profile' },
  { text: 'The Birmingham-Hoover MSA is Alabama’s largest metro economy, anchored by healthcare, banking, and manufacturing', source: 'Birmingham Business Alliance, Regional Economic Overview' },
  { text: 'UAB is the Birmingham metro’s largest employer and a major driver of the region’s healthcare and research pipeline', source: 'University of Alabama at Birmingham, Economic Impact Report' },
  { text: 'Innovation Depot is one of the Southeast’s largest business incubators, supporting Central Alabama startups', source: 'Innovation Depot, Impact Reporting' },
  { text: '46% of all Google searches carry local intent, underscoring the value of local search visibility', source: 'GoGulf / Google Search Statistics' },
  { text: 'Companies with documented strategies are significantly more likely to report growth outcomes', source: 'CoSchedule State of Marketing Strategy Report' },
];
function makeSources(c) {
  return pickN(c.rng, sourcePool, 4);
}

// Differentiation section headers (WhyIBGIsDifferent.tsx) --------------------
const differentLabelVariants = [() => 'Our Difference', () => 'Why It Works', () => 'The Local Difference', () => 'Built for Birmingham'];
const valueLabelVariants = [() => 'Our Value', () => 'The Value We Deliver', () => 'Why It Pays Off'];
function makeDifferentiation(c) {
  const differentHeading = pick(c.rng, [
    (x) => ({ lead: `Why Birmingham ${x.audienceTitle} Choose Iconic Brand Group for`, highlight: x.svc }),
    (x) => ({ lead: `Why Birmingham ${x.audienceTitle} Trust Us With`, highlight: x.svc }),
    (x) => ({ lead: `What Makes Our`, highlight: `${x.svc} Different` }),
  ])(c);
  const valueHeading = pick(c.rng, [
    (x) => ({ lead: `The Value ${x.svc} Delivers for`, highlight: `Birmingham ${x.audienceTitle}` }),
    (x) => ({ lead: `What ${x.svc} Actually`, highlight: 'Delivers' }),
    (x) => ({ lead: 'The Value of Working With', highlight: "Birmingham's Iconic Brand Group" }),
  ])(c);
  return {
    differentLabel: pick(c.rng, differentLabelVariants)(),
    differentHeadingLead: differentHeading.lead,
    differentHeadingHighlight: differentHeading.highlight,
    differentIntro: pick(c.rng, [
      (x) => `Plenty of firms will sell you ${x.disc} in Birmingham. Few understand the ${x.metroShort} well enough to make it work, and fewer still stay to deliver it. Here is what sets our approach apart.`,
      (x) => `Choosing a ${x.disc} partner in ${x.marketRegion} comes down to two things: real local market knowledge and follow-through. On both counts, this is where we differ.`,
    ])(c),
    valueLabel: pick(c.rng, valueLabelVariants)(),
    valueHeadingLead: valueHeading.lead,
    valueHeadingHighlight: valueHeading.highlight,
    valueIntro: pick(c.rng, [
      (x) => `Good ${x.disc} pays off in four ways for Birmingham ${x.audience}: it protects money, saves time, cuts risk, and builds status — all pointed at one outcome, ${x.outcome}.`,
      (x) => `For ${x.county} businesses, our ${x.disc} work delivers value across money, time, risk, and status — measured against ${x.outcome}, not activity.`,
    ])(c),
    valueClosing: pick(c.rng, [
      () => `We don’t just advise. We deliver the work and stay accountable to the result.`,
      (x) => `This is how we help ${x.county} businesses turn ${x.disc} into ${x.outcome} — real deliverables, real local insight, real results.`,
    ])(c),
  };
}

// Hero maker -----------------------------------------------------------------
function makeHero(c) {
  return {
    headline: pick(c.rng, heroHeadlineVariants)(c),
    subtext: pick(c.rng, heroSubtextVariants)(c),
    trustBadges: trustBadgeSlots.map((slot) => pick(c.rng, slot)(c)),
  };
}
function makeValuePillars(c) {
  return {
    money: pick(c.rng, valuePillarVariants.money)(c),
    time: pick(c.rng, valuePillarVariants.time)(c),
    risk: pick(c.rng, valuePillarVariants.risk)(c),
    status: pick(c.rng, valuePillarVariants.status)(c),
  };
}

function makeRecord(service) {
  const key = `${service.slug}::${BIRMINGHAM.citySlug}`;
  const rng = createRng(key);
  const profile = profileFor(service);
  const anchor = selectAnchor(service, rng);
  const pack = PACKS[detectTopic(service)] ?? PACKS.consulting;
  const ctx = buildCtx(service, profile, anchor, pack, rng);

  return {
    key,
    hero: makeHero(ctx),
    tldr: pick(ctx.rng, tldrVariants)(ctx),
    overview: { secondaryParagraph: pick(ctx.rng, overviewSecondaryVariants)(ctx) },
    whyDifferent: makeWhyDifferent(ctx),
    differentiation: makeDifferentiation(ctx),
    valuePillars: makeValuePillars(ctx),
    trustedPartner: makeTrustedPartner(ctx),
    definition: makeDefinition(ctx),
    expertQuote: makeExpertQuote(ctx),
    marketData: makeMarketData(ctx),
    marketAnalysis: makeMarketAnalysis(ctx),
    services: makeServices(ctx),
    industries: makeIndustries(ctx),
    commonMistakes: makeCommonMistakes(ctx),
    caseStudy: makeCaseStudy(ctx),
    process: makeProcess(ctx),
    faqs: makeFaqs(ctx),
    sources: makeSources(ctx),
  };
}

// ===========================================================================
// VALIDATION + MAIN
// ===========================================================================

function validateRecord(record) {
  const errors = [];
  const req = (cond, msg) => { if (!cond) errors.push(`${record.key}: ${msg}`); };
  req(record.hero.trustBadges.length === 3, 'expected 3 hero trust badges');
  req(record.whyDifferent.length === 6, 'expected 6 why-different cards');
  req(record.trustedPartner.fiveQuickFacts.length === 5, 'expected 5 quick facts');
  req(Boolean(record.tldr), 'missing tldr');
  req(Boolean(record.overview?.secondaryParagraph), 'missing overview secondary paragraph');
  req(record.definition && record.definition.keyComponents.length === 5, 'expected definition with 5 key components');
  req(Boolean(record.expertQuote?.quote), 'missing expert quote');
  req(Boolean(record.marketData?.populationRange), 'missing market data');
  req(record.services && record.services.items.length === 6, 'expected 6 service cards');
  req(record.industries && record.industries.painPoints.length === 3, 'expected 3 industry pain points');
  req(record.commonMistakes && record.commonMistakes.items.length === 5, 'expected 5 common mistakes');
  req(record.caseStudy && record.caseStudy.delivered.length === 4, 'expected case study with 4 delivered items');
  req(record.process && record.process.steps.length === 4, 'expected 4 process steps');
  req(record.faqs && record.faqs.length === 5, 'expected 5 faqs');
  req(record.sources && record.sources.length === 4, 'expected 4 sources');
  req(Boolean(record.differentiation?.differentIntro && record.differentiation?.valueIntro), 'missing differentiation section copy');
  req(/Birmingham, Alabama$/.test(record.hero.headline), 'hero headline must end with "Birmingham, Alabama"');
  req(!JSON.stringify(record).includes('undefined'), 'record contains "undefined"');
  return errors;
}

async function main() {
  const dryRun = hasArg('dry-run');
  const preserveExisting = !hasArg('no-preserve-existing');
  const limit = Number(getArgValue('limit') ?? 0);
  const outputPath = path.resolve(rootDir, getArgValue('output') ?? 'json/birminghamcontentex.json');
  const services = await loadServices();
  const selectedServices = limit > 0 ? services.slice(0, limit) : services;
  const existing = preserveExisting ? await loadExistingContent(outputPath) : {};
  const results = {};
  const validationErrors = [];

  for (const service of selectedServices) {
    const key = `${service.slug}::${BIRMINGHAM.citySlug}`;
    const record = existing[key] ? { key, ...existing[key] } : makeRecord(service);
    results[key] = record;
    validationErrors.push(...validateRecord(record));
  }

  if (validationErrors.length > 0) {
    throw new Error(validationErrors.slice(0, 20).join('\n'));
  }

  if (dryRun) {
    const preservedCount = Object.keys(results).filter((key) => existing[key]).length;
    console.log(`Dry run: found ${services.length} services; selected ${selectedServices.length}. Preserved: ${preservedCount}.`);
    // Topic distribution for a quick sanity check
    const dist = {};
    for (const s of selectedServices) { const t = detectTopic(s); dist[t] = (dist[t] ?? 0) + 1; }
    console.log('Topic distribution:', JSON.stringify(dist));
    return;
  }

  const tempPath = `${outputPath}.tmp`;
  await fs.writeFile(tempPath, `${JSON.stringify(results, null, 2)}\n`);
  await fs.rename(tempPath, outputPath);
  console.log(`Done. Wrote ${Object.keys(results).length} Birmingham records to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
