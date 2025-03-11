import { createSlice } from '@reduxjs/toolkit'
import { categoryapi, categoryblock, categorypublic, categories, flower } from '@/store/apis'
import { ICategoryStore, TCategoryForm } from '@/types/category'

const initialState: ICategoryStore = {
  isLoading: false,
  isLoadingBlock: false,
  categories: [],
  category: null,
  errors: null,
  success: false,
  pageCount: 0,
}

const category = createSlice({
  name: 'category',
  initialState,
  reducers: {
    onStartGetCategories: state => {
      state.isLoading = true
      state.success = false
      state.category = null
    },
    onSuccessGetCategories: (state, { payload }) => {
      state.isLoading = false
      state.categories = payload.data
      state.pageCount = payload.pageLists
    },
    onFailGetCategories: state => {
      state.isLoading = false
    },
    // get data
    onStartGetCategory: state => {
      state.isLoading = true
    },
    onSuccessGetCategory: (state, { payload }) => {
      state.isLoading = false
      state.category = payload.data
    },
    onFailGetCategory: state => {
      state.isLoading = false
    },
    // add-edit
    onStartAddEditCategory: state => {
      state.isLoading = true
      state.success = false
    },
    onSuccessAddEditCategory: (state, { payload }) => {
      state.isLoading = false
      state.success = payload.success
    },
    onFailAddEditCategory: state => {
      state.isLoading = false
    },
    // add-edit-block
    onStartEditCategoryBlock: state => {
      state.isLoadingBlock = true
    },
    onSuccessEditCategoryBlock: state => {
      state.isLoadingBlock = false
      state.success = true
    },
    onFailEditCategoryBlock: state => {
      state.isLoadingBlock = false
    },
  },
})

export const getCategories = (params?: any) =>
  flower({
    url: categories,
    method: 'get',
    params,
    onStart: category.actions.onStartGetCategories.type,
    onSuccess: category.actions.onSuccessGetCategories.type,
    onFail: category.actions.onFailGetCategories.type,
  })

export const getPublicCategories = (id: string, params?: any) =>
  flower({
    url: categorypublic + id,
    method: 'get',
    params,
    onStart: category.actions.onStartGetCategories.type,
    onSuccess: category.actions.onSuccessGetCategories.type,
    onFail: category.actions.onFailGetCategories.type,
  })

export const getCategory = (id: string) =>
  flower({
    url: categoryapi + id,
    method: 'get',
    onStart: category.actions.onStartGetCategory.type,
    onSuccess: category.actions.onSuccessGetCategory.type,
    onFail: category.actions.onFailGetCategory.type,
  })

export const addCategory = (data: TCategoryForm) =>
  flower({
    url: categories,
    method: 'post',
    data,
    onStart: category.actions.onStartAddEditCategory.type,
    onSuccess: category.actions.onSuccessAddEditCategory.type,
    onFail: category.actions.onFailAddEditCategory.type,
  })

export const editCategory = (id: string, data: TCategoryForm) =>
  flower({
    url: categoryapi + id,
    method: 'patch',
    data,
    onStart: category.actions.onStartAddEditCategory.type,
    onSuccess: category.actions.onSuccessAddEditCategory.type,
    onFail: category.actions.onFailAddEditCategory.type,
  })

export const editCategoryBlock = (id: string, data: { block: boolean }) =>
  flower({
    url: categoryblock + id,
    method: 'patch',
    data,
    onStart: category.actions.onStartEditCategoryBlock.type,
    onSuccess: category.actions.onSuccessEditCategoryBlock.type,
    onFail: category.actions.onFailEditCategoryBlock.type,
  })

export const deleteCategory = (id: string) =>
  flower({
    url: categoryapi + id,
    method: 'delete',
    onStart: category.actions.onStartAddEditCategory.type,
    onSuccess: category.actions.onSuccessAddEditCategory.type,
    onFail: category.actions.onFailAddEditCategory.type,
  })

export default category.reducer
