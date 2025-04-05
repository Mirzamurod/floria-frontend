import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { TInputType } from '@/types/input'
import { Input as ShadInput } from '../ui/input'
import { Textarea } from '../ui/textarea'

const Input: FC<TInputType> = props => {
  const { name, label, placeholder, required, textarea } = props
  const { control } = useFormContext()
  const { t } = useTranslation()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {t(label || name)} {required ? <span className='text-red-500'>*</span> : null}
          </FormLabel>
          <FormControl>
            {textarea ? (
              // @ts-ignore
              <Textarea {...field} {...props} placeholder={t(placeholder || label || name)} />
            ) : (
              <ShadInput {...field} {...props} placeholder={t(placeholder || label || name)} />
            )}
          </FormControl>
          <FormMessage className='text-xs text-red-500' />
        </FormItem>
      )}
    />
  )
}

export default Input
