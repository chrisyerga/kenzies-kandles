import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Required for Node.js environments (not needed on edge runtimes)
neonConfig.webSocketConstructor = ws;

let _pool: Pool | null = null;

export function getPool(): Pool {
  if (!_pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set.');
    }
    _pool = new Pool({ connectionString });
  }

  return _pool;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  sale_price: number | null;
  description: string;
  scents: string[];
  in_stock: boolean;
  image: string | null;
  wax_color: string;
  bg_glow: string;
  tag_color: string;
  tag_bg: string;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: Date;
}
