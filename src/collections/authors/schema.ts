import { v4 } from 'uuid'

import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'login',
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
      name: 'login',
      label: 'Login',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
    },
    {
      name: 'displayName',
      label: 'Display name',
      type: 'text',
      required: true,
    },
    {
      name: 'firstName',
      label: 'First name',
      type: 'text',
    },
    {
      name: 'lastName',
      label: 'Last name',
      type: 'text',
    },
  ],
}
