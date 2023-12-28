import { Controller, useForm } from 'react-hook-form'
import CommonInput from '../../ui/commonInput'
import Dropdown from '../../ui/dropdown'
import RadioButton from '../../ui/radioButton'
import CheckBox from '../../ui/checkBox'
import { validationErrors } from '../../constants/validationError'
type settingType = {
  sLabel: string
  aOptions: any
  iUniqueId: string
  sPlaceHolder: string
  bIsRequired: boolean
  nMaxLength: number
  nMinLength: number
}

type fieldTypes = {
  oSettings: settingType
  oField: any
}

type fieldMakerTypes = {
  field: fieldTypes
  register: Function
  errors: Object
  setValue?: Function
  control?: any
}

export default function FieldMaker({ field, register, errors, setValue, control }: fieldMakerTypes) {
  const minLength = field?.oSettings?.nMinLength
  const maxLength = field?.oSettings?.nMaxLength

  return (
    <>
      {field?.oField?.oFieldType?.sType === 'select' && (
        <>
          <Controller
            name={`oAnswers.${field?.oSettings?.iUniqueId}`}
            control={control}
            rules={field?.oSettings?.bIsRequired ? { required: validationErrors.required } : {}}
            render={({ field: { onChange, value = [] } }) => (
              <Dropdown
                label={field?.oSettings?.sLabel}
                options={field?.oSettings?.aOptions}
                className='mt-2 '
                required={field?.oSettings?.bIsRequired}
                value={value}
                onChange={(selectedOption) => onChange(selectedOption?.sValue)}
                errors={errors}
                id={field?.oSettings?.iUniqueId}
              />
            )}
          />
        </>
      )}
      {field?.oField?.oFieldType?.sType === 'radio' && (
        <>
          <Controller
            name={`oAnswers.${field?.oSettings?.iUniqueId}`}
            control={control}
            rules={field?.oSettings?.bIsRequired ? { required: validationErrors.required } : {}}
            render={({ field: { onChange, value = [] } }) => (
              <RadioButton
                required={field?.oSettings?.bIsRequired}
                options={field?.oSettings?.aOptions}
                errors={errors}
                key={field?.oSettings?.iUniqueId}
                id={field?.oSettings?.iUniqueId}
                label={field?.oSettings?.sLabel}
                onChange={(selectedOption) => onChange(selectedOption?.sValue)}
              />
            )}
          />
        </>
      )}

      {field?.oField?.oFieldType?.sType === 'checkbox' && (
        <>
          <Controller
            name={`oAnswers.${field?.oSettings?.iUniqueId}`}
            control={control}
            rules={field?.oSettings?.bIsRequired ? { required: validationErrors.required } : {}}
            render={({ field: { onChange, value = [], ref } }) => (
              <CheckBox
                control={control}
                options={field?.oSettings?.aOptions}
                label={field?.oSettings?.sLabel}
                id={field?.oSettings?.iUniqueId}
                setValue={setValue}
                onChange={(selectedOption) => onChange(selectedOption)}
              />
            )}
          />
        </>
      )}
      {(field?.oField?.oFieldType?.sParentType === 'input' || field?.oField?.oFieldType?.sType === 'textarea') &&
        field?.oField?.oFieldType?.sType !== 'radio' &&
        field?.oField?.oFieldType?.sType !== 'checkbox' && (
          <>
            <CommonInput
              className='mt-2'
              label={field?.oSettings?.sLabel}
              type={field?.oField?.oFieldType?.sType}
              register={register}
              required={field?.oSettings?.bIsRequired}
              name={`oAnswers.${field?.oSettings?.iUniqueId}`}
              placeholder={field?.oSettings?.sPlaceHolder}
              validation={{
                maxLength: { value: maxLength, message: validationErrors.maxLength(maxLength) },
                minLength: { value: minLength, message: validationErrors.minLength(minLength) }
              }}
              errors={errors}
            />
          </>
        )}
      {/* <button type='submit' onClick={handleSubmit(onSubmit)}>
        Submit
      </button> */}
    </>
  )
}
