import { DownloadIcon, SearchIcon } from '@/assets/icons'
import { useI18n } from '@/locales/client'
import Divider from '@/shared/ui/divider'

export default function ReportSidebar({
  handleSearch,
  selectedCheckBox,
  setSelectedCheckBox,
  setIsMobileSideBar,
  setSelectedRecord,
  selectedRecord,
  setSelectAllChecked,
  handleSelectedReportDownload,
  selectAllChecked,
  data
}: any) {
  const t = useI18n()

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
  return (
    <aside className='w-full md:w-[367px] h-full flex flex-col md:max-w-[337px]  dark:bg-dark-200  bg-theme overflow-y-auto border-r dark:border-dark-400'>
      <div className='relative mb-4 p-2'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none mx-1'>
          <SearchIcon />
        </div>
        <input
          type='search'
          id='default-search'
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
  )
}
