import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, locales } from './i18n'

/**
 * Middleware for handling locale-based routing.
 *
 * - Skips internal/public paths.
 * - Checks if locale exists in the pathname.
 * - Falls back to cookie or defaultLocale.
 * - Redirects to locale-prefixed URL if missing.
 *
 * @param {NextRequest} request - Incoming request from Next.js.
 * @returns {NextResponse} - Either proceeds or redirects.
 */
export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl
  console.log('🧭 Middleware triggered for:', pathname)

  // Skip middleware for static files, API routes, etc.
  const PUBLIC_PATHS = ['/_next', '/api', '/favicon.ico', '/robots.txt', '/fonts', '/images']
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Check if the locale is already in the pathname (e.g., /en/home)
  const pathnameLocale = pathname.split('/')[1]
  if (locales.includes(pathnameLocale)) {
    return NextResponse.next()
  }

  // Fallback to cookie locale or default
  const cookieLocale = request.cookies.get('locale')?.value
  const locale = locales.includes(cookieLocale || '') ? cookieLocale : defaultLocale

  // Redirect to correct locale-prefixed path
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`

  return NextResponse.redirect(url)
}

// Apply middleware to all routes except known public ones
export const config = {
  matcher: ['/', '/((?!_next|api|favicon.ico|robots.txt|fonts|images).*)'],
}
