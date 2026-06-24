import config from '@payload-config'
import { Briefcase, Camera, Globe, MessageCircle, Play } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'

import type { BookstoreDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/routing'
import { localizeUrl } from '@/lib/links'
import type { Category, Footer as FooterType } from '@/payload-types'
import { BOOK_FORMATS, type BookFormatValue, getBookFormatLabel } from './bookHelpers'

type BookFiltersProps = {
  readonly locale: Locale
  readonly categories: readonly Category[]
  readonly activeCategory?: string
  readonly activeFormat?: BookFormatValue
  readonly search?: string
  readonly dictionary: BookstoreDictionary
}

type BooksHrefInput = {
  readonly locale: Locale
  readonly search?: string
  readonly category?: string
  readonly format?: BookFormatValue
}

function buildBooksHref(input: BooksHrefInput): string {
  const params = new URLSearchParams()

  if (input.search) params.set('search', input.search)
  if (input.category) params.set('category', input.category)
  if (input.format) params.set('format', input.format)

  const query = params.toString()
  return query ? `${localizeUrl('/books', input.locale)}?${query}` : localizeUrl('/books', input.locale)
}

const SOCIAL_ICONS = {
  facebook: MessageCircle,
  instagram: Camera,
  linkedin: Briefcase,
  x: Globe,
  youtube: Play,
} as const

export async function BookFilters({ locale, categories, activeCategory, activeFormat, search, dictionary }: BookFiltersProps) {
  const payload = await getPayload({ config })
  const footer = (await payload.findGlobal({ slug: 'footer', locale })) as FooterType
  const socialLinks = footer.socialLinks ?? []

  return (
    <div className="space-y-8">
      <nav aria-label={dictionary.categories} className="space-y-4">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
          {dictionary.categories}
        </h2>
        <ul className="space-y-3">
          <li>
            <Link
              href={buildBooksHref({ locale, search, format: activeFormat })}
              aria-current={activeCategory ? undefined : 'true'}
              className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors aria-[current=true]:text-terracotta hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {dictionary.allCategories}
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={buildBooksHref({ locale, search, category: category.slug, format: activeFormat })}
                aria-current={activeCategory === category.slug ? 'true' : undefined}
                className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors aria-[current=true]:text-terracotta hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <hr className="border-border" />

      <nav aria-label={dictionary.formats} className="space-y-4">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
          {dictionary.formats}
        </h2>
        <ul className="space-y-3">
          <li>
            <Link
              href={buildBooksHref({ locale, search, category: activeCategory })}
              aria-current={activeFormat ? undefined : 'true'}
              className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors aria-[current=true]:text-terracotta hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {dictionary.allFormats}
            </Link>
          </li>
          {BOOK_FORMATS.map((format) => (
            <li key={format}>
              <Link
                href={buildBooksHref({ locale, search, category: activeCategory, format })}
                aria-current={activeFormat === format ? 'true' : undefined}
                className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors aria-[current=true]:text-terracotta hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {getBookFormatLabel(format, dictionary.formatLabels)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border border-border bg-card p-5 text-card-foreground">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
          {dictionary.sidebarHeading}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{dictionary.sidebarBody}</p>
      </div>

      <div className="border border-border bg-card p-5 text-card-foreground">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
          {dictionary.followUsHeading}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{dictionary.followUsBody}</p>
        {socialLinks.length ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const Icon = SOCIAL_ICONS[link.platform]

              return (
                <Link
                  key={`${link.platform}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="inline-flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-terracotta hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}
