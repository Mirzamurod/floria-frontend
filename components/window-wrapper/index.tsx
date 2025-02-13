// React Imports
import { FC, Fragment, ReactNode, useEffect, useState } from 'react'

// Next Import
import { useRouter } from 'next/navigation'

interface Props {
  children: ReactNode
}

const WindowWrapper: FC<Props> = ({ children }) => {
  // State
  const [windowReadyFlag, setWindowReadyFlag] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowReadyFlag(true)
    }
  }, [router])

  if (windowReadyFlag) return <Fragment>{children}</Fragment>
  else return null
}

export default WindowWrapper
