import { SERVER_URL } from '@/shared/constants/api.constants'
import { getAuthToken, setAuthToken } from '@/lib/actions'
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export const api = axios.create({
	baseURL: typeof window === 'undefined' ? SERVER_URL : 'api',
})

axios.interceptors.request.use(
	async (
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig> => {
		const token = getAuthToken()
		if (config.headers && token) {
			config.headers.token = token
		}
		return config
	}
)

const onFulfilledResponse = async (
	response: AxiosResponse<{ token?: string }>
): Promise<AxiosResponse> => {
	if (response.data && response.data.token) {
		await setAuthToken(response.data.token)
	}

	return response
}

axios.interceptors.response.use(onFulfilledResponse)
