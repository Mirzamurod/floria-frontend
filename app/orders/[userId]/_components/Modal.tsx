import { FC, Fragment } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { IBouquet, IFlower } from '@/types/orders'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { getSum } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface IProps {
  open: boolean
  setOpen: (value: boolean) => void
  total: (items: IBouquet[] | IFlower[]) => { totalUnit: number; totalSum: number }
  onCheckout: () => void
  bouquets: IBouquet[]
  flowers: IFlower[]
  delivery: 'takeaway' | 'delivery'
  setDelivery: (value: 'takeaway' | 'delivery') => void
}

const Modal: FC<IProps> = props => {
  const { open, setOpen, total, onCheckout, bouquets, flowers, delivery, setDelivery } = props

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className='text-start'>
          <DialogTitle>Tekshirish</DialogTitle>
          <DialogDescription>Buket va gullarni to'g'riligini tekshiring</DialogDescription>
        </DialogHeader>
        <div>
          <p>Yetkazib berish turi</p>
          <RadioGroup value={delivery} onValueChange={setDelivery} className='mb-4'>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='takeaway' id='takeaway' />
              <Label htmlFor='takeaway'>Olib ketish</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='delivery' id='delivery' />
              <Label htmlFor='delivery'>Yetkazib berish</Label>
            </div>
          </RadioGroup>
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
              <Separator className='my-2' />
            </>
          ) : null}
          {bouquets.length || flowers.length ? (
            <>
              <div className='flex justify-between items-center mt-2'>
                <p>Umumiy:</p>
                <p>{total(bouquets).totalUnit + total(flowers).totalUnit}</p>
                <p>{getSum(total(bouquets).totalSum + total(flowers).totalSum)}</p>
              </div>
            </>
          ) : null}
        </div>
        <DialogFooter>
          <Button disabled={!bouquets.length && !flowers.length} onClick={onCheckout}>
            Zakaz berish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
