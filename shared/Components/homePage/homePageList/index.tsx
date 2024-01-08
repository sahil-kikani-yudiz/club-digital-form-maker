import CustomImage from '@/shared/ui/customImage'
import { formatDate } from '@/shared/utils'
import Link from 'next/link'
import EditIcon from '@/assets/icons/edit-icon.svg'
import DeleteIcon from '@/assets/icons/delete-icon.svg'
import { useMutation } from '@tanstack/react-query'
import { deleteForm } from '@/query/form/form.mutation'
import { showToast } from '@/shared/ui/toaster'
import ReportIcon from '@/assets/icons/report-icon.svg'

type dataType = {
  sTitle: string
  sDescription: string
  dUpdatedAt: string
  sFormId: string
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
    <tr className='bg-white border-b  hover:bg-gray-50'>
      <td className='px-6 py-[8px] '>{data?.sTitle}</td>
      {/* <td className='px-6 py-[8px] '>{data?.sDescription}</td> */}
      <td className='px-6 py-[8px] '>{formatDate(data?.dUpdatedAt)}</td>
      <td className='px-6 py-[8px] '>150</td>
      <td className='px-6 py-[8px] flex flex-shrink-0'>
        <Link href={`/formbuilder/${data?.sFormId}`} className=''>
          <div className='hover:bg-primary-300 rounded-[25%] h-fit w-fit p-2'>
            <CustomImage src={EditIcon} height={20} width={20} />
          </div>
        </Link>
        <button className=''>
          <div onClick={() => handleDelete(data?.sFormId)} className='hover:bg-red-400 rounded-[25%] h-fit w-fit p-2'>
            <CustomImage src={DeleteIcon} height={20} width={20} />
          </div>
        </button>
        <Link href={`/report/${data?.sFormId}`} className=''>
          <div className='hover:bg-secondary-400 rounded-[25%] h-fit w-fit p-2'>
            <CustomImage src={ReportIcon} height={20} width={20} />
          </div>
        </Link>
      </td>
    </tr>
  )
}
