'use client'
import GoogleSignIn from '@/shared/Components/googleButton'
import React from 'react'

// export const metadata = {
//   'google-signin-client_id': '129082485861-54j76vgc3ltheumjqu36m0cp4rvajoha.apps.googleusercontent.com'
// }

// function getGoogleOAuthURL() {
//   const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

//   const options = {
//     redirect_uri: 'http://localhost:3000/',
//     client_id: '454435860226-vlva6pfrt2k7mm19m80c5q2h7fps1dof.apps.googleusercontent.com',
//     access_type: 'offline',
//     response_type: 'code',
//     prompt: 'consent',
//     scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(' ')
//   }

//   const qs = new URLSearchParams(options)
//   console.log(qs, 'qs')

//   return `${rootUrl}?${qs.toString()}`
// }

export default function Page() {
  return (
    <>
      <div className='w-full h-[50%] bg-primary-500 justify-center items-center flex relative'></div>
      <div className='w-full h-[50%] bg-background flex justify-center items-center'>
        <div className='md:w-[500px] w-[350px] h-[200px] mb-[450px] absolute z-20 rounded-lg bg-theme border flex items-center justify-center'>
          <button className='flex p-3 w-[250px] hover:bg-secondary-300  border rounded-lg gap-4 items-center justify-center text-secondary-800' >
            <GoogleSignIn/>
          </button>
        </div>
      </div>
    </>
  )
}
