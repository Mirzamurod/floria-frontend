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
    headerName: 'Rasm',
    renderCell: ({ row }: { row: TBouquet }) => (
      <Image src={row.image} alt={row.image} width={30} height={50} />
    ),
  },
  {
    field: 'price',
    headerName: 'Narx',
    renderCell: ({ row }: { row: TBouquet }) => <p>{getSum(row.price)}</p>,
  },
  {
    field: 'action',
    headerName: '',
    className: 'text-end',
    renderCell: ({ row }: { row: TBouquet }) => (
      <>
        <Button asChild size='icon' variant='outline' className='mr-2'>
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
