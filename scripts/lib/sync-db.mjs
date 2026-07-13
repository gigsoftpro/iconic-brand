import { neon } from '@neondatabase/serverless';

// Independent of lib/db.ts on purpose: that file is TypeScript, and these
// scripts run via plain `node`, which can't reliably import a .ts module
// across machines/CI. Talks to the same DATABASE_URL directly instead.
let _sql = null;
function getSql() {
  if (!_sql) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set.');
    _sql = neon(process.env.DATABASE_URL);
  }
  return _sql;
}

let tableEnsured = false;
async function ensureTable() {
  if (tableEnsured) return;
  await getSql()`
    CREATE TABLE IF NOT EXISTS city_service_content (
      service_slug TEXT NOT NULL,
      city_slug TEXT NOT NULL,
      content JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (service_slug, city_slug)
    )
  `;
  tableEnsured = true;
}

// Batch size chosen for reliability, not throughput: ~100 records x ~19KB
// average serialized size keeps each request comfortably small, with no
// confirmed Neon HTTP payload ceiling to design against.
const BATCH_SIZE = 100;

// Upserts a flat `{ "service::city": record }` object — the exact shape
// both scripts/generate-city-content.mjs's `results` and the json/*.json
// files already use — into city_service_content via a constant-shape
// unnest() batch upsert (only the array params grow with batch size).
export async function syncRecordsToDb(records, { label = '' } = {}) {
  await ensureTable();
  const sql = getSql();
  const entries = Object.entries(records);

  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);
    const serviceSlugs = [];
    const citySlugs = [];
    const contents = [];
    for (const [key, record] of batch) {
      const sep = key.lastIndexOf('::');
      serviceSlugs.push(key.slice(0, sep));
      citySlugs.push(key.slice(sep + 2));
      contents.push(JSON.stringify(record));
    }
    await sql`
      INSERT INTO city_service_content (service_slug, city_slug, content)
      SELECT * FROM unnest(${serviceSlugs}::text[], ${citySlugs}::text[], ${contents}::jsonb[])
      ON CONFLICT (service_slug, city_slug) DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
    `;
    console.log(`  ${label}synced ${Math.min(i + BATCH_SIZE, entries.length)}/${entries.length}`);
  }

  return entries.length;
}
