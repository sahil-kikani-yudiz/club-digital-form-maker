'use client'
import { DndContext, DragEndEvent, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { attachField, editTheme } from '@/query/form/form.mutation'
import { getFormById } from '@/query/form/form.quey'

import { showToast } from '@/shared/ui/toaster'
import Loader from '@/shared/ui/loader'
import FormSkeleton from '@/shared/ui/skeleton'
import MobileDrawer from '@/shared/ui/mobileDrawer'
import Accordion from '@/shared/ui/accordian'

import { colors } from '@/shared/constants/colors'
import useWindowSize from '@/shared/hooks/windowSize'

import Toolbar from '../toolbar'
import Navbar from '../navbar'
import Canvas from '../canvas'
import PreviewPopup from '../previewPopup'
import PopUp from '@/shared/ui/popup'
import MobileToolList from '../mobileToolList'
import ProtectedRoute from '../protectedRoute'
import EditorFooter from '../editorFooter'
import ProgressStepper from '../progressStepper'

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

function FormEditor({ id, toolList }: formEditorType) {
  const [activeData, setActiveData] = useState<any | null>()
  const [fieldSettings, setFieldSettings] = useState<any | undefined>()
  const [fieldData, setFieldData] = useState<FieldData[]>([])
  const [open, setOpen] = useState(false)
  const [isTheme, setIsTheme] = useState(false)
  const [theme, setTheme] = useState()
  const [toolbar, setToolbar] = useState(false)
  const [newField, setNewField] = useState(false)
  const [width] = useWindowSize()

  // Sensors
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

  // Get Form Data
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['getData', id],
    queryFn: () => getFormById(id),
    onSuccess: (data: any) => {
      setFieldData(data?.data?.data?.aField)
      setTheme(data?.data?.data?.oTheme)
    }
  })

  // Attach Field
  const mutation = useMutation({
    mutationFn: attachField,
    onSuccess: (data) => {
      const newField = data?.data?.data
      setFieldData((prevFields = []) => [...prevFields, newField])
      setFieldSettings(newField)
      setNewField(true)
      setTimeout(() => {
        setNewField(false)
      }, 100)
    },
    onError: (error: { message: string }) => {
      showToast('error', error?.message)
    }
  })

  // Change Theme
  const themeMutation = useMutation({
    mutationFn: editTheme,
    onSuccess: (data: any) => {
      showToast('success', data?.data?.message)
      setIsTheme(false)
      setTheme(data?.data?.data?.oTheme)
    }
  })

  // Drag start
  function onDragStart(event: DragStartEvent) {
    setActiveData(event.active.data.current)
  }

  // Drag end
  function onDragEnd(event: DragEndEvent) {
    const overContainerId = event.over?.id

    if (overContainerId === 'playground-container') {
      const fieldId = event.active.id
      if (
        fieldData?.length > 0 &&
        fieldData?.some((field: any) => field?.oSettings?.iFieldId === fieldId && field?.oField?.eFormFieldType === 'dm')
      ) {
        showToast('error', 'Field Already Exists')
      } else {
        mutation.mutate({ iFieldId: fieldId, sFormId: id })
        setToolbar(false)
      }
    }
  }

  function handlePreview() {
    setOpen(!open)
  }

  function toggleTheme() {
    setIsTheme(!isTheme)
  }

  function handleTheme(gradient: any) {
    const theme = { g1: gradient?.g1, g2: gradient?.g2, sHColor: gradient?.sHColor }
    const data = { oTheme: theme, sFormId: id }
    themeMutation.mutate(data)
  }

  function addField(fieldId: string) {
    if (
      fieldData?.length > 0 &&
      fieldData?.some((field: any) => field?.oSettings?.iFieldId === fieldId && field?.oField?.eFormFieldType === 'dm')
    ) {
      showToast('error', 'Field Already Exists')
    } else {
      mutation.mutate({ iFieldId: fieldId, sFormId: id })
      setToolbar(false)
    }
  }

  function handleToolbarToggle() {
    setToolbar(!toolbar)
  }

  return (
    <>
      {isLoading && <Loader />}
      <DndContext id='list' sensors={sensors} onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Navbar data={data?.data?.data} path={'/dashboard'} handlePreview={handlePreview} toggleTheme={toggleTheme} refetch={refetch} />
        <div className='flex flex-col md:flex-row h-[calc(100%-184px)]' onClick={() => setToolbar(false)}>
          {width > 768 && <Toolbar toolList={toolList} />}

          <Canvas
            fieldSettings={fieldSettings}
            setFieldSettings={setFieldSettings}
            id={id}
            data={activeData}
            fieldData={fieldData}
            loading={mutation?.isLoading}
            setFieldData={setFieldData}
            newField={newField}
          />
        </div>

        {/* mobile tool drawer */}
        {width <= 768 && (
          <MobileDrawer isOpen={toolbar} toggle={handleToolbarToggle} className='p-2 h-[calc(100%-60px)]'>
            {toolList?.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <Accordion title={item?.sName} body={<MobileToolList data={item?.aFields} addField={addField} />} defaultAccordion />
                </div>
              )
            })}
          </MobileDrawer>
        )}
      </DndContext>

      {/* mobile Footer */}
      {width <= 768 && <EditorFooter id={id} setToolbar={() => setToolbar(true)} toggleTheme={toggleTheme} handlePreview={handlePreview} />}

      {/* theme Popup */}
      <PopUp show={isTheme} onClose={() => setIsTheme(false)} title='pleaseSelectTheme' maxWidth='1150'>
        <div className='grid md:grid-cols-4 sm:grid-cols-1 justify-center items-center gap-4 mt-4 cursor-pointer '>
          {colors?.map((gradient, index) => {
            return (
              <div
                key={index}
                className={`h-[200px] w-[250px]  rounded-lg flex justify-center items-center transition ease-in-out delay-150  hover:-translate-y-1  hover:scale-110 duration-300 `}
                onClick={() => handleTheme(gradient)}
                style={{ backgroundImage: `linear-gradient(to right, ${gradient?.g1} , ${gradient?.g2} )` }}
              >
                <FormSkeleton />
              </div>
            )
          })}
        </div>
      </PopUp>

      {/* Preview Popup */}
      <PreviewPopup open={open} handlePreview={handlePreview} fieldData={fieldData} theme={theme} />
    </>
  )
}

export default ProtectedRoute(FormEditor)
