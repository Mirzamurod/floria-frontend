import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { TColumns } from '@/types/table'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
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
import { editOrder } from '@/store/orders'
import { useAppSelector } from '@/store'
import { Badge } from '@/components/ui/badge'
import Prepayment from '@/components/prepayment'

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

      const { isLoading } = useAppSelector(state => state.orders)

      const confirm = () => dispatch(editOrder(row._id, { status: 'old' }))

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button size='sm'>Tayyor</Button>
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
    renderCell: ({ row }: { row: TOrder }) => (
      <>
        <Button asChild size='icon' variant='outline' className='mr-2'>
          <Link href={`/orders/view/${row._id}`}>
            <Eye />
          </Link>
        </Button>
      </>
    ),
  },
]

export default columns
