'use client'

import { FC, ReactNode, useState } from 'react'
import { useAppSelector } from '@/store'
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import Sidebar from '../sidebar'
import { ModeToggle } from '../shared/mode-toggle'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface IProps {
  children: ReactNode
}

const LayoutProvider: FC<IProps> = props => {
  const { children } = props
  const [isOpen, setIsOpen] = useState(true)

  const { sidebar } = useAppSelector(state => state.login)

  return (
    <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
      {sidebar ? <Sidebar /> : null}
      <main className='w-full'>
        {sidebar ? (
          <div className='border-b flex justify-between w-full p-2 sticky top-0 bg-background'>
            <Button size='icon' variant='outline' onClick={() => setIsOpen(!isOpen)}>
              <SidebarTrigger />
            </Button>
            <div>
              <ModeToggle />
            </div>
          </div>
        ) : null}
        <div className={cn(sidebar ? 'p-2' : null)}>{children}</div>
      </main>
    </SidebarProvider>
  )
}

export default LayoutProvider
