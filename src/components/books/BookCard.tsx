import Image from 'next/image'
import Link from 'next/link'

import type { Locale } from '@/i18n/routing'
import { localizeUrl } from '@/lib/links'
import type { Book } from '@/payload-types'
import {
  type BookFormatLabels,
  formatBookPrice,
  getBookAuthors,
  getBookCategories,
  getBookCover,
  getBookFormatLabel,
  getPrimaryBookFormat,
} from './bookHelpers'

type BookCardProps = {
  readonly book: Book
  readonly locale: Locale
  readonly labels: BookFormatLabels
}

export function BookCard({ book, locale, labels }: BookCardProps) {
  const cover = getBookCover(book)
  const authors = getBookAuthors(book)
  const primaryCategory = getBookCategories(book)[0]
  const primaryFormat = getPrimaryBookFormat(book)

  return (
    <article className="grid gap-4 border-b border-border pb-6 sm:grid-cols-[minmax(8rem,12rem)_1fr]">
      <Link
        href={localizeUrl(`/books/${book.slug}`, locale)}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {cover?.url ? (
            <Image
              src={cover.url}
              alt={cover.alt || book.title}
              fill
              sizes="(max-width: 640px) 50vw, 12rem"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : null}
        </div>
      </Link>

      <div className="flex flex-col justify-between gap-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {primaryCategory ? <span className="text-terracotta">{primaryCategory.name}</span> : null}
            {primaryFormat ? <span>{getBookFormatLabel(primaryFormat, labels)}</span> : null}
          </div>

          <h2 className="font-heading text-xl font-semibold leading-snug text-foreground md:text-2xl">
            <Link
              href={localizeUrl(`/books/${book.slug}`, locale)}
              className="transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {book.title}
            </Link>
          </h2>

          {authors.length ? (
            <p className="text-sm leading-6 text-muted-foreground">
              {authors.map((author) => author.name).join(', ')}
            </p>
          ) : null}
        </div>

        <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground">
          {formatBookPrice(book, locale)}
        </p>
      </div>
    </article>
  )
}
