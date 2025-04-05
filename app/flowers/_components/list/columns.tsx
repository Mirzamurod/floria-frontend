import Image from 'next/image'
import { TColumns } from '@/types/table'
import { getSum } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import DeleteDialog from '@/components/DeleteDialog'
import { deleteFlower, editFlowerBlock } from '@/store/flowers'
import { TFlower } from '@/types/flower'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store'
import { Switch } from '@/components/ui/switch'

const columns: TColumns[] = [
  {
    field: 'image',
    headerName: 'image',
    renderCell: ({ row }: { row: TFlower }) => (
      <Image src={row.image} alt={row.image} width={30} height={50} />
    ),
  },
  { field: 'name', headerName: 'name', sortable: true },
  {
    field: 'price',
    headerName: 'price',
    sortable: true,
    renderCell: ({ row }: { row: TFlower }) => <p>{getSum(row.price)}</p>,
  },
  {
    field: 'categoryId',
    headerName: 'category',
    sortable: true,
    renderCell: ({ row }: { row: TFlower }) => <p>{row?.category?.name}</p>,
  },
  {
    field: 'block',
    headerName: 'active',
    sortable: true,
    renderCell: ({ row }: { row: TFlower }) => {
      const dispatch = useDispatch()

      const { isLoadingBlock } = useAppSelector(state => state.bouquet)

      const onChange = () => dispatch(editFlowerBlock(row._id, { block: !row.block }))

      return (
        <Switch defaultChecked={!row.block} onCheckedChange={onChange} disabled={isLoadingBlock} />
      )
    },
  },
  {
    field: 'action',
    headerName: '',
    className: 'text-end',
    renderCell: ({ row }: { row: TFlower }) => (
      <>
        <Button asChild size='icon' variant='outline' className='mr-2'>
          <Link href={`/flowers/${row._id}`}>
            <Edit />
          </Link>
        </Button>
        <DeleteDialog data={row} deleteAction={deleteFlower} />
      </>
    ),
  },
]

export const mobileColumns: TColumns[] = [
  {
    field: 'image',
    headerName: 'image',
    renderCell: ({ row }: { row: TFlower }) => (
      <Image src={row.image} alt={row.image} width={30} height={50} />
    ),
  },
  {
    field: 'price',
    headerName: 'price',
    sortable: true,
    renderCell: ({ row }: { row: TFlower }) => (
      <div>
        <p>{row.name}</p>
        <p>{getSum(row.price)}</p>
        <p>{row?.category?.name}</p>
      </div>
    ),
  },
  {
    field: 'block',
    headerName: 'active',
    renderCell: ({ row }: { row: TFlower }) => {
      const dispatch = useDispatch()

      const { isLoadingBlock } = useAppSelector(state => state.bouquet)

      const onChange = () => dispatch(editFlowerBlock(row._id, { block: !row.block }))

      return (
        <Switch defaultChecked={!row.block} onCheckedChange={onChange} disabled={isLoadingBlock} />
      )
    },
  },
  {
    field: 'action',
    headerName: '',
    className: 'text-end',
    renderCell: ({ row }: { row: TFlower }) => (
      <>
        <Button asChild size='icon' variant='outline' className='mr-2'>
          <Link href={`/flowers/${row._id}`}>
            <Edit />
          </Link>
        </Button>
        <DeleteDialog data={row} deleteAction={deleteFlower} />
      </>
    ),
  },
]

export default columns
