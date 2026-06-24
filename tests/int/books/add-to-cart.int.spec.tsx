import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { AddToCartButton } from '@/components/books/AddToCartButton'
import { CartBadge } from '@/components/layout/CartBadge'
import { useCart } from '@/store/cart'

describe('AddToCartButton', () => {
  afterEach(() => {
    cleanup()
    useCart.setState({ items: [] })
  })

  test('adds a book to the cart and updates the header badge', () => {
    render(
      <>
        <CartBadge locale="en" label="Shopping cart" />
        <AddToCartButton
          item={{ id: 'book-1:ebook', title: 'The Quiet Shelf - E-book', price: 18, quantity: 1 }}
          label="Add to cart"
          addedLabel="Added"
        />
      </>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }))

    expect(screen.getByRole('button', { name: 'Added' }).textContent).toContain('Added')
    expect(screen.getByLabelText('Shopping cart').textContent).toContain('1')
    expect(useCart.getState().items).toEqual([
      { id: 'book-1:ebook', title: 'The Quiet Shelf - E-book', price: 18, quantity: 1 },
    ])
  })
})
