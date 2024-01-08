import { useI18n } from '@/locales/client'
import FieldMaker from '@/shared/Components/field/fieldMaker'
import Divider from '@/shared/ui/divider'
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
  console.log(fieldData, 'fieldData')
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
    <Transition appear show={open}>
      <Dialog as='div' className='relative z-10' onClose={() => handlePreview()}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25 ' />
        </Transition.Child>

        <div className='fixed inset-0 w-full overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ' style={{ backgroundImage: `linear-gradient(to right, ${theme?.g1} , ${theme?.g2} )` }}>
                <Dialog.Title as='h3' className='text-lg flex flex-col font-medium leading-6 text-gray-900 mb-4'>
                {t('preview')}
                </Dialog.Title>
                <Divider />
                <div className='bg-theme w-full h-full p-2 rounded-lg mt-2'>
                {fieldData?.map((field: any, index : number) => {
                  return (
                    <div className='mt-4' key={index}>
                      <FieldMaker field={field} register={register} errors={errors} setValue={setValue} control={control}/>
                    </div>
                  )
                })}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
