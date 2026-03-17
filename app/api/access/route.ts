import { NextRequest, NextResponse } from 'next/server';
import {
  applyAccessCookie,
  clearAccessCookie,
  isAccessProtectionEnabled,
  isAuthorizedRequest,
  isTrustedOrigin,
  isValidAccessPassword,
} from '@/lib/security/access';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    required: isAccessProtectionEnabled(),
    authenticated: isAuthorizedRequest(request),
  });
}

export async function POST(request: NextRequest) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
  }

  if (!isAccessProtectionEnabled()) {
    return NextResponse.json({ success: true, required: false });
  }

  const body = await request.json().catch(() => ({}));
  const password =
    typeof body.password === 'string'
      ? body.password
      : '';

  if (!isValidAccessPassword(password)) {
    return NextResponse.json({ error: 'Incorrect access password' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true, required: true });
  applyAccessCookie(response);
  return response;
}

export async function DELETE(request: NextRequest) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
  }

  const response = NextResponse.json({ success: true });
  clearAccessCookie(response);
  return response;
}
