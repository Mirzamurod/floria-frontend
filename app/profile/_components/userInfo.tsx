import { SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { editClientTelegram } from '@/store/user/login'
import { useAppSelector } from '@/store'

const UserInfo = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const [userName, setCardName] = useState(session?.currentUser?.userName ?? '')
  const [userPhone, setCardNumber] = useState(session?.currentUser?.userPhone ?? '+998')

  const { telegramLoading } = useAppSelector(state => state.login)

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(editClientTelegram({ userPhone, userName }))
  }

  return (
    <Card className='mt-2'>
      <CardHeader>
        <CardTitle>Foydalanuvchi ma'lumotlari</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4' onSubmit={onSubmit}>
          <div>
            <Label htmlFor='userName'>
              Ism <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='userName'
              required
              type='text'
              disabled={telegramLoading}
              placeholder='Ism'
              value={userName}
              onChange={e => setCardName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='userPhone'>
              Telefon raqam <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='userPhone'
              required
              type='text'
              disabled={telegramLoading}
              placeholder='+998901234567'
              value={userPhone}
              onChange={e => setCardNumber(e.target.value)}
            />
          </div>
          <Button type='submit' disabled={telegramLoading}>
            O'zgartirish
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default UserInfo
