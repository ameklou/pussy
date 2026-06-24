import config from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import type { Where } from 'payload'

import { BookCard } from '@/components/books/BookCard'
import { BookFilters } from '@/components/books/BookFilters'
import { BookSearchBar } from '@/components/books/BookSearchBar'
import { BOOK_FORMATS, type BookFormatValue } from '@/components/books/bookHelpers'
import { getDictionary } from '@/i18n/dictionaries'
import { DEFAULT_LOCALE, type Locale, isLocale } from '@/i18n/routing'

type BooksPageProps = {
  readonly params: Promise<{
    readonly locale: string
  }>
  readonly searchParams: Promise<{
    readonly search?: string
    readonly category?: string
    readonly format?: string
  }>
}

function normalizeParam(value: string | undefined): string | undefined {
  const normalized = value?.trim()
  return normalized ? normalized : undefined
}

function getActiveFormat(value: string | undefined): BookFormatValue | undefined {
  return BOOK_FORMATS.find((format) => format === value)
}

function buildBooksWhere(input: {
  readonly search?: string
  readonly category?: string
  readonly format?: BookFormatValue
}): Where {
  const now = new Date().toISOString()
  const andConditions: Array<Where> = [
    { publishedAt: { exists: true } },
    { publishedAt: { less_than_equal: now } },
  ]

  if (input.search) {
    andConditions.push({
      or: [{ title: { contains: input.search } }, { 'authors.name': { contains: input.search } }],
    })
  }

  if (input.category) {
    andConditions.push({ 'categories.slug': { equals: input.category } })
  }

  if (input.format) {
    andConditions.push({ 'formats.type': { equals: input.format } })
  }

  return { and: andConditions }
}

export async function generateMetadata({ params }: BooksPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    return getDictionary(DEFAULT_LOCALE).metadata
  }

  const dictionary = getDictionary(localeParam)

  return {
    title: `${dictionary.bookstore.title} | Chaatde`,
    description: dictionary.bookstore.summary,
  }
}

export default async function BooksPage({ params, searchParams }: BooksPageProps) {
  const { locale: localeParam } = await params
  const query = await searchParams

  if (!isLocale(localeParam)) {
    redirect(`/${DEFAULT_LOCALE}`)
  }

  const locale: Locale = localeParam
  const dictionary = getDictionary(locale)
  const search = normalizeParam(query.search)
  const activeCategory = normalizeParam(query.category)
  const activeFormat = getActiveFormat(normalizeParam(query.format))
  const payload = await getPayload({ config })

  const [booksResult, categoriesResult] = await Promise.all([
    payload.find({
      collection: 'books',
      locale,
      overrideAccess: false,
      where: buildBooksWhere({ search, category: activeCategory, format: activeFormat }),
      sort: '-publishedAt',
      limit: 12,
      depth: 2,
    }),
    payload.find({
      collection: 'categories',
      locale,
      overrideAccess: false,
      sort: 'name',
      depth: 0,
      limit: 100,
    }),
  ])

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-10">
          <header className="space-y-3 border-b border-border pb-6">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta">
              {dictionary.bookstore.eyebrow}
            </p>
            <h1 className="font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              {dictionary.bookstore.title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              {dictionary.bookstore.summary}
            </p>
          </header>

          <BookSearchBar
            initialSearch={search ?? ''}
            label={dictionary.bookstore.searchLabel}
            placeholder={dictionary.bookstore.searchPlaceholder}
            submitLabel={dictionary.bookstore.searchSubmit}
          />

          {booksResult.docs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {booksResult.docs.map((book) => (
                <BookCard key={book.id} book={book} locale={locale} labels={dictionary.bookstore.formatLabels} />
              ))}
            </div>
          ) : (
            <p className="text-base leading-7 text-muted-foreground">{dictionary.bookstore.noBooks}</p>
          )}
        </section>

        <aside className="lg:pt-[7.5rem]">
          <BookFilters
            locale={locale}
            categories={categoriesResult.docs}
            activeCategory={activeCategory}
            activeFormat={activeFormat}
            search={search}
            dictionary={dictionary.bookstore}
          />
        </aside>
      </div>
    </div>
  )
}
