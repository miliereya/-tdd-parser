import { SearchPage } from '@/components/search-page'
import { dataApi } from '@/shared/api'

export default async function Drivers() {
	const driversData = await dataApi.findAll({ table: 'drivers' })
	return (
		<>
			<SearchPage data={driversData} table='drivers' title='Перевізники' />
		</>
	)
}
