'use client'

import { FC, ReactNode } from 'react'
import { SessionProvider as Session } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '@/store'

const SessionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <Session>{children}</Session>
    </Provider>
  )
}

export default SessionProvider
