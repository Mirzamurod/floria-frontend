import { ComponentProps } from 'react'

export type TInput = {
  name: string
  label?: string
  textarea?: boolean
}

export type TInputType = TInput & ComponentProps<'input'>
