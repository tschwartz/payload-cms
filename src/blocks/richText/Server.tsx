import { serializeLexical } from '@/utils/Serialize'

export default function RichTextBlockServer({ richText }: { richText: any }) {
  return <>{serializeLexical({ nodes: richText?.root?.children })}</>
}
