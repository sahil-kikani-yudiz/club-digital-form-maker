'use client'
import { ReactNode } from 'react'

type DrawerTypes = {
    children: ReactNode,
    isOpen: boolean
    className?: string
}

export default function Drawer({ children, isOpen, className }: DrawerTypes) {
  return( 
    <div className={`md:w-1/4  ${isOpen ? 'flex' : 'invisible'} flex-col max-w-[337px] h-full right-0 relative gap-2 bg-theme dark:bg-dark-200 overflow-y-auto  transition-transform  duration-4000 mx-4  ${className}`}>
    {children}
  </div>
  )
}

