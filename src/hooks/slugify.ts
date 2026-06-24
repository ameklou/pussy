import type { CollectionBeforeValidateHook } from 'payload'

import { slugify } from '@/lib/slugify'

type SlugField = 'title' | 'name'

export function generateSlugFromField(sourceField: SlugField = 'title'): CollectionBeforeValidateHook {
  return ({ data }) => {
    if (!data) return data

    const source = data[sourceField]

    if (typeof source === 'string' && source.trim().length > 0) {
      data.slug = slugify(source)
    }

    return data
  }
}
