import {
	ICreateData,
	IData,
	IDeleteData,
	IFullSearchData,
	ISearchData,
	IUpdateData,
} from '@/shared/types'
import { api } from './instance'

const dataUrl = 'data'

export const dataApi = {
	async create(dto: ICreateData) {
		const { data, parentField, table } = dto
		await api.post(`${dataUrl}/create-many?table${table}`, {
			data,
			parentField,
		})
	},

	async createMany(dto: ICreateData[]) {
		await api.post(`${dataUrl}/create-many`, { data: dto })
	},

	async search(dto: ISearchData) {
		const { parentField, table, value } = dto
		const res = await api.get<IData[]>(
			`${dataUrl}/search?table=${table}&parentField=${parentField}&value=${value}`
		)
		return res.data
	},

	async findAll(dto: IFullSearchData) {
		const res = await api.get<IData[]>(`${dataUrl}/find-all?table=${dto.table}`)
		return res.data
	},

	async update(dto: IUpdateData) {
		const { _id, data, table, parentField } = dto
		await api.put(`${dataUrl}/update/${_id}?table=${table}`, {
			data,
			parentField,
		})
	},

	async delete(dto: IDeleteData) {
		const { _id, table } = dto
		await api.delete(`${dataUrl}/delete/${_id}?table=${table}`)
	},
}
