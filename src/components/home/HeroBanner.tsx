import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'

import type { Locale } from '@/i18n/routing'
import { localizeUrl } from '@/lib/links'

import type { HeroBanner as HeroBannerType, Media } from '@/payload-types'

type HeroBannerProps = {
  locale: Locale
}

export async function HeroBanner({ locale }: HeroBannerProps) {
  const payload = await getPayload({ config })
  const hero = await payload.findGlobal({
    slug: 'hero-banner',
    locale,
  })

  const { heading, subtitle, image, ctaLabel, ctaUrl } = hero as HeroBannerType
  const media = image as Media | undefined
  const imageUrl = media?.url
  const altText = media?.alt || heading || ''

  return (
    <section className="grid min-h-[400px] grid-cols-1 md:grid-cols-[2fr_3fr]">
      <div className="flex flex-col justify-center bg-terracotta px-6 py-12 text-terracotta-foreground md:px-8 lg:px-12">
        <div className="max-w-md space-y-4">
          <h1 className="font-heading text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
            {heading}
          </h1>
          {subtitle ? (
            <p className="text-base leading-relaxed text-terracotta-foreground/90 md:text-lg">
              {subtitle}
            </p>
          ) : null}
          {ctaLabel && ctaUrl ? (
            <Link
              href={localizeUrl(ctaUrl, locale)}
              className="inline-block text-xs font-medium uppercase tracking-wider underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {ctaLabel} →
            </Link>
          ) : null}
        </div>

        <div className="mt-8 flex gap-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-terracotta-foreground" />
          <span className="h-2 w-2 rounded-full bg-terracotta-foreground/40" />
          <span className="h-2 w-2 rounded-full bg-terracotta-foreground/40" />
        </div>
      </div>

      <div className="relative min-h-[300px] bg-muted md:min-h-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={altText}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
        ) : null}
      </div>
    </section>
  )
}
