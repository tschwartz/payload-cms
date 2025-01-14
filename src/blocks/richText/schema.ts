import { Block } from 'payload'

export const RichText: Block = {
  slug: 'richText',
  fields: [
    {
      name: 'richText',
      label: 'Rich text',
      type: 'richText',
    },
  ],
}
