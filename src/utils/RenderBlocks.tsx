import DeckBlockServer from '@/blocks/deck/Server'
import HTMLBlockServer from '@/blocks/html/Server'
import ImageBlockServer from '@/blocks/image/Server'
import RichTextBlockServer from '@/blocks/richText/Server'
import { Page } from '@/payload-types'

export function RenderBlocks({ blocks }: { blocks: Page['content'] }) {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0
  const components = {
    deck: DeckBlockServer,
    html: HTMLBlockServer,
    image: ImageBlockServer,
    richText: RichTextBlockServer,
  }
  return hasBlocks ? (
    <>
      {blocks.map((block, index) => {
        const { blockType } = block
        const Component = components[blockType]

        return Component ? ( // @ts-expect-error
          <Component key={index} {...block} />
        ) : (
          <div key={index}>No Matching blocks</div>
        )
      })}
    </>
  ) : null
}
