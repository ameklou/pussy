import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

import type { Locale } from '@/i18n/routing'
import { getDictionary } from '@/i18n/dictionaries'
import { localizeUrl } from '@/lib/links'
import { CartBadge } from './CartBadge'
import { LanguageSwitcher } from './LanguageSwitcher'

import type { MainNavigation } from '@/payload-types'

type HeaderProps = {
  locale: Locale
}

export async function Header({ locale }: HeaderProps) {
  const payload = await getPayload({ config })
  const navigation = await payload.findGlobal({
    slug: 'main-navigation',
    locale,
  })

  const dictionary = getDictionary(locale)
  const links = (navigation as MainNavigation).links ?? []

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-4 md:px-8 lg:px-12">
        <Link
          href={localizeUrl('/', locale)}
          className="font-heading text-2xl font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Books
        </Link>

        <div className="hidden items-center gap-3 md:flex" aria-hidden="true">
          <span className="h-0 w-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-t-terracotta" />
        </div>

        <nav aria-label="Main navigation" className="flex-1">
          <ul className="hidden items-center justify-end gap-6 md:flex">
            {links.map((link, index) => {
              const href =
                link.type === 'external' ? link.url : localizeUrl(link.url, locale)
              const isExternal = link.type === 'external'

              return (
                <li key={index}>
                  <Link
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <CartBadge locale={locale} label={dictionary.layout.cart} />
          <LanguageSwitcher currentLocale={locale} labels={dictionary.layout.languages} />
        </div>
      </div>
    </header>
  )
}
