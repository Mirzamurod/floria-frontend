import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { format } from 'date-fns'

const User = () => {
  const { data: session } = useSession()
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <div className='relative w-40 h-40 mx-auto'>
          <Image
            fill
            alt='user image'
            src={session?.currentUser?.image!}
            className='object-cover w-40 h-auto rounded-full'
          />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className='text-2xl'>{session?.currentUser?.name}</h3>
        <p className='text-muted-foreground'>{session?.currentUser?.email}</p>
        <p className='mt-2'>
          {t('rate')}:{' '}
          {session?.currentUser?.plan === 'month'
            ? t('month', { number: 1 })
            : session?.currentUser?.plan === 'week'
            ? t('week', { number: 2 })
            : 'Vip'}
        </p>
        <p>
          {t('endtime')}:{' '}
          {session?.currentUser?.plan === 'vip'
            ? t('unlim')
            : format(session?.currentUser?.date!, 'dd.MM.yyyy')}
        </p>
      </CardContent>
    </Card>
  )
}

export default User
