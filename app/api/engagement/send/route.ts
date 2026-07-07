import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateNudgeEmail } from '@/lib/engagement-tiers'
import { sql, initDb } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_ADDRESS = 'Iconic Brand Group Careers <careers@iconicbrandgroup.com>'

// POST /api/engagement/send — Nudge stalled applicants
// Called by cron or manually. Finds applicants stalled 48h+ at a stage and nudges once.
export async function POST(request: NextRequest) {
  try {
    await initDb()

    // Optional: pass specific email to nudge one person
    const body = await request.json().catch(() => ({}))
    const targetEmail = body?.email

    let stalledApplicants
    if (targetEmail) {
      stalledApplicants = await sql`
        SELECT email, name, current_stage,
               nudge1_sent_at, nudge2_sent_at, nudge3_sent_at,
               stage1_completed_at, stage2_completed_at, stage3_completed_at
        FROM career_applicants
        WHERE email = ${targetEmail} AND current_stage BETWEEN 2 AND 4 AND qualified_at IS NULL
      `
    } else {
      // Find applicants stalled 48h+ who haven't been nudged for this stage
      stalledApplicants = await sql`
        SELECT email, name, current_stage,
               nudge1_sent_at, nudge2_sent_at, nudge3_sent_at,
               stage1_completed_at, stage2_completed_at, stage3_completed_at
        FROM career_applicants
        WHERE current_stage BETWEEN 2 AND 4
          AND qualified_at IS NULL
          AND updated_at < NOW() - INTERVAL '48 hours'
      `
    }

    const results: Array<{ email: string; stage: number; sent: boolean; error?: string }> = []

    for (const applicant of stalledApplicants) {
      const stalledAtStage = applicant.current_stage - 1 // They completed this stage but haven't done the next
      const nudgeKey = `nudge${stalledAtStage}_sent_at` as 'nudge1_sent_at' | 'nudge2_sent_at' | 'nudge3_sent_at'

      // Skip if already nudged for this stage
      if (applicant[nudgeKey]) {
        results.push({ email: applicant.email, stage: stalledAtStage, sent: false, error: 'already nudged' })
        continue
      }

      const firstName = applicant.name ? applicant.name.split(' ')[0] : 'there'
      const nudgeEmail = generateNudgeEmail(stalledAtStage as 1 | 2 | 3, firstName)
      if (!nudgeEmail) {
        results.push({ email: applicant.email, stage: stalledAtStage, sent: false, error: 'no nudge template' })
        continue
      }

      try {
        await resend.emails.send({
          from: FROM_ADDRESS,
          to: applicant.email,
          subject: nudgeEmail.subject,
          html: nudgeEmail.body,
          headers: { 'X-Entity-Ref-ID': `careers-nudge${stalledAtStage}-${Date.now()}` },
        })

        // Mark nudge as sent
        if (stalledAtStage === 1) {
          await sql`UPDATE career_applicants SET nudge1_sent_at = NOW() WHERE email = ${applicant.email}`
        } else if (stalledAtStage === 2) {
          await sql`UPDATE career_applicants SET nudge2_sent_at = NOW() WHERE email = ${applicant.email}`
        } else if (stalledAtStage === 3) {
          await sql`UPDATE career_applicants SET nudge3_sent_at = NOW() WHERE email = ${applicant.email}`
        }

        results.push({ email: applicant.email, stage: stalledAtStage, sent: true })
      } catch (emailError) {
        results.push({
          email: applicant.email,
          stage: stalledAtStage,
          sent: false,
          error: emailError instanceof Error ? emailError.message : 'Unknown',
        })
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      sent: results.filter(r => r.sent).length,
      results,
    })
  } catch (error) {
    console.error('Nudge send error:', error)
    return NextResponse.json(
      { error: 'Failed to process nudges', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}
