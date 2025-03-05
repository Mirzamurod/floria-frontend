import { SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { editClientTelegram } from '@/store/user/login'
import { useAppSelector } from '@/store'

const CardInfo = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const [card_number, setCardNumber] = useState(session?.currentUser?.card_number ?? '')
  const [card_name, setCardName] = useState(session?.currentUser?.card_name ?? '')

  const { telegramLoading } = useAppSelector(state => state.login)

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(editClientTelegram({ card_number, card_name }))
  }

  return (
    <Card className='mt-2'>
      <CardHeader>
        <CardTitle>Karta ma'lumotlari</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4' onSubmit={onSubmit}>
          <div>
            <Label htmlFor='card_number'>
              Karta raqami <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='card_number'
              required
              type='text'
              disabled={telegramLoading}
              placeholder='Karta raqami'
              value={card_number}
              onChange={e => setCardNumber(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='card_name'>
              Ism <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='card_name'
              required
              type='text'
              disabled={telegramLoading}
              placeholder='Ism'
              value={card_name}
              onChange={e => setCardName(e.target.value)}
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

export default CardInfo
