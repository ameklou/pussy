import type { Locale } from '@/i18n/routing'

export function localizeUrl(url: string, locale: Locale): string {
  if (isExternalUrl(url)) return url
  if (url.startsWith(`/${locale}/`) || url === `/${locale}`) return url
  const normalized = url.startsWith('/') ? url : `/${url}`
  return `/${locale}${normalized}`
}

export function isExternalUrl(url: string): boolean {
  return (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:') ||
    url.startsWith('#')
  )
}
