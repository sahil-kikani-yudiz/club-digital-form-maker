import CustomImage from '@/shared/ui/customImage'
import profile from '@/assets/icons/profile-icon.svg'
import Info from '@/assets/icons/info-icon.svg'
import { useDraggable } from '@dnd-kit/core'
import Tooltip from '@/shared/ui/tooltip'
import { s3Url } from '@/shared/constants'

type ToolbarCardOptions = {
  field?: {
    _id: string
    sName: string
    value: string
    sIcon: string
  }
  onDragStart?: () => void
}

export default function ToolbarCard({ field }: ToolbarCardOptions) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: field?._id ?? 'default-id',
    data: field
  })

  return (
    <>
      <div className='px-1 ' ref={setNodeRef} {...attributes} {...listeners}>
        <div
          className={`h-12 border rounded-lg bg-theme dark:bg-dark-300 dark:border-dark-300  mb-1 p-2 cursor-pointer md:cursor-move gap-2 flex items-center  
        justify-between`}
        >
          <div className='flex gap-2 '>
            <div className='dark:filter dark:invert'>
              <CustomImage src={`${s3Url + field?.sIcon}`} height={20} width={20} />
            </div>
            <div className='text-center'>{field?.sName}</div>
          </div>
          {/* 
          <Tooltip content={'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}>
            <div className='cursor-pointer dark:filter dark:invert' data-tooltip-target='tooltip-default'>
              <CustomImage src={Info} height={22} width={22} />
            </div>
          </Tooltip> */}
        </div>
      </div>
    </>
  )
}
