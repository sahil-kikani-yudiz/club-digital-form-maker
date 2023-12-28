import Axios from '@/axios'
import { addQueryParams } from '@/shared/utils'

export function getFormById(id: string) {
  return Axios.get(`form/admin/get-form/${id}`)
}

export function getFormList(params : any){
  return Axios.get(`form/admin/list?${addQueryParams(params)}`)
}

