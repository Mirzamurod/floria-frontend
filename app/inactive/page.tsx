'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { Separator } from '@/components/ui/separator'
import { themeConfig } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import Language from '@/components/language'

const Inactive = () => {
  const { t } = useTranslation()

  return (
    <div>
      {/* Sidebar */}
      <div className='sticky top-0 z-20 bg-background'>
        <div className='flex justify-between p-2'>
          <div className='flex gap-2 items-center'>
            <Image src='/flower-icon.webp' alt='flower-icon' width={36} height={36} />
            <p className='text-xl'>{themeConfig.app.name}</p>
          </div>
          <div className='flex gap-x-2'>
            <Language en />
            <ModeToggle />
          </div>
        </div>
        <Separator />
      </div>
      <div className='container mx-auto flex justify-center items-center h-screen w-full text-center'>
        <div>
          <h2 className='text-xl mb-4'>{t('warninginactive')}</h2>
          <div className='flex gap-4 justify-center'>
            <Button asChild variant='link'>
              <Link href='https://t.me/mirzamurod_dev' target='_blank' rel='noopener noreferrer'>
                {t('writetoadmin')}
              </Link>
            </Button>
            <Button asChild>
              <a href='/'>{t('homepage')}</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inactive
