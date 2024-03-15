import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import initTranslations from '../18n'
import TranslationsProvider from '@/components/TranslationProvider'
import { dir } from 'i18next'

const inter = Inter({ subsets: ['latin'] })

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
			<body className={inter.className}>
				<TranslationsProvider
					resources={resources}
					locale={locale}
					namespaces={i18nNameSpaces}
				>
					<div className='layout'>
						<Nav />
						{children}
					</div>
				</TranslationsProvider>
			</body>
		</html>
	)
}
