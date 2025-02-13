import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { TInputType } from '@/types/input'
import { Label } from '../ui/label'
import { Input as ShadInput } from '../ui/input'
import { Textarea } from '../ui/textarea'

const Input: FC<TInputType> = props => {
  const { name, label, placeholder, required, textarea } = props
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <Label>
            {label || name} {required ? <span className='text-red-500'>*</span> : null}
          </Label>
          <FormControl>
            {textarea ? (
              // @ts-ignore
              <Textarea {...field} {...props} placeholder={placeholder || label || name} />
            ) : (
              <ShadInput {...field} {...props} placeholder={placeholder || label || name} />
            )}
          </FormControl>
          <FormMessage className='text-xs text-red-500' />
        </FormItem>
      )}
    />
  )
}

export default Input
