import { FC } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import Input from '@/components/input'
import { TInputType } from '@/types/input'
import { UploadButton } from '@/lib/uploadthing'
import { Upload } from 'lucide-react'
import { Label } from '@/components/ui/label'

interface IProps {
  image: string
  setImage: (value: string) => void
}

const AddEditCard: FC<IProps> = props => {
  const { image, setImage } = props
  const { addEdit } = useParams()

  const inputs: TInputType[] = [
    { name: 'price', required: true, type: 'number' },
    { name: 'name', required: true },
  ]

  return (
    <div>
      <div className='grid grid-cols-3 gap-3'>
        <div>
          <Label>
            Image <span className='text-red-500'>*</span>
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
      <div className='grid grid-cols-3 gap-3 mt-3'>
        {inputs.map(input => (
          <Input {...input} key={input.name} />
        ))}
      </div>
      <div className='grid grid-cols-3 gap-3 mt-3'>
        <Input name='info' textarea />
      </div>
    </div>
  )
}

export default AddEditCard
