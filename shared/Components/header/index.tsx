import { LogoutIcon, ProfileIcon } from '@/assets/icons'
import CustomImage from '../../ui/customImage'

import { useI18n } from '@/locales/client'
import { useTheme } from 'next-themes'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getProfile } from '@/query/login/query'
import { useState } from 'react'
import { logout } from '@/query/login/mutation'
import { useRouter } from 'next/navigation'

export default function Header() {
  const t = useI18n()
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const { data }: any = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile
  })

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.clear()
      router.push('/')
    }
  })

  return (
    <>
      <div className='w-full h-[70px] bg-theme dark:bg-dark-200 border-b border-theme flex justify-between p-4'>
        <div className='flex m-2'>
          <div className='text-primary-500 mx-1'>{t('club')}</div>
          <div>{t('community')}</div>
        </div>
        <div className='flex items-center dark:text-theme gap-1'>
          <input
            className='mr-2 mt-1 cursor-pointer h-3.5 w-8 appearance-none rounded-2xl bg-secondary-800 before:h-3.5  before:rounded-full after:absolute  after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:bg-secondary-300 after:transition-[transform_0.2s] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:bg-primary-500 dark:bg-theme'
            type='checkbox'
            // {...register('bIsRequired')}
            checked={currentTheme === 'dark'}
            // onChange={toggleButton}
            onChange={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
            role='switch'
          />
          {/* <CustomImage src={ProfileIcon} height={40} width={40} /> */}
          <div className='flex items-center justify-center cursor-pointer' onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <ProfileIcon />
            <div className='m-2'>{data?.data?.data?.sName}</div>
          </div>
          {isOpen && (
            <div
              className='w-fit py-2 px-4 flex items-center justify-center cursor-pointer mr-4 mt-[80px] bg-theme dark:bg-dark-200 rounded-lg absolute z-10 right-0 border dark:border-theme hover:bg-secondary-200 dark:hover:bg-dark-300'
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              onClick={() => mutation.mutate()}
            >
              <LogoutIcon />
              <div>Logout</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
