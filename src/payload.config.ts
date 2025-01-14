// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Header } from './blocks/global/header/schema'
import { Footer } from './blocks/global/footer/schema'
import { Authors } from './collections/authors/schema'
import { Categories } from './collections/categories/schema'
import { Pages } from './collections/pages/schema'
import { Statuses } from './collections/statuses/schema'
import { Users } from './collections/users/schema'
import { Media } from './collections/media/schema'
import { Templates } from './collections/templates/schema'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [Header, Footer],
  collections: [Authors, Users, Pages, Categories, Media, Statuses, Templates],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [],
})
