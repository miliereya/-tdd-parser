'use client'
import { api } from './instance'
import { ICreateTemplate, ITemplate } from '../types'
import { TEMPLATE_ROUTE } from '@/shared/constants'

export const templateApi = {
	async create(dto: ICreateTemplate) {
		const { cells, file, groups, title, fileType } = dto

		await api.postForm(`${TEMPLATE_ROUTE}/create`, {
			body: JSON.stringify({
				cells,
				groups,
				title,
				fileType,
			}),
			file,
		})
	},

	async getAll() {
		const res = await api.get<ITemplate[]>(`${TEMPLATE_ROUTE}/all`)
		return res.data
	},

	async getById(_id: string) {
		const res = await api.get<ITemplate>(`${TEMPLATE_ROUTE}/get-by-id/${_id}`)
		return res.data
	},

	async delete(title: string) {
		await api.delete(`${TEMPLATE_ROUTE}/${title}`)
	},
}
