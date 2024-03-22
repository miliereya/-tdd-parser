import { dataApi } from '@/shared/api/data/data.api'
import { SearchPage } from '@/components/search-page'

export default async function Customers() {
	const customersData = await dataApi.findAll({ table: 'customers' })
	return (
		<>
			<SearchPage data={customersData} table='customers' title='Перевізники' />
		</>
	)
}
