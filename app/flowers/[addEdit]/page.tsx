'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppSelector } from '@/store'
import { Button } from '@/components/ui/button'
import AddEditCard from '../_components/addEdit/AddEditCard'
import AddEditAction from '../_components/addEdit/AddEditAction'
import { TFlowerForm } from '@/types/flower'
import { addFlower, editFlower, getFlower } from '@/store/flowers'

const AddEditFlower = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { addEdit } = useParams()
  const formSchema = yup.object().shape({
    price: yup.string().required('price_required'),
    name: yup.string().required('name_required'),
    info: yup.string(),
  })
  const methods = useForm<TFlowerForm>({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    defaultValues: { price: '', name: '' },
  })
  const [image, setImage] = useState('')
  const { handleSubmit, setValue, setError, reset } = methods

  const { success, flower, errors } = useAppSelector(state => state.flower)

  const onSubmit = (values: TFlowerForm) => {
    if (image) {
      if (addEdit === 'add') dispatch(addFlower({ ...values, image }))
      else dispatch(editFlower({ ...values, image }, addEdit as string))
    }
  }

  useEffect(() => {
    if (addEdit && addEdit !== 'add') dispatch(getFlower(addEdit as string))
    else reset()
  }, [addEdit])

  useEffect(() => {
    if (flower) {
      Object.entries(flower).map(([key, value]) =>
        setValue(key as keyof TFlowerForm, value as string)
      )
      setImage(flower.image)
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
        setError(item.path as keyof TFlowerForm, { type: 'custom', message: item.msg })
      )
  }, [errors])

  return (
    <FormProvider {...methods}>
      <div className='flex justify-between'>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight'>
          {addEdit === 'add' ? 'Add flower' : 'Edit flower'}
        </h2>
        <Button>
          <Link href='/flowers/list'>Go to flower</Link>
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddEditCard image={image} setImage={setImage} />
        <AddEditAction />
      </form>
    </FormProvider>
  )
}

export default AddEditFlower
