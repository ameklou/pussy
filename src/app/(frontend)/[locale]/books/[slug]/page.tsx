import config from '@payload-config'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'

import { AddToCartButton } from '@/components/books/AddToCartButton'
import { BookDetailSidebar } from '@/components/books/BookDetailSidebar'
import {
  formatPrice,
  getBookAuthors,
  getBookCategories,
  getBookCover,
  getBookFormatLabel,
} from '@/components/books/bookHelpers'
import { LexicalRenderer } from '@/components/blog/LexicalRenderer'
import { getDictionary } from '@/i18n/dictionaries'
import { DEFAULT_LOCALE, type Locale, isLocale } from '@/i18n/routing'
import { localizeUrl } from '@/lib/links'
import type { Book } from '@/payload-types'

type BookPageProps = {
  readonly params: Promise<{
    readonly locale: string
    readonly slug: string
  }>
}

async function getBook(locale: Locale, slug: string): Promise<Book | null> {
  const payload = await getPayload({ config })
  const now = new Date().toISOString()
  const result = await payload.find({
    collection: 'books',
    locale,
    overrideAccess: false,
    where: {
      and: [
        { slug: { equals: slug } },
        { publishedAt: { exists: true } },
        { publishedAt: { less_than_equal: now } },
      ],
    },
    depth: 2,
    limit: 1,
  })

  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params

  if (!isLocale(localeParam)) {
    return getDictionary(DEFAULT_LOCALE).metadata
  }

  const book = await getBook(localeParam, slug)
  const dictionary = getDictionary(localeParam)

  if (!book) {
    return dictionary.metadata
  }

  return {
    title: `${book.title} | Chaatde`,
    description: dictionary.bookstore.summary,
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const { locale: localeParam, slug } = await params

  if (!isLocale(localeParam)) {
    redirect(`/${DEFAULT_LOCALE}`)
  }

  const locale: Locale = localeParam
  const dictionary = getDictionary(locale)
  const book = await getBook(locale, slug)

  if (!book) {
    notFound()
  }

  const payload = await getPayload({ config })
  const cover = getBookCover(book)
  const authors = getBookAuthors(book)
  const categories = getBookCategories(book)
  const relatedResult = categories.length
    ? await payload.find({
        collection: 'books',
        locale,
        overrideAccess: false,
        where: {
          and: [
            { id: { not_equals: book.id } },
            { 'categories.id': { in: categories.map((category) => category.id) } },
            { publishedAt: { exists: true } },
            { publishedAt: { less_than_equal: new Date().toISOString() } },
          ],
        },
        sort: '-publishedAt',
        limit: 3,
        depth: 2,
      })
    : { docs: [] }

  return (
    <article className="mx-auto max-w-[1200px] px-6 py-12 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          <div>
            {categories.length ? (
              <div className="mb-4 flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`${localizeUrl('/books', locale)}?category=${category.slug}`}
                    className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            ) : null}

            <h1 className="font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              {book.title}
            </h1>

            {authors.length ? (
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {dictionary.bookstore.authors}: {authors.map((author) => author.name).join(', ')}
              </p>
            ) : null}
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(14rem,20rem)_1fr]">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              {cover?.url ? (
                <Image
                  src={cover.url}
                  alt={cover.alt || book.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 20rem"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="space-y-6">
              <dl className="grid gap-4 border-b border-border pb-6 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    {dictionary.bookstore.price}
                  </dt>
                  <dd className="mt-1 font-medium text-foreground">{formatPrice(book.price, book.currency, locale)}</dd>
                </div>
                {book.isbn ? (
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      {dictionary.bookstore.isbn}
                    </dt>
                    <dd className="mt-1 text-foreground">{book.isbn}</dd>
                  </div>
                ) : null}
              </dl>

              <section className="space-y-4">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
                  {dictionary.bookstore.formats}
                </h2>
                <div className="space-y-3">
                  {(book.formats ?? []).map((format) => {
                    const formatLabel = getBookFormatLabel(format.type, dictionary.bookstore.formatLabels)
                    return (
                      <div
                        key={format.id ?? format.type}
                        className="flex flex-wrap items-center justify-between gap-3 border border-border p-4"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{formatLabel}</p>
                          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            {formatPrice(format.price, book.currency, locale)}
                          </p>
                        </div>
                        <AddToCartButton
                          item={{
                            id: `${book.id}:${format.type}`,
                            title: `${book.title} - ${formatLabel}`,
                            price: format.price,
                            quantity: 1,
                          }}
                          label={dictionary.bookstore.addToCart}
                          addedLabel={dictionary.bookstore.addedToCart}
                        />
                      </div>
                    )
                  })}
                  {book.formats?.length ? null : (
                    <AddToCartButton
                      item={{ id: String(book.id), title: book.title, price: book.price, quantity: 1 }}
                      label={dictionary.bookstore.addToCart}
                      addedLabel={dictionary.bookstore.addedToCart}
                    />
                  )}
                </div>
              </section>
            </div>
          </div>

          {book.description ? (
            <section className="border-t border-border pt-8">
              <LexicalRenderer content={book.description} />
            </section>
          ) : null}
        </div>

        <aside className="space-y-8 lg:pt-12">
          <BookDetailSidebar locale={locale} relatedBooks={relatedResult.docs} dictionary={dictionary.bookstore} />
        </aside>
      </div>
    </article>
  )
}
