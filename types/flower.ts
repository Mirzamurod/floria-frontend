import { TCategory } from './category'
import { TError } from './error'

export type TFlower = {
  _id: string
  image: string
  name: string
  price: number | string
  info?: string
  createdAt: string
  updatedAt: string
  userId: string
  block: boolean
  category: TCategory
}

export interface IFlowerStore {
  isLoading: boolean
  isLoadingBlock: boolean
  flower: TFlower | null
  flowers: TFlower[]
  errors: TError[] | null
  success: boolean
  pageCount: number
}

export type TFlowerForm = {
  image?: string
  name: string
  price: string
  info?: string
  category: string
}
