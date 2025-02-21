'use client'

import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Bouquets from './_components/Bouquets'
import Flowers from './_components/Flowers'
import Modal from './_components/Modal'
import Popup from './_components/Popup'
import { IBouquet, IFlower } from '@/types/orders'

const Orders = () => {
  const { userId } = useParams()
  const [bouquets, setBouquets] = useState<IBouquet[]>([])
  const [flowers, setFlowers] = useState<IFlower[]>([])
  const [open, setOpen] = useState(false)
  const [delivery, setDelivery] = useState<'takeaway' | 'delivery'>('takeaway')

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

  const total = (items: IBouquet[] | IFlower[]): { totalUnit: number; totalSum: number } => {
    let totalUnit = 0
    let totalSum = 0

    totalUnit = items.reduce((a, b) => a + b.qty, 0)
    totalSum = items.reduce((a, b) => a + +b.price, 0)

    return { totalUnit, totalSum }
  }

  const onCheckout = () => {
    telegram.MainButton.text = 'Sotib olish'
    telegram.MainButton.show()
  }

  const onSendData = useCallback(() => {
    const data = {
      userId,
      delivery,
      bouquet: { bouquets, qty: total(bouquets).totalUnit, price: total(bouquets).totalSum },
      flower: { flowers, qty: total(flowers).totalUnit, price: total(flowers).totalSum },
    }
    telegram.sendData(JSON.stringify(data))
  }, [bouquets, flowers, delivery, userId])

  useEffect(() => {
    telegram.onEvent('mainButtonClicked', onSendData)

    return () => telegram.offEvent('mainButtonClicked', onSendData)
  }, [onSendData])

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
                <Popup bouquets={bouquets} flowers={flowers} setOpen={setOpen} total={total} />
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
      <Modal
        open={open}
        setOpen={setOpen}
        bouquets={bouquets}
        flowers={flowers}
        onCheckout={onCheckout}
        total={total}
        delivery={delivery}
        setDelivery={setDelivery}
      />
    </div>
  )
}

export default Orders
