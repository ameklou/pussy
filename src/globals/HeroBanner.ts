import type { GlobalConfig } from 'payload'

import { adminOrEditor, anyone } from '@/access/roles'

export const HeroBanner: GlobalConfig = {
  slug: 'hero-banner',
  access: {
    read: anyone,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaUrl',
      type: 'text',
    },
  ],
}
