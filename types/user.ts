import { TError } from './error'

export type TUser = {
  _id: string
  email: string
  image: string
  name?: string
  role: TUserRole
  block: boolean
  telegramToken?: string
  telegramId?: string
  location?: string
}

export interface IUserStore {
  isLoading: boolean
  user: TUser | null
  errors: TError[] | null
  token: boolean
  success: boolean
  sidebar: boolean
  telegramLoading: boolean
}

export interface IUsersStore {
  isLoading: boolean
  users: TUser[]
  success: boolean
  pageCount: number
}

export interface IRegister {
  isLoading: boolean
  success: boolean
  error: any
}

export type TUserRole = 'admin' | 'client'
