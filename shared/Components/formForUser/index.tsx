'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import OtpInput from 'react18-input-otp'
import { useTheme } from 'next-themes'

import { getFormById } from '@/query/form/form.quey'
import { grtDynamicFieldValue, sendData, sendOtp, verifyOtp } from '@/query/form/form.mutation'

import { validationErrors } from '@/shared/constants/validationError'
import FieldMaker from '@/shared/Components/field/fieldMaker'
import CommonInput from '@/shared/ui/commonInput'
import { showToast } from '@/shared/ui/toaster'
import Divider from '@/shared/ui/divider'
import PopUp from '@/shared/ui/popup'
import { useI18n } from '@/locales/client'

type FormForUser = {
  id: string
}

export default function FormForUser({ id }: FormForUser) {
  const [isOpen, setIsOpen] = useState(true)
  const [otp, setOtp] = useState('')
  const [isOtp, setIsOtp] = useState(false)
  const t = useI18n()
  const router = useRouter()
  const { setTheme } = useTheme()
  const [autofillData, setAutofillData] = useState<any>([])

  useEffect(() => {
    setTheme('light')
  }, [])

  const {
    handleSubmit: numberSubmit,
    register: numberRegister,
    getValues,
    formState: { errors: numberErrors }
  } = useForm()

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm()

  // Form Data
  const { data, isLoading } = useQuery({
    queryKey: ['previewForm', id],
    queryFn: () => getFormById(id)
  })
  const formData = data?.data?.data

  // Submission
  const mutation = useMutation({
    mutationFn: sendData,
    onSuccess: (data) => {
      showToast('success', data?.data?.sMessage)
      router.push(`/myform/${id}`)
    }
  })

  // AutoFill
  const autofill = useMutation({
    mutationFn: grtDynamicFieldValue,
    onSuccess: (data) => {
      reset(data?.data?.data)
      // setIsOpen(false)
      setIsOtp(true)
    }
  })

  function onSubmit(data: any) {
    const makeData = data
    const number = getValues('sMobileNo')
    makeData.sFormId = id
    makeData.sMobileNo = 91 + number
    mutation.mutate(makeData)
  }

  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: (data) => {
      setIsOtp(true)
      showToast('success', data?.data?.sMessage)
    },
    onError: (err: any) => {
      showToast('error', err?.response?.data?.error?.sMessage)
    }
  })

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      setIsOpen(false)
      showToast('success', data?.data?.sMessage)
      autofill.mutate(autofillData)
    }
  })

  function onEnterNumber(data: any) {
    const newData = formData?.aField?.map((field: any) => {
      return {
        iUniqueId: field?.oSettings?.iUniqueId,
        iFieldId: field?.oSettings?.iFieldId
      }
    })
    const updateData = { aField: newData, sFormId: id, sMobileNo: 91 + data?.sMobileNo }
    setAutofillData(updateData)

    sendOtpMutation.mutate({ sMobileNo: 91 + data?.sMobileNo })
  }

  const handleChange = (enteredOtp: string) => {
    setOtp(enteredOtp)
  }

  function handleOtp() {
    const number = getValues('sMobileNo')
    const data = { sMobileNo: 91 + number, sCode: otp }
    verifyOtpMutation.mutate(data)
  }

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div
        className={`bg-background min-h-screen flex flex-col items-center justify-center md:p-2`}
        style={{ backgroundImage: `linear-gradient(to right, ${formData?.oTheme?.g1} , ${formData?.oTheme?.g2} ) ` }}
      >
        <div className='bg-theme  min-h-screen  w-full md:w-[40%] md:rounded-lg' style={{}}>
          <div
            className={`h-[100px] w-full md:rounded-t-lg p-4 text-2xl text-theme bg-secondary-700 `}
            style={{ backgroundColor: `${formData?.oTheme?.sHColor}` }}
          >
            <div>{formData?.sTitle}</div>
            <div>{formData?.sDescription}</div>
          </div>

          <PopUp show={isOpen} onClose={() => setIsOpen(true)} maxWidth='500' title={`${isOtp ? 'fillForm' : 'enterYourNumber'}`}>
            {isOtp ? (
              <div className='flex flex-col justify-center items-center'>
                <OtpInput
                  value={otp}
                  onChange={handleChange}
                  className='otp outline-none border rounded-lg p-4 mx-2 text-2xl mt-2'
                  numInputs={4}
                  isInputNum
                />
                <button className='bg-primary-500 rounded-lg p-3 mt-4 text-theme hover:bg-primary-400' onClick={handleOtp}>
                  {t('fillForm')}
                </button>
              </div>
            ) : (
              <>
                <CommonInput
                  label='Number'
                  type='number'
                  name='sMobileNo'
                  placeholder='8989898989'
                  className='mt-2'
                  register={numberRegister}
                  validation={{
                    minLength: { value: 10, message: validationErrors.minLength(10) },
                    maxLength: { value: 10, message: validationErrors.maxLength(10) }
                  }}
                  required
                  errors={numberErrors}
                />
                <div className='w-full flex justify-center'>
                  <button
                    className='bg-primary-500 w-[50%] rounded-lg p-2 mt-4 text-theme hover:bg-primary-400'
                    onClick={numberSubmit(onEnterNumber)}
                  >
                    {t('sendOtp')}
                  </button>
                </div>
              </>
            )}
          </PopUp>

          <div className='p-4'>
            <div className='mb-4 text-xl text-center'>{t('fillTheForm')}</div>
            <Divider />

            {formData?.aField?.map((field: any, index: number) => {
              return (
                <div className='mt-4' key={index}>
                  <FieldMaker field={field} register={register} errors={errors} control={control} reset={reset} />
                </div>
              )
            })}
            <div className='flex justify-center'>
              <button className='bg-primary-500 p-2 h-fit w-[50%] border rounded-lg mt-8 text-white ' onClick={handleSubmit(onSubmit)}>
                {t('save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
