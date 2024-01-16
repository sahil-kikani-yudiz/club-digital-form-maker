import { AddIcon, PreviewIcon, ShareIcon, ThemeIcon } from '@/assets/icons'
import { useI18n } from '@/locales/client'
import MobileFooter from '@/shared/ui/mobileFooter'
import Link from 'next/link'

export default function EditorFooter({ setToolbar, toggleTheme, id, handlePreview }: any) {
  const t = useI18n()
  return (
    <MobileFooter>
      <button
        className='border rounded-lg mx-2 p-2 w-fit flex items-center hover:bg-secondary-200 bg-theme dark:bg-dark-300'
        onClick={setToolbar}
      >
        <AddIcon />
        <div className='mx-1'>{t('add')}</div>
      </button>
      <button
        className='border rounded-lg mx-2 p-2 w-fit flex items-center hover:bg-secondary-200 dark:bg-dark-300 bg-theme '
        onClick={toggleTheme}
      >
        <ThemeIcon />
        <div className='mx-1'>{t('theme')}</div>
      </button>
      <Link
        href={`/share/${id}`}
        className='border rounded-lg mx-2 p-2 w-fit flex items-center dark:bg-dark-300  hover:bg-secondary-200 bg-theme'
      >
        <ShareIcon />
        <div className='mx-1'>{t('share')}</div>
      </Link>

      <button
        onClick={handlePreview}
        className='border rounded-lg mx-2 p-2 w-fit flex items-center hover:bg-secondary-200 bg-theme dark:bg-dark-300 '
      >
        <PreviewIcon />
        <div className='mx-1'>{t('preview')}</div>
      </button>
    </MobileFooter>
  )
}
