'use client'

import { userApi } from '@/shared/api'
import { useGlobalContext } from '@/shared/hooks'
import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { ERROR_CODE_EXPIRED, ERROR_INVALID_CODE } from '../config/error-config'
import { useRouter } from 'next/navigation'

interface Props {
	email: string
	backHandler: () => void
}

export const CodeConfirmation = ({ backHandler, email }: Props) => {
	const { isLoading, setLoading, setUser } = useGlobalContext()

	const [isSuccess, setSuccess] = useState(false)
	const [error, setError] = useState('')
	const [code, setCode] = useState('')

	const { push } = useRouter()

	const sendCodeHandler = async (value: string) => {
		const regexp = new RegExp(/([1-9])/)
		if (value && (value.length > 6 || !regexp.test(value))) return

		setCode(value)

		if (value.length === 6 && regexp.test(value)) {
			setError('')
			setLoading(true)
			try {
				const user = await userApi.sendCode({ email, code: value })

				setSuccess(true)
				setUser(user)

				push('/main')
			} catch (e) {
				if (axios.isAxiosError(e)) {
					const data = e.response?.data

					const message = Array.isArray(data.message)
						? data.message[0]
						: data.message

					switch (message) {
						case ERROR_INVALID_CODE:
							setError('Wrong code')
							break
						case ERROR_CODE_EXPIRED:
							setError('Code is expired. Try again')
							setTimeout(() => {
								backHandler()
							}, 2000)
							break
						default:
							setError('Unexpected error')
					}
				}
			} finally {
				setLoading(false)
			}
		}
	}

	return (
		<>
			<Typography variant='body1' textAlign={'center'}>
				A verification code has been sent to your email!
			</Typography>
			<Typography variant='body1' fontWeight={700} textAlign={'center'}>
				{email}
			</Typography>
			<TextField
				type='number'
				onChange={(e) => sendCodeHandler(e.target.value)}
				value={code}
				label='Enter your code here'
				disabled={isLoading}
			/>
			<Typography
				variant='body1'
				sx={{ color: 'red', position: 'absolute', bottom: '95px' }}
			>
				{error}
			</Typography>
			{isSuccess && (
				<Typography
					variant='body1'
					sx={{ color: 'green', position: 'absolute', bottom: '65px' }}
				>
					Success! You will be redirected in a second
				</Typography>
			)}
			<Button
				onClick={backHandler}
				variant='contained'
				color='secondary'
				sx={{ marginTop: '45px' }}
			>
				Go Back
			</Button>
		</>
	)
}
