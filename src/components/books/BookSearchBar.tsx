'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { FormEvent } from 'react'

type BookSearchBarProps = {
  readonly initialSearch: string
  readonly label: string
  readonly placeholder: string
  readonly submitLabel: string
}

export function BookSearchBar({ initialSearch, label, placeholder, submitLabel }: BookSearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextParams = new URLSearchParams(searchParams.toString())
    const value = new FormData(event.currentTarget).get('search')
    const search = typeof value === 'string' ? value.trim() : ''

    if (search) {
      nextParams.set('search', search)
    } else {
      nextParams.delete('search')
    }

    const query = nextParams.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <form
      key={initialSearch}
      role="search"
      onSubmit={handleSubmit}
      className="grid gap-3 border-b border-border pb-6 sm:grid-cols-[1fr_auto]"
    >
      <label className="sr-only" htmlFor="book-search">
        {label}
      </label>
      <input
        id="book-search"
        name="search"
        type="search"
        defaultValue={initialSearch}
        placeholder={placeholder}
        aria-label={label}
        className="min-h-10 border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
      />
      <button
        type="submit"
        className="min-h-10 border border-border px-4 text-xs font-medium uppercase tracking-[0.22em] text-foreground transition-colors hover:border-terracotta hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {submitLabel}
      </button>
    </form>
  )
}
