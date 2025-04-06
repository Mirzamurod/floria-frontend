import { TError } from './error'

export type TCategory = {
  _id: string
  nameUz: string
  nameRu: string
  createdAt: string
  updatedAt: string
  userId: string
  block: boolean
}

export interface ICategoryStore {
  isLoading: boolean
  isLoadingBlock: boolean
  category: TCategory | null
  categories: TCategory[]
  errors: TError[] | null
  success: boolean
  pageCount: number
}

export type TCategoryForm = {
  nameUz: string
  nameRu: string
}
