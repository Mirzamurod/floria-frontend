import Image from 'next/image'
import Link from 'next/link'
import { TColumns } from '@/types/table'
import { getSum } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { TFlower } from '@/types/flower'

const columns: TColumns[] = [
  {
    field: 'image',
    headerName: 'image',
    renderCell: ({ row }: { row: TFlower }) => (
      <Image src={row.image} alt={row.image} width={30} height={50} />
    ),
  },
  { field: 'name', headerName: 'name' },
  {
    field: 'price',
    headerName: 'price',
    renderCell: ({ row }: { row: TFlower }) => <p>{getSum(row.price)}</p>,
  },
  {
    field: 'action',
    headerName: 'action',
    className: 'text-end',
    renderCell: ({ row }: { row: TFlower }) => (
      <>
        <Button size='icon' variant='outline' className='mr-2'>
          <Link href={`/flowers/${row._id}`}>
            <Eye />
          </Link>
        </Button>
      </>
    ),
  },
]

export default columns
