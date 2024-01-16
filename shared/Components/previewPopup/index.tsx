import { useI18n } from '@/locales/client'
import FieldMaker from '@/shared/Components/field/fieldMaker'
import Divider from '@/shared/ui/divider'
import PopUp from '@/shared/ui/popup'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'

type PreviewType = {
  open: boolean
  handlePreview: Function
  fieldData: any
  theme: any
}

export default function PreviewPopup({ open, handlePreview, fieldData, theme }: PreviewType) {
  const t = useI18n()
  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors }
  } = useForm()

  return (
    <PopUp
      show={open}
      onClose={handlePreview}
      maxWidth='1400'
      style={{ backgroundImage: `linear-gradient(to right, ${theme?.g1} , ${theme?.g2} )` }}
    >
      <div className='bg-theme dark:bg-secondary-700 w-full h-full rounded-lg mt-2'>
        <div className={`h-[100px] w-full bg-[${theme?.g1}] rounded-t-lg p-4 text-2xl text-theme`} style={{ backgroundColor: theme?.g1 }}>
          {t('preview')}
        </div>
        <div className='p-4'>
          {fieldData?.map((field: any, index: number) => {
            return (
              <div className='mt-4' key={index}>
                <FieldMaker field={field} register={register} errors={errors} setValue={setValue} control={control} />
              </div>
            )
          })}
        </div>
      </div>
    </PopUp>
  )
}
