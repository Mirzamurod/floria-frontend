import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { TColumns } from '@/types/table'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import DeleteDialog from '@/components/DeleteDialog'
import { Switch } from '@/components/ui/switch'
import { useAppSelector } from '@/store'
import { deleteCategory, editCategoryBlock } from '@/store/category'
import { TCategory } from '@/types/category'

const columns: TColumns[] = [
  { field: 'name', headerName: 'Nomi' },
  {
    field: 'block',
    headerName: 'Active',
    renderCell: ({ row }: { row: TCategory }) => {
      const dispatch = useDispatch()

      const { isLoadingBlock } = useAppSelector(state => state.bouquet)

      const onChange = () => dispatch(editCategoryBlock(row._id, { block: !row.block }))

      return (
        <Switch defaultChecked={!row.block} onCheckedChange={onChange} disabled={isLoadingBlock} />
      )
    },
  },
  {
    field: 'action',
    headerName: '',
    className: 'text-end',
    renderCell: ({ row }: { row: TCategory }) => (
      <>
        <Button asChild size='icon' variant='outline' className='mr-2'>
          <Link href={`/category/${row._id}`}>
            <Edit />
          </Link>
        </Button>
        <DeleteDialog data={row} deleteAction={deleteCategory} />
      </>
    ),
  },
]

export default columns
