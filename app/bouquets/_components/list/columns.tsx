import Image from 'next/image'
import { TColumns } from '@/types/table'
import { TBouquet } from '@/types/bouquet'
import { getSum } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import DeleteDialog from '@/components/DeleteDialog'
import { deleteBouquet } from '@/store/bouquet'

const columns: TColumns[] = [
  {
    field: 'image',
    headerName: 'image',
    renderCell: ({ row }: { row: TBouquet }) => (
      <Image src={row.image} alt={row.image} width={30} height={50} />
    ),
  },
  {
    field: 'price',
    headerName: 'price',
    renderCell: ({ row }: { row: TBouquet }) => <p>{getSum(row.price)}</p>,
  },
  {
    field: 'action',
    headerName: 'action',
    className: 'text-end',
    renderCell: ({ row }: { row: TBouquet }) => (
      <>
        <Button size='icon' variant='outline' className='mr-2'>
          <Link href={`/bouquets/${row._id}`}>
            <Edit />
          </Link>
        </Button>
        <DeleteDialog data={row} deleteAction={deleteBouquet} />
      </>
    ),
  },
]

export default columns
