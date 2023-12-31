import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useMutation } from '@tanstack/react-query'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'

import CustomImage from '@/shared/ui/customImage'
import ArrowIcon from '@/assets/icons/arrow-icon.svg'
import profile from '@/assets/icons/profile-icon.svg'
import FieldListing from '@/shared/Components/field/fieldListing'
import Loader from '@/shared/ui/loader'
import { updateFieldPriority } from '@/query/form/form.mutation'
import { useI18n } from '@/locales/client'
import EditToolBox from '../editToolbox'
import useWindowSize from '@/shared/hooks/windowSize'
import MobileDrawer from '@/shared/ui/mobileDrawer'

type settings = {
  iFieldId: string
  iUniqueId: string
  nMaxLength: number
  nMinLength: number
  sLabel: string
  sPlaceHolder: string
  bIsRequired: boolean
  aValue: Array<object>
}

type FieldData = {
  oSettings: settings
  _id: string
}

type PlaygroundType = {
  data: {
    sName: string
  }
  fieldData: FieldData[]
  loading: boolean
  setFieldData: Function
  id: string
  fieldSettings: any
  setFieldSettings: Function
}

export default function Canvas({ data, fieldData, loading, setFieldData, setFieldSettings, fieldSettings, id }: PlaygroundType) {
  const t = useI18n()

  const { isOver, setNodeRef } = useDroppable({ id: 'playground-container' })
  const [isOpen, setIsOpen] = useState(false)
  const [width] = useWindowSize()

  function onUpdateSettings(settings: any) {
    setFieldData((prevFieldData: any) => {
      const updatedFieldData = prevFieldData.map((field: any) => {
        if (field.oSettings?.iUniqueId === settings.iUniqueId) {
          return {
            ...field,
            oSettings: {
              ...field.oSettings,
              nMaxLength: settings?.nMaxLength,
              nMinLength: settings?.nMinLength,
              sLabel: settings?.sLabel,
              sPlaceHolder: settings?.sPlaceHolder,
              bIsRequired: settings?.bIsRequired,
              aOptions: settings?.aOptions
            }
          }
        }
        return field
      })

      return updatedFieldData
    })
  }

  function onFieldEdit(data: any) {
    setFieldSettings(data)
    setIsOpen(true)
  }

  useEffect(() => {
    if (loading) {
      setIsOpen(true)
      // setFieldSettings(fieldData[fieldData?.length - 1]?.oSettings)
    }
  }, [loading])

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5
    }
  })

  const mutation = useMutation({
    mutationFn: updateFieldPriority
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  function handleDragEnd(event: DragEndEvent) {
    const active = event.active
    const over = event.over
    if (active?.id !== over?.id) {
      const oldIndex = fieldData.findIndex((f) => f.oSettings?.iUniqueId === active?.id)
      const newIndex = fieldData.findIndex((f) => f.oSettings?.iUniqueId === over?.id)
      const updatedFieldData = arrayMove(fieldData, oldIndex, newIndex)
      setFieldData(updatedFieldData)
      handleUpdateData(updatedFieldData)
    }
  }

  function handleUpdateData(data: any) {
    const newData = data?.map((field: any) => {
      return {
        iUniqueId: field?.oSettings?.iUniqueId,
        iFieldId: field?.oSettings?.iFieldId
      }
    })
    const updateData = { aField: newData, sFormId: id }
    mutation.mutate(updateData)
  }

  function onFieldDelete(id: string) {
    const updatedFieldData = fieldData.filter((field) => field?.oSettings?.iUniqueId !== id)
    setFieldData(updatedFieldData)
    handleUpdateData(updatedFieldData)
    setIsOpen(false)
  }

  return (
    <>
      {loading && <Loader />}
      <div className='flex-1 flex  relative justify-center items-center' ref={setNodeRef}>
        <div className={`h-full border relative rounded-lg w-full bg-theme overflow-y-auto sm:pb-0 pb-14`}>
          {fieldData?.length > 0 ? (
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
              <SortableContext items={fieldData?.map((field) => field?.oSettings?.iUniqueId)} strategy={verticalListSortingStrategy}>
                {fieldData?.map((field) => (
                  <div key={field?.oSettings?.iUniqueId}>
                    <FieldListing field={field} onFieldEdit={onFieldEdit} onFieldDelete={onFieldDelete} />
                  </div>
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            <div className='border-2 border-dashed rounded-lg m-2 p-4 flex items-center justify-center flex-col'>
              <CustomImage src={ArrowIcon} height={40} width={40} />
              <div className='text-secondary-500 mt-2'>{t('dragItems')}</div>
            </div>
          )}
          <DragOverlay>
            <div
              style={{
                transform: `translate 10px, 10px)`,
                opacity: 0.8,
                pointerEvents: 'none',
                position: 'fixed',
                zIndex: 1000
              }}
            >
              <div
                className={`h-12 w-[250px] border rounded-lg bg-theme mb-1 p-2 cursor-move gap-2 flex items-center  
        `}
              >
                <CustomImage src={profile} height={20} width={20} />
                <div className='text-center'>{data?.sName}</div>
              </div>
            </div>
          </DragOverlay>
        </div>
        {isOver && (
          <div className='absolute top-0 left-0 w-full h-full bg-secondary-400 opacity-30 flex justify-center items-center'>
            <div className='text-secondary-900 text-3xl '>{t('addNewField')}</div>
          </div>
        )}
      </div>

      {width > 768 && (
        <EditToolBox isOpen={isOpen} setIsOpen={setIsOpen} fieldSettings={fieldSettings} onUpdateSettings={onUpdateSettings} />
      )}
      {width <= 768 && (
        <MobileDrawer isOpen={isOpen}>
          <EditToolBox isOpen={isOpen} setIsOpen={setIsOpen} fieldSettings={fieldSettings} onUpdateSettings={onUpdateSettings} />
        </MobileDrawer> 
      )}
    </>
  )
}
