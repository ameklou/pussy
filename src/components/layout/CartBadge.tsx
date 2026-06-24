'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

import { useCartCount } from '@/store/cart'
import type { Locale } from '@/i18n/routing'
import { localizeUrl } from '@/lib/links'

type CartBadgeProps = {
  locale: Locale
  label: string
}

export function CartBadge({ locale, label }: CartBadgeProps) {
  const count = useCartCount()

  return (
    <Link
      href={localizeUrl('/cart', locale)}
      aria-label={label}
      className="relative p-1 text-muted-foreground transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ShoppingBag className="h-5 w-5" aria-hidden="true" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-semibold text-terracotta-foreground">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}
