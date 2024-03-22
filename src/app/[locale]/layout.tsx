import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import '@/assets/styles/globals.css'
import initTranslations from '../18n'
import TranslationsProvider from '@/components/TranslationProvider'
import { dir } from 'i18next'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/config/theme'

const i18nNameSpaces = ['common']

export const metadata: Metadata = {
	title: 'Excel-Parser',
	description: 'miralis.io',
}

export default async function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	const { resources } = await initTranslations(locale, i18nNameSpaces)

	return (
		<html lang={locale} dir={dir(locale)}>
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						<TranslationsProvider
							resources={resources}
							locale={locale}
							namespaces={i18nNameSpaces}
						>
							{children}
						</TranslationsProvider>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	)
}
