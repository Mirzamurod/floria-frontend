'use client'

import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { FaGoogle } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { useDispatch } from 'react-redux'
import { showSidebar } from '@/store/user/login'

const Login = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch(showSidebar(false))
  }, [])

  const onSignIn = async (provider: string) => {
    setIsLoading(true)
    await signIn(provider, { callbackUrl: '/' })
  }

  return (
    <div className='container max-w-md w-full h-screen flex justify-center items-center flex-col space-y-4'>
      <div className='flex items-center gap-2'>
        <h1 className='text-4xl font-bold'>Flowers</h1>
        <ModeToggle />
      </div>
      <div className='w-full'>
        <p className='text-center text-muted-foreground text-sm'>Automated online order receipt</p>
      </div>
      <div className='grid grid-cols-1 w-full gap-1'>
        <Button variant='outline' onClick={() => onSignIn('google')} disabled={isLoading}>
          <span>Sign in with google</span>
          <FaGoogle />
        </Button>
      </div>
    </div>
  )
}

export default Login
