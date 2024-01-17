import { BackArrow, DownloadIcon, ReportIcon } from '@/assets/icons'
import { useI18n } from '@/locales/client'
import CustomLink from '@/shared/ui/customLink'
import ReportFooter from '../reportFooter'
import PopUp from '@/shared/ui/popup'
import CustomImage from '@/shared/ui/customImage'
import CsvIcon from '@/assets/icons/csv-icon.svg'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getReportList } from '@/query/form/form.quey'
import { bottomReached, formatDate } from '@/shared/utils'
import { useRouter } from 'next/navigation'


export default function ReportNavbar({ width, setIsField, id }: any) {
  const t = useI18n()
  const [isReport, setIsReport] = useState(false)
  const [reportData, setReportData] = useState<any>([])
  const [reportRequestParams, setReportRequestParams] = useState({ nSkip: 1, nLimit: 12, _id: '' })
  const router = useRouter()

  const { report }: any = useQuery({
    queryKey: ['getReport', id, reportRequestParams],
    queryFn: () => getReportList(id, reportRequestParams),
    onSuccess: (data: any) => {
      const newData = data?.data?.data
      setReportData([...reportData, ...newData])
    }
  })

  function handleScroll(e: any) {
    if (bottomReached(e, 200) && reportData) {
      // const data = reportData?.data?.data
      const id = reportData[reportData?.length - 1]?._id
      setReportRequestParams({ ...reportRequestParams, _id: id, nSkip: reportRequestParams.nSkip + 1 })
    }
  }

  return (
    <>
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
      {width <= 767 && <ReportFooter setIsReport={() => setIsReport(true)} setIsField={() => setIsField(true)} />}
    </>
  )
}
