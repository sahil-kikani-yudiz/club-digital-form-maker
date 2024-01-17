'use client'
import { useI18n } from '@/locales/client'
import { login } from '@/query/login/mutation'

import AuthSidebar from '@/shared/ui/authSidebar'
import CommonInput from '@/shared/ui/commonInput'
import { showToast } from '@/shared/ui/toaster'
import { encryption } from '@/shared/utils'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const t = useI18n()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      if (data?.data?.data) {
        localStorage.setItem('token', data?.data?.data?.sToken)
        router.push('/dashboard')
      }
    },
    onError: (error: any) => {
      showToast('error' , error?.message)
    }
  })

  function onSubmit(data: any) {
    const password = encryption(data?.sPassword)
    mutation.mutate({ sEmail: data?.sEmail, sPassword: password })
  }
  return (
    <div className='flex h-full w-full bg-theme dark:bg-dark-100'>
      <AuthSidebar labels={['Welcome back! It’s Great', 'to see you again']} />
      <div className='w-full h-full flex flex-col justify-center items-center text-left'>
        <div className='md:w-[562px] w-full h-fit p-4 '>
          <CommonInput
            register={register}
            placeholder='Enter Your Email'
            label='Email Address'
            name='sEmail'
            className='mb-2 p-3'
            type='email'
            errors={errors}
            required
          />
          <CommonInput
            register={register}
            placeholder='Enter Password'
            label='Password'
            name='sPassword'
            className='mb-2 p-3'
            type='password'
            errors={errors}
            required
          />
          <button className='w-full bg-primary-500  rounded-lg text-theme p-4 text-xl mt-4' onClick={handleSubmit(onSubmit)}>
            {t('login')}
          </button>
          {/* <div className='border rounded-lg p-4 mt-6 flex items-center justify-center'>
            <span>{t('dontHaveAccount')}</span>
            <Link href={'/auth/signup'} className='text-primary-500 mx-2'>
              {t('signUp')}
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}
