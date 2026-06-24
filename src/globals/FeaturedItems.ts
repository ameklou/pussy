import type { GlobalConfig } from 'payload'

import { adminOrEditor, anyone } from '@/access/roles'

export const FeaturedItems: GlobalConfig = {
  slug: 'featured-items',
  access: {
    read: anyone,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      maxRows: 2,
      fields: [
        {
          name: 'title',
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
          name: 'url',
          type: 'text',
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'internal',
          options: [
            { label: 'Internal', value: 'internal' },
            { label: 'External', value: 'external' },
          ],
        },
      ],
    },
  ],
}
