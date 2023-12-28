import FormForUser from '@/shared/Components/formForUser'

type pageType = {
  params  : {
    id : string
  }
}

export default async function page(props: pageType) {
  return <FormForUser id={props?.params?.id} />
}
