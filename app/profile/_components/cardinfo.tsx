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

const CardInfo = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const { t } = useTranslation()
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
        <CardTitle>{t('cardinfo')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4' onSubmit={onSubmit}>
          <div>
            <Label htmlFor='card_number'>
              {t('cardnumber')} <span className='text-red-500'>*</span>
            </Label>
            <Input
              required
              type='text'
              id='card_number'
              value={card_number}
              disabled={telegramLoading}
              placeholder={t('cardnumber')}
              onChange={e => setCardNumber(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='card_name'>
              {t('username')} <span className='text-red-500'>*</span>
            </Label>
            <Input
              required
              type='text'
              id='card_name'
              value={card_name}
              disabled={telegramLoading}
              placeholder={t('username')}
              onChange={e => setCardName(e.target.value)}
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

export default CardInfo
