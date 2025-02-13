'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { showSidebar } from '@/store/user/login'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showSidebar(false))
  }, [])

  return (
    <main className='grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold text-indigo-600'>404</p>
        <h1 className='mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl'>
          Page not found
        </h1>
        <p className='mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8'>
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Button variant='outline' asChild>
            <Link href='/'>Go back home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default NotFound
