import ReportPage from '@/shared/Components/reportPage'

type pageType = {
    params: {
      id: string
    }
  }

export default function Report(props: pageType) {
  return <ReportPage id={props?.params?.id}/>
}
