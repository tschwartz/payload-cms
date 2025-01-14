import dotenv from 'dotenv'

import { connection } from 'next/server'
import type { Page as PageType } from '../../payload-types'
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
  params: Promise<{ slug: string }>
  searchParams: Promise<{ secret: string }>
}) {
  await connection()
  const { secret } = await searchParams
  const isAllowed = secret === PREVIEW_SECRET
  const { slug = 'home' } = await params

  const page: PageType | null = await queryPageBySlug({ slug, draft: true })

  return isAllowed && page ? (
    <div className="container-fluid">
      <RenderBlocks blocks={page.content} />
    </div>
  ) : (
    notFound()
  )
}
