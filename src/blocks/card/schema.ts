import { Block, Field } from 'payload'

const CTA: Field = {
  name: 'cta',
  label: 'Call to action',
  type: 'group',
  fields: [
    {
      name: 'text',
      label: 'Text',
      type: 'text',
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
    },
  ],
}

export const Card: Block = {
  slug: 'card',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'richText',
      label: 'Rich Text',
      type: 'richText',
    },
    CTA,
  ],
}
