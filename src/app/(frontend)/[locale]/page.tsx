import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getDictionary } from '@/i18n/dictionaries'
import { DEFAULT_LOCALE, LOCALES, type Locale, isLocale } from '@/i18n/routing'
import { HeroBanner } from '@/components/home/HeroBanner'
import { FeaturedCards } from '@/components/home/FeaturedCards'

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

  const locale = localeParam

  return (
    <div className="space-y-0">
      <HeroBanner locale={locale} />
      <section className="mx-auto max-w-[1200px] px-6 py-8 md:px-8 lg:px-12">
        <FeaturedCards locale={locale} />
      </section>
    </div>
  )
}
