'use client'

import {} from 'react'
import User from './_components/user'
import ApiKeys from './_components/apikeys'

const Profile = () => {
  return (
    <div>
      <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>Profile</h2>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-3'>
          <User />
        </div>
        <div className='col-span-9'>
          <ApiKeys />
        </div>
      </div>
    </div>
  )
}

export default Profile
