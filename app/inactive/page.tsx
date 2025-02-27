import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { Separator } from '@/components/ui/separator'
import { themeConfig } from '@/lib/constants'
import { Button } from '@/components/ui/button'

const Inactive = () => {
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
            <ModeToggle />
          </div>
        </div>
        <Separator />
      </div>
      <div className='flex justify-center items-center h-screen w-full text-center'>
        <div>
          <h2 className='text-xl mb-4'>
            Saytdan foydalanish uchun akkountizni faollashtirishingiz kerak.
            <br />
            Buning uchun adminga yozing.
          </h2>
          <div className='flex gap-4 justify-center'>
            <Button asChild variant='link'>
              <Link href='https://t.me/mirzamurod_dev' target='_blank' rel='noopener noreferrer'>
                Adminga yozish
              </Link>
            </Button>
            <Button asChild>
              <a href='/'>Home Page</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inactive
