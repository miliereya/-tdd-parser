'use client'

import { PrimaryButton, Text } from '@/shared/ui'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
	email: string
	backHandler: () => void
}

export const ConfirmationNotification = ({ backHandler, email }: Props) => {
	const { t } = useTranslation()

	return (
		<>
			<Text>
				{t(
					'confirmation-notification.Check your email to confirm your account!'
				)}
			</Text>
			<Typography variant='body1' fontWeight={700} textAlign={'center'}>
				{email}
			</Typography>
			<PrimaryButton onClick={backHandler}>{t('Go Back')}</PrimaryButton>
		</>
	)
}
