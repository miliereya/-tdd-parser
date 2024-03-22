'use client'
import { useEffect, useState } from 'react'

export const useLocalStorageState = (
	key: string,
	fallbackState: string = ''
) => {
	const [value, setValue] = useState(
		typeof window !== 'undefined'
			? window.localStorage.getItem(key) ?? fallbackState
			: fallbackState
	)

	useEffect(() => {
		localStorage.setItem(key, value)
	}, [value, key])

	return { value, setValue }
}
