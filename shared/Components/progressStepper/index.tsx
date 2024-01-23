import { validationErrors } from '@/shared/constants/validationError'
import Dropdown from '@/shared/ui/dropdown'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const Stepper = () => {
  const steps = ['Input Type', 'Options', 'Save']
  const [currentStep, setCurrentStep] = useState(1)
  const [complete, setComplete] = useState(false)

  const { control } = useForm()
  return (
    <>
      <div className='flex justify-between'>
        {steps?.map((step, i) => (
          <div key={i} className={`step-item ${currentStep === i + 1 && 'active'} ${(i + 1 < currentStep || complete) && 'complete'} `}>
            <div className='step'>{i + 1 < currentStep || complete ? i + 1 : i + 1}</div>
            <p className='text-gray-500'>{step}</p>
          </div>
        ))}
      </div>
      <div>
        <Controller
          name={`oAnswers`}
          control={control}
          rules={{ required: validationErrors.required }}
          render={({ field: { onChange, value = [] } }) => (
            <Dropdown
              label='Please Select'
              options={[{ sValue: 'Input' }, { sValue: 'Input' }, { sValue: 'Input' }, { sValue: 'Input' }, { sValue: 'Input' }]}
              className='mt-2 '
              required={true}
              value={value}
              control={control}
              name={`oAnswers`}
              onChange={(selectedOption) => onChange(selectedOption?.sValue)}
              // errors={errors}
              // id={field?.oSettings?.iUniqueId}
            />
          )}
        />
      </div>

      <div className='w-full justify-end flex'>
        {!complete && (
          <button
            className='btn'
            onClick={() => {
              currentStep === steps.length ? setComplete(true) : setCurrentStep((prev) => prev + 1)
            }}
          >
            {currentStep === steps.length ? (
              <button className='dark:bg-dark-100 px-4 py-2 rounded-lg bg-primary-500 dark:hover:bg-dark-400 text-theme'>Add Field</button>
            ) : (
              <button
                className={`dark:bg-dark-100 px-4 py-2 rounded-lg bg-primary-500 dark:hover:bg-dark-400 text-theme disabled:dark:bg-dark-400`}
                disabled={false}
              >
                Next
              </button>
            )}
          </button>
        )}
      </div>
    </>
  )
}

export default Stepper
