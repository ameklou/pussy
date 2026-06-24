'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'

import type { CartItem } from '@/store/cart'
import { useCart } from '@/store/cart'

type AddToCartButtonProps = {
  readonly item: CartItem
  readonly label: string
  readonly addedLabel: string
}

export function AddToCartButton({ item, label, addedLabel }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem)
  const [added, setAdded] = useState(false)

  return (
    <button
      type="button"
      onClick={() => {
        addItem(item)
        setAdded(true)
      }}
      className="inline-flex min-h-9 items-center justify-center gap-2 border border-terracotta bg-terracotta px-4 py-2 text-sm font-medium text-terracotta-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px"
    >
      {added ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
      {added ? addedLabel : label}
    </button>
  )
}
