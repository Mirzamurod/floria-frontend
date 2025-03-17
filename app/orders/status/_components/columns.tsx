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

const columns: TColumns[] = [
  {
    field: 'orderNumber',
    headerName: 'Zakaz nomeri',
    renderCell: ({ row }: { row: TOrder }) => (
      <Link href={`/orders/view/${row._id}`}>{row.orderNumber}</Link>
    ),
  },
  {
    field: 'status',
    headerName: "Holarni o'zgartirish",
    renderCell: ({ row }: { row: TOrder }) => {
      const dispatch = useDispatch()
      const { status } = useParams()

      const { isLoading } = useAppSelector(state => state.orders)

      const confirm = () => dispatch(editOrder(row._id, { status: 'old' }))

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button size='sm' disabled={status !== 'new'}>
              Tayyor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ishonchingiz komilmi?</DialogTitle>
            </DialogHeader>
            <DialogFooter className='gap-2'>
              <Button onClick={confirm} disabled={isLoading}>
                Ha
              </Button>
              <DialogClose asChild>
                <Button variant='secondary' disabled={isLoading}>
                  Yo'q
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
    headerName: 'Mijoz raqami',
    renderCell: ({ row }: { row: TOrder }) => <p>{row.customerId.phone}</p>,
  },
  {
    field: 'date',
    headerName: "Tayyor bo'lish sanasi",
    renderCell: ({ row }: { row: TOrder }) => <p>{row?.date?.slice(0, 10)}</p>,
  },
  {
    field: 'prepayment',
    headerName: "Oldindan to'lov",
    renderCell: ({ row }: { row: TOrder }) => {
      return row.prepayment ? <Prepayment order={row!} /> : <Badge variant='destructive' />
    },
  },
  {
    field: 'prepaymentNumber',
    headerName: "To'lov",
    renderCell: ({ row }: { row: TOrder }) =>
      row.prepaymentNumber ? (
        <p>{row.prepaymentNumber} marta to'lov qilindi.</p>
      ) : (
        <Badge variant='destructive' />
      ),
  },
  {
    field: 'location',
    headerName: 'Manzil',
    renderCell: ({ row }: { row: TOrder }) => {
      const { data: session } = useSession()

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
          Ko'rish
        </Link>
      ) : (
        <Badge variant='destructive' />
      )
    },
  },
  {
    field: 'bouquetId',
    headerName: 'Buketlar soni',
    renderCell: ({ row }: { row: TOrder }) => <p>{row.bouquet?.qty}</p>,
  },
  {
    field: 'flowersId',
    headerName: 'Gullar soni',
    renderCell: ({ row }: { row: TOrder }) => <p>{row.flower?.qty}</p>,
  },
  {
    field: 'action',
    headerName: 'action',
    className: 'text-end',
    renderCell: ({ row }: { row: TOrder }) => {
      const { status } = useParams()
      const dispatch = useDispatch()

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
              <Link href={`/orders/view/${row._id}`}>Zakazni ko'rish</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={sendMessage}>Zakazni topshirdim</DropdownMenuItem>
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
    headerName: 'Zakaz nomeri',
    renderCell: ({ row }: { row: TOrder }) => (
      <Link href={`/orders/view/${row._id}`}>{row.orderNumber}</Link>
    ),
  },
  {
    field: 'date',
    headerName: "Ma'lumot",
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
          <p>{row?.date?.slice(0, 10)}</p>
          {row.location ? (
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
          ) : null}
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
                <DropdownMenuItem onClick={() => setOpen(true)}>Zakaz tayyor</DropdownMenuItem>
              ) : null}
              <DropdownMenuItem asChild>
                <Link href={`/orders/view/${row._id}`}>Zakazni ko'rish</Link>
              </DropdownMenuItem>
              {status === 'unsubmitted' ? (
                <DropdownMenuItem onClick={sendMessage}>Zakazni topshirdim</DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ishonchingiz komilmi?</DialogTitle>
              </DialogHeader>
              <DialogFooter className='gap-2'>
                <Button onClick={confirm} disabled={isLoading}>
                  Ha
                </Button>
                <DialogClose asChild>
                  <Button variant='secondary' disabled={isLoading}>
                    Yo'q
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
