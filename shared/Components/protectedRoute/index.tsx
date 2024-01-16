'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedRoute = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter()

    useEffect(() => {
      const isAuthenticated = localStorage.getItem('token')
      if (!isAuthenticated) {
        router.push('/')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default ProtectedRoute
