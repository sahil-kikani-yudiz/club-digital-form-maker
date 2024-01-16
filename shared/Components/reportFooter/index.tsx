import { DownloadIcon, ReportIcon } from '@/assets/icons'
import { useI18n } from '@/locales/client'
import MobileFooter from '@/shared/ui/mobileFooter'

export default function ReportFooter({ setIsField, setIsReport }: any) {
  const t = useI18n()
  return (
    <MobileFooter>
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
    </MobileFooter>
  )
}
