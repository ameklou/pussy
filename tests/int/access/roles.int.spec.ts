import { describe, expect, it } from 'vitest'

import { hasRole, isAdminOrEditor, publishedOrAdmin } from '@/access/roles'
import type { User } from '@/payload-types'

describe('hasRole', () => {
  it('returns false when user is null', () => {
    expect(hasRole(null, ['admin'])).toBe(false)
  })

  it('returns false when user has no roles', () => {
    const user = { id: 1, email: 'user@example.com', collection: 'users' } as User
    expect(hasRole(user, ['admin'])).toBe(false)
  })

  it('returns true when user has one of the requested roles', () => {
    const user = {
      id: 1,
      email: 'editor@example.com',
      collection: 'users',
      roles: ['editor'],
    } as User
    expect(hasRole(user, ['admin', 'editor'])).toBe(true)
  })

  it('returns false when user has no matching roles', () => {
    const user = {
      id: 1,
      email: 'editor@example.com',
      collection: 'users',
      roles: ['editor'],
    } as User
    expect(hasRole(user, ['admin'])).toBe(false)
  })
})

describe('isAdminOrEditor', () => {
  it('returns true for admin', () => {
    const user = { id: 1, email: 'admin@example.com', collection: 'users', roles: ['admin'] } as User
    expect(isAdminOrEditor(user)).toBe(true)
  })

  it('returns true for editor', () => {
    const user = { id: 1, email: 'editor@example.com', collection: 'users', roles: ['editor'] } as User
    expect(isAdminOrEditor(user)).toBe(true)
  })
})

describe('publishedOrAdmin', () => {
  it('returns true for admin users', () => {
    const req = { user: { id: 1, email: 'admin@example.com', collection: 'users', roles: ['admin'] } as User }
    expect(publishedOrAdmin({ req } as never)).toBe(true)
  })

  it('returns true for editor users', () => {
    const req = { user: { id: 1, email: 'editor@example.com', collection: 'users', roles: ['editor'] } as User }
    expect(publishedOrAdmin({ req } as never)).toBe(true)
  })

  it('returns a publishedAt query for anonymous users', () => {
    const req = { user: null }
    const result = publishedOrAdmin({ req } as never)

    expect(result).toEqual({
      and: [
        { publishedAt: { exists: true } },
        { publishedAt: { less_than_equal: expect.any(String) } },
      ],
    })
  })
})
