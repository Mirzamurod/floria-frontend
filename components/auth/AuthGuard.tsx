'use client'

import { FC, ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface IProps {
  children: ReactNode
}

const AuthGuard: FC<IProps> = ({ children }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') return <p>Loading...</p>
  if (!session) {
    router.push('/login')
    return null
  }
  if (session && session.currentUser?.block) {
    router.push('/inactive')
    return null
  }

  return <>{children}</>
}

export default AuthGuard
