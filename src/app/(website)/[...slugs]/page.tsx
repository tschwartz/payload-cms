import type { Page as PageType } from '../../../payload-types'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/utils/RenderBlocks'
import { queryPageBySlug } from '@/utils/queryPageBySlug'

export default async function Page({ params }: { params: Promise<{ slugs: string }> }) {
  const { slugs = ['home'] } = await params

  let slug

  if (Array.isArray(slugs)) {
    const index = slugs.length - 1
    slug = slugs[index]
  } else {
    slug = slugs
  }

  const page: PageType | null = await queryPageBySlug({ slug })

  return page ? <RenderBlocks blocks={page.content} /> : notFound()
}
