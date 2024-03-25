import { userApi } from '@/shared/api'
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import axios from 'axios'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TypeEmailConfirmationState } from '../types/state-types'
import { useGlobalContext } from '@/shared/hooks'

export const EmailConfirmation = () => {
	const { setUser } = useGlobalContext()

	const { push } = useRouter()

	const [message, setMessage] = useState<TypeEmailConfirmationState>(
		'Confirming your email...'
	)
	const [isLoading, setLoading] = useState(true)

	const params = useSearchParams()

	const token = params.get('token')
	const email = params.get('email')

	useEffect(() => {
		if (!token || !email) {
			redirect('/auth')
		}

		;(async () => {
			try {
				const user = await userApi.confirmEmail({ email, token })

				setUser(user)
				setMessage('Success! You will be redirected in a second!')

				setTimeout(() => {
					push('/main')
				}, 1000)
			} catch (e) {
				if (axios.isAxiosError(e)) {
					const data = e.response?.data

					const message = Array.isArray(data.message)
						? data.message[0]
						: data.message

					switch (message) {
						default:
							setMessage('Something went wrong...')
							setTimeout(() => {
								push('/auth')
							}, 1000)
					}
				}
			} finally {
				setLoading(false)
			}
		})()
	}, [email, token, setUser, push])

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100vh',
			}}
		>
			<Paper
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'relative',
					gap: '20px',
					padding: '50px',
					maxWidth: '400px',
					minHeight: '300px',
					inset: 0,
				}}
				elevation={4}
			>
				<Typography variant='h6' textAlign={'center'}>
					{message}
				</Typography>
				{isLoading && (
					<CircularProgress
						sx={{ marginTop: '20px' }}
						color='secondary'
						size={'120px'}
					/>
				)}
			</Paper>
		</Box>
	)
}
