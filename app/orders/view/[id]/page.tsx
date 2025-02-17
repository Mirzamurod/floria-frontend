'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { getOrder } from '@/store/orders'
import { useAppSelector } from '@/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getSum } from '@/lib/utils'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Skeleton } from '@/components/ui/skeleton'

const ViewOrder = () => {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()

  const { isLoading, order } = useAppSelector(state => state.orders)

  useEffect(() => {
    dispatch(getOrder(id as string))
  }, [id])

  return (
    <div>
      <div className='flex md:flex-row flex-col md:justify-between'>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>Zakazni ko'rish</h2>
        <Button onClick={() => router.back()}>Gullarga o'tish</Button>
      </div>
      {isLoading ? (
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-24' />
          <Skeleton className='h-24' />
          <Skeleton className='h-24' />
        </div>
      ) : (
        <div className='mb-4 mt-2'>
          <Card>
            <CardHeader>
              <CardTitle>Umumiy ma'lumot</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className='mt-5'>
              <p>
                <b>Mijor raqami: </b> &nbsp; {order?.customerId.phone}
              </p>
              <p>
                <b>Mijor ismi: </b> &nbsp; {order?.customerId.name}
              </p>
            </CardContent>
            {order?.bouquet.bouquets.length ? (
              <>
                <Separator />
                <CardContent className='mt-5'>
                  <p>
                    <b>Buketlar soni: </b> &nbsp; {order?.bouquet.qty} ta
                  </p>
                  <p>
                    <b>Buketlar narxi: </b> &nbsp; {getSum(order?.bouquet.price)}
                  </p>
                </CardContent>
              </>
            ) : null}
            {order?.flower.flowers.length ? (
              <>
                <Separator />
                <CardContent className='mt-5'>
                  <p>
                    <b>Gullar soni: </b> &nbsp; {order?.flower.qty} ta
                  </p>
                  <p>
                    <b>Umumiy narxi: </b> &nbsp; {getSum(order?.flower.price)}
                  </p>
                </CardContent>
              </>
            ) : null}
            <Separator />
            <CardContent className='mt-5'>
              <p>
                <b>Buketlar umumiy soni: </b> &nbsp; {order?.bouquet.qty! + order?.flower.qty!} ta
              </p>
              <p>
                <b>Buketlar umumiy narxi: </b> &nbsp;{' '}
                {getSum(order?.bouquet.price! + order?.flower.price!)}
              </p>
            </CardContent>
          </Card>
          {order?.bouquet.bouquets.length ? (
            <Card className='mt-2 p-6'>
              <Collapsible>
                <CollapsibleTrigger>Buketlar</CollapsibleTrigger>
                <CollapsibleContent className='mt-3'>
                  <div className='flex flex-wrap gap-4'>
                    {order.bouquet.bouquets.map(bouquet => (
                      <Card
                        key={bouquet.bouquetId._id}
                        className='w-auto overflow-hidden col-span-2'
                      >
                        <div className='relative w-44 h-40'>
                          <Image
                            fill
                            src={bouquet.bouquetId.image}
                            alt='bouquet image'
                            className='object-cover w-full h-auto'
                          />
                        </div>
                        <CardContent className='p-2'>
                          {bouquet.bouquetId.name ? (
                            <p>
                              <b>Nomi: </b> {bouquet.bouquetId.name}
                            </p>
                          ) : null}
                          <p>
                            <b>Narxi: </b>
                            {getSum(bouquet.price)}
                          </p>
                          <p>
                            <b>Soni: </b>
                            {bouquet.qty} ta
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ) : null}
          {order?.flower.flowers.length ? (
            <Card className='mt-2 p-6'>
              <Collapsible>
                <CollapsibleTrigger>Gullar</CollapsibleTrigger>
                <CollapsibleContent className='mt-3'>
                  <div className='flex flex-wrap gap-4'>
                    {order.flower.flowers.map(flower => (
                      <Card key={flower.flowerId._id} className='w-auto overflow-hidden col-span-2'>
                        <div className='relative w-44 h-40'>
                          <Image
                            fill
                            src={flower.flowerId.image}
                            alt='flower image'
                            className='object-cover w-full h-auto'
                          />
                        </div>
                        <CardContent className='p-2'>
                          {flower.flowerId.name ? (
                            <p>
                              <b>Nomi: </b> {flower.flowerId.name}
                            </p>
                          ) : null}
                          <p>
                            <b>Narxi: </b>
                            {getSum(flower.price)}
                          </p>
                          <p>
                            <b>Soni: </b>
                            {flower.qty} ta
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default ViewOrder
