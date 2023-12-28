'use client'
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import Toolbar from '../toolbar'
import { showToast } from '@/shared/ui/toaster'
import { attachField } from '@/query/form/form.mutation'
import Navbar from '../navbar'
import { getFormById } from '@/query/form/form.quey'
import Loader from '@/shared/ui/loader'
import PreviewPopup from '../previewPopup'
import Canvas from '../canvas'

type formEditorType = {
  id: string
  toolList: Array<object>
}

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


export function FormEditor({ id, toolList }: formEditorType) {
  const [activeData, setActiveData] = useState<any | null>()
  const [fieldData, setFieldData] = useState<FieldData[]>([])
  const [formData, setFormData] = useState<any>([])
  const [open, setOpen] = useState(false)

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

  const fetchData = async () => {
    const { data } = await getFormById(id)
    setFieldData(data?.data?.aField)
    setFormData(data?.data)
  }

  const mutation = useMutation({
    mutationFn: attachField,
    onSuccess: (data) => {
      const newField = data?.data?.data
      setFieldData((prevFields = []) => [...prevFields, newField])
      // showToast('success', data?.data?.message)
    },
    onError: (error: { message: string }) => {
      showToast('error', error?.message)
    }
  })

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [])

  function onDragStart(event: DragStartEvent) {
    setActiveData(event.active.data.current)
  }

  function onDragEnd(event: DragEndEvent) {
    const overContainerId = event.over?.id

    if (overContainerId === 'playground-container') {
      const fieldId = event.active.id
      mutation.mutate({ iFieldId: fieldId, sFormId: id })
    }
  }

  function onDragOver(event: DragOverEvent) {
    // setActiveData(event.active.data.current)
  }

  function handlePreview() {
    setOpen(!open)
  }

  return (
    <>
      <DndContext id='list' sensors={sensors} onDragEnd={onDragEnd} onDragOver={onDragOver} onDragStart={onDragStart}>
        <Navbar data={formData} path={'/'} handlePreview={handlePreview} />
        <div className='flex flex-col md:flex-row h-[calc(100%-184px)] bg-background'>
          {/* {isLoading && <Loader />} */}
          <Toolbar toolList={toolList} />
          <PreviewPopup open={open} handlePreview={handlePreview} fieldData={fieldData} />
          <Canvas id={id} data={activeData} fieldData={fieldData} loading={mutation?.isLoading} setFieldData={setFieldData} />
        </div>
      </DndContext>
    </>
  )
}
