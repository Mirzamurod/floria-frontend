import { TError } from './error'

export type TFlower = {
  _id: string
  image: string
  name: string
  price: number | string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface IFlowerStore {
  isLoading: boolean
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
}
