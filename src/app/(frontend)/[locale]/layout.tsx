import { Inter, Fraunces } from 'next/font/google'
import { redirect } from 'next/navigation'

import type { Locale } from '@/i18n/routing'
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/i18n/routing'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

type LocaleLayoutProps = {
  readonly children: React.ReactNode
  readonly params: Promise<{
    readonly locale: string
  }>
}

export function generateStaticParams(): Array<{ locale: Locale }> {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    redirect(`/${DEFAULT_LOCALE}`)
  }

  const locale = localeParam

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-[100dvh] flex-col font-sans antialiased">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}
