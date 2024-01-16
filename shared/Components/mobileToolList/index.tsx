import ToolbarCard from '../toolbar/toolbarCard'

export default function MobileToolList({ data, addField }: any) {
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
