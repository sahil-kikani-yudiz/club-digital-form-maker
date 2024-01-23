import Axios from '@/axios'

export function login(data: any) {
  return Axios.post('/v1/admin/login', data)
}


export function logout() {
  return Axios.post('/v1/admin/logout')
}

export function googleLogin(data: any) {
  return Axios.post('/v1/admin/register', data)
}