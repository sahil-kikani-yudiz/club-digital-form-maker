// @ts-ignore
import { createI18nServer } from 'next-app-translate/server';


export const { getI18n, changeServerLocale } = createI18nServer(
	{
		en: () => import('./en.json'),
		fr: () => import('./fr.json'),
	},
	{ defaultLocale: 'en' }
)
