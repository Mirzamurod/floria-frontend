import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { AlertDescription } from '../ui/alert'

const UserRequired = () => {
  const { i18n } = useTranslation()

  return i18n.language === 'uz' ? (
    <AlertDescription>
      Profilega o'tib kerakli ma'lumotlarni kiritishingiz kerak, shunda telegram bot ishlashni
      boshlaydi. Profilega o'tish uchun{' '}
      <Link href='/profile' className='underline text-violet-600'>
        shu yerga
      </Link>{' '}
      bosing.
    </AlertDescription>
  ) : i18n.language === 'ru' ? (
    <AlertDescription>
      Вам нужно перейти в профиль и ввести необходимые данные, чтобы Telegram-бот начал работать.
      Чтобы перейти в профиль, нажмите{' '}
      <Link href='/profile' className='underline text-violet-600'>
        здесь
      </Link>
    </AlertDescription>
  ) : (
    <AlertDescription>
      You need to go to your profile and enter the required information for the Telegram bot to
      start working. To go to your profile, click{' '}
      <Link href='/profile' className='underline text-violet-600'>
        here
      </Link>
    </AlertDescription>
  )
}

export default UserRequired
