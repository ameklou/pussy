import type { Author, Book, Category, Media } from '@/payload-types'

export const BOOK_FORMATS = ['paperback', 'hardcover', 'ebook'] as const

export type BookFormatValue = (typeof BOOK_FORMATS)[number]

export type BookFormatLabels = Record<BookFormatValue, string>

export function getBookAuthors(book: Book): readonly Author[] {
  return (book.authors ?? []).filter((author): author is Author => typeof author !== 'number')
}

export function getBookCategories(book: Book): readonly Category[] {
  return (book.categories ?? []).filter((category): category is Category => typeof category !== 'number')
}

export function getBookCover(book: Book): Media | null {
  const cover = book.coverImage
  if (!cover || typeof cover === 'number') return null
  return cover
}

export function getBookFormatLabel(format: BookFormatValue, labels: BookFormatLabels): string {
  return labels[format]
}

export function formatBookPrice(book: Book, locale: string): string {
  return formatPrice(book.price, book.currency, locale)
}

export function formatPrice(price: number, currency: Book['currency'], locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price)
}

export function getPrimaryBookFormat(book: Book): BookFormatValue | null {
  const format = book.formats?.[0]
  return format?.type ?? null
}
