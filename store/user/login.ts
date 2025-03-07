import { createSlice } from '@reduxjs/toolkit'
import { encode } from 'js-base64'
import {
  editclienttelegram,
  flower,
  getuserapi,
  loginUser,
  userdelete,
  userprofile,
  userupdate,
} from '@/store/apis'
import { IUserStore } from '@/types/user'

const initialState: IUserStore = {
  isLoading: false,
  user: null,
  token: false,
  errors: null,
  success: false,
  sidebar: true,
  telegramLoading: false,
}

const login = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onStart: state => {
      state.isLoading = true
      state.token = false
      state.success = false
    },
    onSuccess: (state, { payload }) => {
      localStorage.setItem('flower', encode(payload.data.token))
      state.token = true
      state.isLoading = false
      state.success = true
    },
    userProfile: (state, { payload }) => {
      state.isLoading = false
      state.user = payload.data
    },
    userUpdate: (state, { payload }) => {
      state.isLoading = false
    },
    userDelete: (state, { payload }) => {
      state.isLoading = false
    },
    onFail: (state, { payload }) => {
      state.isLoading = false
      state.errors = payload?.messages
      state.success = payload?.success
    },
    onStartEditTelegram: state => {
      state.telegramLoading = true
    },
    onSuccessEditTelegram: state => {
      state.telegramLoading = false
    },
    onFailEditTelegram: state => {
      state.telegramLoading = false
    },
    getUserData: (state, { payload }) => {
      state.user = payload
    },
    showSidebar: (state, { payload }) => {
      state.sidebar = payload
    },
  },
})

export const userLogin = (data: any) =>
  flower({
    url: loginUser,
    method: 'post',
    data,
    onStart: login.actions.onStart.type,
    onSuccess: login.actions.onSuccess.type,
    onFail: login.actions.onFail.type,
  })

export const userProfile = () =>
  flower({
    url: userprofile,
    method: 'get',
    onStart: login.actions.onStart.type,
    onSuccess: login.actions.userProfile.type,
    onFail: login.actions.onFail.type,
  })

export const getUser = (id: string) =>
  flower({
    url: getuserapi + id,
    method: 'get',
    onStart: login.actions.onStart.type,
    onSuccess: login.actions.userProfile.type,
    onFail: login.actions.onFail.type,
  })

export const userUpdate = (data: any) =>
  flower({
    url: userupdate,
    method: 'put',
    data,
    onStart: login.actions.onStart.type,
    onSuccess: login.actions.userUpdate.type,
    onFail: login.actions.onFail.type,
  })

export const editClientTelegram = (data: {
  telegramToken?: string
  telegramId?: string
  location?: string
  card_name?: string
  card_number?: string
  userName?: string
  userPhone?: string
}) =>
  flower({
    url: editclienttelegram,
    method: 'patch',
    data,
    onStart: login.actions.onStartEditTelegram.type,
    onSuccess: login.actions.onSuccessEditTelegram.type,
    onFail: login.actions.onFailEditTelegram.type,
  })

export const userDelete = (data: any) =>
  flower({
    url: userdelete,
    method: 'post',
    data,
    onStart: login.actions.onStart.type,
    onSuccess: login.actions.userUpdate.type,
    onFail: login.actions.onFail.type,
  })

export const { getUserData, showSidebar } = login.actions

export default login.reducer
