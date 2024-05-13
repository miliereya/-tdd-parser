'use client'

import { userApi } from '@/shared/api'
import { IUser, TypeLoading } from '@/shared/types'
import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from 'react'
import '@/assets/styles/globals.css'

interface GlobalContextProps {
	isLoading: boolean
	setLoading: TypeLoading
	user: IUser | null
	setUser: Dispatch<SetStateAction<IUser | null>>
}

export const GlobalContext = createContext<GlobalContextProps>({
	isLoading: false,
	setLoading: () => {},
	user: null,
	setUser: () => {},
})

interface GlobalProviderProps {
	children: ReactNode
}

const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
	const [isLoading, setLoading] = useState(true)
	const [user, setUser] = useState<IUser | null>(null)

	useEffect(() => {
		;(async () => {
			try {
				const user = await userApi.refresh()
				setUser(user)
				console.log(user)
			} catch (e) {
			} finally {
				setLoading(false)
			}
		})()
	}, [])

	return (
		<GlobalContext.Provider value={{ isLoading, setLoading, user, setUser }}>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider
