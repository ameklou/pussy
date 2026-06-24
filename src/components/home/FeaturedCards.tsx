import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { Locale } from '@/i18n/routing'
import { localizeUrl } from '@/lib/links'

import type { FeaturedItem, Media } from '@/payload-types'

type FeaturedCardsProps = {
  locale: Locale
}

export async function FeaturedCards({ locale }: FeaturedCardsProps) {
  const payload = await getPayload({ config })
  const featured = await payload.findGlobal({
    slug: 'featured-items',
    locale,
  })

  const { items } = featured as FeaturedItem
  const cards = (items ?? []).slice(0, 2)

  if (cards.length === 0) return null

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {cards.map((item, index) => {
        const media = item.image as Media | undefined
        const imageUrl = media?.url
        const rawUrl = item.url && item.url.trim().length > 0 ? item.url : '/'
        const href = item.type === 'external' ? rawUrl : localizeUrl(rawUrl, locale)
        const isExternal = item.type === 'external'

        return (
          <Link
            key={index}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="group flex items-center gap-4 bg-terracotta p-4 text-terracotta-foreground transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-terracotta-foreground/10">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={media?.alt || item.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xs font-semibold uppercase tracking-wider">
                {item.title}
              </h2>
              {item.subtitle ? (
                <p className="mt-1 truncate text-sm text-terracotta-foreground/80">
                  {item.subtitle}
                </p>
              ) : null}
            </div>

            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-terracotta-foreground/30 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </div>
          </Link>
        )
      })}
    </section>
  )
}
