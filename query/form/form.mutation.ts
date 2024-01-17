import Axios from '@/axios'
import { attachField, createForm } from '@/shared/interface'

export default function CreateForm(data: createForm) {
  return Axios.post('form/admin/add', data)
}

export function attachField(data: attachField) {
  return Axios.post('form/admin/attach-field', data)
}

export function editFieldSettings(data: any) {
return Axios.put('form/admin/edit-field-setting', data)
}

export function updateFieldPriority(data: any) {
return Axios.put('form/admin/update-field-priority', data)
}

export function sendData(data: any) {
return Axios.post('form/admin/add-answer', data)
}

export function deleteForm(id : string) {
return Axios.put(`form/admin/delete-form/${id}`)
}

export function grtDynamicFieldValue(data: any) {
  return Axios.post('form/admin/get-dynamic-field_val', data)
}

export function editTheme(data: any) {
  return Axios.put('form/admin/edit-theme', data)
}

export function editForm(data: any) {
return Axios.put('form/admin/edit-form', data)
}

export function generateReport(data : any) {
  return Axios.post('form-submissions/admin/generate-report', data)
}

export function selectedSubmissionReport(data: any) {
return Axios.post('/form-submissions/admin/generate-report', data)
}

export function deleteSubmission(id : any) { 
return Axios.put('/form-submissions/admin/delete-sub', id)
}

export function sendOtp(number : any) {
  return Axios.post('/form/admin/send-otp' , number)
} 

export function verifyOtp(data : any) {
  return Axios.post('/form/admin/verifyOtp' , data)
} 