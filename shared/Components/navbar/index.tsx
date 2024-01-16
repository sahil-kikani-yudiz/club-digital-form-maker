import Link from 'next/link'

import CustomImage from '@/shared/ui/customImage'

import CustomLink from '@/shared/ui/customLink'

import { useI18n } from '@/locales/client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Divider from '@/shared/ui/divider'
import { useForm } from 'react-hook-form'
import CommonInput from '@/shared/ui/commonInput'
import { useMutation } from '@tanstack/react-query'
import { editForm } from '@/query/form/form.mutation'
import { showToast } from '@/shared/ui/toaster'
import useWindowSize from '@/shared/hooks/windowSize'
import PopUp from '@/shared/ui/popup'
import { BackArrow, EditIcon, PreviewIcon, ShareIcon, ThemeIcon } from '@/assets/icons'

type NavbarTypes = {
  data: any
  path: string
  handlePreview?: Function
  toggleTheme?: any
  refetch?: Function
}

export default function Navbar({ data, path, handlePreview, toggleTheme, refetch }: NavbarTypes) {
  const [isEdit, setIsEdit] = useState(false)
  const t = useI18n()
  const [width] = useWindowSize()
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  function togglePreview() {
    if (handlePreview) {
      handlePreview()
    }
  }
  const id = data?.sFormId

  const mutation = useMutation({
    mutationFn: editForm,
    onSuccess: (data) => {
      showToast('success', data?.data?.message)
      setIsEdit(false)
      refetch?.()
    }
  })

  function toggleEdit() {
    setIsEdit(!isEdit)
    reset({
      sTitle: data?.sTitle,
      sDescription: data?.sDescription
    })
  }

  function onSubmit(data: any) {
    const newData = { ...data, sFormId: id }
    mutation.mutate(newData)
  }

  return (
    <>
      <PopUp show={isEdit} onClose={toggleEdit} title='editForm' maxWidth='500'>
        <CommonInput
          label='Form Title'
          type='text'
          className='text-lg mt-2'
          register={register}
          name='sTitle'
          placeholder='Form title'
          errors={errors}
          required
        />
        <CommonInput
          label='Description'
          type='textarea'
          errors={errors}
          className='text-lg mt-2'
          register={register}
          name='sDescription'
          placeholder='Description'
          required
        />

        <button className='bg-primary-500 rounded-lg p-2 mt-4 text-theme hover:bg-primary-400' onClick={handleSubmit(onSubmit)}>
          {t('editForm')}
        </button>
      </PopUp>
      <div className='p-4 bg-background dark:bg-dark-100'>
        <nav className='bg-theme dark:bg-dark-200 dark:border-dark-200 border flex rounded-lg h-[66px] justify-between px-[11px] py-[15px]'>
          <div className='flex items-center '>
            <CustomLink href={path}>
              <BackArrow />
            </CustomLink>
            <div className='text-base mx-2'>{data?.sTitle}</div>
            <div onClick={() => toggleEdit()} className='cursor-pointer '>
              <EditIcon />
            </div>
          </div>

          {width > 768 && (
            <div className='flex dark:text-theme '>
              <button
                className='border rounded-lg mx-2 p-2 w-fit flex items-center hover:bg-secondary-200 dark:bg-dark-300 dark:border-dark-300 '
                onClick={() => toggleTheme()}
              >
                <ThemeIcon />

                <div className='mx-1'>{t('theme')}</div>
              </button>
              <Link
                href={`/share/${id}`}
                className='border rounded-lg mx-2 p-2 w-fit flex items-center hover:bg-secondary-200 dark:bg-dark-300 dark:border-dark-300'
              >
                <ShareIcon />
                <div className='mx-1'>{t('share')}</div>
              </Link>

              <button
                onClick={togglePreview}
                className='border rounded-lg mx-2 p-2 w-fit flex items-center hover:bg-secondary-200 dark:bg-dark-300 dark:border-dark-300'
              >
                <PreviewIcon />
                <div className='mx-1'>{t('preview')}</div>
              </button>
            </div>
          )}
        </nav>
      </div>
    </>
  )
}
