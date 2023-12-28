import { ChangeEvent, useEffect, useState } from 'react'

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
}

export default function CheckBox({ options, label, id, required, setValue, ref, onChange, control }: CheckBoxTypes) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: any = {}
    const checkboxValue: any = event.target.value
    const isChecked = event.target.checked
    value = { checkboxValue }

    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className='flex flex-col '>
      <div className='text-secondary-500 '>{label}</div>
      {options?.map((option) => {
        return (
          <div key={option._id} className='flex items-center m-1'>
            <input type='checkbox' id={option._id} value={option?.sValue} onChange={handleCheckBoxChange} />
            <label className='ml-2 text-gray-700'>{option.sValue}</label>
          </div>
        )
      })}
    </div>
  )
}
