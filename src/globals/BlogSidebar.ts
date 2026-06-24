import type { GlobalConfig } from 'payload'

import { adminOrEditor, anyone } from '@/access/roles'

export const BlogSidebar: GlobalConfig = {
  slug: 'blog-sidebar',
  access: {
    read: anyone,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'body',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'urlLabel',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}
