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
import SvgComponent from '../homePageSvg'
import useWindowSize from '@/shared/hooks/windowSize'
import { useEffect } from 'react'
import Svg2 from '../homePageSvg/svg2'
import Svg3 from '../homePageSvg/svg3'
import Svg4 from '../homePageSvg/svg4'
import Svg5 from '../homePageSvg/svg5'
import Divider from '@/shared/ui/divider'
import CustomImage from '@/shared/ui/customImage'
import { YudizIcon } from '@/assets/icons'

export default function LoginPage() {
  const t = useI18n()
  const router = useRouter()
  const [width] = useWindowSize()
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
      showToast('error', error?.message)
    }
  })

  function onSubmit(data: any) {
    const password = encryption(data?.sPassword)
    mutation.mutate({ sEmail: data?.sEmail, sPassword: password })
  }
  return (
    <>
      {/* <div className='flex h-full w-full bg-theme dark:bg-dark-100'>
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
          <div className='border rounded-lg p-4 mt-6 flex items-center justify-center'>
            <span>{t('dontHaveAccount')}</span>
            <Link href={'/auth/signup'} className='text-primary-500 mx-2'>
              {t('signUp')}
            </Link>
          </div>
        </div>
      </div>
    </div> */}
      <div className='w-full h-full'>
        <div className='w-full bg-theme flex justify-between p-2 items-center '>
          <div className='flex m-2 text-2xl '>
            <div className='text-primary-500 text-3xl mx-4'>Formiiz</div>
            {/* <div className='text-secondary-900'>{t('community')}</div> */}
          </div>
          <div className='flex text-secondary-600 text-xl cursor-pointer mx-4   '>
            <button className='w-fit px-4 py-2 bg-primary-500 text-theme rounded-lg mt-4'>Login</button>
          </div>
        </div>

        <div className='w-full h-[550px] flex justify-between bg-theme p-4 relative'>
          {width > 1068 && (
            <div className='overflow-hidden w-full justify-center items-center lg:pl-[200px]'>
              <SvgComponent />
            </div>
          )}

          <div className='overflow-hidden flex flex-col w-full justify-center items-start'>
            <div className=' text-secondary-900 text-4xl'>Effortlessly craft polished online forms, </div>
            <div className=' text-secondary-900 text-4xl'>surveys, and streamlined workflows!</div>
            <button onClick={() => router.push('/login')} className='w-fit px-6 py-3 bg-primary-500 text-theme rounded-lg mt-4'>Free Trial</button>
          </div>
        </div>

        <div className='w-full h-[550px] grid sm:grid-cols-1 lg:grid-cols-2 justify-between bg-dark-100 p-4 relative lg:pl-[200px]'>
          <div className='overflow-hidden flex flex-col w-full justify-center lg:items-start items-center'>
            <div className=' lg:text-3xl mb-2'>Create Form</div>
            <div className=' text-secondary-400  lg:text-2xl lg:w-[80%] lg:text-left text-center'>
              Leverage our user-friendly drag & drop form builder for seamless creation of personalized online forms and surveys.you can
              effortlessly create registrations, customer surveys, order forms, lead forms, and much more. Streamline your data collection
              process with style and simplicity!
            </div>
          </div>

          <div className='overflow-hidden w-full justify-center items-center '>
            <Svg2 />
          </div>
        </div>

        <div className='w-full h-[550px] grid sm:grid-cols-1 lg:grid-cols-2 justify-between bg-theme p-4 relative'>
          <div className='overflow-hidden w-full justify-center items-center lg:pl-[200px]'>
            <Svg3 />
          </div>

          <div className='overflow-hidden flex flex-col w-full justify-center items-start'>
            <div className=' text-secondary-800'>
              <div className='overflow-hidden flex flex-col w-full justify-center lg:items-start items-center'>
                <div className='lg:text-3xl text-secondary-700 mb-2'>Share Form</div>
                <div className=' text-secondary-500  lg:text-2xl lg:w-[80%] lg:text-left text-center'>
                  Generate a secure link or seamlessly embed your form into any page on your website. Our forms are automatically optimized
                  for all device types, ensuring a seamless experience on desktops, tablets, and phones. Let us take care of hosting your
                  form and processing your results, providing you with a hassle-free solution for effective data collection. Share, embed,
                  and simplify your form-sharing process with ease.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full h-[650px] grid sm:grid-cols-1 lg:grid-cols-2 justify-between bg-dark-100 p-4 relative lg:pl-[200px]'>
          <div className='overflow-hidden flex flex-col w-full justify-center lg:items-start items-center'>
            <div className='lg:text-3xl mb-2'>Generate Report</div>
            <div className=' text-secondary-400  lg:text-2xl lg:w-[80%] lg:text-left text-center'>
              Experience seamless data export with our reporting feature. Effortlessly generate detailed reports in both CSV and Excel
              formats, providing you with versatile options for data analysis and sharing. Download your form data with a click and delve
              into the insights using your preferred spreadsheet software. Whether you need to perform in-depth analysis, share information
              with your team, or integrate data into other systems, our CSV and Excel export capabilities ensure flexibility and efficiency.
              Simplify your reporting process – get your data in the format you need effortlessly!
            </div>
          </div>

          <div className='overflow-hidden w-full justify-center items-center '>
            <Svg4 />
          </div>
        </div>

        <div className='w-full h-[680px] grid sm:grid-cols-1 lg:grid-cols-2 justify-between bg-theme p-4 relative'>
          <div className='overflow-hidden w-full justify-center items-center lg:pl-[160px] '>
            <Svg5 />
          </div>

          <div className='overflow-hidden flex flex-col w-full justify-center items-start'>
            <div className=' text-secondary-800'>
              <div className='overflow-hidden flex flex-col w-full justify-center lg:items-start items-center'>
                <div className='lg:text-3xl text-secondary-700 mb-2'>What makes us unique?</div>
                <div className=' text-secondary-500  lg:text-2xl lg:w-[80%] lg:text-left text-center'>
                  Our System stands out for its unique feature of creating forms that adapt to how users fill them out. Imagine entering
                  certain information once, and our system automatically uses it in other forms, saving you time and effort. With an
                  easy-to-use interface, you can design forms effortlessly by dragging and dropping fields. This powerful combination of
                  adaptability and a user-friendly design makes our system exceptional. It provides you with a robust tool to create forms
                  that are not only dynamic but also straightforward to use, ensuring a streamlined and efficient form-filling experience.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full h-full bg-dark-100 '>
          <div className='w-full justify-center items-center text-3xl text-center mt-3'>Features and Pricing</div>
          <div className='grid lg:grid-cols-3 grid-col-1 gap-4 lg:px-[250px] py-10 px-10 justify-center items-center'>
            {planData?.map((plan) => {
              return (
                <div className='w-full lg:min-w-[450px] min-w-[300px] h-[600px] bg-dark-200 rounded-lg m-2'>
                  <div
                    className={`w-full h-[80px] rounded-t-lg bg-${plan?.color} text-theme text-3xl text-center flex items-center justify-center`}
                  >
                    {plan?.pName}
                  </div>

                  <div className='h-[150px] w-full flex flex-col justify-center items-center'>
                    <div className='text-2xl'> {plan?.price}</div>
                    <div className='text-lg text-gray-300 mt-2'> {plan?.priceTag}</div>
                  </div>
                  <Divider />

                  <div className='h-[100px] w-full flex flex-col justify-center items-center'>
                    <div className='text-2xl'> {plan?.nForm}</div>
                    <div className='text-lg text-gray-300'> Form Limit</div>
                  </div>
                  <Divider />

                  <div className='h-[100px] w-full flex flex-col justify-center items-center'>
                    <div className='text-2xl'> {plan?.sLimit}</div>
                    <div className='text-lg text-gray-300'> Monthly Submissions</div>
                  </div>
                  <Divider />

                  <div className='h-[100px] w-full flex flex-col justify-center items-center'>
                    <div className='text-2xl'> 1 User</div>
                    <div className='text-lg text-gray-300'>per Team</div>
                  </div>
                  <Divider />

                  <div className='w-full h-[60px] rounded-b-lg bg-dark-400 flex justify-center items-center text-lg cursor-pointer'>
                    Contact Sales
                  </div>
                </div>
              )
            })}
          </div>

          <div className='w-full h-fit bg-dark-200 lg:flex  justify-between items-center p-6'>
            <div className='w-[500px] px-8'>
              <YudizIcon />

              {width > 768 && (
                <div className='text-left'>
                  Yudiz: Crafting futuristic solutions via state-of-the-art-technology. A global scale pioneer panning out stellar yet
                  cost-efficient solutions. From Blockchain Apps, Mobile games, & beyond. Unleash future of games with Yudiz Game Studio!
                </div>
              )}
            </div>

            <div className='flex justify-start flex-col items-start text-xl gap-1'>
              <div>Email : contact@yudiz.com</div>
              <div>Call For Sales: +91 7433977525</div>
              <div>Call For HR: +91 7874400606</div>
              <div>Skype: yudizsolutions</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const planData = [
  {
    color: 'primary-400',
    pName: 'starter',
    price: 'Free',
    priceTag: '*All Features Included',
    nForm: 5,
    sLimit: 100,
    space: '100 mb',
    formViews: 1000
  },
  {
    color: 'orange-700',
    pName: 'Standard',
    price: '$6 per month',
    priceTag: 'Billed annually',
    nForm: 25,
    sLimit: 1000,
    space: '1 gb',
    formViews: 1000
  },
  {
    color: 'violet-500',
    pName: 'Enterprise',
    price: '-',
    priceTag: 'Billed annually',
    nForm: 'Unlimited',
    space: 'Unlimited',
    sLimit: 'Unlimited',
    formViews: 'Unlimited'
  }
]
