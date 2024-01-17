import { DeleteIcon } from '@/assets/icons'
import { useI18n } from '@/locales/client'
import { deleteSubmission } from '@/query/form/form.mutation'
import { showToast } from '@/shared/ui/toaster'
import { formatDate } from '@/shared/utils'
import { useMutation } from '@tanstack/react-query'

export default function ReportDetail({ data,refetch }: any) {
  const t = useI18n()

  const deleteMutation = useMutation({
    mutationFn: deleteSubmission,
    onSuccess: (data: any) => {
      showToast('success', data?.data?.message)
      refetch()
    }
  })
  return (
    <div className='w-full h-full'>
      {data && (
        <>
          <div className='h-[76px] w-full border-b dark:border-dark-400  border-background flex p-5  justify-end'>
            <div
              className='w-fit flex text-sm justify-center items-center  border  rounded-lg p-1 mx-2 relative hover:bg-red-400 hover:text-theme cursor-pointer'
              onClick={() => deleteMutation.mutate({ aId: [data?._id] })}
            >
              <DeleteIcon />
              <div className='mx-1'>{t('delete')}</div>
            </div>
          </div>
          <div className='text-lg p-4'>
            <span className='text-secondary-500 dark:text-secondary-200 mx-1'>Submission Date :</span> {formatDate(data?.dCreatedAt)}
          </div>
          <div className='w-full  flex p-2'>
            <div className='w-full xl:w-[50%] h-full  p-4'>
              {data?.aAnswers?.map((ans: any, i: number) => {
                return (
                  <div className='flex w-full justify-between md:text-lg text-sm mb-2' key={i}>
                    <div className='text-secondary-500 dark:text-secondary-200'>{ans?.sLabel}</div>
                    <div>{ans?.mAnswerVal}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
