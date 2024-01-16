'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import Header from '../header'
import { ThemeProvider } from 'next-themes'

type clientProviderTypes = {
  children: React.ReactNode
}

export default function ClientProvider({ children }: clientProviderTypes) {
  const pathname = usePathname()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <ThemeProvider attribute='class'>
      <QueryClientProvider client={queryClient}>
        {!pathname?.includes('myform') && pathname !== '/'  && <Header />}
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  )
}
