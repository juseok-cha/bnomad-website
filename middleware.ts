import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'ko']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    // Try to get locale from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language')
    if (acceptLanguage?.includes('ko')) {
      return 'ko'
    }
    return defaultLocale
  }

  return pathname.split('/')[1] as string
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|images).*)',
  ],
}
