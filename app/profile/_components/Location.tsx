import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

interface IProps {
  children: ReactNode
}

const Location: FC<IProps> = props => {
  const { children } = props

  return (
    <HoverCard>
      <HoverCardTrigger className='cursor-pointer'>{children}</HoverCardTrigger>
      <HoverCardContent>
        <p className='text-sm mb-2'>
          Lokatsiyani yandex map yoki navigator degan pragrammalardan magaziningiz manzilini
          olishingiz mumkin. Magaziningiz ustiga bosib tursangiz pastdan oyna chiqadi va rasmdagiga
          o'xshagan yozuv ustiga bosib ko'piya qilasiz va uni inputga yozasiz.
        </p>
        <Image src='/location.png' alt='location image' width={228} height={144} />
      </HoverCardContent>
    </HoverCard>
  )
}

export default Location
