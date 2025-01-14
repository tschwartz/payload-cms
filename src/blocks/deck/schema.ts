import { Block } from 'payload'
import { Card } from '../card/schema'

export const Deck: Block = {
  slug: 'deck',
  fields: [
    {
      name: 'alignment',
      type: 'radio',
      label: 'Align center',
      defaultValue: 'no',
      options: [
        {
          label: 'Yes',
          value: 'yes',
        },
        {
          label: 'No',
          value: 'no',
        },
      ],
    },
    {
      name: 'deck',
      label: 'Deck',
      type: 'blocks',
      blocks: [Card],
    },
  ],
}
