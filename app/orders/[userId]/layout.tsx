'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showSidebar } from '@/store/user/login'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showSidebar(false))
  }, [])

  return <>{children}</>
}

export default Layout
