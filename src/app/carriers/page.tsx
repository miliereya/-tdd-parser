import { dataApi } from '@/api/data.api'
import { SearchPage } from '@/components/search-page'

export default async function Carriers() {
	const carriersData = await dataApi.findAll({ table: 'carriers' })
	return (
		<>
			<SearchPage data={carriersData} table='carriers' title='Перевізники' />
		</>
	)
}
