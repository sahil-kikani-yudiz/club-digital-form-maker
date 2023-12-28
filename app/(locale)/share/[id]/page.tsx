import FormSharePage from '@/shared/Components/FormShare'

type pageType = {
  params: {
    id: string
  }
}

export default function Share(props: pageType) {
  return <FormSharePage id={props?.params?.id} />
}
