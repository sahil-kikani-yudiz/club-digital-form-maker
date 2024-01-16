import { useForm } from 'react-hook-form'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import FieldMaker from './fieldMaker'
import CustomImage from '../../ui/customImage'
import Divider from '../../ui/divider'

import CopyIcon from '@/assets/icons/copy-icon.svg'

import { useI18n } from '@/locales/client'
import { useState } from 'react'
import { DeleteIcon, EditIcon } from '@/assets/icons'

type FieldMakerTypes = {
  field?: any
  onFieldEdit?: Function
  onFieldDelete?: Function
  selectedField?: any
}

export default function FieldListing({ field, onFieldEdit, onFieldDelete, selectedField }: FieldMakerTypes) {
  const t = useI18n()

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm()

  const { attributes, setNodeRef, listeners, transform, transition } = useSortable({
    id: field?.oSettings?.iUniqueId
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  function handleEdit(data: any) {
    if (onFieldEdit) {
      onFieldEdit(data)
    }
  }

  function onDelete(id: string) {
    if (onFieldDelete) {
      onFieldDelete(id)
    }
  }

  return (
    <>
      <div
        className={`h-fit w-full flex justify-between items-center  border rounded-lg overflow-hidden ${
          selectedField === field?.oSettings?.iUniqueId ? 'border-primary-500 dark:border-secondary-400' : 'border-transparent'
        }`}
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <div className='bg-theme w-[98%] dark:bg-dark-200'>
          <div className='h-fit p-2 relative '>
            <FieldMaker field={field} register={register} errors={errors} control={control} reset={reset} />
            <div className='absolute top-0 left-0 h-full w-full cursor-move'></div>
          </div>
        </div>

        {selectedField === field?.oSettings?.iUniqueId && (
          <div className='mx-2'>
            <div
              className='h-8 w-8 flex text-sm justify-center items-center  border  rounded-full p-2  relative hover:bg-red-400 hover:text-theme '
              onClick={() => onDelete(field?.oSettings?.iUniqueId)}
            >
              <DeleteIcon />
            </div>

            <div
              className='h-8 w-8 mt-2 flex text-sm justify-center items-center  border  rounded-full p-2  relative hover:bg-primary-300 hover:text-theme '
              onClick={() => handleEdit(field)}
            >
              <EditIcon />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
