import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import UpDownIcon from '@/assets/icons/down-icon.svg'
import CustomImage from '../customImage'
import { Controller } from 'react-hook-form'
import { validationErrors } from '@/shared/constants/validationError'

type Option = {
  sValue?: string
  name?: string
  isSelected?: boolean
}

type DropdownOptions = {
  options: Option[]
  className?: string
  register?: Function
  value?: string | null
  onChange?: (selectedOption: Option | null) => void
  ref?: any
  errors?: any
  label?: string
  required?: boolean
  id?: string
  name?: any
  control?: any
}

export default function Dropdown({ options, className, onChange, ref, errors, label, required, id, name, control }: DropdownOptions) {
  // const [selectedOption, setSelectedOption] = useState<Option | null>({ sValue: 'Please Select Option' })

  // const handleOptionChange = (newValue: string) => {
  //   const newSelectedOption = options?.find((option) => option?.sValue === newValue) || null
  //   setSelectedOption(newSelectedOption)

  //   if (onChange) {
  //     onChange(newSelectedOption)
  //   }
  // }

  return (
    <>
      <div className='flex justify-start  items-center'>
        <label className='text-secondary-500'>{label}</label>
        {required && <span className='text-red-500'>*</span>}
      </div>
      <Controller
        name={name}
        control={control}
        rules={{
          ...(required && { required: validationErrors.required })
        }}
        render={({ field: { onChange, value, ref } }) => (
          <Listbox
            ref={ref}
            value={value}
            onChange={(newValue) => {
              onChange(newValue)
            }}
          >
            <div className={`relative ${className}`}>
              <Listbox.Button className='block w-full py-3 px-3 sm:px-4 bg-background border-1 border-secondary focus:border-primary outline-0 rounded-lg text-left relative'>
                <span className='block truncate'>{value || 'Please Select..'}</span>
                <span className='pointer-events-none absolute w-8 top-[50%] translate-y-[-50%] right-0 flex items-center mr-2'>
                  <CustomImage src={UpDownIcon} height={20} width={20} />
                </span>
              </Listbox.Button>
              <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
                <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-secondary-200 py-1 text-base shadow-lg focus:outline-none sm:text-sm'>
                  {options?.map((option, optionIdx) => (
                    <Listbox.Option
                      key={optionIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-4 ${active ? 'bg-secondary-700 text-theme' : ''}`
                      }
                      value={option?.sValue}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? '' : ''}`}>{option?.sValue}</span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        )}
      />
      <span className='text-red-500 text-sm flex justify-end mt-2'>{errors && id && errors?.oAnswers?.[id]?.message}</span>
    </>
  )
}
