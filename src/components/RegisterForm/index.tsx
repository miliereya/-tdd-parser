'use client'

import { api } from '@/api'
import {
	Box,
	Button,
	CircularProgress,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { useState } from 'react'

export const RegisterForm = () => {
	const [email, setEmail] = useState('')

	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async () => {
		try {
			setIsLoading(true)
			api.post('user/register', { email })
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
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
				<Typography variant='h4'>Register page</Typography>
				<TextField
					type='email'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					label='email'
				/>
				<Button
					onClick={handleSubmit}
					disabled={isLoading}
					variant='contained'
					color='secondary'
				>
					{isLoading ? <CircularProgress /> : 'submit'}
				</Button>
			</Paper>
		</Box>
	)
}
