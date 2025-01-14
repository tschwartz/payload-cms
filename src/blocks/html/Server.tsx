export default function HTMLBlockServer({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
