import { FC, PropsWithChildren } from 'react'
import AuthGuard from '@/components/auth/AuthGuard'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <AuthGuard>{children}</AuthGuard>
}

export default Layout
