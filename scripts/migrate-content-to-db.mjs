import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncRecordsToDb } from './lib/sync-db.mjs';

// One-time backfill: pushes every json/*.json file (including the
// hand-tuned birminghamcontentex.json — same "service::city" key shape)
// into Postgres. Scoped per file rather than one monolithic transaction so
// a mid-run failure only needs re-running from that file; the upsert is
// idempotent either way, so this is safe to re-run in full at any time.
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const jsonDir = path.join(rootDir, 'json');

async function main() {
  const files = (await fs.readdir(jsonDir)).filter((f) => f.endsWith('.json'));
  let total = 0;
  for (const file of files) {
    const records = JSON.parse(await fs.readFile(path.join(jsonDir, file), 'utf8'));
    const n = await syncRecordsToDb(records, { label: `[${file}] ` });
    total += n;
    console.log(`✓ ${file}: ${n} records`);
  }
  console.log(`Done. Synced ${total} records from ${files.length} files.`);
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
