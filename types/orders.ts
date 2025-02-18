import { TBouquet } from './bouquet'
import { TCustomer } from './customer'
import { TError } from './error'
import { TFlower } from './flower'
import { TUser } from './user'

export type TOrder = {
  _id: string
  orderNumber: number
  createdAt: string
  status: 'new' | 'old'
  updatedAt: string
  bouquet: {
    bouquets: {
      bouquetId: TBouquet
      price: number
      qty: number
    }[]
    price: number
    qty: number
  }
  flower: {
    flowers: {
      flowerId: TFlower
      price: number
      qty: number
    }[]
    price: number
    qty: number
  }
  userId: TUser
  customerId: TCustomer
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
  status?: 'new' | 'old'
}
