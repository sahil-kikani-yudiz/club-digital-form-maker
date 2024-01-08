'use client'
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { Fragment, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import Toolbar from '../toolbar'
import { showToast } from '@/shared/ui/toaster'
import { attachField, editTheme } from '@/query/form/form.mutation'
import Navbar from '../navbar'
import { getFormById } from '@/query/form/form.quey'
import Loader from '@/shared/ui/loader'
import PreviewPopup from '../previewPopup'
import Canvas from '../canvas'
import { Dialog, Transition } from '@headlessui/react'
import Divider from '@/shared/ui/divider'
import { useI18n } from '@/locales/client'
import FormSkeleton from '@/shared/ui/skeleton'
import { colors } from '@/shared/constants/colors'
import useWindowSize from '@/shared/hooks/windowSize'
import CustomImage from '@/shared/ui/customImage'
import ShareIcon from '@/assets/icons/share-icon.svg'
import PreviewIcon from '@/assets/icons/preview-icon.svg'
import ThemeIcon from '@/assets/icons/theme-icon.svg'
import PlusIcon from '@/assets/icons/plus-icon.svg'
import Link from 'next/link'
import Drawer from '@/shared/ui/drawer'
import MobileDrawer from '@/shared/ui/mobileDrawer'
import Accordion from '@/shared/ui/accordian'
import ToolbarCard from '../toolbar/toolbarCard'

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
  const [fieldSettings, setFieldSettings] = useState<any | undefined>()
  const [fieldData, setFieldData] = useState<FieldData[]>([])
  const [open, setOpen] = useState(false)
  const [isTheme, setIsTheme] = useState(false)
  const [theme, setTheme] = useState()
  const [toolbar, setToolbar] = useState(false)

  const t = useI18n()

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

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['getData', id],
    queryFn: () => getFormById(id),
    onSuccess: (data: any) => {
      console.log(data?.data, 'data')
      setFieldData(data?.data?.data?.aField)
    }
  })

  const mutation = useMutation({
    mutationFn: attachField,
    onSuccess: (data) => {
      const newField = data?.data?.data
      setFieldData((prevFields = []) => [...prevFields, newField])
      console.log(newField, 'newField')
      if (newField?.oField?.eFormFieldType === 'cu') setFieldSettings(newField)
    },
    onError: (error: { message: string }) => {
      showToast('error', error?.message)
    }
  })

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

  function toggleTheme() {
    setIsTheme(!isTheme)
  }

  const themeMutation = useMutation({
    mutationFn: editTheme,
    onSuccess: (data: any) => {
      console.log(data, 'data')
      showToast('success', data?.data?.message)
      setIsTheme(false)
      setTheme(data?.data?.data?.oTheme)
    }
  })

  function handleTheme(gradient: any) {
    const theme = { g1: gradient?.g1, g2: gradient?.g2 }
    const data = { oTheme: theme, sFormId: id }
    // console.log(data, )
    themeMutation.mutate(data)
  }

  const [width] = useWindowSize()

  function ToolListing(data: []) {
    return (
      <>
        {data?.map((field: any, i: number) => {
          return (
            <div onClick={() => addField(field?._id)}>
              <ToolbarCard field={field} key={i} />
            </div>
          )
        })}
      </>
    )
  }

  function addField(fieldId: string) {
    mutation.mutate({ iFieldId: fieldId, sFormId: id })
    setToolbar(false)
  }

  function handleToolbarToggle() {
    setToolbar(!toolbar)
  }

  return (
    <>
      {isLoading && <Loader />}
      <DndContext id='list' sensors={sensors} onDragEnd={onDragEnd} onDragOver={onDragOver} onDragStart={onDragStart}>
        <Navbar data={data?.data?.data} path={'/'} handlePreview={handlePreview} toggleTheme={toggleTheme} refetch={refetch} />
        <div className='flex flex-col md:flex-row h-[calc(100%-184px)] bg-background ' onClick={() => setToolbar(false)}>
          <Transition appear show={isTheme}>
            <Dialog as='div' className='relative z-10' onClose={toggleTheme}>
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
              <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text-center'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                  >
                    <Dialog.Panel className='w-full max-w-[1150px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                      <Dialog.Title as='h3' className='text-lg flex flex-col font-medium leading-6 text-gray-900'>
                        {t('pleaseSelectTheme')}
                      </Dialog.Title>
                      <Divider />
                      <div className='grid md:grid-cols-4 sm:grid-cols-1 justify-center items-center gap-4 mt-4 cursor-pointer '>
                        {colors?.map((gradient, index) => {
                          return (
                            <div
                              key={index}
                              className={`h-[200px] w-[250px] border rounded-lg flex justify-center items-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 `}
                              onClick={() => handleTheme(gradient)}
                              style={{ backgroundImage: `linear-gradient(to right, ${gradient?.g1} , ${gradient?.g2} )` }}
                            >
                              <FormSkeleton />
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
          {width > 768 && <Toolbar toolList={toolList} />}
          <PreviewPopup open={open} handlePreview={handlePreview} fieldData={fieldData} theme={theme} />
          <Canvas
            fieldSettings={fieldSettings}
            setFieldSettings={setFieldSettings}
            id={id}
            data={activeData}
            fieldData={fieldData}
            loading={mutation?.isLoading}
            setFieldData={setFieldData}
          />
        </div>
        {width <= 768 && (
        <MobileDrawer isOpen={toolbar} toggle={handleToolbarToggle} className='p-2'>
          {toolList?.map((item: any, index: number) => {
            return (
              <div key={index}>
                <Accordion title={item?.sName} body={ToolListing(item?.aFields)} defaultAccordion />
              </div>
            )
          })}
        </MobileDrawer>
      )}
      </DndContext>
      {width <= 768 && (
        <div className='bg-background h-[60px] w-full bottom-0 fixed  flex justify-center items-center'>
          <button
            className='border rounded-lg mx-2 p-2 w-fit flex items-center hover:bg-secondary-200 bg-theme'
            onClick={() => setToolbar(true)}
          >
            <CustomImage src={PlusIcon} height={22} width={22} />
            <div className='mx-1'>{t('add')}</div>
          </button>
          <button
            className='border rounded-lg mx-2 p-2 w-fit flex items-center hover:bg-secondary-200 bg-theme'
            onClick={() => toggleTheme()}
          >
            <CustomImage src={ThemeIcon} height={22} width={22} />
            <div className='mx-1'>{t('theme')}</div>
          </button>
          <Link href={`/share/${id}`} className='border rounded-lg mx-2 p-2 w-fit flex items-center hover:bg-secondary-200 bg-theme'>
            <CustomImage src={ShareIcon} height={16} width={16} />
            <div className='mx-1'>{t('share')}</div>
          </Link>

          <button onClick={handlePreview} className='border rounded-lg mx-2 p-2 w-fit flex items-center hover:bg-secondary-200 bg-theme'>
            <CustomImage src={PreviewIcon} height={20} width={20} />
            <div className='mx-1'>{t('preview')}</div>
          </button>
        </div>
      )}
     
      
    </>
  )
}
