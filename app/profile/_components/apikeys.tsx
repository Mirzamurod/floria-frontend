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
import TelegramToken from './TelegramToken'
import TelegramId from './TelegramId'
import Location from './Location'

const ApiKeys = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const { t } = useTranslation()
  const [telegramToken, setTelegramToken] = useState(session?.currentUser?.telegramToken ?? '')
  const [telegramId, setTelegramId] = useState(session?.currentUser?.telegramId ?? '')
  const [location, setLocation] = useState(session?.currentUser?.location ?? '')

  const { telegramLoading } = useAppSelector(state => state.login)

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(editClientTelegram({ telegramToken, telegramId, location }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Telegram bot</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4' onSubmit={onSubmit}>
          <div>
            <Label htmlFor='token'>
              Telegram token <span className='text-red-500'>*</span>{' '}
              <TelegramToken>?</TelegramToken>
            </Label>
            <Input
              required
              id='token'
              type='text'
              value={telegramToken}
              disabled={telegramLoading}
              placeholder='Telegram token'
              onChange={e => setTelegramToken(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='id'>
              Telegram group id <TelegramId>?</TelegramId>
            </Label>
            <Input
              id='id'
              type='text'
              value={telegramId}
              disabled={telegramLoading}
              placeholder='Telegram group id'
              onChange={e => setTelegramId(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='location'>
              {t('location')} <Location>?</Location>
            </Label>
            <Input
              type='text'
              id='location'
              value={location}
              placeholder='Location'
              disabled={telegramLoading}
              onChange={e => setLocation(e.target.value)}
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

export default ApiKeys
