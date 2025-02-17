import { createSlice } from '@reduxjs/toolkit'
import { orderapi, ordersapi, flower } from '@/store/apis'
import { IOrderStore, TOrderForm } from '@/types/orders'

const initialState: IOrderStore = {
  isLoading: false,
  orders: [],
  order: null,
  errors: null,
  success: false,
  pageCount: 0,
}

const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    onStartGetOrders: state => {
      state.isLoading = true
      state.success = false
      state.order = null
    },
    onSuccessGetOrders: (state, { payload }) => {
      state.isLoading = false
      state.orders = payload.data
      state.pageCount = payload.pageLists
    },
    onFailGetOrders: state => {
      state.isLoading = false
    },
    // get data
    onStartGetOrder: state => {
      state.isLoading = true
    },
    onSuccessGetOrder: (state, { payload }) => {
      state.isLoading = false
      state.order = payload.data
    },
    onFailGetOrder: state => {
      state.isLoading = false
    },
    // add-edit
    onStartAddEditOrder: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessAddEditOrder: (state, { payload }) => {
      state.isLoading = false
      state.success = payload.success
    },
    onFailAddEditOrder: state => {
      state.isLoading = false
    },
  },
})

export const getOrders = (params?: any) =>
  flower({
    url: ordersapi,
    method: 'get',
    params,
    onStart: orders.actions.onStartGetOrders.type,
    onSuccess: orders.actions.onSuccessGetOrders.type,
    onFail: orders.actions.onFailGetOrders.type,
  })

export const getOrder = (id: string) =>
  flower({
    url: orderapi + id,
    method: 'get',
    onStart: orders.actions.onStartGetOrder.type,
    onSuccess: orders.actions.onSuccessGetOrder.type,
    onFail: orders.actions.onFailGetOrder.type,
  })

export const addOrder = (data: TOrderForm) =>
  flower({
    url: ordersapi,
    method: 'post',
    data,
    onStart: orders.actions.onStartAddEditOrder.type,
    onSuccess: orders.actions.onSuccessAddEditOrder.type,
    onFail: orders.actions.onFailAddEditOrder.type,
  })

export const editOrder = (data: TOrderForm, id: string) =>
  flower({
    url: orderapi + id,
    method: 'patch',
    data,
    onStart: orders.actions.onStartAddEditOrder.type,
    onSuccess: orders.actions.onSuccessAddEditOrder.type,
    onFail: orders.actions.onFailAddEditOrder.type,
  })

export const deleteOrder = (id: string) =>
  flower({
    url: orderapi + id,
    method: 'delete',
    onStart: orders.actions.onStartAddEditOrder.type,
    onSuccess: orders.actions.onSuccessAddEditOrder.type,
    onFail: orders.actions.onFailAddEditOrder.type,
  })

export default orders.reducer
