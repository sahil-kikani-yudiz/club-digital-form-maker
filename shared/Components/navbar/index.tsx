import Link from 'next/link'

import CustomImage from '@/shared/ui/customImage'
import ShareIcon from '@/assets/icons/share-icon.svg'
import PreviewIcon from '@/assets/icons/preview-icon.svg'
import CustomLink from '@/shared/ui/customLink'
import LeftArrow from '@/assets/icons/left-arrow.svg'
import { useI18n } from '@/locales/client'
import ThemeIcon from '@/assets/icons/theme-icon.svg'
import EditIcon from '@/assets/icons/edit-icon.svg'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Divider from '@/shared/ui/divider'
import { useForm } from 'react-hook-form'
import CommonInput from '@/shared/ui/commonInput'
import { useMutation } from '@tanstack/react-query'
import { editForm } from '@/query/form/form.mutation'
import { showToast } from '@/shared/ui/toaster'
import useWindowSize from '@/shared/hooks/windowSize'

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
    console.log(data, 'data')
    const newData = { ...data, sFormId: id }
    mutation.mutate(newData)
  }
  return (
    <>
      <Transition appear show={isEdit}>
        <Dialog as='div' className='relative z-10' onClose={toggleEdit}>
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
                  <>
                    <Dialog.Title as='h3' className='text-lg flex flex-col font-medium leading-6 text-gray-900 mb-2'>
                      {t('editForm')}
                    </Dialog.Title>

                    <Divider />

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
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className='p-4 bg-background'>
        <nav className='bg-theme border flex rounded-lg h-[66px] justify-between px-[11px] py-[15px]'>
          <div className='flex items-center'>
            <CustomLink href={path}>
              <CustomImage src={LeftArrow} height={22} width={22} />
            </CustomLink>
            <div className='text-base mx-2'>{data?.sTitle}</div>
            <div onClick={() => toggleEdit()}>
              <CustomImage className='cursor-pointer' src={EditIcon} height={20} width={20} />
            </div>
          </div>

          {width > 768 && (
            <div className='flex'>
              <button className='border rounded-lg mx-2 p-2 w-fit flex items-center hover:bg-secondary-200' onClick={() => toggleTheme()}>
                <CustomImage src={ThemeIcon} height={22} width={22} />
                <div className='mx-1'>{t('theme')}</div>
              </button>
              <Link href={`/share/${id}`} className='border rounded-lg mx-2 p-2 w-fit flex items-center hover:bg-secondary-200'>
                <CustomImage src={ShareIcon} height={16} width={16} />
                <div className='mx-1'>{t('share')}</div>
              </Link>

              <button onClick={togglePreview} className='border rounded-lg mx-2 p-2 w-fit flex items-center hover:bg-secondary-200'>
                <CustomImage src={PreviewIcon} height={20} width={20} />
                <div className='mx-1'>{t('preview')}</div>
              </button>
            </div>
          )}
        </nav>
      </div>
    </>
  )
}
