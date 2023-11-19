import axios from 'axios'
import {
  handleAuthError,
  handleConfigure,
  handleGeneralError,
  handleNetworkError,
} from './tools'

type Fn = (data: FcResponse<any>) => unknown

interface IAnyObj {
  [index: string]: unknown
}

export type FcResponse<T> = T

axios.interceptors.request.use((config) => {
  config = handleConfigure(config)
  return config
})

axios.interceptors.response.use(
  (response) => {
    // if (response.status !== 200)
    //   return Promise.reject(response.data)
    // handleAuthError(response.data.errno)
    // handleGeneralError(response.data.errno, response.data.errmsg)
    return Promise.resolve(response.data)
  },
  (err) => {
    const errMsg = handleNetworkError(err.response.status)
    return Promise.reject(errMsg)
  },
)

export function Get<T>(url: string, params: IAnyObj = {}, clearFn?: Fn): Promise<[any, FcResponse<T> | undefined]> {
  return new Promise((resolve) => {
    axios
      .get(url, params)
      .then((result) => {
        let res: FcResponse<T>
        if (clearFn !== undefined)
          res = clearFn(result.data) as unknown as FcResponse<T>
        else
          res = result as unknown as FcResponse<T>

        resolve([null, res as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}

export function Post<T>(url: string, data: IAnyObj, params: IAnyObj = {}): Promise<[any, FcResponse<T> | undefined]> {
  return new Promise((resolve) => {
    axios
      .post(url, data, { params })
      .then((result) => {
        resolve([null, result.data as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}
