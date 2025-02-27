'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
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
import { getPublicBouquets } from '@/store/bouquet'
import { getPublicFlowers } from '@/store/flowers'
import { themeConfig } from '@/lib/constants'
import { getPublicCategories } from '@/store/category'

const Orders = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const [bouquets, setBouquets] = useState<IBouquet[]>([])
  const [flowers, setFlowers] = useState<IFlower[]>([])
  const [open, setOpen] = useState(false)
  const [popup, setPopup] = useState(false)
  const [delivery, setDelivery] = useState<'takeaway' | 'delivery'>('takeaway')
  const [bouquetsPage, setBouquetsPage] = useState(1)
  const [bouquetsLimit, setBouquetsLimit] = useState('10')
  const [flowersPage, setFlowersPage] = useState(1)
  const [flowersLimit, setFlowersLimit] = useState('10')
  const [category, setCategory] = useState('')

  const telegram = window.Telegram.WebApp

  useEffect(() => {
    const checkTelegramApi = () => {
      if (window.Telegram?.WebApp) {
        telegram.ready()
        console.log('Telegram WepApp Api muvaffaqiyatli yuklandi')
        telegram.expand()
      } else {
        console.error('Telegram WebApp Api hali yuklanmagan. Tekshirish davom etmoqda...')
        setTimeout(checkTelegramApi, 500)
      }
    }

    dispatch(getPublicCategories(userId as string))

    checkTelegramApi()
  }, [])

  useEffect(() => {
    if (bouquetsPage && bouquetsLimit)
      dispatch(
        getPublicBouquets(userId as string, { page: bouquetsPage, limit: bouquetsLimit, category })
      )
  }, [bouquetsPage, bouquetsLimit, userId, category])

  useEffect(() => {
    if (flowersPage && flowersLimit)
      dispatch(
        getPublicFlowers(userId as string, { page: flowersPage, limit: flowersLimit, category })
      )
  }, [flowersPage, flowersLimit, userId, category])

  useEffect(() => {
    if (open || popup) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open, popup])

  const total = (items: IBouquet[] | IFlower[]): { totalUnit: number; totalSum: number } => {
    let totalUnit = 0
    let totalSum = 0

    totalUnit = items.reduce((a, b) => a + b.qty, 0)
    totalSum = items.reduce((a, b) => a + +b.price, 0)

    return { totalUnit, totalSum }
  }

  const deleteItem = (type: 'bouquet' | 'flower', item: IBouquet | IFlower) => {
    if (type === 'bouquet') {
      let data = bouquets.filter(i => i.bouquetId !== (item as IBouquet).bouquetId)
      setBouquets([...data])
    } else {
      let data = flowers.filter(i => i.flowerId !== (item as IFlower).flowerId)
      setFlowers([...data])
    }
  }

  const changeItem = (
    type: 'bouquet' | 'flower',
    operator: '-' | '+',
    item: IBouquet | IFlower
  ) => {
    let data: (IBouquet | IFlower)[] = []
    let items = type === 'bouquet' ? bouquets : flowers
    let key = type === 'bouquet' ? 'bouquetId' : 'flowerId'
    let state = type === 'bouquet' ? setBouquets : setFlowers
    if (operator === '+') {
      items.map(i =>
        // @ts-ignore
        i[key] === item[key]
          ? data.push({ ...i, qty: i.qty + 1, price: +i.price + +(i.price / i.qty) })
          : data.push(i)
      )
      // @ts-ignore
      state([...data])
    } else {
      // @ts-ignore
      if (items.find(i => i[key] === item[key])?.qty === 1) {
        // @ts-ignore
        data = items.filter(i => i[key] !== item[key])
        // @ts-ignore
        state([...data])
      } else {
        items.map(i =>
          // @ts-ignore
          i[key] === item[key]
            ? data.push({ ...i, qty: i.qty - 1, price: i.price - i.price / i.qty })
            : data.push(i)
        )
        // @ts-ignore
        state([...data])
      }
    }
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
          <div className='flex gap-2 items-center'>
            <Image src='/flower-icon.webp' alt='flower-icon' width={36} height={36} />
            <p className='text-xl'>{themeConfig.app.name}</p>
          </div>
          <div className='flex gap-x-2'>
            <Popover open={popup} onOpenChange={setPopup}>
              <PopoverTrigger asChild>
                <Button variant='ghost' size='icon' className='relative'>
                  <ShoppingCart />
                  {bouquets.length || flowers.length ? (
                    <div className='absolute top-0 right-0 bg-primary h-3 w-3 rounded-full' />
                  ) : null}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Popup
                  bouquets={bouquets}
                  flowers={flowers}
                  setOpen={setOpen}
                  total={total}
                  deleteItem={deleteItem}
                  changeItem={changeItem}
                />
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
          <Bouquets
            items={bouquets}
            setItems={setBouquets}
            page={bouquetsPage}
            setPage={setBouquetsPage}
            limit={bouquetsLimit}
            setLimit={setBouquetsLimit}
            active={category}
            setActive={setCategory}
          />
        </TabsContent>
        <TabsContent value='flowers'>
          <Flowers
            items={flowers}
            setItems={setFlowers}
            page={flowersPage}
            setPage={setFlowersPage}
            limit={flowersLimit}
            setLimit={setFlowersLimit}
            active={category}
            setActive={setCategory}
          />
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
        deleteItem={deleteItem}
        changeItem={changeItem}
      />
    </div>
  )
}

export default Orders
