'use client'
import CustomImage from '@/shared/ui/customImage'
import CustomLink from '@/shared/ui/customLink'
import LeftArrow from '@/assets/icons/left-arrow.svg'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import DataTable from '@/shared/ui/dataTable'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getFormById, getReport, getReportList, getStatus } from '@/query/form/form.quey'

import Divider from '@/shared/ui/divider'
import { useI18n } from '@/locales/client'

import UserIcon from '@/assets/icons/user-icon.svg'

import { appendParams, bottomReached, formatDate } from '@/shared/utils'

import { Dialog, Transition } from '@headlessui/react'
import { deleteSubmission, generateReport, selectedSubmissionReport } from '@/query/form/form.mutation'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import CsvIcon from '@/assets/icons/csv-icon.svg'
import { showToast } from '@/shared/ui/toaster'
import { BackArrow, DeleteIcon, DownloadIcon, ReportIcon, SearchIcon } from '@/assets/icons'
import ProtectedRoute from '../protectedRoute'
import PopUp from '@/shared/ui/popup'
import useWindowSize from '@/shared/hooks/windowSize'
import ReportDetail from '../recordDetails'
import MobileDrawer from '@/shared/ui/mobileDrawer'
import ReportFooter from '../reportFooter'

type reportPageType = {
  id: string
}

