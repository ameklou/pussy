import config from '@payload-config'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'

import { AuthorBio } from '@/components/blog/AuthorBio'
import { LexicalRenderer } from '@/components/blog/LexicalRenderer'
import { getDictionary } from '@/i18n/dictionaries'
import { DEFAULT_LOCALE, isLocale } from '@/i18n/routing'
import { localizeUrl } from '@/lib/links'
import type { Author, Category, Media, Post } from '@/payload-types'

type BlogPostPageProps = {
  readonly params: Promise<{
    readonly locale: string
    readonly slug: string
  }>
}

function getAuthor(author: number | Author | null | undefined): Author | null {
  if (!author || typeof author === 'number') return null
  return author
}

function getMedia(media: number | Media | null | undefined): Media | null {
  if (!media || typeof media === 'number') return null
  return media
}

function getCategories(categories: ReadonlyArray<number | Category> | null | undefined): ReadonlyArray<Category> {
  return (categories ?? []).filter((category): category is Category => typeof category !== 'number')
}

function formatPublishedDate(value: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value))
}

async function getPost(locale: 'en' | 'fr', slug: string): Promise<Post | null> {
  const payload = await getPayload({ config })
  const now = new Date().toISOString()
  const result = await payload.find({
    collection: 'posts',
    locale,
    overrideAccess: false,
    where: {
      and: [
        { slug: { equals: slug } },
        { publishedAt: { exists: true } },
        { publishedAt: { less_than_equal: now } },
      ],
    },
    depth: 2,
    limit: 1,
  })

  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params

  if (!isLocale(localeParam)) {
    return getDictionary(DEFAULT_LOCALE).metadata
  }

  const post = await getPost(localeParam, slug)

  if (!post) {
    return getDictionary(localeParam).metadata
  }

  return {
    title: `${post.title} | Chaatde`,
    description: post.excerpt || getDictionary(localeParam).metadata.description,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale: localeParam, slug } = await params

  if (!isLocale(localeParam)) {
    redirect(`/${DEFAULT_LOCALE}`)
  }

  const locale = localeParam
  const dictionary = getDictionary(locale)
  const post = await getPost(locale, slug)

  if (!post) {
    notFound()
  }

  const payload = await getPayload({ config })
  const author = getAuthor(post.author)
  const categories = getCategories(post.categories)
  const featuredImage = getMedia(post.featuredImage)
  const now = new Date().toISOString()

  const relatedResult = categories.length
    ? await payload.find({
        collection: 'posts',
        locale,
        overrideAccess: false,
        where: {
          and: [
            { id: { not_equals: post.id } },
            { 'categories.id': { in: categories.map((category) => category.id) } },
            { publishedAt: { exists: true } },
            { publishedAt: { less_than_equal: now } },
          ],
        },
        sort: '-publishedAt',
        limit: 3,
        depth: 1,
      })
    : { docs: [] as Post[] }

  return (
    <article className="mx-auto max-w-[1200px] px-6 py-12 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr]">
        <div>
          {categories.length ? (
            <div className="mb-4 flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`${localizeUrl('/blog', locale)}?category=${category.slug}`}
                  className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          ) : null}

          <h1 className="font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {author ? <span>{`${dictionary.blog.by} ${author.name}`}</span> : null}
            {author && post.publishedAt ? <span>·</span> : null}
            {post.publishedAt ? <span>{formatPublishedDate(post.publishedAt, locale)}</span> : null}
          </div>

          {featuredImage?.url ? (
            <div className="relative mt-8 aspect-video overflow-hidden bg-muted">
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt || post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="mt-8">
            <LexicalRenderer content={post.content as Record<string, unknown>} />
          </div>
        </div>

        <aside className="space-y-8 lg:pt-12">
          {author ? <AuthorBio author={author} locale={locale} /> : null}

          {relatedResult.docs.length ? (
            <section>
              <hr className="mb-6 border-border" />
              <h2 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.22em] text-foreground">
                {dictionary.blog.relatedPosts}
              </h2>
              <div className="space-y-4">
                {relatedResult.docs.map((relatedPost) => (
                  <article key={relatedPost.id} className="space-y-1 border-b border-border pb-4 last:border-b-0">
                    <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
                      <Link
                        href={localizeUrl(`/blog/${relatedPost.slug}`, locale)}
                        className="transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    {relatedPost.publishedAt ? (
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {formatPublishedDate(relatedPost.publishedAt, locale)}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </article>
  )
}
