import { NextRequest, NextResponse } from 'next/server'
import { sql, initDb } from '@/lib/db'

// POST /api/careers/progress — save stage progress
export async function POST(request: NextRequest) {
  try {
    await initDb()
    const body = await request.json()
    const { email, stage, data } = body

    if (!email || !stage || stage < 1 || stage > 4) {
      return NextResponse.json({ error: 'email and stage (1-4) required' }, { status: 400 })
    }

    if (stage === 1) {
      const { name, phone, location, role_interest, linkedin_url, referral_source } = body
      await sql`
        INSERT INTO career_applicants (
          email, name, phone, location, role_interest, linkedin_url, referral_source,
          current_stage, stage1_data, stage1_completed_at, updated_at
        ) VALUES (
          ${email}, ${name || ''}, ${phone || ''}, ${location || ''}, ${role_interest || ''},
          ${linkedin_url || ''}, ${referral_source || ''},
          2, ${JSON.stringify(data || {})}, NOW(), NOW()
        )
        ON CONFLICT (email) DO UPDATE SET
          name = COALESCE(NULLIF(EXCLUDED.name, ''), career_applicants.name),
          phone = COALESCE(NULLIF(EXCLUDED.phone, ''), career_applicants.phone),
          location = COALESCE(NULLIF(EXCLUDED.location, ''), career_applicants.location),
          role_interest = COALESCE(NULLIF(EXCLUDED.role_interest, ''), career_applicants.role_interest),
          linkedin_url = COALESCE(NULLIF(EXCLUDED.linkedin_url, ''), career_applicants.linkedin_url),
          referral_source = COALESCE(NULLIF(EXCLUDED.referral_source, ''), career_applicants.referral_source),
          current_stage = GREATEST(career_applicants.current_stage, 2),
          stage1_data = ${JSON.stringify(data || {})},
          stage1_completed_at = COALESCE(career_applicants.stage1_completed_at, NOW()),
          updated_at = NOW()
      `
      return NextResponse.json({ success: true, nextStage: 2 })
    }

    if (stage === 2) {
      await sql`
        UPDATE career_applicants SET
          current_stage = GREATEST(current_stage, 3),
          stage2_data = ${JSON.stringify(data || {})},
          stage2_completed_at = COALESCE(stage2_completed_at, NOW()),
          updated_at = NOW()
        WHERE email = ${email}
      `
      return NextResponse.json({ success: true, nextStage: 3 })
    }

    if (stage === 3) {
      await sql`
        UPDATE career_applicants SET
          current_stage = GREATEST(current_stage, 4),
          stage3_data = ${JSON.stringify(data || {})},
          stage3_completed_at = COALESCE(stage3_completed_at, NOW()),
          updated_at = NOW()
        WHERE email = ${email}
      `
      return NextResponse.json({ success: true, nextStage: 4 })
    }

    if (stage === 4) {
      await sql`
        UPDATE career_applicants SET
          current_stage = 5,
          stage4_data = ${JSON.stringify(data || {})},
          stage4_completed_at = COALESCE(stage4_completed_at, NOW()),
          qualified_at = NOW(),
          updated_at = NOW()
        WHERE email = ${email}
      `
      return NextResponse.json({ success: true, qualified: true })
    }

    return NextResponse.json({ error: 'Invalid stage' }, { status: 400 })
  } catch (error) {
    console.error('Career progress error:', error)
    return NextResponse.json(
      { error: 'Failed to save progress', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}

// GET /api/careers/progress?email=... — load applicant state
export async function GET(request: NextRequest) {
  try {
    await initDb()
    const email = request.nextUrl.searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'email required' }, { status: 400 })
    }

    const rows = await sql`
      SELECT current_stage, name, phone, location, role_interest, linkedin_url,
             stage1_data, stage2_data, stage3_data, stage4_data,
             stage1_completed_at, stage2_completed_at, stage3_completed_at, stage4_completed_at,
             qualified_at
      FROM career_applicants WHERE email = ${email}
    `

    if (rows.length === 0) {
      return NextResponse.json({ found: false, current_stage: 1 })
    }

    return NextResponse.json({ found: true, ...rows[0] })
  } catch (error) {
    console.error('Career progress get error:', error)
    return NextResponse.json(
      { error: 'Failed to load progress', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}
