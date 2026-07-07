import { NextResponse } from 'next/server'
import { sql, initDb } from '@/lib/db'

// GET /api/engagement/stats — Funnel stats overview
export async function GET() {
  try {
    await initDb()

    const stats = await sql`
      SELECT
        COUNT(*) AS total_applicants,
        COUNT(*) FILTER (WHERE current_stage >= 2) AS completed_stage1,
        COUNT(*) FILTER (WHERE current_stage >= 3) AS completed_stage2,
        COUNT(*) FILTER (WHERE current_stage >= 4) AS completed_stage3,
        COUNT(*) FILTER (WHERE qualified_at IS NOT NULL) AS qualified,
        COUNT(*) FILTER (WHERE nudge1_sent_at IS NOT NULL) AS nudge1_sent,
        COUNT(*) FILTER (WHERE nudge2_sent_at IS NOT NULL) AS nudge2_sent,
        COUNT(*) FILTER (WHERE nudge3_sent_at IS NOT NULL) AS nudge3_sent
      FROM career_applicants
    `

    const s = stats[0] || {}
    return NextResponse.json({
      total_applicants: Number(s.total_applicants || 0),
      funnel: {
        stage1: Number(s.completed_stage1 || 0),
        stage2: Number(s.completed_stage2 || 0),
        stage3: Number(s.completed_stage3 || 0),
        qualified: Number(s.qualified || 0),
      },
      nudges: {
        stage1: Number(s.nudge1_sent || 0),
        stage2: Number(s.nudge2_sent || 0),
        stage3: Number(s.nudge3_sent || 0),
      },
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { error: 'Failed to load stats', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}
