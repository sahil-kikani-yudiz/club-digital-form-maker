import CustomImage from '@/shared/ui/customImage'
import { usePagination } from './usePagination'
import DownIcon from '@/assets/icons/down-icon.svg'

type customPaginationTypes = {
  className?: string
  currentPage: number
  totalCount: number | 0
  pageSize: number
  onPageChange: Function
}

export default function CustomPagination({ className, currentPage, totalCount, pageSize, onPageChange }: customPaginationTypes) {
  const siblingCount = 1
  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })
  if (paginationRange)
    if (currentPage === 0 || paginationRange.length < 2) {
      return null
    }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = 0
  if (paginationRange) lastPage = paginationRange[paginationRange?.length - 1]
  return (
    <div className='flex w-full  items-center flex-column flex-wrap md:flex-row justify-between p-7'>
      <span className='text-sm font-normal text-gray-500 dark:text-secondary-200 mb-4 md:mb-0 block w-full md:inline md:w-auto'>
        Page <span className='font-semibold text-gray-900 dark:text-theme'>{currentPage}</span> of{' '}
        <span className='font-semibold text-gray-900 dark:text-theme'>{lastPage}</span>
      </span>
      <ul className='justify-center text-center items-center flex  h-8'>
        <li>
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-dark-300'
          >
            <div className='w-5 transition-all rotate-90 mt-2 dark:filter dark:invert'>
              <CustomImage src={DownIcon} height={14} width={14} />
            </div>
          </button>
        </li>

        {paginationRange?.map((page: number, index: number) => {
          return (
            <li key={index}>
              <button
                onClick={() => onPageChange(page)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-dark-300 dark:text-theme ${
                  page === currentPage ? 'bg-primary-200 dark:bg-gray-600' : 'bg-white'
                }`}
              >
                {page}
              </button>
            </li>
          )
        })}

        <li>
          <button
            disabled={currentPage === lastPage}
            onClick={onNext}
            className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-dark-300'
          >
            <div className='w-5 transition-all rotate-[270deg] mb-1 dark:filter dark:invert'>
              <CustomImage src={DownIcon} height={14} width={14} />
            </div>
          </button>
        </li>
      </ul>
    </div>
  )
}
