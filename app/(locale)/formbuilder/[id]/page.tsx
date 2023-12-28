import { getFormById } from '@/query/form/form.quey'
import { getToolList } from '@/query/toolbar/toolbar.query'
import { FormEditor } from '@/shared/Components/formEdior'

type pageTypes = {
  params: {
    id: string
  }
}

type toolListTypes = {
  data: {
    data: Array<object>
  }
}

async function fetchData() {
  const toolList = await getToolList()

  return toolList
}

export default async function Page(props: pageTypes) {
  const toolList: toolListTypes = await fetchData()

  return (
    <>
      <FormEditor id={props?.params?.id} toolList={toolList?.data?.data} />
    </>
  )
}
