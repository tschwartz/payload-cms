import dotenv from 'dotenv'

import type { Page as PageType } from '../../../payload-types'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/utils/RenderBlocks'
import { queryPageBySlug } from '@/utils/queryPageBySlug'

dotenv.config()
dotenv.config({ path: '.env' })

const { PREVIEW_SECRET } = process.env

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slugs: string }>
  searchParams: Promise<{ secret: string }>
}) {
  const { secret } = await searchParams
  const isAllowed = secret === PREVIEW_SECRET
  const { slugs = ['home'] } = await params
  let slug

  if (Array.isArray(slugs)) {
    const index = slugs.length - 1
    slug = slugs[index]
  } else {
    slug = slugs
  }

  const page: PageType | null = await queryPageBySlug({ slug, draft: true })

  return isAllowed && page ? <RenderBlocks blocks={page.content} /> : notFound()
}
