import { createSlice } from '@reduxjs/toolkit'
import { bouquetapi, bouquetpublic, bouquets, flower } from '@/store/apis'
import { IBouquetStore, TBouquetForm } from '@/types/bouquet'

const initialState: IBouquetStore = {
  isLoading: false,
  bouquets: [],
  bouquet: null,
  errors: null,
  success: false,
  pageCount: 0,
}

const bouquet = createSlice({
  name: 'bouquet',
  initialState,
  reducers: {
    onStartGetBouquets: state => {
      state.isLoading = true
      state.success = false
      state.bouquet = null
    },
    onSuccessGetBouquets: (state, { payload }) => {
      state.isLoading = false
      state.bouquets = payload.data
      state.pageCount = payload.pageLists
    },
    onFailGetBouquets: state => {
      state.isLoading = false
    },
    // get data
    onStartGetBouquet: state => {
      state.isLoading = true
    },
    onSuccessGetBouquet: (state, { payload }) => {
      state.isLoading = false
      state.bouquet = payload.data
    },
    onFailGetBouquet: state => {
      state.isLoading = false
    },
    // add-edit
    onStartAddEditBouquets: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessAddEditBouquets: (state, { payload }) => {
      state.isLoading = false
      state.success = payload.success
    },
    onFailAddEditBouquets: state => {
      state.isLoading = false
    },
  },
})

export const getBouquets = (params?: any) =>
  flower({
    url: bouquets,
    method: 'get',
    params,
    onStart: bouquet.actions.onStartGetBouquets.type,
    onSuccess: bouquet.actions.onSuccessGetBouquets.type,
    onFail: bouquet.actions.onFailGetBouquets.type,
  })

export const getPublicBouquets = (id: string, params?: any) =>
  flower({
    url: bouquetpublic + id,
    method: 'get',
    params,
    onStart: bouquet.actions.onStartGetBouquets.type,
    onSuccess: bouquet.actions.onSuccessGetBouquets.type,
    onFail: bouquet.actions.onFailGetBouquets.type,
  })

export const getBouquet = (id: string) =>
  flower({
    url: bouquetapi + id,
    method: 'get',
    onStart: bouquet.actions.onStartGetBouquet.type,
    onSuccess: bouquet.actions.onSuccessGetBouquet.type,
    onFail: bouquet.actions.onFailGetBouquet.type,
  })

export const addBouquet = (data: TBouquetForm) =>
  flower({
    url: bouquets,
    method: 'post',
    data,
    onStart: bouquet.actions.onStartAddEditBouquets.type,
    onSuccess: bouquet.actions.onSuccessAddEditBouquets.type,
    onFail: bouquet.actions.onFailAddEditBouquets.type,
  })

export const editBouquet = (data: TBouquetForm, id: string) =>
  flower({
    url: bouquetapi + id,
    method: 'patch',
    data,
    onStart: bouquet.actions.onStartAddEditBouquets.type,
    onSuccess: bouquet.actions.onSuccessAddEditBouquets.type,
    onFail: bouquet.actions.onFailAddEditBouquets.type,
  })

export const deleteBouquet = (id: string) =>
  flower({
    url: bouquetapi + id,
    method: 'delete',
    onStart: bouquet.actions.onStartAddEditBouquets.type,
    onSuccess: bouquet.actions.onSuccessAddEditBouquets.type,
    onFail: bouquet.actions.onFailAddEditBouquets.type,
  })

export default bouquet.reducer
