# Iconic Brand Group — Careers Qualification Funnel Plan

> **Goal**: Build a fully automated recruitment funnel that qualifies and graduates candidates through 4 stages using multi-step forms and 4 emails. Zero human engagement until a candidate is fully qualified.

---

## Funnel Architecture

```
STAGE 1: APPLICATION          STAGE 2: COMPANY FIT         STAGE 3: SKILLS ASSESSMENT      STAGE 4: INTERVIEW PREP
(Capture + Filter)            (Culture + Research)         (Prove It)                       (Graduate to Interview)

┌─────────────────┐      ┌─────────────────┐        ┌─────────────────┐           ┌─────────────────┐
│ Landing Page 1   │      │ Landing Page 2   │        │ Landing Page 3   │           │ Landing Page 4   │
│                  │      │                  │        │                  │           │                  │
│ • Name/Email/Ph  │      │ • Why IBG?       │        │ • Case scenario  │           │ • Loom/video     │
│ • Resume/LinkedIn│ ──►  │ • Services quiz  │  ──►   │ • Mini project   │   ──►     │ • Final pitch    │
│ • Role interest  │      │ • Culture q's    │        │ • Portfolio link  │           │ • Availability   │
│ • Location       │      │ • Industry pick  │        │ • Work sample    │           │ • Salary range   │
│                  │      │                  │        │                  │           │ • Confirm slot   │
└────────┬────────┘      └────────┬────────┘        └────────┬────────┘           └────────┬────────┘
         │                        │                          │                             │
    Email 1                  Email 2                    Email 3                        Email 4
    (Confirmation +          (Advance to                (Advance to                   (You're qualified —
     next step CTA)           Stage 3 CTA)              final stage CTA)              book interview)
```

---

## Stage Definitions

### Stage 1: Application (Capture + Filter)
**Page**: `/careers` (or `/careers/apply`)  
**Purpose**: Capture basic info + first-pass filter (are they serious?)  
**Qualification gate**: Must complete all required fields. Spam/junk filtered by honeypot + basic validation.

**Form fields**:
| Field | Required | Why |
|-------|----------|-----|
| Full name | Yes | Identity |
| Email | Yes | Communication channel |
| Phone | Yes | Seriousness signal |
| Location (city, state) | Yes | Remote/local fit |
| Role interest (dropdown) | Yes | Route to right track |
| LinkedIn URL or Resume upload | Yes | **First real filter** — no LinkedIn = low signal |
| How did you hear about us? | No | Attribution |

**Qualification criteria**:
- All required fields filled
- Valid email (not disposable)
- LinkedIn URL or resume provided
- Auto-advance to Stage 2

**SEO play**: Forces visit to `/careers`. Applicant lands, reads job culture content above the form.

---

### Stage 2: Company Fit (Do They Know Us?)
**Page**: `/careers/company-fit`  
**Purpose**: Force the candidate to research IBG. If they can't answer basic questions about the company, they're not worth interviewing.  
**Qualification gate**: Minimum character counts + correct service/industry identification.

**Form fields**:
| Field | Required | Why |
|-------|----------|-----|
| "In your own words, what does Iconic Brand Group do?" | Yes (50 char min) | Proves they read `/about` and `/services` |
| Select services you'd contribute to (multi-select of 6) | Yes (min 2) | Shows they browsed `/services/consulting` and `/services/marketing` |
| Select industries you have experience in (multi-select of 8) | Yes (min 1) | Proves they visited `/industries` |
| "What makes IBG different from other agencies?" | Yes (40 char min) | Tests actual comprehension |
| "Which industry page resonated most and why?" | Yes (30 char min) | Forces `/industries/[slug]` visit |

**Research prompts on page** (with links that open in new tabs):
- "Read our [About page](/about) to understand who we are"
- "Explore our [Services](/services) — [Consulting](/services/consulting) and [Marketing](/services/marketing)"
- "Browse the [Industries](/industries) we serve"

**SEO play**: Forces visits to `/about`, `/services`, `/services/consulting`, `/services/marketing`, `/industries`, and at least 1 `/industries/[slug]`. Minimum 4-6 page views per applicant.

---

### Stage 3: Skills Assessment (Prove It)
**Page**: `/careers/assessment`  
**Purpose**: Make the candidate do real work. This is where weak candidates drop off — and that's the point.  
**Qualification gate**: Substantive responses (character minimums) + portfolio/work sample.

**Form fields** (adapt by role track):
| Field | Required | Why |
|-------|----------|-----|
| Scenario prompt + written response | Yes (150 char min) | Tests thinking under constraints |
| Portfolio URL or work sample link | Yes | Tangible proof |
| "Read [this blog post](/blog/brand-strategy-essentials) — what would you do differently?" | Yes (80 char min) | Tests critical thinking + forces `/blog/[slug]` visit |
| "Pick a location we serve ([Locations](/locations)) — pitch us a campaign idea for a client there" | Yes (100 char min) | Tests strategic thinking + forces `/locations` visit |
| Strengths/weaknesses (honest self-assessment) | Yes (50 char min) | Self-awareness filter |

