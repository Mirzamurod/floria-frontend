import { SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { editClientTelegram } from '@/store/user/login'
import { useAppSelector } from '@/store'

const UserInfo = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const { t } = useTranslation()
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
        <CardTitle>{t('userinfo')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4' onSubmit={onSubmit}>
          <div>
            <Label htmlFor='userName'>
              {t('username')} <span className='text-red-500'>*</span>
            </Label>
            <Input
              required
              type='text'
              id='userName'
              value={userName}
              placeholder={t('username')}
              disabled={telegramLoading}
              onChange={e => setCardName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='userPhone'>
              {t('phone')} <span className='text-red-500'>*</span>
            </Label>
            <Input
              required
              type='text'
              id='userPhone'
              value={userPhone}
              disabled={telegramLoading}
              placeholder='+998901234567'
              onChange={e => setCardNumber(e.target.value)}
            />
          </div>
          <Button type='submit' disabled={telegramLoading}>
            {t('edit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default UserInfo
