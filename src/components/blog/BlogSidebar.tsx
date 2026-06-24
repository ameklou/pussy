import config from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'

import { localizeUrl } from '@/lib/links'
import type { Locale } from '@/i18n/routing'
import type { BlogSidebar as BlogSidebarType } from '@/payload-types'

type BlogSidebarProps = {
  readonly locale: Locale
}

export async function BlogSidebar({ locale }: BlogSidebarProps) {
  const payload = await getPayload({ config })
  const sidebar = (await payload.findGlobal({
    slug: 'blog-sidebar',
    locale,
  })) as BlogSidebarType

  const sections = sidebar.sections ?? []

  if (sections.length === 0) {
    return null
  }

  return (
    <div>
      {sections.map((section, index) => (
        <div key={section.id ?? `${section.heading}-${index}`}>
          <div className="space-y-2">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
              {section.heading}
            </h2>
            {section.body ? <p className="text-sm leading-6 text-muted-foreground">{section.body}</p> : null}
            {section.url && section.urlLabel ? (
              <Link
                href={localizeUrl(section.url, locale)}
                className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-terracotta transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {section.urlLabel}
              </Link>
            ) : null}
          </div>

          {index < sections.length - 1 ? <hr className="my-6 border-border" /> : null}
        </div>
      ))}
    </div>
  )
}
