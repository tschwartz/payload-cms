import { Block } from 'payload'

export const Alert: Block = {
  slug: 'alert',
  fields: [
    {
      name: 'type',
      label: 'Alert Type',
      type: 'select',
      defaultValue: 'note',
      options: [
        {
          label: 'Note',
          value: 'note',
        },
        {
          label: 'Important',
          value: 'important',
        },
        {
          label: 'Caution',
          value: 'caution',
        },
      ],
    },
    {
      name: 'richText',
      label: 'Content',
      type: 'richText',
      required: true,
    },
  ],
}
