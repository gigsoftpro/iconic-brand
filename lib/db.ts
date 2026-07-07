import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

let _sql: NeonQueryFunction<false, false> | null = null
export function getSQL() {
  if (!_sql) {
    _sql = neon(process.env.DATABASE_URL!)
  }
  return _sql
}

// Keep backward-compatible export for existing code
export const sql = new Proxy({} as NeonQueryFunction<false, false>, {
  apply(_target, _thisArg, args) {
    return getSQL()(...(args as [TemplateStringsArray, ...unknown[]]))
  },
  get(_target, prop) {
    return (getSQL() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

// Initialize DB schema — called once on first API hit
let initialized = false
export async function initDb() {
  if (initialized) return
  await sql`
    CREATE TABLE IF NOT EXISTS career_applicants (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      phone TEXT,
      location TEXT,
      role_interest TEXT,
      linkedin_url TEXT,
      referral_source TEXT,
      current_stage INT DEFAULT 1,
      stage1_data JSONB DEFAULT '{}',
      stage2_data JSONB DEFAULT '{}',
      stage3_data JSONB DEFAULT '{}',
      stage4_data JSONB DEFAULT '{}',
      stage1_completed_at TIMESTAMPTZ,
      stage2_completed_at TIMESTAMPTZ,
      stage3_completed_at TIMESTAMPTZ,
      stage4_completed_at TIMESTAMPTZ,
      qualified_at TIMESTAMPTZ,
      nudge1_sent_at TIMESTAMPTZ,
      nudge2_sent_at TIMESTAMPTZ,
      nudge3_sent_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
  initialized = true
}
