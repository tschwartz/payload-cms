import { RefreshRouteOnSave } from '../(components)/RefreshRouteOnSave'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RefreshRouteOnSave />
      {children}
    </>
  )
}
