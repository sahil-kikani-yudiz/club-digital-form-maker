'use client'



type RootLayoutProps = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: RootLayoutProps) {
  return (
    <div className='h-full w-full'>
      {children}
    </div>
  )
}
