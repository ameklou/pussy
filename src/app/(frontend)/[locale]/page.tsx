import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getDictionary } from '@/i18n/dictionaries'
import { DEFAULT_LOCALE, LOCALES, type Locale, isLocale } from '@/i18n/routing'

type LocalePageProps = {
  readonly params: Promise<{
    readonly locale: string
  }>
}

export function generateStaticParams(): Array<{ locale: Locale }> {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    return getDictionary(DEFAULT_LOCALE).metadata
  }

  return getDictionary(localeParam).metadata
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    redirect(`/${DEFAULT_LOCALE}`)
  }

  const dictionary = getDictionary(localeParam)

  return (
    <section className="mx-auto grid min-h-[100dvh] max-w-[1200px] content-center gap-8 px-6 py-16 md:px-8 lg:px-12">
      <div className="max-w-[720px] space-y-6">
        <p className="text-sm font-medium text-muted-foreground">{dictionary.foundation.eyebrow}</p>
        <h1 className="text-balance font-heading text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
          {dictionary.foundation.heading}
        </h1>
        <p className="max-w-[720px] text-lg leading-7 text-muted-foreground">
          {dictionary.foundation.summary}
        </p>
      </div>
    </section>
  )
}
