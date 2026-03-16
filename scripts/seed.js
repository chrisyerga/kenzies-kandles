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
  const { rows } = await pool.query('SELECT COUNT(*) FROM products');
  if (parseInt(rows[0].count) > 0) {
    console.log(`Products table already has ${rows[0].count} row(s) — skipping seed.`);
    console.log('To re-seed, truncate the products table first: TRUNCATE products;');
    process.exit(0);
  }

  const products = JSON.parse(
    readFileSync(join(__dirname, '../src/data/products.json'), 'utf8')
  );

  for (const [i, p] of products.entries()) {
    await pool.query(
      `INSERT INTO products
         (name, price, description, scents, image, wax_color, bg_glow, tag_color, tag_bg, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [p.name, p.price, p.description, p.scents, p.image, p.waxColor, p.bgGlow, p.tagColor, p.tagBg, i]
    );
  }

  console.log(`✓ Seeded ${products.length} products from src/data/products.json.`);
} finally {
  await pool.end();
}
