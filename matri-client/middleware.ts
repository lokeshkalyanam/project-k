import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware to handle locale-based redirection.
 *
 * This middleware ensures that all non-public routes are prefixed with a supported locale (`en`, `te`, or `hi`).
 * If a request doesn't start with a locale, it automatically redirects to the default locale (`/en`).
 *
 * It skips internal/public paths such as:
 * - /_next
 * - /favicon.ico
 * - /robots.txt
 * - /fonts
 * - /images
 *
 * @param {NextRequest} request - The incoming Next.js request object.
 * @returns {NextResponse} Response object which either continues the request or redirects.
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const PUBLIC_PATHS = ['/_next', '/favicon.ico', '/robots.txt', '/fonts', '/images'];
    if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    const LOCALE_PATTERN = /^\/(en|te|hi)(\/|$)/;
    if (!LOCALE_PATTERN.test(pathname)) {
        const locale = 'en';
        const url = request.nextUrl.clone();
        url.pathname = `/${locale}${pathname}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

/**
 * Matcher configuration to apply middleware only on specific paths.
 *
 * This excludes API routes and static/public files from middleware execution.
 */
export const config = {
    matcher: ['/((?!api|_next|favicon.ico|images|fonts|robots.txt).*)']
};
