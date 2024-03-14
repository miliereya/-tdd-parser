import { dataApi } from '@/api/data.api'
import { SearchPage } from '@/components/search-page'

export default async function Drivers() {
	const driversData = await dataApi.findAll({ table: 'drivers' })
	return (
		<>
			<SearchPage data={driversData} table='drivers' title='Перевізники' />
		</>
	)
}
