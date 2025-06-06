import { FC, useCallback } from 'react'
import { debounce } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'

interface IProps {
  setSearch: (value: string) => void
}

const TableHeader: FC<IProps> = props => {
  const { setSearch } = props
  const { t } = useTranslation()

  const handleTextDebounce = useCallback(
    debounce((text: string) => setSearch(text), 2000),
    []
  )

  return (
    <div className='flex flex-col mb-4'>
      <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>{t('clients')}</h2>
      <div className='flex md:flex-row flex-col md:justify-between'>
        <Input
          placeholder={t('search')}
          className='w-auto md:max-w-[300px]'
          onChange={e => handleTextDebounce(e.target.value)}
        />
      </div>
    </div>
  )
}

export default TableHeader
