'use client'
import { ReactNode } from 'react'

type DrawerTypes = {
  children: ReactNode
  isOpen: boolean
  toggle?: Function
  className?: string
}

export default function MobileDrawer({ children, isOpen, toggle, className }: DrawerTypes) {
  return (
    <div
      className={`fixed inset-y-0 right-0 max-w-xs w-full bg-theme shadow-lg transform transition-transform ease-in-out duration-300 dark:bg-dark-200 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className={className}>
        {toggle && (
          <div
            className='flex justify-start p-[6px] cursor-pointer bg-red-500 rounded-lg w-fit px-3 items-center text-theme'
            onClick={() => toggle()}
          >
            X
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