**Scenario prompts by role track**:

**Marketing track**:
> "A restaurant franchise client in Tampa has 3 locations, no social media presence, and $5K/month budget. Outline your 90-day plan."

**Consulting track**:
> "A SaaS startup just raised $2M seed and needs to go from 0 to first 100 customers. What's your recommended go-to-market strategy?"

**Operations track**:
> "A home services company is doing $3M/year but the owner is working 80-hour weeks. What systems and processes would you implement first?"

**SEO play**: Forces visits to `/blog/[slug]`, `/locations`, potentially `/locations/[state]`. Deep engagement with content.

---

### Stage 4: Interview Prep (Graduate)
**Page**: `/careers/interview`  
**Purpose**: Final gate. Candidate confirms they're ready, records a short intro, picks an interview slot.  
**Qualification gate**: Video/loom submission + confirmed availability + salary alignment.

**Form fields**:
| Field | Required | Why |
|-------|----------|-----|
| 60-second video intro (Loom link or upload) | Yes | **Biggest filter** — shows they'll put in real effort |
| "What's one thing you'd change about our website?" | Yes (50 char min) | Tests attention to detail + forces deep site review |
| Availability (dropdown) | Yes | Logistics |
| Salary/rate expectations | Yes | Alignment check before wasting interview time |
| "Anything else you want us to know?" | No | Open-ended signal |
| Consent checkbox | Yes | Compliance |

**SEO play**: Forces full site review to answer "what would you change" — naturally drives page views across entire site.

**On completion**: Candidate is marked QUALIFIED. Ready for human review + interview booking.

---

## Email Sequence (4 Emails)

Each email fires only when the candidate completes a stage. No time-based drip — purely action-triggered.

### Email 1: Application Received — "You're In. Here's What's Next."
**Trigger**: Stage 1 completed  
**Send**: Immediate  
**From**: `Iconic Brand Group Careers <careers@iconicbrandgroup.com>`

| Element | Content |
|---------|---------|
| **Subject** | `[Name], your application is in — here's your next step` |
| **Preheader** | `Stage 1 of 4 complete. Stage 2 takes ~15 minutes.` |
| **Body** | Thanks for applying. You've completed Stage 1. To move forward, you'll need to show us you've done your homework on Iconic Brand Group. Stage 2 is a Company Fit assessment — it takes about 15 minutes, and you'll need to spend some time on our site first. |
| **CTA** | `Continue to Stage 2 →` → links to `/careers/company-fit` |
| **Page links** | `/about`, `/services`, `/industries` — "Start here before you begin Stage 2" |
| **Footer** | "Only candidates who complete all 4 stages are reviewed." |

**Tactical purpose**: 
- Sets expectation (4 stages = serious process)
- Creates urgency (implies limited spots)
- Drives traffic to 3+ pages via "prep" links

---

### Email 2: Company Fit Passed — "You Know Us. Now Prove Yourself."
**Trigger**: Stage 2 completed  
**Send**: Immediate  
**From**: `Iconic Brand Group Careers <careers@iconicbrandgroup.com>`

| Element | Content |
|---------|---------|
| **Subject** | `Nice work, [Name] — Stage 2 complete. Time for the real test.` |
| **Preheader** | `Stage 3 is a skills assessment. Bring your A-game.` |
| **Body** | You've shown you understand what we do. Now show us what YOU can do. Stage 3 is a Skills Assessment — you'll work through a real scenario, share your portfolio, and demonstrate critical thinking. It's the hardest stage, and that's by design. |
| **CTA** | `Start Stage 3 →` → links to `/careers/assessment` |
| **Page links** | `/blog/brand-strategy-essentials`, `/locations` — "These will help with the assessment questions" |
| **Footer** | "~60% of applicants complete this stage. Be one of them." |

**Tactical purpose**:
- Social proof via completion stats (even if estimated)
- Drives traffic to blog + locations pages
- Frames difficulty as a feature, not a bug

---

### Email 3: Assessment Passed — "One Step Left. Make It Count."
**Trigger**: Stage 3 completed  
**Send**: Immediate  
**From**: `Iconic Brand Group Careers <careers@iconicbrandgroup.com>`

| Element | Content |
|---------|---------|
| **Subject** | `[Name], you're one step from an interview` |
| **Preheader** | `Record a 60-second intro and pick your slot.` |
| **Body** | You've made it through the hardest part. Stage 4 is your final step: record a short video introduction, tell us what you'd improve about our site, and confirm your availability. Once submitted, you're in our interview queue. |
| **CTA** | `Complete Final Stage →` → links to `/careers/interview` |
| **Page links** | Full site link — "Browse the entire site to answer 'what would you change?'" |
| **Footer** | "Candidates who complete all 4 stages are reviewed within 5 business days." |

