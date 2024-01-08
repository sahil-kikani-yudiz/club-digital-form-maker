'use client'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'

import DataTable from '@/shared/ui/dataTable'
import CommonInput from '@/shared/ui/commonInput'
import Divider from '@/shared/ui/divider'
import CreateForm from '@/query/form/form.mutation'
import { showToast } from '@/shared/ui/toaster'
import CustomImage from '@/shared/ui/customImage'
import FormIcon from '@/assets/icons/form-icon.svg'
import { getFormList } from '@/query/form/form.quey'
import { appendParams } from '@/shared/utils'
import FormListing from './homePageList'
import { useI18n } from '@/locales/client'
import Loader from '@/shared/ui/loader'

export default function HomePage() {
  const [requestParams, setRequestParams] = useState({ nSkip: 1, nLimit: 8, sSearch: '' })
  const t = useI18n()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const nTotal = useRef(0)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['getFormList', requestParams],
    queryFn: () => getFormList(requestParams),
    onSuccess: (data: any) => {
      nTotal.current = data?.data?.data?.nTotal
    }
  })
  console.log(data, 'data')
  const formData = data?.data?.data
  console.log(formData, 'formData')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  function closeModal() {
    setOpen(!open)
    reset({
      sTitle: '',
      sDescription: ''
    })
  }

  const mutation = useMutation({
    mutationFn: CreateForm,
    onSuccess: (data) => {
      showToast('success', data?.data?.message)
      router.push(`/formbuilder/${data?.data?.data?.sFormId}`)
    },
    onError: (error: any) => {
      showToast('error', error?.message)
    }
  })

  function onSubmit(data: any) {
    mutation.mutate(data)
  }

  function handleSearch(value: string) {
    setRequestParams({ ...requestParams, sSearch: value })
    appendParams({ sSearch: value })
  }

  function handlePageEvent(page: any) {
    setRequestParams({ ...requestParams, nSkip: page })
    appendParams({ nSkip: page })
  }

  const columns = [{ title: 'Form name' },  { title: 'CreatedAt' }, { title: 'Responses' }, { title: 'Actions' }]

  return (
    <div className='bg-background w-screen h-[calc(100%-70px)] p-4'>
      {isLoading && <Loader />}
      <div className='bg-theme h-[66px] border rounded-lg items-center flex p-2'>
        <button className='bg-primary-500 rounded-lg p-3 text-theme hover:bg-primary-400' onClick={() => setOpen(true)}>
          {t('createForm')}
        </button>
      </div>

      <Transition appear show={open}>
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
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
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
                  <Dialog.Title as='h3' className='text-lg flex flex-col font-medium leading-6 text-gray-900'>
                    {t('createForm')}
                    <span className='text-secondary-500 text-sm mb-2'>{t('startFromScratch')}</span>
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
                    {t('createForm')}
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className='bg-theme w-full h-[calc(100%-80px)] mt-4 rounded-lg border'>
        <div className='flex flex-col justify-center items-center h-full p-2'>
          {nTotal?.current === 0 && !requestParams?.sSearch  ? (
            <>
              <CustomImage src={FormIcon} height={50} width={50} className='mb-4' />
              <div className='text-secondary-500 text-lg'>{t('dontHaveAnyForms')}</div>
              <div className='text-secondary-400 mt-2 mb-2'>{t('formAppearHere')}</div>
              <button onClick={() => setOpen(true)} className='bg-primary-500 rounded-lg p-3 text-theme hover:bg-primary-400'>
                {t('createForm')}
              </button>
            </>
          ) : (
            <DataTable
              nTotal={nTotal.current}
              pagination={{ currentPage: requestParams?.nSkip, pageSize: requestParams?.nLimit }}
              handlePageEvent={handlePageEvent}
              handleSearch={handleSearch}
              columns={columns}
            >
              {formData?.aResults.map((form: any, i: number) => {
                return <FormListing data={form} key={i} refetch={refetch} />
              })}
            </DataTable>
          )}
        </div>
      </div>
    </div>
  )
}
