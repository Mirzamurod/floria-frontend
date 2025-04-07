'use client'

import { FC, ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store'
import { SidebarTrigger, useSidebar } from '../ui/sidebar'
import Sidebar from '../sidebar'
import { ModeToggle } from '../shared/mode-toggle'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Alert, AlertTitle } from '../ui/alert'
import { OctagonAlert } from 'lucide-react'
import { getUnsubmittedOrders } from '@/store/orders'
import Language from '../language'
import UserRequired from '../UserRequired'

interface IProps {
  children: ReactNode
}

const LayoutProvider: FC<IProps> = props => {
  const { children } = props
  const dispatch = useDispatch()
  const pathname = usePathname()
  const { open, setOpen } = useSidebar()
  const { data: session } = useSession()
  const { t } = useTranslation()

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
                {ordersUnsubmitted.length ? (
                  <p>{t('warningunsubmittedorder', { number: ordersUnsubmitted.length })}</p>
                ) : null}
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
              <AlertTitle>{t('attention')}!</AlertTitle>
              <UserRequired />
            </Alert>
          ) : null}
          {children}
        </div>
      </main>
    </>
  )
}

export default LayoutProvider
