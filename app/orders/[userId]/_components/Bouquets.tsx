import { FC } from 'react'
import Image from 'next/image'
import ReactPaginate from 'react-paginate'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/store'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { TBouquet } from '@/types/bouquet'
import { getSum } from '@/lib/utils'
import Category from './Category'

type TItem = { bouquetId: string; qty: number; price: number; image: string }

interface IProps {
  items: TItem[]
  setItems: (value: TItem[]) => void
  page: number
  setPage: (value: number) => void
  limit: string
  setLimit: (value: string) => void
  active: string
  setActive: (active: string) => void
}

const Bouquets: FC<IProps> = props => {
  const { items, setItems, page, setPage, limit, setLimit, active, setActive } = props
  const { t } = useTranslation()

  const { isLoading, bouquets, pageCount } = useAppSelector(state => state.bouquet)

  const onChange = (item: { page: number; limit: string }) => {
    setPage(item.page)
    setLimit(item.limit)
  }

  const changeItem = (item: TBouquet, operator: '-' | '+') => {
    let data: TItem[] = []
    if (!items.some(i => i.bouquetId === item._id))
      setItems([
        ...items,
        { bouquetId: item._id, qty: 1, price: item.price as number, image: item.image },
      ])
    else {
      if (operator === '+') {
        items.map(i =>
          i.bouquetId === item._id
            ? data.push({ ...i, qty: i.qty + 1, price: +item.price + +i.price })
            : data.push(i)
        )
        setItems([...data])
      } else {
        if (items.find(i => i.bouquetId === item._id)?.qty === 1) {
          items.map(i =>
            i.bouquetId !== item._id
              ? data.push({ ...i, qty: i.qty + 1, price: +item.price + +i.price })
              : null
          )
          setItems([...data])
        } else {
          items.map(i =>
            i.bouquetId === item._id
              ? data.push({ ...i, qty: i.qty - 1, price: +i.price - +item.price })
              : data.push(i)
          )
          setItems([...data])
        }
      }
    }
  }

  return (
    <div className='mt-2 mb-4'>
      <Category active={active} setActive={setActive} />
      <div className='grid grid-cols-2 gap-2'>
        {isLoading ? (
          [...new Array(4)].map((_, index) => (
            <Card key={index}>
              <Skeleton className='h-40 w-full rounded-none' />
              <Skeleton className='h-8 w-full mt-1 rounded-none' />
            </Card>
          ))
        ) : bouquets.length ? (
          bouquets.map(bouquet => (
            <Card key={bouquet._id} className='w-auto overflow-hidden flex flex-col'>
              <div className='relative w-full h-40'>
                <Image
                  fill
                  src={bouquet.image}
                  alt='bouquet image'
                  className='object-cover w-full h-auto'
                />
                {items.some(item => item.bouquetId === bouquet._id) ? (
                  <div className='absolute top-2 left-2 w-6 h-6 text-center rounded-lg bg-primary'>
                    {items.find(item => item.bouquetId === bouquet._id)?.qty}
                  </div>
                ) : null}
              </div>
              <CardContent className='p-2'>
                {bouquet.name ? (
                  <p>
                    <b>{t('name')}: </b> {bouquet.name}
                  </p>
                ) : null}
                <p>
                  <b>{t('price')}: </b>
                  {getSum(bouquet.price)}
                </p>
                {bouquet.info ? (
                  <p>
                    <b>{t('info')}: </b> {bouquet.info}
                  </p>
                ) : null}
              </CardContent>
              <CardFooter className='p-0 mt-auto mb-0'>
                {items.some(item => item.bouquetId === bouquet._id) ? (
                  <>
                    <Button
                      variant='destructive'
                      className='w-full rounded-none text-2xl'
                      onClick={() => changeItem(bouquet, '-')}
                    >
                      -
                    </Button>
                    <Button
                      className='w-full rounded-none text-2xl'
                      onClick={() => changeItem(bouquet, '+')}
                    >
                      +
                    </Button>
                  </>
                ) : (
                  <Button className='w-full rounded-none' onClick={() => changeItem(bouquet, '+')}>
                    {t('add')}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <h3>{t('nodata')}</h3>
        )}
      </div>
      {bouquets.length ? (
        <div className='w-auto mt-4'>
          <ReactPaginate
            previousLabel='<'
            nextLabel='>'
            breakLabel='...'
            initialPage={page - 1}
            pageCount={pageCount! ?? 1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={({ selected }) => onChange({ page: selected! + 1, limit })}
            containerClassName='flex gap-2 justify-end'
            pageClassName='px-3 py-[7px] text-sm font-medium rounded-md border border-green-500'
            activeClassName='bg-green-500 text-white'
            previousClassName='px-3 py-[7px] text-sm font-medium rounded-md border border-green-500'
            nextClassName='px-3 py-[7px] text-sm font-medium rounded-md border border-green-500'
            breakClassName='px-3 py-[7px] text-sm font-medium rounded-md border border-green-500 text-gray-500'
            disabledClassName='opacity-50 cursor-not-allowed'
            renderOnZeroPageCount={null}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Bouquets
