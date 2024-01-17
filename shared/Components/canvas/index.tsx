import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  MouseSensor,
  TouchSensor,
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
import { s3Url } from '@/shared/constants'

interface settings {
  iFieldId: string
  iUniqueId: string
  nMaxLength: number
  nMinLength: number
  sLabel: string
  sPlaceHolder: string
  bIsRequired: boolean
  aValue: Array<object>
}

interface FieldData {
  oSettings: settings

  _id: string
}

interface PlaygroundType {
  data: {
    sName: string
    sIcon: string
  }
  fieldData: any
  loading: boolean
  setFieldData: Function
  id: string
  fieldSettings: any
  setFieldSettings: Function
  newField?: boolean
}

export default function Canvas({ data, fieldData, loading, setFieldData, setFieldSettings, fieldSettings, id, newField }: PlaygroundType) {
  const t = useI18n()
  const { isOver, setNodeRef } = useDroppable({ id: 'playground-container' })
  const [isOpen, setIsOpen] = useState(false)
  const [width] = useWindowSize()
  const scrollRef = useRef<any>(null)
  const [selectedField, setSelectField] = useState<any>()

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
  const sensors = useSensors(mouseSensor, touchSensor)

  // Update Priority
  const mutation = useMutation({
    mutationFn: updateFieldPriority
  })

  // scroll
  const scrollToButton = () => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth'
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.style.scrollBehavior = 'auto'
        }
      }, 1000)
    }
  }

  useEffect(() => {
    if (loading) {
      if (width > 768) {
        setIsOpen(true)
      }
      setTimeout(() => {
        if (width > 768) {
          scrollToButton()
        } else {
          window.scrollTo(0, document.body.scrollHeight)
        }
      }, 200)
    }
  }, [loading])

  useEffect(() => {
    if (newField) {
      const id = fieldData?.[fieldData?.length - 1]?.oSettings?.iUniqueId
      setSelectField(id)
    }
  }, [newField])

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

  function handleDragEnd(event: DragEndEvent) {
    const active = event.active
    const over = event.over
    if (active?.id !== over?.id) {
      const oldIndex = fieldData.findIndex((f: any) => f.oSettings?.iUniqueId === active?.id)
      const newIndex = fieldData.findIndex((f: any) => f.oSettings?.iUniqueId === over?.id)
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
    const updatedFieldData = fieldData.filter((field: any) => field?.oSettings?.iUniqueId !== id)
    setFieldData(updatedFieldData)
    handleUpdateData(updatedFieldData)
    setIsOpen(false)
  }

  return (
    <>
      {loading && <Loader />}
      <div className='flex-1 flex  relative justify-center items-center' ref={setNodeRef}>
        <div
          className={`h-full border relative rounded-lg w-full bg-theme dark:bg-dark-200  dark:border-dark-200 overflow-y-auto sm:p-2 pb-16 mx-4 md:mx-0`}
          ref={scrollRef}
        >
          {fieldData?.length > 0 ? (
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
              <SortableContext items={fieldData?.map((field: any) => field?.oSettings?.iUniqueId)} strategy={verticalListSortingStrategy}>
                {fieldData?.map((field: any, i: number) => (
                  <div
                    key={field?.oSettings?.iUniqueId}
                    className={`${i === fieldData?.length - 1 && newField ? 'animate-pulse' : ''}`}
                    onClick={() => setSelectField(field?.oSettings?.iUniqueId)}
                  >
                    <FieldListing field={field} onFieldEdit={onFieldEdit} onFieldDelete={onFieldDelete} selectedField={selectedField} />
                  </div>
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            <div className='border-2 border-dashed rounded-lg m-2 p-4 flex items-center justify-center flex-col'>
              <CustomImage src={ArrowIcon} height={40} width={40} />
              
              <div className='text-secondary-500 mt-2'>{ width > 768 ? t('dragItems') : 'Add Fields'}</div>
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
                className={`h-12 w-[250px] border rounded-lg bg-theme dark:bg-dark-300 dark:border-dark-300 mb-1 p-2 cursor-move gap-2 flex items-center`}
              >
                <div className='dark:invert dark:filter'>
                  <CustomImage src={s3Url + data?.sIcon} height={20} width={20} />
                </div>
                <div className='text-center'>{data?.sName}</div>
              </div>
            </div>
          </DragOverlay>
        </div>

        {isOver && (
          <div className='absolute top-0 left-0 w-full h-full bg-secondary-400 dark:bg-dark-100  opacity-30 flex justify-center items-center'>
            <div className='text-secondary-900 dark:text-secondary-200 text-3xl '>{t('addNewField')}</div>
          </div>
        )}
      </div>

      {/* Editor */}
      {width > 768 && (
        <EditToolBox isOpen={isOpen} setIsOpen={setIsOpen} fieldSettings={fieldSettings} onUpdateSettings={onUpdateSettings} />
      )}

      {/* Mobile Editor */}
      {width <= 768 && (
        <MobileDrawer isOpen={isOpen}>
          <EditToolBox isOpen={isOpen} setIsOpen={setIsOpen} fieldSettings={fieldSettings} onUpdateSettings={onUpdateSettings} />
        </MobileDrawer>
      )}
    </>
  )
}
