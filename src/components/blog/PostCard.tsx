import Image from 'next/image'
import Link from 'next/link'

import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/routing'
import { localizeUrl } from '@/lib/links'
import type { Category, Media, Post } from '@/payload-types'

type PostCardProps = {
  readonly post: Post
  readonly locale: Locale
}

function getCategoryName(category: number | Category | null | undefined): string | null {
  if (!category || typeof category === 'number') return null
  return category.name
}

function getMedia(media: number | Media | null | undefined): Media | null {
  if (!media || typeof media === 'number') return null
  return media
}

export function PostCard({ post, locale }: PostCardProps) {
  const dictionary = getDictionary(locale)
  const featuredImage = getMedia(post.featuredImage)
  const primaryCategory = getCategoryName(post.categories?.[0])

  return (
    <article className="space-y-4 border-b border-border pb-6">
      <Link
        href={localizeUrl(`/blog/${post.slug}`, locale)}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {featuredImage?.url ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : null}
        </div>
      </Link>

      <div className="space-y-3">
        {primaryCategory ? (
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta">
            {primaryCategory}
          </p>
        ) : null}

        <h3 className="font-heading text-xl font-semibold leading-snug text-foreground md:text-2xl">
          <Link
            href={localizeUrl(`/blog/${post.slug}`, locale)}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt ? (
          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
        ) : null}

        <Link
          href={localizeUrl(`/blog/${post.slug}`, locale)}
          className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-terracotta transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {dictionary.blog.readMore}
        </Link>
      </div>
    </article>
  )
}
