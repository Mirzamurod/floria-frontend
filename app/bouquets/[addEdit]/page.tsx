'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TBouquetForm } from '@/types/bouquet'
import { useAppSelector } from '@/store'
import { Button } from '@/components/ui/button'
import AddEditCard from '../_components/addEdit/AddEditCard'
import AddEditAction from '../_components/addEdit/AddEditAction'
import { addBouquet, editBouquet, getBouquet } from '@/store/bouquet'
import { getCategories } from '@/store/category'

const AddEditBouquet = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { addEdit } = useParams()
  const { t } = useTranslation()
  const formSchema = yup.object().shape({
    price: yup.string().required(t('pricerequired')),
    category: yup.string().required(t('categoryrequired')),
    name: yup.string(),
    info: yup.string(),
  })
  const methods = useForm<TBouquetForm>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    defaultValues: { price: '', name: '', info: '', category: '' },
  })
  const [image, setImage] = useState<File | null>(null)
  const [imageLink, setImageLink] = useState('')
  const { handleSubmit, setValue, setError, reset } = methods

  const { success, bouquet, errors } = useAppSelector(state => state.bouquet)

  const onSubmit = (values: TBouquetForm) => {
    const formData = new FormData()
    Object.entries(values).map(([key, value]) => formData.append(key, value))
    if (addEdit === 'add' && image) {
      formData.append('image', image)
      dispatch(addBouquet(formData))
    } else {
      if (image) {
        formData.delete('image')
        formData.append('image', image)
      }
      dispatch(editBouquet(addEdit as string, formData))
    }
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    if (addEdit && addEdit !== 'add') dispatch(getBouquet(addEdit as string))
    else reset()
  }, [addEdit])

  useEffect(() => {
    if (bouquet) {
      Object.entries(bouquet).map(([key, value]) =>
        setValue(key as keyof TBouquetForm, value as string)
      )
      setImageLink(bouquet.image)
    }
  }, [bouquet])

  useEffect(() => {
    if (success) {
      reset()
      router.push('/bouquets/list')
    }
  }, [success])

  useEffect(() => {
    if (errors?.length)
      errors.map(item =>
        setError(item.path as keyof TBouquetForm, { type: 'custom', message: t(item.msg) })
      )
  }, [errors])

  useEffect(() => {
    if (image) setImageLink(URL?.createObjectURL(image))
  }, [image])

  return (
    <FormProvider {...methods}>
      <div className='flex md:flex-row flex-col md:justify-between'>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>
          {addEdit === 'add' ? t('addbouquet') : t('editbouquet')}
        </h2>
        <Button asChild>
          <Link href='/bouquets/list'>{t('gobouquets')}</Link>
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

export default AddEditBouquet
