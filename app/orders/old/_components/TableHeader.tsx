import { FC, useCallback } from 'react'
import { debounce } from 'lodash'
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
      <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>Eski zakazlar</h2>
      <div className='flex justify-between'>
        <Input
          placeholder='Qidirish (zakaz nomeri)'
          className='w-auto max-w-[300px]'
          onChange={e => handleTextDebounce(e.target.value)}
        />
      </div>
    </div>
  )
}

export default TableHeader
