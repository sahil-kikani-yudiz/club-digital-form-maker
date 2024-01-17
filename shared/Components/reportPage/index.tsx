'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { getFormById, getReport, getStatus } from '@/query/form/form.quey'
import { generateReport, selectedSubmissionReport } from '@/query/form/form.mutation'

import { useI18n } from '@/locales/client'
import { appendParams } from '@/shared/utils'
import useWindowSize from '@/shared/hooks/windowSize'
import PopUp from '@/shared/ui/popup'
import MobileDrawer from '@/shared/ui/mobileDrawer'
import { DownloadIcon } from '@/assets/icons'

import ProtectedRoute from '../protectedRoute'
import ReportDetail from './recordDetails'
import ReportSidebar from './reportSidebar'
import ReportNavbar from './reportNavbar'

type reportPageType = {
  id: string
}

function ReportPage({ id }: reportPageType) {
  const t = useI18n()
  const [selectedRecord, setSelectedRecord] = useState<any>()
  const [selectedCheckBox, setSelectedCheckBox] = useState<any>([])
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const [isField, setIsField] = useState(false)
  const [requestParams, setRequestParams] = useState({ sSearch: '', nSkip: 1, nLimit: 12, _id: '' })
  const [selectedField, setSelectedField] = useState<any>([])
  const [isMobileSideBar, setIsMobileSideBar] = useState(false)

  const [width] = useWindowSize()
  const loading = useRef(false)
  const router = useRouter()

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

  const { data: FormData } = useQuery({
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

  const mutation = useMutation({
    mutationFn: generateReport,
    onSuccess: (data: any) => {
      const statusId = data?.data?.data?._id
      statusMutation.mutate(statusId)
    }
  })

  const selectedReport = useMutation({
    mutationFn: selectedSubmissionReport,
    onSuccess: (data: any) => {
      if (data?.data?.data?.status === 'processing') {
        const statusId = data?.data?.data?._id
        statusMutation.mutate(statusId)
      }
    }
  })

  useEffect(() => {
    if (data && width > 768) setSelectedRecord(data?.data?.data?.aResults[0])
  }, [data])

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

  function handleReport(id: string) {
    if (!loading.current) mutation.mutate({ sFormId: id, aColumnIds: selectedField })
  }

  function handleSelectedReportDownload() {
    selectedReport.mutate({ sFormId: id, aSubmissionIds: selectedCheckBox, aColumnIds: selectedField })
  }

  return (
    <div className='bg-background dark:bg-dark-100 w-screen h-[calc(100%-70px)] p-4' onClick={() => setIsMobileSideBar(false)}>
      <ReportNavbar width={width} setIsField={() => setIsField(true)} id={id} />

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
        <ReportSidebar
          handleSearch={handleSearch}
          selectedCheckBox={selectedCheckBox}
          handleSelectedReportDownload={handleSelectedReportDownload}
          selectedRecord={selectedRecord}
          setSelectAllChecked={setSelectAllChecked}
          setIsMobileSideBar={setIsMobileSideBar}
          setSelectedRecord={setSelectedRecord}
          selectAllChecked={selectAllChecked}
          data={data}
          setSelectedCheckBox={setSelectedCheckBox}
        />

        {width > 767 ? (
          <ReportDetail data={selectedRecord} refetch={refetch} />
        ) : (
          <MobileDrawer isOpen={isMobileSideBar}>
            <ReportDetail data={selectedRecord} refetch={refetch} />
          </MobileDrawer>
        )}
      </div>
    </div>
  )
}
export default ProtectedRoute(ReportPage)
