import { NextResponse, type NextRequest } from 'next/server'

import { DEFAULT_LOCALE, isLocale } from '@/i18n/routing'

const ROUTING_EXCLUDED_PREFIXES = ['/admin', '/api', '/_next', '/media'] as const
const PUBLIC_FILE_PATH = /\.[^/]+$/

function isRoutingPath(pathname: string): boolean {
  const hasExcludedPrefix = ROUTING_EXCLUDED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )

  return !hasExcludedPrefix && !PUBLIC_FILE_PATH.test(pathname)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!isRoutingPath(pathname)) {
    return NextResponse.next()
  }

  const firstSegment = pathname.split('/').filter(Boolean)[0]

  if (firstSegment === undefined) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url))
  }

  if (isLocale(firstSegment)) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url))
}

export const config = {
  matcher: ['/((?!admin|api|_next|media|.*\\..*).*)'],
}
