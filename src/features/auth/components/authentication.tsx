'use client'

import { useState } from 'react'
import { TypeAuthState } from '../types/state-types'
import { Credentials } from './credentials'
import { ConfirmationNotification } from './confirmation-notification'
import { CodeConfirmation } from './code-confirmation'
import { Accordion, Card, Centered, Container } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

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
		<Container>
			<Centered>
				<Card sx={{ width: '500px', marginTop: '120px' }}>
					<Accordion row={false} gap='15px'>
						{currentState === 'credentials' && (
							<Credentials
								email={email}
								setEmail={setEmail}
								toAccountConfirmationHandler={toAccountConfirmationHandler}
								toCodeHandler={toCodeHandler}
							/>
						)}
						{currentState === 'account confirmation' && (
							<ConfirmationNotification
								email={email}
								backHandler={backHandler}
							/>
						)}
						{currentState === 'code' && (
							<CodeConfirmation email={email} backHandler={backHandler} />
						)}
					</Accordion>
				</Card>
			</Centered>
		</Container>
	)
}
