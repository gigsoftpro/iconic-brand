import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateStageEmail, type FunnelStage } from '@/lib/engagement-tiers'
import { sql, initDb } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_ADDRESS = 'Iconic Brand Group Careers <careers@iconicbrandgroup.com>'
const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/y0EPAykadmxG8MsoVDu8/webhook-trigger/EsE879ZlFBFUO1b8rbbx'

// POST /api/engagement/trigger
// Action-triggered: fires exactly 1 email per stage completion.
// Emails are delayed 24h to stagger between stages.
// Body: { email, name, stage, phone?, role_interest? }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, stage, phone, role_interest } = body
    let { name } = body

    if (!email || !stage || stage < 1 || stage > 4) {
      return NextResponse.json(
        { error: 'email and stage (1-4) required' },
        { status: 400 }
      )
    }

    const funnelStage = stage as FunnelStage

    // If name not provided, try to get from DB
    if (!name) {
      try {
        await initDb()
        const rows = await sql`SELECT name FROM career_applicants WHERE email = ${email}`
        if (rows.length > 0) name = rows[0].name
      } catch {
        // DB lookup optional — continue without name
      }
    }

    const firstName = name ? name.split(' ')[0] : 'there'
    const stageEmail = generateStageEmail(funnelStage, firstName)

    // 24-hour delay so career emails stagger between stages
    const scheduledAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

    // Schedule the stage completion email via Resend (24h delay)
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: stageEmail.subject,
      html: stageEmail.body,
      scheduledAt,
      headers: {
        'X-Entity-Ref-ID': `careers-stage${stage}-${Date.now()}`,
      },
    })

    // GHL webhook — notify about stage progression
    try {
      await fetch(GHL_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || '',
          email,
          phone: phone || '',
          role_interest: role_interest || '',
          career_stage: stage,
          career_stage_label: ['Application', 'Company Fit', 'Skills Assessment', 'Interview Prep'][stage - 1],
          qualified: stage === 4,
          form_type: `careers_stage${stage}_completed`,
        }),
      })
    } catch (webhookError) {
      console.error('GHL webhook error:', webhookError)
    }

    return NextResponse.json({
      success: true,
      stage: funnelStage,
      emailId: result.data?.id,
      scheduledAt,
    })
  } catch (error) {
    console.error('Engagement trigger error:', error)
    return NextResponse.json(
      { error: 'Failed to send stage email', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}
