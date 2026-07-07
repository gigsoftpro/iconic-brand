// ══════════════════════════════════════════════════════════════════════
// Career Funnel Email System — Action-Triggered Stage Emails
// ══════════════════════════════════════════════════════════════════════
// 4 emails, one per stage completion. No drip. No scheduling.
// Fires immediately when a candidate completes a stage.
// ══════════════════════════════════════════════════════════════════════

export type FunnelStage = 1 | 2 | 3 | 4

export interface StageEmail {
  stage: FunnelStage
  subject: string
  preheader: string
  body: string
  ctaText: string
  ctaUrl: string
}

const BASE_URL = 'https://www.iconicbrandgroup.com'

function utm(path: string, stage: FunnelStage): string {
  const params = new URLSearchParams({
    utm_source: 'email',
    utm_medium: 'careers_funnel',
    utm_campaign: `stage${stage}_completion`,
    utm_content: path.replace(/\//g, '_').slice(1) || 'home',
  })
  return `${BASE_URL}${path}?${params.toString()}`
}

function link(url: string, text: string): string {
  return `<a href="${url}" style="color:#D5AF34;text-decoration:none;font-weight:600;">${text}</a>`
}

// ── Email Generators ───────────────────────────────────────────────

export function generateStageEmail(stage: FunnelStage, firstName: string): StageEmail {
  switch (stage) {
    case 1: return buildStage1Email(firstName)
    case 2: return buildStage2Email(firstName)
    case 3: return buildStage3Email(firstName)
    case 4: return buildStage4Email(firstName)
  }
}

function buildStage1Email(name: string): StageEmail {
  const subject = `${name}, your application is in — here's your next step`
  const preheader = 'Stage 1 of 4 complete. Stage 2 takes ~15 minutes.'
  const ctaUrl = utm('/careers/company-fit', 1)

  const prepLinks = `
    <tr><td style="padding:8px 0;">
      ${link(utm('/about', 1), 'About Iconic Brand Group')}
      <br/><span style="color:#666;font-size:13px;">Understand who we are and what drives us</span>
    </td></tr>
    <tr><td style="padding:8px 0;">
      ${link(utm('/services', 1), 'Our Full Service Portfolio')}
      <br/><span style="color:#666;font-size:13px;">See the services you could contribute to</span>
    </td></tr>
    <tr><td style="padding:8px 0;">
      ${link(utm('/industries', 1), 'Industries We Serve')}
      <br/><span style="color:#666;font-size:13px;">Learn about our target verticals</span>
    </td></tr>
  `

  const body = buildEmailHtml({
    greeting: `Hi ${name},`,
    bodyText: `Thanks for applying to Iconic Brand Group. You've completed Stage 1 of our 4-stage application process.<br/><br/>To move forward, you'll need to show us you've done your homework. Stage 2 is a <strong>Company Fit</strong> assessment — it takes about 15 minutes, and you'll want to spend some time on our site first.<br/><br/><strong>Start here before you begin Stage 2:</strong>`,
    pageLinksHtml: prepLinks,
    ctaText: 'Continue to Stage 2 →',
    ctaUrl,
    footer: 'Only candidates who complete all 4 stages are reviewed.',
  })

  return { stage: 1, subject, preheader, body, ctaText: 'Continue to Stage 2 →', ctaUrl }
}

function buildStage2Email(name: string): StageEmail {
  const subject = `Nice work, ${name} — Stage 2 complete. Time for the real test.`
  const preheader = 'Stage 3 is a skills assessment. Bring your A-game.'
  const ctaUrl = utm('/careers/assessment', 2)

  const prepLinks = `
    <tr><td style="padding:8px 0;">
      ${link(utm('/blog/brand-strategy-essentials', 2), 'Brand Strategy Essentials')}
      <br/><span style="color:#666;font-size:13px;">You'll need this for the assessment</span>
    </td></tr>
    <tr><td style="padding:8px 0;">
      ${link(utm('/locations', 2), 'Markets We Serve')}
      <br/><span style="color:#666;font-size:13px;">Pick a market for your campaign pitch</span>
    </td></tr>
    <tr><td style="padding:8px 0;">
      ${link(utm('/blog', 2), 'Blog & Insights')}
      <br/><span style="color:#666;font-size:13px;">Browse our thinking and methodology</span>
    </td></tr>
  `

  const body = buildEmailHtml({
    greeting: `Hi ${name},`,
    bodyText: `You've shown you understand what Iconic Brand Group does. Now show us what <strong>you</strong> can do.<br/><br/>Stage 3 is a <strong>Skills Assessment</strong> — you'll work through a real scenario, share your portfolio, and demonstrate critical thinking. It's the hardest stage, and that's by design.<br/><br/><strong>These pages will help with the assessment:</strong>`,
    pageLinksHtml: prepLinks,
    ctaText: 'Start Stage 3 →',
    ctaUrl,
    footer: '~60% of applicants complete this stage. Be one of them.',
  })

  return { stage: 2, subject, preheader, body, ctaText: 'Start Stage 3 →', ctaUrl }
}

function buildStage3Email(name: string): StageEmail {
  const subject = `${name}, you're one step from an interview`
  const preheader = 'Record a 60-second intro and pick your slot.'
  const ctaUrl = utm('/careers/interview', 3)

  const prepLinks = `
    <tr><td style="padding:8px 0;">
      ${link(utm('/', 3), 'Browse Our Full Site')}
      <br/><span style="color:#666;font-size:13px;">You'll need to answer: "What would you change?"</span>
    </td></tr>
    <tr><td style="padding:8px 0;">
      ${link(utm('/services/consulting', 3), 'Consulting Services')}
      <br/><span style="color:#666;font-size:13px;">Deep dive into our consulting approach</span>
    </td></tr>
    <tr><td style="padding:8px 0;">
      ${link(utm('/services/marketing', 3), 'Marketing Services')}
      <br/><span style="color:#666;font-size:13px;">Review our marketing capabilities</span>
    </td></tr>
  `

  const body = buildEmailHtml({
    greeting: `Hi ${name},`,
    bodyText: `You've made it through the hardest part. Stage 4 is your final step: record a short video introduction, tell us what you'd improve about our site, and confirm your availability.<br/><br/>Once submitted, you're in our interview queue.<br/><br/><strong>Browse these before your final submission:</strong>`,
    pageLinksHtml: prepLinks,
    ctaText: 'Complete Final Stage →',
    ctaUrl,
    footer: 'Candidates who complete all 4 stages are reviewed within 5 business days.',
  })

  return { stage: 3, subject, preheader, body, ctaText: 'Complete Final Stage →', ctaUrl }
}

function buildStage4Email(name: string): StageEmail {
  const subject = `Congratulations, ${name} — you're qualified for an interview`
  const preheader = 'Our team will review your application and reach out within 5 business days.'
  const ctaUrl = utm('/about', 4)

  const prepLinks = `
    <tr><td style="padding:8px 0;">
      ${link(utm('/blog', 4), 'Blog & Insights')}
      <br/><span style="color:#666;font-size:13px;">Stay sharp while you wait</span>
    </td></tr>
    <tr><td style="padding:8px 0;">
      ${link(utm('/services', 4), 'Our Services')}
      <br/><span style="color:#666;font-size:13px;">Keep exploring what we build</span>
    </td></tr>
  `

  const body = buildEmailHtml({
    greeting: `Hi ${name},`,
    bodyText: `You've completed all 4 stages of our application process. That alone puts you ahead of most candidates.<br/><br/>Here's what happens next: our team reviews your full application — every response, your portfolio, and your video. If there's a fit, we'll reach out to schedule a conversation.<br/><br/><strong>In the meantime:</strong>`,
    pageLinksHtml: prepLinks,
    ctaText: 'View Our Team →',
    ctaUrl,
    footer: 'Thank you for taking this seriously. We notice people who show up.',
  })

  return { stage: 4, subject, preheader, body, ctaText: 'View Our Team →', ctaUrl }
}

// ── Nudge Emails (48h stall) ───────────────────────────────────────

export function generateNudgeEmail(stalledAtStage: FunnelStage, firstName: string): StageEmail | null {
  if (stalledAtStage >= 4) return null

  const nextStage = (stalledAtStage + 1) as FunnelStage
  const nudges: Record<number, { subject: string; bodyText: string; ctaText: string; ctaPath: string }> = {
    1: {
      subject: `Your application is incomplete, ${firstName} — continue to Stage 2`,
      bodyText: `You started an application at Iconic Brand Group but haven't moved to Stage 2 yet. The Company Fit assessment is waiting for you — it takes about 15 minutes.`,
      ctaText: 'Continue to Stage 2 →',
      ctaPath: '/careers/company-fit',
    },
    2: {
      subject: `You passed Company Fit — don't stop now, ${firstName}`,
      bodyText: `You showed us you know Iconic Brand Group. Now it's time to show us what you can do. The Skills Assessment is the most important stage — and you're ready for it.`,
      ctaText: 'Start Stage 3 →',
      ctaPath: '/careers/assessment',
    },
    3: {
      subject: `You're one step from an interview, ${firstName}`,
      bodyText: `You've completed 3 out of 4 stages. All that's left is a short video intro and a few final questions. Don't leave this unfinished.`,
      ctaText: 'Complete Final Stage →',
      ctaPath: '/careers/interview',
    },
  }

  const nudge = nudges[stalledAtStage]
  if (!nudge) return null

  const ctaUrl = utm(nudge.ctaPath, nextStage)
  const body = buildEmailHtml({
    greeting: `Hi ${firstName},`,
    bodyText: nudge.bodyText,
    pageLinksHtml: '',
    ctaText: nudge.ctaText,
    ctaUrl,
    footer: 'This is your only reminder. We don\'t chase.',
  })

  return {
    stage: stalledAtStage,
    subject: nudge.subject,
    preheader: `Stage ${stalledAtStage} is done. Stage ${nextStage} is waiting.`,
    body,
    ctaText: nudge.ctaText,
    ctaUrl,
  }
}

// ── HTML Email Builder ─────────────────────────────────────────────

function buildEmailHtml(params: {
  greeting: string
  bodyText: string
  pageLinksHtml: string
  ctaText: string
  ctaUrl: string
  footer: string
}): string {
  const pageSection = params.pageLinksHtml
    ? `<table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border-radius:8px;padding:16px;margin:0 0 24px;">
    ${params.pageLinksHtml}
  </table>`
    : ''

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f7f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

<!-- Header -->
<tr><td style="background:linear-gradient(135deg,#1a1a1a,#2d2d2d);padding:32px 40px;text-align:center;">
  <img src="https://www.iconicbrandgroup.com/logos/IBG_LOGO_WHITE_TEXT_GOLD.png" alt="Iconic Brand Group" width="200" style="max-width:200px;" />
</td></tr>

<!-- Body -->
<tr><td style="padding:40px;">
  <p style="font-size:16px;color:#333;margin:0 0 16px;">${params.greeting}</p>
  <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 24px;">${params.bodyText}</p>

  ${pageSection}

  <!-- CTA Button -->
  <table width="100%" cellpadding="0" cellspacing="0">
  <tr><td align="center" style="padding:8px 0 24px;">
    <a href="${params.ctaUrl}" style="display:inline-block;background:linear-gradient(135deg,#D5AF34,#C19A2E);color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;">${params.ctaText}</a>
  </td></tr>
  </table>

  <p style="font-size:13px;color:#999;margin:0;font-style:italic;">${params.footer}</p>
</td></tr>

<!-- Footer -->
<tr><td style="background:#1a1a1a;padding:24px 40px;text-align:center;">
  <p style="font-size:13px;color:#888;margin:0 0 8px;">Iconic Brand Group — Tampa, FL</p>
  <p style="font-size:12px;color:#666;margin:0;">
    <a href="https://www.iconicbrandgroup.com" style="color:#D5AF34;text-decoration:none;">Website</a> &nbsp;|&nbsp;
    <a href="https://www.iconicbrandgroup.com/about" style="color:#D5AF34;text-decoration:none;">About</a> &nbsp;|&nbsp;
    <a href="https://www.iconicbrandgroup.com/blog" style="color:#D5AF34;text-decoration:none;">Blog</a>
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}
