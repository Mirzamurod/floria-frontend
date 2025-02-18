'use client'

import { FC, ReactNode } from 'react'
import { useAppSelector } from '@/store'
import { SidebarTrigger, useSidebar } from '../ui/sidebar'
import Sidebar from '../sidebar'
import { ModeToggle } from '../shared/mode-toggle'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface IProps {
  children: ReactNode
}

const LayoutProvider: FC<IProps> = props => {
  const { children } = props
  const { open, setOpen } = useSidebar()

  const { sidebar } = useAppSelector(state => state.login)

  return (
    <>
      {sidebar ? <Sidebar /> : null}
      <main className='w-full'>
        {sidebar ? (
          <div className='border-b flex justify-between p-2 w-[-webkit-fill-available] fixed bg-background z-50'>
            <Button asChild size='icon' variant='outline' onClick={() => setOpen(!open)}>
              <SidebarTrigger />
            </Button>
            <div>
              <ModeToggle />
            </div>
          </div>
        ) : null}
        <div className={cn('z-0', sidebar ? 'p-2 mt-14' : null)}>{children}</div>
      </main>
    </>
  )
}

export default LayoutProvider
