import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { TColumns } from '@/types/table'
import { Button } from '@/components/ui/button'
import { EllipsisVertical, Eye } from 'lucide-react'
import { TOrder } from '@/types/orders'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { editOrder, sendMessageUnsubmitted } from '@/store/orders'
import { useAppSelector } from '@/store'
import { Badge } from '@/components/ui/badge'
import Prepayment from '@/components/prepayment'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { yandexgo } from '@/lib/constants'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'

const columns: TColumns[] = [
  {
    field: 'orderNumber',
    headerName: 'ordernumber',
    sortable: true,
    renderCell: ({ row }: { row: TOrder }) => (
      <Link href={`/orders/view/${row._id}`}>{row.orderNumber}</Link>
    ),
  },
  {
    field: 'status',
    headerName: 'changestatus',
    renderCell: ({ row }: { row: TOrder }) => {
      const dispatch = useDispatch()
      const { status } = useParams()
      const { t } = useTranslation()

      const { isLoading } = useAppSelector(state => state.orders)

      const confirm = () => dispatch(editOrder(row._id, { status: 'old' }))

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size='sm'
              disabled={status !== 'new' || (row.prepayment && row.payment === 'pending')}
            >
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
      )
    },
  },
  {
    field: 'customerId',
    headerName: 'customernumber',
    sortable: true,
    renderCell: ({ row }: { row: TOrder }) => <p>{row.customerId.phone}</p>,
  },
  {
    field: 'date',
    headerName: 'completiondate',
    sortable: true,
    renderCell: ({ row }: { row: TOrder }) => <p>{row?.date?.slice(0, 10)}</p>,
  },
  {
    field: 'prepayment',
    headerName: 'prepayment',
    sortable: true,
    renderCell: ({ row }: { row: TOrder }) => {
      return row.prepayment ? <Prepayment order={row!} /> : <Badge variant='destructive' />
    },
  },
  {
    field: 'prepaymentNumber',
    headerName: 'payment',
    sortable: true,
    renderCell: ({ row }: { row: TOrder }) =>
      row.prepaymentNumber ? (
        <p>{t('paidtimes', { number: row.prepaymentNumber })}</p>
      ) : (
        <Badge variant='destructive' />
      ),
  },
  {
    field: 'location',
    headerName: 'location',
    sortable: true,
    renderCell: ({ row }: { row: TOrder }) => {
      const { data: session } = useSession()
      const { t } = useTranslation()

      let data: any = {}
      if (session?.currentUser?.location?.split(', ').length) {
        data.start_lat = session?.currentUser?.location?.split(', ')[0]
        data.start_lon = session?.currentUser?.location?.split(', ')[1]
      }

      return row.location ? (
        <Link
          target='_blank'
          className='underline'
          href={yandexgo({
            end_lat: row.location.latitude,
            end_lon: row.location.longitude,
            ...(Object.keys(data).length ? data : {}),
          })}
        >
          {t('see')}
        </Link>
      ) : (
        <Badge variant='destructive' />
      )
    },
  },
  {
    field: 'bouquetId',
    headerName: 'bouquetsnumber',
    sortable: true,
    renderCell: ({ row }: { row: TOrder }) => <p>{row.bouquet?.qty}</p>,
  },
  {
    field: 'flowersId',
    headerName: 'flowersnumber',
    sortable: true,
    renderCell: ({ row }: { row: TOrder }) => <p>{row.flower?.qty}</p>,
  },
  {
    field: 'action',
    headerName: 'action',
    className: 'text-end',
    renderCell: ({ row }: { row: TOrder }) => {
      const { status } = useParams()
      const dispatch = useDispatch()
      const { t } = useTranslation()

      const sendMessage = () => dispatch(sendMessageUnsubmitted(row._id))

      return status === 'unsubmitted' ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='outline'>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href={`/orders/view/${row._id}`}>{t('vieworder')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={sendMessage}>{t('submittedorder')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild size='icon' variant='outline' className='mr-2'>
          <Link href={`/orders/view/${row._id}`}>
            <Eye />
          </Link>
        </Button>
      )
    },
  },
]

export const mobileColumns: TColumns[] = [
  {
    field: 'orderNumber',
    headerName: 'ordernumber',
    sortable: true,
    renderCell: ({ row }: { row: TOrder }) => (
      <Link href={`/orders/view/${row._id}`}>{row.orderNumber}</Link>
    ),
  },
  {
    field: 'date',
    headerName: 'info',
    sortable: true,
    renderCell: ({ row }: { row: TOrder }) => {
      const { data: session } = useSession()

      let data: any = {}
      if (session?.currentUser?.location?.split(', ').length) {
        data.start_lat = session?.currentUser?.location?.split(', ')[0]
        data.start_lon = session?.currentUser?.location?.split(', ')[1]
      }

      return (
        <div>
          <p>{row.customerId.phone}</p>
          <p className='mb-1'>{row?.date?.slice(0, 10)}</p>
          {row.prepayment ? <Prepayment order={row!} /> : <Badge variant='destructive' />}
          {/* {row.location ? (
            <Link
              target='_blank'
              className='underline'
              href={yandexgo({
                end_lat: row.location.latitude,
                end_lon: row.location.longitude,
                ...(Object.keys(data).length ? data : {}),
              })}
            >
              Ko'rish
            </Link>
          ) : null} */}
        </div>
      )
    },
  },
  {
    field: 'action',
    headerName: '',
    className: 'text-end',
    renderCell: ({ row }: { row: TOrder }) => {
      const { status } = useParams()
      const dispatch = useDispatch()
      const { t } = useTranslation()
      const [open, setOpen] = useState(false)

      const { isLoading } = useAppSelector(state => state.orders)

      const confirm = () => dispatch(editOrder(row._id, { status: 'old' }))

      const sendMessage = () => dispatch(sendMessageUnsubmitted(row._id))

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='text-end'>
              <Button size='icon' variant='outline'>
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {status === 'new' ? (
                <DropdownMenuItem
                  onClick={() => setOpen(true)}
                  disabled={row.prepayment && row.payment === 'pending'}
                >
                  {t('done')}
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem asChild>
                <Link href={`/orders/view/${row._id}`}>{t('vieworder')}</Link>
              </DropdownMenuItem>
              {status === 'unsubmitted' ? (
                <DropdownMenuItem onClick={sendMessage}>{t('submittedorder')}</DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={open} onOpenChange={setOpen}>
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
        </>
      )
    },
  },
]

export default columns
