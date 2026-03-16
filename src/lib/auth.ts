import { createHmac } from 'crypto';

export const COOKIE_NAME = 'kk_admin';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function sessionToken(): string {
  const password = import.meta.env.ADMIN_PASSWORD || 'changeme';
  return createHmac('sha256', password).update('kenzies-kandles-v1').digest('hex');
}

export function isAuthenticated(
  cookies: { get: (name: string) => { value: string } | undefined }
): boolean {
  return cookies.get(COOKIE_NAME)?.value === sessionToken();
}

export function setSessionCookie(
  cookies: { set: (name: string, value: string, opts: object) => void }
): void {
  cookies.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export function clearSessionCookie(
  cookies: { delete: (name: string, opts: object) => void }
): void {
  cookies.delete(COOKIE_NAME, { path: '/' });
}
