import { dataApi } from '@/api/data.api'
import initTranslations from '@/app/18n'
import { SearchPage } from '@/components/search-page'

const i18nNameSpaces = ['common']

export default async function Carriers({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const { t } = await initTranslations(locale, i18nNameSpaces)

	// an example how to use translations in server components

	const carriersData = await dataApi.findAll({ table: 'carriers' })
	return (
		<>
			<SearchPage
				data={carriersData}
				table='carriers'
				title={t('nav.carriers')}
			/>
		</>
	)
}
