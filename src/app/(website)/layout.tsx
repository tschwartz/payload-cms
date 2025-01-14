import './styles/main.scss'

import { Open_Sans } from 'next/font/google'

import { RefreshRouteOnSave } from './(components)/RefreshRouteOnSave'

const OpenSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
})

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={OpenSans.className}>
      <RefreshRouteOnSave />
      <body>{children}</body>
    </html>
  )
}
