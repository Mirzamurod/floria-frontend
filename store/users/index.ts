import { createSlice } from '@reduxjs/toolkit'
import { flower, clientsapi, clientapi } from '@/store/apis'
import { IUsersStore } from '@/types/user'

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
    onStartGetUser: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessGetUser: (state, { payload }) => {
      state.isLoading = false
      state.success = payload.success
    },
    onFailGetUser: state => {
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

export const editClient = (id: string, data: { block: boolean }) =>
  flower({
    url: clientapi + id,
    method: 'patch',
    data,
    onStart: users.actions.onStartGetUser.type,
    onSuccess: users.actions.onSuccessGetUser.type,
    onFail: users.actions.onFailGetUser.type,
  })

export default users.reducer
