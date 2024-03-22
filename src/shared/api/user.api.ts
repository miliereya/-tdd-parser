import { api } from './instance'
import { IUserLogin, IUserRegister } from '../types'
import { USER_ROUTE } from '@/shared/constants'

export const userApi = {
	async register(dto: IUserRegister) {
		const { email } = dto

		await api.post(`${USER_ROUTE}/register`, {
			email,
		})
	},

	async login(dto: IUserLogin) {
		const { email } = dto

		await api.post(`${USER_ROUTE}/login`, {
			email,
		})
	},

	async sendCode() {
		
	}
}
