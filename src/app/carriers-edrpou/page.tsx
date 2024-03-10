import { dataApi } from '@/api/data.api'
import { SearchPage } from '@/components/search-page'

export default async function carriersEdrpou() {
	const carriersEdrpouData = await dataApi.findAll({ table: 'carriers-edrpou' })
	return (
		<>
			<SearchPage
				data={carriersEdrpouData}
				table='carriers-edrpou'
				title='Перевізники (ЄДРПОУ)'
			/>
		</>
	)
}
