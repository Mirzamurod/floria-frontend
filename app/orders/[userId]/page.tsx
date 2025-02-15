'use client'

import { Fragment, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getSum } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Bouquets from './_components/Bouquets'
import Flowers from './_components/Flowers'

interface IBouquet {
  bouquetId: string
  qty: number
  price: number
  image: string
}

interface IFlower {
  flowerId: string
  qty: number
  price: number
  image: string
}

const Orders = () => {
  const [bouquets, setBouquets] = useState<IBouquet[]>([])
  const [flowers, setFlowers] = useState<IFlower[]>([])

  const telegram = window.Telegram.WebApp

  useEffect(() => {
    const checkTelegramApi = () => {
      if (window.Telegram?.WebApp) {
        telegram.ready()
        console.log('Telegram WepApp Api muvaffaqiyatli yuklandi')
      } else {
        console.error('Telegram WebApp Api hali yuklanmagan. Tekshirish davom etmoqda...')
        setTimeout(checkTelegramApi, 500)
      }
    }

    checkTelegramApi()
  }, [])

  const onCheckout = () => {
    console.log({ bouquets, flowers })
    telegram.MainButton.text = 'Sotib olish'
    telegram.MainButton.show()
  }

  const onSendData = useCallback(() => {
    const data = { bouquets, flowers }
    telegram.sendData(JSON.stringify(data))
  }, [bouquets, flowers])

  useEffect(() => {
    telegram.onEvent('mainButtonClicked', onSendData)

    return () => telegram.offEvent('mainButtonClicked', onSendData)
  }, [onSendData])

  const total = (items: IBouquet[] | IFlower[]): { totalUnit: number; totalSum: number } => {
    let totalUnit = 0
    let totalSum = 0

    totalUnit = items.reduce((a, b) => a + b.qty, 0)
    totalSum = items.reduce((a, b) => a + +b.price, 0)

    return { totalUnit, totalSum }
  }

  return (
    <div>
      {/* Sidebar */}
      <div className='sticky top-0 z-20 bg-background'>
        <div className='flex justify-between p-2'>
          <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight'>Gullar</h2>
          <div className='flex gap-x-2'>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='ghost' size='icon' className='relative'>
                  <ShoppingCart />
                  {bouquets.length || flowers.length ? (
                    <div className='absolute top-0 right-0 bg-primary h-3 w-3 rounded-full' />
                  ) : null}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                {!bouquets.length && !flowers.length ? <h3>No data</h3> : null}
                {bouquets.length ? (
                  <>
                    <p>Buketlar</p>
                    {bouquets.map(item => (
                      <Fragment key={item.bouquetId}>
                        <div className='flex justify-between items-center mt-2'>
                          <Image src={item.image} alt='Bouquet image' width={40} height={50} />
                          <p>{item.qty}</p>
                          <p>{getSum(item.price)}</p>
                        </div>
                      </Fragment>
                    ))}
                    <div className='flex justify-between items-center mt-2'>
                      <p>Umumiy:</p>
                      <p>{total(bouquets).totalUnit}</p>
                      <p>{getSum(total(bouquets).totalSum)}</p>
                    </div>
                    <Separator className='my-2' />
                  </>
                ) : null}
                {flowers.length ? (
                  <>
                    <p>Maxsus guldasta</p>
                    {flowers.map(item => (
                      <Fragment key={item.flowerId}>
                        <div className='flex justify-between items-center mt-2'>
                          <Image src={item.image} alt='Bouquet image' width={40} height={50} />
                          <p>{item.qty}</p>
                          <p>{getSum(item.price)}</p>
                        </div>
                      </Fragment>
                    ))}
                    <div className='flex justify-between items-center mt-2'>
                      <p>Umumiy:</p>
                      <p>{total(flowers).totalUnit}</p>
                      <p>{getSum(total(flowers).totalSum)}</p>
                    </div>
                  </>
                ) : null}
                {bouquets.length && flowers.length ? (
                  <>
                    <Separator className='my-2' />
                    <div className='flex justify-between items-center mt-2'>
                      <p>Umumiy:</p>
                      <p>{total(bouquets).totalUnit + total(flowers).totalUnit}</p>
                      <p>{getSum(total(bouquets).totalSum + total(flowers).totalSum)}</p>
                    </div>
                  </>
                ) : null}
                <Button
                  className='w-full mt-2'
                  disabled={!bouquets.length && !flowers.length}
                  onClick={onCheckout}
                >
                  Zakaz berish
                </Button>
              </PopoverContent>
            </Popover>
            <ModeToggle />
          </div>
        </div>
        <Separator />
      </div>
      {/* Tabs */}
      <Tabs defaultValue='bouquets' className='mt-4 container'>
        <TabsList>
          <TabsTrigger value='bouquets'>Buketlar</TabsTrigger>
          <TabsTrigger value='flowers'>Gullar</TabsTrigger>
        </TabsList>
        <TabsContent value='bouquets'>
          <Bouquets items={bouquets} setItems={setBouquets} />
        </TabsContent>
        <TabsContent value='flowers'>
          <Flowers items={flowers} setItems={setFlowers} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Orders
