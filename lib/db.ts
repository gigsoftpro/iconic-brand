import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

let _sql: NeonQueryFunction<false, false> | null = null
export function getSQL() {
  if (!_sql) {
    _sql = neon(process.env.DATABASE_URL!)
  }
  return _sql
}

// Keep backward-compatible export for existing code.
// The Proxy target must itself be callable — a Proxy is only callable if its
// target has a [[Call]] internal method, regardless of whether an `apply`
// trap is defined. A `{}` target here makes `sql` throw "sql is not a
// function" on every tagged-template call (`sql\`SELECT ...\``), which is
// the sql export's entire purpose.
export const sql = new Proxy(function sql() {} as unknown as NeonQueryFunction<false, false>, {
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
  await sql`
    CREATE TABLE IF NOT EXISTS city_service_content (
      service_slug TEXT NOT NULL,
      city_slug TEXT NOT NULL,
      content JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (service_slug, city_slug)
    )
  `
  initialized = true
}
