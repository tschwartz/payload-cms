import { cache } from 'react'

import { getPayload } from 'payload'
import config from '@/payload.config'

export const queryPageBySlug = cache(async ({ slug, draft }: { slug: string; draft?: boolean }) => {
  const parsedSlug = decodeURIComponent(slug)
  const payload = await getPayload({ config })
  const pagesResponse = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    where: {
      slug: {
        equals: parsedSlug,
      },
    },
  })

  return pagesResponse.docs?.[0] || null
})
