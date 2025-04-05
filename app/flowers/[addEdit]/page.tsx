'use client'

import { useEffect, useState } from 'react'
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
import { TFlowerForm } from '@/types/flower'
import { addFlower, editFlower, getFlower } from '@/store/flowers'
import { getCategories } from '@/store/category'

const AddEditFlower = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { addEdit } = useParams()
  const { t } = useTranslation()
  const formSchema = yup.object().shape({
    price: yup.string().required(t('pricerequired')),
    name: yup.string().required(t('namerequired')),
    category: yup.string().required(t('categoryrequired')),
    info: yup.string(),
  })
  const methods = useForm<TFlowerForm>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    defaultValues: { price: '', name: '', info: '', category: '' },
  })
  const [image, setImage] = useState<File | null>(null)
  const [imageLink, setImageLink] = useState('')
  const { handleSubmit, setValue, setError, reset } = methods

  const { success, flower, errors } = useAppSelector(state => state.flower)

  const onSubmit = (values: TFlowerForm) => {
    const formData = new FormData()
    Object.entries(values).map(([key, value]) => formData.append(key, value))
    if (addEdit === 'add' && image) {
      formData.append('image', image)
      dispatch(addFlower(formData))
    } else {
      if (image) {
        formData.delete('image')
        formData.append('image', image)
      }
      dispatch(editFlower(addEdit as string, formData))
    }
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    if (addEdit && addEdit !== 'add') dispatch(getFlower(addEdit as string))
    else reset()
  }, [addEdit])

  useEffect(() => {
    if (flower) {
      Object.entries(flower).map(([key, value]) =>
        setValue(key as keyof TFlowerForm, value as string)
      )
      setImageLink(flower.image)
    }
  }, [flower])

  useEffect(() => {
    if (success) {
      reset()
      router.push('/flowers/list')
    }
  }, [success])

  useEffect(() => {
    if (errors?.length)
      errors.map(item =>
        setError(item.path as keyof TFlowerForm, { type: 'custom', message: t(item.msg) })
      )
  }, [errors])

  return (
    <FormProvider {...methods}>
      <div className='flex md:flex-row flex-col md:justify-between'>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>
          {addEdit === 'add' ? t('addflower') : t('editflower')}
        </h2>
        <Button asChild>
          <Link href='/flowers/list'>{t('goflowers')}</Link>
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='my-4 md:my-0'>
        <AddEditCard
          image={image}
          setImage={setImage}
          imageLink={imageLink}
          setImageLink={setImageLink}
        />
        <AddEditAction />
      </form>
    </FormProvider>
  )
}

export default AddEditFlower
