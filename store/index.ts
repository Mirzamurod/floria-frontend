import { useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook } from 'react-redux'

import middleware from './middleware'

import login from './user/login'
import register from './user/register'
import bouquet from './bouquet'
import flower from './flowers'
import orders from './orders'

export const store = configureStore({
  reducer: {
    login,
    register,
    bouquet,
    flower,
    orders,
  },
  middleware: () => [middleware] as any,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
