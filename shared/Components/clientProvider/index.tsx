'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import Header from '../header'

type clientProviderTypes = {
  children: React.ReactNode
}

export default function ClientProvider({ children }: clientProviderTypes) {
  const pathname = usePathname()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
      {!pathname?.includes('myform') && <Header />}
      {children}
    </QueryClientProvider>
  )
}
