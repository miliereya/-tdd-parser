import { useEffect, useState } from 'react'

export const useLocalStorageState = (
	key: string,
	fallbackState: string = ''
) => {
	const localStorageValue =
		typeof window !== 'undefined'
			? window.localStorage.getItem(String(key))
			: 'undefined'

	const [value, setValue] = useState(
		localStorageValue !== 'undefined'
			? JSON.parse(localStorageValue as string)
			: fallbackState
	)

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [value, key])

	return [value, setValue]
}
