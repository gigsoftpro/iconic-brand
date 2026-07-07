# Iconic Brand Group — GoHighLevel Automation Strategy

> **Purpose:** Define every pipeline, workflow, trigger, tag, and automation inside GHL so IBG runs on autopilot where it should — and human-touches where it matters. Focused exclusively on client lead management.

---

## Table of Contents
1. [Current State Audit](#1-current-state-audit)
2. [GHL Account Architecture](#2-ghl-account-architecture)
3. [Lead Pipeline](#3-lead-pipeline)
4. [Webhook Payload (Already Live)](#4-webhook-payload-already-live)
5. [Custom Fields & Tags](#5-custom-fields--tags)
6. [Automation Workflows](#6-automation-workflows)
7. [SMS Strategy & Compliance](#7-sms-strategy--compliance)
8. [Email Templates](#8-email-templates)
9. [Reporting & Dashboards](#9-reporting--dashboards)
10. [Implementation Checklist](#10-implementation-checklist)

---

## 1. Current State Audit

### What's Already Working
| Component | Status | Details |
|-----------|--------|---------|
| GHL Webhook (Contact Form) | ✅ Live | Fires on every contact submission → `leadconnectorhq.com` |
| Contact Form Data | ✅ Collected | name, email, phone, company, service, message, city, state, source |

### What's Missing in GHL
| Gap | Impact |
|-----|--------|
| No pipelines configured | Leads sit in contacts with no visual deal flow |
| No automation workflows | No follow-up sequences, no task assignment |
| No tags/custom fields mapped | Can't segment or report on lead quality |
| No SMS flows | Missing the 98% open-rate channel entirely |
| No lead scoring | All leads treated equally regardless of qualification signals |
| No appointment booking | No calendar integration for discovery calls |
| No reporting dashboards | No visibility into pipeline velocity or conversion rates |

---

## 2. GHL Account Architecture

### Sub-Account Structure
```
Iconic Brand Group (Agency)
└── IBG Main Sub-Account
    ├── Pipeline: Client Leads
    ├── Calendar: Discovery Calls
    ├── Workflows (see section 6)
    └── Custom Fields + Tags
```

---

## 3. Lead Pipeline

### Stages
| Stage | Name | Trigger | Exit Criteria | Days SLA |
|-------|------|---------|---------------|----------|
| 1 | **New Lead** | Webhook fires from contact form | Lead reviewed + contacted | 0.5 days |
| 2 | **Contacted** | First outreach completed (email/call/SMS) | Prospect responds | 2 days |
| 3 | **Discovery Call Booked** | Calendar booking confirmed | Call completed | 5 days |
| 4 | **Proposal Sent** | Proposal/SOW delivered | Decision made | 7 days |
| 5 | **Negotiation** | Active pricing/scope discussion | Agreement reached | 14 days |
| 6 | **Won** | Contract signed | — | — |
| 7 | **Lost** | Deal disqualified or declined | — | — |

### Stage Actions
- **New Lead → Contacted:** Auto-assign to team member based on `service` field. Send immediate email + SMS (if phone provided). Create follow-up task.
- **Contacted → Discovery:** Trigger booking link email. If no response in 48h, auto-send follow-up #2.
- **Discovery → Proposal:** After call, create task "Send Proposal within 24h." Trigger post-call recap email.
- **Proposal → Negotiation/Won/Lost:** Manual move. Trigger appropriate follow-up.

### Lead Source Mapping
The webhook already sends `form_type: 'contact'` + `source`. Map these to GHL source field:

| Website `service` Value | GHL Tag | Priority |
|------------------------|---------|----------|
| `business-consulting` | `service:consulting` | High |
| `digital-marketing` | `service:marketing` | High |
| `brand-strategy` | `service:brand-strategy` | High |
| `strategic-planning` | `service:strategic-planning` | High |
| `operations-optimization` | `service:ops-optimization` | Medium |
| `growth-strategy` | `service:growth` | High |
| `both` (from ContactPage) | `service:full-suite` | Very High |
| `other` | `service:other` | Medium |

### Revenue Qualification (from ContactPage form)
| Annual Revenue | GHL Tag | Lead Score Modifier |
|---------------|---------|-------------------|
| `<100k` | `revenue:<100k` | +0 |
| `100k-500k` | `revenue:100k-500k` | +5 |
| `500k-1m` | `revenue:500k-1m` | +10 |
| `1m-5m` | `revenue:1m-5m` | +20 |
| `5m-10m` | `revenue:5m-10m` | +30 |
| `10m+` | `revenue:10m+` | +40 |

### Marketing Budget Qualification
| Budget Range | GHL Tag | Lead Score Modifier |
|-------------|---------|-------------------|
| `<5k` | `budget:<5k` | +0 |
| `5k-10k` | `budget:5k-10k` | +5 |
| `10k-25k` | `budget:10k-25k` | +15 |
| `25k-50k` | `budget:25k-50k` | +25 |
| `50k-100k` | `budget:50k-100k` | +35 |
| `100k+` | `budget:100k+` | +50 |

---

## 4. Webhook Payload (Already Live)

### Contact Form Webhook
**Endpoint:** `https://services.leadconnectorhq.com/hooks/y0EPAykadmxG8MsoVDu8/webhook-trigger/EsE879ZlFBFUO1b8rbbx`

```json
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "phone": "(555) 987-6543",
  "company": "Acme Corp",
  "service": "digital-marketing",
  "message": "We need help with our brand strategy...",
  "city": "Tampa",
  "state": "FL",
  "source": "organic",
  "form_type": "contact"
}
```

### GHL Inbound Webhook Mapping
In GHL → Settings → Webhooks, map these fields:

| Webhook Field | GHL Contact Field | Notes |
|--------------|-------------------|-------|
| `name` | First Name + Last Name | Split on first space |
| `email` | Email | Primary identifier |
| `phone` | Phone | Format to E.164 |
| `company` | Company Name | |
| `service` | Custom: Service Interest | |
| `message` | Custom: Initial Message | |
| `city` | City | |
| `state` | State | |
| `source` | Source | UTM source |
| `form_type` | Tag: `form:{form_type}` | Used for workflow routing |

---

## 5. Custom Fields & Tags

### Custom Fields (Create in GHL → Settings → Custom Fields)
| Field Name | Type | Options |
|-----------|------|---------|
| Service Interest | Dropdown | Business Consulting, Digital Marketing, Brand Strategy, Strategic Planning, Operations Optimization, Growth Strategy, Both Services, Other |
| Annual Revenue | Dropdown | <100k, 100k-500k, 500k-1m, 1m-5m, 5m-10m, 10m+ |
| Marketing Budget | Dropdown | <5k, 5k-10k, 10k-25k, 25k-50k, 50k-100k, 100k+ |
| Initial Message | Large Text | — |
| Lead Score | Number | 0–100 |
| Lead Source Page | Text | URL they submitted from |

### Tag Taxonomy
```
── Contact Type ──
contact:lead

── Service Interest ──
service:consulting
service:marketing
service:brand-strategy
service:strategic-planning
service:ops-optimization
service:growth
service:full-suite
service:other

── Revenue Tier ──
revenue:<100k
revenue:100k-500k
revenue:500k-1m
revenue:1m-5m
revenue:5m-10m
revenue:10m+

── Budget Tier ──
budget:<5k
budget:5k-10k
budget:10k-25k
budget:25k-50k
budget:50k-100k
budget:100k+

── Lead Temperature ──
temp:hot          (score 60+)
temp:warm         (score 30-59)
temp:cold         (score 0-29)

── Engagement ──
engaged:email-opened
engaged:email-clicked
engaged:sms-replied
engaged:call-completed
engaged:no-response

── Source ──
source:website-contact
source:organic
source:paid
source:referral
```

---

## 6. Automation Workflows

### WF-01: New Lead Intake & Routing
**Trigger:** Webhook → `form_type = "contact"`

```
1. Create/Update Contact
   → Map all webhook fields to GHL fields
   → Add tag: contact:lead
   → Add tag: source:website-contact
   → Add service tag based on `service` field
   → Add revenue tag based on `annualRevenue` field
   → Add budget tag based on `marketingBudget` field

2. Calculate Lead Score
   → Base: 10 (submitted form)
   → + Revenue modifier (see table above)
   → + Budget modifier (see table above)
   → + Phone provided: +10
   → + Company provided: +5
   → + Message >100 chars: +5
   → Set temperature tag (hot/warm/cold)

3. Add to Pipeline: Client Leads → "New Lead"

4. Assign Round-Robin
   → If service = consulting → Consulting Team
   → If service = marketing → Marketing Team
   → If service = both → Senior Team Lead

5. Create Task: "Review & respond to {{contact.name}}"
   → Due: 30 minutes
   → Priority: Based on lead score

6. Internal Notification
   → Email + push notification to assigned team member
   → Include: name, company, service, revenue, budget, message, lead score
```

### WF-02: Speed-to-Lead (Immediate Response)
**Trigger:** Contact enters "New Lead" stage
**Timing:** Immediate (within 60 seconds)

```
Email #1 — Instant Acknowledgment
├── Subject: "{{first_name}}, we got your message — here's what happens next"
├── Body: Thank them, set expectations (response within 4 business hours),
│         include calendar link for self-booking
├── CTA: "Skip the wait — book a discovery call now"
└── Calendar Link: {{calendar.discovery_call}}

IF phone exists:
  SMS #1 — (send 2 min after email)
  └── "Hi {{first_name}}, this is [Name] from Iconic Brand Group.
       We received your inquiry about {{custom.service_interest}}.
       I'll personally follow up within a few hours, or you can
       book a call now: {{calendar.link}} — Reply STOP to opt out"
```

### WF-03: Follow-Up Sequence (No Response)
**Trigger:** Contact in "Contacted" stage for 48h with no reply
**Exit:** Contact replies, books call, or moves stages

```
Day 2 — Email #2: Value-Add Follow-Up
├── Subject: "Quick thought on {{custom.service_interest}} for {{contact.company}}"
├── Body: Share a relevant insight based on their service interest
│         (consulting → operational efficiency stat, marketing → ROI data)
├── CTA: "Let's talk about how this applies to {{contact.company}}"
└── Calendar Link included

Day 4 — SMS #2 (if phone exists):
└── "Hey {{first_name}}, just following up on your inquiry.
     Happy to jump on a quick call this week: {{calendar.link}}"

Day 7 — Email #3: Social Proof
├── Subject: "How a {{custom.service_interest}} client grew 40% in 6 months"
├── Body: Mini case study / testimonial relevant to their service interest
├── CTA: "Want similar results? Let's talk."
└── Calendar Link included

Day 14 — Email #4: Breakup Email
├── Subject: "Should I close your file, {{first_name}}?"
├── Body: Polite last-touch. "If the timing isn't right, no worries.
│         But if you're still looking for help with {{custom.service_interest}},
│         I'd love to chat before your window closes."
├── CTA: "Still interested? Book a 15-min call"
└── If no response → Move to "Lost" with reason "No Response"
     → Add tag: engaged:no-response
```

### WF-04: Post-Discovery Call
**Trigger:** Calendar event "Discovery Call" completed

```
1. Move pipeline stage → "Proposal Sent" (or keep in Discovery if follow-up needed)

2. Email — Post-Call Recap (send 1 hour after call)
├── Subject: "Great talking with you, {{first_name}} — here's our plan"
├── Body: Recap key discussion points, next steps, timeline
├── CTA: "Review your custom proposal" (when ready)

3. Create Task: "Send proposal to {{contact.name}}"
   → Due: 24 hours
   → Assigned to: call host

4. If no proposal sent in 48h:
   → Internal reminder notification
```

### WF-05: Proposal Follow-Up
**Trigger:** Contact in "Proposal Sent" for 3+ days

```
Day 3 — Email: "Any questions about the proposal?"
Day 7 — SMS: "Hi {{first_name}}, wanted to check in on the proposal.
              Any questions I can answer?"
Day 10 — Email: "Updated availability this week" + calendar link
Day 14 — Phone call task created for assigned team member
```

### WF-06: Won Deal → Onboarding
**Trigger:** Pipeline moves to "Won"

```
1. Remove tag: temp:*
2. Add tag: client:active
3. Send welcome email with onboarding checklist
4. Create onboarding task sequence for team
5. Add to "Client" smart list for ongoing communication
```

### WF-07: Lost Deal → Re-Engagement
**Trigger:** Pipeline moves to "Lost"
**Wait:** 30 days

```
1. Add tag: status:lost
2. Wait 30 days
3. Email: "Things change — we're still here when you're ready"
   → Soft touch, no hard sell
   → Include recent case study or blog post
4. Wait 60 more days
5. Email: Quarterly newsletter add (if they haven't unsubscribed)
```

---

## 7. SMS Strategy & Compliance

### TCPA Compliance Requirements (Non-Negotiable)
| Requirement | Implementation |
|-------------|---------------|
| **Express written consent** | Contact form includes SMS opt-in checkbox (add to website) |
| **Opt-out in every message** | Every SMS ends with "Reply STOP to opt out" |
| **Sender identification** | Every SMS identifies "Iconic Brand Group" |
| **Quiet hours** | No SMS before 8am or after 9pm recipient's local time |
| **Frequency cap** | Max 1 SMS per 48h per contact |
| **Consent records** | Store opt-in timestamp + source in GHL custom field |

### SMS Templates

**Speed to Lead:**
```
Hi {{first_name}}, this is {{assigned_user}} from Iconic Brand Group.
We received your inquiry about {{custom.service_interest}}.
I'll follow up shortly, or book a call now: {{calendar.link}}
Reply STOP to opt out
```

**Follow-Up:**
```
Hey {{first_name}}, following up on your {{custom.service_interest}} inquiry.
Happy to jump on a 15-min call this week: {{calendar.link}}
Reply STOP to opt out
```

### Website Change Required
Add SMS consent checkbox to contact forms:

**Contact Form (ContactForm.tsx + ContactPage.tsx):**
```
☐ I agree to receive text messages from Iconic Brand Group
  about my inquiry. Message frequency varies. Message and data
  rates may apply. Reply STOP to opt out.
```

---

## 8. Email Templates

### Template Library (Build in GHL → Marketing → Emails)

| ID | Template Name | Used In | Subject Line |
|----|--------------|---------|-------------|
| E-01 | Lead — Instant Acknowledgment | WF-02 | "{{first_name}}, we got your message — here's what happens next" |
| E-02 | Lead — Value-Add Follow-Up | WF-03 | "Quick thought on {{custom.service_interest}} for {{contact.company}}" |
| E-03 | Lead — Social Proof | WF-03 | "How a {{custom.service_interest}} client grew 40% in 6 months" |
| E-04 | Lead — Breakup | WF-03 | "Should I close your file, {{first_name}}?" |
| E-05 | Lead — Post-Discovery Recap | WF-04 | "Great talking with you, {{first_name}} — here's our plan" |
| E-06 | Lead — Proposal Follow-Up | WF-05 | "Any questions about the proposal?" |
| E-07 | Lead — Won Welcome | WF-06 | "Welcome to Iconic Brand Group, {{first_name}}" |
| E-08 | Lead — Lost Re-Engage | WF-07 | "Things change — we're still here" |

### Email Design Guidelines
- **From Name:** Iconic Brand Group (or assigned team member name for 1:1)
- **Brand Colors:** Gold `#D5AF34`, Dark `#1B1B1B`, White `#FFFFFF`
- **Logo:** Include IBG logo in header
- **Footer:** Unsubscribe link, physical address, phone number
- **Style:** Clean, professional, minimal. Single CTA per email.
- **UTMs:** Every link tagged: `utm_source=email&utm_medium=ghl_automation&utm_campaign={workflow_name}`

---

## 9. Reporting & Dashboards

### GHL Dashboard #1 — Lead Pipeline
| Metric | Target | Formula |
|--------|--------|---------|
| Speed to first response | < 30 min | Time: New Lead → Contacted |
| Contact → Discovery rate | > 40% | Discovery Booked ÷ Total New Leads |
| Discovery → Proposal rate | > 70% | Proposals Sent ÷ Discovery Calls |
| Proposal → Won rate | > 30% | Won ÷ Proposals Sent |
| Pipeline velocity | < 30 days | Avg time: New Lead → Won |
| Lost reasons breakdown | — | Group by loss reason tag |

### GHL Dashboard #2 — Engagement Health
| Metric | Target | Formula |
|--------|--------|---------|
| Email open rate | > 40% | Opened ÷ Delivered |
| Email click rate | > 8% | Clicked ÷ Delivered |
| SMS response rate | > 20% | Replies ÷ Sent |
| Unsubscribe rate | < 0.5% | Unsubscribes ÷ Sent |
| Spam complaint rate | < 0.08% | Complaints ÷ Sent |

---

## 10. Implementation Checklist

### Phase 1 — Foundation (Week 1)
- [ ] Create all custom fields in GHL
- [ ] Create tag taxonomy in GHL
- [ ] Build Lead Pipeline (7 stages)
- [ ] Verify webhook is mapping fields correctly (test submission)
- [ ] Set up calendar: Discovery Calls (15-min + 30-min slots)
- [ ] Configure team members + round-robin assignment rules

### Phase 2 — Lead Workflows (Week 2)
- [ ] Build WF-01: New Lead Intake & Routing
- [ ] Build WF-02: Speed-to-Lead (email + SMS)
- [ ] Build WF-03: Follow-Up Sequence (4-email + 1 SMS)
- [ ] Build WF-04: Post-Discovery Call
- [ ] Build WF-05: Proposal Follow-Up
- [ ] Build WF-06: Won → Onboarding
- [ ] Build WF-07: Lost → Re-Engagement
- [ ] Create all email templates (E-01 through E-08)
- [ ] Create SMS templates
- [ ] Test full flow: form submit → pipeline → email sequence → booking

### Phase 3 — Website Updates (Week 3)
- [ ] Add SMS consent checkbox to ContactForm.tsx
- [ ] Add SMS consent checkbox to ContactPage.tsx
- [ ] Add `sms_consent` field to webhook payload
- [ ] Update GHL custom fields to receive `sms_consent`

### Phase 4 — Reporting & Optimization (Week 3–4)
- [ ] Build Dashboard #1: Lead Pipeline
- [ ] Build Dashboard #2: Engagement Health
- [ ] Set up weekly pipeline review cadence
- [ ] Document all workflows in GHL notes for team reference

### Phase 5 — QA & Launch
- [ ] End-to-end test: Contact form → full workflow → booking → won
- [ ] Verify SMS compliance: opt-in, opt-out, quiet hours, frequency caps
- [ ] Verify email deliverability: SPF, DKIM, DMARC for GHL sending domain
- [ ] Train team on pipeline management + workflow structure
- [ ] Go live 🚀

---

## Appendix: Workflow Dependencies

```
Contact Form ──webhook──→ GHL Webhook
                           ├── WF-01 (Intake & Routing)
                           ├── WF-02 (Speed-to-Lead)
                           └── WF-03 (Follow-Up) ──no response──→ WF-07 (Lost)
                                 │
                                 └── response ──→ WF-04 (Post-Call)
                                                     │
                                                     └── WF-05 (Proposal)
                                                           ├── Won → WF-06 (Onboarding)
                                                           └── Lost → WF-07 (Re-Engage)

GHL Automation Layer
    ├── Pipeline visualization
    ├── Lead scoring + routing
    ├── SMS automation
    ├── Calendar booking
    ├── Task management
    ├── Internal notifications
    └── Reporting dashboards
```

---

*Strategy authored for Iconic Brand Group. All workflows respect TCPA SMS compliance, CAN-SPAM email requirements, and IBG brand guidelines (#D5AF34 gold, professional tone, clarity over cleverness). Focused exclusively on client lead management.*
