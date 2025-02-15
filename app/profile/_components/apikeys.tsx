import { SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { editClientTelegram } from '@/store/user/login'
import { useAppSelector } from '@/store'

const ApiKeys = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const [telegramToken, setTelegramToken] = useState(session?.currentUser?.telegramToken ?? '')
  const [telegramId, setTelegramId] = useState(session?.currentUser?.telegramId ?? '')
  const [location, setLocation] = useState('')

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
            <Label>
              Telegram token <span className='text-red-500'>*</span>
            </Label>
            <Input
              required
              type='text'
              disabled={telegramLoading}
              placeholder='Telegram token'
              value={telegramToken}
              onChange={e => setTelegramToken(e.target.value)}
            />
          </div>
          <div>
            <Label>Telegram group id</Label>
            <Input
              type='text'
              disabled={telegramLoading}
              placeholder='Telegram group id'
              value={telegramId}
              onChange={e => setTelegramId(e.target.value)}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type='text'
              disabled={telegramLoading}
              placeholder='Location'
              value={location}
              onChange={e => setLocation(e.target.value)}
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

export default ApiKeys
