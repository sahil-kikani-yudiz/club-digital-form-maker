export default function FormLoader() {
  return (
    <div className='animate-pulse flex flex-col items-center relative gap-4 w-full'>
      <div>
        <div className='w-full h-6 bg-secondary-300 rounded-md'></div>
        <div className='w-48 h-4 bg-secondary-300 mx-auto mt-3 rounded-md'></div>
        <div className='w-50 h-4 bg-secondary-300 mx-auto mt-3 rounded-md'></div>
      </div>
      <div className='h-10 bg-secondary-300 w-full rounded-md'></div>
      <div className='h-10 bg-secondary-300 w-full rounded-md'></div>
      <div className='h-10 bg-secondary-300 w-full rounded-md'></div>
      <div className='h-10 bg-secondary-300 w-full rounded-md'></div>
      <div className='h-10 bg-secondary-300 w-full rounded-md'></div>
      <div className='h-10 bg-secondary-300 w-1/2 rounded-md'></div>
    </div>
  )
}
