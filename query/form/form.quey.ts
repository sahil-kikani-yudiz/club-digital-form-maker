import Axios from '@/axios'
import { addQueryParams } from '@/shared/utils'

export function getFormById(id: string) {
  return Axios.get(`form/admin/get-form/${id}`)
}

export function getFormList(params : any){
  return Axios.get(`form/admin/list?${addQueryParams(params)}`)
}

export function getReport(id : string, requestParams : any) {
  return Axios.get(`/form-submissions/admin/list/${id}?${addQueryParams(requestParams)}`)
}

export function getStatus(id : string) {
 return Axios.get(`/form-submissions/admin/report-status?_id=${id}`)
}

export function getReportList(id : string, params : any) {
  return Axios.get(`/form-submissions/admin/list-reports/${id}?${addQueryParams(params)}`)
}