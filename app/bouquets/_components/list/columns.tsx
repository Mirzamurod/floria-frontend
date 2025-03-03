import Link from 'next/link'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { TColumns } from '@/types/table'
import { TBouquet } from '@/types/bouquet'
import { getSum } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import DeleteDialog from '@/components/DeleteDialog'
import { deleteBouquet, editBouquetBlock } from '@/store/bouquet'
import { Switch } from '@/components/ui/switch'
import { useAppSelector } from '@/store'

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
    field: 'categoryId',
    headerName: 'Kategoriya',
    renderCell: ({ row }: { row: TBouquet }) => <p>{row?.category?.name}</p>,
  },
  {
    field: 'block',
    headerName: 'Active',
    renderCell: ({ row }: { row: TBouquet }) => {
      const dispatch = useDispatch()

      const { isLoadingBlock } = useAppSelector(state => state.bouquet)

      const onChange = () => dispatch(editBouquetBlock(row._id, { block: !row.block }))

      return (
        <Switch defaultChecked={!row.block} onCheckedChange={onChange} disabled={isLoadingBlock} />
      )
    },
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
