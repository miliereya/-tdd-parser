'use client'

import { TypeLoading } from '@/shared/types'
import { createContext, FC, ReactNode, useState } from 'react'

interface GlobalContextProps {
	isLoading: boolean
	setLoading: TypeLoading
}

export const GlobalContext = createContext<GlobalContextProps>({
	isLoading: false,
	setLoading: () => {},
})

interface GlobalProviderProps {
	children: ReactNode
}

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
	const [isLoading, setLoading] = useState(false)

	return (
		<GlobalContext.Provider value={{ isLoading, setLoading }}>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider
