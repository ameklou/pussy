import Link from 'next/link'

import type { BookstoreDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/routing'
import { localizeUrl } from '@/lib/links'
import type { Book } from '@/payload-types'
import { formatBookPrice, getBookAuthors } from './bookHelpers'

type BookDetailSidebarProps = {
  readonly locale: Locale
  readonly relatedBooks: readonly Book[]
  readonly dictionary: BookstoreDictionary
}

export function BookDetailSidebar({ locale, relatedBooks, dictionary }: BookDetailSidebarProps) {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
          {dictionary.detailSidebarHeading}
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">{dictionary.detailSidebarBody}</p>
        <Link
          href={localizeUrl('/books', locale)}
          className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-terracotta transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {dictionary.backToCatalog}
        </Link>
      </section>

      {relatedBooks.length ? (
        <section>
          <hr className="mb-6 border-border" />
          <h2 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
            {dictionary.relatedBooks}
          </h2>
          <div className="space-y-4">
            {relatedBooks.map((book) => {
              const authors = getBookAuthors(book)

              return (
                <article key={book.id} className="space-y-1 border-b border-border pb-4 last:border-b-0">
                  <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
                    <Link
                      href={localizeUrl(`/books/${book.slug}`, locale)}
                      className="transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {book.title}
                    </Link>
                  </h3>
                  {authors.length ? (
                    <p className="text-sm leading-6 text-muted-foreground">
                      {authors.map((author) => author.name).join(', ')}
                    </p>
                  ) : null}
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {formatBookPrice(book, locale)}
                  </p>
                </article>
              )
            })}
          </div>
        </section>
      ) : null}
    </div>
  )
}
