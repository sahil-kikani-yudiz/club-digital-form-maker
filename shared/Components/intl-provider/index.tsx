'use client'
import { I18nProviderClient } from '@/locales/client'
import { ReactNode } from 'react'
type propType = { children: ReactNode }

export default function IntlProviderClient({ children }: propType) {
	return <I18nProviderClient locale={'en'}>{children}</I18nProviderClient>
}
