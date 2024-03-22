import { dataApi } from '@/shared/api/data/data.api'
import { SearchPage } from '@/components/search-page'

export default async function Consignees() {
	const consigneesData = await dataApi.findAll({ table: 'consignees' })
	return (
		<>
			<SearchPage
				data={consigneesData}
				table='consignees'
				title='Вантажоодержувачи'
			/>
		</>
	)
}
