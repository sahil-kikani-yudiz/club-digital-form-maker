'use client'
import { googleLogin } from '@/query/login/mutation'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

declare global {
  interface Window {
    gapi: any
  }
}

export default function GoogleSignIn({ ...props }) {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: googleLogin,
    onSuccess: (data: any) => {
      localStorage.setItem('token', data?.data?.data?.sToken)
      router.push('/dashboard')
    }
  })

  function setupGoogleLogin() {
    const { google } = window
    if (google) {
      console.log(google.accounts)
      google.accounts.id.initialize({
        client_id: '129082485861-54j76vgc3ltheumjqu36m0cp4rvajoha.apps.googleusercontent.com',
        callback: async (response) => {
          mutation.mutate({ sSocialToken : response?.credential , sSocialType : 'G' })
        }
      })
      google.accounts.id.renderButton(document.getElementById('google-sign-btn'), {
        shape: 'rectangular',
        theme: 'filled_blue'
      })
    }
  }

  useEffect(() => {
    if (window?.google) {
      setupGoogleLogin()
    } else {
      const url = 'https://accounts.google.com/gsi/client'
      const script = document.createElement('script')
      script.src = url
      script.async = true
      // script.setAttribute('strategy', 'lazyOnload')
      document.head.appendChild(script)
      script.onload = () => {
        setupGoogleLogin()
      }
    }
  }, [])
  return <div id='google-sign-btn' {...props}></div>
}
