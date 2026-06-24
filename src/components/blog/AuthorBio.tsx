import Image from 'next/image'
import Link from 'next/link'

import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/routing'
import { localizeUrl } from '@/lib/links'
import type { Author, Media } from '@/payload-types'

type AuthorBioProps = {
  readonly author: Author
  readonly locale: Locale
}

function getMedia(avatar: number | Media | null | undefined): Media | null {
  if (!avatar || typeof avatar === 'number') return null
  return avatar
}

export function AuthorBio({ author, locale }: AuthorBioProps) {
  const dictionary = getDictionary(locale)
  const avatar = getMedia(author.avatar)

  return (
    <section className="space-y-4">
      {avatar?.url ? (
        <div className="relative h-20 w-20 overflow-hidden rounded-full bg-muted">
          <Image src={avatar.url} alt={avatar.alt || author.name} fill sizes="80px" className="object-cover" />
        </div>
      ) : null}

      <div className="space-y-2">
        <h2 className="font-heading text-lg font-semibold text-foreground">{author.name}</h2>
        {author.bio ? <p className="line-clamp-6 text-sm leading-6 text-muted-foreground">{author.bio}</p> : null}
      </div>

      <Link
        href={localizeUrl(`/authors/${author.slug}`, locale)}
        className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-terracotta transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {dictionary.blog.moreAbout}
      </Link>
    </section>
  )
}
