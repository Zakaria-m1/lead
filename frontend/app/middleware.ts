import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value; // Get the token from cookies
  const url = req.nextUrl.clone();

  // If no token, redirect to sign-in
  if (!token) {
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  try {
    // Verify the token with the backend
    const response = await fetch('http://62.72.32.239:8000/api/auth/verify-token/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Invalid token, redirect to sign-in
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }

    // Redirect to the appropriate dashboard based on the role
    if (data.role === 'SuperAdmin' && url.pathname.startsWith('/kampanj')) {
      // SuperAdmin should not access /kampanj
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    } else if (data.role !== 'SuperAdmin' && url.pathname === '/dashboard') {
      // Non-SuperAdmin users should not access /dashboard
      url.pathname = '/kampanj';
      return NextResponse.redirect(url);
    }

    // Allow access to the route if everything checks out
    return NextResponse.next();
    
  } catch (error) {
    // If there's an error verifying the token, redirect to sign-in
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/dashboard', '/kampanj', '/admin/:path*'], // Protect these routes
};
