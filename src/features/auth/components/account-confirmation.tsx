'use client'

import { Button, Typography } from '@mui/material'

interface Props {
	email: string
	backHandler: () => void
}

export const AccountConfirmation = ({ backHandler, email }: Props) => {
	return (
		<>
			<Typography variant='body1' textAlign={'center'}>
				Check your email to confirm your account!
			</Typography>
			<Typography variant='body1' fontWeight={700} textAlign={'center'}>
				{email}
			</Typography>
			<Button onClick={backHandler} variant='contained' color='secondary'>
				Go Back
			</Button>
		</>
	)
}
