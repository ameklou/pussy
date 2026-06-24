import type { GlobalConfig } from 'payload'

import { adminOrEditor, anyone } from '@/access/roles'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: anyone,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'defaultSeoTitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'defaultSeoDescription',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'storeCurrency',
      type: 'select',
      required: true,
      defaultValue: 'eur',
      options: [
        { label: 'EUR', value: 'eur' },
        { label: 'USD', value: 'usd' },
        { label: 'GBP', value: 'gbp' },
        { label: 'XOF', value: 'xof' },
      ],
    },
  ],
}
