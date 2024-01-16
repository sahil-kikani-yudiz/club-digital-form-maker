import { Popover } from '@headlessui/react'


type popoverTypes = {
    children: React.ReactNode
    title: string
  }

export default function MyPopover({ children, title } : popoverTypes) {
  return (
    <Popover className='relative'>
      <Popover.Button>{title}</Popover.Button>

      <Popover.Panel className='absolute z-10 mr-[120px]'>
       {children}
      </Popover.Panel>
    </Popover>
  )
}
