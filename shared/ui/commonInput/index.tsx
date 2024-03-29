import { validationErrors } from '@/shared/constants/validationError'
type commonInputTypes = {
  label?: string
  type?: string
  register: Function
  name: string
  placeholder?: string | undefined
  className?: string | undefined
  disabled?: boolean
  required?: boolean
  errors?: object
  validation?: object
}

export default function CommonInput({
  label,
  type,
  register,
  name,
  placeholder,
  className,
  disabled,
  required,
  errors,
  validation
}: commonInputTypes) {
  function applyValidation() {
    if (required) {
      return {
        required: validationErrors.required,
        maxLength: { value: 10000, message: validationErrors.maxLength(10000) },
        minLength: { value: 1, message: validationErrors.minLength(1) },
        onChange: (e: void) => {},
        ...validation
      }
    } else {
      return ''
    }
  }
  const splitName = name.split('.') || ''

  function getNestedError(obj: object, keys: any) {
    return keys.reduce((acc: any, key: any) => {
      if (acc && acc[key]) {
        return acc[key]
      }
      return null
    }, obj)
  }

  const nestedError = errors ? getNestedError(errors, splitName) : null

  const setRegister = register(name, applyValidation())
  return (
    <>
      <div className='flex justify-start items-center'>
        <label className='block text-sm font-medium text-secondary-500 dark:text-secondary-200'>{label}</label>
        {required && <span className='text-red-500 mx-1'>*</span>}
      </div>
      {type === 'textarea' ? (
        <>
          <textarea
            className={`bg-background   text-gray-900 text-sm rounded-lg dark:bg-dark-300 dark:text-theme focus:ring-background focus:border-theme block w-full p-2 ${className} `}
            placeholder={placeholder || ''}
            {...setRegister}
            onChange={(e) => {
              setRegister.onChange(e)
            }}
            onBlur={(e) => {
              e.target.value = e?.target?.value.trim()
              setRegister.onChange(e)
            }}
            disabled={disabled}
          ></textarea>
          <div className='text-right text-sm text-red-500'>{nestedError?.message}</div>
        </>
      ) : (
        <>
          <input
            className={`bg-background dark:bg-dark-300 dark:text-theme  text-gray-900 text-sm rounded-lg focus:ring-background focus:border-theme block w-full p-2 mb-2 ${className} `}
            placeholder={placeholder || ''}
            {...setRegister}
            onChange={(e) => {
              setRegister.onChange(e)
            }}
            type={type}
            disabled={disabled}
          ></input>
          <div className='text-right text-sm text-red-500'>{nestedError?.message}</div>
        </>
      )}
    </>
  )
}
