'use client'

import { useTranslation } from 'react-i18next'
import User from './_components/user'
import ApiKeys from './_components/apikeys'
import CardInfo from './_components/cardinfo'
import UserInfo from './_components/userInfo'

const Profile = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight'>{t('profile')}</h2>
      <div className='grid grid-cols-12 gap-2 py-2'>
        <div className='xl:col-span-4 col-span-12'>
          <User />
          <UserInfo />
        </div>
        <div className='xl:col-span-8 col-span-12'>
          <ApiKeys />
          <CardInfo />
        </div>
      </div>
    </div>
  )
}

export default Profile
