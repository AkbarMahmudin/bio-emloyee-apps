import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authRoutes } from './constants/routes';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const accessToken = !!cookies().get('access_token')?.value;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith('/api')

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (accessToken) {
      return Response.redirect(new URL('/', nextUrl));
    }
    
    return null;
  }

  if (!accessToken) {
    return Response.redirect(new URL('/sign-in', nextUrl));
  }
 
  return null;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};