import { validationErrors } from '@/shared/constants/validationError'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

type Option = {
  sValue?: string
  name?: string
  isSelected?: boolean
}

type RadioButtonOptions = {
  options: any[]
  defaultChecked?: string
  label: string
  id: string
  errors: any
  register?: any
  required?: boolean
  onChange?: (selectedOption: Option | null) => void
  name?: any
  control?: any
}

export default function RadioButton({ options, label, errors, id, required, register, name, control }: RadioButtonOptions) {
  const { control: innerControl } = useForm({
    defaultValues: {
      aOptions: options
    }
  })

  const { fields } = useFieldArray({
    control: innerControl,
    name: 'aOptions'
  })
  return (
    <>
      <div className='flex flex-col '>
        <div className='flex justify-start  items-center'>
          <label className='text-secondary-500'>{label}</label>
          {required && <span className='text-red-500'>*</span>}
        </div>
        {fields?.map((field, i) => (
          <div key={field._id} className='flex items-center m-1'>
            <Controller
              name={name}
              control={control}
              rules={{
                ...(required && { required: validationErrors.required })
              }}
              render={({ field: { onChange, value, ref } }) => (
                <input
                  type='radio'
                  ref={ref}
                  onChange={(e) => onChange(e.target.checked ? field?.sValue : '')}
                  id={field?.id}
                  name='radio'
                  checked={field?.sValue === value}
                  value={field?.sValue}
                  className='text-primary-500 focus:ring-secondary-400 cursor-pointer h-4 w-4'
                />
              )}
            />

            <label className='ml-2 text-gray-700'>{field?.sValue}</label>
          </div>
        ))}
      </div>
      <span className='text-red-500 text-sm flex justify-end mt-2'>{errors && id && errors?.oAnswers?.[id]?.message}</span>
    </>
  )
}
