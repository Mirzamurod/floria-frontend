import { createSlice } from '@reduxjs/toolkit'
import { flower, clientsapi, clienteditapi, paymentclient } from '@/store/apis'
import { IUsersStore, TUser } from '@/types/user'

const initialState: IUsersStore = {
  isLoading: false,
  success: false,
  users: [],
  pageCount: 0,
}

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    onStartGetUsers: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessGetUsers: (state, { payload }) => {
      state.isLoading = false
      state.users = payload.data
      state.pageCount = payload.pageLists
    },
    onFailGetUsers: state => {
      state.isLoading = false
    },
    // edit user
    onStartAddEditUser: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessAddEditUser: (state, { payload }) => {
      state.isLoading = false
      state.success = payload.success
    },
    onFailAddEditUser: state => {
      state.isLoading = false
    },
  },
})

export const getClients = (params?: any) =>
  flower({
    url: clientsapi,
    method: 'get',
    params,
    onStart: users.actions.onStartGetUsers.type,
    onSuccess: users.actions.onSuccessGetUsers.type,
    onFail: users.actions.onFailGetUsers.type,
  })

export const editClient = (
  id: string,
  data: { block?: boolean; plan?: TUser['plan']; date?: Date }
) =>
  flower({
    url: clienteditapi + id,
    method: 'patch',
    data,
    onStart: users.actions.onStartAddEditUser.type,
    onSuccess: users.actions.onSuccessAddEditUser.type,
    onFail: users.actions.onFailAddEditUser.type,
  })

export const paymentClient = (id: string, date: Date) =>
  flower({
    url: paymentclient + id,
    method: 'patch',
    data: { date },
    onStart: users.actions.onStartAddEditUser.type,
    onSuccess: users.actions.onSuccessAddEditUser.type,
    onFail: users.actions.onFailAddEditUser.type,
  })

export default users.reducer
