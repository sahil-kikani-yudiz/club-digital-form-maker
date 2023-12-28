// import { createI18nClient } from 'next-app-translate'

import { createI18nClient } from 'next-app-translate/client';



export const { useI18n, I18nProviderClient } = createI18nClient({
  en: () => import('./en.json'),
  fr: () => import('./fr.json')
})
