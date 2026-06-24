import en from './dictionaries/en.json'
import fr from './dictionaries/fr.json'
import type { Locale } from './routing'

type LayoutDictionary = {
  readonly cart: string
  readonly languages: Record<Locale, string>
}

type BlogDictionary = {
  readonly readMore: string
  readonly viewArchive: string
  readonly moreAbout: string
  readonly relatedPosts: string
  readonly by: string
  readonly categories: string
  readonly allPosts: string
  readonly noPosts: string
}

export type BookstoreDictionary = {
  readonly eyebrow: string
  readonly title: string
  readonly summary: string
  readonly searchLabel: string
  readonly searchPlaceholder: string
  readonly searchSubmit: string
  readonly categories: string
  readonly allCategories: string
  readonly formats: string
  readonly allFormats: string
  readonly noBooks: string
  readonly price: string
  readonly isbn: string
  readonly authors: string
  readonly addToCart: string
  readonly addedToCart: string
  readonly relatedBooks: string
  readonly backToCatalog: string
  readonly sidebarHeading: string
  readonly sidebarBody: string
  readonly followUsHeading: string
  readonly followUsBody: string
  readonly detailSidebarHeading: string
  readonly detailSidebarBody: string
  readonly formatLabels: {
    readonly paperback: string
    readonly hardcover: string
    readonly ebook: string
  }
}

type FoundationDictionary = {
  readonly foundation: {
    readonly eyebrow: string
    readonly heading: string
    readonly summary: string
  }
  readonly metadata: {
    readonly title: string
    readonly description: string
  }
  readonly layout: LayoutDictionary
  readonly blog: BlogDictionary
  readonly bookstore: BookstoreDictionary
}

const dictionaries = {
  en,
  fr,
} satisfies Record<Locale, FoundationDictionary>

export function getDictionary(locale: Locale): FoundationDictionary {
  return dictionaries[locale]
}
