import config from '@payload-config'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'

import { PostCard } from '@/components/blog/PostCard'
import { getDictionary } from '@/i18n/dictionaries'
import { DEFAULT_LOCALE, isLocale } from '@/i18n/routing'
import type { Author, Media } from '@/payload-types'

type AuthorPageProps = {
  readonly params: Promise<{
    readonly locale: string
    readonly slug: string
  }>
}

function getMedia(media: number | Media | null | undefined): Media | null {
  if (!media || typeof media === 'number') return null
  return media
}

async function getAuthor(locale: 'en' | 'fr', slug: string): Promise<Author | null> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'authors',
    locale,
    overrideAccess: false,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 1,
  })

  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params

  if (!isLocale(localeParam)) {
    return getDictionary(DEFAULT_LOCALE).metadata
  }

  const author = await getAuthor(localeParam, slug)

  if (!author) {
    return getDictionary(localeParam).metadata
  }

  return {
    title: `${author.name} | Chaatde`,
    description: author.bio || getDictionary(localeParam).metadata.description,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { locale: localeParam, slug } = await params

  if (!isLocale(localeParam)) {
    redirect(`/${DEFAULT_LOCALE}`)
  }

  const locale = localeParam
  const payload = await getPayload({ config })
  const author = await getAuthor(locale, slug)

  if (!author) {
    notFound()
  }

  const avatar = getMedia(author.avatar)
  const now = new Date().toISOString()
  const posts = await payload.find({
    collection: 'posts',
    locale,
    overrideAccess: false,
    where: {
      and: [
        { 'author.id': { equals: author.id } },
        { publishedAt: { exists: true } },
        { publishedAt: { less_than_equal: now } },
      ],
    },
    sort: '-publishedAt',
    depth: 2,
    limit: 12,
  })

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-8 lg:px-12">
      <div className="space-y-8 border-b border-border pb-8">
        {avatar?.url ? (
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-muted">
            <Image src={avatar.url} alt={avatar.alt || author.name} fill sizes="96px" className="object-cover" />
          </div>
        ) : null}

        <div className="space-y-3">
          <h1 className="font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            {author.name}
          </h1>
          {author.bio ? <p className="max-w-3xl text-base leading-7 text-muted-foreground">{author.bio}</p> : null}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {posts.docs.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  )
}
