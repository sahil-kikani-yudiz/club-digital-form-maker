import Accordion from '@/shared/ui/accordian'
import ToolbarCard from './toolbarCard'

export default function Toolbar({ toolList }: any) {
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
    <aside className='lg:w-[337px] md:w-[200px] w-full flex flex-col max-w-[337px] mx-4 border rounded-lg bg-theme dark:bg-dark-200 dark:border-dark-200 overflow-y-auto border-r p-2'>
      {toolList?.map((item: any, index: number) => {
        return (
          <div key={index}>
            <Accordion title={item?.sName} body={ToolListing(item?.aFields)} defaultAccordion />
          </div>
        )
      })}
    </aside>
  )
}
