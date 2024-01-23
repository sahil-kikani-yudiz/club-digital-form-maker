'use client'
import Link from 'next/link'
import CustomButton from '../../ui/customButton'
import CustomImage from '../../ui/customImage'
import CustomLink from '../../ui/customLink'

import Divider from '../../ui/divider'

import QrCode from '@/assets/images/qrcode.jpg'
import DownloadIcon from '@/assets/icons/download-icon.svg'
import { useRef } from 'react'
import { showToast } from '../../ui/toaster'
import { useQRCode } from 'next-qrcode'
import { useI18n } from '@/locales/client'
import { BackArrow, CopyIcon, PreviewIcon } from '@/assets/icons'

type FormSharePage = {
  id: string
}

export default function FormSharePage({ id }: FormSharePage) {
  const linkRef = useRef<HTMLInputElement>(null)
  const { Canvas } = useQRCode()
  const t = useI18n()

  const handleCopyClick = () => {
    if (linkRef.current) {
      linkRef.current.select()
      document.execCommand('copy')
      window.getSelection()?.removeAllRanges()
      showToast('success', 'Copied successfully')
    }
  }

  return (
    <div className='bg-background dark:bg-dark-100 w-screen h-[calc(100%-70px)] p-4'>
      <div className='bg-theme dark:bg-dark-200 dark:border-dark-200 h-[66px] border rounded-lg items-center justify-between flex p-2'>
        <div className='flex   items-center'>
          <CustomLink href={`/formbuilder/${id}`}>
            <BackArrow />
          </CustomLink>

          <div className='text-base mx-2'>{t('myForm')}</div>
        </div>
      </div>

      <div className='w-full h-[calc(100%-66px)] p-2 flex bg-theme dark:bg-dark-200 dark:border-dark-200 border rounded-lg mt-3 justify-center'>
        <div className='h-full  w-full justify-center flex flex-col items-center'>
          <div>{t('shareForm')}</div>
          <div className='h-full w-full md:w-[710px] p-2'>
            <div className='w-full border rounded-lg h-fit p-4 dark:border-gray-500'>
              <div>{t('copyLinkToShare')}</div>
              <div className='text-sm text-gray-500 mb-2'>{t('downloadQr')}</div>
              <Divider />
              <div className='w-full h-full flex justify-between items-center mt-4 mb-4'>
                <input
                  ref={linkRef}
                  type='text'
                  value={`http://192.168.10.101:3000/myform/${id}`}
                  readOnly
                  className='outline-none border-none w-full bg-primary-200 dark:bg-dark-300 p-4 border rounded-lg'
                />

                <div className='flex gap-2 text-primary-500 dark:text-theme'>
                  <button
                    className='flex bg-primary-200 dark:bg-dark-300 items-center  rounded-lg hover:bg-secondary-200 justify-center p-4 mx-3 w-full'
                    onClick={handleCopyClick}
                  >
                    <CopyIcon/><span className='mx-1'>{t('copy')}</span>
                  </button>
                </div>
              </div>

              <Divider />

              <Canvas
                text={`http://192.168.10.101:3000/myform/${id}`}
                options={{
                  errorCorrectionLevel: 'M',
                  margin: 5,
                  scale: 4,
                  width: 100
                }}
              />
            </div>
          </div>

          {/* <div className='h-full w-[710px] p-2'>
            <div className='w-full border rounded-lg h-fit p-4'>
              <div>Share with QR Code</div>
              <div className='text-sm text-gray-500 mb-2'>Download or scan the QR code to share your form</div>
              <Divider />
              <div className='flex justify-start flex-col w-fit'>
                <div className='w-fit p-2 border mt-4 rounded-lg'>
                  <CustomImage src={QrCode} height={100} width={100} />
                </div>
                <button className='flex bg-primary-200 items-center border rounded-lg px-3 py-3 mt-4 hover:bg-secondary-200 text-sm text-primary-500'>
                  <CustomImage src={DownloadIcon} height={18} width={18} className='mx-1' /> Download
                </button>
              </div>
            </div>
          </div> */}

          {/* <div className='h-full w-[710px] p-2'>
            <div className='w-full border rounded-lg h-fit p-4'>
              <div>Download form as PDF</div>
              <div className='text-sm text-gray-500 mb-2'>
                Download form as a PDF so you can share it with others as a print or have it as a backup copy
              </div>
              <Divider />
              <button className='flex bg-primary-200 items-center border rounded-lg px-3 py-3 mt-4 hover:bg-secondary-200 text-sm text-primary-500'>
                <CustomImage src={DownloadIcon} height={18} width={18} className='mx-1' /> Download
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
