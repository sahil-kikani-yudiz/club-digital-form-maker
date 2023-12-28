'use client'
import Header from '@/shared/Components/header'
import './globals.css'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { usePathname } from 'next/navigation'
import IntlProviderClient from '@/shared/Components/intl-provider'

export const revalidate = 0
export const dynamic = 'force-dynamic'

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname()

  const queryClient = new QueryClient()

  return (
    <html lang='en' className='w-full h-full'>
      <body>
        <IntlProviderClient>
          <QueryClientProvider client={queryClient}>
            <ToastContainer />
            {!pathname?.includes('myform') && <Header />}
            {children}
          </QueryClientProvider>
        </IntlProviderClient>
      </body>
    </html>
  )
}
