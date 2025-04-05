import { useDispatch } from 'react-redux'
import { addMonths, addWeeks, format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { TColumns } from '@/types/table'
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

const columns: TColumns[] = [
  { field: 'name', headerName: 'username', sortable: true },
  { field: 'email', headerName: 'email', sortable: true },
  {
    field: 'date',
    headerName: 'enddate',
    sortable: true,
    renderCell: ({ row }: { row: TUser }) => <p>{format(row.date, 'd MMM y')}</p>,
  },
  {
    field: 'plan',
    headerName: 'plan',
    sortable: true,
    renderCell: ({ row }: { row: TUser }) => {
      const dispatch = useDispatch()
      const { t } = useTranslation()

      const onChange = (plan: TUser['plan']) => {
        let date: null | Date = row.date
        if (plan === 'month') date = addMonths(new Date(), 1)
        else if (plan === 'week') date = addWeeks(new Date(), 2)
        dispatch(editClient(row._id, { plan, date }))
      }

      return (
        <Select defaultValue={row.plan} onValueChange={onChange}>
          <SelectTrigger className='w-auto'>
            <SelectValue placeholder='chooseplan' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='week'>{t('week', { number: 2 })}</SelectItem>
            <SelectItem value='month'>{t('month', { number: 1 })}</SelectItem>
            <SelectItem value='vip'>Vip</SelectItem>
          </SelectContent>
        </Select>
      )
    },
  },
  {
    field: 'block',
    headerName: 'active',
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
