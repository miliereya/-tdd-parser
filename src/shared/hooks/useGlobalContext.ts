import { GlobalContext } from '@/providers/global-context.provider'
import { useContext } from 'react'

export const useGlobalContext = () => useContext(GlobalContext)
