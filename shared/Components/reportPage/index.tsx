'use client'
import CustomImage from '@/shared/ui/customImage'
import CustomLink from '@/shared/ui/customLink'
import LeftArrow from '@/assets/icons/left-arrow.svg'
import React, { useEffect, useState } from 'react'
import DataTable from '@/shared/ui/dataTable'
import { useQuery } from '@tanstack/react-query'
import { getReport } from '@/query/form/form.quey'
import SearchIcon from '@/assets/icons/search-icon.svg'
import Divider from '@/shared/ui/divider'
import { useI18n } from '@/locales/client'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import UserIcon from '@/assets/icons/user-icon.svg'
import DownloadIcon from '@/assets/icons/download-icon.svg'
import { formatDate } from '@/shared/utils'

type reportPageType = {
  id: string
}

export default function ReportPage({ id }: reportPageType) {
  // const columns = [{ title: 'Actions' }, { title: 'CreatedAt' }, { title: 'Responses' }, { title: 'Actions' }]
  const t = useI18n()
  const [columns, setColumns] = useState()
  const [selectedRecord, setSelectedRecord] = useState<any>()
  const [selectedCheckBox, setSelectedCheckBox] = useState<any>([])
  const [selectAllChecked, setSelectAllChecked] = useState(false)

  const { data } = useQuery({
    queryKey: ['getReport', id],
    queryFn: () => getReport(id)
  })
  console.log(selectedCheckBox, 'selectedCheckBox')

  function handleRecord(data: any) {
    setSelectedRecord(data)
  }

  function handleBulkAction(data: any, isSelected: any) {
    if (isSelected) {
      const newData = data?.sMobileNo
      setSelectedCheckBox((prevFields = []) => [...prevFields, newData])
    } else {
      const updatedData = selectedCheckBox.filter((checkbox: any) => checkbox !== data?.sMobileNo)
      setSelectedCheckBox(updatedData)
    }
  }

  console.log(data?.data?.data?.aResults?.aRecords[0], 'selectedRecord')

  useEffect(() => {
    if (data) setSelectedRecord(data?.data?.data?.aResults?.aRecords[0])
  }, [data])

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    setSelectAllChecked(isChecked)

    if (isChecked) {
      const allMobileNos = data?.data?.data?.aResults?.aRecords?.map((record: any) => record?.sMobileNo)
      setSelectedCheckBox(allMobileNos)
    } else {
      setSelectedCheckBox([])
    }
  }

  return (
    <div className='bg-background w-screen h-[calc(100%-70px)] p-4'>
      <div className='bg-theme h-[66px] border rounded-lg items-center justify-between flex p-2'>
        <div className='flex   items-center'>
          <CustomLink href={`/`}>
            <CustomImage src={LeftArrow} height={22} width={22} />
          </CustomLink>
          <div className='text-base mx-2'>My Form</div>
        </div>
        <div className='w-fit flex text-sm justify-center items-center  border  rounded-lg p-2 mx-2 relative hover:bg-primary-300 hover:text-theme cursor-pointer'>
          <CustomImage src={DownloadIcon} height={20} width={20} className='mx-1' />
          <div className='mx-1'>{t('downloadCsv')}</div>
        </div>
      </div>

      <div className='bg-theme w-full h-[calc(100%-80px)] mt-4 rounded-lg border flex'>
        <aside className='w-[367px] h-full flex flex-col max-w-[337px] border-e-secondary-200  bg-theme overflow-y-auto border-r '>
          <div className='relative mb-4 p-2'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none mx-1'>
              <CustomImage src={SearchIcon} height={20} width={20} />
            </div>
            <input
              type='search'
              id='default-search'
              // value={value}
              className='block w-full p-2 ps-10 text-md border rounded-lg'
              placeholder='Search'
              // onChange={(e) => search(e.target.value)}
              required
            />
          </div>
          <Divider />

          <div className='w-full bg-theme h-[48px] flex items-center justify-center mt-'>
            <div className='flex justify-between w-full items-center p-2'>
              {selectedCheckBox.length > 0 ? (
                <button className='w-fit flex text-sm justify-center items-center  border  rounded-lg p-2 mx-2 relative hover:bg-primary-300 hover:text-theme cursor-pointer'>
                  <CustomImage src={DownloadIcon} height={20} width={20} className='mx-1' />
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
            {data?.data?.data?.aResults?.aRecords?.map((record: any, index: number) => {
              return (
                <div
                  className={`border cursor-pointer  bg-primary-200 w-full h-[45px] flex items-center justify-between text-secondary-500 text-sm mb-2 rounded-lg${
                    selectedRecord?.sMobileNo === record?.sMobileNo ? 'border-secondary-900 text-theme bg-sky-800 rounded-lg' : ''
                  }`}
                >
                  <div key={index} onClick={() => handleRecord(record)} className='w-full h-[45px] flex items-center'>
                    <div className='mx-12 w-full'>{record?.sMobileNo}</div>
                  </div>
                  <input
                    type='checkbox'
                    className='h-5 w-5 cursor-pointer mx-2 z-20'
                    id={record?.sMobileNo}
                    value={record?.sMobileNo}
                    name={record?.sMobileNo}
                    onChange={(e) => handleBulkAction(record, e.target.checked)}
                    checked={selectedCheckBox?.includes(record?.sMobileNo)}
                  />
                </div>
              )
            })}
          </div>
        </aside>
        <div className='w-full h-full'>
          {selectedRecord && (
            <>
              <div className='h-[76px] w-full border-b  border-background flex p-5  justify-end'>
                <div className='w-fit flex text-sm justify-center items-center  border  rounded-lg p-1 mx-2 relative hover:bg-red-400 hover:text-theme cursor-pointer'>
                  <CustomImage src={DeleteIcon} height={20} width={20} className='mx-1' />
                  <div className='mx-1'>{t('delete')}</div>
                </div>
              </div>
              <div className='text-lg p-4'>
                <span className='text-secondary-500 mx-1'>Submission Date :</span> {formatDate(selectedRecord?.dCreatedAt)}
              </div>
              <div className='w-full  flex p-2'>
                <div className='w-full xl:w-[50%] h-full  p-4'>
                  {selectedRecord?.aAnswers?.map((ans: any, i: number) => {
                    return (
                      <div className='flex w-full justify-between text-lg mb-2' key={i}>
                        <div className='text-secondary-500'>{ans?.sLabel}</div>
                        <div>{ans?.mAnswerVal}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
