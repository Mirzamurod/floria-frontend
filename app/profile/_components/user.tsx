import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { customLoader } from '@/lib/utils'

const User = () => {
  const { data: session } = useSession()

  return (
    <Card>
      <CardHeader>
        <div className='relative w-40 h-40 mx-auto'>
          <img
            // fill
            // loader={customLoader}
            src={session?.currentUser?.image!}
            alt='user image'
            className='object-cover w-40 h-auto rounded-full'
          />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className='text-2xl'>{session?.currentUser?.name}</h3>
        <p className='text-muted-foreground'>{session?.currentUser?.email}</p>
      </CardContent>
    </Card>
  )
}

export default User
