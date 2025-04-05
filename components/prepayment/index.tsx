import { FC } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { TOrder } from '@/types/orders'
import { editOrder } from '@/store/orders'

interface IProps {
  order: TOrder
}

const Prepayment: FC<IProps> = props => {
  const { order } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const buttonColor = {
    accepted: 'bg-green-600 hover:bg-green-700',
    cancelled: 'bg-red-600 hover:bg-red-700',
    pending: 'bg-amber-600 hover:bg-amber-700',
  }

  const changeOrder = (payment: TOrder['payment']) => dispatch(editOrder(order._id, { payment }))

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' className={`${buttonColor[order.payment]} text-white`}>
          {t('see')}
        </Button>
      </DialogTrigger>
      <DialogContent className='h-[calc(100vh-100px)]'>
        <DialogHeader className='z-20'>
          <DialogTitle>
            {t('ordernumber')}: {order.orderNumber}
          </DialogTitle>
          <DialogDescription>{order.customerId.phone}</DialogDescription>
        </DialogHeader>
        <div className='h-max'>
          <Image
            fill
            alt='prepayment_image'
            src={order.prepaymentImage}
            className='object-contain h-auto'
          />
        </div>
        <DialogFooter className='gap-2 mt-auto z-20'>
          <Button
            size='sm'
            variant='destructive'
            disabled={
              order.payment === 'cancelled' ||
              order.prepaymentNumber > 2 ||
              order.status === 'cancelled'
            }
            onClick={() => changeOrder('cancelled')}
          >
            {t('fake')}
          </Button>
          <Button
            size='sm'
            disabled={
              order.payment === 'accepted' ||
              order.prepaymentNumber > 2 ||
              order.status === 'cancelled'
            }
            onClick={() => changeOrder('accepted')}
          >
            {t('real')}
          </Button>
          <DialogClose asChild>
            <Button size='sm' variant='outline'>
              {t('close')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Prepayment
