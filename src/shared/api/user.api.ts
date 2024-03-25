import { api } from './instance'
import {
	IUser,
	IUserConfirmEmail,
	IUserLogin,
	IUserRegister,
	IUserSendCode,
} from '../types'
import { USER_ROUTE } from '@/shared/constants'

export const userApi = {
	async register(dto: IUserRegister) {
		const { email } = dto

		await api.post(`${USER_ROUTE}/register`, {
			email,
		})
	},

	async confirmEmail(dto: IUserConfirmEmail) {
		const { email, token } = dto

		const res = await api.post<IUser>(`${USER_ROUTE}/confirm-email`, {
			email,
			token,
		})

		return res.data
	},

	async login(dto: IUserLogin) {
		const { email } = dto

		await api.post(`${USER_ROUTE}/login`, {
			email,
		})
	},

	async sendCode(dto: IUserSendCode) {
		const { code, email } = dto

		const res = await api.post<IUser>(`${USER_ROUTE}/send-code`, {
			code,
			email,
		})

		return res.data
	},

	async refresh() {
		const res = await api.get<IUser>(`${USER_ROUTE}/refresh`)

		return res.data
	},
}
