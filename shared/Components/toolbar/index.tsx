import Accordion from '@/shared/ui/accordian'
import ToolbarCard from './toolbarCard'
import { useState } from 'react'
import PopUp from '@/shared/ui/popup'
import Stepper from '../progressStepper'

export default function Toolbar({ toolList }: any) {
  const [ isCustomField, setIsCustomField ] = useState(false)
  const onDragStart = () => {}

  function ToolListing(data: []) {
    return (
      <>
        {data?.map((field: any, i: number) => {
          return <ToolbarCard field={field} key={i} onDragStart={onDragStart} />
        })}
      </>
    )
  }

  return (
    <>
    <PopUp show={isCustomField} onClose={() => setIsCustomField(false)} title='addYourCustomField' maxWidth='500' >
      <div className='w-full justify-center flex items-center mt-4'>
      <div className='w-[450px]'>
      <Stepper/>
      </div>
      </div>
      </PopUp>
    <aside className='lg:w-[337px] md:w-[200px] w-full flex flex-col max-w-[337px] mx-4 border rounded-lg bg-theme dark:bg-dark-200 dark:border-dark-200 overflow-y-auto border-r p-2'>
      {toolList?.map((item: any, index: number) => {
        return (
          <div key={index}>
            {item?.sName === 'Dynamic Fields' && (
              <div className='w-full flex justify-center items-center '>
                <button className='dark:bg-dark-100 bg-primary-500 text-theme hover:dark:bg-dark-400  px-4 py-2 rounded-lg' onClick={() => setIsCustomField(true)}>Add Your Field</button>
              </div>
            )}
            <Accordion title={item?.sName} body={ToolListing(item?.aFields)} defaultAccordion />
          </div>
        )
      })}
    </aside>
    </>
  )
}
