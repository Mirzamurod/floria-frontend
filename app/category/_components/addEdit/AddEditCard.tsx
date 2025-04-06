import Input from '@/components/input'
import { TInputType } from '@/types/input'

const AddEditCard = () => {
  const inputs: TInputType[] = [
    { name: 'nameUz', label: 'nameuz', required: true },
    { name: 'nameRu', label: 'nameru', required: true },
  ]

  return (
    <div>
      <div className='grid md:grid-cols-3 gap-3 mt-3'>
        {inputs.map(input => (
          <Input {...input} key={input.name} />
        ))}
      </div>
    </div>
  )
}

export default AddEditCard
