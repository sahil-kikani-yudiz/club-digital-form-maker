'use client'
import { ReactNode, useState } from 'react'
import CustomPagination from '@/shared/Components/customPagination'
import CustomImage from '../customImage'
import SearchIcon from '@/assets/icons/search-icon.svg'

type dataTableTypes = {
  children?: ReactNode
  nTotal?: any
  pagination?: any
  handlePageEvent?: any
  handleSearch?: any
  columns?: any
  action?: boolean
}

export default function DataTable({ children, nTotal, pagination, handlePageEvent, handleSearch, columns, action }: dataTableTypes) {
  const [value, setValue] = useState('')

  // const [selectedOption, setSelectedOption] = useState('')

  // const handleSelectChange = (e: any) => {
  //   setSelectedOption(e.target.value)
  // }

  // const options = [{ sValue: 'All Form', isSelected: true }, { sValue: 'Draft' }, { sValue: 'Delete' }]

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
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <CustomImage src={SearchIcon} height={20} width={20} />
          </div>
          <input
            type='search'
            id='default-search'
            value={value}
            className='block w-full p-2 ps-10 text-md border rounded-lg bg-gray-5'
            placeholder='Search Forms Here....'
            onChange={(e) => search(e.target.value)}
            required
          />
        </div>
      </div>
      <div className='w-full h-full overflow-y-auto p-4'>
        <div className='relative shadow-md  w-full h-ful'>
          <table className='w-full h-full text-left '>
            <thead className='text-xs text-secondary-500 h-[56px] uppercase bg-tableBg'>
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
            <tbody className='bg-theme h-full'>{children}</tbody>
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
