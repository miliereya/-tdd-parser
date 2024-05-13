import { SERVER_URL } from '@/shared/constants/api.constants'
import { getAuthToken, setAuthToken } from '@/shared/lib/token-actions'
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export const api = axios.create({
	baseURL: typeof window === 'undefined' ? SERVER_URL : 'api',
	withCredentials: true,
})

api.interceptors.request.use(
	async (
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig> => {
		const token = await getAuthToken()
		if (config.headers && token) {
			config.headers.token = token
		}
		return config
	}
)

const onFulfilledResponse = async (
	response: AxiosResponse<{ token?: string }>
): Promise<AxiosResponse> => {
	if (response.headers && response.headers.token) {
		await setAuthToken(response.headers.token)
	}

	return response
}

api.interceptors.response.use(onFulfilledResponse)
