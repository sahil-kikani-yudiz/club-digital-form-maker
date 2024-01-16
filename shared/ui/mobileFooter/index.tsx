interface FooterTypes {
  children: React.ReactNode
}

export default function MobileFooter({ children }: FooterTypes) {
  return (
    <div className='bg-background dark:bg-dark-100 h-[60px] w-full text-sm bottom-0 fixed  flex justify-center items-center'>
      {children}
    </div>
  )
}
