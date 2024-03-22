'use client'

import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

interface Props {
	email: string
	backHandler: () => void
}

export const CodeConfirmation = ({ backHandler, email }: Props) => {
	const [code, setCode] = useState('')

	const sendCodeHandler = (value: string) => {
		const regexp = new RegExp(/([1-9])/)

		if (value && (value.length > 6 || !regexp.test(value))) return
		setCode(value)
		if (value.length === 6 && regexp.test(value)) {
			console.log('sent')
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
				type='text'
				onChange={(e) => sendCodeHandler(e.target.value)}
				value={code}
				label='Enter your code here'
			/>
			<Button onClick={backHandler} variant='contained' color='secondary'>
				Go Back
			</Button>
		</>
	)
}
