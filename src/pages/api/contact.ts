import type { APIRoute } from 'astro';
import { getPool } from '../../lib/db';
import { sendContactNotification } from '../../lib/email';

export const POST: APIRoute = async ({ request }) => {
  let name: string, email: string, message: string;

  const ct = request.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    const body = await request.json();
    name = body.name?.trim() || '';
    email = body.email?.trim() || '';
    message = body.message?.trim() || '';
  } else {
    const data = await request.formData();
    name = data.get('name')?.toString().trim() || '';
    email = data.get('email')?.toString().trim() || '';
    message = data.get('message')?.toString().trim() || '';
  }

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'All fields are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const pool = getPool();
  await pool.query(
    'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
    [name, email, message]
  );

  try {
    await sendContactNotification({ name, email, message });
  } catch (err) {
    console.error('Email send failed:', err);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
