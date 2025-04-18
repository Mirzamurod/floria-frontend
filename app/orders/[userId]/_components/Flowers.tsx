import { FC } from 'react'
import Image from 'next/image'
import ReactPaginate from 'react-paginate'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/store'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { TFlower } from '@/types/flower'
import { getSum } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { OctagonAlert } from 'lucide-react'
import Category from './Category'
import { IFlower } from '@/types/orders'

interface IProps {
  items: IFlower[]
  setItems: (value: IFlower[]) => void
  page: number
  setPage: (value: number) => void
  limit: string
  setLimit: (value: string) => void
  active: string
  setActive: (active: string) => void
}

const Flowers: FC<IProps> = props => {
  const { items, setItems, page, setPage, limit, setLimit, active, setActive } = props
  const { t } = useTranslation()

  const { isLoading, flowers, pageCount } = useAppSelector(state => state.flower)

  const onChange = (item: { page: number; limit: string }) => {
    setPage(item.page)
    setLimit(item.limit)
  }

  const changeItem = (item: TFlower, operator: '-' | '+') => {
    let data: IFlower[] = []
    if (!items.some(i => i.flowerId === item._id))
      setItems([
        ...items,
        {
          flowerId: item._id,
          qty: 1,
          price: item.price as number,
          image: item.image,
          orgImage: item.orgImage,
        },
      ])
    else {
      if (operator === '+') {
        items.map(i =>
          i.flowerId === item._id
            ? data.push({ ...i, qty: i.qty + 1, price: +item.price + +i.price })
            : data.push(i)
        )
        setItems([...data])
      } else {
        if (items.find(i => i.flowerId === item._id)?.qty === 1) {
          items.map(i =>
            i.flowerId !== item._id
              ? data.push({ ...i, qty: i.qty + 1, price: +item.price + +i.price })
              : null
          )
          setItems([...data])
        } else {
          items.map(i =>
            i.flowerId === item._id
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
      <Alert>
        <OctagonAlert className='h-4 w-4' />
        <AlertTitle>{t('attention')}!</AlertTitle>
        <AlertDescription>{t('flowerwarning')}</AlertDescription>
      </Alert>
      <div className='grid grid-cols-2 gap-4 mt-4'>
        {isLoading && !flowers.length ? (
          [...new Array(4)].map((_, index) => (
            <Card key={index}>
              <Skeleton className='h-40 w-full rounded-none' />
              <Skeleton className='h-8 w-full mt-1 rounded-none' />
            </Card>
          ))
        ) : flowers.length ? (
          flowers.map(flower => (
            <Card key={flower._id} className='w-auto overflow-hidden flex flex-col'>
              <div className='relative w-full h-40'>
                <Image
                  fill
                  src={flower.image}
                  alt='bouquet image'
                  className='object-cover w-full h-auto'
                />
                {items.some(item => item.flowerId === flower._id) ? (
                  <div className='absolute top-2 left-2 w-6 h-6 text-center rounded-lg bg-primary'>
                    {items.find(item => item.flowerId === flower._id)?.qty}
                  </div>
                ) : null}
              </div>
              <CardContent className='p-2'>
                <p>
                  <b>{t('name')}: </b> {flower.name}
                </p>
                <p>
                  <b>{t('price')}: </b>
                  {getSum(flower.price)}
                </p>
              </CardContent>
              <CardFooter className='p-0 mt-auto mb-0'>
                {items.some(item => item.flowerId === flower._id) ? (
                  <>
                    <Button
                      variant='destructive'
                      className='w-full rounded-none text-2xl'
                      onClick={() => changeItem(flower, '-')}
                    >
                      -
                    </Button>
                    <Button
                      className='w-full rounded-none text-2xl'
                      onClick={() => changeItem(flower, '+')}
                    >
                      +
                    </Button>
                  </>
                ) : (
                  <Button className='w-full rounded-none' onClick={() => changeItem(flower, '+')}>
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
      {flowers.length ? (
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

export default Flowers
