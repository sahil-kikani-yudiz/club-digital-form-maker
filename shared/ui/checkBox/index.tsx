import { validationErrors } from '@/shared/constants/validationError'
import { ChangeEvent, useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

type Option = {
  sValue?: string
  name?: string
  isSelected?: boolean
}

type CheckBoxTypes = {
  options: any[]
  label: string
  id: string
  required?: boolean
  setValue?: Function
  ref?: Function
  onChange?: (selectedOptions: Option[]) => void
  control?: any
  name?: any
  dynamicFormData?: any
  reset?: Function
}

export default function CheckBox({ options, label, id, required, control, name }: CheckBoxTypes) {
  const { control: innerControl, reset } = useForm({
    defaultValues: {
      aOptions: options
    }
  })

  const { fields } = useFieldArray({
    control: innerControl,
    name: 'aOptions'
  })

  useEffect(() => {
    reset({
      aOptions: options
    })
  }, [options, reset])

  return (
    <div className='flex flex-col '>
      <div className='text-secondary-500 dark:text-theme'>{label}</div>
      {fields?.map((field: any, index: number) => {
        return (
          <div key={field._id} className='flex items-center m-1'>
            <Controller
              name={`${name}.oOptions.${field._id}`}
              control={control}
              rules={{
                ...(required && { required: validationErrors.required })
              }}
              render={({ field: { onChange, value, ref } }) => (
                <input
                  type='checkbox'
                  ref={ref}
                  onChange={(e) => onChange(e.target.checked ? field?.sValue : '')}
                  id={field.sValue}
                  name={field?.sValue}
                  checked={fields.find((f) => f.sValue === value)}
                  value={value}
                />
              )}
            />
            <label className='ml-2 text-gray-700 dark:text-theme'>{field?.sValue}</label>
          </div>
        )
      })}
    </div>
  )
}
