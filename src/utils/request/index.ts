import axios from 'axios'

const request = axios.create({
  timeout: 1000 * 60,
  responseType: 'json',
})

request.interceptors.request.use(
  (config) => {
    return config
  },
)

request.interceptors.response.use(
  (response) => {
    /**
     * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
     * 假设返回数据格式为：{ status: 1, error: '', data: '' }
     * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
     * 请求出错时 error 会返回错误信息
     */
    if (response.data.status === 1) {
      if (response.data.error !== '') {
        // 这里做错误提示，如果使用了 element plus 则可以使用 Message 进行提示
        // Message.error(options)
        return Promise.reject(response.data)
      }
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    let message = error.message
    if (message === 'Network Error')
      message = '后端网络故障'

    else if (message.includes('timeout'))
      message = '接口请求超时'

    else if (message.includes('Request failed with status code'))
      message = `接口${message.substr(message.length - 3)}异常`

    return Promise.reject(error)
  },
)

export default request as any
