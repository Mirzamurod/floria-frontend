import { createAction } from '@reduxjs/toolkit'
import { TFlower } from '@/types/middleware'

export const flower = createAction<TFlower>('flower')

// users
export const registeruser = '/users'
export const loginUser = '/users/login'
export const userprofile = '/users'
export const userupdate = '/users/update'
export const userdelete = '/users/delete'
export const getUsersApi = '/users'
export const editclienttelegram = '/clients/telegram'

// bouquet
export const bouquets = '/bouquets'
export const bouquetapi = '/bouquets/'
export const bouquetpublic = '/bouquets/public/'
export const bouquetblock = '/bouquets/block/'

// flower
export const flowersapi = '/flowers'
export const flowerapi = '/flowers/'
export const flowerpublic = '/flowers/public/'
export const flowerblock = '/flowers/block/'

// category
export const categories = '/category'
export const categoryapi = '/category/'
export const categorypublic = '/category/public/'
export const categoryblock = '/category/block/'

// order
export const ordersapi = '/orders'
export const orderapi = '/orders/'

// clients
export const clientsapi = '/clients'
export const clientapi = '/clients/'
