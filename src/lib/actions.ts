'use server'

import { cookies } from 'next/headers'

export async function getAuthToken() {
	return cookies().get('auth_token')?.value
}

export async function setAuthToken(authToken: string) {
	const oneMonth = new Date()
	oneMonth.setMonth(oneMonth.getMonth() + 1)

	cookies().set('auth_token', authToken, { expires: oneMonth })
}
