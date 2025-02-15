'use client'

import {} from 'react'
import User from './_components/user'
import ApiKeys from './_components/apikeys'

const Profile = () => {
  return (
    <div>
      <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight'>Profile</h2>
      <div className='grid grid-cols-12 gap-2 py-2'>
        <div className='xl:col-span-4 col-span-12'>
          <User />
        </div>
        <div className='xl:col-span-8 col-span-12'>
          <ApiKeys />
        </div>
      </div>
    </div>
  )
}

export default Profile
