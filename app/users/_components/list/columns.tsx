import { TColumns } from '@/types/table'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store'
import { Switch } from '@/components/ui/switch'
import { TUser } from '@/types/user'
import { editClient } from '@/store/users'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { addMonths, addWeeks, format } from 'date-fns'

const columns: TColumns[] = [
  { field: 'name', headerName: 'Name', sortable: true },
  { field: 'email', headerName: 'Email', sortable: true },
  {
    field: 'date',
    headerName: 'End date',
    sortable: true,
    renderCell: ({ row }: { row: TUser }) => <p>{format(row.date, 'd MMM y')}</p>,
  },
  {
    field: 'plan',
    headerName: 'Plan',
    sortable: true,
    renderCell: ({ row }: { row: TUser }) => {
      const dispatch = useDispatch()

      const onChange = (plan: TUser['plan']) => {
        let date: null | Date = row.date
        if (plan === 'month') date = addMonths(new Date(), 1)
        else if (plan === 'week') date = addWeeks(new Date(), 2)
        dispatch(editClient(row._id, { plan, date }))
      }

      return (
        <Select defaultValue={row.plan} onValueChange={onChange}>
          <SelectTrigger className='w-auto'>
            <SelectValue placeholder='Choose plan' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='week'>Week</SelectItem>
            <SelectItem value='month'>Month</SelectItem>
            <SelectItem value='vip'>Vip</SelectItem>
          </SelectContent>
        </Select>
      )
    },
  },
  {
    field: 'block',
    headerName: 'Active',
    sortable: true,
    renderCell: ({ row }: { row: TUser }) => {
      const dispatch = useDispatch()

      const { isLoading } = useAppSelector(state => state.users)

      const onChange = () => dispatch(editClient(row._id, { block: !row.block }))

      return <Switch defaultChecked={!row.block} onCheckedChange={onChange} disabled={isLoading} />
    },
  },
]

export default columns
