import { TError } from './error'

export type TBouquet = {
  _id: string
  image: string
  name?: string
  price: number | string
  info?: string
  createdAt: string
  updatedAt: string
  userId: string
  block: boolean
}

export interface IBouquetStore {
  isLoading: boolean
  isLoadingBlock: boolean
  bouquet: TBouquet | null
  bouquets: TBouquet[]
  errors: TError[] | null
  success: boolean
  pageCount: number
}

export type TBouquetForm = {
  image?: string
  name?: string
  price: string
  info?: string
}