function ReportPage({ id }: reportPageType) {
  const t = useI18n()
  const [selectedRecord, setSelectedRecord] = useState<any>()
  const [selectedCheckBox, setSelectedCheckBox] = useState<any>([])
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const [isReport, setIsReport] = useState(false)
  const router = useRouter()
  const loading = useRef(false)
  const [requestParams, setRequestParams] = useState({ sSearch: '' })
  const [reportRequestParams, setReportRequestParams] = useState({ nSkip: 1, nLimit: 12, _id: '' })
  const [reportData, setReportData] = useState<any>([])
  const [selectedField, setSelectedField] = useState<any>([])
  const [isField, setIsField] = useState(false)
  const [width] = useWindowSize()
  const [isMobileSideBar, setIsMobileSideBar] = useState(false)

  const statusMutation = useMutation({
    mutationFn: getStatus,
    onSuccess: (data: any) => {
      if (data?.data?.data?.status === 'processing') {
        loading.current = true
        setTimeout(() => {
          statusMutation.mutate(data?.data?.data?._id)
        }, 2000)
      } else if (data?.data?.data?.status === 'completed') {
        router.push(`https://clubdizital-media.s3.ap-south-1.amazonaws.com/${data?.data?.data?.sReportUrl}`)
        loading.current = false
        setSelectedCheckBox([])
        setSelectAllChecked(false)
        setIsField(false)
      }
    }
  })

  const { data: FormData, isLoading } = useQuery({
    queryKey: ['getForm', id],
    queryFn: () => getFormById(id),
    onSuccess: (data: any) => {
      const fields = data?.data?.data?.aField?.map((field: any) => field?.iUniqueId)
      setSelectedField(fields)
    }
  })

  const { data, refetch } = useQuery({
    queryKey: ['getReport', id, requestParams],
    queryFn: () => getReport(id, requestParams)
  })

  const { report }: any = useQuery({
    queryKey: ['getReport', id, reportRequestParams],
    queryFn: () => getReportList(id, reportRequestParams),
    onSuccess: (data: any) => {
      const newData = data?.data?.data
      setReportData([...reportData, ...newData])
    }
  })

  function handleRecord(data: any) {
    setIsMobileSideBar(true)
    setSelectedRecord(data)
  }

  function handleBulkAction(data: any, isSelected: any) {
    if (isSelected) {
      const newData = data?._id
      setSelectedCheckBox((prevFields = []) => [...prevFields, newData])
    } else {
      const updatedData = selectedCheckBox.filter((checkbox: any) => checkbox !== data?._id)
      setSelectedCheckBox(updatedData)
    }
  }

  function handleSelectedField(id: string, isSelected: any) {
    if (isSelected) {
      setSelectedField((prevFields = []) => [...prevFields, id])
    } else {
      const updatedData = selectedField.filter((checkbox: any) => checkbox !== id)
      setSelectedField(updatedData)
    }
  }

  function handleSearch(value: string) {
    setRequestParams({ ...requestParams, sSearch: value })
    appendParams({ sSearch: value })
  }

  useEffect(() => {
    if (data && width > 768) setSelectedRecord(data?.data?.data?.aResults[0])
  }, [data])

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    setSelectAllChecked(isChecked)

    if (isChecked) {
      const allMobileNos = data?.data?.data?.aResults?.map((record: any) => record?._id)
      setSelectedCheckBox(allMobileNos)
    } else {
      setSelectedCheckBox([])
    }
  }

  const mutation = useMutation({
    mutationFn: generateReport,
    onSuccess: (data: any) => {
      const statusId = data?.data?.data?._id
      statusMutation.mutate(statusId)
    }
  })

  function handleReport(id: string) {
    if (!loading.current) mutation.mutate({ sFormId: id, aColumnIds: selectedField })
  }

  function handleScroll(e: any) {
    if (bottomReached(e, 200) && reportData) {
      // const data = reportData?.data?.data
      const id = reportData[reportData?.length - 1]?._id
      setReportRequestParams({ ...reportRequestParams, _id: id, nSkip: reportRequestParams.nSkip + 1 })
    }
  }

  const selectedReport = useMutation({
    mutationFn: selectedSubmissionReport,
    onSuccess: (data: any) => {
      if (data?.data?.data?.status === 'processing') {
        const statusId = data?.data?.data?._id
        statusMutation.mutate(statusId)
      }
    }
  })

  function handleSelectedReportDownload() {
    selectedReport.mutate({ sFormId: id, aSubmissionIds: selectedCheckBox, aColumnIds: selectedField })
  }

  const deleteMutation = useMutation({
    mutationFn: deleteSubmission,
    onSuccess: (data: any) => {
      showToast('success', data?.data?.message)
      refetch()
    }
  })

  return (
    <div className='bg-background dark:bg-dark-100 w-screen h-[calc(100%-70px)] p-4' onClick={() => setIsMobileSideBar(false)}>
      <div className='bg-theme dark:bg-dark-200 dark:border-dark-200 h-[66px] border rounded-lg items-center justify-between flex p-2'>
        <div className='flex   items-center'>
          <CustomLink href={`/dashboard`}>
            <BackArrow />
          </CustomLink>
          <div className='text-base mx-2'>My Form</div>
        </div>
        {width > 767 && (
          <div className='flex gap-2'>
            <div
              className='w-fit flex text-sm justify-center items-center  border  rounded-lg p-2 mx-2 relative hover:bg-primary-300 hover:text-theme cursor-pointer dark:hover:bg-primary-700'
              onClick={() => setIsField(true)}
            >
              <DownloadIcon />
              <div className='mx-1'>{t('downloadReport')}</div>
            </div>
            <div
              className='w-fit flex text-sm justify-center items-center  border  rounded-lg p-2 mx-2 relative hover:bg-primary-300 hover:text-theme cursor-pointer dark:hover:bg-primary-700'
              onClick={() => setIsReport(true)}
            >
              <ReportIcon />
              <div className='mx-1'>{t('yourReports')}</div>
            </div>
          </div>
        )}
      </div>

      <PopUp show={isReport} onClose={() => setIsReport(false)} title='reports' maxWidth='500' handleScroll={handleScroll}>
        {reportData?.map((report: any) => {
          return (
            <div className='flex justify-between w-full p-3 border rounded-lg mb-2 items-center overflow-hidden'>
              <div>
                <div className='flex'>
                  <CustomImage src={CsvIcon} height={20} width={20} />
                  <div className='px-1 text-sm'>{report?.sReportUrl}</div>
                </div>
                <span className='text-sm text-secondary-500 mx-1'>{formatDate(report?.dCreatedAt)}</span>
              </div>
              <div
                className='cursor-pointer'
                onClick={() => router.push(`https://clubdizital-media.s3.ap-south-1.amazonaws.com/${report?.sReportUrl}`)}
              >
                <DownloadIcon />
              </div>
            </div>
          )
        })}
      </PopUp>

      <PopUp show={isField} onClose={() => setIsField(false)} title='selectFields' maxWidth='500'>
        <div className='grid grid-cols-2 gap-4 justify-center items-center mt-2'>
          {FormData?.data?.data?.aField?.map((field: any, i: number) => {
            return (
              <div className='flex col-span-1 items-center gap-2 text-xl'>
                <input
                  type='checkbox'
                  name={field?._iUniqueId}
                  value={field?._iUniqueId}
                  className=' outline-none h-4 w-4'
                  onChange={(e) => handleSelectedField(field?.iUniqueId, e.target.checked)}
                  checked={selectedField?.includes(field?.iUniqueId)}
                />
                <span className=''>{field?.oSettings?.sLabel || `Field ${i + 1}`}</span>
              </div>
            )
          })}
        </div>
        <div className='flex justify-end w-full mt-4'>
          <div
            className='w-fit flex text-sm justify-center items-center  border  rounded-lg p-2 relative hover:bg-primary-300 hover:text-theme cursor-pointer dark:hover:bg-primary-700'
            onClick={() => handleReport(id)}
          >
            {loading.current ? (
              <div className='animate-pulse'>Processing...</div>
            ) : (
              <>
                <DownloadIcon />
                <div className='mx-1'>{t('downloadReport')}</div>
              </>
            )}
          </div>
        </div>
      </PopUp>

      <div className='bg-theme dark:bg-dark-200 w-full h-[calc(100%-80px)] mt-4 dark:border-dark-200 rounded-lg border flex'>
        <aside className='w-full md:w-[367px] h-full flex flex-col md:max-w-[337px]  dark:bg-dark-200  bg-theme overflow-y-auto border-r dark:border-dark-400'>
          <div className='relative mb-4 p-2'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none mx-1'>
              <SearchIcon />
            </div>
            <input
              type='search'
              id='default-search'
              // value={value}
              className='block w-full p-2 ps-10 text-md border dark:border-0 rounded-lg dark:bg-dark-100'
              placeholder='Search...'
              onChange={(e) => handleSearch(e.target.value)}
              required
            />
          </div>
          <Divider />

          <div className='w-full bg-theme dark:bg-dark-300 h-[48px] flex items-center justify-center '>
            <div className='flex justify-between w-full items-center p-2'>
              {selectedCheckBox.length > 0 ? (
                <button
                  className='w-fit flex text-sm justify-center items-center  border  rounded-lg p-2 mx-2 relative hover:bg-primary-300 hover:text-theme cursor-pointer dark:hover:bg-primary-700'
                  onClick={handleSelectedReportDownload}
                >
                  <DownloadIcon />
                  <div className='mx-1 flex'>
                    {t('download')}
                    <div className='bg-red-500 rounded-full text-[10px] mx-2 h-5 w-5 text-theme'>{selectedCheckBox.length}</div>
                  </div>
                </button>
              ) : (
                <div>Submissions</div>
              )}
              <div className='flex items-center text-sm'>
                Select All <input type='checkbox' className='mx-2 w-4 h-4' checked={selectAllChecked} onChange={handleSelectAllChange} />
              </div>
            </div>
          </div>

          <div className=' p-2'>
            {data?.data?.data?.aResults?.map((record: any, index: number) => {
              return (
                <div
                  className={`border cursor-pointer dark:bg-dark-300 dark:border-dark-300  bg-primary-200 w-full h-[45px] flex items-center justify-between text-secondary-500 text-sm mb-2 rounded-lg${
                    selectedRecord?.sMobileNo === record?.sMobileNo
                      ? 'border-secondary-900 dark:border-gray-600 text-theme bg-sky-800 dark:bg-gray-600 rounded-lg'
                      : ''
                  }`}
                >
                  <div key={index} onClick={() => handleRecord(record)} className='w-full h-[45px] flex items-center'>
                    <div className='mx-12 w-full'>{record?.sMobileNo}</div>
                  </div>
                  <input
                    type='checkbox'
                    className='h-5 w-5 cursor-pointer mx-2'
                    id={record?._id}
                    value={record?._id}
                    name={record?._id}
                    onChange={(e) => handleBulkAction(record, e.target.checked)}
                    checked={selectedCheckBox?.includes(record?._id)}
                  />
                </div>
              )
            })}
          </div>
        </aside>

        {width > 767 ? (
          <ReportDetail data={selectedRecord} deleteMutation={deleteMutation} />
        ) : (
          <MobileDrawer isOpen={isMobileSideBar}>
            <ReportDetail data={selectedRecord} deleteMutation={deleteMutation} />
          </MobileDrawer>
        )}

        {width <= 767 && <ReportFooter setIsReport={() => setIsReport(true)} setIsField={() => setIsField(true)} />}
      </div>
    </div>
  )
}

export default ProtectedRoute(ReportPage)
