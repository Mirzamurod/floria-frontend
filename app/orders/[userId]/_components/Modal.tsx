import { FC, Fragment } from 'react'
import Image from 'next/image'
import { addDays, addHours } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { IBouquet, IFlower } from '@/types/orders'
import { Separator } from '@/components/ui/separator'
import { getSum } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CircleX, Minus, OctagonAlert, Plus } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import DatePicker from './DatePicker'
import { useAppSelector } from '@/store'

interface IProps {
  open: boolean
  setOpen: (value: boolean) => void
  total: (items: IBouquet[] | IFlower[]) => { totalUnit: number; totalSum: number }
  onCheckout: () => void
  bouquets: IBouquet[]
  flowers: IFlower[]
  delivery: 'takeaway' | 'delivery'
  setDelivery: (value: 'takeaway' | 'delivery') => void
  deleteItem: (type: 'bouquet' | 'flower', item: IBouquet | IFlower) => void
  changeItem: (type: 'bouquet' | 'flower', operator: '-' | '+', item: IBouquet | IFlower) => void
  date?: Date
  setDate?: (date?: Date) => void
}

const Modal: FC<IProps> = props => {
  const {
    open,
    setOpen,
    total,
    onCheckout,
    bouquets,
    flowers,
    delivery,
    setDelivery,
    deleteItem,
    changeItem,
    date,
    setDate,
  } = props
  const { user } = useAppSelector(state => state.login)

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogContent>
        <DialogHeader className='text-start'>
          <DialogTitle>Tekshirish</DialogTitle>
          <DialogDescription>Buket va gullarni to'g'riligini tekshiring</DialogDescription>
        </DialogHeader>
        <ScrollArea className='max-h-[70vh]'>
          <p>Yetkazib berish yoki olib ketish</p>
          <RadioGroup value={delivery} onValueChange={setDelivery} className='mb-4 mt-1'>
            {user?.location ? (
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='takeaway' id='takeaway' />
                <Label htmlFor='takeaway'>Olib ketish</Label>
              </div>
            ) : null}
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='delivery' id='delivery' />
              <Label htmlFor='delivery'>Yetkazib berish</Label>
            </div>
          </RadioGroup>
          {delivery === 'delivery' ? (
            <Alert className='mb-2'>
              <OctagonAlert className='h-4 w-4' />
              <AlertDescription>
                Zakaz berishni bosganingizdan keyin telegram orqali manzilni yuboring!
              </AlertDescription>
            </Alert>
          ) : null}
          <p>Qachonga tayyor bo'lishi kerak?</p>
          <DatePicker date={date} setDate={setDate} />
          {date! > addDays(addHours(new Date(), 3), 2) ? (
            <Alert className='mt-2'>
              <OctagonAlert className='h-4 w-4' />
              <AlertDescription>
                Agar zakaz 2 yoki undan ko'proq kundan keyin tayyorlab berilishi kerak bo'lsa,
                to'lov oldindan qilinadi. To'lov zakaz qilinganidan keyin telegram orqali karta
                raqami beriladi, shunga kerakli summani tashlab rasmini jo'natishingiz kerak
                bo'ladi.
              </AlertDescription>
            </Alert>
          ) : null}
          {!bouquets.length && !flowers.length ? <h3>Ma'lumot yo'q</h3> : null}
          {bouquets.length ? (
            <>
              <p className='mt-2'>Buketlar</p>
              {bouquets.map(item => (
                <Fragment key={item.bouquetId}>
                  <div className='flex justify-between items-center mt-1'>
                    <Image src={item.image} alt='Bouquet image' width={40} height={50} />
                    <div className='flex gap-3 items-center py-1 px-2'>
                      <Button
                        size='icon'
                        variant='secondary'
                        onClick={() => changeItem('bouquet', '-', item)}
                      >
                        <Minus />
                      </Button>
                      <p>{item.qty}</p>
                      <Button
                        size='icon'
                        variant='secondary'
                        onClick={() => changeItem('bouquet', '+', item)}
                      >
                        <Plus />
                      </Button>
                    </div>
                    <div className='flex gap-1 items-center'>
                      <p>{getSum(item.price)}</p>
                      <Button
                        size='icon'
                        variant='ghost'
                        onClick={() => deleteItem('bouquet', item)}
                      >
                        <CircleX />
                      </Button>
                    </div>
                  </div>
                </Fragment>
              ))}
              <Separator className='my-2' />
            </>
          ) : null}
          {flowers.length ? (
            <>
              <p className='mt-2'>Maxsus guldasta</p>
              {flowers.map(item => (
                <Fragment key={item.flowerId}>
                  <div className='flex justify-between items-center mt-1'>
                    <Image src={item.image} alt='Bouquet image' width={40} height={50} />
                    <div className='flex gap-3 items-center py-1 px-2'>
                      <Button
                        size='icon'
                        variant='secondary'
                        onClick={() => changeItem('flower', '-', item)}
                      >
                        <Minus />
                      </Button>
                      <p>{item.qty}</p>
                      <Button
                        size='icon'
                        variant='secondary'
                        onClick={() => changeItem('flower', '+', item)}
                      >
                        <Plus />
                      </Button>
                    </div>
                    <div className='flex gap-2'>
                      <p>{getSum(item.price)}</p>
                      <Button
                        size='icon'
                        variant='ghost'
                        onClick={() => deleteItem('flower', item)}
                      >
                        <CircleX />
                      </Button>
                    </div>
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
        </ScrollArea>
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
