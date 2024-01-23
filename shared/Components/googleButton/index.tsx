'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    gapi: any
  }
}

export default function GoogleSignIn({ ...props }) {
  function setupGoogleLogin() {
    const { google } = window
    if (google) {
      console.log(google.accounts)
      // google.accounts.id.initialize({
      //   client_id: '454435860226-vlva6pfrt2k7mm19m80c5q2h7fps1dof.apps.googleusercontent.com',
      //   callback: async (response) => console.log(response)
      // })
      // google.accounts.id.renderButton(document.getElementById('google-sign-btn'), {
      //   shape: 'rectangular',
      //   theme: 'filled_blue'
      // })
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
        // setupGoogleLogin()
      }
    }
  }, [])

  return (
    <>
    <div id="g_id_onload"
     data-client_id="129082485861-54j76vgc3ltheumjqu36m0cp4rvajoha.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-callback="(response) => console.log(response)"
     data-auto_prompt="false">
</div>

<div className="g_id_signin"
     data-type="standard"
     data-shape="rectangular"
     data-theme="outline"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left">
</div>
    </>
  )
}
