import { FC } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { useFormContext } from 'react-hook-form'
import Input from '@/components/input'
import { TInputType } from '@/types/input'
import { UploadButton } from '@/lib/uploadthing'
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

interface IProps {
  image: string
  setImage: (value: string) => void
}

const AddEditCard: FC<IProps> = props => {
  const { image, setImage } = props
  const { addEdit } = useParams()
  const { control } = useFormContext()

  const { categories } = useAppSelector(state => state.category)

  const inputs: TInputType[] = [
    { name: 'price', label: 'Narxi', required: true, type: 'number' },
    { name: 'name', label: 'Nomi', required: true },
  ]

  return (
    <div>
      <div className='grid md:grid-cols-3 gap-3'>
        <div>
          <Label>
            Rasm <span className='text-red-500'>*</span>
          </Label>
          <UploadButton
            endpoint='imageUploader'
            onClientUploadComplete={res => setImage(res[0].url)}
            config={{ appendOnPaste: true, mode: 'auto' }}
            content={{ button: <Upload /> }}
            // @ts-ignore
            onUploadError={error => toast.error(error.message)}
          />
        </div>
        {addEdit !== 'add' && image ? (
          <Image src={image} alt='flower image' width={200} height={200} />
        ) : null}
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
                Kategoriya <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Kategoriyani tanlang' />
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
        <Input name='info' label="Ma'lumot" textarea />
      </div>
    </div>
  )
}

export default AddEditCard
