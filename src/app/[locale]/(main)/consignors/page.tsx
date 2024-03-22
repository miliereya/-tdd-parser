import { dataApi } from '@/shared/api/data/data.api'
import { SearchPage } from '@/components/search-page'

export default async function Consignors() {
	const consignorsData = await dataApi.findAll({ table: 'consignors' })
	return (
		<>
			<SearchPage
				data={consignorsData}
				table='consignors'
				title='Вантажовідправники'
			/>
		</>
	)
}
