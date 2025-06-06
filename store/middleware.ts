import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'
import { encode } from 'js-base64'
import { toast } from 'react-toastify'
import { generateToken } from '@/lib/generate-token'
import { TFlower } from '@/types/middleware'
import i18n from '@/app/i18nInstance'

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
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      method,
      data,
      url,
      params,
      headers,
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          dispatch({ type: onSuccess, payload: res.data })
          if (res.data.message && res.data.success)
            toast.success(i18n.t(res.data?.message), { autoClose: 5000 })
        } else dispatch({ type: onFail, payload: res })
      })
      .catch(error => {
        if (error?.response?.status === 401) signOut()
        else {
          const data = error?.response?.data
          if (data?.message) toast.error(i18n.t(data?.message), { autoClose: 60000 })
          dispatch({ type: onFail, payload: error?.response?.data })
        }
      })
  }

export default middleware
