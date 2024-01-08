'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'

import { getFormById } from '@/query/form/form.quey'
import FieldMaker from '@/shared/Components/field/fieldMaker'
import CommonInput from '@/shared/ui/commonInput'
import { grtDynamicFieldValue, sendData } from '@/query/form/form.mutation'
import { showToast } from '@/shared/ui/toaster'
import Divider from '@/shared/ui/divider'
import { useI18n } from '@/locales/client'
import { validationErrors } from '@/shared/constants/validationError'
import Loader from '@/shared/ui/loader'
import FormLoader from '@/shared/ui/formLoader'
import OtpInput from 'react18-input-otp'

type FormForUser = {
  id: string
}

export default function FormForUser({ id }: FormForUser) {
  const [isOpen, setIsOpen] = useState(true)
  const [checBox, setCheckBox] = useState()
  const [otp, setOtp] = useState('')
  const [isOtp, setIsOtp] = useState(false)
  const t = useI18n()
  const router = useRouter()
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

  const { data, isLoading } = useQuery({
    queryKey: ['previewForm', id],
    queryFn: () => getFormById(id)
  })

  const formData = data?.data?.data

  const mutation = useMutation({
    mutationFn: sendData,
    onSuccess: (data) => {
      showToast('success', data?.data?.message)
      router.push(`/myform/${id}`)
    }
  })

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
    makeData.sMobileNo = number
    mutation.mutate(makeData)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function onEnterNumber(data: any) {
    const newData = formData?.aField?.map((field: any) => {
      return {
        iUniqueId: field?.oSettings?.iUniqueId,
        iFieldId: field?.oSettings?.iFieldId
      }
    })
    const updateData = { aField: newData, sFormId: id, sMobileNo: data?.sMobileNo }
    autofill.mutate(updateData)
  }

  const handleChange = (enteredOtp: string) => {
    setOtp(enteredOtp)
  }
  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div className={`bg-background min-h-screen flex flex-col items-center justify-center p-2`} style={{ backgroundImage: `linear-gradient(to right, ${formData?.oTheme?.g1} , ${formData?.oTheme?.g2} )` }}>
        <div className='bg-theme min-h-screen  w-full md:w-[40%] rounded-lg'>
          <div className={`h-[100px] w-full bg-[${formData?.oTheme?.g1}] rounded-t-lg p-4 text-2xl text-theme`} style={{backgroundColor : formData?.oTheme?.g1}}>
            <div>{formData?.sTitle}</div>
            <div>{formData?.sDescription}</div>
          </div>

          <Transition appear show={isOpen}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='fixed inset-0 bg-black/25 ' />
              </Transition.Child>
              <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-[500px] items-center justify-center p-4 text-center'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                  >
                    <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                      {isOtp ? (
                        <div className='flex flex-col justify-center items-center'>
                          <div className='mb-2'>Please Enter Otp</div>
                          <Divider />
                          <OtpInput
                            value={otp}
                            onChange={handleChange}
                            className='outline-none border rounded-lg p-4 mx-2 text-2xl mt-2'
                            numInputs={4}
                          />
                          <button
                            className='bg-primary-500 rounded-lg p-3 mt-4 text-theme hover:bg-primary-400'
                            onClick={() => setIsOpen(false)}
                          >
                            {t('fillForm')}
                          </button>
                        </div>
                      ) : (
                        <>
                          <Dialog.Title as='h3' className='text-lg flex flex-col font-medium leading-6 text-gray-900 mb-2'>
                            {t('enterYourNumber')}
                          </Dialog.Title>

                          <Divider />

                          <CommonInput
                            label='Number'
                            type='number'
                            name='sMobileNo'
                            placeholder='8989898989'
                            className=''
                            register={numberRegister}
                            validation={{
                              minLength: { value: 10, message: validationErrors.minLength(10) },
                              maxLength: { value: 10, message: validationErrors.maxLength(10) }
                            }}
                            required
                            errors={numberErrors}
                          />

                          <button
                            className='bg-primary-500 rounded-lg p-2 mt-4 text-theme hover:bg-primary-400'
                            onClick={numberSubmit(onEnterNumber)}
                          >
                            {t('sendOtp')}
                          </button>
                        </>
                      )}
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          <div className='p-4'>
            <div className='mb-4 text-xl text-center'>{t('fillTheForm')}</div>
            <Divider />

            {formData?.aField?.map((field: any, index: number) => {
              return (
                <div className='mt-4' key={index}>
                  <FieldMaker field={field} register={register} errors={errors} control={control} reset={reset}/>
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
