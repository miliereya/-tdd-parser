'use client'

import { userApi } from '@/shared/api'
import { useGlobalContext } from '@/shared/hooks'
import { Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { ERROR_CODE_EXPIRED, ERROR_INVALID_CODE } from '../config/error-config'
import { useRouter } from 'next/navigation'
import { PrimaryButton, PrimaryInput, Text, TextError } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

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
	const { t } = useTranslation()

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

				push('/templates')
			} catch (e) {
				if (axios.isAxiosError(e)) {
					const data = e.response?.data

					const message = Array.isArray(data.message)
						? data.message[0]
						: data.message

					switch (message) {
						case ERROR_INVALID_CODE:
							setError(t('code-confirmation.Wrong code'))
							break
						case ERROR_CODE_EXPIRED:
							setError(t('code-confirmation.Code is expired. Try again'))
							setTimeout(() => {
								backHandler()
							}, 2000)
							break
						default:
							setError(t('code-confirmation.Unexpected error'))
					}
				}
			} finally {
				setLoading(false)
			}
		}
	}

	return (
		<>
			<Text centered>
				{t(
					'code-confirmation.A verification code has been sent to your email!'
				)}
			</Text>
			<Typography variant='body1' fontWeight={700} textAlign={'center'}>
				{t('code-confirmation.Email')}: {email}
			</Typography>
			<PrimaryInput
				type='number'
				onChange={(e) => sendCodeHandler(e.target.value)}
				value={code}
				label={t('code-confirmation.Enter your code here')}
				disabled={isLoading}
			/>
			<TextError text={error} />
			{isSuccess && (
				<Typography
					variant='body1'
					sx={{ color: 'green', position: 'absolute', bottom: '65px' }}
				>
					{t('code-confirmation.Success! You will be redirected in a second')}
				</Typography>
			)}
			<PrimaryButton onClick={backHandler}>Go Back</PrimaryButton>
		</>
	)
}
