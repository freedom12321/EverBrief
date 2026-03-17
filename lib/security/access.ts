import { createHash, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

export const ACCESS_COOKIE_NAME = 'everbrief_access';

function getConfiguredAccessPassword(): string | null {
  const password = process.env.EVERBRIEF_ACCESS_PASSWORD?.trim();
  return password ? password : null;
}

function createAccessToken(password: string): string {
  return createHash('sha256').update(`everbrief-access:${password}`).digest('hex');
}

export function isAccessProtectionEnabled(): boolean {
  return getConfiguredAccessPassword() !== null;
}

export function hasValidAccessToken(token: string | null | undefined): boolean {
  const configuredPassword = getConfiguredAccessPassword();
  if (!configuredPassword) {
    return true;
  }

  if (!token) {
    return false;
  }

  const expectedToken = createAccessToken(configuredPassword);
  const providedBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expectedToken);

  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
}

export function isAuthorizedRequest(request: NextRequest): boolean {
  return hasValidAccessToken(request.cookies.get(ACCESS_COOKIE_NAME)?.value);
}

export function isTrustedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');

  if (!origin) {
    return true;
  }

  return origin === request.nextUrl.origin;
}

export function requireAppAccess(request: NextRequest): NextResponse | null {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
  }

  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  return null;
}

export function isValidAccessPassword(password: string): boolean {
  const configuredPassword = getConfiguredAccessPassword();

  if (!configuredPassword) {
    return true;
  }

  return hasValidAccessToken(createAccessToken(password.trim()));
}

export function applyAccessCookie(response: NextResponse): void {
  const configuredPassword = getConfiguredAccessPassword();
  if (!configuredPassword) {
    return;
  }

  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: createAccessToken(configuredPassword),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAccessCookie(response: NextResponse): void {
  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}
