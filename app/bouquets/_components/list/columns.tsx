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
import getCategory from '@/lib/getCategory'
import { useTranslation } from 'react-i18next'

const columns: TColumns[] = [
  {
    field: 'image',
    headerName: 'image',
    renderCell: ({ row }: { row: TBouquet }) => (
      <Image src={row.image} alt={row.image} width={30} height={50} unoptimized />
    ),
  },
  {
    field: 'price',
    headerName: 'price',
    sortable: true,
    renderCell: ({ row }: { row: TBouquet }) => <p>{getSum(row.price)}</p>,
  },
  {
    field: 'categoryId',
    headerName: 'category',
    sortable: true,
    renderCell: ({ row }: { row: TBouquet }) => {
      const { i18n } = useTranslation()

      return getCategory(row.category, i18n.language)
    },
  },
  {
    field: 'block',
    headerName: 'active',
    sortable: true,
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

export const mobileColumns: TColumns[] = [
  {
    field: 'image',
    headerName: 'image',
    renderCell: ({ row }: { row: TBouquet }) => (
      <Image src={row.image} alt={row.image} width={30} height={50} unoptimized />
    ),
  },
  {
    field: 'price',
    headerName: 'price',
    sortable: true,
    renderCell: ({ row }: { row: TBouquet }) => {
      const { i18n } = useTranslation()

      return (
        <div>
          <p>{getSum(row.price)}</p>
          <p>{getCategory(row.category, i18n.language)}</p>
        </div>
      )
    },
  },
  {
    field: 'block',
    headerName: 'active',
    sortable: true,
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
