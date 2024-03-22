import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import { useGlobalContext } from '@/shared/hooks'
import { userApi } from '@/shared/api'
import axios from 'axios'
import {
	ERROR_CONFIRM_YOUR_EMAIL,
	ERROR_EMAIL_IS_ALREADY_USED,
	ERROR_INVALID_EMAIL,
	ERROR_USER_WAS_NOT_FOUND,
} from '../config/error-config'

interface Props {
	toAccountConfirmationHandler: () => void
	toCodeHandler: () => void
	email: string
	setEmail: Dispatch<SetStateAction<string>>
}

export const Credentials = ({
	toAccountConfirmationHandler,
	toCodeHandler,
	email,
	setEmail,
}: Props) => {
	const { isLoading, setLoading } = useGlobalContext()

	const [error, setError] = useState('')

	const registerHandler = async () => {
		try {
			setError('')
			setLoading(true)
			await userApi.register({ email })
			toAccountConfirmationHandler()
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const data = e.response?.data

				const message = Array.isArray(data.message)
					? data.message[0]
					: data.message

				switch (message) {
					case ERROR_INVALID_EMAIL:
						setError('Invalid email format')
						break
					case ERROR_EMAIL_IS_ALREADY_USED:
						setError('Email is already used')
						break
					default:
						setError('Unexpected error')
				}
			}
		} finally {
			setLoading(false)
		}
	}

	const loginHandler = async () => {
		try {
			setError('')
			setLoading(true)
			await userApi.login({ email })
			toCodeHandler()
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const data = e.response?.data

				const message = Array.isArray(data.message)
					? data.message[0]
					: data.message

				switch (message) {
					case ERROR_CONFIRM_YOUR_EMAIL:
						toAccountConfirmationHandler()
						break
					case ERROR_USER_WAS_NOT_FOUND:
						setError('Wrong email address')
						break
					default:
						setError('Unexpected error')
				}
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Typography variant='h4'>Authentication</Typography>
			<Typography variant='body1' color={'red'}>
				{error}
			</Typography>
			<TextField
				type='email'
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				label='E-mail'
			/>
			<Button
				onClick={registerHandler}
				disabled={isLoading}
				variant='contained'
				color='secondary'
			>
				{isLoading ? <CircularProgress /> : 'Register'}
			</Button>
			<Button
				onClick={loginHandler}
				disabled={isLoading}
				variant='contained'
				color='secondary'
			>
				{isLoading ? <CircularProgress /> : 'Login'}
			</Button>
		</>
	)
}
