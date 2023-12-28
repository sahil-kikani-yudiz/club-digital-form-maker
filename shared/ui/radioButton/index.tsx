import { ChangeEvent, useEffect, useState } from 'react'

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
  required?: boolean
  onChange?: (selectedOption: Option | null) => void
}

export default function RadioButton({ options, label, errors, id, required, onChange }: RadioButtonOptions) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>('')

  useEffect(() => {
    const defaultChecked = options.find((option) => option.isSelected)
    setSelectedOption(defaultChecked?.sValue)
  }, [])

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setSelectedOption(newValue)

    if (onChange) {
      const newSelectedOption = options.find((option) => option?.sValue === newValue) || null
      onChange(newSelectedOption)
    }
  }

  return (
    <>
      <div className='flex flex-col '>
        <div className='flex justify-start  items-center'>
          <label className='text-secondary-500'>{label}</label>
          {required && <span className='text-red-500'>*</span>}
        </div>
        {options?.map((option, i) => (
          <div key={option._id} className='flex items-center m-1'>
            <input
              type='radio'
              id={id}
              name={id}
              value={option?.sValue}
              onChange={handleRadioChange}
              className='text-primary-500 focus:ring-secondary-400 cursor-pointer h-4 w-4 '
            />
            <label className='ml-2 text-gray-700'>{option.sValue}</label>
          </div>
        ))}
      </div>
      <span className='text-red-500 text-sm flex justify-end mt-2'>{errors && id && errors?.oAnswers?.[id]?.message}</span>
    </>
  )
}
