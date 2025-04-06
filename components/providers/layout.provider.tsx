'use client'

import { FC, ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useAppSelector } from '@/store'
import { SidebarTrigger, useSidebar } from '../ui/sidebar'
import Sidebar from '../sidebar'
import { ModeToggle } from '../shared/mode-toggle'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { OctagonAlert } from 'lucide-react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { getUnsubmittedOrders } from '@/store/orders'
import { usePathname } from 'next/navigation'
import Language from '../language'

interface IProps {
  children: ReactNode
}

const LayoutProvider: FC<IProps> = props => {
  const { children } = props
  const dispatch = useDispatch()
  const pathname = usePathname()
  const { open, setOpen } = useSidebar()
  const { data: session } = useSession()

  const { sidebar } = useAppSelector(state => state.login)
  const { ordersUnsubmitted } = useAppSelector(state => state.orders)

  useEffect(() => {
    if (session?.currentUser?.role === 'client' && session.currentUser.block === false)
      dispatch(getUnsubmittedOrders({ status: 'unsubmitted' }))
  }, [pathname, session?.currentUser])

  return (
    <>
      {sidebar ? <Sidebar /> : null}
      <main className='w-full'>
        {sidebar ? (
          <>
            <div className='border-b flex justify-between p-2 sidebar-width fixed bg-background z-50'>
              <div className='flex gap-2 items-center'>
                <Button asChild size='icon' variant='outline' onClick={() => setOpen(!open)}>
                  <SidebarTrigger />
                </Button>
                {ordersUnsubmitted.length ? <p>Sizda 1ta topshirilmagan zakaz bor.</p> : null}
              </div>
              <div className='flex gap-2'>
                <Language en />
                <div>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className={cn('z-0', sidebar ? 'p-2 mt-14' : null)}>
          {sidebar &&
          session?.currentUser?.role === 'client' &&
          (!session?.currentUser?.card_name ||
            !session?.currentUser?.card_number ||
            !session?.currentUser?.telegramToken ||
            !session?.currentUser?.userName ||
            !session?.currentUser?.userPhone) ? (
            <Alert className='mb-2'>
              <OctagonAlert className='h-4 w-4' />
              <AlertTitle>Diqqat!</AlertTitle>
              <AlertDescription>
                Profilega o'tib kerakli ma'lumotlarni kiritishingiz kerak, shunda telegram bot
                ishlashni boshlaydi. Profilega o'tish{' '}
                <Link href='/profile' className='underline text-green-600'>
                  shu yerga
                </Link>{' '}
                bosing.
              </AlertDescription>
            </Alert>
          ) : null}
          {children}
        </div>
      </main>
    </>
  )
}

export default LayoutProvider
