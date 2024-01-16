'use client'
import CommonInput from '@/shared/ui/commonInput'
import CustomButton from '@/shared/ui/customButton'
import CustomImage from '@/shared/ui/customImage'
import Divider from '@/shared/ui/divider'
import Drawer from '@/shared/ui/drawer'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { Tab } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import { editFieldSettings } from '@/query/form/form.mutation'
import { showToast } from '@/shared/ui/toaster'
import { useI18n } from '@/locales/client'
import useWindowSize from '@/shared/hooks/windowSize'
import { DeleteIcon } from '@/assets/icons'

type fieldSettingsType = {
  oSettings: any
  oField: any
  sLabel: string
  sPlaceHolder: string
  nMaxLength: number
  nMinLength: number
  aOptions: any
  bIsRequired: boolean | undefined
  iUniqueId?: string
  iFieldId?: string
}

type EditorType = {
  isOpen: boolean
  setIsOpen: Function
  fieldSettings: fieldSettingsType | undefined
  onUpdateSettings: Function
}

interface Data {
  aOptions?: any
  iUniqueId?: string
  iFieldId?: string
  aValue?: any
}

export default function EditToolBox({ isOpen, fieldSettings, setIsOpen, onUpdateSettings }: EditorType) {
  const t = useI18n()
  const [selectedTab, setSelectedTab] = useState('general')
  const [isActive, setIsActive] = useState<any | undefined>(false)
  const [width] = useWindowSize()

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm()

  const toggleButton = () => {
    setIsActive(!isActive)
    setValue('bIsRequired', !isActive)
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'aValue'
  })

  // Edit Field Settings
  const mutation = useMutation({
    mutationFn: editFieldSettings,
    onSuccess: (data) => {
      showToast('success', data?.data?.sMessage)
      onUpdateSettings(data?.data?.data)
    },
    onError: (error: any) => {
      showToast('error', error?.message)
    }
  })

  useEffect(() => {
    reset({
      sLabel: fieldSettings?.oSettings?.sLabel,
      sPlaceHolder: fieldSettings?.oSettings?.sPlaceHolder,
      nMaxLength: fieldSettings?.oSettings?.nMaxLength,
      nMinLength: fieldSettings?.oSettings?.nMinLength,
      aValue: fieldSettings?.oSettings?.aOptions
    })
    setIsActive(fieldSettings?.oSettings?.bIsRequired)
  }, [fieldSettings])

  function onSubmit(data: object) {
    const settings = prepareData(data)
    
    mutation.mutate(settings)
  }

  function prepareData(data: any) {
    const newData: Data = { ...data }
    if (!fieldSettings?.oSettings?.aOptions) {
      delete newData?.aOptions
    }
    newData.aOptions = data?.aValue
    delete newData.aValue
    newData.iFieldId = fieldSettings?.oSettings?.iFieldId
    newData.iUniqueId = fieldSettings?.oSettings?.iUniqueId
    return newData
  }

  return (
    <Drawer isOpen={isOpen} className={width > 767 ? 'p-2 border rounded-lg dark:border-dark-200' : 'mt-2'}>
      <div>{t('properties')}</div>
      <Divider />

      <Tab.Group>
        <Tab.List className={'w-full bg-primary-200 dark:bg-dark-300 flex justify-between p-3'}>
          <Tab
            className={`${
              selectedTab === 'general' ? 'text-primary-500 outline-none' : 'text-secondary-500'
            } w-full text-center flex justify-center`}
            onClick={() => setSelectedTab('general')}
          >
            {t('general')}
          </Tab>
          {fieldSettings?.oSettings?.aOptions && fieldSettings?.oField?.eFormFieldType === 'cu' && (
            <Tab
              className={`${
                selectedTab === 'option' ? 'text-primary-500 outline-none' : 'text-secondary-500'
              } w-full text-center flex justify-center`}
              onClick={() => setSelectedTab('option')}
            >
              Options
            </Tab>
          )}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            {fieldSettings?.oSettings?.sLabel && fieldSettings?.oField?.eFormFieldType === 'cu' && (
              <>
                <CommonInput errors={errors} className='mt-4' label='Label' type='text' register={register} name='sLabel' />
                <Divider />
              </>
            )}
            {fieldSettings?.oSettings?.sPlaceHolder && fieldSettings?.oField?.eFormFieldType === 'cu' && (
              <>
                <CommonInput errors={errors} className={'mt-4'} label='Place Holder' type='text' register={register} name='sPlaceHolder' />
                <Divider />
              </>
            )}
            <div className='flex justify-between mt-2 p-2'>
              <div className='text-secondary-500 dark:text-secondary-200'>{t('required')}</div>
              <input
                className='mr-2 mt-1 cursor-pointer h-3.5 w-8 appearance-none rounded-2xl bg-secondary-800 before:h-3.5  before:rounded-full after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:bg-secondary-300  after:transition-[transform_0.2s] checked:after:ml-[1.0625rem] dark:bg-theme checked:after:h-5 checked:after:w-5 checked:after:bg-primary-500 '
                type='checkbox'
                {...register('bIsRequired')}
                checked={isActive}
                onChange={toggleButton}
                role='switch'
              />
            </div>
            <Divider />
            {fieldSettings?.oSettings?.nMaxLength && fieldSettings?.oField?.eFormFieldType === 'cu' && (
              <div className='flex justify-between items-center mt-2'>
                <div className='text-secondary-500 mx-2 dark:text-secondary-200'>{t('min')}</div>
                <div>
                  <CommonInput errors={errors} type='text' register={register} name='nMinLength' placeholder='Min Value' />
                </div>
              </div>
            )}
            {fieldSettings?.oSettings?.nMinLength && fieldSettings?.oField?.eFormFieldType === 'cu' && (
              <div className='flex justify-between items-center mt-2'>
                <div className='text-secondary-500 mx-2 dark:text-secondary-200'>{t('max')}</div>
                <div>
                  <CommonInput errors={errors} type='text' register={register} name='nMaxLength' placeholder='Max Value' />
                </div>
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel>
            <div className='text-secondary-500 mt-2'>{t('options')}</div>
            {fields.map((field, i) => {
              return (
                <div key={i} className='flex justify-center items-center mt-4 gap-1'>
                  <CommonInput label='' type='text' register={register} name={`aValue[${i}].sValue`} className='mb-0' errors={errors} />

                  <div onClick={() => remove(i)} className='cursor-pointer mb-2'>
                    <DeleteIcon/>
                  </div>
                </div>
              )
            })}
            <button className='w-full bg-primary-500 dark:bg-primary-800 dark:border-primary-800 border rounded-md p-2 mt-2' onClick={() => append({})}>
              {t('addOptions')}
            </button>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className='w-full h-fit p-2 flex text-theme text-center gap-2 cursor-pointer mt-4'>
        <div className='w-full  dark:bg-primary-700 bg-primary-500 dark:border-primary-700 border rounded-lg p-2 hover:opacity-80' onClick={handleSubmit(onSubmit)}>
          Save
        </div>
        <div className='w-full dark:bg-red-900 bg-red-600 dark:border-red-900 border rounded-lg p-2 hover:opacity-80' onClick={() => setIsOpen(false)}>
          Cancel
        </div>
      </div>
    </Drawer>
  )
}
