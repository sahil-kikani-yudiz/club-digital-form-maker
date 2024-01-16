import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Divider from '../divider'
import { useI18n } from '@/locales/client'

interface PopupTypes {
  show: boolean
  onClose: any
  children: React.ReactNode
  title?: string
  maxWidth?: string
  style?: any
  handleScroll?: any | undefined
}

export default function PopUp({ show, onClose, children, title, maxWidth, style, handleScroll}: PopupTypes) {
  const t = useI18n()
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
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
        <div className='fixed inset-0 overflow-y-auto' onScroll={handleScroll} >
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
              <Dialog.Panel
                className={`w-full ${
                  maxWidth ? `max-w-[${maxWidth}px]` : ''
                } transform overflow-hidden rounded-2xl bg-theme dark:bg-gray-700   p-6 text-left align-middle shadow-xl transition-all`}
                style={style}
              >
                <div className='flex w-full justify-between items-center mb-2'>
                <Dialog.Title as='h3' className='text-lg flex flex-col font-medium leading-6 dark:text-theme text-gray-900'>
                  {title ? t(`${title}`) : ''}
                </Dialog.Title>
                <div className='cursor-pointer bg-red-600 dark:bg-red-800 rounded-lg p-1 w-8 h-8 text-center text-theme' onClick={onClose}>X</div>
                </div> 
                <Divider/>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
