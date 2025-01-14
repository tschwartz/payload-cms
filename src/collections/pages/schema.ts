import dotenv from 'dotenv'

import { v4 } from 'uuid'

import type { CollectionConfig } from 'payload'

import { HTML } from '@/blocks/html/schema'
import { Image } from '@/blocks/image/schema'
import { RichText } from '@/blocks/richText/schema'
import { Deck } from '@/blocks/deck/schema'

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
    defaultColumns: ['title', 'author', 'categories', 'status'],
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
      name: 'id',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'parentId',
      label: 'Parent id',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'legacyId',
      type: 'number',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'legacyParentId',
      type: 'number',
      admin: {
        hidden: true,
      },
    },
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
      label: 'Template',
      type: 'relationship',
      relationTo: 'templates',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      label: 'Author',
      type: 'relationship',
      relationTo: 'authors',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'relationship',
      relationTo: 'statuses',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'categories',
      label: 'Categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
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
      name: 'excerpt',
      label: 'Excerpt',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
    },
    {
      name: 'content',
      label: 'Content',
      type: 'blocks',
      blocks: [Deck, Image, RichText, HTML],
    },
  ],
}
