import { FC } from 'react'
import { useDispatch } from 'react-redux'
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
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant='destructive' onClick={confirm}>
            Delete
          </Button>
          <DialogClose asChild>
            <Button variant='secondary'>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog
