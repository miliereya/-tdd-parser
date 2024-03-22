'use client'

import {
	Box,
	Button,
	CircularProgress,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { TypeAuthState } from '../types/state-types'
import { Credentials } from './credentials'
import { AccountConfirmation } from './account-confirmation'
import { CodeConfirmation } from './code-confirmation'

export const Authentication = () => {
	const [currentState, setCurrentState] = useState<TypeAuthState>('credentials')
	const [email, setEmail] = useState('')

	const toAccountConfirmationHandler = () => {
		setCurrentState('account confirmation')
	}

	const backHandler = () => {
		setEmail('')
		setCurrentState('credentials')
	}

	const toCodeHandler = () => {
		setCurrentState('code')
	}

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
					gap: '20px',
					padding: '20px',
					maxWidth: '300px',
					inset: 0,
				}}
				elevation={4}
			>
				{currentState === 'credentials' && (
					<Credentials
						email={email}
						setEmail={setEmail}
						toAccountConfirmationHandler={toAccountConfirmationHandler}
						toCodeHandler={toCodeHandler}
					/>
				)}
				{currentState === 'account confirmation' && (
					<AccountConfirmation email={email} backHandler={backHandler} />
				)}
				{currentState === 'code' && (
					<CodeConfirmation email={email} backHandler={backHandler} />
				)}
			</Paper>
		</Box>
	)
}
