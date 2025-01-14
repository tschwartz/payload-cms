import { connection } from 'next/server'
import type { Page as PageType } from '../../payload-types'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/utils/RenderBlocks'
import { queryPageBySlug } from '@/utils/queryPageBySlug'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ secret: string }>
}) {
  await connection()
  const { slug = 'home' } = await params

  const page: PageType | null = await queryPageBySlug({ slug })

  return page ? (
    <div className="container-fluid">
      <RenderBlocks blocks={page.content} />
    </div>
  ) : (
    notFound()
  )
}
