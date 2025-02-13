import { ReactNode } from 'react'

// Before
type Params = { slug: string }
type SearchParams = { [key: string]: string | string[] | undefined }

export type TChild = {
  params?: Params
  searchParams?: SearchParams
  children?: ReactNode
}
