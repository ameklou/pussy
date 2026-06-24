import config from '@payload-config'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import type { Where } from 'payload'

import { BlogSidebar } from '@/components/blog/BlogSidebar'
import { PostCard } from '@/components/blog/PostCard'
import { getDictionary } from '@/i18n/dictionaries'
import { DEFAULT_LOCALE, type Locale, isLocale } from '@/i18n/routing'
import { localizeUrl } from '@/lib/links'
import type { Category } from '@/payload-types'

type BlogPageProps = {
  readonly params: Promise<{
    readonly locale: string
  }>
  readonly searchParams: Promise<{
    readonly page?: string
    readonly category?: string
  }>
}

function buildBlogHref(locale: Locale, page: number, category?: string): string {
  const search = new URLSearchParams()
  if (page > 1) search.set('page', String(page))
  if (category) search.set('category', category)

  const query = search.toString()
  return query ? `${localizeUrl('/blog', locale)}?${query}` : localizeUrl('/blog', locale)
}

function getCategorySlug(category: number | Category | null | undefined): string | null {
  if (!category || typeof category === 'number') return null
  return category.slug
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params

  if (!isLocale(localeParam)) {
    return getDictionary(DEFAULT_LOCALE).metadata
  }

  return getDictionary(localeParam).metadata
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale: localeParam } = await params
  const query = await searchParams

  if (!isLocale(localeParam)) {
    redirect(`/${DEFAULT_LOCALE}`)
  }

  const locale = localeParam
  const dictionary = getDictionary(locale)
  const payload = await getPayload({ config })
  const currentPage = Number.parseInt(query.page ?? '1', 10)
  const page = Number.isNaN(currentPage) || currentPage < 1 ? 1 : currentPage
  const activeCategory = query.category?.trim() || undefined
  const now = new Date().toISOString()

  const andConditions: Array<Where> = [
    { publishedAt: { exists: true } },
    { publishedAt: { less_than_equal: now } },
  ]

  if (activeCategory) {
    andConditions.push({ 'categories.slug': { equals: activeCategory } })
  }

  const where: Where = { and: andConditions }

  const [postsResult, categoriesResult] = await Promise.all([
    payload.find({
      collection: 'posts',
      locale,
      overrideAccess: false,
      where,
      sort: '-publishedAt',
      page,
      limit: 6,
      depth: 2,
    }),
    payload.find({
      collection: 'categories',
      locale,
      overrideAccess: false,
      sort: 'name',
      depth: 0,
      limit: 100,
    }),
  ])

  const resultPage = postsResult.page ?? 1
  const archiveHref = buildBlogHref(
    locale,
    resultPage < postsResult.totalPages ? resultPage + 1 : 1,
    activeCategory,
  )

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-10">
          <header className="space-y-3 border-b border-border pb-6">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta">
              {dictionary.foundation.eyebrow}
            </p>
            <h1 className="font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              {dictionary.foundation.heading}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              {dictionary.foundation.summary}
            </p>
          </header>

          <nav aria-label={dictionary.blog.categories} className="overflow-x-auto pb-2">
            <ul className="flex min-w-max items-center gap-5">
              <li>
                <Link
                  href={localizeUrl('/blog', locale)}
                  className={`text-xs font-medium uppercase tracking-[0.22em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    activeCategory ? 'text-muted-foreground hover:text-terracotta' : 'text-terracotta'
                  }`}
                >
                  {dictionary.blog.allPosts}
                </Link>
              </li>
              {categoriesResult.docs.map((category) => {
                const isActive = activeCategory === getCategorySlug(category)
                return (
                  <li key={category.id}>
                    <Link
                      href={buildBlogHref(locale, 1, category.slug)}
                      className={`text-xs font-medium uppercase tracking-[0.22em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        isActive ? 'text-terracotta' : 'text-muted-foreground hover:text-terracotta'
                      }`}
                    >
                      {category.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {postsResult.docs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {postsResult.docs.map((post) => (
                <PostCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="text-base leading-7 text-muted-foreground">{dictionary.blog.noPosts}</p>
          )}

          {postsResult.totalPages > 1 ? (
            <nav className="flex items-center justify-between border-t border-border pt-8" aria-label="Pagination">
              <div>
                {postsResult.hasPrevPage ? (
                  <Link
                    href={buildBlogHref(locale, postsResult.prevPage ?? 1, activeCategory)}
                    className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    ← Previous
                  </Link>
                ) : null}
              </div>
              <div>
                {postsResult.hasNextPage ? (
                  <Link
                    href={buildBlogHref(locale, postsResult.nextPage ?? postsResult.totalPages, activeCategory)}
                    className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Next →
                  </Link>
                ) : null}
              </div>
            </nav>
          ) : null}

          <div className="border-t border-border pt-8">
            <Link
              href={archiveHref}
              className="text-xs font-medium uppercase tracking-[0.22em] text-terracotta transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {dictionary.blog.viewArchive}
            </Link>
          </div>
        </section>

        <aside className="lg:pt-[7.5rem]">
          <BlogSidebar locale={locale} />
        </aside>
      </div>
    </div>
  )
}
