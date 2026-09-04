import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Allow access to the login page itself
  if (req.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = req.cookies.get('admin_session')?.value;
  
  // Verify token matches our simple env password implementation
  if (token === process.env.ADMIN_PASSWORD) {
    return NextResponse.next();
  }

  // Not authenticated, redirect to the custom login screen
  return NextResponse.redirect(new URL('/admin/login', req.url));
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
