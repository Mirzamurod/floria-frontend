import { FC, useCallback } from 'react'
import Link from 'next/link'
import { debounce } from 'lodash'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface IProps {
  setSearch: (value: string) => void
}

const TableHeader: FC<IProps> = props => {
  const { setSearch } = props

  const handleTextDebounce = useCallback(
    debounce((text: string) => setSearch(text), 2000),
    []
  )

  return (
    <div className='flex flex-col mb-4'>
      <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>Gullar</h2>
      <div className='flex md:flex-row flex-col md:justify-between'>
        <Input
          placeholder='Qidirish'
          className='w-auto md:max-w-[300px]'
          onChange={e => handleTextDebounce(e.target.value)}
        />
        <Button asChild className='mt-2 md:mt-0'>
          <Link href='/flowers/add'>Gul qo'shish</Link>
        </Button>
      </div>
    </div>
  )
}

export default TableHeader
