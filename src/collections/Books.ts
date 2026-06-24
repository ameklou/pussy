import type { CollectionConfig } from 'payload'

import { adminOrEditor, publishedOrAdmin } from '@/access/roles'
import { generateSlugFromField } from '@/hooks/slugify'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isbn', 'price', 'publishedAt', 'createdAt'],
  },
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: publishedOrAdmin,
    update: adminOrEditor,
  },
  hooks: {
    beforeValidate: [generateSlugFromField('title')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        step: 0.01,
      },
    },
    {
      name: 'currency',
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
    {
      name: 'isbn',
      type: 'text',
      unique: true,
      index: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'authors',
      hasMany: true,
      maxDepth: 2,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      maxDepth: 1,
    },
    {
      name: 'formats',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Paperback', value: 'paperback' },
            { label: 'Hardcover', value: 'hardcover' },
            { label: 'E-book', value: 'ebook' },
          ],
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            step: 0.01,
          },
        },
        {
          name: 'stock',
          type: 'number',
          required: true,
          defaultValue: 0,
          min: 0,
          admin: {
            step: 1,
          },
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
