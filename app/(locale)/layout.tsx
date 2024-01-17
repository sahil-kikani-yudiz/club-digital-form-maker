import Header from '@/shared/Components/header'
import './globals.css'
import { ToastContainer } from 'react-toastify'

import IntlProviderClient from '@/shared/Components/intl-provider'
import ClientProvider from '@/shared/Components/clientProvider'

export const revalidate = 0
export const dynamic = 'force-dynamic'

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' className='w-full h-full'>
      <body className='bg-background dark:bg-dark-100'>
        <IntlProviderClient>
          <ClientProvider>
            <ToastContainer />
            {children}
          </ClientProvider>
        </IntlProviderClient>
      </body>
    </html>
  )
}
