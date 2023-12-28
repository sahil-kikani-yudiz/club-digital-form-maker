import Axios from '@/axios'

export default function CreateForm(data: any) {
  return Axios.post('form/admin/add', data)
}

export function attachField(data: any) {
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