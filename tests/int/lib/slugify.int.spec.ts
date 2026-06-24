import { describe, expect, it } from 'vitest'

import { slugify } from '@/lib/slugify'

describe('slugify', () => {
  it('lowercases and trims input', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world')
  })

  it('replaces spaces and repeated whitespace with a single hyphen', () => {
    expect(slugify('Hello   World')).toBe('hello-world')
  })

  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world')
  })

  it('removes diacritics', () => {
    expect(slugify('Café Français')).toBe('cafe-francais')
  })

  it('collapses multiple hyphens', () => {
    expect(slugify('Hello--World!!')).toBe('hello-world')
  })
})
