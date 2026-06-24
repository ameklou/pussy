import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

import type { Locale } from '@/i18n/routing'
import { localizeUrl } from '@/lib/links'

import type { Footer as FooterType } from '@/payload-types'

type FooterProps = {
  locale: Locale
}

export async function Footer({ locale }: FooterProps) {
  const payload = await getPayload({ config })
  const footer = await payload.findGlobal({
    slug: 'footer',
    locale,
  })

  const { copyright, privacyLink } = footer as FooterType

  return (
    <footer className="bg-terracotta text-terracotta-foreground">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 py-6 text-center md:flex-row md:px-8 lg:px-12">
        {copyright ? (
          <p className="text-sm">{copyright}</p>
        ) : (
          <p className="text-sm">© {new Date().getFullYear()}</p>
        )}

        {privacyLink?.url && (
          <Link
            href={
              privacyLink.url.startsWith('http')
                ? privacyLink.url
                : localizeUrl(privacyLink.url, locale)
            }
            target={privacyLink.url.startsWith('http') ? '_blank' : undefined}
            rel={privacyLink.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-sm underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {privacyLink.label}
          </Link>
        )}
      </div>
    </footer>
  )
}
