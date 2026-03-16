import type { APIRoute } from 'astro';
import { setSessionCookie } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  const data = await request.formData();
  const password = data.get('password')?.toString() || '';
  const adminPassword = import.meta.env.ADMIN_PASSWORD || 'changeme';

  if (password !== adminPassword) {
    return new Response(null, {
      status: 303,
      headers: { Location: '/admin?error=1' },
    });
  }

  setSessionCookie(cookies);
  return new Response(null, {
    status: 303,
    headers: { Location: '/admin/products' },
  });
};
