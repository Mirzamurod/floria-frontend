import { FC, useRef } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import Input from '@/components/input'
import { TInputType } from '@/types/input'
import { Upload } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppSelector } from '@/store'
import { Button } from '@/components/ui/button'

interface IProps {
  image: File | null
  setImage: (value: File | null) => void
  imageLink: string
  setImageLink: (value: string) => void
}

const AddEditCard: FC<IProps> = props => {
  const { image, setImage, imageLink, setImageLink } = props
  const { control } = useFormContext()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { t } = useTranslation()

  const { categories } = useAppSelector(state => state.category)

  const inputs: TInputType[] = [{ name: 'price', required: true, type: 'number' }, { name: 'name' }]

  return (
    <div>
      <div className='grid md:grid-cols-3 gap-3'>
        <div className='flex flex-col gap-3'>
          <Label>
            {t('image')} <span className='text-red-500'>*</span>
          </Label>
          <Button
            onClick={event => {
              event.preventDefault()
              fileInputRef.current?.click()
            }}
          >
            <Upload />
            {t('upload')}
          </Button>
          <input
            hidden
            type='file'
            ref={fileInputRef}
            onChange={e => setImage((e.target.files as any)[0])}
            accept='image/png, image/jpeg, image/jpg'
          />
        </div>
        {imageLink ? <Image src={imageLink} alt='bouquet image' width={200} height={200} /> : null}
      </div>
      <div className='grid md:grid-cols-3 gap-3 mt-3'>
        {inputs.map(input => (
          <Input {...input} key={input.name} />
        ))}
      </div>
      <div className='grid md:grid-cols-3 gap-3 mt-3'>
        <FormField
          name='category'
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('category')} <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('choosecategory')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className='text-xs text-red-500' />
            </FormItem>
          )}
        />
        <Input name='info' label={t('info')} textarea />
      </div>
    </div>
  )
}

export default AddEditCard
