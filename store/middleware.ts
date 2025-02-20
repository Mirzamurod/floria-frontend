import axios from 'axios'
// import i18n from '@/languages/i18n'
import { getSession, signOut } from 'next-auth/react'
import { encode } from 'js-base64'
import { toast } from 'react-toastify'
import { generateToken } from '@/lib/generate-token'
import { TFlower } from '@/types/middleware'

const middleware =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  async (action: { type: string; payload: TFlower }) => {
    if (action.type !== 'flower') {
      next(action)
      return
    }

    next(action)

    const { url, method, params, data, onStart, onSuccess, onFail } = action.payload

    const session = await getSession()
    const token = await generateToken(session?.currentUser?._id)

    const headers = token ? { Authorization: `Bearer ${encode(token)}` } : null

    dispatch({ type: onStart })

    // @ts-ignore
    axios({
      // baseURL: 'http://localhost:5000/api/',
      baseURL: 'https://test-telegram-backend.onrender.com/api',
      method,
      data,
      url,
      params,
      headers,
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          dispatch({ type: onSuccess, payload: res.data })
          if (res.data.message) toast.success(res.data?.message)
        } else dispatch({ type: onFail, payload: res })
      })
      .catch(error => {
        if (error?.response?.status === 401) signOut()
        else {
          const data = error?.response?.data
          if (data?.message) toast.error(data?.message)
          dispatch({ type: onFail, payload: error?.response?.data })
        }
      })
  }

export default middleware
