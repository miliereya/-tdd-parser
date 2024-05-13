'use client'

import { Authentication } from '@/features/auth'
import { useGlobalContext } from '@/shared/hooks'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
	const { user } = useGlobalContext()

	const { push } = useRouter()

	if (user) push('/main')

	return (
		<>
			<Authentication />
		</>
	)
}
