import en from './dictionaries/en.json'
import fr from './dictionaries/fr.json'
import type { Locale } from './routing'

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
}

const dictionaries = {
  en,
  fr,
} satisfies Record<Locale, FoundationDictionary>

export function getDictionary(locale: Locale): FoundationDictionary {
  return dictionaries[locale]
}
