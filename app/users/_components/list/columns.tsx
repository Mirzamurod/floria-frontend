import { TColumns } from '@/types/table'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store'
import { Switch } from '@/components/ui/switch'
import { TUser } from '@/types/user'
import { editClient } from '@/store/users'

const columns: TColumns[] = [
  { field: 'name', headerName: 'Name' },
  { field: 'email', headerName: 'Email' },
  {
    field: 'block',
    headerName: 'Active',
    renderCell: ({ row }: { row: TUser }) => {
      const dispatch = useDispatch()

      const { isLoading } = useAppSelector(state => state.users)

      const onChange = () => dispatch(editClient(row._id, { block: !row.block }))

      return <Switch defaultChecked={!row.block} onCheckedChange={onChange} disabled={isLoading} />
    },
  },
]

export default columns
