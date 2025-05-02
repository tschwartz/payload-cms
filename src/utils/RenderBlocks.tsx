import RichTextBlockServer from '@/blocks/richText/Server'
import { Page } from '@/payload-types'

export function RenderBlocks({ blocks }: { blocks: Page['content'] }) {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0
  const components = {
    richText: RichTextBlockServer,
  }
  return hasBlocks ? (
    <>
      {blocks.map((block, index) => {
        const { blockType } = block
        // @ts-expect-error eventually fix the any type
        const Component = components[blockType]

        return Component ? (
          <Component key={index} {...block} />
        ) : (
          <div key={index}>No Matching blocks</div>
        )
      })}
    </>
  ) : null
}
