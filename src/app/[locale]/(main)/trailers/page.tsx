import { dataApi } from '@/shared/api/data/data.api'
import { SearchPage } from '@/components/search-page'

export default async function Trailers() {
	const trailersData = await dataApi.findAll({ table: 'trailers' })
	return (
		<>
			<SearchPage data={trailersData} table='trailers' title='Причіпи' />
		</>
	)
}
