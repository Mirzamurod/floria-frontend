import Link from 'next/link'
import { TColumns } from '@/types/table'
import { getSum } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { TOrder } from '@/types/orders'

const columns: TColumns[] = [
  { field: 'orderNumber', headerName: 'Zakaz nomeri' },
  {
    field: 'customerId',
    headerName: 'Mijoz raqami',
    renderCell: ({ row }: { row: TOrder }) => <p>{row.customerId.phone}</p>,
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
