import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store'

const AddEditAction = () => {
  const { addEdit } = useParams()
  const { t } = useTranslation()

  const { isLoading } = useAppSelector(state => state.category)

  return (
    <div className='flex mt-4 justify-end'>
      <Button disabled={isLoading} variant='outline' type='submit'>
        {addEdit === 'add' ? t('addcategory') : t('editcategory')}
      </Button>
    </div>
  )
}

export default AddEditAction
