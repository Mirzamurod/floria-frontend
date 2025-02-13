import { FC, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store'
import { Card, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { getPublicFlowers } from '@/store/flowers'
import { TFlower } from '@/types/flower'

type TItem = { flowerId: string; qty: number; price: number; image: string }

interface IProps {
  items: TItem[]
  setItems: (value: TItem[]) => void
}

const Flowers: FC<IProps> = props => {
  const { items, setItems } = props
  const { userId } = useParams()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('10')

  const { isLoading, flowers, pageCount } = useAppSelector(state => state.flower)

  useEffect(() => {
    dispatch(getPublicFlowers(userId as string, { page, pageCount: limit }))
  }, [page, pageCount, userId])

  const onChange = (item: { page: number; limit: string }) => {
    setPage(item.page)
    setLimit(item.limit)
  }

  const changeItem = (item: TFlower, operator: '-' | '+') => {
    let data: TItem[] = []
    if (!items.some(i => i.flowerId === item._id))
      setItems([
        ...items,
        { flowerId: item._id, qty: 1, price: item.price as number, image: item.image },
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
    <div className='my-4'>
      <p>{userId}</p>
      <div className='grid grid-cols-2 gap-4'>
        {isLoading ? (
          [...new Array(4)].map((_, index) => (
            <Card key={index}>
              <Skeleton className='h-40 w-full rounded-none' />
              <Skeleton className='h-8 w-full mt-1 rounded-none' />
            </Card>
          ))
        ) : flowers.length ? (
          flowers.map(flower => (
            <Card key={flower._id} className='w-auto overflow-hidden'>
              <div className='relative w-full h-40'>
                <Image
                  fill
                  src={flower.image}
                  alt='flower image'
                  className='object-cover w-full h-auto'
                />
                {items.some(item => item.flowerId === flower._id) ? (
                  <div className='absolute top-2 left-2 w-6 h-6 text-center rounded-lg bg-primary'>
                    {items.find(item => item.flowerId === flower._id)?.qty}
                  </div>
                ) : null}
              </div>
              <CardFooter className='p-0'>
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
                    Add
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <h3>No data</h3>
        )}
      </div>
      {flowers.length ? (
        <div className='w-auto mt-4'>
          <ReactPaginate
            previousLabel='<'
            nextLabel='>'
            breakLabel='...'
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
