import type { Metadata } from 'next'
import initTranslations from '../18n'
import TranslationsProvider from '@/providers/translation-provider'
import { dir } from 'i18next'

import { AppProvider } from '@/providers'
import { Header } from '@/features/layout'

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
				<AppProvider>
					<TranslationsProvider
						resources={resources}
						locale={locale}
						namespaces={i18nNameSpaces}
					>
						<Header />
						{children}
					</TranslationsProvider>
				</AppProvider>
			</body>
		</html>
	)
}
