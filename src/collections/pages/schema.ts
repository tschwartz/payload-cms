import dotenv from 'dotenv'

import { v4 } from 'uuid'

import type { CollectionConfig } from 'payload'

import { Alert } from '@/blocks/alert/schema'
import { RichText } from '@/blocks/richText/schema'

dotenv.config()
dotenv.config({ path: '.env' })

const { PREVIEW_SECRET } = process.env

function getPath(slug: string) {
  const path = slug && slug !== 'home' ? slug : ''
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/preview${path ? `/${path}` : ''}`
  return `${url}?secret=${PREVIEW_SECRET}`
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: ({ req }) => {
      if (req.user) return true

      return {
        or: [
          {
            _status: {
              equals: 'published',
            },
          },
          {
            _status: {
              exists: false,
            },
          },
        ],
      }
    },
  },
  admin: {
    listSearchableFields: ['title', 'id'],
    defaultColumns: ['title', 'user'],
    livePreview: {
      url: ({ data }) => {
        return getPath(data.slug)
      },
    },
    preview: (data) => {
      return getPath(data.slug as string)
    },
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
  versions: {
    drafts: {
      autosave: {
        interval: 200,
      },
      schedulePublish: true,
    },
  },
  fields: [
    {
      name: 'createdAt',
      label: 'Created At',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'updatedAt',
      label: 'Updated At',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'template',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Home', value: 'home' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'content',
      label: 'Content',
      type: 'blocks',
      blocks: [RichText, Alert],
      filterOptions({ siblingData }: { siblingData: unknown }) {
        const data = siblingData as Record<string, unknown> | undefined

        switch (data?.template) {
          case 'home':
            return ['alert', 'richText']

          case 'default':
          default:
            return ['richText']
        }
      },
    },
  ],
}
