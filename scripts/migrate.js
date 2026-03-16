import 'dotenv/config';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

neonConfig.webSocketConstructor = ws;

const __dirname = dirname(fileURLToPath(import.meta.url));

if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL environment variable is not set.');
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

try {
  const sql = readFileSync(join(__dirname, '../migrations/001_initial.sql'), 'utf8');
  await pool.query(sql);
  console.log('✓ Migrations applied successfully.');
} finally {
  await pool.end();
}
