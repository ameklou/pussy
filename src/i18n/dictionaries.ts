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
}

const dictionaries = {
  en,
  fr,
} satisfies Record<Locale, FoundationDictionary>

export function getDictionary(locale: Locale): FoundationDictionary {
  return dictionaries[locale]
}
