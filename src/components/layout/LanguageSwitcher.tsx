'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LOCALES, type Locale } from '@/i18n/routing'

type LanguageSwitcherProps = {
  currentLocale: Locale
  labels: Record<Locale, string>
}

export function LanguageSwitcher({ currentLocale, labels }: LanguageSwitcherProps) {
  const pathname = usePathname()

  const switchPath = (targetLocale: Locale): string => {
    const segments = pathname.split('/')
    if (segments[1] === currentLocale) {
      segments[1] = targetLocale
    } else {
      segments.splice(1, 0, targetLocale)
    }
    return segments.join('/') || `/${targetLocale}`
  }

  return (
    <nav aria-label="Language switcher">
      <ul className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {LOCALES.map((locale) => {
          const isActive = locale === currentLocale
          return (
            <li key={locale}>
              <Link
                href={switchPath(locale)}
                hrefLang={locale}
                aria-current={isActive ? 'true' : undefined}
                className={`px-1 py-0.5 transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive ? 'text-foreground' : ''
                }`}
              >
                {labels[locale]}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
