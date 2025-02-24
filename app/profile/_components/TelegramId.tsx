import { FC, ReactNode } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

interface IProps {
  children: ReactNode
}

const TelegramId: FC<IProps> = props => {
  const { children } = props

  return (
    <HoverCard>
      <HoverCardTrigger className='cursor-pointer'>{children}</HoverCardTrigger>
      <HoverCardContent>
        <p className='text-sm'>
          Telegram group id qo'shish uchun o'zingizni guruhingizga o'zingizni botingizni
          qo'shishingiz kerak, va <u>@myidbot</u> ham shu guruhga qo'shishingiz kerak. Ikkala botni
          guruhga qo'shib bo'lganingizdan so'ng guruhga qandaydir habar yuboring (masalan: test)
          so'ng <u>/getid@myidbot</u> shu yozasiz va u sizga id qaytaradi uni olib pastdagi inputga
          yozasiz va "O'zgartirish" knopkasini bosasiz.
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}

export default TelegramId
