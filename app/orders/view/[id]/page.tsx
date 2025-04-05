'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { editOrder, getOrder } from '@/store/orders'
import { useAppSelector } from '@/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getSum } from '@/lib/utils'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Prepayment from '@/components/prepayment'
import { yandexgo } from '@/lib/constants'

const ViewOrder = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const { t } = useTranslation()

  const { isLoading, order, success } = useAppSelector(state => state.orders)

  const confirm = () => dispatch(editOrder(order?._id!, { status: 'old' }))

  let data: any = {}
  if (session?.currentUser?.location?.split(', ').length) {
    data.start_lat = session?.currentUser?.location?.split(', ')[0]
    data.start_lon = session?.currentUser?.location?.split(', ')[1]
  }

  useEffect(() => {
    dispatch(getOrder(id as string))
  }, [id])

  useEffect(() => {
    if (success) dispatch(getOrder(id as string))
  }, [id, success])

  return (
    <div>
      <div className='flex md:flex-row flex-col md:justify-between'>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>{t('vieworder')}</h2>
        {order ? (
          <Button asChild>
            <Link href={`/orders/status/${order?.status}`}>{t('goorders')}</Link>
          </Button>
        ) : null}
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
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>{t('generalinfo')}</CardTitle>
              {order?.status === 'new' ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size='sm' disabled={order.prepayment && order.payment === 'pending'}>
                      {t('done')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('areyousure')}</DialogTitle>
                    </DialogHeader>
                    <DialogFooter className='gap-2'>
                      <Button onClick={confirm} disabled={isLoading}>
                        {t('yes')}
                      </Button>
                      <DialogClose asChild>
                        <Button variant='secondary' disabled={isLoading}>
                          {t('no')}
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : null}
            </CardHeader>
            <Separator />
            <CardContent className='mt-5'>
              <p>
                <b>{t('customernumber')}: </b> &nbsp; {order?.customerId.phone}
              </p>
              <p>
                <b>{t('customernumber')}: </b> &nbsp; {order?.customerId.name}
              </p>
              <p>
                <b>{t('completiondate')}: </b> &nbsp; {order?.date?.slice(0, 10)}
              </p>
              {order?.prepaymentImage ? (
                <div>
                  <b>{t('prepayment')}: </b> &nbsp;
                  <Prepayment order={order!} />
                </div>
              ) : null}
              {order?.location ? (
                <div>
                  <b>{t('location')}: </b> &nbsp;
                  <Link
                    target='_blank'
                    className='underline'
                    href={yandexgo({
                      end_lat: order.location.latitude,
                      end_lon: order.location.longitude,
                      ...(Object.keys(data).length ? data : {}),
                    })}
                  >
                    {t('see')}
                  </Link>
                </div>
              ) : null}
            </CardContent>
            {order?.bouquet.bouquets.length ? (
              <>
                <Separator />
                <CardContent className='mt-5'>
                  <p>
                    <b>{t('bouquetsnumber')}: </b> &nbsp; {order?.bouquet?.qty}
                  </p>
                  <p>
                    <b>{t('bouquetsprice')}: </b> &nbsp; {getSum(order?.bouquet.price)}
                  </p>
                </CardContent>
              </>
            ) : null}
            {order?.flower.flowers.length ? (
              <>
                <Separator />
                <CardContent className='mt-5'>
                  <p>
                    <b>{t('flowersnumber')}: </b> &nbsp; {order?.flower.qty}
                  </p>
                  <p>
                    <b>{t('flowersprice')}: </b> &nbsp; {getSum(order?.flower.price)}
                  </p>
                </CardContent>
              </>
            ) : null}
            <Separator />
            <CardContent className='mt-5'>
              <p>
                <b>{t('totalnumberbouquets')}: </b> &nbsp;{' '}
                {isNaN(order?.bouquet.qty! + order?.flower.qty!)
                  ? 0
                  : order?.bouquet.qty! + order?.flower.qty!}{' '}
                ta
              </p>
              <p>
                <b>{t('totalpricebouquets')}: </b> &nbsp;{' '}
                {getSum(order?.bouquet.price! + order?.flower.price!)}
              </p>
            </CardContent>
          </Card>
          {order?.bouquet.bouquets.length ? (
            <Card className='mt-2 p-6'>
              <Collapsible>
                <CollapsibleTrigger>{t('bouquets')}</CollapsibleTrigger>
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
                              <b>{t('name')}: </b> {bouquet.bouquetId.name}
                            </p>
                          ) : null}
                          <p>
                            <b>{t('price')}: </b>
                            {getSum(bouquet.price)}
                          </p>
                          <p>
                            <b>{t('number')}: </b>
                            {bouquet.qty}
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
                <CollapsibleTrigger>{t('flowers')}</CollapsibleTrigger>
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
                              <b>{t('name')}: </b> {flower.flowerId.name}
                            </p>
                          ) : null}
                          <p>
                            <b>{t('price')}: </b>
                            {getSum(flower.price)}
                          </p>
                          <p>
                            <b>{t('price')}: </b>
                            {flower.qty}
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
