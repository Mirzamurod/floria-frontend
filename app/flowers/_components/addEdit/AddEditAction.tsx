import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store'

const AddEditAction = () => {
  const { addEdit } = useParams()

  const { isLoading } = useAppSelector(state => state.flower)

  return (
    <div className='flex mt-4 justify-end'>
      <Button disabled={isLoading} variant='outline' type='submit'>
        {addEdit === 'add' ? "Gul qo'shish" : "Gulni o'zgartirish"}
      </Button>
    </div>
  )
}

export default AddEditAction