**Tactical purpose**:
- Highest-value stage — video submission = massive commitment filter
- Forces full site review (deep page views)
- Creates finish-line urgency

---

### Email 4: Qualified — "You're In. Let's Talk."
**Trigger**: Stage 4 completed  
**Send**: Immediate  
**From**: `Iconic Brand Group Careers <careers@iconicbrandgroup.com>`

| Element | Content |
|---------|---------|
| **Subject** | `Congratulations, [Name] — you're qualified for an interview` |
| **Preheader** | `Our team will review your application and reach out within 5 business days.` |
| **Body** | You've completed all 4 stages of our application process. That alone puts you ahead of most candidates. Here's what happens next: our team reviews your full application — every response, your portfolio, and your video. If there's a fit, we'll reach out to schedule a conversation. |
| **CTA** | `View Our Team →` → links to `/about` |
| **Page links** | `/blog`, `/services` — "Stay sharp while you wait" |
| **Footer** | "Thank you for taking this seriously. We notice people who show up." |

**Tactical purpose**:
- Confirms completion, no ambiguity
- Drives additional page views while they wait
- Reinforces brand impression (professional, thorough)

---

## Qualification Scoring

| Stage | Weight | What It Proves |
|-------|--------|----------------|
| Stage 1 | 10% | Basic interest + real contact info |
| Stage 2 | 25% | Company knowledge + cultural alignment |
| Stage 3 | 40% | Actual skills + critical thinking |
| Stage 4 | 25% | Commitment + presentation ability |

**Auto-disqualify signals**:
- Disposable email domain
- All fields at minimum character counts (low effort)
- Copy-pasted generic responses (detect via basic similarity check)
- No LinkedIn AND no portfolio

**High-signal indicators**:
- Responses reference specific IBG content (pages, blog posts, team members)
- Portfolio includes relevant industry work
- Video is professional and prepared
- Scenario response shows strategic thinking, not just tactics

---

## SEO Impact Per Stage

| Stage | Pages Visited | Estimated Dwell | Session Depth |
|-------|---------------|-----------------|---------------|
| Stage 1 | 1 (/careers) | 3-5 min | 1 |
| Stage 2 | 4-6 (about, services, consulting, marketing, industries, industry slugs) | 12-20 min | 4-6 |
| Stage 3 | 2-3 (blog posts, locations) | 10-15 min | 2-3 |
| Stage 4 | 3-5 (full site review) | 8-12 min | 3-5 |
| **Total** | **10-15 unique pages** | **33-52 min total dwell** | **4 sessions** |

---

## Abandonment / Nudge Strategy

If a candidate completes a stage but doesn't move to the next within 48 hours, send ONE nudge email:

| Stalled At | Nudge Subject | When |
|------------|---------------|------|
| Stage 1 → 2 | "Your application is incomplete — continue to Stage 2" | 48h after Stage 1 |
| Stage 2 → 3 | "You passed Company Fit — don't stop now" | 48h after Stage 2 |
| Stage 3 → 4 | "You're one step from an interview, [Name]" | 48h after Stage 3 |

One nudge per stage. If they don't act, they're out. No chasing.

---

## Tech Stack

| Component | Tool |
|-----------|------|
| Forms + Pages | Next.js (multi-page form at `/careers/*`) |
| Email | Resend (action-triggered, immediate send) |
| DB / State | Neon (track stage progress per applicant) |
| Webhook | GHL/LeadConnector (notify on stage completion) |
| Video | Loom link (candidate self-records) |
| Calendar | LeadConnector booking (post-qualification) |

---

## Implementation Phases

### Phase 1: Planning ← YOU ARE HERE
- [x] Define 4 stages + qualification gates
- [x] Define 4 emails (trigger-based, not time-based)
- [x] Define form fields per stage
- [x] Define SEO impact model
- [ ] **YOUR REVIEW** — approve/adjust this plan before any code is written

### Phase 2: Build
- [ ] Create 4 route pages (`/careers`, `/careers/company-fit`, `/careers/assessment`, `/careers/interview`)
- [ ] Build Neon DB schema for multi-stage applicant tracking
- [ ] Build progress API (save/load per stage)
- [ ] Build 4 email templates (HTML, branded)
- [ ] Wire stage completion → email trigger
- [ ] Wire GHL webhook per stage

### Phase 3: Test
- [ ] End-to-end walkthrough all 4 stages
- [ ] Test all 4 emails (delivery, links, rendering)
- [ ] Test DB state tracking (resume from where left off)
- [ ] Test edge cases (back navigation, duplicate submissions)

### Phase 4: Launch
- [ ] Push to production
- [ ] Add DATABASE_URL to Vercel
- [ ] QA on live site
- [ ] Monitor first 10 applicants
