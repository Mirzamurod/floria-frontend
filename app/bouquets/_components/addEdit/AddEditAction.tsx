import {} from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store'

const AddEditAction = () => {
  const { addEdit } = useParams()

  const { isLoading } = useAppSelector(state => state.bouquet)

  return (
    <div className='flex mt-4 justify-end'>
      <Button disabled={isLoading} variant='outline' type='submit'>
        {addEdit === 'add' ? "Buket qo'shish" : "Buketni o'zgartirish"}
      </Button>
    </div>
  )
}

export default AddEditAction
