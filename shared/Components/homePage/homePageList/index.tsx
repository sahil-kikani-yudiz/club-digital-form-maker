import CustomImage from '@/shared/ui/customImage'
import { formatDate } from '@/shared/utils'
import Link from 'next/link'

import { useMutation } from '@tanstack/react-query'
import { deleteForm } from '@/query/form/form.mutation'
import { showToast } from '@/shared/ui/toaster'

import { DeleteIcon, EditIcon, ReportIcon } from '@/assets/icons'

type dataType = {
  sTitle: string
  sDescription: string
  dUpdatedAt: string
  sFormId: string
  nSubmissions: string
}

type FormListing = {
  data: dataType
  refetch: Function
}

export default function FormListing({ data, refetch }: FormListing) {
  const mutation = useMutation({
    mutationFn: deleteForm,
    onSuccess: (data) => {
      showToast('success', data?.data?.message)
      refetch()
    },
    onError: (error: any) => {
      showToast('error', error?.message)
    }
  })

  function handleDelete(id: string) {
    mutation.mutate(id)
  }

  return (
    <tr className='bg-white border-b dark:border-dark-200  hover:bg-gray-50 dark:bg-dark-100 dark:hover:bg-dark-200 dark:text-theme'>
      <td className='px-6 py-[8px] '>{data?.sTitle}</td>
      {/* <td className='px-6 py-[8px] '>{data?.sDescription}</td> */}
      <td className='px-6 py-[8px] '>{formatDate(data?.dUpdatedAt)}</td>
      <td className='px-6 py-[8px] '>{data?.nSubmissions}</td>
      <td className='px-6 py-[8px]'>
        <div className='flex flex-shrink-0'>
          <Link href={`/formbuilder/${data?.sFormId}`} className='flex-shrink-0'>
            <div className='hover:bg-primary-300 rounded-[25%] h-fit w-fit p-2 '>
              <EditIcon />
            </div>
          </Link>
          <button className='flex-shrink-0'>
            <div
              onClick={() => handleDelete(data?.sFormId)}
              className='hover:bg-red-400 rounded-[25%] h-fit w-fit p-2 '
            >
              <DeleteIcon />
            </div>
          </button>
          <Link href={`/report/${data?.sFormId}`} className='flex-shrink-0'>
            <div className='hover:bg-secondary-400 rounded-[25%] h-fit w-fit p-2 '>
              {/* <CustomImage src={ReportIcon} height={20} width={20} /> */}
              <ReportIcon />
            </div>
          </Link>
        </div>
      </td>
    </tr>
  )
}
