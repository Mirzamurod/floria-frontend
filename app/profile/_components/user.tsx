import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { format } from 'date-fns'

const User = () => {
  const { data: session } = useSession()

  return (
    <Card>
      <CardHeader>
        <div className='relative w-40 h-40 mx-auto'>
          <Image
            fill
            src={session?.currentUser?.image!}
            alt='user image'
            className='object-cover w-40 h-auto rounded-full'
          />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className='text-2xl'>{session?.currentUser?.name}</h3>
        <p className='text-muted-foreground'>{session?.currentUser?.email}</p>
        <p className='mt-2'>
          Tarifingiz:{' '}
          {session?.currentUser?.plan === 'month'
            ? '1 oy'
            : session?.currentUser?.plan === 'week'
            ? '2 hafta'
            : 'Vip'}
        </p>
        <p>
          Tugash vaqti:{' '}
          {session?.currentUser?.plan === 'vip'
            ? 'Unlim'
            : format(session?.currentUser?.date!, 'dd.MM.yyyy')}
        </p>
      </CardContent>
    </Card>
  )
}

export default User
