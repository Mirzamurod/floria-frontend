import { FC, ReactNode } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

interface IProps {
  children: ReactNode
}

const TelegramToken: FC<IProps> = props => {
  const { children } = props

  return (
    <HoverCard>
      <HoverCardTrigger className='cursor-pointer'>{children}</HoverCardTrigger>
      <HoverCardContent>
        <p className='text-sm'>
          Telegram tokenni olish uchun telegramga kirib <u>@BotFather</u> deb qidirasiz va start
          bosib, <u>/newbot</u> deb yozasiz va sizdan botingiz uchun nom so'raydi, masalan:{' '}
          <u>floriabot</u>, botga nom borayotganimgizda oxiri xar doim bot bilan tugashi shart. Bot
          create bo'lganidan so'ng sizga token beradi, <u>123456789:qwertyuiopqwertyuiop</u> token
          shunga o'xshash bo'ladi, shuni kopiya qilib pastdagi joyga tashlab "O'zgartirish"
          knopkasini bosasiz. Shundan keyin telegram bot ishlashni boshlaydi.
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}

export default TelegramToken
