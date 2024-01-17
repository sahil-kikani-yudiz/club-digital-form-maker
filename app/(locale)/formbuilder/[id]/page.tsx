import { getToolList } from '@/query/toolbar/toolbar.query'
import FormEditor from '@/shared/Components/formEditor'

interface pageTypes {
  params: {
    id: string
  }
}

interface toolListTypes {
  data: {
    data: {
      aResults: Array<object>
    }
  }
}

async function fetchData() {
  const toolList = await getToolList()
  return toolList
}

export default async function Page(props: pageTypes) {
  const toolList: toolListTypes = await fetchData()

  return <FormEditor id={props?.params?.id} toolList={toolList?.data?.data?.aResults} />
}
