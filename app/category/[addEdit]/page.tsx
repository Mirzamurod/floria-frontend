'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppSelector } from '@/store'
import { Button } from '@/components/ui/button'
import AddEditCard from '../_components/addEdit/AddEditCard'
import AddEditAction from '../_components/addEdit/AddEditAction'
import { TCategoryForm } from '@/types/category'
import { addCategory, editCategory, getCategory } from '@/store/category'

const AddEditCategory = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { addEdit } = useParams()
  const { t } = useTranslation()
  const formSchema = yup
    .object()
    .shape({
      nameUz: yup.string().required(t('namerequired')),
      nameRu: yup.string().required(t('namerequired')),
    })
  const methods = useForm<TCategoryForm>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    defaultValues: { nameUz: '', nameRu: '' },
  })
  const { handleSubmit, setValue, setError, reset } = methods

  const { success, category, errors } = useAppSelector(state => state.category)

  const onSubmit = (values: TCategoryForm) => {
    if (addEdit === 'add') dispatch(addCategory(values))
    else dispatch(editCategory(addEdit as string, values))
  }

  useEffect(() => {
    if (addEdit && addEdit !== 'add') dispatch(getCategory(addEdit as string))
    else reset()
  }, [addEdit])

  useEffect(() => {
    if (category)
      Object.entries(category).map(([key, value]) =>
        setValue(key as keyof TCategoryForm, value as string)
      )
  }, [category])

  useEffect(() => {
    if (success) {
      reset()
      router.push('/category/list')
    }
  }, [success])

  useEffect(() => {
    if (errors?.length)
      errors.map(item =>
        setError(item.path as keyof TCategoryForm, { type: 'custom', message: t(item.msg) })
      )
  }, [errors])

  return (
    <FormProvider {...methods}>
      <div className='flex md:flex-row flex-col md:justify-between'>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>
          {addEdit === 'add' ? t('addcategory') : t('editcategory')}
        </h2>
        <Button asChild>
          <Link href='/category/list'>{t('gocategory')}</Link>
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='my-4 md:my-0'>
        <AddEditCard />
        <AddEditAction />
      </form>
    </FormProvider>
  )
}

export default AddEditCategory
