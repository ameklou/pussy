import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/roles'
import { USER_ROLES } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    admin: ({ req }) => isAdminOrEditor(req.user),
    create: ({ req }) => isAdminOrEditor(req.user),
    delete: ({ req }) => isAdminOrEditor(req.user),
    read: ({ req }) => isAdminOrEditor(req.user),
    update: ({ req }) => isAdminOrEditor(req.user),
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      options: [...USER_ROLES],
      saveToJWT: true,
      required: true,
    },
  ],
}
