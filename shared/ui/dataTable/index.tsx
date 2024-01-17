'use client'
import { ReactNode, useState } from 'react'
import CustomPagination from '@/shared/Components/customPagination'
import { SearchIcon } from '@/assets/icons'


type dataTableTypes = {
  children?: ReactNode
  nTotal?: any,
  pagination?: any
  handlePageEvent?: any
  handleSearch?: any
  columns?: any
  action?: boolean
}

export default function DataTable({ children, nTotal, pagination, handlePageEvent, handleSearch, columns, action }: dataTableTypes) {
  const [value, setValue] = useState('')

  function search(value: string) {
    setValue(value)
    handleSearch(value)
  }

  return (
    <>
      <div className='flex justify-end p-2 w-full'>
        {/* <div className='w-[200px] z-10'>
          <Dropdown options={options} />
        </div> */}

        <div className='relative'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none dark:text-theme '>
            <SearchIcon/>
          </div>
          <input
            type='search'
            id='default-search'
            value={value}
            className='block w-full p-2 ps-10 text-md border rounded-lg dark:border-dark-200 dark:bg-dark-100 dark:text-theme'
            placeholder='Search Forms Here....'
            onChange={(e) => search(e.target.value)}
            required
          />
        </div>
      </div>
      <div className='w-full h-full overflow-y-auto p-4'>
        <div className='relative shadow-md  w-full '>
          <table className='w-full h-full text-left '>
            <thead className='text-xs text-secondary-500 h-[56px] uppercase bg-tableBg dark:bg-dark-300 dark:text-secondary-400'>
              <tr>
                {action && <th className='px-6 py-3'>Actions</th>}
                {columns?.map((column: any, i: string) => {
                  return (
                    <th key={i} className='px-6 py-3'>
                      {column?.title}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className='bg-theme dark:bg-dark-100 h-full'>{children}</tbody>
          </table>
        </div>
      </div>
      <CustomPagination
        currentPage={pagination?.currentPage}
        totalCount={nTotal}
        pageSize={pagination?.pageSize}
        onPageChange={handlePageEvent}
      />
    </>
  )
}
