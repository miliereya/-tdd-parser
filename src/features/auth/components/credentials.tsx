import { Dispatch, SetStateAction, useState } from 'react'
import { useGlobalContext } from '@/shared/hooks'
import { userApi } from '@/shared/api'
import axios from 'axios'
import {
	ERROR_CONFIRM_YOUR_EMAIL,
	ERROR_EMAIL_IS_ALREADY_USED,
	ERROR_EMAIL_IS_NOT_CONFIRMED,
	ERROR_INVALID_EMAIL,
	ERROR_USER_WAS_NOT_FOUND,
} from '../config/error-config'
import {
	Accordion,
	Heading,
	PrimaryButton,
	PrimaryInput,
	TextError,
} from '@/shared/ui'
import { useTranslation } from 'react-i18next'

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

	const { t } = useTranslation()

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
						setError(t('credentials.Invalid email format'))
						break
					case ERROR_EMAIL_IS_ALREADY_USED:
						setError(t('credentials.Email is already used'))
						break
					case ERROR_EMAIL_IS_NOT_CONFIRMED:
						toAccountConfirmationHandler()
						break
					default:
						setError(t('credentials.Unexpected error'))
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
						setError(t('Wrong email address'))
						break
					default:
						setError(t('Unexpected error'))
				}
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Heading>{t('credentials.Sign to your Account')}</Heading>
			<PrimaryInput
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				label='E-mail'
			/>
			<TextError text={error} />
			<Accordion row={false} gap='10px'>
				<PrimaryButton
					onClick={registerHandler}
					disabled={isLoading}
					sx={{ marginTop: '15px' }}
				>
					{t('credentials.Register')}
				</PrimaryButton>
				<PrimaryButton onClick={loginHandler} disabled={isLoading}>
					{t('credentials.Login')}
				</PrimaryButton>
			</Accordion>
		</>
	)
}
