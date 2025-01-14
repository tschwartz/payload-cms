import { v4 } from 'uuid'

import { CollectionConfig } from 'payload'

export const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    useAsTitle: 'name',
    hidden: true,
  },
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
    {
      name: 'id',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
  ],
}
