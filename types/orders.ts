import { TBouquet } from './bouquet'
import { TError } from './error'
import { TFlower } from './flower'

export type TOrder = {
  _id: string
  name?: string
  phone: string
  createdAt: string
  updatedAt: string
  userId: string
  bouquet?: TBouquet
  flowers?: TFlower[]
}

export interface IOrderStore {
  isLoading: boolean
  order: TOrder | null
  orders: TOrder[]
  errors: TError[] | null
  success: boolean
  pageCount: number
}

export type TOrderForm = {
  image?: string
  name: string
  price: string
}
