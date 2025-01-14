import { v4 } from 'uuid'

import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.id) {
          return { ...data, id: v4() }
        }
        return data
      },
    ],
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'id',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
}
