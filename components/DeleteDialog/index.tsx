import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'

interface IProps {
  data: any
  deleteAction: any
}

const DeleteDialog: FC<IProps> = props => {
  const { data, deleteAction } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const confirm = () => dispatch(deleteAction(data._id))

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='icon' variant='outline'>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('areyousure')}</DialogTitle>
        </DialogHeader>
        <DialogFooter className='gap-2'>
          <Button variant='destructive' onClick={confirm}>
            {t('delete')}
          </Button>
          <DialogClose asChild>
            <Button variant='secondary'>{t('close')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog
