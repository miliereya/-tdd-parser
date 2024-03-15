import { dataApi } from '@/api/data.api'
import { SearchPage } from '@/components/search-page'

export default async function Cars() {
	const carsData = await dataApi.findAll({ table: 'cars' })
	return (
		<>
			<SearchPage data={carsData} table='cars' title='Автомобілі' />
		</>
	)
}
