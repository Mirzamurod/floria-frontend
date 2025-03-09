import { TBouquet } from './bouquet'
import { TCustomer } from './customer'
import { TError } from './error'
import { TFlower } from './flower'
import { TUser } from './user'

export type TOrder = {
  _id: string
  orderNumber: number
  createdAt: string
  status: 'new' | 'old' | 'cancelled'
  updatedAt: string
  payment: 'accepted' | 'cancelled' | 'pending'
  prepayment: boolean
  prepaymentImage: string
  prepaymentNumber: number
  date: string
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
  isLoadingUnsubmitted: boolean
  order: TOrder | null
  orders: TOrder[]
  ordersUnsubmitted: TOrder[]
  errors: TError[] | null
  success: boolean
  pageCount: number
}

export type TOrderForm = {
  status?: 'new' | 'old' | 'cancelled'
  payment?: 'accepted' | 'cancelled' | 'pending'
}

export interface IBouquet {
  bouquetId: string
  qty: number
  price: number
  image: string
}

export interface IFlower {
  flowerId: string
  qty: number
  price: number
  image: string
}
