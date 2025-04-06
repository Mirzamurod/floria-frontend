import { FC, Fragment } from 'react'
import Image from 'next/image'
import { addDays, addHours } from 'date-fns'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const { user } = useAppSelector(state => state.login)

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogContent>
        <DialogHeader className='text-start'>
          <DialogTitle>{t('check')}</DialogTitle>
          <DialogDescription>{t('checkdesc')}</DialogDescription>
        </DialogHeader>
        <ScrollArea className='max-h-[70vh]'>
          <p>{t('deliveryortakeaway')}</p>
          <RadioGroup value={delivery} onValueChange={setDelivery} className='mb-4 mt-1'>
            {user?.location ? (
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='takeaway' id='takeaway' />
                <Label htmlFor='takeaway'>{t('takeaway')}</Label>
              </div>
            ) : null}
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='delivery' id='delivery' />
              <Label htmlFor='delivery'>{t('delivery')}</Label>
            </div>
          </RadioGroup>
          {delivery === 'delivery' ? (
            <Alert className='mb-2'>
              <OctagonAlert className='h-4 w-4' />
              <AlertDescription>{t('locationwarning')}</AlertDescription>
            </Alert>
          ) : null}
          <p>{t('whenshouldready')}</p>
          <DatePicker date={date} setDate={setDate} />
          {date! > addDays(addHours(new Date(), 3), 2) ? (
            <Alert className='mt-2'>
              <OctagonAlert className='h-4 w-4' />
              <AlertDescription>{t('daywarning')}</AlertDescription>
            </Alert>
          ) : null}
          {!bouquets.length && !flowers.length ? <h3>{t('nodata')}</h3> : null}
          {bouquets.length ? (
            <>
              <p className='mt-2'>{t('bouquets')}</p>
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
              <p className='mt-2'>{t('custombouquet')}</p>
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
                <p>{t('total')}:</p>
                <p>{total(bouquets).totalUnit + total(flowers).totalUnit}</p>
                <p>{getSum(total(bouquets).totalSum + total(flowers).totalSum)}</p>
              </div>
            </>
          ) : null}
        </ScrollArea>
        <DialogFooter>
          <Button disabled={!bouquets.length && !flowers.length} onClick={onCheckout}>
            {t('ordering')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
