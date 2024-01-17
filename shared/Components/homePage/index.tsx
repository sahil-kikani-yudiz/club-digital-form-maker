'use client'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
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
import ProtectedRoute from '../protectedRoute'
import PopUp from '@/shared/ui/popup'
import { createForm } from '@/shared/interface'

function HomePage() {
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

  const formData = data?.data?.data

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<createForm>()

  function closeModal() {
    setOpen(false)
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

  function onSubmit(data: createForm) {
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

  const columns = [{ title: 'Form name' }, { title: 'CreatedAt' }, { title: 'Responses' }, { title: 'Actions' }]

  return (
    <div className='bg-background dark:bg-dark-100 w-screen h-[calc(100%-70px)] p-4'>
      {isLoading && <Loader />}
      <div className='bg-theme dark:bg-dark-200 h-[66px] rounded-lg items-center flex p-2'>
        <button className='bg-primary-500 dark:bg-primary-700 rounded-lg p-3 text-theme hover:bg-primary-400' onClick={() => setOpen(true)}>
          {t('createForm')}
        </button>
      </div>

      <PopUp show={open} onClose={closeModal} title='createForm' maxWidth='500'>
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
      </PopUp>

      <div className='bg-theme dark:bg-dark-200 dark:border-dark-200 w-full h-[calc(100%-80px)] mt-4 rounded-lg border'>
        <div className='flex flex-col justify-center items-center h-full p-2'>
          {nTotal?.current === 0 && !requestParams?.sSearch ? (
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

export default ProtectedRoute(HomePage)
