import type { GlobalConfig } from 'payload'

import { adminOrEditor, anyone } from '@/access/roles'

export const MainNavigation: GlobalConfig = {
  slug: 'main-navigation',
  access: {
    read: anyone,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
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
