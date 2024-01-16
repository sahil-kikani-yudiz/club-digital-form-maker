import axios from 'axios'
import { redirectToLogin } from './shared/utils'

const Axios = axios.create({
  baseURL: 'https://16ee-103-156-142-125.ngrok-free.app/api'
})

Axios.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    req.headers['ngrok-skip-browser-warning'] = 'any'
    const token = localStorage?.getItem('token')
    if (!req.headers.Authorization && token) {
      req.headers.Authorization = token
    }
  }
  return req
})

Axios.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    if ((err?.response && err?.response?.status === 417) || err?.response?.status === 401) {
      localStorage.setItem('token', '')
      redirectToLogin()
      return Promise.reject(err)
    }
    return Promise.reject(err)
  }
)

export default Axios
